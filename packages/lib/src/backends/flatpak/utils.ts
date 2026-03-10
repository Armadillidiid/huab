import type { FlatpakPackage as FlatpakPackageType } from "../../types.ts";
import Flatpak from "gi://Flatpak?version=1.0";
import { BACKENDS } from "../../constants.ts";
import type { AppStreamStore } from "./appstream-store.ts";

type AnyRef = Flatpak.InstalledRef | Flatpak.RemoteRef | Flatpak.BundleRef;

/**
 * Unified factory for FlatpakPackage data objects.
 * Accepts any Flatpak ref subtype and uses instanceof to safely access
 * per-subtype properties.
 */
export class FlatpakPackage {
  static from(r: AnyRef, appstream?: AppStreamStore): FlatpakPackageType {
    const appId = r.get_name();
    const appName = appId.split(".").at(-1) ?? appId;
    const arch = r.get_arch() ?? "";
    const branch = r.get_branch() ?? "";
    const refStr = r.format_ref() ?? `app/${appId}/${arch}/${branch}`;

    let version: string = "unknown";
    let installed_version: string | null = null;
    let repo: string | null = null;
    let installed_size: number = 0;
    let download_size: number = 0;
    let eol: string | null = null;

    if (r instanceof Flatpak.InstalledRef) {
      version = r.get_appdata_version() || "unknown";
      installed_version = version;
      repo = r.get_origin() || null;
      installed_size = r.get_installed_size();
      eol = r.get_eol() || null;
    } else if (r instanceof Flatpak.RemoteRef) {
      repo = r.get_remote_name() || null;
      installed_size = r.get_installed_size();
      download_size = r.get_download_size();
      eol = r.get_eol() || null;
    } else {
      // BundleRef — r.get_file() is the unique discriminant for this branch
      repo = r.get_origin() || null;
      installed_size = r.get_installed_size();
    }

    const as = appstream?.enrich(appId) ?? null;

    return {
      id: `app/${appId}/${arch}/${branch}`,
      name: appName,
      version,
      installed_version,
      repo,
      installed_size,
      download_size,
      install_date: null,
      backend: BACKENDS.flatpak,
      arch,
      branch,
      ref: refStr,
      runtime: null,
      command: null,
      eol,
      // AppStream fields — populated via AppStreamStore if provided
      desc: as?.desc ?? null,
      long_desc: as?.long_desc ?? null,
      url: as?.url ?? null,
      app_name: as?.app_name ?? appName,
      app_id: as?.app_id ?? appId,
      launchable: as?.launchable ?? null,
      icon: as?.icon ?? null,
      screenshots: as?.screenshots ?? [],
      license: as?.license ?? null,
      keywords: as?.keywords ?? [],
      categories: as?.categories ?? [],
      developer: as?.developer ?? null,
      donation_url: as?.donation_url ?? null,
      is_floss: as?.is_floss ?? false,
    };
  }
}
