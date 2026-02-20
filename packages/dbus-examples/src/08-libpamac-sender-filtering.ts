#!/usr/bin/env bun
/**
 * Example 8: libpamac-Style Single-Daemon Sender Filtering
 *
 * This example models the architecture used by libpamac (Manjaro's package manager).
 * It contrasts with Example 7 (PackageKit-style dynamic transaction objects).
 *
 * ─── The Core Pattern ────────────────────────────────────────────────────────
 *
 * libpamac uses a single, shared daemon at a fixed object path. Multiple clients
 * connect to it simultaneously. All signals are broadcast to every connected
 * client, but each signal carries a `sender` string (the caller's D-Bus unique
 * bus name such as ":1.42"). Each client filters incoming signals:
 *
 *   void on_emit_action(string sender, string action) {
 *     if (sender == this.sender) {   // ← THE KEY LINE
 *       emit_action(action);
 *     }
 *   }
 *
 * ─── Contrast with PackageKit/Example 7 ─────────────────────────────────────
 *
 *   PackageKit (Ex. 7)                libpamac (this example)
 *   ─────────────────────             ───────────────────────
 *   CreateTransaction() returns path  Single fixed object path
 *   Each client gets own path         All clients share one path
 *   Signals isolated by object path   Signals isolated by sender string
 *   No client-side filtering needed   Client must filter by sender
 *   Complex: dynamic object creation  Simple: one object, one mutex
 *
 * ─── Three Mechanisms Demonstrated ──────────────────────────────────────────
 *
 *   1. Sender identification   – client calls GetSender() to learn its unique
 *                                bus name, stores it, and uses it as a filter.
 *
 *   2. Fire-and-forget + completion signal
 *                              – every method is start_*(args) with no return
 *                                value; the daemon emits *_finished(sender, ok)
 *                                when done. The client bridges this to a regular
 *                                async/await using a stored resolve callback.
 *
 *   3. Lockfile mutex          – the daemon holds a mutex while executing ALPM
 *                                work, serialising concurrent requests; each
 *                                queued request waits and then runs in turn,
 *                                with progress signals tagged to the right sender.
 *
 * ─── Source References (libpamac) ────────────────────────────────────────────
 *   src/daemon_interface.vala           – D-Bus interface definition
 *   src/daemon.vala                     – Daemon (server) implementation
 *   src/transaction_interface_daemon.vala – Client proxy + sender filtering
 *   src/transaction.vala:88-98          – Dual-path root/non-root decision
 */

import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

// ─── D-Bus names ─────────────────────────────────────────────────────────────
const SERVICE_NAME = "org.example.pamac.daemon";
const OBJECT_PATH  = "/org/example/pamac/daemon";
const IFACE_NAME   = "org.example.pamac.daemon";

// ─── Types ────────────────────────────────────────────────────────────────────

// Callbacks used by DaemonProxyInterface.on() are typed as accepting any args
// because dbus-next delivers them as a flat argument list at runtime.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCallback = (...args: any[]) => void;

/** What the daemon exposes over D-Bus (matches daemon_interface.vala). */
interface DaemonProxyInterface {
  // Methods – sender is passed explicitly (simulates D-Bus BusName injection)
  GetSender:         (callerSender: string)                                    => Promise<string>;
  StartTransRun:     (sender: string, toInstall: string[], toRemove: string[]) => Promise<void>;
  StartTransRefresh: (sender: string, force: boolean)                          => Promise<void>;
  TransCancel:       ()                                                        => Promise<void>;

  // Signals: dbus-next calls .on(eventName, callback) for each signal
  on(event: string, cb: AnyCallback): void;
}

// ─── Daemon (server side) ─────────────────────────────────────────────────────

/**
 * Simulates org.manjaro.pamac.daemon from src/daemon.vala.
 *
 * Key design points mirrored from the real daemon:
 *  - `GetSender(BusName sender)` returns the caller's unique bus name.
 *  - Every `start_*` method fires-and-forgets: it spawns async work and
 *    immediately returns; completion is signalled via `*_finished(sender, ok)`.
 *  - A single mutex (`lockRunning`) serialises ALPM work across concurrent
 *    clients, exactly like `lockfile_mutex` in daemon.vala.
 *  - All progress/status signals carry `sender` as their first argument so
 *    every connected client receives them but can filter to their own.
 */
class PamacDaemon extends DBusInterface {
  /** Queue of pending work items (sender, resolver, work). */
  private queue: Array<{
    sender: string;
    resolve: (ok: boolean) => void;
    work: (sender: string) => Promise<boolean>;
  }> = [];
  private lockRunning = false;   // Mirrors lockfile_mutex in daemon.vala

