#!/usr/bin/env bun
/**
 * Example 5: System D-Bus Integration
 * 
 * This example demonstrates how to interact with system services via D-Bus.
 * We'll explore some common system services available on most Linux systems.
 * 
 * Key concepts:
 * - Connecting to the system bus (vs session bus)
 * - Introspecting system services
 * - Calling methods on system services
 * - Monitoring system events
 * 
 * Common system services:
 * - org.freedesktop.NetworkManager - Network management
 * - org.freedesktop.login1 - System login manager
 * - org.freedesktop.UPower - Power management
 * - org.freedesktop.Notifications - Desktop notifications
 * 
 * Note: Some operations may require elevated permissions.
 */

import * as dbus from "dbus-next";

// Type-safe interfaces for D-Bus client proxies
interface IntrospectableInterface {
  Introspect: () => Promise<string>;
}

interface NetworkManagerInterface {
  version: Promise<string>;
  State: () => Promise<number>;
  ActiveConnections: Promise<string[]>;
}

interface LoginManagerInterface {
  ListSessions: () => Promise<Array<[string, number, string, string]>>;
}

interface UPowerInterface {
  OnBattery: Promise<boolean>;
  EnumerateDevices: () => Promise<string[]>;
}

interface UPowerDeviceInterface {
  Type: Promise<number>;
  Percentage: Promise<number>;
  State: Promise<number>;
}

interface NotificationsInterface {
  GetServerInformation: () => Promise<[string, string, string, string]>;
  Notify: (
    appName: string,
    replacesId: number,
    appIcon: string,
    summary: string,
    body: string,
    actions: string[],
    hints: Record<string, unknown>,
    timeout: number
  ) => Promise<number>;
}

interface LoginManagerEventsInterface extends LoginManagerInterface {
  on(event: "SessionNew", handler: (sessionId: string, objectPath: string) => void): void;
  on(event: "SessionRemoved", handler: (sessionId: string, objectPath: string) => void): void;
}

