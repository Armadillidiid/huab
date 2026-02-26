export type PackageStatus = "installed" | "not_installed" | "update_available";

export type PackageBackend = "flatpak" | "packagekit" | "alpm" | "snap";

export interface Package {
  /** Backend-specific identifier, e.g. Flatpak ref "app/org.mozilla.Firefox/x86_64/stable" */
  id: string;
  /** Human-readable name, e.g. "Firefox" */
  name: string;
  /** Installed version string */
  version: string;
  description: string;
  iconUrl?: string;
  /** Installed size in bytes */
  installedSize?: number;
  /** Remote/repository origin, e.g. "flathub" */
  origin?: string;
  status: PackageStatus;
  backend: PackageBackend;
}

export interface SearchResult {
  installed: Package[];
  available: Package[];
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
