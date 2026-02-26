import type { PackageBackend, AnyPackage, PackageUpdate } from './types.js';
import type { IPackageBackend } from './backend.js';

export class BackendRegistry {
  private readonly backends = new Map<PackageBackend, IPackageBackend>();

  register(name: PackageBackend, backend: IPackageBackend): void {
    this.backends.set(name, backend);
  }

  get(name: PackageBackend): IPackageBackend {
    const backend = this.backends.get(name);
    if (!backend) {
      throw new Error(`[Huab] No backend registered for "${name}"`);
    }
    return backend;
  }

  // ── Required methods ───────────────────────────────────────────────────

  listInstalled(backend: PackageBackend): AnyPackage[] {
    return this.get(backend).listInstalled();
  }

  listUpdates(backend: PackageBackend): PackageUpdate[] {
    return this.get(backend).listUpdates();
  }

  listAllInstalled(): AnyPackage[] {
    return Array.from(this.backends.values()).flatMap(b => b.listInstalled());
  }

  listAllUpdates(): PackageUpdate[] {
    return Array.from(this.backends.values()).flatMap(b => b.listUpdates());
  }

  // ── Optional methods ───────────────────────────────────────────────────

  search(backend: PackageBackend, query: string): AnyPackage[] {
    const b = this.get(backend);
    if (typeof b.search !== 'function') return [];
    return b.search(query);
  }

  searchAll(query: string): AnyPackage[] {
    return Array.from(this.backends.values()).flatMap(b =>
      typeof b.search === 'function' ? b.search(query) : [],
    );
  }

  getPackage(backend: PackageBackend, id: string): AnyPackage | null {
    const b = this.get(backend);
    if (typeof b.getPackage !== 'function') return null;
    return b.getPackage(id);
  }

  listAvailable(backend: PackageBackend): AnyPackage[] {
    const b = this.get(backend);
    if (typeof b.listAvailable !== 'function') return [];
    return b.listAvailable();
  }

  listAllAvailable(): AnyPackage[] {
    return Array.from(this.backends.values()).flatMap(b =>
      typeof b.listAvailable === 'function' ? b.listAvailable() : [],
    );
  }

  listByCategory(backend: PackageBackend, category: string): AnyPackage[] {
    const b = this.get(backend);
    if (typeof b.listByCategory !== 'function') return [];
    return b.listByCategory(category);
  }

  listAllByCategory(category: string): AnyPackage[] {
    return Array.from(this.backends.values()).flatMap(b =>
      typeof b.listByCategory === 'function' ? b.listByCategory(category) : [],
    );
  }

  refreshMetadata(backend: PackageBackend): void {
    const b = this.get(backend);
    if (typeof b.refreshMetadata === 'function') b.refreshMetadata();
  }

  refreshAllMetadata(): void {
    for (const b of Array.from(this.backends.values())) {
      if (typeof b.refreshMetadata === 'function') b.refreshMetadata();
    }
  }
}