async function introspectService(serviceName: string, objectPath: string) {
  console.log(`\n=== Introspecting ${serviceName} ===`);
  console.log(`Object path: ${objectPath}\n`);

  try {
    const bus = dbus.systemBus();
    const obj = await bus.getProxyObject(serviceName, objectPath);
    
    // Get introspection XML
    const introspectable = obj.getInterface("org.freedesktop.DBus.Introspectable") as unknown as IntrospectableInterface;
    const xml = await introspectable.Introspect();
    
    console.log("Available interfaces and methods:");
    console.log(xml.substring(0, 500) + "...\n");
    
    bus.disconnect();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}\n`);
    } else {
      console.error(`Error: ${String(err)}\n`);
    }
  }
}

async function queryNetworkManager() {
  console.log("\n=== NetworkManager Integration ===\n");

  try {
    const bus = dbus.systemBus();
    const serviceName = "org.freedesktop.NetworkManager";
    const objectPath = "/org/freedesktop/NetworkManager";
    
    const obj = await bus.getProxyObject(serviceName, objectPath);
    const nm = obj.getInterface("org.freedesktop.NetworkManager") as unknown as NetworkManagerInterface;

    // Get NetworkManager version
    const version = await nm.version;
    console.log(`NetworkManager version: ${version}`);

    // Get network state
    const state = await nm.State();
    const states = [
      "Unknown",
      "Asleep",
      "Disconnected",
      "Disconnecting",
      "Connecting",
      "Connected (local)",
      "Connected (site)",
      "Connected (global)"
    ];
    const stateName = states[state];
    console.log(`Network state: ${stateName ?? state}`);

    // Get active connections
    const connections = await nm.ActiveConnections;
    console.log(`Active connections: ${connections.length}`);

    bus.disconnect();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`Error: ${String(err)}`);
    }
    console.log("Note: NetworkManager may not be available on all systems");
  }
}

async function queryLoginManager() {
  console.log("\n=== Login Manager (systemd-logind) Integration ===\n");

  try {
    const bus = dbus.systemBus();
    const serviceName = "org.freedesktop.login1";
    const objectPath = "/org/freedesktop/login1";
    
    const obj = await bus.getProxyObject(serviceName, objectPath);
    const login = obj.getInterface("org.freedesktop.login1.Manager") as unknown as LoginManagerInterface;

    // List current sessions
    const sessions = await login.ListSessions();
    console.log(`Active sessions: ${sessions.length}`);
    
    if (sessions.length > 0) {
      console.log("\nSession details:");
      sessions.forEach((session, index: number) => {
        console.log(`  Session ${index + 1}:`);
        console.log(`    ID: ${session[0]}`);
        console.log(`    User ID: ${session[1]}`);
        console.log(`    User: ${session[2]}`);
        console.log(`    Seat: ${session[3]}`);
      });
    }

    bus.disconnect();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`Error: ${String(err)}`);
    }
  }
}

async function queryUPower() {
  console.log("\n=== UPower (Power Management) Integration ===\n");

  try {
    const bus = dbus.systemBus();
    const serviceName = "org.freedesktop.UPower";
    const objectPath = "/org/freedesktop/UPower";
    
    const obj = await bus.getProxyObject(serviceName, objectPath);
    const upower = obj.getInterface("org.freedesktop.UPower") as unknown as UPowerInterface;

    // Check if on battery
    const onBattery = await upower.OnBattery;
    console.log(`On battery power: ${onBattery}`);

    // Enumerate devices
    const devices = await upower.EnumerateDevices();
    console.log(`Power devices found: ${devices.length}`);

    if (devices.length > 0) {
      console.log("\nQuerying first device...");
      const firstDevice = devices[0];
      if (firstDevice) {
        const deviceObj = await bus.getProxyObject(serviceName, firstDevice);
        const device = deviceObj.getInterface("org.freedesktop.UPower.Device") as unknown as UPowerDeviceInterface;
        
        const type = await device.Type;
        const percentage = await device.Percentage;
        const state = await device.State;
        
        const typeNames = ["Unknown", "Line Power", "Battery", "UPS", "Monitor", "Mouse", "Keyboard", "PDA", "Phone"];
        const stateNames = ["Unknown", "Charging", "Discharging", "Empty", "Fully charged", "Pending charge", "Pending discharge"];
        
        console.log(`  Type: ${typeNames[type] ?? type}`);
        console.log(`  State: ${stateNames[state] ?? state}`);
        console.log(`  Percentage: ${percentage.toFixed(1)}%`);
      }
    }

    bus.disconnect();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`Error: ${String(err)}`);
    }
    console.log("Note: UPower may not be available on all systems");
  }
}

async function sendDesktopNotification() {
  console.log("\n=== Desktop Notifications Integration ===\n");

  try {
    const bus = dbus.sessionBus(); // Notifications use session bus
    const serviceName = "org.freedesktop.Notifications";
    const objectPath = "/org/freedesktop/Notifications";
    
    const obj = await bus.getProxyObject(serviceName, objectPath);
    const notifications = obj.getInterface("org.freedesktop.Notifications") as unknown as NotificationsInterface;

    // Get server information
    const serverInfo = await notifications.GetServerInformation();
    console.log(`Notification server: ${serverInfo[0]}`);
    console.log(`Vendor: ${serverInfo[1]}`);
    console.log(`Version: ${serverInfo[2]}`);

    // Send a notification
    console.log("\nSending test notification...");
    const notificationId = await notifications.Notify(
      "D-Bus Example",     // app_name
      0,                   // replaces_id
      "",                  // app_icon
      "Hello from D-Bus!", // summary
      "This notification was sent using D-Bus from a Node.js/Bun application",
      [],                  // actions
      {},                  // hints
      5000                 // timeout (ms)
    );
    console.log(`Notification sent with ID: ${notificationId}`);

    bus.disconnect();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`Error: ${String(err)}`);
    }
    console.log("Note: Desktop notifications may not be available in this environment");
  }
}

async function monitorSystemEvents() {
  console.log("\n=== Monitoring System Events ===\n");
  console.log("Listening for login events (Ctrl+C to stop)...\n");

  try {
    const bus = dbus.systemBus();
    const serviceName = "org.freedesktop.login1";
    const objectPath = "/org/freedesktop/login1";
    
    const obj = await bus.getProxyObject(serviceName, objectPath);
    const login = obj.getInterface("org.freedesktop.login1.Manager") as unknown as LoginManagerEventsInterface;

    // Listen for session events
    login.on("SessionNew", (sessionId: string, objectPath: string) => {
      console.log(`New session created: ${sessionId} at ${objectPath}`);
    });

    login.on("SessionRemoved", (sessionId: string, objectPath: string) => {
      console.log(`Session removed: ${sessionId} at ${objectPath}`);
    });

    console.log("Event listeners registered. Waiting for events...");
    console.log("(This will run indefinitely - press Ctrl+C to stop)\n");

  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error(`Error: ${String(err)}`);
    }
    process.exit(1);
  }
}

async function main() {
  console.log("=== System D-Bus Integration Examples ===");
  console.log("This example explores various system services via D-Bus\n");

  const args = process.argv.slice(2);
  
  if (args.includes("--introspect")) {
    await introspectService(
      "org.freedesktop.NetworkManager",
      "/org/freedesktop/NetworkManager"
    );
    return;
  }

  if (args.includes("--monitor")) {
    await monitorSystemEvents();
    return;
  }

  // Run all demos
  await queryNetworkManager();
  await new Promise(resolve => setTimeout(resolve, 500));

  await queryLoginManager();
  await new Promise(resolve => setTimeout(resolve, 500));

  await queryUPower();
  await new Promise(resolve => setTimeout(resolve, 500));

  await sendDesktopNotification();

  console.log("\n=== All examples completed ===\n");
  console.log("Additional options:");
  console.log("  --introspect  Show introspection XML for NetworkManager");
  console.log("  --monitor     Monitor system events (runs indefinitely)\n");

  process.exit(0);
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n[Example] Shutting down...");
  process.exit(0);
});

main().catch(console.error);
