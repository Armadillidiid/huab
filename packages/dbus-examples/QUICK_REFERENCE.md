# D-Bus Quick Reference

## Common Patterns

### Creating a Service

```typescript
import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

class MyInterface extends DBusInterface {
  MyMethod(input: string): string {
    return input.toUpperCase();
  }
}

// Configure members instead of using decorators
MyInterface.configureMembers({
  methods: {
    MyMethod: {
      inSignature: "s",
      outSignature: "s"
    }
  }
});

const bus = dbus.sessionBus();
await bus.requestName("com.example.MyService", 0);
const iface = new MyInterface("com.example.MyInterface");
bus.export("/com/example/MyObject", iface);
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
const result = await iface.MyMethod("hello");
```

### Emitting Signals

```typescript
class MyInterface extends DBusInterface {
  // Signal method returns the value(s) to emit
  StatusChanged(status: string): string {
    return status;
  }

  someMethod() {
    // Emit the signal by calling the method
    this.StatusChanged("New status");
  }
}

// Configure the signal
MyInterface.configureMembers({
  signals: {
    StatusChanged: {
      signature: "s"
    }
  }
});
```

### Listening to Signals

```typescript
iface.on("StatusChanged", (status: string) => {
  console.log("Status changed:", status);
});
```

### Properties

```typescript
class MyInterface extends DBusInterface {
  private _count: number = 0;

  get Count(): number {
    return this._count;
  }

  set Count(value: number) {
    this._count = value;
  }
}

// Configure the property
MyInterface.configureMembers({
  properties: {
    Count: {
      signature: "i",
      access: dbus.interface.ACCESS_READWRITE
    }
  }
});

// Client side
const count = await iface.Count;
iface.Count = 42;
```

## Type Signatures

| Type | Signature | TypeScript Type |
|------|-----------|----------------|
| Boolean | `b` | `boolean` |
| Byte | `y` | `number` |
| Int16 | `n` | `number` |
| Uint16 | `q` | `number` |
| Int32 | `i` | `number` |
| Uint32 | `u` | `number` |
| Int64 | `x` | `bigint` |
| Uint64 | `t` | `bigint` |
| Double | `d` | `number` |
| String | `s` | `string` |
| Object Path | `o` | `string` |
| Signature | `g` | `string` |
| Array of strings | `as` | `string[]` |
| Array of ints | `ai` | `number[]` |
| Dictionary | `a{sv}` | `Record<string, any>` |
| Variant | `v` | `any` |
| Struct | `(ss)` | `[string, string]` |

## Property Access Modes

```typescript
dbus.interface.ACCESS_READ        // Read-only
dbus.interface.ACCESS_WRITE       // Write-only  
dbus.interface.ACCESS_READWRITE   // Read and write
```

## Well-Known System Services

### NetworkManager
- Service: `org.freedesktop.NetworkManager`
- Object: `/org/freedesktop/NetworkManager`
- Interface: `org.freedesktop.NetworkManager`

### Login Manager (systemd-logind)
- Service: `org.freedesktop.login1`
- Object: `/org/freedesktop/login1`
- Interface: `org.freedesktop.login1.Manager`

### UPower (Power Management)
- Service: `org.freedesktop.UPower`
- Object: `/org/freedesktop/UPower`
- Interface: `org.freedesktop.UPower`

### Notifications
- Service: `org.freedesktop.Notifications`
- Object: `/org/freedesktop/Notifications`
- Interface: `org.freedesktop.Notifications`

## Debugging Commands

### List all services
```bash
dbus-send --session --print-reply \
  --dest=org.freedesktop.DBus \
  /org/freedesktop/DBus \
  org.freedesktop.DBus.ListNames
```

### Introspect a service
```bash
dbus-send --session --print-reply \
  --dest=com.example.MyService \
  /com/example/MyObject \
  org.freedesktop.DBus.Introspectable.Introspect
```

### Call a method
```bash
dbus-send --session --print-reply \
  --dest=com.example.MyService \
  /com/example/MyObject \
  com.example.MyInterface.MyMethod string:"hello"
```

### Monitor D-Bus traffic
```bash
dbus-monitor --session
```

## Error Handling

```typescript
try {
  const result = await iface.MyMethod();
} catch (err: any) {
  if (err.type === "org.freedesktop.DBus.Error.ServiceUnknown") {
    console.error("Service not available");
  } else {
    console.error("Error:", err.message);
  }
}
```

## Best Practices

1. **Naming Conventions**
   - Services: `com.example.MyService` (reverse domain)
   - Objects: `/com/example/MyObject` (path-like)
   - Interfaces: `com.example.MyInterface` (reverse domain)

2. **Error Handling**
   - Always wrap D-Bus calls in try-catch
   - Check if services are available before calling
   - Provide meaningful error messages

3. **Resource Cleanup**
   - Disconnect from the bus when done
   - Clear intervals/timers in service cleanup
   - Remove signal listeners when no longer needed

4. **Security**
   - Session bus for user applications
   - System bus requires proper permissions
   - Validate all inputs from D-Bus calls

5. **Performance**
   - Use signals for events, not polling
   - Batch method calls when possible
   - Keep method calls async

## Common Issues

### Service Not Found
- Ensure the service is running
- Check service name spelling
- Verify bus type (session vs system)

### Permission Denied
- System bus operations may require PolicyKit
- Check D-Bus policy files in `/etc/dbus-1/`
- User may not have required permissions

### Type Mismatch
- Verify signature matches expected types
- Check array vs single value
- Ensure proper variant handling

## Additional Resources

- [D-Bus Specification](https://dbus.freedesktop.org/doc/dbus-specification.html)
- [dbus-next GitHub](https://github.com/dbusjs/node-dbus-next)
- [D-Bus Tutorial](https://dbus.freedesktop.org/doc/dbus-tutorial.html)
