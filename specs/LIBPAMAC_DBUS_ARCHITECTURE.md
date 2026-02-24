# libpamac D-Bus Architecture Deep Dive

## Overview

libpamac uses an elegant **dual-path architecture** that automatically switches between direct ALPM access (when running as root) and D-Bus daemon communication (when running as non-root user). This enables:

1. **Security**: Normal users can't modify system packages without authorization
2. **Concurrency**: Multiple users can request package operations simultaneously
3. **Simplicity**: Client code doesn't need to know which path is being used

## The Dual-Path Architecture

### High-Level View

```
┌──────────────────────────────────────────────────────────┐
│            Transaction (User-Facing Class)               │
│  - Single API for all package operations                │
│  - Decides which path to use based on privileges         │
└───────────────────────┬──────────────────────────────────┘
                        │
                        │ if (geteuid() == 0)
                ┌───────┴────────┐
                │                │
         root?  ↓                ↓  non-root?
    ┌────────────────┐    ┌──────────────────────┐
    │ Interface      │    │ Interface            │
    │ Root           │    │ Daemon               │
    │                │    │                      │
    │ Calls ALPM     │    │ Proxy over D-Bus     │
    │ directly       │    │                      │
    └───┬────────────┘    └──────┬───────────────┘
        │                        │
        ↓                        ↓
    ┌─────────┐         ┌────────────────────┐
    │ AlpmUtils│        │ D-Bus System Bus   │
    │ (ALPM)  │         │ org.manjaro.pamac  │
    └─────────┘         │       .daemon      │
                        └─────────┬──────────┘
                                  │
                                  ↓
                        ┌────────────────────┐
                        │ Daemon Class       │
                        │ - Runs as root     │
                        │ - Uses Polkit      │
                        │ - Lockfile mutex   │
                        │ - Calls AlpmUtils  │
                        └────────────────────┘
```

### Code Implementation

**File: `src/transaction.vala` lines 88-98**

```vala
construct {
    config = database.config;
    context = database.context;
    alpm_utils = new AlpmUtils (config);
    
    // DUAL PATH DECISION HERE
    if (Posix.geteuid () == 0) {
        // we are root - direct access
        transaction_interface = new TransactionInterfaceRoot (alpm_utils, context);
    } else {
        // use dbus daemon - proxy access
        transaction_interface = new TransactionInterfaceDaemon (config);
    }
    // ... rest of initialization
}
```

**Key Insight**: The client code (Transaction class) has **no idea** which path is being used! Both interfaces implement the same `TransactionInterface`, so all methods work identically.

---

## Path 1: TransactionInterfaceRoot (Direct Access)

### When It's Used

- Process is running as `root` (UID 0)
- Example: Running `sudo pamac install firefox`
- Example: System scripts running with elevated privileges

### How It Works

**File: `src/transaction_interface_root.vala`**

```vala
internal class TransactionInterfaceRoot: Object, TransactionInterface {
    unowned AlpmUtils alpm_utils;
    
    public TransactionInterfaceRoot (AlpmUtils alpm_utils, MainContext context) {
        this.alpm_utils = alpm_utils;
        this.context = context;
    }
    
    public async bool get_authorization () {
        // we are root - no authorization needed!
        return true;
    }
    
    public async bool trans_run (...) {
        // Call ALPM directly
        bool success = yield wait_for_lock();
        if (success) {
            success = alpm_utils.trans_run("root", ...);
        }
        return success;
    }
}
```

**Characteristics:**

- ✅ **Direct ALPM access** - no D-Bus overhead
- ✅ **Lockfile handling** - waits for `/var/lib/pacman/db.lck` to be released
- ✅ **Synchronous** - operations block until complete
- ❌ **No multi-user support** - only one root process at a time

---

## Path 2: TransactionInterfaceDaemon (D-Bus Proxy)

### When It's Used

- Process is running as **normal user** (UID > 0)
- Example: Running `pamac install firefox` (without sudo)
- Example: GUI application like pamac-manager

### How It Works

#### Step 1: Connect to D-Bus Daemon

**File: `src/transaction_interface_daemon.vala` lines 52-60, 447-457**

```vala
public TransactionInterfaceDaemon (Config config) {
    try {
        connecting_system_daemon (config);
        connecting_dbus_signals ();
        sender = system_daemon.get_sender ();  // Get our unique bus name
    } catch (Error e) {
        warning ("failed to connect to dbus daemon: %s", e.message);
    }
}

void connecting_system_daemon (Config config) throws Error {
    if (system_daemon == null) {
        try {
            // Connect to D-Bus
            system_daemon = Bus.get_proxy_sync (
                BusType.SYSTEM,
                "org.manjaro.pamac.daemon",
                "/org/manjaro/pamac/daemon"
            );
            // Set environment variables
            system_daemon.set_environment_variables (config.environment_variables);
        } catch (Error e) {
            throw e;
        }
    }
}
```