  constructor() { super(IFACE_NAME); }

  // ── D-Bus method: returns caller's unique bus name ─────────────────────────
  //
  // In Vala: public string get_sender(BusName sender) throws Error { return sender; }
  // dbus-next does not expose BusName automatically, so we simulate it by
  // accepting the sender as an explicit string argument from our test harness.
  GetSender(callerSender: string): string {
    return callerSender;
  }

  // ── Signals ───────────────────────────────────────────────────────────────
  // Every signal has `sender` as its first parameter.
  // This mirrors daemon_interface.vala lines 54-85.

  EmitAction(sender: string, action: string): [string, string] {
    return [sender, action];
  }
  EmitDownloadProgress(sender: string, action: string, status: string, progress: number): [string, string, string, number] {
    return [sender, action, status, progress];
  }
  EmitError(sender: string, message: string, details: string[]): [string, string, string[]] {
    return [sender, message, details];
  }
  StartDownloading(sender: string): string { return sender; }
  StopDownloading(sender: string): string { return sender; }
  StartWaiting(sender: string): string { return sender; }
  StopWaiting(sender: string): string { return sender; }
  TransRunFinished(sender: string, success: boolean): [string, boolean] {
    return [sender, success];
  }
  TransRefreshFinished(sender: string, success: boolean): [string, boolean] {
    return [sender, success];
  }

  // ── Fire-and-forget methods ────────────────────────────────────────────────

  /**
   * Mirrors: public void start_trans_run(... BusName sender)
   *
   * Accepts the caller's sender as an explicit argument (since dbus-next does
   * not inject BusName automatically in a test environment). Enqueues the work
   * and returns immediately – the caller must listen for TransRunFinished.
   */
  StartTransRun(sender: string, toInstall: string[], toRemove: string[]): void {
    const packages = [...toInstall, ...toRemove];
    this.enqueue(sender, (s) => this.runTransaction(s, packages));
  }

  /** Mirrors: public void start_trans_refresh(bool force, BusName sender) */
  StartTransRefresh(sender: string, force: boolean): void {
    this.enqueue(sender, (s) => this.runRefresh(s, force));
  }

  /** Mirrors: public void trans_cancel() – cancels the running operation. */
  TransCancel(): void {
    // In a real daemon this would set a Cancellable. Here we just log.
    console.log(`[Daemon] TransCancel called`);
  }

  // ── Internal: mutex + queue ────────────────────────────────────────────────

  /**
   * Enqueues work behind the lockRunning mutex, then drains the queue.
   * Mirrors daemon.vala's pattern of locking lockfile_mutex before each
   * ALPM call and unlocking in the thread callback afterward.
   */
  private enqueue(
    sender: string,
    work: (sender: string) => Promise<boolean>,
  ): void {
    let resolve!: (ok: boolean) => void;
    new Promise<boolean>((res) => { resolve = res; });
    this.queue.push({ sender, resolve, work });
    this.drainQueue();
  }

  private async drainQueue(): Promise<void> {
    if (this.lockRunning || this.queue.length === 0) return;

    const item = this.queue.shift();
    if (!item) return;

    this.lockRunning = true;
    console.log(`[Daemon] Lock acquired for sender ${item.sender}`);

    // Notify sender it is now running (if it was waiting)
    try {
      const success = await item.work(item.sender);
      item.resolve(success);
    } catch (e) {
      item.resolve(false);
    }

    console.log(`[Daemon] Lock released for sender ${item.sender}`);
    this.lockRunning = false;

    // Continue with next queued item
    this.drainQueue();
  }

  // ── Simulated ALPM work ───────────────────────────────────────────────────

  private async runTransaction(sender: string, packages: string[]): Promise<boolean> {
    const steps = [
      { msg: "Refreshing package databases...", pct: 10 },
      { msg: `Downloading ${packages.join(", ")}...`,  pct: 40 },
      { msg: "Checking package integrity...",           pct: 60 },
      { msg: "Installing files...",                     pct: 80 },
      { msg: "Running post-install scripts...",         pct: 95 },
    ];

    // Signal: download starting
    this.StartDownloading(sender);

    for (const step of steps) {
      await sleep(500);
      // Broadcast action signal – ALL clients receive this
      this.EmitAction(sender, step.msg);
      this.EmitDownloadProgress(sender, step.msg, "running", step.pct);
    }

    this.StopDownloading(sender);
    await sleep(200);

    // Fire *_finished signal with sender so clients can filter
    this.TransRunFinished(sender, true);
    return true;
  }

