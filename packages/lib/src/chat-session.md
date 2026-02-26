## User

Nice, what about methods of the unified manager? Like to install/update etc. I'm sure it's standard interface for all backends?

---

## Assistant

There are two separate classes with distinct responsibilities: `Database` (read-only queries) and `Transaction` (write operations). Here they are in TypeScript:

---

## `Database` — read-only queries across all backends

```typescript
class Database {
  config: Config;

  // Signals
  on_get_updates_progress: (percent: number) => void;
  on_emit_warning: (message: string) => void;

  // ── Mirror / utility ────────────────────────────────────────────────
  get_mirrors_countries_async(): Promise<string[]>;
  get_mirrors_choosen_country_async(): Promise<string>;
  get_alpm_dep_name(dep_string: string): string;
  vercmp: (a: string, b: string) => number;

  // ── Cache / build files ──────────────────────────────────────────────
  get_clean_cache_details(): Map<string, bigint>;
  get_clean_cache_details_async(): Promise<Map<string, bigint>>;
  get_real_aur_build_dir(): string;
  get_build_files_details(): Map<string, bigint>;
  get_build_files_details_async(): Promise<Map<string, bigint>>;

  // ── Installed packages (alpm) ────────────────────────────────────────
  is_installed_pkg(pkgname: string): boolean;
  get_installed_pkg(pkgname: string): AlpmPackage | null;
  has_installed_satisfier(depstring: string): boolean;
  get_installed_satisfier(depstring: string): AlpmPackage | null;
  get_installed_pkgs_by_glob(glob: string): AlpmPackage[];
  should_hold(pkgname: string): boolean;
  get_installed_pkgs(): AlpmPackage[];
  get_installed_pkgs_async(): Promise<AlpmPackage[]>;
  get_installed_apps_async(): Promise<AlpmPackage[]>; // AppStream-enriched only
  get_explicitly_installed_pkgs(): AlpmPackage[];
  get_explicitly_installed_pkgs_async(): Promise<AlpmPackage[]>;
  get_foreign_pkgs(): AlpmPackage[]; // AUR / manually installed
  get_foreign_pkgs_async(): Promise<AlpmPackage[]>;
  get_orphans(): AlpmPackage[];
  get_orphans_async(): Promise<AlpmPackage[]>;

  // ── Sync/repo packages (alpm) ────────────────────────────────────────
  is_sync_pkg(pkgname: string): boolean;
  get_sync_pkg(pkgname: string): AlpmPackage | null;
  has_sync_satisfier(depstring: string): boolean;
  get_sync_satisfier(depstring: string): AlpmPackage | null;
  get_sync_pkgs_by_glob(glob: string): AlpmPackage[];
  get_pkg(pkgname: string): AlpmPackage | null; // installed or sync

  // ── AppStream ────────────────────────────────────────────────────────
  get_app_by_id(app_id: string): Package | null; // returns any backend type

  // ── Search (alpm) ────────────────────────────────────────────────────
  search_installed_pkgs(search_string: string): AlpmPackage[];
  search_installed_pkgs_async(search_string: string): Promise<AlpmPackage[]>;
  search_repos_pkgs(search_string: string): AlpmPackage[];
  search_repos_pkgs_async(search_string: string): Promise<AlpmPackage[]>;
  search_uninstalled_apps(search_terms: string[]): AlpmPackage[];
  search_pkgs(search_string: string): AlpmPackage[];
  search_pkgs_async(search_string: string): Promise<AlpmPackage[]>;

  // ── AUR ──────────────────────────────────────────────────────────────
  search_aur_pkgs(search_string: string): AURPackage[];
  search_aur_pkgs_async(search_string: string): Promise<AURPackage[]>;
  get_aur_pkg(pkgname: string): AURPackage | null;
  get_aur_pkg_async(pkgname: string): Promise<AURPackage | null>;
  get_aur_pkgs(pkgnames: string[]): Map<string, AURPackage | null>;
  get_aur_pkgs_async(pkgnames: string[]): Promise<Map<string, AURPackage | null>>;
  clone_build_files(pkgname: string, overwrite_files: boolean): File | null;
  clone_build_files_async(pkgname: string, overwrite_files: boolean): Promise<File | null>;
  regenerate_srcinfo(pkgname: string): boolean;
  regenerate_srcinfo_async(pkgname: string): Promise<boolean>;

  // ── Files ────────────────────────────────────────────────────────────
  search_files(files: string[]): Map<string, string[]>;
  refresh_tmp_files_dbs_async(): Promise<void>;
  refresh_tmp_files_dbs(): void;

  // ── Categories / repos / groups ──────────────────────────────────────
  get_categories_names(): string[];
  get_category_pkgs_async(category: string): Promise<AlpmPackage[]>;
  get_repos_names(): string[];
  get_repo_pkgs(repo: string): AlpmPackage[];
  get_repo_pkgs_async(repo: string): Promise<AlpmPackage[]>;
  get_groups_names(): string[];
  get_group_pkgs(group_name: string): AlpmPackage[];
  get_group_pkgs_async(group_name: string): Promise<AlpmPackage[]>;

  // ── Update checking ──────────────────────────────────────────────────
  get_last_refresh_time(): Date | null;
  need_refresh(): boolean;
  get_updates(): Updates;
  get_updates_async(): Promise<Updates>;

  // ── Snap ─────────────────────────────────────────────────────────────
  search_snaps_async(search_string: string): Promise<SnapPackage[]>;
  is_installed_snap(name: string): boolean;
  get_snap_async(name: string): Promise<SnapPackage | null>;
  get_installed_snaps_async(): Promise<SnapPackage[]>;
  get_installed_snap_icon_async(name: string): Promise<string>;
  get_category_snaps_async(category: string): Promise<SnapPackage[]>;

  // ── Flatpak ──────────────────────────────────────────────────────────
  refresh_flatpak_appstream_data(): void;
  refresh_flatpak_appstream_data_async(): Promise<void>;
  get_flatpak_remotes_names(): string[];
  get_installed_flatpaks_async(): Promise<FlatpakPackage[]>;
  search_flatpaks_async(search_string: string): Promise<FlatpakPackage[]>;
  is_installed_flatpak(name: string): boolean;
  get_flatpak_async(id: string): Promise<FlatpakPackage | null>;
  get_category_flatpaks_async(category: string): Promise<FlatpakPackage[]>;
}
```

