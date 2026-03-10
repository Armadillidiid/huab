import Gio from "gi://Gio?version=2.0";
import { type BackendRegistry, parseBackend } from "../backends/backend-registry.ts";
import { type ManagerIface, MANAGER_IFACE_XML } from "./manager-iface.ts";

export class Manager implements ManagerIface {
  readonly dbus: Gio.DBusExportedObject;
  private readonly registry: BackendRegistry;

  constructor(registry: BackendRegistry) {
    this.registry = registry;
    // GJS routes D-Bus method calls to same-named methods on this object.
    this.dbus = Gio.DBusExportedObject.wrapJSObject(MANAGER_IFACE_XML, this);
  }

  // ── Query ─────────────────────────────────────────────────────────────────

  ListAvailable(backend: string): string {
    return JSON.stringify(this.registry.listAvailable(parseBackend(backend)));
  }

  ListAllAvailable(): string {
    return JSON.stringify(this.registry.listAllAvailable());
  }

  // ── Mutations ─────────────────────────────────────────────────────────────
  // TODO: Implement Manager/Transaction paradigm — each mutation should spawn a
  // transaction D-Bus object that the client subscribes to for progress signals.

  Install(_backend: string, _packageId: string): void {
    throw new Error("Install: not implemented (pending transaction model)");
  }

  Remove(_backend: string, _packageId: string): void {
    throw new Error("Remove: not implemented (pending transaction model)");
  }

  Update(_backend: string, _packageId: string): void {
    throw new Error("Update: not implemented (pending transaction model)");
  }

  UpdateBatch(_backend: string, _packageIds: string[]): void {
    throw new Error("UpdateBatch: not implemented (pending transaction model)");
  }
}
