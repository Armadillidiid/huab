#!/usr/bin/env bun
/**
 * Example 2: Basic D-Bus Client
 *
 * This example demonstrates how to connect to a D-Bus service and call its methods.
 *
 * Key concepts:
 * - Connecting to the session bus
 * - Getting a proxy object for a service
 * - Calling methods on the remote object
 * - Error handling for D-Bus calls
 *
 * Prerequisites:
 * - The service from 01-basic-service.ts must be running
 */

import * as dbus from "dbus-next";

// Type-safe interface for the Calculator service
interface CalculatorInterface extends dbus.ClientInterface {
  Add: (a: number, b: number) => Promise<number>;
  Subtract: (a: number, b: number) => Promise<number>;
  Multiply: (a: number, b: number) => Promise<number>;
  Divide: (a: number, b: number) => Promise<number>;
  Greet: (name: string) => Promise<string>;
}

async function main() {
  // Connect to the session bus
  const bus = dbus.sessionBus();

  console.log("[Client] Connecting to session bus...");

  const serviceName = "com.example.Calculator";
  const objectPath = "/com/example/Calculator";
  const interfaceName = "com.example.Calculator";

  try {
    // Get the proxy object for the remote service
    const obj = await bus.getProxyObject(serviceName, objectPath);

    // Get the interface with proper typing
    const calculator = obj.getInterface(interfaceName) as unknown as CalculatorInterface;

    console.log(`[Client] Connected to ${serviceName}\n`);

    // Call methods on the remote service
    console.log("=== Calling Add method ===");
    const sum = await calculator.Add(10, 5);
    console.log(`Result: 10 + 5 = ${sum}\n`);

    console.log("=== Calling Subtract method ===");
    const difference = await calculator.Subtract(10, 5);
    console.log(`Result: 10 - 5 = ${difference}\n`);

    console.log("=== Calling Multiply method ===");
    const product = await calculator.Multiply(10, 5);
    console.log(`Result: 10 * 5 = ${product}\n`);

    console.log("=== Calling Divide method ===");
    const quotient = await calculator.Divide(10, 5);
    console.log(`Result: 10 / 5 = ${quotient}\n`);

    console.log("=== Calling Greet method ===");
    const greeting = await calculator.Greet("D-Bus Learner");
    console.log(`Result: ${greeting}\n`);

    // Error handling example
    console.log("=== Testing error handling (divide by zero) ===");
    try {
      await calculator.Divide(10, 0);
    } catch (err) {
      const error = err as Error;
      console.log(`Caught error: ${error.message}\n`);
    }

    console.log("[Client] All operations completed successfully!");

    // Disconnect
    bus.disconnect();
    process.exit(0);
  } catch (err) {
    const error = err as Error;
    console.error("[Client] Error:", error.message);
    console.error("\nMake sure the service is running first:");
    console.error("  bun run service\n");
    process.exit(1);
  }
}

main().catch(console.error);
