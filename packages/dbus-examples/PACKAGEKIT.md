# PackageKit D-Bus Reference

This guide shows how to use PackageKit's D-Bus interface to manage packages in your application.

## Quick Answer: Current PackageKit Methods

The old convenience methods (`InstallPackageName`, `InstallProvideFile`, etc.) were deprecated and removed. PackageKit now uses the **Transaction pattern** (like Example 7!).

### Modern PackageKit Workflow

1. **Create a Transaction** via the Manager
2. **Call methods on the Transaction** object
3. **Monitor signals** for progress
4. **Transaction auto-completes** and gets destroyed

## PackageKit Architecture

```
org.freedesktop.PackageKit              (Main service)
├── /org/freedesktop/PackageKit         (Manager object)
└── /XX/YY/transactions/ZZZ             (Transaction objects - created dynamically)
```

## Current PackageKit D-Bus Interface

### Manager Object

**Service Name:** `org.freedesktop.PackageKit`  
**Object Path:** `/org/freedesktop/PackageKit`  
**Interface:** `org.freedesktop.PackageKit`

#### Main Method: CreateTransaction

```bash
# Create a new transaction
busctl --system call \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit \
  CreateTransaction

# Returns: object path like "/274/dbus_path/transactions/1"
```

This is similar to Example 7 - you get a transaction object path back.

## Transaction Methods

Once you have a transaction path, you can call these methods:

### Common Transaction Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `InstallPackages` | `tas` | Install packages by package IDs |
| `RemovePackages` | `tasb` | Remove packages |
| `UpdatePackages` | `tas` | Update packages |
| `SearchNames` | `tas` | Search for packages by name |
| `SearchFiles` | `tas` | Search for packages providing files |
| `Resolve` | `tas` | Resolve package names to IDs |
| `GetDetails` | `as` | Get package details |
| `GetUpdates` | `t` | Get available updates |
| `RefreshCache` | `b` | Refresh package cache |

### Transaction Signals

| Signal | Parameters | Description |
|--------|------------|-------------|
| `Package` | `uss` | Package info: status, package_id, summary |
| `ItemProgress` | `suu` | Progress: package_id, status, percentage |
| `Changed` | - | Transaction property changed |
| `Finished` | `us` | Transaction completed: exit code, runtime |
| `ErrorCode` | `us` | Error occurred: code, details |

## Step-by-Step: Install a Package

### Using busctl

```bash
# Step 1: Create a transaction
TX=$(busctl --system call \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit \
  CreateTransaction | cut -d '"' -f 2)

echo "Transaction: $TX"

# Step 2: Resolve package name to package ID
busctl --system call \
  org.freedesktop.PackageKit \
  "$TX" \
  org.freedesktop.PackageKit.Transaction \
  Resolve tas 0 1 "vim"

# Step 3: Monitor for the Package signal to get the package ID # (In a real script, you'd parse this output) busctl --system monitor --match "path='$TX'" &
# Step 4: Install the package (using the package ID from Step 2)
# Package IDs look like: "vim;2:8.2.3995-1ubuntu2.1;amd64;Ubuntu"
busctl --system call \
  org.freedesktop.PackageKit \
  "$TX" \
  org.freedesktop.PackageKit.Transaction \
  InstallPackages tas 0 1 "vim;2:8.2.3995-1ubuntu2.1;amd64;Ubuntu"
```

### Using dbus-send

```bash
# Step 1: Create transaction
dbus-send --system --print-reply \
  --dest=org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit.CreateTransaction

# Step 2: Install package
dbus-send --system --print-reply \
  --dest=org.freedesktop.PackageKit \
  /274/dbus_path/transactions/1 \
  org.freedesktop.PackageKit.Transaction.InstallPackages \
  uint64:0 array:string:"vim;2:8.2.3995-1ubuntu2.1;amd64;Ubuntu"
```

## Practical Example: Install Package by Name

Here's a complete working example in TypeScript:

