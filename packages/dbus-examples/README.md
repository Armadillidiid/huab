# D-Bus Examples

A comprehensive collection of examples demonstrating how to use D-Bus in Node.js/Bun applications using the `dbus-next` library.

## What is D-Bus?

D-Bus (Desktop Bus) is an inter-process communication (IPC) system that allows multiple programs to communicate with each other. It's commonly used in Linux desktop environments and system services.

### Key Concepts

1. **Bus Types**
   - **Session Bus**: Per-user bus for desktop applications
   - **System Bus**: System-wide bus for system services (requires permissions)

2. **Core Components**
   - **Service**: A program that provides functionality via D-Bus
   - **Object Path**: Unique identifier for objects (e.g., `/com/example/MyApp`)
   - **Interface**: Collection of methods, properties, and signals
   - **Methods**: Functions that can be called remotely
   - **Properties**: Values that can be read/written
   - **Signals**: Events that can be broadcast to listeners

3. **Use Cases**
   - Separating backend logic from GUI (your use case!)
   - Communicating between different applications
   - Controlling system services
   - Desktop notifications
   - Media player controls (MPRIS)
   - Network management

## Examples Overview

### 1. Basic Service (`01-basic-service.ts`)

Learn how to create a D-Bus service that exposes methods.

**Key Features:**
- Creating a service with a well-known name
- Defining an interface with methods
- Handling method calls
- Basic error handling

**Run:**
```bash
bun run service
```

### 2. Basic Client (`02-basic-client.ts`)

Learn how to connect to a D-Bus service and call its methods.

**Key Features:**
- Connecting to the session bus
- Getting a proxy object
- Calling remote methods
- Error handling for failed connections

**Prerequisites:** The service from example 1 must be running

**Run:**
```bash
# Terminal 1
bun run service

# Terminal 2
bun run client
```

### 3. Signals (`03-signals.ts`)

Learn how to emit and listen to D-Bus signals.

**Key Features:**
- Defining signals in an interface
- Emitting signals from a service
- Listening to signals from clients
- Background tasks that emit periodic signals

**Run:**
```bash
bun run signals
```

### 4. Properties (`04-properties.ts`)

Learn how to work with D-Bus properties (readable/writable values).

**Key Features:**
- Read/write properties
- Read-only properties
- Property validation
- Error handling for invalid values

**Run:**
```bash
bun run properties
```

### 5. System Bus Integration (`05-system-bus.ts`)

Learn how to interact with system services via D-Bus.

**Key Features:**
- Connecting to the system bus
- Introspecting system services
- NetworkManager integration
- Login manager (systemd-logind) queries
- Power management (UPower)
- Desktop notifications

**Run:**
```bash
# Run all examples
bun run system-bus

# Introspect a service
bun run system-bus -- --introspect

# Monitor system events
bun run system-bus -- --monitor
```

**Note:** Some operations may require system permissions.

### 6. Full Example: Media Player (`06-full-example.ts`)

A complete application combining all concepts.

**Features:**
- Playback controls (play, pause, stop, next, previous)
- Volume control
- Track information
- Playback position tracking
- Auto-advance through playlist
- Signal emissions on state changes

**Run:**
```bash
bun run full-example
```

### 7. Manager and Transactions Pattern (`07-manager-transactions.ts`)

Learn the Manager/Transaction pattern used by system services like NetworkManager, UDisks2, and PackageKit.

**Key Features:**
- Manager object that creates transaction objects
- Dynamic object paths for each transaction
- Progress reporting via signals
- Transaction lifecycle management
- Multiple concurrent transactions
- Transaction cancellation
- Automatic cleanup after completion

**Pattern Overview:**
- **Manager** - Central service that creates and manages transactions
- **Transactions** - Temporary objects with unique paths for specific operations
- Each transaction emits signals to report progress
- Transactions are automatically destroyed after completion

**Real-world use cases:**
- NetworkManager: Creates connection objects
- UDisks2: Creates job objects for disk operations
- PackageKit: Creates transaction objects for package operations
- systemd: Creates job objects for unit operations

**Run:**
```bash
bun run manager-transactions
```

## Additional Resources

### Command-Line D-Bus Tools

See [DBUS_COMMANDS.md](./DBUS_COMMANDS.md) for a comprehensive guide on using D-Bus command-line tools like `busctl`, `dbus-send`, and `dbus-monitor` to interact with these examples without writing code.

Learn how to:
- Call methods using `busctl` and `dbus-send`
- Monitor signals with `dbus-monitor`
- Get and set properties
- Introspect services
- Script D-Bus operations in bash

## Installation

The examples use `dbus-next`, which is already installed in this package.

```bash
bun install
```

## Usage Patterns

### Creating a Service

```typescript
import * as dbus from "dbus-next";

const bus = dbus.sessionBus();
await bus.requestName("com.example.MyService", 0);

const myInterface = new MyInterface("com.example.MyInterface");
bus.export("/com/example/MyObject", myInterface);
```

