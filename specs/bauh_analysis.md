---
# Bauh Deep-Dive: Structured Analysis Report
---

## 1. `api/abstract/controller.py` — The Abstract Interface

### Overview

This is the **core contract** of the entire plugin system. Every package manager ("gem") must implement `SoftwareManager`. It is designed as a Strategy/Plugin pattern: the GUI talks only to `SoftwareManager`, and each gem plugs in behind that interface.

### Key Classes

#### `SearchResult`

```python
def __init__(self, installed: Optional[List[P]], new: Optional[List[P]], total: int):
    # installed: already-installed packages found by the query
    # new:       not-yet-installed packages
    # total:     count (may differ from len(installed)+len(new) if truncated)
```

Has a factory `SearchResult.empty()` and `update_total()` to recompute from lists.

#### `UpgradeRequirement`

```python
def __init__(self, pkg, reason=None, required_size=None, extra_size=None, sorting_priority=0):
    # required_size: bytes needed to download the upgrade
    # extra_size:    net disk delta after upgrade
    # sorting_priority: higher = shown first
```

Static sorter: `sort_by_priority` returns `(-priority, name)` — runtimes/keyrings sort before apps.

#### `UpgradeRequirements`

```python
def __init__(self, to_install, to_remove, to_upgrade, cannot_upgrade):
    self.context = {}  # cache slot for gems to store state between get_upgrade_requirements() and upgrade()
```

The `context` dict is particularly interesting — the arch gem stores pre-fetched package data here so it doesn't re-query during the actual upgrade.

#### `TransactionResult`

```python
def __init__(self, success: bool, installed: Optional[List[SoftwarePackage]], removed: Optional[List[SoftwarePackage]])
# Static factory: TransactionResult.fail()
```

#### `SoftwareAction` (Enum)

```python
PREPARE = 0
SEARCH = 1
INSTALL = 2
UNINSTALL = 3
UPGRADE = 4
DOWNGRADE = 5
```

Used by `requires_root()` to make per-action root decisions.

### `SoftwareManager` — All Method Signatures

| Method                     | Abstract?        | Signature                                                                        | Docstring summary                                    |
| -------------------------- | ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `search`                   | Yes              | `(words, disk_loader, limit, is_url) -> SearchResult`                            | Search by words or URL                               |
| `read_installed`           | Yes              | `(disk_loader, limit, only_apps, pkg_types, internet_available) -> SearchResult` | List all installed                                   |
| `downgrade`                | Yes              | `(pkg, root_password, handler) -> bool`                                          | Revert to previous version                           |
| `upgrade`                  | Yes              | `(requirements, root_password, watcher) -> bool`                                 | Apply upgrades                                       |
| `uninstall`                | Yes              | `(pkg, root_password, watcher, disk_loader) -> TransactionResult`                | Remove a package                                     |
| `install`                  | Yes              | `(pkg, root_password, disk_loader, watcher) -> TransactionResult`                | Install a package                                    |
| `get_managed_types`        | Yes              | `() -> Set[Type[SoftwarePackage]]`                                               | Which model class this gem owns                      |
| `get_info`                 | Yes              | `(pkg) -> dict`                                                                  | Detailed info dict for display                       |
| `get_history`              | Yes              | `(pkg) -> PackageHistory`                                                        | Commit/version history                               |
| `is_enabled`               | Yes              | `() -> bool`                                                                     | Runtime enabled toggle                               |
| `set_enabled`              | Yes              | `(enabled: bool)`                                                                | Runtime enabled toggle                               |
| `can_work`                 | Yes              | `() -> Tuple[bool, Optional[str]]`                                               | Dependency check at startup                          |
| `requires_root`            | Yes              | `(action, pkg) -> bool`                                                          | Per-action sudo check                                |
| `prepare`                  | Yes              | `(task_manager, root_password, internet_available)`                              | Background init work                                 |
| `list_updates`             | Yes              | `(internet_available) -> List[PackageUpdate]`                                    | What needs upgrading                                 |
| `list_warnings`            | Yes              | `(internet_available) -> Optional[List[str]]`                                    | User-visible warnings                                |
| `is_default_enabled`       | Yes              | `() -> bool`                                                                     | Enabled without user config                          |
| `launch`                   | Yes              | `(pkg)`                                                                          | Run the app                                          |
| `get_upgrade_requirements` | No (has default) | `(pkgs, root_password, watcher) -> UpgradeRequirements`                          | Default wraps each pkg as plain `UpgradeRequirement` |
| `clean_cache_for`          | No               | `(pkg)`                                                                          | Default deletes disk cache dir                       |
| `cache_to_disk`            | No               | `(pkg, icon_bytes, only_icon)`                                                   | Calls `serialize_to_disk` if supported               |
| `serialize_to_disk`        | No               | `(pkg, icon_bytes, only_icon)`                                                   | Writes `data.json`/`data.yml` + `icon.png`           |
| `list_suggestions`         | No               | `(limit, filter_installed) -> Optional[List[PackageSuggestion]]`                 | Default: nothing                                     |
| `execute_custom_action`    | No               | `(action, pkg, root_password, watcher) -> bool`                                  | GUI handles; gems override specific methods          |
| `get_screenshots`          | No               | `(pkg) -> Generator[str]`                                                        | Yields screenshot URLs                               |
| `clear_data`               | No               | `(logs=True)`                                                                    | Remove all gem data                                  |
| `get_settings`             | No               | `() -> Optional[Generator[SettingsView]]`                                        | Yield settings panels                                |
| `gen_custom_actions`       | No               | `() -> Generator[CustomSoftwareAction]`                                          | Default: yields nothing                              |
| `fill_sizes`               | No               | `(pkgs)`                                                                         | Batch-fill download sizes                            |
| `ignore_update`            | No               | `(pkg)`                                                                          | Mark update ignored                                  |
| `revert_ignored_update`    | No               | `(pkg)`                                                                          | Unmark ignored update                                |

**Design note:** The default `get_upgrade_requirements` is a simple passthrough — gems that need complex pre-flight logic (arch, debian) override it. The `context` dict in `UpgradeRequirements` is the handshake between the pre-flight and the actual upgrade.

---

## 2. `api/abstract/model.py` — The Data Models

### `SoftwarePackage` (ABC)

The base class for every installable unit across all gems.

```python
def __init__(self, id, version, name, description, latest_version,
             icon_url,           # URL or filesystem path
             status,             # PackageStatus.READY | LOADING_DATA
             installed,          # bool
             update,             # bool — has available update
             size,               # bytes
             categories,         # List[str]
             license):
    self.gem_name = self.__module__.split('.')[2]  # auto-detected: 'flatpak', 'arch', 'snap', 'debian'
```

**Abstract methods** every gem model must implement:

| Method                    | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `has_history()`           | Whether version history is available        |
| `has_info()`              | Whether extended info is available          |
| `can_be_downgraded()`     | Can revert to prior version                 |
| `get_type()`              | String type tag, e.g. `"flatpak"`           |
| `get_default_icon_path()` | Fallback icon path                          |
| `get_type_icon_path()`    | The gem's badge icon                        |
| `is_application()`        | Is it a GUI app vs. a library/runtime       |
| `get_data_to_cache()`     | What to write to `data.json` on disk        |
| `fill_cached_data(data)`  | Restore from `data.json`                    |
| `can_be_run()`            | Whether the GUI should show a Launch button |
| `get_publisher()`         | Who maintains it                            |
| `supports_backup()`       | System snapshot before install              |

**Concrete methods with interesting behavior:**

```python
def supports_disk_cache(self):
    return self.installed and self.is_application()  # only installed apps get cached

def get_disk_cache_path(self):
    return f'{CACHE_DIR}/{self.get_type()}'           # e.g. ~/.cache/bauh/flatpak

def can_be_updated(self):
    return self.installed and self.update

def get_disk_data_path(self):
    return '{}/data.json'.format(self.get_disk_cache_path())

def get_disk_icon_path(self):
    return '{}/icon.png'.format(self.get_disk_cache_path())
```

### `CustomSoftwareAction`

```python
def __init__(self, i18n_label_key, i18n_status_key, icon_path,
             manager_method: str,   # NAME of the method on the manager to call
             requires_root: bool,
             manager=None,          # which manager instance (can be a different gem)
             backup=False,          # trigger system snapshot first
             refresh=True,          # refresh displayed list after action
             i18n_confirm_key=None,
             requires_internet=False,
             requires_confirmation=True,
             i18n_description_key=None):
```

The `manager_method` is a **string** — the GUI calls `getattr(manager, manager_method)(pkg, root_password, watcher)`. This is bauh's plugin extension mechanism, allowing gems to surface arbitrary per-package actions without touching the abstract interface.

### `PackageStatus` (Enum)

```python
READY = 1         # all data loaded
LOADING_DATA = 2  # async loaders still running
```

The GUI uses this to know whether to show a spinner.

### `PackageUpdate`

```python
def __init__(self, pkg_id: str, version: str, pkg_type: str, name: str):
    # Lightweight: just enough data for the update notification badge
```

### `PackageHistory`

```python
def __init__(self, pkg, history: List[dict], pkg_status_idx: int):
    # history: list of dicts like {'commit': '...', 'date': datetime, 'subject': '...'}
    # pkg_status_idx: which history entry is CURRENT (for "you are here" marker)
```

### `SuggestionPriority` (Enum)

```python
LOW = 0, MEDIUM = 1, HIGH = 2, TOP = 3
# Custom __gt__ / __lt__ for sorting
```

### `PackageSuggestion`

```python
def __init__(self, package: SoftwarePackage, priority: SuggestionPriority)
```

---

## 3. `gems/flatpak/controller.py` — `FlatpakManager`

### Interface Conformance

Implements all abstract methods. Also implements `SettingsController.save_settings()`.

### Data Flow: `search()`

```
words
  -> flatpak.search(version, words, remote_level)   # calls `flatpak search <words> --<installation>`
  -> parse tab-separated output into list of dicts
  -> cross-reference against read_installed()
  -> new packages: _map_to_model() -> FlatpakAsyncDataLoader.start() (HTTP to Flathub API, async)
  -> installed matches: return existing model objects
```

### Data Flow: `read_installed()`

The most complex method — highly parallelized:

```
Thread 1: flatpak.list_updates_as_str(version)
           -> spawns 2 sub-threads: fill_updates('system') + fill_updates('user')
           -> each runs `flatpak update --<installation> --no-deps`
           -> grepping tabular output for update rows

Thread 2 (flatpak >= 1.12): fill_required_runtime_updates()
           -> 2 threads: `flatpak update --system` and `flatpak update --user`
           -> regex RE_REQUIRED_RUNTIME on output

Main:     flatpak.list_installed(version)
           -> `flatpak list --columns=application,ref,arch,branch,description,origin,options,[name,]version`
           -> tab-split each line into dict

Join all -> cross-reference update map -> mark model.update = True
         -> handle 'partial' updates (version < 1.5 edge case)
         -> handle required runtimes that aren't yet installed
         -> read ignored updates file (~/.config/bauh/flatpak/updates_ignored.txt)
```