```typescript
import * as dbus from "dbus-next";

// Type-safe interfaces
interface PackageKitManagerInterface {
  CreateTransaction: () => Promise<string>;
}

interface PackageKitTransactionInterface {
  Resolve: (filter: bigint, packages: string[]) => Promise<void>;
  InstallPackages: (transactionFlags: bigint, packageIds: string[]) => Promise<void>;
  on(event: "Package", callback: (status: string, packageId: string, summary: string) => void): void;
  on(event: "Finished", callback: (exitCode: number, runtime: number) => void): void;
  on(event: "ErrorCode", callback: (code: number, details: string) => void): void;
}

async function installPackageByName(packageName: string): Promise<void> {
  const bus = dbus.systemBus();
  
  // Get PackageKit manager
  const managerObj = await bus.getProxyObject(
    "org.freedesktop.PackageKit",
    "/org/freedesktop/PackageKit"
  );
  const manager = managerObj.getInterface(
    "org.freedesktop.PackageKit"
  ) as unknown as PackageKitManagerInterface;

  // Create a transaction
  const txPath = await manager.CreateTransaction();
  console.log(`Created transaction: ${txPath}`);

  // Get transaction interface
  const txObj = await bus.getProxyObject("org.freedesktop.PackageKit", txPath);
  const tx = txObj.getInterface(
    "org.freedesktop.PackageKit.Transaction"
  ) as unknown as PackageKitTransactionInterface;

  // Store package ID when found
  let packageId: string | null = null;

  // Listen for package resolution
  tx.on("Package", (status: string, pkgId: string, summary: string) => {
    console.log(`Found: ${pkgId} - ${summary}`);
    if (!packageId) {
      packageId = pkgId;
    }
  });

  // Listen for completion
  tx.on("Finished", (exitCode: number, runtime: number) => {
    console.log(`Transaction finished: exit=${exitCode}, runtime=${runtime}s`);
    if (exitCode === 1) {
      console.log("Success!");
    }
    bus.disconnect();
  });

  // Listen for errors
  tx.on("ErrorCode", (code: number, details: string) => {
    console.error(`Error ${code}: ${details}`);
  });

  // Step 1: Resolve package name to ID
  console.log(`Resolving package: ${packageName}...`);
  await tx.Resolve(BigInt(0), [packageName]);

  // Wait for package signal
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!packageId) {
    throw new Error("Package not found");
  }

  // Step 2: Install the package
  console.log(`Installing package: ${packageId}...`);
  await tx.InstallPackages(BigInt(0), [packageId]);
}

// Usage
installPackageByName("vim").catch(console.error);
```

## Common Use Cases

### 1. Install Package by Name

```typescript
async function installByName(name: string) {
  const tx = await createTransaction();
  
  // Resolve name to package ID
  const packageId = await resolvePackage(tx, name);
  
  // Install
  await tx.InstallPackages(BigInt(0), [packageId]);
}
```

### 2. Install Package Providing a File

```typescript
async function installFileProvider(filePath: string) {
  const tx = await createTransaction();
  
  // Search for package providing file
  await tx.SearchFiles(BigInt(0), [filePath]);
  
  // Get package ID from Package signal
  // Then install it
  await tx.InstallPackages(BigInt(0), [packageId]);
}
```

### 3. Install Local RPM/DEB File

```typescript
async function installLocalFile(filePath: string) {
  const tx = await createTransaction();
  
  // InstallFiles method
  await tx.InstallFiles(BigInt(0), [filePath]);
}
```

### 4. Get Available Updates

```typescript
async function getUpdates() {
  const tx = await createTransaction();
  
  const packages: string[] = [];
  
  tx.on("Package", (status, packageId, summary) => {
    packages.push(packageId);
  });
  
  await tx.GetUpdates(BigInt(0));
  
  return packages;
}
```

### 5. Update All Packages

```typescript
async function updateAll() {
  const tx = await createTransaction();
  
  // Get list of updates
  const updates = await getUpdates();
  
  // Update them
  await tx.UpdatePackages(BigInt(0), updates);
}
```

## Transaction Flags

