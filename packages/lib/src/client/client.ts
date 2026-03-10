import * as dbus from "dbus-next";
import type { AnyPackage, PackageBackend, Promisify } from "../types.ts";
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

  // Query

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

  // Mutations
  // TODO: Implement Manager/Transaction paradigm before wiring these up.

  async install(backend: PackageBackend, packageId: string): Promise<void> {
    const manager = await this.proxy();
    await manager.Install(backend, packageId);
  }

  async remove(backend: PackageBackend, packageId: string): Promise<void> {
    const manager = await this.proxy();
    await manager.Remove(backend, packageId);
  }

  async update(backend: PackageBackend, packageId: string): Promise<void> {
    const manager = await this.proxy();
    await manager.Update(backend, packageId);
  }

  async updateBatch(backend: PackageBackend, packageIds: string[]): Promise<void> {
    const manager = await this.proxy();
    await manager.UpdateBatch(backend, packageIds);
  }

  disconnect(): void {
    this.bus.disconnect();
  }
}
