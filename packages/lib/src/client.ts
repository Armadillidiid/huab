import * as dbus from "dbus-next";

const SERVICE_NAME = "org.freedesktop.Huab";
const OBJECT_PATH  = "/org/freedesktop/Huab/Manager";
const IFACE_NAME   = "org.freedesktop.Huab.Manager";

// Typed proxy interface for the Manager D-Bus object
type ManagerProxy = dbus.ClientInterface & {
  Greet: (name: string) => Promise<string>;
};

export class HuabClient {
  private bus: dbus.MessageBus;

  constructor() {
    this.bus = dbus.sessionBus();
  }

  async greet(name: string): Promise<string> {
    const obj = await this.bus.getProxyObject(SERVICE_NAME, OBJECT_PATH);
    const manager = obj.getInterface(IFACE_NAME) as unknown as ManagerProxy;
    return manager.Greet(name);
  }

  disconnect(): void {
    this.bus.disconnect();
  }
}
