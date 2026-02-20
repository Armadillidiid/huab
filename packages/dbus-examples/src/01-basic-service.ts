#!/usr/bin/env bun
/**
 * Example 1: Basic D-Bus Service
 * 
 * This example demonstrates how to create a D-Bus service that exposes methods
 * to other applications on the session bus.
 * 
 * Key concepts:
 * - Creating a service with a well-known name
 * - Defining an interface with methods using configureMembers
 * - Exporting the interface on an object path
 * - Handling method calls
 */

import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

// Define the interface using configureMembers (no decorators needed!)
class CalculatorInterface extends DBusInterface {
  // Method: Add two numbers
  Add(a: number, b: number): number {
    console.log(`[Service] Add called with: ${a} + ${b}`);
    return a + b;
  }

  // Method: Subtract two numbers
  Subtract(a: number, b: number): number {
    console.log(`[Service] Subtract called with: ${a} - ${b}`);
    return a - b;
  }

  // Method: Multiply two numbers
  Multiply(a: number, b: number): number {
    console.log(`[Service] Multiply called with: ${a} * ${b}`);
    return a * b;
  }

  // Method: Divide two numbers (with error handling)
  Divide(a: number, b: number): number {
    console.log(`[Service] Divide called with: ${a} / ${b}`);
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  }

  // Method: Greet with a string
  Greet(name: string): string {
    console.log(`[Service] Greet called with: ${name}`);
    return `Hello, ${name}!`;
  }
}

// Configure the interface members (alternative to decorators)
CalculatorInterface.configureMembers({
  methods: {
    Add: {
      inSignature: "ii",
      outSignature: "i"
    },
    Subtract: {
      inSignature: "ii",
      outSignature: "i"
    },
    Multiply: {
      inSignature: "ii",
      outSignature: "i"
    },
    Divide: {
      inSignature: "ii",
      outSignature: "d"
    },
    Greet: {
      inSignature: "s",
      outSignature: "s"
    }
  }
});

async function main() {
  // Connect to the session bus
  const bus = dbus.sessionBus();

  console.log("[Service] Connecting to session bus...");

  // Request a well-known name for our service
  const serviceName = "com.example.Calculator";
  const objectPath = "/com/example/Calculator";
  const interfaceName = "com.example.Calculator";

  try {
    await bus.requestName(serviceName, 0);
    console.log(`[Service] Acquired name: ${serviceName}`);

    // Create and export the interface
    const calc = new CalculatorInterface(interfaceName);
    bus.export(objectPath, calc);

    console.log(`[Service] Exported interface at: ${objectPath}`);
    console.log("[Service] Calculator service is ready!");
    console.log("\nYou can now run the client to call methods on this service.");
    console.log("Try running: bun run client\n");

    // Keep the service running
    console.log("Press Ctrl+C to stop the service...");
  } catch (err) {
    console.error("[Service] Error:", err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n[Service] Shutting down...");
  process.exit(0);
});

main().catch(console.error);
