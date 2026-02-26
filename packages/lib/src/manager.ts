import Gio from "gi://Gio?version=2.0";
import type { PackageBackend } from "./types.js";
import { MANAGER_IFACE_XML, type ManagerIface } from "./manager-iface.js";
import type { BackendRegistry } from "./backend-registry.js";

export class Manager implements ManagerIface {
  readonly dbus: Gio.DBusExportedObject;
  private readonly registry: BackendRegistry;

  constructor(registry: BackendRegistry) {
    this.registry = registry;
    // GJS routes D-Bus method calls to same-named methods on this object.
    this.dbus = Gio.DBusExportedObject.wrapJSObject(MANAGER_IFACE_XML, this);
  }

  ListInstalled(backend: string): string {
    return JSON.stringify(
      this.registry.listInstalled(backend as PackageBackend),
    );
  }

  ListUpdates(backend: string): string {
    return JSON.stringify(this.registry.listUpdates(backend as PackageBackend));
  }

  ListAllInstalled(): string {
    return JSON.stringify(this.registry.listAllInstalled());
  }

  ListAllUpdates(): string {
    return JSON.stringify(this.registry.listAllUpdates());
  }
}
