import type { IPackageBackend } from '../backend.js';
import type { Package, PackageUpdate } from '../types.js';

export class SnapBackend implements IPackageBackend {
  listInstalled(): Package[] {
    throw new Error('SnapBackend: not implemented');
  }

  listUpdates(): PackageUpdate[] {
    throw new Error('SnapBackend: not implemented');
  }
}