  private async runRefresh(sender: string, force: boolean): Promise<boolean> {
    const label = force ? "force-refreshing" : "refreshing";
    this.EmitAction(sender, `Syncing package databases (${label})...`);
    await sleep(600);
    this.EmitAction(sender, "Database sync complete.");
    this.TransRefreshFinished(sender, true);
    return true;
  }
}

// Configure all D-Bus members
PamacDaemon.configureMembers({
  methods: {
    GetSender: {
      inSignature:  "s",   // caller passes its own sender for simulation purposes
      outSignature: "s",
    },
    StartTransRun: {
      inSignature:  "sass", // sender, toInstall[], toRemove[]
      outSignature: "",
    },
    StartTransRefresh: {
      inSignature:  "sb",   // sender, force
      outSignature: "",
    },
    TransCancel: {
      inSignature:  "",
      outSignature: "",
    },
  },
  signals: {
    EmitAction:           { signature: "ss"    },   // sender, action
    EmitDownloadProgress: { signature: "sssn"  },   // sender, action, status, progress
    EmitError:            { signature: "ssas"  },   // sender, message, details[]
    StartDownloading:     { signature: "s"     },   // sender
    StopDownloading:      { signature: "s"     },   // sender
    StartWaiting:         { signature: "s"     },   // sender
    StopWaiting:          { signature: "s"     },   // sender
    TransRunFinished:     { signature: "sb"    },   // sender, success
    TransRefreshFinished: { signature: "sb"    },   // sender, success
  },
});

// ─── Client proxy ─────────────────────────────────────────────────────────────

/**
 * Mirrors src/transaction_interface_daemon.vala.
 *
 * Three key mechanisms from the real code are reproduced here:
 *
 *  1. Sender identification (lines 52-60 of transaction_interface_daemon.vala)
 *       constructor calls GetSender() and stores the result.
 *
 *  2. Fire-and-forget + resolve-callback bridge (lines 257-296)
 *       startTransRun() calls the daemon method and stores a Promise resolver.
 *       The signal handler calls resolve() when the matching sender arrives.
 *
 *  3. Sender filtering (lines 290-296, 371-415)
 *       Every signal handler ignores events whose sender ≠ this.sender.
 */
class PamacClient {
  private bus: dbus.MessageBus;
  private daemon!: DaemonProxyInterface;

  /** Our unique D-Bus bus name, e.g. ":1.42". Stored after GetSender(). */
  private sender!: string;

  // Stored Promise resolvers – the async/yield bridge
  // Mirrors: SourceFunc trans_run_callback; bool trans_run_success;
  private transRunResolve?: (success: boolean) => void;
  private transRefreshResolve?: (success: boolean) => void;

  // User-facing event callbacks (re-emitted after sender filtering)
  onAction?:              (action: string) => void;
  onDownloadProgress?:    (action: string, status: string, pct: number) => void;
  onError?:               (message: string, details: string[]) => void;
  onDownloadingStarted?:  () => void;
  onDownloadingStopped?:  () => void;
  onWaitingStarted?:      () => void;
  onWaitingStopped?:      () => void;

  private constructor(bus: dbus.MessageBus) {
    this.bus = bus;
  }

  /**
   * Factory method. Connects to the daemon, retrieves sender, wires signals.
   * Mirrors TransactionInterfaceDaemon constructor in transaction_interface_daemon.vala.
   */
  static async connect(clientLabel: string): Promise<PamacClient> {
    const bus = dbus.sessionBus();
    const client = new PamacClient(bus);

    // Obtain proxy object
    const obj = await bus.getProxyObject(SERVICE_NAME, OBJECT_PATH);
    client.daemon = obj.getInterface(IFACE_NAME) as unknown as DaemonProxyInterface;

    // ── Sender identification ─────────────────────────────────────────────
    // In Vala: sender = system_daemon.get_sender();
    // We pass clientLabel so the daemon can echo it back (simulates BusName).
    client.sender = await client.daemon.GetSender(clientLabel);
    console.log(`[${clientLabel}] Connected. Sender: ${client.sender}`);

    // ── Wire all signals ─────────────────────────────────────────────────
    // Mirrors connecting_dbus_signals() in transaction_interface_daemon.vala
    client.daemon.on("EmitAction",           client.onEmitAction.bind(client));
    client.daemon.on("EmitDownloadProgress", client.onEmitDownloadProgress.bind(client));
    client.daemon.on("EmitError",            client.onEmitError.bind(client));
    client.daemon.on("StartDownloading",     client.onStartDownloading.bind(client));
    client.daemon.on("StopDownloading",      client.onStopDownloading.bind(client));
    client.daemon.on("StartWaiting",         client.onStartWaiting.bind(client));
    client.daemon.on("StopWaiting",          client.onStopWaiting.bind(client));
    client.daemon.on("TransRunFinished",     client.onTransRunFinished.bind(client));
    client.daemon.on("TransRefreshFinished", client.onTransRefreshFinished.bind(client));

    return client;
  }

