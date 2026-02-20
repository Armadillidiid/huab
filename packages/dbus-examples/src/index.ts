#!/usr/bin/env bun
/**
 * D-Bus Examples Index
 * 
 * Interactive menu to explore all D-Bus examples
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                      D-Bus Examples                            ║
║                   Learning D-Bus with Bun                      ║
╚════════════════════════════════════════════════════════════════╝

Welcome! This package contains comprehensive examples for learning D-Bus.

Available Examples:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Basic Service (01-basic-service.ts)
   └─ Create a D-Bus service that exposes methods
   └─ Run: bun run service

2. Basic Client (02-basic-client.ts)
   └─ Connect to a service and call its methods
   └─ Run: bun run client
   └─ Prerequisites: Example 1 must be running

3. Signals (03-signals.ts)
   └─ Emit and listen to D-Bus signals (events)
   └─ Run: bun run signals

4. Properties (04-properties.ts)
   └─ Work with readable/writable D-Bus properties
   └─ Run: bun run properties

5. System Bus Integration (05-system-bus.ts)
   └─ Interact with system services (NetworkManager, UPower, etc.)
   └─ Run: bun run system-bus
   └─ Options: --introspect, --monitor

6. Full Example: Media Player (06-full-example.ts)
   └─ Complete application combining all concepts
   └─ Run: bun run full-example

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick Start:
  1. Read the README.md for detailed explanations
  2. Start with example 1 and 2 to understand basics
  3. Try example 3 to learn about signals
  4. Explore example 6 for a complete application

Documentation:
  See README.md for detailed usage, patterns, and debugging tips

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Happy learning! 🚀
`);
