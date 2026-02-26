export type PackageBackend = "flatpak" | "packagekit" | "alpm" | "aur" | "snap";

/**
 * Base package interface — fields present on ALL backends.
 * All values are JSON-serializable: no bigint, no Date.
 */
export interface Package {
  /** Backend-specific identifier, e.g. Flatpak ref "app/org.mozilla.Firefox/x86_64/stable" */
  id: string;
  /** Human-readable name, e.g. "Firefox" */
  name: string;
  /** Available/latest version string */
  version: string;
  /** Currently installed version (null if not installed) */
  installed_version: string | null;
  /** Short one-line description */
  desc: string | null;
  /** Long description (from AppStream metadata) */
  long_desc: string | null;
  /** Repository/remote origin, e.g. "flathub", "core", "AUR" */
  repo: string | null;
  /** License string */
  license: string | null;
  /** Homepage URL */
  url: string | null;
  /** Human-friendly app name from AppStream */
  app_name: string | null;
  /** AppStream app ID, e.g. "org.mozilla.Firefox" */
  app_id: string | null;
  /** Desktop file path for launching the app */
  launchable: string | null;
  /** Icon path or name */
  icon: string | null;
  /** Screenshot URLs */
  screenshots: string[];
  /** Installed size in bytes */
  installed_size: number;
  /** Download size in bytes */
  download_size: number;
  /** ISO-8601 install date (null if not installed) */
  install_date: string | null;
  backend: PackageBackend;
}

/** Flatpak package — no extra fields beyond base; AppStream provides all metadata. */
export interface FlatpakPackage extends Package {
  backend: "flatpak";
}

/** Native Arch/Manjaro package (alpm = Arch Linux Package Management). */
export interface AlpmPackage extends Package {
  backend: "alpm";
  /** ISO-8601 build date */
  build_date: string | null;
  /** Who packaged it */
  packager: string | null;
  /** "explicit" | "dependency" */
  reason: string | null;
  groups: string[];
  depends: string[];
  optdepends: string[];
  makedepends: string[];
  checkdepends: string[];
  requiredby: string[];
  optionalfor: string[];
  provides: string[];
  replaces: string[];
  conflicts: string[];
  /** e.g. ["MD5 Sum", "SHA-256 Sum", "Signature"] */
  validations: string[];
}

/** AUR package — extends AlpmPackage with AUR-specific metadata. */
export interface AURPackage extends Omit<AlpmPackage, "backend"> {
  backend: "aur";
  packagebase: string | null;
  maintainer: string | null;
  popularity: number;
  /** ISO-8601 last modified date */
  lastmodified: string | null;
  /** ISO-8601 flagged out-of-date date (null if current) */
  outofdate: string | null;
  /** ISO-8601 first submitted date */
  firstsubmitted: string | null;
  numvotes: number;
}

/** Snap package. */
export interface SnapPackage extends Package {
  backend: "snap";
  /** Current channel, e.g. "stable", "edge" */
  channel: string | null;
  publisher: string | null;
  /** Confinement status: "strict" | "classic" | "devmode" */
  confined: string | null;
  /** Available channels */
  channels: string[];
}

/** Discriminated union of all concrete package types. */
export type AnyPackage = FlatpakPackage | AlpmPackage | AURPackage | SnapPackage;

export interface SearchResult {
  installed: AnyPackage[];
  available: AnyPackage[];
  total: number;
}

export interface PackageUpdate {
  id: string;
  name: string;
  currentVersion: string;
  newVersion: string;
  backend: PackageBackend;
}

export interface CacheInfo {
  totalSize: number;
  fileCount: number;
}

/**
 * Convert D-Bus interfaces to async/Promise-based ones.
 */
export type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : Promise<Awaited<T[K]>>;
};
