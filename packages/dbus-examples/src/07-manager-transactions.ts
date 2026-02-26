#!/usr/bin/env bun
/**
 * Example 7: Manager and Transactions Pattern
 *
 * This example demonstrates the Manager/Transaction pattern commonly used in D-Bus services.
 * This pattern is used by many system services like NetworkManager, UDisks2, PackageKit, etc.
 *
 * Pattern Overview:
 * 1. Manager Object - Central service that creates and manages transaction objects
 * 2. Transaction Objects - Temporary objects created for specific operations
 * 3. Each transaction has its own object path and lifecycle
 * 4. Transactions emit signals to report progress
 * 5. Transactions are destroyed after completion
 *
 * This example simulates a package manager with:
 * - A Manager that creates installation/removal transactions
 * - Transaction objects that report progress via signals
 * - Proper lifecycle management (create -> execute -> complete -> destroy)
 *
 * Real-world examples:
 * - NetworkManager: Creates connection objects
 * - UDisks2: Creates job objects for disk operations
 * - PackageKit: Creates transaction objects for package operations
 * - systemd: Creates job objects for unit operations
 */

import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

// Type-safe interfaces for clients
interface PackageManagerClientInterface {
  InstallPackage: (packageName: string) => Promise<string>;
  RemovePackage: (packageName: string) => Promise<string>;
  UpdatePackage: (packageName: string, version: string) => Promise<string>;
  ListTransactions: () => Promise<string[]>;
  CancelTransaction: (transactionPath: string) => Promise<boolean>;
}

interface TransactionClientInterface {
  Status: Promise<string>;
  Progress: Promise<number>;
  PackageName: Promise<string>;
  Operation: Promise<string>;
  GetDetails: () => Promise<string>;
  Cancel: () => Promise<boolean>;
  on(event: "ProgressChanged", callback: (progress: number, message: string) => void): void;
  on(event: "StatusChanged", callback: (status: string) => void): void;
  on(event: "Completed", callback: (success: boolean, message: string) => void): void;
  on(event: "Error", callback: (errorCode: string, errorMessage: string) => void): void;
}

// Transaction states
enum TransactionStatus {
  Pending = "Pending",
  Running = "Running",
  Completed = "Completed",
  Failed = "Failed",
  Cancelled = "Cancelled",
}

enum OperationType {
  Install = "Install",
  Remove = "Remove",
  Update = "Update",
}

// Transaction class - represents a single package operation
class TransactionInterface extends DBusInterface {
  private _status: TransactionStatus = TransactionStatus.Pending;
  private _progress: number = 0;
  private _packageName: string;
  private _operation: OperationType;
  private _version?: string;
  private progressInterval?: NodeJS.Timeout;
  private cancelled: boolean = false;

  constructor(
    interfaceName: string,
    packageName: string,
    operation: OperationType,
    version?: string,
  ) {
    super(interfaceName);
    this._packageName = packageName;
    this._operation = operation;
    this._version = version;
  }

  // Signals
  ProgressChanged(progress: number, message: string): [number, string] {
    return [progress, message];
  }

  StatusChanged(status: string): string {
    return status;
  }

  Completed(success: boolean, message: string): [boolean, string] {
    return [success, message];
  }

  Error(errorCode: string, errorMessage: string): [string, string] {
    return [errorCode, errorMessage];
  }

  // Properties
  get Status(): string {
    return this._status;
  }

  get Progress(): number {
    return this._progress;
  }

  get PackageName(): string {
    return this._packageName;
  }

  get Operation(): string {
    return this._operation;
  }

  // Methods
  GetDetails(): string {
    return JSON.stringify(
      {
        packageName: this._packageName,
        operation: this._operation,
        version: this._version,
        status: this._status,
        progress: this._progress,
      },
      null,
      2,
    );
  }

