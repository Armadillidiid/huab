# Deep dive libpamac architecture

## Discoveries

### Architecture Summary

**libpamac** is a Vala library (GPL3) providing a unified API for 4 package backends:

1. **ALPM/AUR** via `libalpm` (C, uses hand-crafted `vapi/libalpm.vapi`)
2. **Snap** via `snapd-glib-2` (GObject, auto-GIR)
3. **Flatpak** via `libflatpak` (GObject, auto-GIR)
4. **AppStream** via `libappstream` (GObject, auto-GIR)

Each backend is a **separate shared library plugin** (`libpamac-aur.so`, `libpamac-snap.so`, etc.) loaded at runtime by `plugin_loader.vala`.

### D-Bus Architecture (Critical Finding)

The `Transaction` class has **two execution paths** based on privilege:

```
Transaction (user-facing class)
    └─ if root → TransactionInterfaceRoot (calls AlpmUtils directly)
    └─ if non-root → TransactionInterfaceDaemon (proxy over D-Bus)
                          ↓
              D-Bus: org.manjaro.pamac.daemon
              Object path: /org/manjaro/pamac/daemon
                          ↓
                    Daemon class (daemon.vala)
                    - Runs as system service
                    - Uses Polkit for authorization ("org.manjaro.pamac.commit")
                    - Has lockfile mutex for exclusive alpm access
                    - Delegates to AlpmUtils for actual package operations
```

**Sender-based multiplexing**: The daemon serves multiple clients simultaneously. Each D-Bus signal carries a `sender` string (the D-Bus bus name), and `TransactionInterfaceDaemon` filters signals so each client only sees its own responses.

**Async pattern**: All daemon operations use a fire-and-forget method (`start_*`) + completion signal (`*_finished`) pattern. `TransactionInterfaceDaemon` bridges this to Vala `async`/`yield` using stored `SourceFunc` callbacks.

### Package Model Hierarchy

```
Package (abstract base)
  └─ AlpmPackage (abstract, adds alpm-specific fields)
       ├─ AlpmPackageLinked (live view backed by Alpm.Package* pointers — lazy props)
       │    └─ AlpmPackageStatic (owned strings, used for updates/transactions)
       └─ AURPackage (abstract, adds AUR-specific fields)
            └─ AURPackageLinked (backed by AURInfos + optional Alpm.Package* local_pkg)
                 └─ AURPackageStatic (used inside transaction for .SRCINFO parsing)
  └─ FlatpakPackage (abstract, concrete impl in flatpak_plugin.so)
  └─ SnapPackage (abstract + channel/publisher/confined fields, impl in snap_plugin.so)
```

**ID semantics**: `id` = `app_id` if AppStream app data is available, otherwise = `pkgname`. This allows one alpm package providing multiple AppStream apps to appear as separate entries.

**Lazy evaluation**: `AlpmPackageLinked` defers all property computation until first access, using boolean guard flags (`version_set`, `repo_set`, etc.) and back-pointers to live `Alpm.Package*` structs.

### Database.search_pkgs() call path

```
Database.search_pkgs(string)
  → search_pkgs_real(string_down, ref pkgs)
      → search_all_dbs(string)             [alpm local + all syncdbs, AND-based needle matching]
      → appstream_plugin.search(tokens)    [augment results with AppStream matches]
      → initialise_pkgs(alpm_list, ref pkgs)
           → [per pkg] AlpmPackageLinked.from_alpm(alpm_pkg, this)
           → [if AUR enabled] aur_plugin.get_multi_infos(foreign_pkgnames) → set repo="AUR"
           → [if AppStream] appstream_plugin.get_pkgname_apps(pkgname) → set_app(app)
           → pkgs_cache.replace(pkg.id, pkg)   [cache by id]
```

**Custom search** (`custom_db_search`): Searches name (plain + regex), description (substring), provides (plain + regex), groups (plain + regex). Uses AND logic across multiple needles.

### Transaction.run_async() execution flow

```
run_async()
  → run_alpm_transaction()
      → [if sysupgrade] get_authorization_async() → refresh_dbs_async()
      → add_optdeps() → choose_optdeps() [virtual, UI overrides]
      → [if sysupgrade + AUR] get_aur_updates_async() → add_pkg_to_build()
      → [if to_build] compute_aur_build_list()   [parses .SRCINFO, builds fake AUR db]
      → trans_prepare() → trans_check_prepare()  [calls alpm_utils.trans_check_prepare in thread]
      → trans_run(summary)
           → ask_edit_build_files() [virtual]
           → ask_commit_real() → ask_commit() [virtual]
           → transaction_interface.trans_run(...)  [→ daemon or root]
           → [if AUR] build_aur_packages()
                → makepkg -cCf in subprocess
                → install_built_pkgs() → transaction_interface.trans_run(to_load_local=[built paths])
  → [if snap] run_snap_transaction() → transaction_interface.snap_trans_run()
  → [if flatpak] run_flatpak_transaction() → transaction_interface.flatpak_trans_run()
```

### AUR Build System Details

- Build dir: `/tmp/pamac-{username}/`
- AUR fake DB: `/tmp/pamac-{username}/pamac_aur.db`
- Uses `git clone --depth=1 https://aur.archlinux.org/{name}.git`
- Parses `.SRCINFO` to extract deps, provides, conflicts, replaces
- When root: wraps `makepkg` in `systemd-run --property=DynamicUser=yes`
- GPG key import: checks `validpgpkeys` in `.SRCINFO`, calls `ask_import_key()` (virtual)

### TransactionSummary & Updates models