#### Step 2: Fire-and-Forget + Completion Signal Pattern

**Every operation follows this pattern:**

1. Client calls `start_*` method on daemon (fire-and-forget)
2. Client stores a callback using Vala's `async`/`yield` mechanism
3. Daemon emits `*_finished` signal when operation completes
4. Client's signal handler invokes the stored callback
5. Client's `async` method resumes with the result

**Example: Installing Packages**

```vala
// FILE: transaction_interface_daemon.vala

// STEP 1: Client calls async method
public async bool trans_run (...) throws Error {
    trans_run_callback = trans_run.callback;  // Store callback
    try {
        // Fire-and-forget: tell daemon to start
        system_daemon.start_trans_run (
            sysupgrade, enable_downgrade, simple_install,
            keep_built_pkgs, trans_flags, to_install.data,
            to_remove.data, to_load_local.data, to_load_remote.data,
            to_install_as_dep.data, ignorepkgs.data, overwrite_files.data
        );
        yield;  // SUSPEND HERE until callback is invoked
        return trans_run_success;  // Return result
    } catch (Error e) {
        throw e;
    }
}

// STEP 2: Signal handler receives completion
void on_trans_run_finished (string sender, bool success) {
    if (sender == this.sender) {  // Filter by sender!
        trans_run_success = success;
        trans_run_callback ();  // Resume the async method
    }
}
```

**Why This Pattern?**

- D-Bus methods are **asynchronous by nature**
- Vala's `async`/`yield` makes it **look synchronous** to the caller
- `SourceFunc` callbacks bridge D-Bus signals to Vala async

---

## The Daemon (Server Side)

### D-Bus Service Information

- **Bus Name**: `org.manjaro.pamac.daemon`
- **Object Path**: `/org/manjaro/pamac/daemon`
- **Interface**: `org.manjaro.pamac.daemon`
- **Configuration**: `/usr/share/dbus-1/system.d/org.manjaro.pamac.daemon.conf`

### Key Components

#### 1. Polkit Authorization

**File: `src/daemon.vala` lines 222-240**

```vala
async bool check_authorization (BusName sender) {
    bool authorized = false;
    try {
        Polkit.Authority authority = yield Polkit.Authority.get_async ();
        Polkit.Subject subject = new Polkit.SystemBusName (sender);
        
        // Check authorization for "org.manjaro.pamac.commit"
        var result = yield authority.check_authorization (
            subject,
            "org.manjaro.pamac.commit",
            null,
            Polkit.CheckAuthorizationFlags.ALLOW_USER_INTERACTION
        );
        
        authorized = result.get_is_authorized ();
        if (!authorized) {
            emit_error (sender, _("Authentication failed"), {});
        }
    } catch (Error e) {
        emit_error (sender, _("Authentication failed"), {e.message});
    }
    return authorized;
}
```

**Polkit Action**: `org.manjaro.pamac.commit`
- Defined in: `/usr/share/polkit-1/actions/org.manjaro.pamac.policy`
- Allows: System modification (install/remove packages)
- Prompt: Password dialog shown to user

#### 2. Lockfile Mutex

**File: `src/daemon.vala` lines 79-93, 188-220**

```vala
construct {
    lockfile_cond = Cond ();
    lockfile_mutex = Mutex ();
    
    // If lockfile exists at startup, wait for it
    if (alpm_utils.lockfile.query_exists ()) {
        try {
            new Thread<int>.try ("set_extern_lock", set_extern_lock);
        } catch (Error e) {
            warning (e.message);
        }
    }
    
    // Monitor lockfile for changes
    try {
        lockfile_monitor = alpm_utils.lockfile.monitor (FileMonitorFlags.NONE, null);
        lockfile_monitor.changed.connect (check_extern_lock);
    } catch (Error e) {
        warning (e.message);
    }
}

// Wait for external lock to be released
int set_extern_lock () {
    if (lockfile_mutex.trylock ()) {
        try {
            var tmp_loop = new MainLoop ();
            var unlock_monitor = alpm_utils.lockfile.monitor (FileMonitorFlags.NONE, null);
            unlock_monitor.changed.connect ((src, dest, event_type) => {
                if (event_type == FileMonitorEvent.DELETED) {
                    lockfile_mutex.unlock ();
                    tmp_loop.quit ();
                }
            });
            // Security check that lockfile still exists
            if (!alpm_utils.lockfile.query_exists ()) {
                lockfile_mutex.unlock ();
                return 0;
            }
            tmp_loop.run ();  // Block until lockfile deleted
        } catch (Error e) {
            warning (e.message);
        }
    }
    return 0;
}
```

**Why Lockfile Mutex?**