  Cancel(): boolean {
    if (
      this._status === TransactionStatus.Completed ||
      this._status === TransactionStatus.Failed ||
      this._status === TransactionStatus.Cancelled
    ) {
      console.log(`[Transaction] Cannot cancel transaction in ${this._status} state`);
      return false;
    }

    console.log(`[Transaction] Cancelling ${this._operation} of ${this._packageName}...`);
    this.cancelled = true;
    this._status = TransactionStatus.Cancelled;
    this.StatusChanged(this._status);

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }

    this.Completed(false, "Transaction cancelled by user");
    return true;
  }

  // Execute the transaction (called by manager)
  async execute(): Promise<void> {
    if (this.cancelled) return;

    this._status = TransactionStatus.Running;
    this.StatusChanged(this._status);
    console.log(`[Transaction] Starting ${this._operation} of ${this._packageName}...`);

    // Simulate package operation with progress updates
    const steps = this.getOperationSteps();
    const totalSteps = steps.length;

    for (let i = 0; i < totalSteps; i++) {
      if (this.cancelled) break;

      const step = steps[i];
      if (!step) continue;

      const progress = Math.round(((i + 1) / totalSteps) * 100);
      this._progress = progress;

      console.log(`[Transaction] ${step} (${progress}%)`);
      this.ProgressChanged(progress, step);

      // Simulate work
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    if (this.cancelled) {
      return;
    }

    // Complete transaction
    this._progress = 100;
    this._status = TransactionStatus.Completed;
    this.StatusChanged(this._status);

    const message = `${this._operation} of ${this._packageName} completed successfully`;
    console.log(`[Transaction] ${message}`);
    this.Completed(true, message);
  }

  private getOperationSteps(): string[] {
    switch (this._operation) {
      case OperationType.Install:
        return [
          "Downloading package...",
          "Verifying checksums...",
          "Extracting files...",
          "Installing dependencies...",
          "Configuring package...",
        ];
      case OperationType.Remove:
        return [
          "Checking dependencies...",
          "Stopping services...",
          "Removing files...",
          "Cleaning up...",
        ];
      case OperationType.Update:
        return [
          "Checking current version...",
          "Downloading update...",
          "Verifying integrity...",
          "Applying update...",
          "Restarting services...",
        ];
    }
  }

  cleanup() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}

// Configure Transaction interface
TransactionInterface.configureMembers({
  signals: {
    ProgressChanged: {
      signature: "is",
    },
    StatusChanged: {
      signature: "s",
    },
    Completed: {
      signature: "bs",
    },
    Error: {
      signature: "ss",
    },
  },
  properties: {
    Status: {
      signature: "s",
      access: dbus.interface.ACCESS_READ,
    },
    Progress: {
      signature: "i",
      access: dbus.interface.ACCESS_READ,
    },
    PackageName: {
      signature: "s",
      access: dbus.interface.ACCESS_READ,
    },
    Operation: {
      signature: "s",
      access: dbus.interface.ACCESS_READ,
    },
  },
  methods: {
    GetDetails: {
      inSignature: "",
      outSignature: "s",
    },
    Cancel: {
      inSignature: "",
      outSignature: "b",
    },
  },
});

// Manager class - creates and manages transactions
class PackageManagerInterfaceImpl extends DBusInterface {
  private transactions: Map<string, TransactionInterface> = new Map();
  private transactionCounter: number = 0;
  private bus: dbus.MessageBus;

  constructor(interfaceName: string, bus: dbus.MessageBus) {
    super(interfaceName);
    this.bus = bus;
  }

  // Create a new transaction for installing a package
  async InstallPackage(packageName: string): Promise<string> {
    console.log(`[Manager] Creating installation transaction for ${packageName}...`);
    return this.createTransaction(packageName, OperationType.Install);
  }

  // Create a new transaction for removing a package
  async RemovePackage(packageName: string): Promise<string> {
    console.log(`[Manager] Creating removal transaction for ${packageName}...`);
    return this.createTransaction(packageName, OperationType.Remove);
  }

  // Create a new transaction for updating a package
  async UpdatePackage(packageName: string, version: string): Promise<string> {
    console.log(`[Manager] Creating update transaction for ${packageName} to ${version}...`);
    return this.createTransaction(packageName, OperationType.Update, version);
  }

