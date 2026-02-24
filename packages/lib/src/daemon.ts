import * as dbus from "dbus-next";

const DBusInterface = dbus.interface.Interface;

class ManagerInterface extends DBusInterface {
  Greet(name: string): string {
    console.log(`[Service] Greet called with: ${name}`);
    return `Hello, ${name}!`;
  }
}

ManagerInterface.configureMembers({
  methods: {
    Greet: {
      inSignature: "s",
      outSignature: "s",
    },
  },
});

/**
 * D-Bus service to expose package management functionality for Huab CLI and GUI clients.
 * Started by systemd via a .service file; run manually with `bun run service` during development.
 */
async function main() {
  const bus = dbus.sessionBus();

  console.log("[Service] Connecting to session bus...");

  const serviceName   = "org.freedesktop.Huab";
  const objectPath    = "/org/freedesktop/Huab/Manager";
  const interfaceName = "org.freedesktop.Huab.Manager";

  try {
    await bus.requestName(serviceName, 0);
    console.log(`[Service] Acquired name: ${serviceName}`);

    const iface = new ManagerInterface(interfaceName);
    bus.export(objectPath, iface);

    console.log(`[Service] Exported interface at: ${objectPath}`);
    console.log("[Service] Manager service is ready!");
  } catch (err) {
    console.error("[Service] Error:", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  console.log("\n[Service] Shutting down...");
  process.exit(0);
});

main().catch(console.error);
