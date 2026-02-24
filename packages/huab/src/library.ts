// This file stores examples type signatures for the Huab Lib. it's a rough draft and old at this point
// Please ignore

// --- Types ---
type PackageStatus = "installed" | "not_installed" | "update_available";

interface Package {
  id: string;
  name: string;
  version: string;
  installedVersion?: string;
  description: string;
  longDescription?: string;
  repo?: string;
  license?: string;
  url?: string;
  iconUrl?: string;
  installedSize?: number;
  downloadSize?: number;
  installDate?: string;
  status: PackageStatus;
}

interface SearchResult {
  installed: Package[];
  available: Package[];
  total: number;
}

interface PackageUpdate {
  id: string;
  name: string;
  currentVersion: string;
  newVersion: string;
}

interface TransactionResult {
  success: boolean;
  installed?: Package[];
  removed?: Package[];
  error?: string;
}

interface CacheInfo {
  totalSize: number;
  fileCount: number;
}

// --- Core Operations ---
interface PackageManager {
  // Query
  search(
    query: string,
    options?: { limit?: number; installedOnly?: boolean },
  ): Promise<SearchResult>;
  listInstalled(options?: { limit?: number }): Promise<Package[]>;
  getInfo(packageId: string): Promise<Package>;
  getHistory(packageId: string): Promise<{ version: string; date: string }[]>;
  getScreenshots(packageId: string): Promise<string[]>;
  getSuggestions(options?: {
    limit?: number;
    filterInstalled?: boolean;
  }): Promise<Package[]>;
  getCategories(): Promise<string[]>;
  getPackagesByCategory(category: string): Promise<Package[]>;

  // Mutations
  install(packageId: string): Promise<TransactionResult>;
  remove(packageId: string): Promise<TransactionResult>;
  reinstall(packageId: string): Promise<TransactionResult>;
  downgrade(
    packageId: string,
    targetVersion?: string,
  ): Promise<TransactionResult>;

  // Updates
  listUpdates(): Promise<PackageUpdate[]>;
  upgradeAll(options?: { downloadOnly?: boolean }): Promise<TransactionResult>;
  downloadUpdates(): Promise<TransactionResult>;

  // Repos / DB
  listRepos(): Promise<string[]>;
  syncDatabases(force?: boolean): Promise<void>;

  // Cache
  getCacheInfo(): Promise<CacheInfo>;
  cleanCache(): Promise<void>;
}