  // List all active transactions
  ListTransactions(): string[] {
    return Array.from(this.transactions.keys());
  }

  // Cancel a transaction by path
  async CancelTransaction(transactionPath: string): Promise<boolean> {
    const transaction = this.transactions.get(transactionPath);
    if (!transaction) {
      console.log(`[Manager] Transaction not found: ${transactionPath}`);
      return false;
    }

    return transaction.Cancel();
  }

  private async createTransaction(
    packageName: string,
    operation: OperationType,
    version?: string,
  ): Promise<string> {
    // Generate unique transaction path
    const transactionId = ++this.transactionCounter;
    const transactionPath = `/com/example/PackageManager/Transaction/${transactionId}`;

    // Create transaction interface
    const transaction = new TransactionInterface(
      "com.example.PackageManager.Transaction",
      packageName,
      operation,
      version,
    );

    // Export transaction on the bus
    this.bus.export(transactionPath, transaction);
    this.transactions.set(transactionPath, transaction);

    console.log(`[Manager] Created transaction: ${transactionPath}`);

    // Execute transaction asynchronously
    transaction
      .execute()
      .then(() => {
        // Auto-cleanup after a delay
        setTimeout(() => {
          this.destroyTransaction(transactionPath);
        }, 2000);
      })
      .catch((err) => {
        console.error(`[Manager] Transaction error:`, err);
        transaction.Error("EXEC_ERROR", String(err));
        setTimeout(() => {
          this.destroyTransaction(transactionPath);
        }, 2000);
      });

    return transactionPath;
  }

  private destroyTransaction(transactionPath: string) {
    const transaction = this.transactions.get(transactionPath);
    if (transaction) {
      transaction.cleanup();
      this.transactions.delete(transactionPath);
      // Note: In a real implementation, you'd also unexport from the bus
      console.log(`[Manager] Destroyed transaction: ${transactionPath}`);
    }
  }

  cleanup() {
    this.transactions.forEach((transaction) => {
      transaction.cleanup();
    });
    this.transactions.clear();
  }
}

// Configure Manager interface
PackageManagerInterfaceImpl.configureMembers({
  methods: {
    InstallPackage: {
      inSignature: "s",
      outSignature: "o",
    },
    RemovePackage: {
      inSignature: "s",
      outSignature: "o",
    },
    UpdatePackage: {
      inSignature: "ss",
      outSignature: "o",
    },
    ListTransactions: {
      inSignature: "",
      outSignature: "ao",
    },
    CancelTransaction: {
      inSignature: "o",
      outSignature: "b",
    },
  },
});

async function startService() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.PackageManager";
  const objectPath = "/com/example/PackageManager";
  const interfaceName = "com.example.PackageManager";

  try {
    await bus.requestName(serviceName, 0);
    console.log(`[Service] Acquired name: ${serviceName}`);

    const manager = new PackageManagerInterfaceImpl(interfaceName, bus);
    bus.export(objectPath, manager);

    console.log("[Service] Package Manager service is ready!");
    console.log("[Service] Waiting for transaction requests...\n");

    return { bus, manager };
  } catch (err) {
    console.error("[Service] Error:", err);
    throw err;
  }
}

async function startClient() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.PackageManager";
  const objectPath = "/com/example/PackageManager";
  const interfaceName = "com.example.PackageManager";

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const obj = await bus.getProxyObject(serviceName, objectPath);
    const manager = obj.getInterface(interfaceName) as unknown as PackageManagerClientInterface;

    console.log("[Client] Connected to Package Manager\n");

    return { bus, manager };
  } catch (err) {
    console.error("[Client] Error:", err);
    throw err;
  }
}

