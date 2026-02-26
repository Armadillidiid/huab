import type { Package, PackageUpdate } from './types.js';

/** Contract every package-manager backend must satisfy. */
export interface IPackageBackend {
  listInstalled(): Package[];
  listUpdates(): PackageUpdate[];
}
