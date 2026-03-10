import { KNOWN_BACKENDS } from "../constants.ts";
import type { PackageBackend, AnyPackage } from "../types.ts";
import type { IPackageBackend } from "./backend.ts";

/**
 * Validate and narrow a raw D-Bus string to a known PackageBackend.
 * Throws if the value is not a recognised backend identifier.
 */
export function parseBackend(s: string): PackageBackend {
  const backends = new Set(KNOWN_BACKENDS);
  if (backends.has(s as PackageBackend)) return s as PackageBackend;
  throw new Error(`[Huab] Unknown backend: "${s}"`);
}

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

  listAvailable(backend: PackageBackend): AnyPackage[] {
    return this.get(backend).listAvailable();
  }

  listAllAvailable(): AnyPackage[] {
    return Array.from(this.backends.values()).flatMap((b) => b.listAvailable());
  }
}
