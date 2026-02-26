import type { FlatpakPackage, PackageUpdate } from "@/types";
import Flatpak from "@girs/flatpak-1.0";

function refsFromInst(inst: Flatpak.Installation): FlatpakPackage[] {
  try {
    return inst
      .list_installed_refs(null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .map((r) => {
        const appId = r.get_name();
        const appName = appId.split(".").at(-1) ?? appId;
        const origin = r.get_origin() || null;
        return {
          id: `app/${appId}/${r.get_arch()}/${r.get_branch()}`,
          name: appName,
          version: r.get_appdata_version() || "unknown",
          installed_version: r.get_appdata_version() || "unknown",
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
          backend: "flatpak" as const,
        };
      });
  } catch (e) {
    logError(e as object, "[Huab] list_installed_refs failed");
    return [];
  }
}

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
            backend: "flatpak" as const,
          },
        ];
      });
  } catch (e) {
    logError(e as object, "[Huab] list_installed_refs_for_update failed");
    return [];
  }
}

export { refsFromInst, updateRefsFromInst };