- ALPM uses `/var/lib/pacman/db.lck` to ensure only **one** pacman operation runs at a time
- Multiple clients might call the daemon simultaneously
- Mutex ensures daemon operations are **serialized**
- If external pacman process holds lock, daemon **waits** instead of failing

#### 3. Sender-Based Signal Multiplexing

**The Critical Problem:**

Multiple clients (e.g., User A and User B) might both be installing packages simultaneously. The daemon needs to:

1. Accept requests from both clients
2. Process them one at a time (due to ALPM lockfile)
3. Send progress signals **only to the correct client**

**The Solution: Sender Filtering**

Every signal includes the **sender** parameter (the D-Bus unique bus name of the client):

**File: `src/daemon_interface.vala` lines 54-61**

```vala
// All signals carry the sender!
public signal void emit_action (string sender, string action);
public signal void emit_action_progress (string sender, string action, string status, double progress);
public signal void emit_download_progress (string sender, string action, string status, double progress);
public signal void emit_error (string sender, string message, string[] details);
public signal void trans_run_finished (string sender, bool success);
// ... etc
```

**Client-side filtering:**

**File: `src/transaction_interface_daemon.vala` lines 371-415**

```vala
void on_emit_action (string sender, string action) {
    if (sender == this.sender) {  // Only process OUR signals!
        emit_action (action);
    }
}

void on_emit_action_progress (string sender, string action, string status, double progress) {
    if (sender == this.sender) {
        emit_action_progress (action, status, progress);
    }
}

void on_trans_run_finished (string sender, bool success) {
    if (sender != this.sender) {
        return;  // Ignore signals for other clients
    }
    trans_run_success = success;
    trans_run_callback ();  // Resume our async method
}
```

**How It Works:**

1. Client A connects → gets sender `:1.42`
2. Client B connects → gets sender `:1.43`
3. Daemon emits `emit_action(":1.42", "Installing firefox...")`
4. Client A receives signal, checks `":1.42" == this.sender` → **processes it**
5. Client B receives signal, checks `":1.43" == ":1.42"` → **ignores it**

**Sender Identification:**

```vala
// Client stores its sender at connection time
public TransactionInterfaceDaemon (Config config) {
    connecting_system_daemon (config);
    connecting_dbus_signals ();
    sender = system_daemon.get_sender ();  // Get unique bus name like ":1.42"
}
```

---

## Complete Transaction Flow Example

### Scenario: User installs Firefox (non-root)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User runs: pamac install firefox                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. Transaction.trans_run() checks geteuid() != 0               │
│    → Uses TransactionInterfaceDaemon                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. TransactionInterfaceDaemon connects to D-Bus                │
│    - Bus: system                                                │
│    - Name: org.manjaro.pamac.daemon                             │
│    - Object: /org/manjaro/pamac/daemon                          │
│    - Sender: :1.42 (unique bus name)                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. Client calls system_daemon.start_get_authorization()        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. Daemon checks Polkit authorization                          │
│    - Action: org.manjaro.pamac.commit                           │
│    - Subject: BusName(:1.42)                                    │
│    - Shows password prompt to user                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. User enters password → Polkit authorizes                    │
│    Daemon emits: get_authorization_finished(":1.42", true)     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 7. Client checks sender == ":1.42" → Resumes async method     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 8. Client calls system_daemon.start_trans_run(["firefox"])    │
│    - Stores callback: trans_run_callback = trans_run.callback  │
│    - Yields (suspends) waiting for completion                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 9. Daemon locks lockfile_mutex                                 │
│    - If /var/lib/pacman/db.lck exists → WAIT                   │
│    - When available → acquire lock                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 10. Daemon spawns thread, calls AlpmUtils.trans_run()         │
│     - Downloads firefox package                                 │
│     - Emits: emit_download_progress(":1.42", "firefox", 45%)   │
│     - Installs firefox                                          │
│     - Emits: emit_action(":1.42", "Installing firefox...")     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 11. Client receives signals, filters by sender                │
│     - emit_download_progress(":1.42", ...) → ACCEPT            │
│     - Updates progress bar in UI                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 12. Transaction completes                                      │
│     Daemon emits: trans_run_finished(":1.42", true)            │
│     Daemon unlocks: lockfile_mutex.unlock()                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 13. Client's on_trans_run_finished() handler triggered        │
│     - Checks sender == ":1.42" → MATCH                         │
│     - Stores result: trans_run_success = true                   │
│     - Invokes callback: trans_run_callback()                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 14. Client's async trans_run() resumes from yield             │
│     - Returns: trans_run_success (true)                         │
│     - User sees: "Firefox installed successfully!"              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Design Patterns & Takeaways

### 1. **Privilege-Based Routing**

```vala
if (Posix.geteuid () == 0) {
    // Direct access
} else {
    // D-Bus proxy
}
```

**Benefit**: One codebase supports both root and non-root execution transparently.

### 2. **Fire-and-Forget + Completion Signal**