The first parameter to many methods is a transaction flags bitfield:

```typescript
enum TransactionFlags {
  NONE = 0,
  ONLY_TRUSTED = 1 << 0,        // Only install trusted packages
  SIMULATE = 1 << 1,             // Just simulate, don't actually do it
  ONLY_DOWNLOAD = 1 << 2,        // Only download, don't install
  ALLOW_REINSTALL = 1 << 3,      // Allow reinstalling same version
  JUST_REINSTALL = 1 << 4,       // Only reinstall if already installed
  ALLOW_DOWNGRADE = 1 << 5,      // Allow downgrading
}

// Example: Only install trusted packages
await tx.InstallPackages(BigInt(TransactionFlags.ONLY_TRUSTED), [packageId]);

// Example: Simulate installation (dry run)
await tx.InstallPackages(BigInt(TransactionFlags.SIMULATE), [packageId]);
```

## Filter Flags

The filter parameter controls what packages to include:

```typescript
enum FilterFlags {
  NONE = 0,
  INSTALLED = 1 << 0,           // Only installed packages
  NOT_INSTALLED = 1 << 1,       // Only available packages
  DEVELOPMENT = 1 << 2,         // Development packages
  GUI = 1 << 3,                 // GUI packages
  FREE = 1 << 4,                // Free/libre packages
  NEWEST = 1 << 5,              // Newest versions only
  ARCH = 1 << 6,                // Native architecture only
}

// Example: Search only installed packages
await tx.SearchNames(BigInt(FilterFlags.INSTALLED), ["vim"]);

// Example: Search available (not installed) packages
await tx.SearchNames(BigInt(FilterFlags.NOT_INSTALLED), ["vim"]);
```

## Package Status Codes

When you receive the `Package` signal, the first parameter is a status string:

| Status | Description |
|--------|-------------|
| `installed` | Package is installed |
| `available` | Package is available for install |
| `installing` | Package is being installed |
| `removing` | Package is being removed |
| `updating` | Package is being updated |
| `downloading` | Package is being downloaded |

## Error Codes

Common error codes from the `ErrorCode` signal:

| Code | Enum Name | Description |
|------|-----------|-------------|
| 0 | `ERROR_CODE_OOM` | Out of memory |
| 1 | `ERROR_CODE_NO_NETWORK` | No network connection |
| 2 | `ERROR_CODE_NOT_SUPPORTED` | Operation not supported |
| 3 | `ERROR_CODE_INTERNAL_ERROR` | Internal error |
| 4 | `ERROR_CODE_GPG_FAILURE` | GPG signature verification failed |
| 5 | `ERROR_CODE_PACKAGE_ID_INVALID` | Invalid package ID |
| 6 | `ERROR_CODE_PACKAGE_NOT_INSTALLED` | Package not installed |
| 7 | `ERROR_CODE_PACKAGE_NOT_FOUND` | Package not found |
| 8 | `ERROR_CODE_PACKAGE_ALREADY_INSTALLED` | Package already installed |
| 9 | `ERROR_CODE_PACKAGE_DOWNLOAD_FAILED` | Package download failed |
| 10 | `ERROR_CODE_GROUP_NOT_FOUND` | Group not found |
| 11 | `ERROR_CODE_GROUP_LIST_INVALID` | Invalid group list |
| 12 | `ERROR_CODE_DEP_RESOLUTION_FAILED` | Dependency resolution failed |
| 13 | `ERROR_CODE_FILTER_INVALID` | Invalid filter |
| 14 | `ERROR_CODE_CREATE_THREAD_FAILED` | Failed to create thread |
| 15 | `ERROR_CODE_TRANSACTION_ERROR` | Transaction error |
| 16 | `ERROR_CODE_TRANSACTION_CANCELLED` | Transaction was cancelled |
| 17 | `ERROR_CODE_NO_CACHE` | No cache available |
| 18 | `ERROR_CODE_REPO_NOT_FOUND` | Repository not found |

## Checking PackageKit Availability

