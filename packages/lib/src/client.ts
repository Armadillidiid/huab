import * as dbus from "dbus-next";
import type { Package, PackageUpdate } from "./types.ts";

const SERVICE_NAME = "org.freedesktop.Huab";
const OBJECT_PATH  = "/org/freedesktop/Huab/Manager";
const IFACE_NAME   = "org.freedesktop.Huab.Manager";

type ManagerProxy = dbus.ClientInterface & {
  ListInstalled: () => Promise<[string]>;
  ListUpdates:   () => Promise<[string]>;
};

export class HuabClient {
  private bus: dbus.MessageBus;

  constructor() {
    this.bus = dbus.sessionBus();
  }

  private async proxy(): Promise<ManagerProxy> {
    const obj = await this.bus.getProxyObject(SERVICE_NAME, OBJECT_PATH);
    return obj.getInterface(IFACE_NAME) as unknown as ManagerProxy;
  }

  async listInstalled(): Promise<Package[]> {
    const manager = await this.proxy();
    const [json] = await manager.ListInstalled();
    return JSON.parse(json) as Package[];
  }

  async listUpdates(): Promise<PackageUpdate[]> {
    const manager = await this.proxy();
    const [json] = await manager.ListUpdates();
    return JSON.parse(json) as PackageUpdate[];
  }

  disconnect(): void {
    this.bus.disconnect();
  }
}
