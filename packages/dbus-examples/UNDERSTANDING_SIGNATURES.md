# Understanding D-Bus Signatures and Parameter Meanings

## The Problem

D-Bus signatures like `tas` tell you the **types** but not the **semantic meaning**:
- `t` = uint64... but uint64 of what?
- `a` = array... array of what?
- `s` = string... but what does the string represent?

You need to know: "Is this a filter? A flag? A count? An ID?"

## Solutions: How to Find Parameter Meanings

### Method 1: Introspection XML (Most Reliable)

D-Bus services can provide **annotations** in their introspection XML that document parameters.

#### Using `busctl introspect` (Easiest)

```bash
# Introspect PackageKit transaction interface
busctl --system introspect \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit/Tid_1 \
  org.freedesktop.PackageKit.Transaction
```

**Example output with parameter names:**
```
NAME                                TYPE      SIGNATURE RESULT/VALUE FLAGS
.Resolve                            method    tas       -            -
  .filter                           in        t         -            -
  .packages                         in        as        -            -
.InstallPackages                    method    tas       -            -
  .transaction_flags                in        t         -            -
  .package_ids                      in        as        -            -
```

See those `.filter`, `.packages`, `.transaction_flags`? Those are **parameter names**!

#### Using `dbus-send` for Full XML

```bash
# Get full introspection XML
dbus-send --system --print-reply \
  --dest=org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit/Tid_1 \
  org.freedesktop.DBus.Introspectable.Introspect
```

**Example XML output:**
```xml
<interface name="org.freedesktop.PackageKit.Transaction">
  <method name="Resolve">
    <arg type="t" name="filter" direction="in"/>
    <arg type="as" name="packages" direction="in"/>
  </method>
  
  <method name="InstallPackages">
    <arg type="t" name="transaction_flags" direction="in"/>
    <arg type="as" name="package_ids" direction="in"/>
  </method>
  
  <method name="SearchNames">
    <arg type="t" name="filter" direction="in"/>
    <arg type="as" name="search" direction="in"/>
  </method>
</interface>
```

Now you can see:
- `Resolve(t filter, as packages)` - First param is a filter, second is package names
- `InstallPackages(t transaction_flags, as package_ids)` - Flags and IDs
- `SearchNames(t filter, as search)` - Filter and search terms

### Method 2: D-Feet GUI (Most Visual)

D-Feet is a graphical D-Bus debugger that shows parameter names and lets you explore interactively.

#### Install D-Feet

```bash
# Ubuntu/Debian
sudo apt install d-feet

# Fedora
sudo dnf install d-feet

# Arch
sudo pacman -S d-feet
```

#### Using D-Feet

1. Launch `d-feet`
2. Choose "System Bus" or "Session Bus"
3. Find your service (e.g., `org.freedesktop.PackageKit`)
4. Click on object paths
5. See methods with **parameter names and descriptions**

**Screenshot representation:**
```
Service: org.freedesktop.PackageKit
Object: /org/freedesktop/PackageKit/Tid_1
Interface: org.freedesktop.PackageKit.Transaction

Method: Resolve
  ├─ Input:  filter (uint64) - Bitfield filter for packages
  ├─ Input:  packages (array of strings) - Package names to resolve
  └─ Output: (none)

Method: InstallPackages
  ├─ Input:  transaction_flags (uint64) - Transaction flags bitfield
  ├─ Input:  package_ids (array of strings) - Package IDs to install
  └─ Output: (none)
```

### Method 3: Official Documentation

Many well-known services have documentation:

#### PackageKit
- **API Docs:** https://www.freedesktop.org/software/PackageKit/gtk-doc/
- **D-Bus Spec:** https://www.freedesktop.org/software/PackageKit/gtk-doc/PackageKit-dbus-reference.html

#### NetworkManager
- **D-Bus API:** https://networkmanager.dev/docs/api/latest/spec.html

#### systemd
- **D-Bus API:** https://www.freedesktop.org/wiki/Software/systemd/dbus/

#### UDisks2
- **D-Bus API:** http://storaged.org/doc/udisks2-api/latest/

### Method 4: Source Code

If documentation is missing, check the source:

#### PackageKit Source
```bash
# Clone the repo
git clone https://github.com/PackageKit/PackageKit.git

# Look at interface definitions
cat PackageKit/data/org.freedesktop.PackageKit.Transaction.xml
```

#### Finding Interface XML Files

