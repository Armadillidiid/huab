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
}
