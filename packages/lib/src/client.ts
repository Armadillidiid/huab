import * as dbus from "dbus-next";
import type { Package, PackageBackend, PackageUpdate, Promisify } from "./types.ts";
import { SERVICE_NAME, OBJECT_PATH, IFACE_NAME } from "./constants.ts";
import type { ManagerIface } from "./manager-iface.ts";

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

  async listInstalled(backend: PackageBackend): Promise<Package[]> {
    const manager = await this.proxy();
    const json = await manager.ListInstalled(backend);
    return JSON.parse(json) as Package[];
  }

  async listUpdates(backend: PackageBackend): Promise<PackageUpdate[]> {
    const manager = await this.proxy();
    const json = await manager.ListUpdates(backend);
    return JSON.parse(json) as PackageUpdate[];
  }

  async listAllInstalled(): Promise<Package[]> {
    const manager = await this.proxy();
    const json = await manager.ListAllInstalled();
    return JSON.parse(json) as Package[];
  }

  async listAllUpdates(): Promise<PackageUpdate[]> {
    const manager = await this.proxy();
    const json = await manager.ListAllUpdates();
    return JSON.parse(json) as PackageUpdate[];
  }

  disconnect(): void {
    this.bus.disconnect();
  }
}