```bash
# Check if PackageKit is running
busctl --system status org.freedesktop.PackageKit

# Get PackageKit version
busctl --system get-property \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit \
  VersionMajor

busctl --system get-property \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit \
  VersionMinor
```

## Complete Working Example

Here's a full example you can run:

```typescript
#!/usr/bin/env bun
import * as dbus from "dbus-next";

interface PackageKitManagerInterface {
  CreateTransaction: () => Promise<string>;
}

interface PackageKitTransactionInterface {
  Resolve: (filter: bigint, packages: string[]) => Promise<void>;
  SearchNames: (filter: bigint, packages: string[]) => Promise<void>;
  on(event: "Package", callback: (status: string, packageId: string, summary: string) => void): void;
  on(event: "Finished", callback: (exitCode: number, runtime: number) => void): void;
  on(event: "ErrorCode", callback: (code: number, details: string) => void): void;
}

async function searchPackage(packageName: string) {
  const bus = dbus.systemBus();
  
  try {
    // Get PackageKit manager
    const managerObj = await bus.getProxyObject(
      "org.freedesktop.PackageKit",
      "/org/freedesktop/PackageKit"
    );
    const manager = managerObj.getInterface(
      "org.freedesktop.PackageKit"
    ) as unknown as PackageKitManagerInterface;

    // Create transaction
    const txPath = await manager.CreateTransaction();
    console.log(`Transaction: ${txPath}\n`);

    // Get transaction interface
    const txObj = await bus.getProxyObject("org.freedesktop.PackageKit", txPath);
    const tx = txObj.getInterface(
      "org.freedesktop.PackageKit.Transaction"
    ) as unknown as PackageKitTransactionInterface;

    // Listen for packages
    tx.on("Package", (status: string, packageId: string, summary: string) => {
      console.log(`[${status}] ${packageId}`);
      console.log(`  ${summary}\n`);
    });

    // Listen for completion
    tx.on("Finished", (exitCode: number, runtime: number) => {
      console.log(`\nSearch completed in ${runtime}s`);
      bus.disconnect();
      process.exit(0);
    });

    // Listen for errors
    tx.on("ErrorCode", (code: number, details: string) => {
      console.error(`Error ${code}: ${details}`);
      bus.disconnect();
      process.exit(1);
    });

    // Search for package
    console.log(`Searching for: ${packageName}...\n`);
    await tx.SearchNames(BigInt(0), [packageName]);

  } catch (err) {
    console.error("Error:", err);
    bus.disconnect();
    process.exit(1);
  }
}

// Usage
const packageName = process.argv[2] || "vim";
searchPackage(packageName);
```

Save as `packagekit-search.ts` and run:
```bash
bun run packagekit-search.ts vim
```

## Permission Requirements

PackageKit operations typically require PolicyKit authorization. Your application will automatically trigger the authentication dialog if needed.

To check what actions are available:
```bash
pkaction | grep packagekit
```

Common actions:
- `org.freedesktop.packagekit.package-install`
- `org.freedesktop.packagekit.package-remove`
- `org.freedesktop.packagekit.system-update`

## Summary: Old vs New Methods

### Old (Deprecated) Methods ❌
```
InstallPackageName("vim")
InstallProvideFile("/usr/bin/vim")
InstallLocalFile("/tmp/package.rpm")
```

### New (Current) Methods ✅
```
1. CreateTransaction() → get transaction path
2. Call method on transaction (Resolve, InstallPackages, etc.)
3. Monitor signals for progress
4. Transaction auto-completes
```

## Further Resources

- [PackageKit D-Bus Specification](https://www.freedesktop.org/software/PackageKit/gtk-doc/PackageKit-dbus-reference.html)
- [PackageKit FAQ](https://www.freedesktop.org/software/PackageKit/pk-faq.html)
- [PolicyKit for Authorization](https://www.freedesktop.org/software/polkit/docs/latest/)

---

**Key Takeaway:** PackageKit now uses the Manager/Transaction pattern (just like Example 7!), so you already understand how it works. Create a transaction, call methods on it, monitor signals for progress.
