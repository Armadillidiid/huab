# PackageKit Backends Guide

## Understanding PackageKit Backends

### What is a Backend?

PackageKit is a **unified frontend** that talks to different package management systems (backends) through a common D-Bus API. Think of it as a universal remote control for different package managers.

```
Your Application
       ↓
   PackageKit (D-Bus API)
       ↓
   Backend Selector
       ↓
   ┌────────┬──────────┬─────────┬──────────┐
   │  APT   │  DNF/YUM │  ALPM   │ Flatpak  │
   └────────┴──────────┴─────────┴──────────┘
```

### Current Architecture (Important!)

**PackageKit can only use ONE backend at a time** for its main D-Bus interface. This is by design.

Your current backend is: **ALPM** (Arch Linux Package Manager)

## The Flatpak/Snap Problem

Here's the issue: **Flatpak and Snap are NOT PackageKit backends anymore.**

### Historical Context

- **Old approach** (PackageKit < 1.0): Flatpak/Snap had PackageKit backends
- **Current approach**: Flatpak and Snap have their own D-Bus APIs

PackageKit dropped Flatpak/Snap backends because:
1. They have their own excellent D-Bus APIs
2. PackageKit's single-backend limitation was too restrictive
3. Direct integration is more powerful

### The Solution: Use Native D-Bus APIs

Instead of trying to use PackageKit for Flatpak/Snap, **use their native D-Bus APIs directly**:

```
Your Application
       ↓
┌──────────────┬────────────────┬───────────────┐
│  PackageKit  │  Flatpak API   │   Snap API    │
│   (ALPM)     │   (Flatpak)    │   (snapd)     │
└──────────────┴────────────────┴───────────────┘
```

## Available Backends

### Check Current Backend

```bash
# Get backend name
busctl --system get-property \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit \
  BackendName

# Get backend description
busctl --system get-property \
  org.freedesktop.PackageKit \
  /org/freedesktop/PackageKit \
  org.freedesktop.PackageKit \
  BackendDescription
```

### Check Available Backends

```bash
# List installed backend libraries
ls /usr/lib/packagekit-backend/

# Or on some systems
ls /usr/lib/*/packagekit-backend/
```

Common backends:
- `libpk_backend_alpm.so` - Arch Linux (pacman)
- `libpk_backend_apt.so` - Debian/Ubuntu (apt)
- `libpk_backend_dnf.so` - Fedora/RHEL (dnf)
- `libpk_backend_zypp.so` - openSUSE (zypper)
- `libpk_backend_dummy.so` - Testing/development

### Change Backend

Edit `/etc/PackageKit/PackageKit.conf`:

```ini
[Daemon]

# Set backend (only ONE can be active)
DefaultBackend=alpm

# Or try in order
# DefaultBackend=apt,alpm
```

Then restart PackageKit:
```bash
sudo systemctl restart packagekit
```

**Important:** You can only have ONE backend active at a time through PackageKit!

## Using Flatpak Directly (Recommended)

Flatpak has its own excellent D-Bus API that's more powerful than going through PackageKit.

### Flatpak D-Bus Interface

**Service Name:** `org.freedesktop.Flatpak`  
**System Object:** `/org/freedesktop/Flatpak/System`  
**User Object:** `/org/freedesktop/Flatpak/User`

### Key Flatpak Methods

```typescript
interface FlatpakInterface {
  // List installed apps
  ListInstalledRefs: (arch: string, branch: string) => Promise<string[]>;
  
  // Install application
  InstallRef: (
    flags: number,
    remote: string,      // e.g., "flathub"
    ref: string,         // e.g., "app/org.mozilla.firefox/x86_64/stable"
    options: object
  ) => Promise<void>;
  
  // Update application
  UpdateRef: (flags: number, ref: string, options: object) => Promise<void>;
  
  // Uninstall application
  UninstallRef: (flags: number, ref: string, options: object) => Promise<void>;
  
  // Search (through AppStream)
  // Note: Search is typically done via AppStream, not Flatpak API directly
}
```

