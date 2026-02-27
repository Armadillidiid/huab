import * as dbus from "dbus-next";
import type {
  AnyPackage,
  PackageBackend,
  PackageUpdate,
  Promisify,
} from "../types.ts";
import { SERVICE_NAME, OBJECT_PATH, IFACE_NAME } from "../constants.ts";
import type { ManagerIface } from "../dbus/manager-iface.ts";

type ManagerProxy = dbus.ClientInterface & Promisify<ManagerIface>;

export class HuabClient {
  private bus: dbus.MessageBus;

  constructor() {
    this.bus = dbus.sessionBus();
  }

  private async proxy(): Promise<ManagerProxy> {
    const obj = await this.bus.getProxyObject(SERVICE_NAME, OBJECT_PATH);
    return obj.getInterface(IFACE_NAME) as unknown as ManagerProxy;
  }

  // ── Required ─────────────────────────────────────────────────────────────

  async listInstalled(backend: PackageBackend): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.ListInstalled(backend);
    return JSON.parse(json) as AnyPackage[];
  }

  async listUpdates(backend: PackageBackend): Promise<PackageUpdate[]> {
    const manager = await this.proxy();
    const json = await manager.ListUpdates(backend);
    return JSON.parse(json) as PackageUpdate[];
  }

  async listAllInstalled(): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.ListAllInstalled();
    return JSON.parse(json) as AnyPackage[];
  }

  async listAllUpdates(): Promise<PackageUpdate[]> {
    const manager = await this.proxy();
    const json = await manager.ListAllUpdates();
    return JSON.parse(json) as PackageUpdate[];
  }

  // ── Optional ─────────────────────────────────────────────────────────────

  async search(backend: PackageBackend, query: string): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.Search(backend, query);
    return JSON.parse(json) as AnyPackage[];
  }

  async searchAll(query: string): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.SearchAll(query);
    return JSON.parse(json) as AnyPackage[];
  }

  async getPackage(
    backend: PackageBackend,
    id: string,
  ): Promise<AnyPackage | null> {
    const manager = await this.proxy();
    const json = await manager.GetPackage(backend, id);
    return JSON.parse(json) as AnyPackage | null;
  }

  async listAvailable(backend: PackageBackend): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.ListAvailable(backend);
    return JSON.parse(json) as AnyPackage[];
  }

  async listAllAvailable(): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.ListAllAvailable();
    return JSON.parse(json) as AnyPackage[];
  }

  async listByCategory(
    backend: PackageBackend,
    category: string,
  ): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.ListByCategory(backend, category);
    return JSON.parse(json) as AnyPackage[];
  }

  async listAllByCategory(category: string): Promise<AnyPackage[]> {
    const manager = await this.proxy();
    const json = await manager.ListAllByCategory(category);
    return JSON.parse(json) as AnyPackage[];
  }

  async refreshMetadata(backend: PackageBackend): Promise<void> {
    const manager = await this.proxy();
    await manager.RefreshMetadata(backend);
  }

  async refreshAllMetadata(): Promise<void> {
    const manager = await this.proxy();
    await manager.RefreshAllMetadata();
  }

  disconnect(): void {
    this.bus.disconnect();
  }
}
