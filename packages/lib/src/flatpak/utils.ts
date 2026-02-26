import type { FlatpakPackage, PackageUpdate } from "@/types";
import Flatpak from "@girs/flatpak-1.0";
import { BACKENDS } from "../constants.js";

// ── Installed refs ──────────────────────────────────────────────────────────

function refsFromInst(inst: Flatpak.Installation): FlatpakPackage[] {
  try {
    return inst
      .list_installed_refs(null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .map((r) => {
        const appId = r.get_name();
        const appName = appId.split(".").at(-1) ?? appId;
        const origin = r.get_origin() || null;
        const version = r.get_appdata_version() || "unknown";
        return {
          id: `app/${appId}/${r.get_arch()}/${r.get_branch()}`,
          name: appName,
          version,
          installed_version: version,
          desc: null,
          long_desc: null,
          repo: origin,
          license: null,
          url: null,
          app_name: appName,
          app_id: appId,
          launchable: null,
          icon: null,
          screenshots: [],
          installed_size: r.get_installed_size(),
          download_size: 0,
          install_date: null,
          backend: BACKENDS.flatpak,
        };
      });
  } catch (e) {
    logError(e as object, "[Huab] list_installed_refs failed");
    return [];
  }
}

// ── Update refs ─────────────────────────────────────────────────────────────

function updateRefsFromInst(
  inst: Flatpak.Installation,
  installedMap: Map<string, FlatpakPackage>,
): PackageUpdate[] {
  try {
    return inst
      .list_installed_refs_for_update(null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .flatMap((r) => {
        const appId = r.get_name();
        const shortName = appId.split(".").at(-1) ?? appId;
        const pkg = installedMap.get(shortName);
        if (!pkg) return [];
        return [
          {
            id: pkg.id,
            name: pkg.name,
            currentVersion: pkg.version,
            newVersion: "update available",
            backend: BACKENDS.flatpak,
          },
        ];
      });
  } catch (e) {
    logError(e as object, "[Huab] list_installed_refs_for_update failed");
    return [];
  }
}

// ── Remote (available) refs ─────────────────────────────────────────────────

/**
 * List all APP refs available from a given remote, returned as uninstalled
 */
function remoteRefsFromInst(inst: Flatpak.Installation, remote: string): FlatpakPackage[] {
  try {
    return inst
      .list_remote_refs_sync(remote, null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .map((r) => {
        const appId = r.get_name();
        const appName = appId.split(".").at(-1) ?? appId;
        return {
          id: `app/${appId}/${r.get_arch()}/${r.get_branch()}`,
          name: appName,
          version: "unknown",
          installed_version: null,
          desc: null,
          long_desc: null,
          repo: remote,
          license: null,
          url: null,
          app_name: appName,
          app_id: appId,
          launchable: null,
          icon: null,
          screenshots: [],
          installed_size: 0,
          download_size: 0,
          install_date: null,
          backend: BACKENDS.flatpak,
        };
      });
  } catch (e) {
    logError(e as object, `[Huab] list_remote_refs_sync failed for remote "${remote}"`);
    return [];
  }
}

export { refsFromInst, updateRefsFromInst, remoteRefsFromInst };