### Flatpak Example: List Installed Apps

```bash
# Using busctl
busctl --user call \
  org.freedesktop.Flatpak \
  /org/freedesktop/Flatpak/User \
  org.freedesktop.Flatpak \
  ListInstalledRefs ss "" ""
```

### Flatpak Example: Install App

```bash
# Install Firefox from Flathub
busctl --user call \
  org.freedesktop.Flatpak \
  /org/freedesktop/Flatpak/User \
  org.freedesktop.Flatpak \
  InstallRef usssa{sv} \
  0 \
  "flathub" \
  "app/org.mozilla.firefox/x86_64/stable" \
  0
```

### Flatpak TypeScript Example

```typescript
import * as dbus from "dbus-next";

interface FlatpakUserInterface {
  ListInstalledRefs: (arch: string, branch: string) => Promise<string[]>;
  InstallRef: (
    flags: number,
    remote: string,
    ref: string,
    options: Record<string, unknown>
  ) => Promise<void>;
}

async function listFlatpakApps() {
  const bus = dbus.sessionBus();
  
  const obj = await bus.getProxyObject(
    "org.freedesktop.Flatpak",
    "/org/freedesktop/Flatpak/User"
  );
  
  const flatpak = obj.getInterface(
    "org.freedesktop.Flatpak"
  ) as unknown as FlatpakUserInterface;
  
  // List all installed apps (empty strings = all architectures/branches)
  const refs = await flatpak.ListInstalledRefs("", "");
  
  console.log("Installed Flatpak apps:");
  refs.forEach(ref => {
    console.log(`  ${ref}`);
  });
  
  bus.disconnect();
}

async function installFlatpakApp(appId: string) {
  const bus = dbus.sessionBus();
  
  const obj = await bus.getProxyObject(
    "org.freedesktop.Flatpak",
    "/org/freedesktop/Flatpak/User"
  );
  
  const flatpak = obj.getInterface(
    "org.freedesktop.Flatpak"
  ) as unknown as FlatpakUserInterface;
  
  // Install from Flathub
  const ref = `app/${appId}/x86_64/stable`;
  
  console.log(`Installing ${ref}...`);
  await flatpak.InstallRef(0, "flathub", ref, {});
  
  console.log("Installation complete!");
  bus.disconnect();
}

// Usage
listFlatpakApps();
installFlatpakApp("org.mozilla.firefox");
```

## Using Snap Directly

Snap uses **snapd** which has its own HTTP REST API (not D-Bus by default).

### Snap Architecture

Snap uses a **socket-based HTTP API** instead of D-Bus:

```
Your Application
       ↓
   HTTP Client
       ↓
/run/snapd.socket
       ↓
    snapd
```

### Snap API Endpoint

**Socket:** `/run/snapd.socket`  
**Protocol:** HTTP over Unix socket  
**API Docs:** https://snapcraft.io/docs/snapd-api

### Snap Example: List Installed

```bash
# Using curl with Unix socket
curl --unix-socket /run/snapd.socket \
  http://localhost/v2/snaps
```

### Snap Example: Install

```bash
curl --unix-socket /run/snapd.socket \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"action":"install","name":"firefox"}' \
  http://localhost/v2/snaps/firefox
```

### Snap TypeScript Example

