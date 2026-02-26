import type { IPackageBackend } from '../backend.js';
import type { PackageUpdate, SnapPackage } from '../types.js';

export class SnapBackend implements IPackageBackend {
  listInstalled(): SnapPackage[] {
    throw new Error('SnapBackend: not implemented');
  }

  listUpdates(): PackageUpdate[] {
    throw new Error('SnapBackend: not implemented');
  }
}
