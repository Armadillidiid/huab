import type { AnyPackage, PackageUpdate } from './types.js';

/** Contract every package-manager backend must satisfy. */
export interface IPackageBackend {
  listInstalled(): AnyPackage[];
  listUpdates(): PackageUpdate[];
}