```vala
// Start operation (non-blocking)
daemon.start_operation(params);

// Signal when done
signal operation_finished(string sender, result);
```

**Benefit**: D-Bus methods return immediately, long operations don't block.

### 3. **Sender-Based Multiplexing**

```vala
void on_signal(string sender, data) {
    if (sender == this.sender) {
        // Process only OUR signals
    }
}
```

**Benefit**: Multiple clients can use the same daemon simultaneously without interference.

### 4. **Vala Async/Yield Bridge**

```vala
public async bool operation() {
    callback_storage = operation.callback;
    daemon.start_operation();
    yield;  // Suspend until callback invoked
    return result;
}
```

**Benefit**: Asynchronous D-Bus calls appear synchronous to the caller.

### 5. **Lockfile Mutex for Serialization**

```vala
lockfile_mutex.lock();
try {
    alpm_utils.trans_run(...);
} finally {
    lockfile_mutex.unlock();
}
```

**Benefit**: Only one ALPM transaction at a time, but multiple clients can queue operations.

---

## Comparison: libpamac vs PackageKit

| Feature | libpamac | PackageKit |
|---------|----------|------------|
| **Transaction Model** | Single daemon, sender filtering | Transaction objects at dynamic paths |
| **Concurrency** | Lockfile mutex + sender filter | One transaction per client |
| **Authorization** | Polkit (org.manjaro.pamac.commit) | Polkit (org.freedesktop.packagekit.*) |
| **Async Pattern** | Fire-and-forget + completion signal | Same pattern |
| **Direct Root Access** | Yes (dual-path) | No (always uses daemon) |
| **Signal Filtering** | Sender-based | Path-based (one transaction = one path) |

**PackageKit Approach:**

```
Client A → CreateTransaction() → /org/freedesktop/PackageKit/1234
Client B → CreateTransaction() → /org/freedesktop/PackageKit/1235

Client A listens to signals from /1234 only
Client B listens to signals from /1235 only
```

**libpamac Approach:**

```
Client A → Daemon (sender :1.42)
Client B → Daemon (sender :1.43)

Daemon emits all signals with sender parameter
Client A filters: sender == ":1.42"
Client B filters: sender == ":1.43"
```

---

## Applying This to Your Project

### Option 1: PackageKit-Style (Recommended for Multiple Backends)

```typescript
// Manager creates transaction objects
const txPath = await manager.CreateTransaction();
const tx = bus.getProxyObject("org.example", txPath);

// Each client gets its own transaction object
// Signals are path-isolated automatically
```

**Pros:**
- Clean separation per client
- No manual sender filtering needed
- Easier to reason about

**Cons:**
- More complex daemon logic (dynamic object creation)
- Objects need cleanup after completion

### Option 2: libpamac-Style (Good for Single Backend)

```typescript
// All clients use single daemon
const daemon = bus.getProxyObject("org.example", "/daemon");

// Daemon emits signals with sender
daemon.on('progress', (sender, progress) => {
    if (sender === mySender) {
        updateUI(progress);
    }
});
```

**Pros:**
- Simpler daemon implementation
- Good for single-threaded backends (like ALPM)

**Cons:**
- Every client receives all signals (network overhead)
- Manual sender filtering required

### Recommendation for Your Use Case

Since you want to support **multiple backends** (ALPM, Flatpak, Snap):

1. Use **PackageKit-style transaction objects**
2. Each backend (ALPM/Flatpak/Snap) can run concurrently
3. No need for sender filtering
4. Clean API: `createTransaction()` → work on transaction → transaction auto-destructs

---

## References

### libpamac Source Files

- **`src/transaction.vala`** - Main Transaction class with dual-path logic
- **`src/transaction_interface_root.vala`** - Direct ALPM access (root)
- **`src/transaction_interface_daemon.vala`** - D-Bus proxy (non-root)
- **`src/daemon_interface.vala`** - D-Bus interface definition
- **`src/daemon.vala`** - Daemon implementation (server side)

### Key Concepts

- **D-Bus Sender**: Unique bus name like `:1.42` identifying each client
- **Polkit**: Linux authorization framework for privileged operations
- **ALPM Lockfile**: `/var/lib/pacman/db.lck` ensures single pacman instance
- **Vala async/yield**: Coroutines that make async code look synchronous
- **GObject Introspection**: Automatic language bindings for C libraries

### See Also

- [D-Bus Tutorial](https://dbus.freedesktop.org/doc/dbus-tutorial.html)
- [Polkit Documentation](https://www.freedesktop.org/software/polkit/docs/latest/)
- [Vala Async Tutorial](https://wiki.gnome.org/Projects/Vala/Tutorial#Asynchronous_Methods)
- [PackageKit D-Bus API](https://www.freedesktop.org/software/PackageKit/gtk-doc/index.html)
