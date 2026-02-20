#!/usr/bin/env bun
/**
 * Example 4: D-Bus Properties
 * 
 * This example demonstrates how to work with D-Bus properties.
 * Properties allow services to expose readable/writable values that can be
 * accessed and modified by clients.
 * 
 * Key concepts:
 * - Defining properties with read/write access using configureMembers
 * - Property change notifications
 * - Getting and setting properties from clients
 * - PropertyChanged signals
 * 
 * This file contains both the service and client in one example.
 */

import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

// Type-safe interface for the D-Bus client proxy
interface SettingsClientInterface {
  Volume: Promise<number>;
  Brightness: Promise<number>;
  Theme: Promise<string>;
  Version: Promise<string>;
  Enabled: Promise<boolean>;
  GetSummary: () => Promise<string>;
  ResetToDefaults: () => Promise<void>;
}

// Service: Application settings with properties
class SettingsInterface extends DBusInterface {
  private _volume: number = 50;
  private _brightness: number = 80;
  private _theme: string = "dark";
  private _enabled: boolean = true;

  // Read/Write property: Volume (0-100)
  get Volume(): number {
    return this._volume;
  }

  set Volume(value: number) {
    if (value < 0 || value > 100) {
      throw new Error("Volume must be between 0 and 100");
    }
    const oldValue = this._volume;
    this._volume = value;
    console.log(`[Service] Volume changed: ${oldValue} -> ${value}`);
  }

  // Read/Write property: Brightness (0-100)
  get Brightness(): number {
    return this._brightness;
  }

  set Brightness(value: number) {
    if (value < 0 || value > 100) {
      throw new Error("Brightness must be between 0 and 100");
    }
    const oldValue = this._brightness;
    this._brightness = value;
    console.log(`[Service] Brightness changed: ${oldValue} -> ${value}`);
  }

  // Read/Write property: Theme
  get Theme(): string {
    return this._theme;
  }

  set Theme(value: string) {
    const validThemes = ["dark", "light", "auto"];
    if (!validThemes.includes(value)) {
      throw new Error(`Theme must be one of: ${validThemes.join(", ")}`);
    }
    const oldValue = this._theme;
    this._theme = value;
    console.log(`[Service] Theme changed: ${oldValue} -> ${value}`);
  }

  // Read-only property: Application version
  get Version(): string {
    return "1.0.0";
  }

  // Read/Write property: Enabled state
  get Enabled(): boolean {
    return this._enabled;
  }

  set Enabled(value: boolean) {
    const oldValue = this._enabled;
    this._enabled = value;
    console.log(`[Service] Enabled changed: ${oldValue} -> ${value}`);
  }

  // Method: Get all settings as a summary
  GetSummary(): string {
    return JSON.stringify({
      volume: this._volume,
      brightness: this._brightness,
      theme: this._theme,
      enabled: this._enabled,
      version: "1.0.0"
    }, null, 2);
  }

  // Method: Reset to defaults
  ResetToDefaults(): void {
    console.log("[Service] Resetting to defaults...");
    this.Volume = 50;
    this.Brightness = 80;
    this.Theme = "dark";
    this.Enabled = true;
  }
}

// Configure the interface members (alternative to decorators)
SettingsInterface.configureMembers({
  properties: {
    Volume: {
      signature: "i",
      access: dbus.interface.ACCESS_READWRITE
    },
    Brightness: {
      signature: "i",
      access: dbus.interface.ACCESS_READWRITE
    },
    Theme: {
      signature: "s",
      access: dbus.interface.ACCESS_READWRITE
    },
    Version: {
      signature: "s",
      access: dbus.interface.ACCESS_READ
    },
    Enabled: {
      signature: "b",
      access: dbus.interface.ACCESS_READWRITE
    }
  },
  methods: {
    GetSummary: {
      inSignature: "",
      outSignature: "s"
    },
    ResetToDefaults: {
      inSignature: "",
      outSignature: ""
    }
  }
});

async function startService() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.Settings";
  const objectPath = "/com/example/Settings";
  const interfaceName = "com.example.Settings";

  try {
    await bus.requestName(serviceName, 0);
    console.log(`[Service] Acquired name: ${serviceName}`);

    const settings = new SettingsInterface(interfaceName);
    bus.export(objectPath, settings);

    console.log("[Service] Settings service is ready!");
    console.log("[Service] Initial state:");
    console.log(settings.GetSummary());
    console.log();

    return { bus, settings };
  } catch (err) {
    console.error("[Service] Error:", err);
    throw err;
  }
}

async function startClient() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.Settings";
  const objectPath = "/com/example/Settings";
  const interfaceName = "com.example.Settings";

  try {
    // Wait a bit for service to be ready
    await new Promise(resolve => setTimeout(resolve, 500));

    const obj = await bus.getProxyObject(serviceName, objectPath);
    const settings = obj.getInterface(interfaceName) as unknown as SettingsClientInterface;

    console.log("[Client] Connected to settings service\n");

    return { bus, settings };
  } catch (err) {
    console.error("[Client] Error:", err);
    throw err;
  }
}

async function demonstrateProperties() {
  console.log("=== D-Bus Properties Example ===\n");

  // Start service
  const service = await startService();

  // Start client
  const client = await startClient();

  // Give client time to connect
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("=== Reading Properties ===\n");
  
  const volume = await client.settings.Volume;
  console.log(`[Client] Current volume: ${volume}`);
  
  const brightness = await client.settings.Brightness;
  console.log(`[Client] Current brightness: ${brightness}`);
  
  const theme = await client.settings.Theme;
  console.log(`[Client] Current theme: ${theme}`);
  
  const version = await client.settings.Version;
  console.log(`[Client] Application version: ${version} (read-only)`);
  
  const enabled = await client.settings.Enabled;
  console.log(`[Client] Enabled: ${enabled}\n`);

  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("=== Writing Properties ===\n");
  
  console.log("[Client] Setting volume to 75...");
  (client.settings as any).Volume = 75;
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("[Client] Setting brightness to 60...");
  (client.settings as any).Brightness = 60;
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("[Client] Setting theme to 'light'...");
  (client.settings as any).Theme = "light";
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("[Client] Setting enabled to false...");
  (client.settings as any).Enabled = false;
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("\n=== Getting Summary ===\n");
  const summary = await client.settings.GetSummary();
  console.log("[Client] Current settings:");
  console.log(summary);

  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("\n=== Testing Error Handling ===\n");
  
  try {
    console.log("[Client] Attempting to set invalid volume (150)...");
    (client.settings as any).Volume = 150;
  } catch (err) {
    if (err instanceof Error) {
      console.log(`[Client] Caught error: ${err.message}`);
    } else {
      console.log(`[Client] Caught error: ${String(err)}`);
    }
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    console.log("[Client] Attempting to set invalid theme ('rainbow')...");
    (client.settings as any).Theme = "rainbow";
  } catch (err) {
    if (err instanceof Error) {
      console.log(`[Client] Caught error: ${err.message}`);
    } else {
      console.log(`[Client] Caught error: ${String(err)}`);
    }
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("\n=== Resetting to Defaults ===\n");
  await client.settings.ResetToDefaults();
  await new Promise(resolve => setTimeout(resolve, 300));

  const resetSummary = await client.settings.GetSummary();
  console.log("[Client] Settings after reset:");
  console.log(resetSummary);

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

demonstrateProperties().catch(console.error);