Many projects ship `.xml` files that define their D-Bus interfaces:

```bash
# Common locations for interface XML files
/usr/share/dbus-1/interfaces/
/usr/share/dbus-1/system.d/
~/.local/share/dbus-1/interfaces/

# Example: Find PackageKit interface definitions
find /usr/share -name "*PackageKit*.xml" 2>/dev/null
```

### Method 5: GDBus Codegen Documentation

Some projects use `gdbus-codegen` which generates documentation:

```bash
# Look for generated documentation
less /usr/share/doc/packagekit/
```

## Detailed Example: Decoding `Resolve(tas)`

Let's decode the PackageKit `Resolve` method signature `tas`:

### Step 1: Break Down the Signature

```
tas
│││
│└┴─ "as" = array of strings
└─── "t"  = uint64
```

So: `Resolve(uint64, string[])`

### Step 2: Get Parameter Names

```bash
busctl --system introspect \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit/Tid_1 \
  org.freedesktop.PackageKit.Transaction | grep -A2 "Resolve"
```

Output:
```
.Resolve                            method    tas       -            -
  .filter                           in        t         -            -
  .packages                         in        as        -            -
```

Now we know:
- First parameter (`t`): **filter** - A bitfield filter
- Second parameter (`as`): **packages** - Array of package names

### Step 3: Understand the Semantics

From the documentation or source:

```typescript
/**
 * Resolve package names to package IDs
 * 
 * @param filter - Bitfield of PackageKit filter flags
 *                 e.g., FILTER_INSTALLED, FILTER_NEWEST, etc.
 * @param packages - Array of package names to resolve
 *                   e.g., ["vim", "emacs"]
 */
Resolve(filter: uint64, packages: string[])
```

### Step 4: Find Valid Values

For the `filter` parameter, check the documentation or enum definitions:

```typescript
// From PackageKit documentation
enum FilterFlags {
  NONE = 0,
  INSTALLED = 1 << 0,      // 1
  NOT_INSTALLED = 1 << 1,  // 2
  DEVELOPMENT = 1 << 2,    // 4
  GUI = 1 << 3,            // 8
  FREE = 1 << 4,           // 16
  NEWEST = 1 << 5,         // 32
  ARCH = 1 << 6,           // 64
}
```

So `Resolve(0, ["vim"])` means:
- `0` = No filter (all packages)
- `["vim"]` = Resolve the package named "vim"

And `Resolve(1, ["vim"])` means:
- `1` = FILTER_INSTALLED (only installed packages)
- `["vim"]` = Resolve "vim" if it's installed

## Common Signature Patterns

Here are typical patterns you'll see:

| Signature | Parameter Name | Typical Meaning |
|-----------|----------------|-----------------|
| `t` | `filter` | Bitfield filter flags |
| `t` | `flags` | Bitfield option flags |
| `t` | `transaction_flags` | Transaction control flags |
| `s` | `package_name` | Package name |
| `s` | `package_id` | Full package ID with version/arch |
| `as` | `package_ids` | Array of package IDs |
| `as` | `packages` | Array of package names |
| `o` | `object_path` | D-Bus object path |
| `a{sv}` | `options` | Dictionary of options |
| `a{sv}` | `properties` | Dictionary of properties |
| `b` | `force` | Boolean force flag |
| `u` | `timeout` | Timeout in seconds/milliseconds |

## Creating a Quick Reference Script

Here's a script to quickly inspect any D-Bus method:

```bash
#!/bin/bash
# dbus-method-info.sh - Show D-Bus method parameter names

if [ $# -lt 4 ]; then
  echo "Usage: $0 <bus-type> <service> <object-path> <interface> [method]"
  echo "Example: $0 system org.freedesktop.PackageKit /org/freedesktop/PackageKit org.freedesktop.PackageKit"
  exit 1
fi

BUS_TYPE=$1
SERVICE=$2
OBJECT_PATH=$3
INTERFACE=$4
METHOD=$5

if [ "$BUS_TYPE" = "system" ]; then
  BUS_FLAG="--system"
else
  BUS_FLAG="--user"
fi

if [ -z "$METHOD" ]; then
  # Show all methods in interface
  busctl $BUS_FLAG introspect "$SERVICE" "$OBJECT_PATH" "$INTERFACE" | \
    grep "method"
else
  # Show specific method details
  busctl $BUS_FLAG introspect "$SERVICE" "$OBJECT_PATH" "$INTERFACE" | \
    grep -A20 "^.$METHOD " | grep -E "^(\.|\s)"
fi
```