---

## `Transaction` — write operations (install/remove/upgrade)

```typescript
class Transaction {
  database: Database;

  // Behaviour flags (set before calling run_async)
  download_only: boolean;
  dry_run: boolean;
  install_if_needed: boolean;
  remove_if_unneeded: boolean;
  cascade: boolean;
  keep_config_files: boolean;
  install_as_dep: boolean;
  install_as_explicit: boolean;
  no_refresh: boolean;

  // Progress signals
  on_emit_action: (action: string) => void;
  on_emit_action_progress: (action: string, status: string, progress: number) => void;
  on_emit_download_progress: (action: string, status: string, progress: number) => void;
  on_emit_hook_progress: (
    action: string,
    details: string,
    status: string,
    progress: number,
  ) => void;
  on_emit_script_output: (message: string) => void;
  on_emit_warning: (message: string) => void;
  on_emit_error: (message: string, details: string[]) => void;

  // Lifecycle signals
  on_start_waiting: () => void;
  on_stop_waiting: () => void;
  on_start_preparing: () => void;
  on_stop_preparing: () => void;
  on_start_downloading: () => void;
  on_stop_downloading: () => void;
  on_start_building: () => void; // AUR only
  on_stop_building: () => void; // AUR only
  on_important_details_outpout: (must_show: boolean) => void;

  // ── Authorization ────────────────────────────────────────────────────
  get_authorization_async(): Promise<boolean>; // triggers Polkit prompt
  remove_authorization(): void;
  quit_daemon(): void;

  // ── System maintenance ───────────────────────────────────────────────
  generate_mirrors_list_async(country: string): Promise<void>;
  clean_cache_async(): Promise<void>;
  clean_build_files_async(): Promise<void>;
  set_pkgreason_async(pkgname: string, reason: number): Promise<boolean>;
  download_updates_async(): Promise<boolean>;
  check_dbs(): Promise<void>;
  refresh_dbs_async(): Promise<boolean>;
  refresh_files_dbs_async(): Promise<boolean>;

  // ── Queue operations (alpm) ──────────────────────────────────────────
  add_pkg_to_install(name: string): void;
  add_pkg_to_remove(name: string): void;
  add_path_to_load(path: string): void; // install from local .pkg.tar file
  add_pkgs_to_upgrade(force_refresh: boolean): void;
  add_temporary_ignore_pkg(name: string): void;
  add_overwrite_file(glob: string): void;
  add_pkg_to_mark_as_dep(name: string): void;

  // ── Queue operations (AUR) ───────────────────────────────────────────
  add_pkg_to_build(name: string, clone_build_files: boolean, clone_deps_build_files: boolean): void;

  // ── Queue operations (Snap) ──────────────────────────────────────────
  add_snap_to_install(pkg: SnapPackage): void;
  add_snap_to_remove(pkg: SnapPackage): void;
  snap_switch_channel_async(snap_name: string, channel: string): Promise<boolean>;

  // ── Queue operations (Flatpak) ───────────────────────────────────────
  add_flatpak_to_install(pkg: FlatpakPackage): void;
  add_flatpak_to_remove(pkg: FlatpakPackage): void;
  add_flatpak_to_upgrade(pkg: FlatpakPackage): void;

  // ── Execute ──────────────────────────────────────────────────────────
  run_async(): Promise<boolean>;
  run_cmd_line_async(args: string[], working_directory: string | null): Promise<number>;
  cancel(): void;
}
```

---

## The usage pattern

It's a **queue-then-commit** design, not individual per-operation calls:

```typescript
const t = new Transaction(database);

// 1. Queue everything you want (mix backends freely)
t.add_pkg_to_install("neovim"); // alpm
t.add_pkg_to_build("yay", true, true); // AUR
t.add_flatpak_to_install(someFlatpak); // Flatpak
t.add_snap_to_remove(someSnap); // Snap

// 2. Fire once — Transaction orchestrates all backends in sequence
const success = await t.run_async();
```

There is **no unified `install(pkg: Package)` that auto-dispatches by type**. The caller is responsible for calling the right `add_*` method based on the package's concrete type. The unification is at the `run_async()` level — one call runs alpm → AUR → Snap → Flatpak in order.

---
