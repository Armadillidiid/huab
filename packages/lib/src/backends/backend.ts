import type { AnyPackage, PackageUpdate } from "../types.ts";

/**
 * Core contract every backend must satisfy.
 *
 * TODO: Consider splitting into capability interfaces (ISearchableBackend,
 * IBrowsableBackend, IRefreshableBackend) once calling patterns stabilise.
 * Optional methods here are a pragmatic first step — the registry guards each
 * call with `typeof backend.method === 'function'` so unsupported backends are
 * silently skipped.
 */
export interface IPackageBackend {
  // ── Required ────────────────────────────────────────────────────────────
  listInstalled(): AnyPackage[];
  listUpdates(): PackageUpdate[];

  // ── Optional — not all backends support every operation ─────────────────

  /** Full-text search by name/description. */
  search?(query: string): AnyPackage[];

  /** Fetch a single package by its backend-specific ID. */
  getPackage?(id: string): AnyPackage | null;

  /** List all packages available from remotes (installed or not). */
  listAvailable?(): AnyPackage[];

  /** List packages belonging to an AppStream/store category. */
  listByCategory?(category: string): AnyPackage[];

  /** Refresh local package database / AppStream metadata. */
  refreshMetadata?(): void;
}