### Creating a Client

```typescript
import * as dbus from "dbus-next";

const bus = dbus.sessionBus();
const obj = await bus.getProxyObject(
  "com.example.MyService",
  "/com/example/MyObject"
);
const iface = obj.getInterface("com.example.MyInterface");

// Call methods
const result = await iface.MyMethod(arg1, arg2);

// Listen to signals
iface.on("MySignal", (data) => {
  console.log("Signal received:", data);
});
```

### Defining an Interface

These examples use the `configureMembers` static method instead of decorators for better compatibility with modern TypeScript/Bun:

```typescript
import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

class MyInterface extends DBusInterface {
  private _count: number = 0;

  // Method implementation
  Echo(message: string): string {
    return message;
  }

  // Property getter/setter
  get Count(): number {
    return this._count;
  }

  set Count(value: number) {
    this._count = value;
  }

  // Signal (will be configured below)
  StatusChanged!: (status: string) => void;
}

// Configure members after class definition
MyInterface.configureMembers({
  methods: {
    Echo: {
      inSignature: "s",   // input: string
      outSignature: "s"   // output: string
    }
  },
  properties: {
    Count: {
      signature: "i",     // type: integer
      access: dbus.interface.ACCESS_READWRITE
    }
  },
  signals: {
    StatusChanged: {
      signature: "s"      // parameter: string
    }
  }
});
```

#### Why `configureMembers` instead of Decorators?

While `dbus-next` supports decorators (`@method`, `@property`, `@signal`), they have runtime compatibility issues with modern TypeScript/Bun due to differences in decorator implementation. The `configureMembers` approach:

- ✅ Works with modern TypeScript/Bun runtime
- ✅ No experimental decorator flags needed
- ✅ Clean type checking
- ✅ Same functionality as decorators
- ✅ Better compatibility across different Node.js/Bun versions

## D-Bus Type Signatures

Common type signatures used in D-Bus:

- `s` - String
- `i` - 32-bit integer
- `d` - Double (floating point)
- `b` - Boolean
- `as` - Array of strings
- `ai` - Array of integers
- `a{sv}` - Dictionary (string keys, variant values)

## Use Case: Backend and GUI Separation

Based on your previous conversation, here's how you can use D-Bus to separate your backend from your GUI:

### Backend Service

```typescript
// backend-service.ts
class BackendInterface extends DBusInterface {
  async ProcessData(input: string): Promise<string> {
    // Your backend logic here
    return result;
  }

  ProgressUpdate!: (status: string) => void;

  async longRunningTask() {
    // Emit progress updates
    this.ProgressUpdate("Starting...");
    // ... do work ...
    this.ProgressUpdate("Complete!");
  }
}

// Configure the interface
BackendInterface.configureMembers({
  methods: {
    ProcessData: {
      inSignature: "s",
      outSignature: "s"
    }
  },
  signals: {
    ProgressUpdate: {
      signature: "s"
    }
  }
});
```

### GUI Client

```typescript
// gui-client.ts
const backend = await getBackendInterface();

// Listen to progress updates
backend.on("ProgressUpdate", (status) => {
  updateProgressBar(status);
});

// Call backend methods
const result = await backend.ProcessData(userInput);
displayResult(result);
```

### Benefits

1. **Separation of Concerns**: Backend and GUI run in separate processes
2. **Language Independence**: Backend and GUI can be written in different languages
3. **Multiple Clients**: Multiple GUIs can connect to the same backend
4. **System Integration**: Your app can integrate with desktop environment
5. **Crash Isolation**: If GUI crashes, backend keeps running

## Debugging

### List D-Bus Services

```bash
# Session bus
dbus-send --session --print-reply --dest=org.freedesktop.DBus \
  /org/freedesktop/DBus org.freedesktop.DBus.ListNames

# System bus
dbus-send --system --print-reply --dest=org.freedesktop.DBus \
  /org/freedesktop/DBus org.freedesktop.DBus.ListNames
```

### Monitor D-Bus Traffic

```bash
# Monitor session bus
dbus-monitor --session

# Monitor specific service
dbus-monitor "sender='com.example.MyService'"
```

### Introspect a Service

```bash
dbus-send --session --print-reply \
  --dest=com.example.MyService \
  /com/example/MyObject \
  org.freedesktop.DBus.Introspectable.Introspect
```

### Test Method Calls

```bash
dbus-send --session --print-reply \
  --dest=com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator.Add int32:10 int32:5
```

## Further Reading

- [D-Bus Specification](https://dbus.freedesktop.org/doc/dbus-specification.html)
- [dbus-next Documentation](https://github.com/dbusjs/node-dbus-next)
- [dbus-next API Docs](https://acrisci.github.io/doc/node-dbus-next/)
- [D-Bus Tutorial](https://dbus.freedesktop.org/doc/dbus-tutorial.html)

## License

ISC
