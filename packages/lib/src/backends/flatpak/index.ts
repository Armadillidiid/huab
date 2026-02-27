import Flatpak from "gi://Flatpak?version=1.0";
import type { AnyPackage, FlatpakPackage, PackageUpdate } from "../../types.ts";
import type { IPackageBackend } from "../backend.ts";
import { refsFromInst, updateRefsFromInst, remoteRefsFromInst } from "./utils.ts";

export class FlatpakBackend implements IPackageBackend {
  private readonly userInst: Flatpak.Installation;
  private readonly sysInst: Flatpak.Installation;

  constructor() {
    this.userInst = Flatpak.Installation.new_user(null);
    this.sysInst = Flatpak.Installation.new_system(null);
  }

  // ── Required ───────────────────────────────────────────────────────────

  listInstalled() {
    return [...refsFromInst(this.userInst), ...refsFromInst(this.sysInst)];
  }

  listUpdates(): PackageUpdate[] {
    const installed = this.listInstalled();
    const installedMap = new Map(installed.map((p) => [p.name, p]));
    return [
      ...updateRefsFromInst(this.userInst, installedMap),
      ...updateRefsFromInst(this.sysInst, installedMap),
    ];
  }

  // ── Optional ───────────────────────────────────────────────────────────

  /**
   * Full-text search across installed packages and remote refs.
   * Matches against name, app_id, and desc (case-insensitive substring).
   */
  search(query: string): AnyPackage[] {
    const q = query.toLowerCase();
    const matches = (p: FlatpakPackage) =>
      p.name.toLowerCase().includes(q) ||
      (p.app_id?.toLowerCase().includes(q) ?? false) ||
      (p.desc?.toLowerCase().includes(q) ?? false);

    const installed = this.listInstalled();
    const available = this.listAvailable();

    // Deduplicate: installed wins over remote if same app_id
    const seen = new Set(installed.map((p) => p.app_id));
    const remoteMatches = available.filter((p) => !seen.has(p.app_id) && matches(p));

    return [...installed.filter(matches), ...remoteMatches];
  }

  /**
   * Find a package by its Flatpak ref ID (e.g. "app/org.mozilla.Firefox/x86_64/stable").
   * Checks installed first, then falls back to remote refs.
   */
  getPackage(id: string): AnyPackage | null {
    const installed = this.listInstalled();
    const found = installed.find((p) => p.id === id);
    if (found) return found;

    const available = this.listAvailable();
    return available.find((p) => p.id === id) ?? null;
  }

  /**
   * List all APP refs available from all configured remotes (installed or not).
   * NOTE: This fetches from remotes and may be slow on first call.
   */
  listAvailable() {
    const seen = new Set<string>();
    const results: FlatpakPackage[] = [];

    const addFromInst = (inst: Flatpak.Installation) => {
      for (const remote of inst.list_remotes(null)) {
        if (remote.get_disabled()) continue;
        const remoteName = remote.get_name();
        for (const pkg of remoteRefsFromInst(inst, remoteName)) {
          if (!seen.has(pkg.id)) {
            seen.add(pkg.id);
            results.push(pkg);
          }
        }
      }
    };

    addFromInst(this.userInst);
    addFromInst(this.sysInst);

    return results;
  }

  /**
   * Filter available packages by AppStream category.
   * Returns empty until AppStream metadata is integrated — category field is
   * not exposed by the GJS Flatpak bindings directly.
   */
  listByCategory(category: string): AnyPackage[] {
    // TODO: Integrate AppStream metadata to support category filtering.
    // Currently the GJS Flatpak bindings don't expose AppStream category data,
    // so we return all available packages and let the caller filter if needed.
    void category;
    return [];
  }

  /**
   * No-op: Flatpak refreshes AppStream data automatically via OSTree on install/update.
   * Call update_appstream_sync per-remote if an explicit refresh is needed in future.
   */
  refreshMetadata(): void {
    // Flatpak's AppStream data is updated automatically via OSTree during normal
    // package operations. An explicit refresh is not required in typical usage.
    log("[Huab] FlatpakBackend.refreshMetadata: no-op (OSTree handles refresh)");
  }
}
