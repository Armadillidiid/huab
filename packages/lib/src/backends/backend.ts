import type { AnyPackage } from "../types.ts";

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
  /** Returns all packages available from remotes */
  listAvailable(): AnyPackage[];
}
