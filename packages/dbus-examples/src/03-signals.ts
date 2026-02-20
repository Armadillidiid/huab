#!/usr/bin/env bun
/**
 * Example 3: D-Bus Signals
 * 
 * This example demonstrates how to emit and listen to D-Bus signals.
 * Signals are used for broadcasting events from a service to any interested clients.
 * 
 * Key concepts:
 * - Defining signals in an interface using configureMembers
 * - Emitting signals from a service
 * - Listening to signals from clients
 * - Signal handlers and cleanup
 * 
 * This file contains both the service and client in one example.
 * Run it to see signals in action.
 */

import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

// Type-safe interface for the Notification service
interface NotificationClientInterface {
  SendNotification: (title: string, message: string) => Promise<boolean>;
  SetStatus: (status: string) => Promise<void>;
  StartBackgroundTask: () => Promise<void>;
  on(event: "NotificationSent", callback: (title: string, message: string) => void): void;
  on(event: "StatusChanged", callback: (status: string) => void): void;
}

// Service: Notification system that emits signals
class NotificationInterface extends DBusInterface {
  // Signals - these will be wrapped by configureMembers to emit on the bus
  NotificationSent(title: string, message: string): [string, string] {
    return [title, message];
  }

  StatusChanged(status: string): string {
    return status;
  }

  // Method: Send a notification (this will emit a signal)
  SendNotification(title: string, message: string): boolean {
    console.log(`[Service] Sending notification: "${title}" - "${message}"`);
    
    // Emit the signal to all listeners
    this.NotificationSent(title, message);
    
    return true;
  }

  // Method: Change status (this will emit a signal)
  SetStatus(status: string): void {
    console.log(`[Service] Status changed to: ${status}`);
    
    // Emit the signal
    this.StatusChanged(status);
  }

  // Method: Simulate a background event that emits signals
  StartBackgroundTask(): void {
    console.log("[Service] Starting background task...");
    
    // Emit periodic status updates
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const status = `Processing... ${count * 20}%`;
      this.StatusChanged(status);
      
      if (count >= 5) {
        clearInterval(interval);
        this.StatusChanged("Completed!");
        this.NotificationSent("Task Complete", "Background task has finished successfully");
      }
    }, 1000);
  }
}

// Configure the interface members (alternative to decorators)
NotificationInterface.configureMembers({
  methods: {
    SendNotification: {
      inSignature: "ss",
      outSignature: "b"
    },
    SetStatus: {
      inSignature: "s",
      outSignature: ""
    },
    StartBackgroundTask: {
      inSignature: "",
      outSignature: ""
    }
  },
  signals: {
    NotificationSent: {
      signature: "ss"
    },
    StatusChanged: {
      signature: "s"
    }
  }
});

async function startService() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.Notifications";
  const objectPath = "/com/example/Notifications";
  const interfaceName = "com.example.Notifications";

  try {
    await bus.requestName(serviceName, 0);
    console.log(`[Service] Acquired name: ${serviceName}`);

    const notif = new NotificationInterface(interfaceName);
    bus.export(objectPath, notif);

    console.log("[Service] Notification service is ready!");
    console.log("[Service] You can now call methods that will emit signals\n");

    return { bus, notif };
  } catch (err) {
    console.error("[Service] Error:", err);
    throw err;
  }
}

async function startClient() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.Notifications";
  const objectPath = "/com/example/Notifications";
  const interfaceName = "com.example.Notifications";

  try {
    // Wait a bit for service to be ready
    await new Promise(resolve => setTimeout(resolve, 500));

    const obj = await bus.getProxyObject(serviceName, objectPath);
    const notif = obj.getInterface(interfaceName) as unknown as NotificationClientInterface;

    console.log("[Client] Connected to notification service\n");

    // Listen to NotificationSent signal
    notif.on("NotificationSent", (title: string, message: string) => {
      console.log(`[Client] 🔔 Received notification:`);
      console.log(`         Title: ${title}`);
      console.log(`         Message: ${message}\n`);
    });

    // Listen to StatusChanged signal
    notif.on("StatusChanged", (status: string) => {
      console.log(`[Client] 📊 Status update: ${status}`);
    });

    console.log("[Client] Signal listeners registered\n");

    return { bus, notif };
  } catch (err) {
    console.error("[Client] Error:", err);
    throw err;
  }
}

async function demonstrateSignals() {
  console.log("=== D-Bus Signals Example ===\n");

  // Start service
  const service = await startService();

  // Start client (which will listen to signals)
  const client = await startClient();

  // Give client time to set up listeners
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("=== Demonstration 1: Manual notification ===\n");
  await client.notif.SendNotification("Hello", "This is a test notification");

  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("\n=== Demonstration 2: Status changes ===\n");
  await client.notif.SetStatus("Idle");
  await new Promise(resolve => setTimeout(resolve, 500));
  await client.notif.SetStatus("Working");
  await new Promise(resolve => setTimeout(resolve, 500));
  await client.notif.SetStatus("Done");

  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("\n=== Demonstration 3: Background task with periodic signals ===\n");
  await client.notif.StartBackgroundTask();

  // Wait for background task to complete
  await new Promise(resolve => setTimeout(resolve, 7000));

  console.log("\n=== All demonstrations completed ===\n");

  // Cleanup
  service.bus.disconnect();
  client.bus.disconnect();
  process.exit(0);
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n[Example] Shutting down...");
  process.exit(0);
});

demonstrateSignals().catch(console.error);