```typescript
import http from "http";

async function listSnaps() {
  return new Promise((resolve, reject) => {
    const options = {
      socketPath: "/run/snapd.socket",
      path: "/v2/snaps",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let data = "";
      
      res.on("data", (chunk) => {
        data += chunk;
      });
      
      res.on("end", () => {
        const result = JSON.parse(data);
        console.log("Installed snaps:");
        result.result.forEach((snap: any) => {
          console.log(`  ${snap.name} (${snap.version})`);
        });
        resolve(result.result);
      });
    });

    req.on("error", reject);
    req.end();
  });
}

async function installSnap(name: string) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      action: "install",
      name: name,
    });

    const options = {
      socketPath: "/run/snapd.socket",
      path: `/v2/snaps/${name}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      
      res.on("data", (chunk) => {
        data += chunk;
      });
      
      res.on("end", () => {
        const result = JSON.parse(data);
        console.log(`Install initiated: ${result.change}`);
        resolve(result);
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// Usage
listSnaps();
installSnap("firefox");
```

## Unified Package Manager Abstraction

Here's how to create a unified interface for all package sources:

```typescript
// unified-package-manager.ts
import * as dbus from "dbus-next";
import http from "http";

enum PackageSource {
  System = "system",    // PackageKit (ALPM/APT/DNF)
  Flatpak = "flatpak",
  Snap = "snap",
}

interface Package {
  id: string;
  name: string;
  version: string;
  source: PackageSource;
  installed: boolean;
  summary?: string;
}

class UnifiedPackageManager {
  // Search across all sources
  async search(query: string): Promise<Package[]> {
    const results = await Promise.all([
      this.searchSystem(query),
      this.searchFlatpak(query),
      this.searchSnap(query),
    ]);
    
    return results.flat();
  }
  
  // Install from appropriate source
  async install(pkg: Package): Promise<void> {
    switch (pkg.source) {
      case PackageSource.System:
        return this.installSystem(pkg);
      case PackageSource.Flatpak:
        return this.installFlatpak(pkg);
      case PackageSource.Snap:
        return this.installSnap(pkg);
    }
  }
  
  // List all installed packages
  async listInstalled(): Promise<Package[]> {
    const results = await Promise.all([
      this.listSystemPackages(),
      this.listFlatpakPackages(),
      this.listSnapPackages(),
    ]);
    
    return results.flat();
  }
  
  // --- System (PackageKit) ---
  
  private async searchSystem(query: string): Promise<Package[]> {
    // Use PackageKit transaction
    const bus = dbus.systemBus();
    const tx = await this.createPackageKitTransaction(bus);
    
    const packages: Package[] = [];
    
    tx.on("Package", (status: string, pkgId: string, summary: string) => {
      const [name, version] = pkgId.split(";");
      if (name && version) {
        packages.push({
          id: pkgId,
          name,
          version,
          source: PackageSource.System,
          installed: status === "installed",
          summary,
        });
      }
    });
    
    await tx.SearchNames(BigInt(0), [query]);
    
    // Wait for results
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    bus.disconnect();
    return packages;
  }
  
  // --- Flatpak ---
  
  private async searchFlatpak(query: string): Promise<Package[]> {
    // Flatpak search is typically done through AppStream
    // This is a simplified example
    const bus = dbus.sessionBus();
    
    const obj = await bus.getProxyObject(
      "org.freedesktop.Flatpak",
      "/org/freedesktop/Flatpak/User"
    );
    
    const flatpak = obj.getInterface("org.freedesktop.Flatpak");
    
    // Get installed refs
    const refs = await (flatpak as any).ListInstalledRefs("", "");
    
    const packages: Package[] = refs
      .filter((ref: string) => ref.toLowerCase().includes(query.toLowerCase()))
      .map((ref: string) => {
        const parts = ref.split("/");
        return {
          id: ref,
          name: parts[1] || ref,
          version: parts[3] || "unknown",
          source: PackageSource.Flatpak,
          installed: true,
        };
      });
    
    bus.disconnect();
    return packages;
  }
  
  // --- Snap ---
  
  private async searchSnap(query: string): Promise<Package[]> {
    return new Promise((resolve, reject) => {
      const options = {
        socketPath: "/run/snapd.socket",
        path: `/v2/find?q=${encodeURIComponent(query)}`,
        method: "GET",
      };

      const req = http.request(options, (res) => {
        let data = "";
        
        res.on("data", (chunk) => {
          data += chunk;
        });
        
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            const packages: Package[] = result.result.map((snap: any) => ({
              id: snap.name,
              name: snap.name,
              version: snap.version,
              source: PackageSource.Snap,
              installed: false, // Search returns available snaps
              summary: snap.summary,
            }));
            resolve(packages);
          } catch (err) {
            resolve([]);
          }
        });
      });

      req.on("error", () => resolve([]));
      req.end();
    });
  }
  
  // Helper: Create PackageKit transaction
  private async createPackageKitTransaction(bus: dbus.MessageBus) {
    const managerObj = await bus.getProxyObject(
      "org.freedesktop.PackageKit",
      "/org/freedesktop/PackageKit"
    );
    const manager = managerObj.getInterface("org.freedesktop.PackageKit");
    
    const txPath = await (manager as any).CreateTransaction();
    
    const txObj = await bus.getProxyObject("org.freedesktop.PackageKit", txPath);
    return txObj.getInterface("org.freedesktop.PackageKit.Transaction");
  }
  
  // Implement install methods similarly...
  private async installSystem(pkg: Package): Promise<void> {
    // Use PackageKit InstallPackages
  }
  
  private async installFlatpak(pkg: Package): Promise<void> {
    // Use Flatpak InstallRef
  }
  
  private async installSnap(pkg: Package): Promise<void> {
    // Use snapd HTTP API
  }
  
  private async listSystemPackages(): Promise<Package[]> {
    // Similar to searchSystem but use GetPackages
    return [];
  }
  
  private async listFlatpakPackages(): Promise<Package[]> {
    // Use ListInstalledRefs
    return [];
  }
  
  private async listSnapPackages(): Promise<Package[]> {
    // Use snapd /v2/snaps
    return [];
  }
}