### CLI Commands Used

| Method                     | Command                                                                           |
| -------------------------- | --------------------------------------------------------------------------------- |
| `search`                   | `flatpak search <words> --<installation>`                                         |
| `list_installed`           | `flatpak list --columns=application,ref,...`                                      |
| `fill_updates`             | `flatpak update --<installation> --no-deps`                                       |
| `install`                  | `flatpak install <origin> <app_id> -y --<installation>`                           |
| `upgrade` (update)         | `flatpak update -y <ref> --<installation> [--no-related] [--no-deps]`             |
| `upgrade` (new component)  | `flatpak install <origin> <ref> -y --<installation>`                              |
| `uninstall`                | `flatpak uninstall <ref> -y --<installation>`                                     |
| `downgrade`                | `flatpak update --no-related --no-deps --commit=<hash> <ref> -y --<installation>` |
| `get_history`              | `flatpak remote-info --log <origin> <ref> --<installation>`                       |
| `get_info` (installed)     | `flatpak info <app_id> <branch> --<installation>`                                 |
| `get_info` (not installed) | HTTP GET `https://flathub.org/api/v1/apps/<id>`                                   |
| `get_commit`               | `flatpak info <app_id> <branch> --<installation>`                                 |
| `launch`                   | `flatpak run <app_id>` (via `subprocess.Popen`, shell=True)                       |
| `set_default_remotes`      | `flatpak remote-add --if-not-exists flathub <url> --<installation>`               |
| `list_remotes`             | `flatpak remotes`                                                                 |
| `map_update_download_size` | `flatpak update --<installation> --no-deps`                                       |
| `full_update`              | `flatpak update -y`                                                               |

### Output Parsing Examples

**`list_installed` (v >= 1.3):**

```python
cols = 'application,ref,arch,branch,description,origin,options,name,version'
# tab-split: data[0]=id, data[1]=ref, data[2]=arch, data[3]=branch,
#            data[4]=desc, data[5]=origin, data[6]=options (contains 'runtime'/'user'/'system'),
#            data[7]=name, data[8]=version
```

**`fill_updates` output parsing:**

```python
# grep for lines matching r'[0-9]+\.\s+.+'
# tab-split: [idx, op_symbol, app_id, branch, op, origin, size]
# VERSION_1_5+:  update_id = f'{app_id}/{branch}/{installation}/{origin}'
# VERSION_1_2+:  update_id = f'{app_id}/{branch_or_arch}/{installation}/{origin}'
```

**`get_app_commits_data` history parsing:**

```python
log = `flatpak remote-info --log <origin> <ref> --<installation>`
# regex: r'(Commit|Subject|Date):\s(.+)'
# Groups into triplets: {commit: str, subject: str, date: datetime}
```

### Extra Methods (beyond abstract interface)

- `sort_update_order(pkgs)` — runtimes before apps, sorted by installation+name+id
- `full_update(root_password, watcher)` — runs `flatpak update -y` (all at once)
- `action_full_update` (property) — lazy-init `CustomSoftwareAction` pointing at `full_update`
- `_read_ignored_updates() / _write_ignored_updates()` — plain text file `~/.config/bauh/flatpak/updates_ignored.txt`
- `is_local_suggestions_file_mapped()` — supports offline/dev mode with a local suggestions file path

### Version Handling

A standout design: `flatpak.get_version()` returns `Tuple[int, ...]` (e.g. `(1, 14, 2)`), and version constants `VERSION_1_2`, `VERSION_1_3`, `VERSION_1_5`, `VERSION_1_12` gate behavior throughout. This means the code gracefully supports multiple installed flatpak versions with conditional logic rather than requiring a minimum version.

---

## 4. `gems/arch/controller.py` — `ArchManager`

### `TransactionContext` — Internal State Object

Unlike other gems, arch wraps all install/upgrade/uninstall state into a `TransactionContext` dataclass. This avoids passing 20 parameters between methods and enables nested operations (e.g. installing a dependency reuses the same context).

```python
class TransactionContext:
    # Core identity
    name, base, maintainer, repository

    # Runtime dependencies (lazily populated via methods)
    provided_map       # {pkg_name -> Set[pkg_names_that_provide_it]}
    remote_repo_map    # {pkg_name -> repo_name}
    remote_provided_map
    aur_idx            # Set[str] — local AUR index

    # The aur_idx is fetched lazily:
    def get_aur_idx(self, aur_client):
        if self.aur_idx is None:
            self.aur_idx = aur_client.read_index()  # reads local .gz file
        return self.aur_idx
```

### Data Flow: `search()`

Three parallel threads:

```
Thread 1: pacman.search(query)           -> 'pacman -Ss <query>'
Thread 2: aur_client.search(query)       -> AUR RPC API: https://aur.archlinux.org/rpc/?v=5&type=search&arg=<query>
Thread 3: pacman.list_installed_names()  -> 'pacman -Qq'

Join -> cross-reference installed names
     -> installed repo pkgs: ArchPackage(...)
     -> installed AUR pkgs: aur_mapper.map_api_data(...)
     -> new repo pkgs: ArchPackage(name, **data)
     -> new AUR pkgs: aur_mapper.map_api_data(apidata, None, categories)
```

### Data Flow: `read_installed()`

```
pacman.map_packages()              -> 'pacman -Qi' — parses ALL installed pkg info
    -> splits into 'signed' (repo) and 'not_signed' (unsigned/AUR)

Thread A: _fill_repo_pkgs()
    -> pacman.map_repositories()   -> 'pacman -Si <names>' — determines repo name
    -> pacman.list_repository_updates() -> 'pacman -Qu' — one-line updates list
    -> creates ArchPackage instances

Thread B: _fill_aur_pkgs()
    -> aur_client.get_info(names)  -> AUR RPC: https://aur.archlinux.org/rpc/?v=5&type=info&arg[]=...
    -> aur_mapper.map_api_data()   -> creates ArchPackage from API response
    -> checks rebuild_detector     -> 'rebuild-detector' (optional external tool)
    -> disk_loader.fill(pkg)       -> loads icon + cached data from ~/.cache/bauh/arch/<name>/
```

### Data Flow: `upgrade()` — The Most Complex Method

```
1. Check pacman DB lock (/var/lib/pacman/db.lck)
2. Partition into repo_pkgs / aur_pkgs
3. _sync_databases() if needed
4. For repo_pkgs:
   _upgrade_repo_pkgs():
     a. Check SyncFirst in /etc/pacman.conf for keyrings
     b. Upgrade keyrings first (recursive call)
     c. _download_packages() — multithreaded, uses pacman -Swdd
     d. _remove_transaction_packages() if any to_remove
     e. pacman.upgrade_several() -> 'pacman -S <pkgs> --noconfirm'
     f. Parse error output:
        - 'conflicting files' -> offer overwrite with --overwrite=*
        - 'breaks dependency' -> offer to skip dep checks with -dd
5. For aur_pkgs:
   -> aur_client.get_info() for last_modified
   -> For each AUR pkg: self.install(pkg, context=context)
      (AUR upgrade IS a full reinstall-from-source)
```

### `_downgrade_aur_pkg()` — Git-Based Downgrade

```
git clone https://aur.archlinux.org/<pkgbase>.git  (as pkgbuilder_user)
git log                     -> list all commits with timestamps
git checkout <target_commit>
_build(context)             -> runs makepkg, then pacman -U
```

### `_downgrade_repo_pkg()` — Cache-Based Downgrade

```
glob("/var/cache/pacman/pkg/<name>-*.pkg.tar.*")
filter versions < current_version
sort descending, take latest
pacman -U <cached_file>
```

### CLI Commands Used (from pacman.py)

| Function                                | Command                                                                          |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| `map_packages`                          | `pacman -Qi` (local) or `pacman -Si` (remote)                                    |
| `list_installed_names`                  | `pacman -Qq`                                                                     |
| `search`                                | `pacman -Ss <words>`                                                             |
| `install_as_process`                    | `pacman -U <files> --noconfirm -dd` (file) or `pacman -S <pkgs> --noconfirm -dd` |
| `upgrade_several`                       | `pacman -S <pkgs> --noconfirm [--overwrite=*] [-dd]`                             |
| `download`                              | `pacman -Swdd <pkgs> --noconfirm --noprogressbar`                                |
| `remove_several`                        | `pacman -R <pkgs> --noconfirm [-dd]`                                             |
| `sync_databases`                        | `pacman -Syy` (force) or `pacman -Sy`                                            |
| `upgrade_system`                        | `pacman -Syyu --noconfirm`                                                       |
| `get_info`                              | `pacman -Qi <pkg>` or `pacman -Si <pkg>`                                         |
| `map_repositories`                      | `pacman -Si [<pkgs>]`                                                            |
| `list_repository_updates`               | `pacman -Qu`                                                                     |
| `map_update_sizes`                      | `pacman -Si <pkgs>` → regex `Installed Size\s*:\s*([0-9,.]+)\s(\w+)`             |
| `map_download_sizes`                    | `pacman -Si <pkgs>` → regex `Download Size\s*:\s*([0-9,.]+)\s(\w+)`              |
| `get_installed_size`                    | `pacman -Qi <pkgs>`                                                              |
| `map_provided`                          | `pacman -Qi` or `pacman -Si`                                                     |
| `list_hard_requirements`                | `pacman -Rc <name> --print-format=%n`                                            |
| `list_post_uninstall_unneeded_packages` | `pacman -Rss <pkgs> --print-format=%n`                                           |
| `check_installed`                       | `pacman -Qq <pkg>`                                                               |
| `check_missing`                         | `pacman -Qq <names...>` → parse stderr                                           |
| `verify_pgp_key`                        | `pacman-key -l` → grep                                                           |
| `receive_key`                           | `pacman-key -r <key>`                                                            |
| `sign_key`                              | `pacman-key --lsign-key <key>`                                                   |
| `refresh_mirrors`                       | `pacman-mirrors -g`                                                              |
| `update_mirrors`                        | `pacman-mirrors -c <countries>`                                                  |
| `sort_fastest_mirrors`                  | `pacman-mirrors --fasttrack [<limit>]`                                           |
| `list_mirror_countries`                 | `pacman-mirrors -l`                                                              |
| `get_current_mirror_countries`          | `pacman-mirrors -lc`                                                             |
| `map_desktop_files`                     | `pacman -Ql <pkgs>` → grep `.desktop`                                            |
| `list_installed_files`                  | `pacman -Qlq <pkg>`                                                              |
| `is_snapd_installed`                    | `pacman -Qq snapd`                                                               |

### `map_packages` Output Parsing (The Core Parser)

