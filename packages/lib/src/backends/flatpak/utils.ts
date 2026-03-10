import type { FlatpakPackage } from "../../types.ts";
import Flatpak from "@girs/flatpak-1.0";
import { BACKENDS } from "../../constants.ts";

/**
 * List all installed APP refs from a given installation
 */
function refsFromInst(inst: Flatpak.Installation): FlatpakPackage[] {
  try {
    return inst
      .list_installed_refs_by_kind(Flatpak.RefKind.APP, null)
      .map((r) => {
        const appId = r.get_name();
        const appName = appId.split(".").at(-1) ?? appId;
        const origin = r.get_origin() || null;
        const version = r.get_appdata_version() || "unknown";
        const arch = r.get_arch() ?? "";
        const branch = r.get_branch() ?? "";
        return {
          id: `app/${appId}/${arch}/${branch}`,
          name: appName,
          version,
          installed_version: version,
          repo: origin,
          installed_size: r.get_installed_size(),
          download_size: 0,
          install_date: null,
          backend: BACKENDS.flatpak,
          arch,
          branch,
          ref: `app/${appId}/${arch}/${branch}`,
          runtime: null,
          command: null,
          eol: r.get_eol() || null,
          // AppStream fields - populated later via AppStream metadata
          desc: null,
          long_desc: null,
          url: null,
          app_name: appName,
          app_id: appId,
          launchable: null,
          icon: null,
          screenshots: [],
          license: null,
          keywords: [],
          categories: [],
          developer: null,
          donation_url: null,
          is_floss: false,
        };
      });
  } catch (e) {
    logError(e as object, "[Huab] list_installed_refs failed");
    return [];
  }
}

/**
 * List all APP refs available from a given remote, returned as uninstalled
 */
function remoteRefsFromInst(
  inst: Flatpak.Installation,
  remote: string,
): FlatpakPackage[] {
  try {
    return inst
      .list_remote_refs_sync(remote, null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .map((r) => {
        const appId = r.get_name();
        const appName = appId.split(".").at(-1) ?? appId;
        const arch = r.get_arch() ?? "";
        const branch = r.get_branch() ?? "";
        return {
          id: `app/${appId}/${arch}/${branch}`,
          name: appName,
          version: "unknown",
          installed_version: null,
          repo: remote,
          installed_size: 0,
          download_size: 0,
          install_date: null,
          backend: BACKENDS.flatpak,
          arch,
          branch,
          ref: `app/${appId}/${arch}/${branch}`,
          runtime: null,
          command: null,
          eol: r.get_eol() || null,
          // AppStream fields - populated later via AppStream metadata
          desc: null,
          long_desc: null,
          url: null,
          app_name: appName,
          app_id: appId,
          launchable: null,
          icon: null,
          screenshots: [],
          license: null,
          keywords: [],
          categories: [],
          developer: null,
          donation_url: null,
          is_floss: false,
        };
      });
  } catch (e) {
    logError(
      e as object,
      `[Huab] list_remote_refs_sync failed for remote "${remote}"`,
    );
    return [];
  }
}

export { refsFromInst, remoteRefsFromInst };