// Usage
const pkgManager = new UnifiedPackageManager();

// Search across ALL sources
const results = await pkgManager.search("firefox");
console.log("Found packages:");
results.forEach(pkg => {
  console.log(`  [${pkg.source}] ${pkg.name} - ${pkg.summary}`);
});

// Install from appropriate source
await pkgManager.install(results[0]!);
```

## Summary: Your Questions Answered

### Q: How do I set backends?

**A:** Edit `/etc/PackageKit/PackageKit.conf`:
```ini
DefaultBackend=alpm
```

But **you can only have ONE backend active** at a time.

### Q: Can I use Flatpak/Snap through PackageKit?

**A:** No. Flatpak and Snap are no longer PackageKit backends. Use their native APIs:
- **Flatpak:** D-Bus API at `org.freedesktop.Flatpak`
- **Snap:** HTTP API via `/run/snapd.socket`

### Q: If I search, will it search only the selected backend?

**A:** Yes, PackageKit only searches the active backend (ALPM in your case).

### Q: Can I have multiple backends enabled?

**A:** No, PackageKit only uses ONE backend at a time. This is by design.

### Q: How do I search across all package sources?

**A:** Create a unified interface that queries:
1. **PackageKit** (for system packages: ALPM/APT/DNF)
2. **Flatpak D-Bus API** (for Flatpak apps)
3. **Snap HTTP API** (for Snap apps)

## Recommended Architecture

```
┌─────────────────────────────────────┐
│     Your Application                │
└─────────────────────────────────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
   ┌────────┐ ┌───────┐ ┌──────┐
   │PackageKit│ │Flatpak│ │ Snap │
   │  D-Bus  │ │ D-Bus │ │ HTTP │
   └────────┘ └───────┘ └──────┘
        │        │        │
        ▼        ▼        ▼
   ┌────────┐ ┌───────┐ ┌──────┐
   │  ALPM  │ │Flatpak│ │snapd │
   └────────┘ └───────┘ └──────┘
```

This gives you **full coverage** of all package sources on the system!

## Further Resources

- [Flatpak D-Bus API](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html)
- [Snap HTTP API](https://snapcraft.io/docs/snapd-api)
- [PackageKit Backends](https://www.freedesktop.org/software/PackageKit/pk-faq.html#backends)

---

**TL;DR:** PackageKit can only use ONE backend. For Flatpak/Snap, use their native APIs directly. Create a unified abstraction layer in your app to search/install from all sources.