```python
# runs: pacman -Qi (with LC_TIME='' for consistent date format)
# regex: RE_REPOSITORY_FIELDS = r'(Repository|Name|Description|Version|Install Date|Validated By)\s*:\s*(.+'
# Key insight: 'Validated By: None' means unsigned (AUR) package
# Splits into pkgs['signed'] and pkgs['not_signed']
# Also reads /etc/pacman.conf for IgnorePkg entries and filters them out
```

### Extra Methods (beyond abstract interface)

- `refresh_mirrors(root_password, watcher)` — interactive country selection, then `pacman-mirrors`
- `sync_databases(root_password, watcher)` — `pacman -Syy`
- `check_action_allowed(pkg, watcher)` — verifies user and gem config before destructive actions
- `add_package_builder_user(handler)` — creates `bauh-aur` system user for safe AUR builds
- `_build(context)` — full makepkg pipeline: download sources → verify checksums → build → install
- `edit_pkgbuild(pkg, ...)` — opens PKGBUILD in editor, stores in `~/.config/bauh/arch/pkgbuilds/`
- `_multithreaded_download_enabled(config)` — checks if `aria2c` is available + config flag
- `_update_aur_index(watcher)` — triggers `AURIndexUpdater` background thread
- `get_custom_settings(pkg)` — per-package settings (e.g. enable PKGBUILD editing for this pkg)

---

## 5. `gems/snap/controller.py` — `SnapManager`

### Notable Design Difference

Snap uses the **snapd REST socket API** (`SnapdClient`) as its primary data source rather than parsing CLI output. The `snap` CLI module (`snap.py`) is only used for mutating operations (install/remove/revert/refresh).

### Data Flow: `read_installed()`

```
snapd_client.list_all_snaps()  -> GET /v2/snaps (snapd socket)
snapd_client.list_only_apps()  -> GET /v2/snaps?select=enabled (returns only app-type snaps)
                                -> app_names set used to distinguish app vs. runtime/plugin

_map_to_app(app_json, installed=True)
    -> SnapApplication(id, name, license, version, description,
                       rev, publisher, verified_publisher, icon_url,
                       screenshots, download_size, channel, confinement,
                       app_type, installed_size)
```

### CLI Commands Used

| Operation           | Command                                            |
| ------------------- | -------------------------------------------------- |
| `install`           | `snap install <name> [--classic] [--channel=<ch>]` |
| `uninstall`         | `snap remove <name>`                               |
| `downgrade`         | `snap revert <name>`                               |
| `refresh` (upgrade) | `snap refresh <name> [--channel=<ch>]`             |
| `launch`            | `snap run <command>`                               |
| `is_api_available`  | `snap search` (checks for `error:` in output)      |

### Interesting Design Decisions

**`upgrade()` raises `NotImplementedError`** — Snap handles updates autonomously via snapd. The individual `refresh()` method is provided as a `CustomSoftwareAction` instead:

```python
def upgrade(self, requirements, root_password, watcher):
    raise Exception(f"'upgrade' is not supported by {SnapManager.__class__.__name__}")
```

**`get_history()` also raises** — Snap has no exposed version history:

```python
def get_history(self, pkg):
    raise Exception(f"'get_history' is not supported by {pkg.__class__.__name__}")
```

**`requires_root`** — Only PREPARE and SEARCH don't need root. Everything else does (all snap mutations require sudo):

```python
def requires_root(self, action, pkg):
    return action not in (SoftwareAction.PREPARE, SoftwareAction.SEARCH)
```

**Channel selection dialog:** When `snap_config['install_channel']` is True, before any install/refresh the manager queries `snapd_client.find_by_name(pkg.name)` to get all available channels, then presents a radio button dialog. The selected channel is passed as `--channel=<ch>`.

**Error recovery during install:** Parses `error: not available on stable` output → uses `RE_AVAILABLE_CHANNELS` regex to find alternatives → presents channel list to user.

### Extra Methods

- `refresh(pkg, root_password, watcher)` — `snap refresh <name>` (surfaced as CustomSoftwareAction)
- `change_channel(pkg, root_password, watcher)` — refreshes to a different channel
- `_request_channel_installation(...)` — interactive channel picker via snapd API

---

## 6. `gems/debian/controller.py` — `DebianPackageManager`

### Unique Architecture: `Aptitude` as Backend

Unlike the others, Debian's gem wraps `aptitude` (not `apt`/`apt-get`) as its sole CLI backend. The `Aptitude` class in `aptitude.py` is a comprehensive wrapper.

### Lazy Initialization via Properties

Every major component is lazily initialized:

```python
@property
def aptitude(self) -> Aptitude:
    if self._aptitude is None:
        self._aptitude = Aptitude(self._log)
    return self._aptitude

@property
def apps_index(self) -> Dict[str, DebianApplication]:
    if self._apps_index is None:
        self._update_apps_index(self.app_indexer.read_index())
    return self._apps_index
# Also: configman, view, app_mapper, output_handler, app_indexer, suggestions_downloader
```

This avoids startup cost — only initialize what's actually needed.

### Data Flow: `read_installed()`

```
Thread 1: configman.get_config()   -> reads YAML config file
Thread 2: _fill_ignored_updates()  -> reads ~/.config/bauh/debian/updates_ignored.txt

aptitude.read_installed()
    -> `aptitude search ~i -q -F '%p^%v^%V^%m^%s^%d' --disable-columns`
    -> yields DebianPackage per line: name^version^latest_version^maintainer^section^description
    -> marks update=True if installed_version != latest_version

For each package: pkg.bind_app(apps_index.get(pkg.name))
    -> associates .desktop file metadata (exe path, icon, etc.)
```

### `Aptitude` CLI Commands

| Method                 | Command                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------- |
| `show`                 | `aptitude show -q <pkg=ver> [-v]`                                                                              |
| `search`               | `aptitude search <query> -q -F '%p^%v^%V^%m^%s^%d' --disable-columns`                                          |
| `search_by_name`       | `aptitude search '(?exact-name(a)                                                                              | ?exact-name(b))' ...` |
| `read_installed`       | `aptitude search ~i ...`                                                                                       |
| `read_installed_names` | `aptitude search ~i -q -F '%p' --disable-columns`                                                              |
| `read_updates`         | `aptitude search ~U -q -F '%p^%V' --disable-columns --no-gui`                                                  |
| `install`              | `aptitude install -q -y --no-gui --full-resolver <pkgs> -o Aptitude::ProblemResolver::RemoveScore=9999999 ...` |
| `upgrade`              | Same pattern with `upgrade` verb                                                                               |
| `remove`               | Same with `remove` or `purge`                                                                                  |
| `simulate_*`           | Same commands + `-V -s -Z` flags (dry run)                                                                     |
| `update`               | `aptitude update`                                                                                              |

**The `gen_transaction_cmd` pattern is notable:**

```python
@staticmethod
def gen_transaction_cmd(type_, packages, simulate=False, delete_unused=False):
    return (f"aptitude {type_} -q -y --no-gui --full-resolver {' '.join(packages)}"
            f" -o Aptitude::ProblemResolver::RemoveScore=9999999"
            f" -o Aptitude::ProblemResolver::EssentialRemoveScore=9999999"
            f" -o Aptitude::Delete-Unused={str(delete_unused).lower()}"
            f"{' -V -s -Z' if simulate else ''}")
```

The `RemoveScore=9999999` flags prevent aptitude's conflict resolver from removing packages to fix problems — it forces a hard failure instead of silently removing things.

### `simulate_*` → `map_transaction_output` Pipeline

Before any real install/remove/upgrade, a dry-run is performed:

```python
def map_transaction_output(self, output: str) -> DebianTransaction:
    # Parses aptitude simulation output sections:
    # "The following NEW packages will be installed:"  -> to_install
    # "The following packages will be upgraded:"       -> to_upgrade
    # "The following packages will be REMOVED:"        -> to_remove
    # Uses regex: r'([a-zA-Z0-9\-_@~.+:]+)({\w+})?\s*\[([version]...)(\s+->\s+[newver])?](\s*<[±size]>)?'
    # Extracts: name, current_version, new_version, transaction_size
```

This dry-run result is presented to the user as a confirmation dialog before executing.

### `AptitudeOutputHandler` — Real-time Progress Parsing

A background thread parses live aptitude stdout:

```
"Unpacking <pkg> ..."  -> increment _unpacking count -> update progress bar
"Removing <pkg> ..."   -> increment _removing count
"Get: <n> https://..." -> increment _downloading count (RE: r'Get:\s+\d+\s+https?://(.+)')
progress = (unpacking + downloading) / 2 / total_targets * 100
```

### `get_upgrade_requirements()` — Pre-flight Analysis

The Debian gem's most sophisticated method:

```
aptitude.simulate_upgrade(pkg_names)   # dry-run
aptitude.show(pkgs, attrs=('compressed size', 'depends', 'predepends'))
_map_dependents(update_data)           # builds reverse dep graph
-> returns UpgradeRequirements with:
   to_install: new deps + their reason ("required by X, Y")
   to_remove:  packages that must be removed (conflicts)
   to_upgrade: the actual targets with download sizes
```

### Extra Methods (beyond abstract interface)

- `synchronize_packages(root_password, watcher)` — runs `aptitude update` (surfaced as CustomSoftwareAction)
- `index_apps(...)` — scans filesystem for `.desktop` files and maps them to packages
- `purge(pkg, root_password, watcher)` — calls `aptitude purge` (removes config files too)
- `launch_sources_app(root_password, watcher)` — opens `software-properties-gtk` (or auto-detects)
- `get_installed_source_apps()` — checks `shutil.which()` for known sources apps
- `_refresh_apps_index(watcher)` — after install, re-scans `.desktop` files for new apps

**`downgrade` is explicitly not supported:**

```python
def downgrade(self, pkg, root_password, handler):
    return False
```

---

## 7. `gems/flatpak/flatpak.py` — Low-Level Flatpak CLI Wrapper

### Design Pattern: `SimpleProcess` as Return Type

Most mutating functions return a `SimpleProcess` object rather than running synchronously. The controller calls `ProcessHandler(watcher).handle_simple(process)` to stream output to the UI. This separation means:

- The low-level module just describes WHAT to run
- The controller decides HOW to handle output and errors

```python
def install(app_id, origin, installation, version) -> SimpleProcess:
    return SimpleProcess(
        cmd=('flatpak', 'install', origin, app_id, '-y', f'--{installation}'),
        extra_paths={EXPORTS_PATH},        # adds ~/.local/share/flatpak/exports/bin to PATH
        lang=DEFAULT_LANG if version < VERSION_1_12 else None,  # force locale for old versions
        wrong_error_phrases={'Warning'} if version < VERSION_1_12 else None,
        shell=True
    )
```

The `wrong_error_phrases` parameter tells `ProcessHandler` to NOT treat lines matching those as failures (older flatpak writes warnings to stderr that look like errors).

### Version Branching

