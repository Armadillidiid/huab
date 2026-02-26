import Gio from "gi://Gio?version=2.0";
import { MANAGER_IFACE_XML, type ManagerIface } from "./manager-iface.js";
import { type BackendRegistry, parseBackend } from "./backend-registry.js";

export class Manager implements ManagerIface {
  readonly dbus: Gio.DBusExportedObject;
  private readonly registry: BackendRegistry;

  constructor(registry: BackendRegistry) {
    this.registry = registry;
    // GJS routes D-Bus method calls to same-named methods on this object.
    this.dbus = Gio.DBusExportedObject.wrapJSObject(MANAGER_IFACE_XML, this);
  }

  // ── Required ─────────────────────────────────────────────────────────────

  ListInstalled(backend: string): string {
    return JSON.stringify(
      this.registry.listInstalled(parseBackend(backend)),
    );
  }

  ListUpdates(backend: string): string {
    return JSON.stringify(this.registry.listUpdates(parseBackend(backend)));
  }

  ListAllInstalled(): string {
    return JSON.stringify(this.registry.listAllInstalled());
  }

  ListAllUpdates(): string {
    return JSON.stringify(this.registry.listAllUpdates());
  }

  // ── Optional ─────────────────────────────────────────────────────────────

  Search(backend: string, query: string): string {
    return JSON.stringify(
      this.registry.search(parseBackend(backend), query),
    );
  }

  SearchAll(query: string): string {
    return JSON.stringify(this.registry.searchAll(query));
  }

  GetPackage(backend: string, id: string): string {
    return JSON.stringify(
      this.registry.getPackage(parseBackend(backend), id),
    );
  }

  ListAvailable(backend: string): string {
    return JSON.stringify(
      this.registry.listAvailable(parseBackend(backend)),
    );
  }

  ListAllAvailable(): string {
    return JSON.stringify(this.registry.listAllAvailable());
  }

  ListByCategory(backend: string, category: string): string {
    return JSON.stringify(
      this.registry.listByCategory(parseBackend(backend), category),
    );
  }

  ListAllByCategory(category: string): string {
    return JSON.stringify(this.registry.listAllByCategory(category));
  }

  RefreshMetadata(backend: string): void {
    this.registry.refreshMetadata(parseBackend(backend));
  }

  RefreshAllMetadata(): void {
    this.registry.refreshAllMetadata();
  }
}
