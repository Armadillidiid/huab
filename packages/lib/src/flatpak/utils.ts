import type { Package, PackageUpdate } from "@/types";
import Flatpak from "@girs/flatpak-1.0";

function refsFromInst(inst: Flatpak.Installation): Package[] {
  try {
    return inst
      .list_installed_refs(null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .map((r) => ({
        id: `app/${r.get_name()}/${r.get_arch()}/${r.get_branch()}`,
        name: r.get_name().split(".").at(-1) ?? r.get_name(),
        version: r.get_appdata_version() || "unknown",
        description: "",
        installedSize: r.get_installed_size(),
        origin: r.get_origin() || undefined,
        status: "installed" as const,
        backend: "flatpak" as const,
      }));
  } catch (e) {
    logError(e as object, "[Huab] list_installed_refs failed");
    return [];
  }
}

function updateRefsFromInst(
  inst: Flatpak.Installation,
  installedMap: Map<string, Package>,
): PackageUpdate[] {
  try {
    return inst
      .list_installed_refs_for_update(null)
      .filter((r) => r.get_kind() === Flatpak.RefKind.APP)
      .flatMap((r) => {
        const shortName = r.get_name().split(".").at(-1) ?? r.get_name();
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