```python
VERSION_1_2 = (1, 2)
VERSION_1_3 = (1, 3)
VERSION_1_5 = (1, 5)
VERSION_1_12 = (1, 12)

def list_installed(version):
    if version < VERSION_1_2:
        # Old format: 'flatpak list -d'  -> tab-separated with different column order
        app_list = new_subprocess(('flatpak', 'list', '-d'), lang=None)
    else:
        # New format with --columns=
        name_col = '' if version < VERSION_1_3 else 'name,'
        cols = f'application,ref,arch,branch,description,origin,options,{name_col}version'
        app_list = new_subprocess(('flatpak', 'list', f'--columns={cols}'), lang=None)
```

### Key Parsing Functions

**`search()` — version-aware tab parsing:**

```python
# v >= 1.3: [name, description, id, version, branch, origin]
# v >= 1.2: [name-description, id, version, branch, origin]  (name embedded in first col)
# v < 1.2:  [id, version, branch, origin, description]
```

**`get_app_commits_data()` — history from `remote-info --log`:**

```python
log = `flatpak remote-info --log <origin> <ref> --<installation>`
res = re.findall(r'(Commit|Subject|Date):\s(.+)', log)
# Groups into triplets of (Commit, Subject, Date)
# Date format: '%Y-%m-%d %H:%M:%S +0000'
```

**`fill_updates()` — update detection parsing:**

```python
updates = `flatpak update --<installation> --no-deps`
# Pipes stdout to grep for r'[0-9]+\.\s+.+'
# tab-splits each line
# OPERATION_UPDATE_SYMBOLS = {'i', 'u'} — operation column values meaning Install/Update
# Detects '(partial)' suffix for partial updates (different runtime component)
```

**`map_update_download_size()` — size extraction:**

```python
output = `flatpak update --<installation> --no-deps`  # dry-run style
# Regex p2 = r'([0-9.?a-zA-Z]+\s?)'  — captures '123.4?MB' style size strings
# VERSION_1_5+: split on '?' -> ('123.4', 'MB') -> size_to_byte()
```

**`list_remotes()` — tab-split with level detection:**

```python
output = `flatpak remotes`
# Each line: "<name>\t<level>\t..."
# 'system' or 'user' in second column
# Returns: {'system': set(), 'user': set()}
```

---

## 8. `gems/arch/pacman.py` — Low-Level Pacman CLI Wrapper

### Design Philosophy

Unlike `flatpak.py`, most functions here **run synchronously** (`run_cmd`) and return parsed data structures. Only functions that are part of transactions (install, remove, upgrade, download, sync) return `SimpleProcess`.

### Key Regex Patterns

```python
RE_DEPS = re.compile(r'[\w\-_]+:[\s\w_\-.]+\s+\[\w+]')
RE_DEP_OPERATORS = re.compile(r'[<>=]')          # split 'glibc>=2.31' -> ['glibc', '2.31']
RE_REPOSITORY_FIELDS = re.compile(r'(Repository|Name|Description|Version|Install Date|Validated By)\s*:\s*(.+)')
RE_INSTALLED_SIZE = re.compile(r'Installed Size\s*:\s*([0-9,.]+)\s(\w+)\n?', re.IGNORECASE)
RE_DOWNLOAD_SIZE = re.compile(r'Download Size\s*:\s*([0-9,.]+)\s(\w+)\n?', re.IGNORECASE)
RE_REMOVE_TRANSITIVE_DEPS = re.compile(r'removing\s([\w\-_]+)\s.+required\sby\s([\w\-_]+)\n?')
RE_AVAILABLE_MIRRORS = re.compile(r'.+\s+OK\s+.+\s+(\d+:\d+)\s+.+(http.+)')
RE_PACMAN_SYNC_FIRST = re.compile(r'SyncFirst\s*=\s*(.+)')  # reads /etc/pacman.conf
RE_DESKTOP_FILES = re.compile(r'\n?([\w\-_]+)\s+(/usr/share/.+\.desktop)')
RE_IGNORED_PACKAGES: Optional[Pattern] = None    # lazy-init for IgnorePkg= in pacman.conf
```

### `map_packages()` — The Heart of Arch Package Reading

```python
def map_packages(names=None, remote=False, signed=True, not_signed=True, skip_ignored=False):
    # Runs: pacman -Qi (local) or pacman -Si (remote)
    # env['LC_TIME'] = '' — force consistent date formatting
    # Parses RE_REPOSITORY_FIELDS matches in sequence
    # Key: 'Validated By: None' == unsigned == likely AUR
    # Returns: {'signed': {name: data}, 'not_signed': {name: data}}
    # Concurrently reads IgnorePkg from /etc/pacman.conf and strips those out
```

### `map_updates_data()` — Rich Update Metadata

```python
# pacman -Si <pkgs>
# Extracts per-package: {
#   'ds': download_size (bytes),
#   's':  installed_size (bytes),
#   'v':  version,
#   'r':  repository,
#   'c':  set of conflicts_with,
#   'p':  set of provides (including name=version form),
#   'd':  set of depends_on,
#   'des': description (optional)
# }
# Used by ArchManager.get_upgrade_requirements() to build conflict/dep analysis
```

### `list_hard_requirements()` — Who REQUIRES This Package

```python
# pacman -Rc <name> --print-format=%n [--assume-installed=<provider>...]
# Returns set of package names that would also be removed
# Raises PackageInHoldException if 'HoldPkg' in output
# Raises PackageNotFoundException if 'target not found' in output
```

