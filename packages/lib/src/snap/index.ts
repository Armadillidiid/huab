import type { IPackageBackend } from '../backend.js';
import type { AnyPackage, PackageUpdate, SnapPackage } from '../types.js';

export class SnapBackend implements IPackageBackend {
  // ── Required ─────────────────────────────────────────────────────────────

  listInstalled(): SnapPackage[] {
    throw new Error('SnapBackend: not implemented');
  }

  listUpdates(): PackageUpdate[] {
    throw new Error('SnapBackend: not implemented');
  }

  // ── Optional ─────────────────────────────────────────────────────────────

  search(_query: string): AnyPackage[] {
    throw new Error('SnapBackend.search: not implemented');
  }

  getPackage(_id: string): AnyPackage | null {
    throw new Error('SnapBackend.getPackage: not implemented');
  }

  listAvailable(): AnyPackage[] {
    throw new Error('SnapBackend.listAvailable: not implemented');
  }

  listByCategory(_category: string): AnyPackage[] {
    throw new Error('SnapBackend.listByCategory: not implemented');
  }

  refreshMetadata(): void {
    throw new Error('SnapBackend.refreshMetadata: not implemented');
  }
}