  // ── Public async API ──────────────────────────────────────────────────────
  //
  // Each method mirrors the async/yield pattern from transaction_interface_daemon.vala:
  //   trans_run_callback = trans_run.callback;
  //   system_daemon.start_trans_run(...);
  //   yield;                                 // ← await here
  //   return trans_run_success;

  /** Install/remove packages. Returns true on success. */
  transRun(toInstall: string[], toRemove: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      this.transRunResolve = resolve;
      // Fire-and-forget: daemon returns immediately
      this.daemon.StartTransRun(this.sender, toInstall, toRemove)
        .catch(() => resolve(false));
    });
  }

  /** Refresh databases. Returns true on success. */
  transRefresh(force = false): Promise<boolean> {
    return new Promise((resolve) => {
      this.transRefreshResolve = resolve;
      this.daemon.StartTransRefresh(this.sender, force)
        .catch(() => resolve(false));
    });
  }

  disconnect(): void {
    this.bus.disconnect();
  }

  // ── Signal handlers with sender filtering ─────────────────────────────────
  //
  // Pattern from transaction_interface_daemon.vala (lines 371-415):
  //   void on_emit_action(string sender, string action) {
  //     if (sender == this.sender) { emit_action(action); }
  //   }

  private onEmitAction(sender: string, action: string): void {
    if (sender !== this.sender) return;   // ← sender filter
    this.onAction?.(action);
  }

  private onEmitDownloadProgress(sender: string, action: string, status: string, pct: number): void {
    if (sender !== this.sender) return;
    this.onDownloadProgress?.(action, status, pct);
  }

  private onEmitError(sender: string, message: string, details: string[]): void {
    if (sender !== this.sender) return;
    this.onError?.(message, details);
  }

  private onStartDownloading(sender: string): void {
    if (sender !== this.sender) return;
    this.onDownloadingStarted?.();
  }

  private onStopDownloading(sender: string): void {
    if (sender !== this.sender) return;
    this.onDownloadingStopped?.();
  }

  private onStartWaiting(sender: string): void {
    if (sender !== this.sender) return;
    this.onWaitingStarted?.();
  }

  private onStopWaiting(sender: string): void {
    if (sender !== this.sender) return;
    this.onWaitingStopped?.();
  }

  // ── Completion signal handlers – resolve the stored Promise ───────────────
  //
  // Pattern from transaction_interface_daemon.vala (lines 290-296):
  //   void on_trans_run_finished(string sender, bool success) {
  //     if (sender != this.sender) { return; }
  //     trans_run_success = success;
  //     trans_run_callback();   ← resolve() here
  //   }

  private onTransRunFinished(sender: string, success: boolean): void {
    if (sender !== this.sender) return;
    const resolve = this.transRunResolve;
    this.transRunResolve = undefined;
    resolve?.(success);
  }

  private onTransRefreshFinished(sender: string, success: boolean): void {
    if (sender !== this.sender) return;
    const resolve = this.transRefreshResolve;
    this.transRefreshResolve = undefined;
    resolve?.(success);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function label(name: string): (msg: string) => void {
  return (msg) => console.log(`  [${name}] ${msg}`);
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

async function startDaemon(): Promise<{ bus: dbus.MessageBus; daemon: PamacDaemon }> {
  const bus = dbus.sessionBus();
  await bus.requestName(SERVICE_NAME, 0);

  const daemon = new PamacDaemon();
  bus.export(OBJECT_PATH, daemon);

  console.log(`[Daemon] Service "${SERVICE_NAME}" running at ${OBJECT_PATH}\n`);
  return { bus, daemon };
}

async function main(): Promise<void> {
  console.log("=== Example 8: libpamac-Style Single-Daemon Sender Filtering ===\n");
  console.log("Architecture: One fixed object path, all clients share the daemon.");
  console.log("Isolation:    Sender string in every signal – clients filter their own.\n");

  // ── Start daemon ───────────────────────────────────────────────────────────
  const service = await startDaemon();
  await sleep(200); // Let daemon settle

  // ─────────────────────────────────────────────────────────────────────────
  // DEMO 1: Single client install
  // ─────────────────────────────────────────────────────────────────────────
  console.log("── Demo 1: Single client installing 'firefox' ──────────────────\n");

  const clientA = await PamacClient.connect(":1.42");
  const logA = label(":1.42 (Alice)");

  clientA.onAction              = (a)       => logA(`Action: ${a}`);
  clientA.onDownloadProgress    = (_, s, p) => logA(`Download: ${s} ${p}%`);
  clientA.onDownloadingStarted  = ()        => logA("Downloading started");
  clientA.onDownloadingStopped  = ()        => logA("Downloading stopped");

  const ok1 = await clientA.transRun(["firefox"], []);
  logA(`transRun result: ${ok1 ? "success" : "failed"}\n`);

  // ─────────────────────────────────────────────────────────────────────────
  // DEMO 2: Two concurrent clients – the critical sender-filtering test
  //
  // Both clients subscribe to ALL daemon signals (because D-Bus broadcasts to
  // every subscriber). The sender filter ensures each client only reacts to
  // signals meant for it.
  // ─────────────────────────────────────────────────────────────────────────
  console.log("── Demo 2: Two concurrent clients – signal isolation ────────────\n");
  console.log("Both clients connect to the SAME daemon object path.");
  console.log("Daemon serialises work via lockRunning mutex.");
  console.log("Each client's progress signals are filtered by its own sender.\n");

  const clientB = await PamacClient.connect(":1.43");
  const clientC = await PamacClient.connect(":1.44");
  const logB = label(":1.43 (Bob  )");
  const logC = label(":1.44 (Carol)");

  clientB.onAction           = (a)       => logB(`Action: ${a}`);
  clientB.onDownloadProgress = (_, s, p) => logB(`Download: ${s} ${p}%`);

  clientC.onAction           = (a)       => logC(`Action: ${a}`);
  clientC.onDownloadProgress = (_, s, p) => logC(`Download: ${s} ${p}%`);

  // Fire both requests without awaiting – they run concurrently on the client
  // side but the daemon serialises them via its internal mutex.
  const [okB, okC] = await Promise.all([
    clientB.transRun(["vim"], []),
    clientC.transRun(["emacs"], []),
  ]);

  logB(`transRun result: ${okB ? "success" : "failed"}`);
  logC(`transRun result: ${okC ? "success" : "failed"}`);
  console.log();

  // ─────────────────────────────────────────────────────────────────────────
  // DEMO 3: Refresh then install (chained async calls, same client)
  // ─────────────────────────────────────────────────────────────────────────
  console.log("── Demo 3: Refresh databases then install (chained) ─────────────\n");

  const clientD = await PamacClient.connect(":1.45");
  const logD = label(":1.45 (Dave )");

  clientD.onAction = (a) => logD(`Action: ${a}`);

  const refreshOk = await clientD.transRefresh(true);
  logD(`transRefresh result: ${refreshOk ? "success" : "failed"}`);

  if (refreshOk) {
    const installOk = await clientD.transRun(["neovim"], []);
    logD(`transRun result: ${installOk ? "success" : "failed"}`);
  }
  console.log();

  // ─────────────────────────────────────────────────────────────────────────
  // Summary
  // ─────────────────────────────────────────────────────────────────────────
  console.log("── Summary ──────────────────────────────────────────────────────\n");
  console.log("Key patterns demonstrated:");
  console.log("  ✓ Single daemon, single object path (org.example.pamac.daemon)");
  console.log("  ✓ Sender identification via GetSender() at connection time");
  console.log("  ✓ Fire-and-forget: StartTransRun() returns void immediately");
  console.log("  ✓ Completion via signal: TransRunFinished(sender, success)");
  console.log("  ✓ Sender filtering: every signal handler checks sender == this.sender");
  console.log("  ✓ Mutex serialises concurrent requests (lockRunning)");
  console.log("  ✓ Promise bridge converts signal-based async to await-able calls\n");

  console.log("Compare with Example 7 (PackageKit-style):");
  console.log("  Ex 7: CreateTransaction() → /path/N  (path-isolated signals)");
  console.log("  Ex 8: Single /path, sender tag        (sender-filtered signals)\n");

  clientA.disconnect();
  clientB.disconnect();
  clientC.disconnect();
  clientD.disconnect();
  service.bus.disconnect();
  process.exit(0);
}

process.on("SIGINT", () => {
  console.log("\n[Example] Shutting down...");
  process.exit(0);
});

main().catch(console.error);