The `assume_installed` parameter is used when a package is being REPLACED (the replacer pkg is assumed installed so it doesn't appear as a broken dependency).

### `map_provided()` — "What does each package provide?"

```python
# pacman -Qi or -Si
# For each package, builds: {
#   'pkgname': {'pkgname'},              # package provides itself
#   'pkgname=1.2.3': {'pkgname'},        # versioned self-provide
#   'libfoo.so=1': {'pkgname'},          # soname provides
#   'pkgconfig(foo)': {'pkgname'},       # pkgconfig provides
# }
# Used during dependency resolution to check if a dep is satisfied
```

### `install_as_process()` — Flexible Install

```python
def install_as_process(pkgpaths, root_password, file, pkgdir='.', overwrite_conflicting_files=False, simulate=False, as_deps=False):
    cmd = ['pacman', '-U'] if file else ['pacman', '-S']
    # file=True: install from local .pkg.tar.* file (used for downgrade, AUR)
    # file=False: install from repository by name
    # -dd: skip dependency checks
    # --overwrite=*: overwrite any conflicting files
    # --asdeps: mark as dependency (affects orphan detection)
    # --confirm vs --noconfirm: simulate mode uses confirm (won't actually run)
```

### Config Parsing

Two functions parse `/etc/pacman.conf` directly:

```python
def list_ignored_packages(config_path='/etc/pacman.conf'):
    # RE_IGNORED_PACKAGES = r'[\s#]*ignorepkg\s*=\s*.+'
    # Lazy-init global regex (thread-unsafe but practically fine)

def get_packages_to_sync_first():
    # RE_PACMAN_SYNC_FIRST = r'SyncFirst\s*=\s*(.+)'
    # Returns set of package names (usually keyrings)
    # Used to upgrade security-critical packages before anything else
```

---

## Cross-Cutting Patterns & Design Observations

### 1. The `SimpleProcess` / `ProcessHandler` Abstraction

All gems use a common pattern:

```python
# In low-level module:
def some_operation(...) -> SimpleProcess:
    return SimpleProcess(cmd=['tool', 'args'], root_password=root_password, ...)

# In controller:
success, output = ProcessHandler(watcher).handle_simple(some_operation(...))
```

`ProcessHandler` streams output lines to the `ProcessWatcher` (the GUI's progress dialog), handles root escalation (via sudo with `-S` flag reading password from stdin), and checks `error_phrases` / `wrong_error_phrases` to determine success.

### 2. Parallelism via `Thread` + `join()`

Every manager uses manual threading for independent I/O operations:

- Flatpak: system + user update checks in parallel
- Arch: AUR API + repo search + installed names in parallel
- Debian: config load + ignored updates load in parallel
- All: suggestions cache checks run concurrently

### 3. Update Ignore System

All four gems implement update ignoring via a plain text file:

```
~/.config/bauh/flatpak/updates_ignored.txt  (one key per line)
~/.config/bauh/arch/updates_ignored.txt     (package names)
~/.config/bauh/debian/updates_ignored.txt   (package names)
```

The `ignoreHere is the complete structured deep-dive report:

---

# bauh Codebase Deep-Dive Report

## Architecture Overview

bauh uses a classic **plugin/gem architecture**. The core defines abstract base classes that every "gem" (package manager backend) must implement. The GUI talks only to the abstract interface (`SoftwareManager`). Each gem wires up to real CLI tools (`flatpak`, `pacman`, `snap`, `aptitude`) by spawning subprocesses, parsing their output, and mapping results into a unified data model.

```
GUI Layer
    │
    ▼
SoftwareManager (ABC)      ← abstract/controller.py
    │   SoftwarePackage (ABC)   ← abstract/model.py
    │
    ├── FlatpakManager         gems/flatpak/controller.py
    │       └── flatpak.py     (CLI wrapper)
    │
    ├── ArchManager            gems/arch/controller.py
    │       └── pacman.py      (CLI wrapper)
    │
    ├── SnapManager            gems/snap/controller.py
    │       └── snap.py        (CLI wrapper)
    │
    └── DebianPackageManager   gems/debian/controller.py
            └── aptitude.py    (CLI wrapper)
```

---

## 1. `bauh/api/abstract/controller.py` — The Abstract Contract

### Key Helper Classes

**`SearchResult`**

```python
def __init__(self, installed: Optional[List[P]], new: Optional[List[P]], total: int):
    # installed: packages already on the machine
    # new:       packages found in the remote index/store
    # total:     combined count
```

`update_total()` recalculates `total` from `len(installed) + len(new)`.
`SearchResult.empty()` is a class-method convenience factory.

**`UpgradeRequirement`**

```python
def __init__(self, pkg, reason=None, required_size=None, extra_size=None, sorting_priority=0):
    # required_size: bytes needed to perform upgrade
    # extra_size:    delta between old and new on-disk size
    # sorting_priority: higher = shown first in UI
```

`sort_by_priority` is a static key function: `(-priority, name)` so high-priority items sort first.

**`UpgradeRequirements`**

```python
def __init__(self, to_install, to_remove, to_upgrade, cannot_upgrade):
    self.context = {}   # ← important: gems stash computed data here for reuse in upgrade()
```

The `context` dict is a gem-private cache. `ArchManager` puts dependency data in `requirements.context['data']` during `get_upgrade_requirements` so `upgrade()` doesn't have to recompute it.

**`TransactionResult`**

```python
def __init__(self, success: bool, installed: Optional[List[SoftwarePackage]], removed: Optional[List[SoftwarePackage]])
```

`TransactionResult.fail()` is a static factory for the common failure case.

**`SoftwareAction` Enum**

```python
class SoftwareAction(Enum):
    PREPARE = 0
    SEARCH = 1
    INSTALL = 2
    UNINSTALL = 3
    UPGRADE = 4
    DOWNGRADE = 5
```

Passed to `requires_root()` so each gem can decide per-action root requirements.

### `SoftwareManager` Abstract Methods (all 14)

| Method                       | Signature                                                                       | Notes                                                           |
| ---------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `search`                     | `(words, disk_loader, limit, is_url) → SearchResult`                            | `is_url` flag lets gems skip if they don't support URL installs |
| `read_installed`             | `(disk_loader, limit, only_apps, pkg_types, internet_available) → SearchResult` | `pkg_types=None` means "any type"                               |
| `downgrade`                  | `(pkg, root_password, handler) → bool`                                          |                                                                 |
| `upgrade`                    | `(requirements, root_password, watcher) → bool`                                 | Receives pre-computed `UpgradeRequirements`                     |
| `uninstall`                  | `(pkg, root_password, watcher, disk_loader) → TransactionResult`                | Returns full list of removed packages (deps included)           |
| `install`                    | `(pkg, root_password, disk_loader, watcher) → TransactionResult`                | Returns full list of installed packages (deps included)         |
| `get_managed_types`          | `() → Set[Type[SoftwarePackage]]`                                               | Each gem returns its own model class(es)                        |
| `get_info`                   | `(pkg) → dict`                                                                  | Key-value pairs for the info panel                              |
| `get_history`                | `(pkg) → PackageHistory`                                                        |                                                                 |
| `is_enabled` / `set_enabled` | `(bool)`                                                                        | Runtime enable/disable                                          |
| `can_work`                   | `() → Tuple[bool, Optional[str]]`                                               | Checks if prerequisites (CLI tools) are installed               |
| `requires_root`              | `(action, pkg) → bool`                                                          |                                                                 |
| `prepare`                    | `(task_manager, root_password, internet_available)`                             | Called once at startup; runs background tasks                   |
| `list_updates`               | `(internet_available) → List[PackageUpdate]`                                    |                                                                 |
| `list_warnings`              | `(internet_available) → Optional[List[str]]`                                    | Banners shown at startup                                        |
| `is_default_enabled`         | `() → bool`                                                                     | Whether enabled if no user config exists                        |
| `launch`                     | `(pkg)`                                                                         | Opens the application                                           |

### Concrete Default Methods (overridable, not abstract)

```python
def get_upgrade_requirements(...) -> UpgradeRequirements:
    # Default: wraps each pkg in UpgradeRequirement, no deps analysis
    return UpgradeRequirements(None, None, [UpgradeRequirement(p) for p in pkgs], None)

def cache_to_disk(pkg, icon_bytes, only_icon):
    # Guards with pkg.supports_disk_cache() before calling serialize_to_disk

def serialize_to_disk(pkg, icon_bytes, only_icon):
    # Writes data.json (or .yml) + icon.png to pkg.get_disk_cache_path()

def clean_cache_for(pkg):
    # Removes the disk cache directory
    shutil.rmtree(pkg.get_disk_cache_path())

def list_suggestions(limit, filter_installed) → Optional[List[PackageSuggestion]]:
    pass  # each gem overrides this

def gen_custom_actions() → Generator[CustomSoftwareAction, None, None]:
    yield from ()  # empty by default

def get_screenshots(pkg) → Generator[str, None, None]:
    pass

def fill_sizes(pkgs): pass
def ignore_update(pkg): pass
def revert_ignored_update(pkg): pass
```

---

## 2. `bauh/api/abstract/model.py` — The Data Model

### `SoftwarePackage` (ABC)

The base for every installable unit. All fields live on `__init__`:

```python
def __init__(self,
    id: str = None,           # unique identifier (app ID, package name, etc.)
    version: str = None,      # currently installed version
    name: str = None,         # human display name
    description: str = None,
    latest_version: str = None,  # newest available
    icon_url: str = None,     # URL or filesystem path
    status: PackageStatus = PackageStatus.READY,
    installed: bool = False,
    update: bool = False,     # True if latest_version > version
    size: int = None,         # bytes
    categories: List[str] = None,
    license: str = None
)
# Auto-set: self.gem_name = self.__module__.split('.')[2]  (e.g. 'flatpak', 'arch')
```

**Abstract methods every package type must implement:**

| Method                         | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `has_history()`                | Whether commit/version history is available     |
| `has_info()`                   | Whether an info panel should be offered         |
| `can_be_downgraded()`          |                                                 |
| `get_type()`                   | Short string like `'flatpak'`, `'aur'`          |
| `get_default_icon_path()`      | Fallback icon                                   |
| `get_type_icon_path()`         | Badge icon overlay                              |
| `is_application()`             | True for GUI apps; False for libraries/runtimes |
| `get_data_to_cache() → dict`   | Data serialized to `data.json`                  |
| `fill_cached_data(data: dict)` | Restore from `data.json`                        |
| `can_be_run() → bool`          | Whether a "launch" button should appear         |
| `get_publisher() → str`        |                                                 |
| `supports_backup() → bool`     |                                                 |

**Key concrete methods with default behaviour:**

```python
def supports_disk_cache(self):
    return self.installed and self.is_application()
    # Only cache installed GUI apps, not runtimes/libraries

def get_disk_cache_path(self):
    return f'{CACHE_DIR}/{self.get_type()}'
    # e.g. ~/.cache/bauh/flatpak/

def get_disk_icon_path(self):
    return '{}/icon.png'.format(self.get_disk_cache_path())

def get_disk_data_path(self):
    return '{}/data.json'.format(self.get_disk_cache_path())

def can_be_updated(self) -> bool:
    return self.installed and self.update

def can_be_uninstalled(self):
    return self.installed

def can_be_installed(self):
    return not self.installed
```

### `CustomSoftwareAction`

Used for gem-specific actions ("Full update", "Sync packages", "Index apps", etc.):

```python
def __init__(self,
    i18n_label_key: str,       # localization key for button label
    i18n_status_key: str,      # localization key while running
    icon_path: str,
    manager_method: str,       # ← string name of the method to call on SoftwareManager
    requires_root: bool,
    manager: SoftwareManager = None,
    backup: bool = False,      # trigger system backup before running
    refresh: bool = True,      # refresh package list on success
    i18n_confirm_key: str = None,
    requires_internet: bool = False,
    requires_confirmation: bool = True,
    i18n_description_key: Optional[str] = None
)
```

The GUI invokes actions by calling `getattr(manager, action.manager_method)(pkg, root_password, watcher)`.

### `PackageUpdate`

```python
def __init__(self, pkg_id: str, version: str, pkg_type: str, name: str)
# Lightweight DTO — just enough to display update counts per gem type
```

### `PackageHistory`

```python
def __init__(self, pkg: SoftwarePackage, history: List[dict], pkg_status_idx: int)
# history: list of {commit/date/subject/version} dicts
# pkg_status_idx: index of the currently-installed entry
```

### `PackageSuggestion`

```python
def __init__(self, package: SoftwarePackage, priority: SuggestionPriority)
# SuggestionPriority: LOW=0, MEDIUM=1, HIGH=2, TOP=3
```

### `PackageStatus` Enum

```python
READY = 1        # all data populated
LOADING_DATA = 2 # async data loader still running
```

---

## 3. `gems/flatpak/controller.py` — `FlatpakManager`

`FlatpakManager` implements `SoftwareManager` and also `SettingsController` (for its config panel).

### CLI Commands Called (via `flatpak.py` layer)

All commands go through `flatpak.py` functions returning `SimpleProcess` objects, then run via `ProcessHandler.handle_simple()`.

| Operation            | Command                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| List installed       | `flatpak list --columns=application,ref,arch,branch,description,origin,options,[name,]version` |
| Search               | `flatpak search <word> --<installation>`                                                       |
| Install              | `flatpak install <origin> <app_id> -y --<installation>`                                        |
| Uninstall            | `flatpak uninstall <ref> -y --<installation>`                                                  |
| Update one           | `flatpak update -y <ref> --<installation> [--no-related] [--no-deps]`                          |
| Full update          | `flatpak update -y`                                                                            |
| Downgrade            | `flatpak update --no-related --no-deps --commit=<hash> <ref> -y --<installation>`              |
| Check updates        | `flatpak update --<installation> --no-deps` (read-only — no `-y`)                              |
| Remote-info log      | `flatpak remote-info --log <origin> <ref> --<installation>`                                    |
| List remotes         | `flatpak remotes`                                                                              |
| Add flathub          | `flatpak remote-add --if-not-exists flathub <url> --<installation>`                            |
| Get info             | `flatpak info <app_id> <branch> --<installation>`                                              |
| Run                  | `flatpak run <app_id>` (via `subprocess.Popen`, fire-and-forget)                               |
| Version check        | `flatpak --version`                                                                            |
| Runtime update check | `flatpak update --<installation>` (stderr-parsed for `Required runtime` lines)                 |

### Key Output Parsing

**`list_installed`** (version-branched):

```python
# flatpak >= 1.3: column output with --columns=
data = o.decode().strip().split('\t')
# data[0]=id, [1]=ref, [2]=arch, [3]=branch, [4]=desc, [5]=origin, [6]=options, [7]=name, [8]=version
runtime = 'runtime' in data[6]
installation = 'user' if 'user' in data[6] else 'system'
```

**`fill_updates`** (for detecting available updates):

```python
# Pipes output of 'flatpak update --no-deps' through grep -E '[0-9]+\. .+'
# Each matching line is tab-split: [idx, ?, id, branch, op_symbol, ?, size]
# op_symbol in {'i','u'} means install/upgrade
# '(partial)' in last field → partial update
update_id = f'{line_split[2]}/{line_split[3]}/{installation}'  # v1.5+
```

**`get_app_commits_data`** (for history/downgrade):

```python
log = run_cmd(f'flatpak remote-info --log {origin} {app_ref} --{installation}')
res = re.findall(r'(Commit|Subject|Date):\s(.+)', log)
# Groups of 3 → each becomes a history dict entry
```

**`RE_REQUIRED_RUNTIME`** regex:

```python
RE_REQUIRED_RUNTIME = re.compile(
    f'Required\s+runtime\s+.+\(([\w./]+)\)\s*.+\s+remote\s+([\w+./]+)'
)
# Captures: (ref, origin) for runtimes that need updating
```

### Data Flow: `search()`

```
words → flatpak.search() → raw dict list
       → read_installed() → compare IDs
       → matched: res.installed.append(installed_app)
       → unmatched: _map_to_model(app_found, False, ...) → res.new
```

### Data Flow: `read_installed()`

1. Launches two background threads: updates checker + (v1.12+) required-runtime checker
2. Calls `flatpak.list_installed(version)` synchronously
3. Waits for update thread; crosses update map against installed models
4. Handles "partial" updates (sub-app components)
5. Handles "update components" (new runtimes needed but not yet installed)
6. Reads ignored-updates file; marks `model.updates_ignored = True`

### Extra Methods Beyond the Interface

```python
def sort_update_order(self, pkgs) -> List[FlatpakApplication]:
    # Sorts: runtimes first (by installation, name, id), then apps
    # Ensures runtimes update before apps that depend on them

def full_update(self, root_password, watcher) -> bool:
    # Custom action: runs 'flatpak update -y' (all packages at once)

def _make_exports_dir(self, watcher) -> bool:
    # Ensures ~/.local/share/flatpak/exports exists before any mutation

def _read_ignored_updates(self) -> Set[str]
def _write_ignored_updates(self, keys: Set[str])
def ignore_update(self, pkg) / revert_ignored_update(self, pkg)
    # Persists ignored update keys to UPDATES_IGNORED_FILE (plain text, one key per line)

def get_settings() → Generator[SettingsView, None, None]:
    # Yields a settings panel for installation_level (system/user/ask)

def save_settings(component) → Tuple[bool, Optional[List[str]]]:
    # Writes updated installation_level back to config file
```

### Version Compatibility Pattern

The flatpak gem tracks version as a `Tuple[str, ...]` (e.g., `(1, 5, 0)`) and branches on sentinel constants:

```python
VERSION_1_2 = (1, 2)
VERSION_1_3 = (1, 3)
VERSION_1_5 = (1, 5)
VERSION_1_12 = (1, 12)
# Used extensively: if version >= VERSION_1_5: ...
```

Older versions use different `flatpak list -d` output format; newer versions use `--columns=`.

---

## 4. `gems/arch/controller.py` — `ArchManager`

The most complex gem. Handles both official repos (`pacman -S`) and AUR (git clone + `makepkg`).

### `TransactionContext` — Rich State Object

A data class carrying all state across a multi-step install/upgrade transaction:

```python
class TransactionContext:
    name, base, maintainer       # package identity
    watcher, handler             # UI callbacks
    dependency, skip_opt_deps    # dep-resolution flags
    build_dir, project_dir       # AUR build paths
    root_password
    arch_config: dict            # full config snapshot
    install_files: Set[str]      # .pkg.tar.* paths for file installs
    repository: str              # 'aur' or repo name
    pkg: ArchPackage
    provided_map: Dict[str, Set[str]]      # lazy-loaded
    remote_repo_map: Dict[str, str]        # lazy-loaded
    remote_provided_map: Dict[str, Set[str]] # lazy-loaded
    aur_idx: Set[str]            # AUR package name index
    missing_deps: List[Tuple[str, str]]
    installed: Set[str]          # names installed in this transaction
    removed: Dict[str, SoftwarePackage]
    pkgbuild_edited: bool        # True if user edited the PKGBUILD
    last_modified: Optional[int] # AUR timestamp
    commit: Optional[str]        # git commit hash
    update_aur_index: bool
```

Lazy-loading properties prevent unnecessary CLI calls:

```python
def get_provided_map(self) -> Dict[str, Set[str]]:
    if self.provided_map is None:
        self.provided_map = pacman.map_provided()
    return self.provided_map
```

### CLI Commands Called

**Via `pacman.py`:**

| Operation                  | Command                                           |
| -------------------------- | ------------------------------------------------- |
| List installed (with info) | `pacman -Qi` (parsed by `map_packages`)           |
| List installed names       | `pacman -Qq`                                      |
| Search repos               | `pacman -Ss <words>`                              |
| Get info (local)           | `pacman -Qi <pkg>`                                |
| Get info (remote)          | `pacman -Si <pkg>`                                |
| Install from repo          | `pacman -S <pkgs> --noconfirm -dd`                |
| Install from file          | `pacman -U <file.pkg.tar.*> --noconfirm -dd`      |
| Remove                     | `pacman -R <pkgs> --noconfirm`                    |
| Download only              | `pacman -Swdd <pkgs> --noconfirm --noprogressbar` |
| Sync databases             | `pacman -Syy`                                     |
| Full system upgrade        | `pacman -Syyu --noconfirm`                        |
| List repo updates          | `pacman -Qu`                                      |
| Map repositories           | `pacman -Si <pkgs>`                               |
| Get provided/provides      | `pacman -Qi` (parsed field by field)              |
| Check missing              | `pacman -Qq <names>` → stderr parsing             |
| Hard requirements          | `pacman -Rc <name> --print-format=%n`             |
| Post-uninstall unneeded    | `pacman -Rss <names> --print-format=%n`           |
| List desktop files         | `pacman -Ql <pkg>` (filtered for `.desktop`)      |
| List installed files       | `pacman -Qlq <pkg>`                               |
| Installed size             | `pacman -Si <pkgs>` → parse "Installed Size:"     |
| Download size              | `pacman -Si <pkgs>` → parse "Download Size:"      |
| Sync-first pkgs            | read `/etc/pacman.conf` for `SyncFirst =`         |
| PGP key receive            | `pacman-key -r <key>`                             |
| PGP key sign               | `pacman-key --lsign-key <key>`                    |
| Mirror refresh             | `pacman-mirrors -g`                               |
| Mirror sort                | `pacman-mirrors --fasttrack [N]`                  |
| Mirror countries           | `pacman-mirrors -l` / `-lc`                       |
| Available mirrors          | `pacman-mirrors --status --no-color`              |

**Via git (AUR builds):**

```python
git.clone(URL_GIT.format(base_name), target_dir)   # git clone https://aur.archlinux.org/<pkg>.git
git.list_commits(clone_dir)                          # git log
new_subprocess(['git', 'checkout', target_commit])  # for downgrade
new_subprocess(['git', 'reset', '--hard', commit])  # for version-compare downgrade
```

**AUR API (HTTP):**

```python
self.aur_client.search(query)          # GET https://aur.archlinux.org/rpc/?...type=search
self.aur_client.get_info(names)        # GET https://aur.archlinux.org/rpc/?...type=info
self.aur_client.get_src_info(name)     # GET https://aur.archlinux.org/cgit/.../plain/.SRCINFO
```

### `read_installed()` Data Flow

```
1. Calls pacman.map_packages() → {'signed': {...}, 'not_signed': {...}}
   - signed   = packages in official repos (validated by keyring)
   - not_signed = AUR packages (no repo validation)

2. AUR index lookup: aur_client.read_index() → checks which not_signed are in AUR vs just unvalidated repo pkgs

3. Two parallel threads:
   Thread A: _fill_aur_pkgs()   → AUR API + fills update status
   Thread B: _fill_repo_pkgs()  → pacman -Si for repo updates

4. Optional rebuild-detector thread (if config['aur_rebuild_detector']):
   rebuild_detector.list_required_rebuild() → packages whose deps were rebuilt

5. Mark update-ignored packages from UPDATES_IGNORED_FILE
```

### Key Output Parsing in `pacman.py`

**`map_packages()`** — the master parser:

```python
# Runs: pacman -Qi (all installed, with full info)
# Uses RE_REPOSITORY_FIELDS = re.compile(r'(Repository|Name|Description|Version|Install Date|Validated By)\s*:\s*(.+)')
# State machine: accumulates fields into current_pkg dict
# 'Validated By': None → goes to pkgs['not_signed'] (AUR)
# 'Validated By': anything else → goes to pkgs['signed'] (repo)
```

**`list_repository_updates()`**:

```python
output = run_cmd('pacman -Qu')
# Line format: "<name> <current> -> <new>"
# Split on ' ': line_split[0]=name, line_split[-1]=new_version
```

**`map_updates_data()`** — deep update metadata parser:

```python
# Runs pacman -Si <pkgs> and state-machine parses:
# Repository, Name, Version, Provides, Depends On, Conflicts With,
# Download Size, Installed Size
# Stores as compact dict: {'ds': bytes, 's': bytes, 'c': conflicts_set,
#                          'p': provides_set, 'd': deps_set, 'r': repo}
```

**`map_provided()`** — builds provider map:

```python
# pacman -Qi (or -Si for remote)
# Builds: {provided_name: {source_pkg, ...}}
# Also indexes versioned provides: {'foo=1.2': {'libfoo'}}
```

### Extra Methods Beyond the Interface

The arch gem has by far the most extra surface area:

```python
# Custom actions:
refresh_mirrors(root_password, watcher) → bool
sync_databases(root_password, watcher) → bool
check_action_allowed(pkg, watcher) → bool  # checks if pkg is in pacman HoldPkg

# AUR-specific:
add_package_builder_user(handler) → bool
    # Creates 'bauh-aur' system user (for makepkg security isolation)
    # useradd --system --no-create-home bauh-aur

_build(context) → bool              # runs makepkg
_compile_package(context) → bool    # compiles from PKGBUILD
_install(context) → bool            # pacman -U or pacman -S
_handle_missing_deps(context) → bool

# Ignored updates (plain text file, one name per line):
ignore_update(pkg) / revert_ignored_update(pkg)

# Settings UI:
get_settings() → Generator[SettingsView, ...]
save_settings(component) → Tuple[bool, Optional[List[str]]]

# Conflict/breakage UI helpers:
_map_conflicting_file(output) → List[MultipleSelectComponent]
_map_dependencies_breakage(output) → List[ViewComponent]
```

### AUR Build Flow (`_build` → `_compile_package`)

```
1. Clone AUR git repo into temp build dir as 'bauh-aur' user
2. Optionally open PKGBUILD editor if user requested
3. Validate .SRCINFO
4. Download sources (optionally multithreaded)
5. Verify/import GPG keys
6. Run: makepkg -ALcf --nodeps (as bauh-aur user)
7. Run: pacman -U <built_pkg.tar.*> --noconfirm -dd (as root)
8. Update AUR index
9. Clean build directory (if config says so)
```

---

## 5. `gems/snap/controller.py` — `SnapManager`

Simpler than Arch: snap operations are straightforward commands. Most queries go through `SnapdClient` (Unix socket to snapd), while mutations use the `snap` CLI.

### CLI Commands Called

**Via `snap.py`:**

| Operation              | Command                                            |
| ---------------------- | -------------------------------------------------- |
| Install                | `snap install <name> [--classic] [--channel=<ch>]` |
| Uninstall              | `snap remove <name>`                               |
| Downgrade              | `snap revert <name>`                               |
| Refresh (upgrade)      | `snap refresh <name> [--channel=<ch>]`             |
| Run                    | `snap run <cmd>` (fire-and-forget `Popen`)         |
| API availability check | `snap search` (check for `'error:'` in output)     |

**Via `SnapdClient` (HTTP over Unix socket `/run/snapd.socket`):**

| Operation                | SnapdClient method            |
| ------------------------ | ----------------------------- |
| List all installed snaps | `GET /v2/snaps`               |
| List apps (not runtimes) | `GET /v2/apps?select=service` |
| Search/find snap         | `GET /v2/find?q=<words>`      |
| Find by exact name       | `GET /v2/find?name=<name>`    |
| List snap commands       | `GET /v2/apps?names=<name>`   |
| List channels            | embedded in `find` response   |

### Notable Design Points

**`upgrade()` is explicitly not supported:**

```python
def upgrade(self, requirements, root_password, watcher) -> SystemProcess:
    raise Exception(f"'upgrade' is not supported by {SnapManager.__class__.__name__}")
```

Snap updates run silently in background via snapd. The gem only supports per-package `refresh` as a custom action.

**`get_history()` is also unsupported:**

```python
def get_history(self, pkg) -> PackageHistory:
    raise Exception(f"'get_history' is not supported by {pkg.__class__.__name__}")
```

**Channel selection UI** — `_request_channel_installation()`:

```python
# Fetches available channels from snapd
# If snap_config['install_channel'] is True:
#   Shows RadioSelect with all channels (e.g. latest/stable, latest/edge, ...)
#   Returns selected channel string
# Channel injected into install_and_stream as --channel=<ch>
```

**Install error recovery:**

```python
if 'not available on stable' in output:
    channels = RE_AVAILABLE_CHANNELS.findall(output)
    # Regex: r'(\w+)\s+(snap install.+)'  ← captures channel name + full install cmd
    # Presents user with alternative channels
    # If user picks one: runs the raw 'snap install ...' command from the output
```

### Extra Methods Beyond the Interface

```python
def refresh(self, pkg, root_password, watcher) -> bool:
    # snap refresh <name>  — upgrades single package

def change_channel(self, pkg, root_password, watcher) -> bool:
    # snap refresh <name> --channel=<new>

def _request_channel_installation(...) → Optional[str]:
    # UI dialog to pick snap channel

def get_settings() → Generator[SettingsView, ...]:
    # Settings: install_channel (yes/no), categories_exp (int minutes)
```

---

## 6. `gems/debian/controller.py` — `DebianPackageManager`

Uses `aptitude` as the backend (not `apt`). All properties are lazily instantiated via `@property` with `None` guards.

### CLI Commands Called

**Via `aptitude.py`:**

| Operation             | Command                                                                              |
| --------------------- | ------------------------------------------------------------------------------------ | ---------------------- |
| Search                | `aptitude search <query> -q -F '%p^%v^%V^%m^%s^%d' --disable-columns`                |
| Read installed        | `aptitude search ~i -q -F '%p^%v^%V^%m^%s^%d' --disable-columns`                     |
| Read installed names  | `aptitude search ~i -q -F '%p' --disable-columns`                                    |
| Read updates          | `aptitude search ~U -q -F '%p^%V' --disable-columns --no-gui`                        |
| Show package info     | `aptitude show -q <pkg>=<ver> [-v]`                                                  |
| Simulate install      | `aptitude install -q -y --no-gui --full-resolver <pkgs> -V -s -Z [resolver options]` |
| Simulate upgrade      | `aptitude upgrade -q -y --no-gui --full-resolver <pkgs> -V -s -Z [resolver options]` |
| Simulate remove       | `aptitude remove/purge -q -y --no-gui --full-resolver <pkgs> -V -s -Z`               |
| Install               | `aptitude install -q -y --no-gui --full-resolver <pkgs> [resolver options]`          |
| Upgrade               | `aptitude upgrade -q -y --no-gui --full-resolver <pkgs> [resolver options]`          |
| Remove                | `aptitude remove -q -y --no-gui --full-resolver <pkgs> [resolver options]`           |
| Purge                 | `aptitude purge -q -y --no-gui --full-resolver <pkgs> [resolver options]`            |
| Update package index  | `aptitude update`                                                                    |
| Search by exact names | `aptitude search '((?exact-name(a)                                                   | ?exact-name(b)))' ...` |

All mutation commands include these resolver flags:

```bash
-o Aptitude::ProblemResolver::RemoveScore=9999999
-o Aptitude::ProblemResolver::EssentialRemoveScore=9999999
-o Aptitude::Delete-Unused=false
```

These force aptitude to prefer removal solutions over complicated dep reshuffles.

### `aptitude search` Format String

```python
attrs = f"%p^%v^%V^%m^%s^{'%I^' if fill_size else ''}%d"
# %p = package name
# %v = installed version (or <none>)
# %V = candidate (latest) version
# %m = maintainer
# %s = section
# %I = installed size (optional)
# %d = description
# Fields split by '^'
```

### `map_transaction_output()` — Transaction Parser

```python
# Parses aptitude simulate output looking for these section headers:
"The following NEW packages will be installed:"  → to_install
"The following packages will be upgraded:"       → to_upgrade
"The following packages will be REMOVED:"        → to_remove
"Would download/install/remove packages"         → STOP

# Each package line matches:
RE_TRANSACTION_PKG = re.compile(
    r'([a-zA-Z0-9\-_@~.+:]+)({\w+})?\s*\[([a-zA-Z0-9\-_@~.+:]+)'
    r'(\s+->\s+([a-zA-Z0-9\-_@~.+:]+))?](\s*<([\-+]?[0-9.,]+\s+\w+)>)?'
)
# Captures: name, modifier{}, current_version, -> new_version, <size>
```

### `AptitudeOutputHandler` — Real-time Progress

A background `Thread` that consumes aptitude's live output and updates the UI:

```python
# Triggers:
"Unpacking <pkg>" → increment _unpacking counter, update substatus
"Removing <pkg>"  → increment _removing counter, update substatus
"Get: N https://..." → increment _downloading counter
# Progress formula: (unpacking + downloading) / 2 / total_targets
```

### Application Indexing (unique to Debian gem)

The Debian gem builds an "application index" — a mapping of package names to `.desktop` file paths — to know which packages are launchable GUI apps:

```python
class ApplicationsMapper:
    def map_executable_applications(self) → Set[DebianApplication]:
        # Scans all .desktop files in /usr/share/applications/
        # Parses Exec= lines to find which package owns the binary
        # Filters out NoDisplay=true entries

class ApplicationIndexer:
    def read_index(self) → Optional[Set[DebianApplication]]
    def update_index(self, apps: Set[DebianApplication])
        # Persists to ~/.local/share/bauh/debian/app_index.json
```

### Extra Methods Beyond the Interface

```python
# Custom actions exposed via gen_custom_actions():
def synchronize_packages(root_password, watcher) → bool:
    # Runs aptitude update (re-syncs package lists)

def index_apps(root_password, watcher, ...) → bool:
    # Re-scans .desktop files and updates app index

def purge(pkg, root_password, watcher) → bool:
    # aptitude purge (remove + delete config files)

def launch_sources_app(root_password, watcher) → bool:
    # Opens software-properties-gtk (or configured sources app)

def get_installed_source_apps() → Generator[str, None, None]:
    # Yields 'software-properties-gtk' if installed

def ignore_update(pkg) / revert_ignored_update(pkg):
    # Persists to ~/.config/bauh/debian/updates_ignored.txt

def get_settings() → Generator[SettingsView, ...]:
    # Settings: remove.purge, pkg_sources.app, index_apps.exp,
    #           sync_pkgs.time, suggestions.exp
```

### Lazy Property Pattern (Unique to Debian)

Every expensive object is lazily initialized:

```python
@property
def aptitude(self) -> Aptitude:
    if self._aptitude is None:
        self._aptitude = Aptitude(self._log)
    return self._aptitude

@property
def apps_index(self) -> Dict[str, DebianApplication]:
    if self._apps_index is None:
        self._update_apps_index(self.app_indexer.read_index())
    return self._apps_index

# Same pattern for: app_indexer, app_mapper, view, configman,
#                   output_handler, suggestions_downloader
```

This defers all I/O to first use rather than constructor time.

---

## 7. `gems/flatpak/flatpak.py` — Low-Level Flatpak CLI Wrapper

This module is a pure function library — no classes, no state. Every function either runs a command and returns parsed data, or returns a `SimpleProcess` for the controller to execute via `ProcessHandler`.

### Function Taxonomy

**Introspection (run immediately, return data):**

```python
get_version() → Optional[Tuple[str, ...]]
    # flatpak --version → parse "Flatpak 1.14.2" → (1,14,2)

is_installed() → bool
    # calls get_version(), returns False if None

get_app_info(app_id, branch, installation) → Optional[str]
    # flatpak info <id> <branch> --<installation>
    # returns raw text

get_app_info_fields(app_id, branch, installation, fields, check_runtime) → dict
    # calls get_app_info(), then re.findall(r'\w+:\s.+', info)
    # returns {field_name: value}

get_fields(app_id, branch, fields) → List[str]
    # flatpak info <id> [branch] → pipes stdout to grep -E '(Ref|Branch):.+'
    # returns ordered list of field values

get_commit(app_id, branch, installation) → Optional[str]
    # flatpak info ... → RE_COMMIT = re.compile(r'(Latest commit|Commit)\s*:\s*(.+)')

list_installed(version) → List[dict]
    # version-branched: <1.2 uses -d flag, >=1.2 uses --columns=
    # returns list of pkg dicts with keys: id, name, ref, arch, branch,
    #         description, origin, runtime, installation, version

list_updates_as_str(version) → Dict[str, Set[str]]
    # spawns two threads: fill_updates('system',...) + fill_updates('user',...)
    # returns {'full': {update_ids...}, 'partial': {update_ids...}}

fill_updates(version, installation, res)
    # flatpak update --<installation> --no-deps → pipes through grep
    # parses tab-separated numbered list; builds update_id strings

list_remotes() → Dict[str, Set[str]]
    # flatpak remotes → tab-split each line
    # returns {'system': {remote_names}, 'user': {remote_names}}

list_required_runtime_updates(installation) → Optional[List[Tuple[str, str]]]
    # flatpak update --<installation> (dry run!)
    # RE_REQUIRED_RUNTIME.findall(output) → [(ref, origin), ...]

get_app_commits_data(app_ref, origin, installation, full_str) → List[dict]
    # flatpak remote-info --log <origin> <ref> --<installation>
    # re.findall(r'(Commit|Subject|Date):\s(.+)', log)
    # groups of 3 → list of {'commit': ..., 'subject': ..., 'date': datetime}

search(version, word, installation, app_id=False) → Optional[List[dict]]
    # flatpak search <word> --<installation>
    # tab-split, version-dependent column mapping
    # returns list of dicts: {name, description, id, version, latest_version,
    #                          branch, origin, runtime, arch, ref}

map_update_download_size(app_ids, installation, version) → Dict[str, float]
    # flatpak update --<installation> --no-deps (dry run)
    # parses size column from the numbered update list
    # size_to_byte('152.4', 'MB') → float bytes
```

**Deferred Execution (return `SimpleProcess`):**

```python
update(app_ref, installation, version, related, deps) → SimpleProcess
    # cmd: flatpak update -y <ref> --<installation> [--no-related] [--no-deps]

full_update(version) → SimpleProcess
    # cmd: flatpak update -y

uninstall(app_ref, installation, version) → SimpleProcess
    # cmd: flatpak uninstall <ref> -y --<installation>

install(app_id, origin, installation, version) → SimpleProcess
    # cmd: flatpak install <origin> <app_id> -y --<installation>

downgrade(app_ref, commit, installation, root_password, version) → SimpleProcess
    # cmd: flatpak update --no-related --no-deps --commit=<hash> <ref> -y --<installation>
    # root_password injected only if installation == 'system'

set_default_remotes(installation, root_password) → SimpleProcess
    # cmd: flatpak remote-add --if-not-exists flathub <url> --<installation>
```

**Fire-and-forget:**

```python
def run(app_id: str):
    subprocess.Popen((f'flatpak run {app_id}',), shell=True, env={**os.environ})
```

---

## 8. `gems/arch/pacman.py` — Low-Level Pacman CLI Wrapper

Like `flatpak.py`, this is a stateless function library. The parsing is considerably more complex due to pacman's verbose multi-line output format.

### Function Taxonomy

**Package querying:**

```python
get_info(pkg_name, remote=False) → str
    # pacman -Qi <name>  (local)
    # pacman -Si <name>  (remote)
    # returns raw text

get_info_list(pkg_name, remote) → List[tuple]
    # parses get_info() with: re.findall(r'(\w+\s?\w+)\s*:\s*(.+(\n\s+.+)*)', info)

get_info_dict(pkg_name, remote) → Optional[dict]
    # calls get_info_list, normalizes multi-value fields:
    # 'optional deps' → list (split on '\n')
    # 'depends on', 'required by', 'conflicts with' → list (split on ' ')

map_packages(names, remote, signed, not_signed, skip_ignored) → Dict[str, Dict[str, Dict[str, str]]]
    # pacman -Qi [names] (or -Si if remote=True)
    # RE_REPOSITORY_FIELDS matches: Repository, Name, Description, Version,
    #                                Install Date, Validated By
    # State machine builds current_pkg dict; on 'Validated By':
    #   'None' → pkgs['not_signed'][name]  (AUR/unsigned)
    #   else   → pkgs['signed'][name]      (official repo)
    # Also reads /etc/pacman.conf IgnorePkg and removes those packages

map_repositories(pkgnames) → Dict[str, str]
    # pacman -Si [pkgs]
    # re.findall(r'(Name|Repository)\s*:\s*(.+)', info)
    # returns {name: repository}

list_repository_updates() → Dict[str, str]
    # pacman -Qu
    # line format: "name current -> new"
    # returns {name: new_version}

search(words) → Dict[str, dict]
    # pacman -Ss <words>
    # Two-line records: "repo/name version [flags]" then "  description"
    # returns {name: {repository, name, version, description}}

map_updates_data(pkgs, files, description) → Optional[Dict[str, Dict[str, object]]]
    # pacman -Si <pkgs> (or -Qi -p for local .pkg.tar files)
    # Full state-machine parser extracting:
    #   ds (download_size), s (installed_size), c (conflicts_with set),
    #   p (provides set), d (depends_on set), r (repository), v (version)

map_provided(remote, pkgs) → Optional[Dict[str, Set[str]]]
    # pacman -Qi (or -Si)
    # Builds provider map: {'foo': {'libfoo'}, 'foo=1.2': {'libfoo'}}
    # Handles multi-line Provides: fields

map_optional_deps(names, remote, not_installed) → Dict[str, Dict[str, str]]
    # pacman -Qi/-Si → parses "Optional Deps: pkg: description [installed]"
    # not_installed=True skips [installed] entries

map_required_dependencies(*names) → Dict[str, Set[str]]
    # pacman -Qi → parses "Depends On: ..."

map_required_by(names, remote) → Dict[str, Set[str]]
    # pacman -Qi/-Sii → parses "Required By: ..."

map_conflicts_with(names, remote) → Dict[str, Dict[str, Set[str]]]
    # returns {name: {'c': conflicts_set, 'r': replaces_set}}

list_installed_names() → Set[str]
    # pacman -Qq → one name per line

check_installed(pkg) → bool
    # pacman -Qq <name>

check_missing(names) → Set[str]
    # pacman -Qq <names> → parse stderr for "error: package 'X' not found"

list_installed_files(pkgname) → List[str]
    # pacman -Qlq <name> → one file per line, excludes directories

map_desktop_files(*pkgnames) → Dict[str, List[str]]
    # pacman -Ql <names> → filtered by RE_DESKTOP_FILES for .desktop paths

get_repositories(pkgs) → dict
    # pacman -Ss <pkgre> → grep for matching line, extract repo from "repo/name"
```

**Package mutation (return `SimpleProcess`):**

```python
install_as_process(pkgpaths, root_password, file, pkgdir, ...) → SimpleProcess
    # file=True:  pacman -U <paths> --noconfirm -dd [--overwrite=*] [--asdeps]
    # file=False: pacman -S <paths> --noconfirm -dd [--overwrite=*] [--asdeps]

upgrade_several(pkgnames, root_password, overwrite, skip_deps) → SimpleProcess
    # pacman -S <names> --noconfirm [--overwrite=*] [-dd]
    # error_phrases trigger failure: 'error: failed to prepare transaction', etc.

remove_several(pkgnames, root_password, skip_checks) → SimpleProcess
    # pacman -R <names> --noconfirm [-dd]
    # wrong_error_phrases={'warning:'} so warnings don't count as failure

download(root_password, *pkgnames) → SimpleProcess
    # pacman -Swdd <names> --noconfirm --noprogressbar

sync_databases(root_password, force) → SimpleProcess
    # pacman -Sy  (or -Syy if force=True)

upgrade_system(root_password) → SimpleProcess
    # pacman -Syyu --noconfirm
```

**Dependency analysis:**

```python
list_hard_requirements(name, logger, assume_installed) → Optional[Set[str]]
    # pacman -Rc <name> --print-format=%n [--assume-installed=<provider>...]
    # Returns set of package names that depend on <name>
    # Raises PackageInHoldException if 'HoldPkg' in output
    # Raises PackageNotFoundException if 'target not found'

list_post_uninstall_unneeded_packages(names) → Set[str]
    # pacman -Rss <names> --print-format=%n
    # Returns packages that would become orphaned after removal

read_provides(name) → Set[str]
    # pacman -Si <name> → grep for "Provides : \K(.+)"
    # Returns {name, provided1, provided2, ...}

read_dependencies(name) → Set[str]
    # pacman -Si <name> → grep for "Depends On : \K(.+)"

read_repository_from_info(name) → Optional[str]
    # pacman -Si <name> → grep -Po "Repository\s+:\s+\K.+"
```

**Mirror / config utilities:**

```python
refresh_mirrors(root_password) → SimpleProcess         # pacman-mirrors -g
update_mirrors(root_password, countries) → SimpleProcess  # pacman-mirrors -c <countries>
sort_fastest_mirrors(root_password, limit) → SimpleProcess # pacman-mirrors --fasttrack [N]
list_mirror_countries() → List[str]                    # pacman-mirrors -l
get_current_mirror_countries() → List[str]             # pacman-mirrors -lc
list_available_mirrors() → List[str]                   # pacman-mirrors --status --no-color
get_mirrors_branch() → str                             # pacman-mirrors -G
get_packages_to_sync_first() → Set[str]                # parse /etc/pacman.conf SyncFirst=
get_databases() → Set[str]                             # parse /etc/pacman.conf [repo] sections
get_cache_dir() → str                                  # parse /etc/pacman.conf CacheDir=
list_ignored_packages(config_path) → Set[str]          # parse IgnorePkg = ... line
```

### Key Regex Patterns in `pacman.py`

```python
RE_REPOSITORY_FIELDS = re.compile(
    r'(Repository|Name|Description|Version|Install Date|Validated By)\s*:\s*(.+)'
)
RE_DEP_OPERATORS = re.compile(r'[<>=]')  # splits "foo>=1.2" → "foo"
RE_DEP_NOTFOUND  = re.compile(r'error:.+\'(.+)\'')
RE_INSTALLED_SIZE = re.compile(r'Installed Size\s*:\s*([0-9,.]+)\s(\w+)\n?', re.IGNORECASE)
RE_DOWNLOAD_SIZE  = re.compile(r'Download Size\s*:\s*([0-9,.]+)\s(\w+)\n?', re.IGNORECASE)
RE_REMOVE_TRANSITIVE_DEPS = re.compile(r'removing\s([\w\-_]+)\s.+required\sby\s([\w\-_]+)\n?')
RE_AVAILABLE_MIRRORS = re.compile(r'.+\s+OK\s+.+\s+(\d+:\d+)\s+.+(http.+)')
RE_PACMAN_SYNC_FIRST = re.compile(r'SyncFirst\s*=\s*(.+)')
RE_DESKTOP_FILES = re.compile(r'\n?([\w\-_]+)\s+(/usr/share/.+\.desktop)')
```

---

## Cross-Cutting Design Patterns

### 1. Two-tier CLI Abstraction

Every gem has a `<tool>.py` module (pure functions, no state) and a `controller.py` (stateful class). The controller never builds command strings; it calls the wrapper functions. This makes unit-testing the CLI logic possible without needing a real manager instance.

### 2. `SimpleProcess` / `ProcessHandler` Execution Model

CLI commands are represented as `SimpleProcess(cmd, root_password, ...)` objects and run through `ProcessHandler.handle_simple(proc)` which:

- Optionally prepends `sudo -S` for root commands (injects password via stdin)
- Streams stdout/stderr
- Returns `(success: bool, full_output: str)`
- Accepts an optional `output_handler` callback for real-time UI updates

### 3. Background Threading Pattern

All gems use `Thread(target=fn, args=..., daemon=True)` extensively for parallel data fetching, then join before returning results. Daemon threads mean they don't block program exit. This is used for:

- Running update checks in parallel with reading installed packages
- Filling AUR data + repo data simultaneously
- Loading suggestion data in parallel with filtering installed packages

### 4. Ignored Updates (Flat File Persistence)

All four gems implement `ignore_update` / `revert_ignored_update` using the same pattern: a plain-text file with one entry per line, read into a `Set[str]`, modified, and written back sorted. The key format differs per gem:

- Flatpak: `{id}:{branch}:{installation}`
- Arch: package name
- Debian: package name

### 5. Suggestions Architecture

All gems fetch a remote suggestions file (or local override) via URL, parse it with `suggestions.parse()` (priority levels), then spawn one thread per suggestion to search for it, joining them all before returning. Results are cached in a TTL cache.

### 6. Settings Panel via `SettingsController`

Flatpak, Arch, Snap, and Debian all implement `SettingsController.save_settings(component)` alongside `get_settings()`. The `component` parameter is a `PanelComponent` built by the gem itself in `get_settings()` — the GUI just renders it and hands it back on save. Components are identified by `id_` strings, and `component.get_component('install', SingleSelectComponent).get_selected()` pulls values back out by ID.