// Helper to monitor a transaction
async function monitorTransaction(bus: dbus.MessageBus, transactionPath: string): Promise<void> {
  try {
    const obj = await bus.getProxyObject("com.example.PackageManager", transactionPath);
    const transaction = obj.getInterface(
      "com.example.PackageManager.Transaction",
    ) as unknown as TransactionClientInterface;

    // Listen to progress updates
    transaction.on("ProgressChanged", (progress: number, message: string) => {
      console.log(`[Client] 📊 Progress ${progress}%: ${message}`);
    });

    transaction.on("StatusChanged", (status: string) => {
      console.log(`[Client] 🔄 Status: ${status}`);
    });

    transaction.on("Completed", (success: boolean, message: string) => {
      const icon = success ? "✅" : "❌";
      console.log(`[Client] ${icon} ${message}\n`);
    });

    transaction.on("Error", (errorCode: string, errorMessage: string) => {
      console.log(`[Client] ❌ Error [${errorCode}]: ${errorMessage}\n`);
    });
  } catch (err) {
    console.error("[Client] Error monitoring transaction:", err);
  }
}

async function demonstrateManagerPattern() {
  console.log("=== Manager and Transactions Pattern Example ===\n");
  console.log("This demonstrates the Manager/Transaction pattern used by");
  console.log("system services like NetworkManager, UDisks2, and PackageKit.\n");

  const service = await startService();
  const client = await startClient();

  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("=== Demo 1: Single Package Installation ===\n");

  // Create installation transaction
  console.log("[Client] Requesting installation of 'nginx'...");
  const installPath = await client.manager.InstallPackage("nginx");
  console.log(`[Client] Transaction created: ${installPath}\n`);

  // Monitor the transaction
  await monitorTransaction(client.bus, installPath);

  // Wait for transaction to complete
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("=== Demo 2: Multiple Concurrent Transactions ===\n");

  // Create multiple transactions
  console.log("[Client] Creating multiple transactions...");
  const tx1 = await client.manager.InstallPackage("postgresql");
  const tx2 = await client.manager.InstallPackage("redis");
  const tx3 = await client.manager.UpdatePackage("nodejs", "20.0.0");

  console.log(`[Client] Created transactions:`);
  console.log(`  - ${tx1}`);
  console.log(`  - ${tx2}`);
  console.log(`  - ${tx3}\n`);

  // Monitor all transactions
  await Promise.all([
    monitorTransaction(client.bus, tx1),
    monitorTransaction(client.bus, tx2),
    monitorTransaction(client.bus, tx3),
  ]);

  await new Promise((resolve) => setTimeout(resolve, 6000));

  console.log("=== Demo 3: Transaction Cancellation ===\n");

  // Create a transaction and cancel it
  console.log("[Client] Starting installation of 'mongodb'...");
  const cancelPath = await client.manager.InstallPackage("mongodb");
  await monitorTransaction(client.bus, cancelPath);

  // Wait a bit then cancel
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("[Client] Cancelling transaction...");
  const cancelled = await client.manager.CancelTransaction(cancelPath);
  console.log(`[Client] Cancellation ${cancelled ? "successful" : "failed"}\n`);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("=== Demo 4: Listing Active Transactions ===\n");

  // Create some transactions
  const tx4 = await client.manager.RemovePackage("apache2");
  const tx5 = await client.manager.InstallPackage("docker");

  await new Promise((resolve) => setTimeout(resolve, 500));

  // List all active transactions
  const activeTx = await client.manager.ListTransactions();
  console.log("[Client] Active transactions:");
  activeTx.forEach((path, index) => {
    console.log(`  ${index + 1}. ${path}`);
  });
  console.log();

  await new Promise((resolve) => setTimeout(resolve, 6000));

  console.log("=== All demonstrations completed ===\n");
  console.log("Key patterns demonstrated:");
  console.log("  ✓ Manager creates transaction objects");
  console.log("  ✓ Each transaction has unique object path");
  console.log("  ✓ Transactions emit progress signals");
  console.log("  ✓ Multiple concurrent transactions");
  console.log("  ✓ Transaction cancellation");
  console.log("  ✓ Automatic cleanup after completion");

  service.manager.cleanup();
  service.bus.disconnect();
  client.bus.disconnect();
  process.exit(0);
}

process.on("SIGINT", () => {
  console.log("\n[Example] Shutting down...");
  process.exit(0);
});

demonstrateManagerPattern().catch(console.error);