```vala
// TransactionSummary (alpm_package.vala line 1285)
class TransactionSummary {
    GenericArray<Package> to_install
    GenericArray<Package> to_upgrade
    GenericArray<Package> to_downgrade
    GenericArray<Package> to_reinstall
    GenericArray<Package> to_remove
    GenericArray<Package> conflicts_to_remove
    GenericArray<Package> to_build
    GenericArray<string> aur_pkgbases_to_build
    GenericArray<string> to_load
}

// Updates (alpm_package.vala line 1299)
class Updates {
    GenericArray<AlpmPackage> repos_updates
    GenericArray<AlpmPackage> ignored_repos_updates
    GenericArray<AURPackage> aur_updates
    GenericArray<AURPackage> ignored_aur_updates
    GenericArray<AURPackage> outofdate
    GenericArray<FlatpakPackage> flatpak_updates
}
```

### Key Virtual Methods in Transaction (override in UI subclasses)

```vala
protected virtual async bool ask_commit(TransactionSummary summary)       // default: true
protected virtual async bool ask_edit_build_files(TransactionSummary)     // default: false
protected virtual async void edit_build_files(GenericArray<string>)       // default: nothing
protected virtual async bool ask_import_key(string, string, string?)      // default: false
protected virtual async GenericArray<string> choose_optdeps(string, ...)  // default: []
protected virtual async int choose_provider(string, GenericArray<string>) // default: 0
protected virtual async bool ask_snap_install_classic(string)             // default: false
public virtual async int run_cmd_line_async(args, working_dir, cancellable) // overridable
```

### FlatpakPlugin interface (internal, implemented in flatpak_plugin.so)

```vala
interface FlatpakPlugin {
    uint64 refresh_period { get; set; }
    signal emit_action_progress(sender, action, status, progress)
    signal emit_script_output(sender, message)
    signal emit_error(sender, message, details[])
    bool refresh_appstream_data()
    void load_appstream_data()
    void get_remotes_names(ref GenericArray<string>)
    void search_flatpaks(string, ref GenericArray<FlatpakPackage>)
    void search_uninstalled_flatpaks_sync(string[], ref GenericArray<FlatpakPackage>)
    bool is_installed_flatpak(string)
    FlatpakPackage? get_flatpak_by_app_id(string)
    FlatpakPackage? get_flatpak(string id)
    void get_installed_flatpaks(ref GenericArray<FlatpakPackage>)
    void get_category_flatpaks(string, ref GenericArray<FlatpakPackage>)
    void get_flatpak_updates(ref GenericArray<FlatpakPackage>)
    bool trans_run(sender, to_install[], to_remove[], to_upgrade[])
    void trans_cancel(sender)
    void refresh()
}
```

### SnapPlugin interface (internal, implemented in snap_plugin.so)

```vala
interface SnapPlugin {
    signal emit_action_progress, emit_download_progress, emit_script_output, emit_error
    signal start_downloading(sender), stop_downloading(sender)
    void search_snaps(string, ref GenericArray<SnapPackage>)
    void search_uninstalled_snaps_sync(string, ref GenericArray<SnapPackage>)
    bool is_installed_snap(string)
    SnapPackage? get_snap(string)
    SnapPackage? get_snap_by_app_id(string)
    void get_installed_snaps(ref GenericArray<SnapPackage>)
    string get_installed_snap_icon(string) throws Error
    void get_category_snaps(string, ref GenericArray<SnapPackage>)
    bool trans_run(sender, to_install[], to_remove[])
    bool switch_channel(sender, name, channel)
    void trans_cancel(sender)
    void refresh()
}
// SnapPackage adds: channel, publisher, confined, channels[]
```

### Daemon D-Bus interface (org.manjaro.pamac.daemon)

All methods are `start_*` (fire-and-forget), results come back via signals. Polkit action: `org.manjaro.pamac.commit`. Lock file mutex used to serialize alpm operations. 5-minute timeout on lock wait.

## Relevant files / directories

```
/home/emmanuel/ghq/github.com/manjaro/libpamac/
├── ARCHITECTURE.md                          ← READ (full)
├── src/
│   ├── database.vala                        ← READ (full, 2565 lines)
│   ├── transaction.vala                     ← READ (full, 2320 lines)
│   ├── package.vala                         ← READ (full, 42 lines)
│   ├── alpm_package.vala                    ← READ (full, 1309 lines)
│   ├── flatpak_interface.vala               ← READ (full, 47 lines)
│   ├── snap_interface.vala                  ← READ (full, 51 lines)
│   ├── daemon_interface.vala                ← READ (full, 87 lines)
│   ├── transaction_interface.vala           ← READ (full, 64 lines)
│   ├── daemon.vala                          ← READ (full, 866 lines)
│   ├── transaction_interface_daemon.vala    ← READ (full, 489 lines)
│   ├── transaction_interface_root.vala      ← READ (full, 396 lines)
│   ├── alpm_utils.vala                      ← READ (partial, lines 1-150 of 2696)
│   ├── pamac_config.vala                    ← READ (partial, lines 1-100 of 419)
│   ├── aur_interface.vala                   ← NOT READ
│   ├── aur_plugin.vala                      ← NOT READ
│   ├── appstream_interface.vala             ← NOT READ
│   ├── appstream_plugin.vala                ← NOT READ
│   ├── alpm_config.vala                     ← NOT READ
│   ├── plugin_loader.vala                   ← NOT READ
│   ├── dependency_checker.vala              ← NOT READ
│   ├── checkupdates.vala                    ← NOT READ
│   ├── updates_checker.vala                 ← NOT READ
│   ├── outdated_checker.vala                ← NOT READ
│   ├── pamac_config_daemon.vala             ← NOT READ
│   ├── utils.vala                           ← NOT READ
│   └── version.vala                         ← NOT READ
├── vapi/
│   └── libalpm.vapi                         ← NOT READ (1576 lines, manual ALPM bindings)
└── examples/                                ← NOT READ
```