Usage:
```bash
chmod +x dbus-method-info.sh

# Show all methods
./dbus-method-info.sh system org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit/Tid_1 \
  org.freedesktop.PackageKit.Transaction

# Show specific method
./dbus-method-info.sh system org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit/Tid_1 \
  org.freedesktop.PackageKit.Transaction \
  Resolve
```

## Programmatic Access to Parameter Names

You can also parse introspection XML in your code:

```typescript
import * as dbus from "dbus-next";

async function getMethodInfo(
  serviceName: string,
  objectPath: string,
  interfaceName: string,
  methodName: string
) {
  const bus = dbus.systemBus();
  
  const obj = await bus.getProxyObject(serviceName, objectPath);
  const introspectable = obj.getInterface("org.freedesktop.DBus.Introspectable");
  
  const xml = await introspectable.Introspect();
  
  // Parse XML to extract method parameter names
  // (You'd use an XML parser here)
  console.log(xml);
  
  bus.disconnect();
}

// Usage
getMethodInfo(
  "org.freedesktop.PackageKit",
  "/org/freedesktop/PackageKit/Tid_1",
  "org.freedesktop.PackageKit.Transaction",
  "Resolve"
);
```

## Quick Reference: Common D-Bus Services

### PackageKit Transaction Methods

```typescript
// Resolve package names to IDs
Resolve(filter: uint64, packages: string[])

// Install packages by ID
InstallPackages(transaction_flags: uint64, package_ids: string[])

// Remove packages
RemovePackages(transaction_flags: uint64, package_ids: string[], allow_deps: boolean)

// Update packages
UpdatePackages(transaction_flags: uint64, package_ids: string[])

// Search by name
SearchNames(filter: uint64, search: string[])

// Search by files
SearchFiles(filter: uint64, search: string[])

// Install local files
InstallFiles(transaction_flags: uint64, full_paths: string[])

// Get updates
GetUpdates(filter: uint64)

// Refresh cache
RefreshCache(force: boolean)
```

### NetworkManager Methods

```typescript
// Activate connection
ActivateConnection(
  connection: object_path,
  device: object_path,
  specific_object: object_path
) -> active_connection: object_path

// Add and activate connection
AddAndActivateConnection(
  connection: a{sa{sv}},  // Connection settings
  device: object_path,
  specific_object: object_path
) -> (path: object_path, active_connection: object_path)

// Get devices
GetDevices() -> devices: array<object_path>
```

### systemd Methods

```typescript
// Start a unit
StartUnit(
  name: string,      // Unit name (e.g., "nginx.service")
  mode: string       // Mode: "replace", "fail", "isolate"
) -> job: object_path

// Stop a unit
StopUnit(
  name: string,
  mode: string
) -> job: object_path

// Reload daemon
Reload()
```

## Best Practices

1. **Always introspect first** when working with a new service
   ```bash
   busctl --system introspect SERVICE OBJECT_PATH
   ```

2. **Use D-Feet** for exploration - it's much easier than command-line

3. **Check official docs** before diving into source code

4. **Look for XML files** in `/usr/share/dbus-1/interfaces/`

5. **Create wrapper functions** with named parameters in your code:
   ```typescript
   // Instead of:
   await tx.Resolve(BigInt(0), ["vim"]);
   
   // Create:
   async function resolvePackage(name: string, onlyInstalled = false) {
     const filter = onlyInstalled ? FilterFlags.INSTALLED : 0;
     await tx.Resolve(BigInt(filter), [name]);
   }
   
   // Use:
   await resolvePackage("vim", true);
   ```

## TL;DR - Quick Answer

**To find what `t` means in `Resolve(tas)`:**

```bash
# Best method: Use busctl introspect
busctl --system introspect \
  org.freedesktop.PackageKit \
  /path/to/transaction \
  org.freedesktop.PackageKit.Transaction | grep -A3 Resolve
```

Output shows:
```
.Resolve        method    tas       -            -
  .filter       in        t         -            -    ← This is what 't' means!
  .packages     in        as        -            -    ← This is what 'as' means!
```

**Alternative: Use D-Feet GUI** - just launch it and click around. Much easier for exploration!

---

Hope this helps! The key insight is that D-Bus *can* provide semantic information through introspection XML, but you need to know how to access it. `busctl introspect` is your best friend. 🔍
