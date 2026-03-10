import AppStream from "gi://AppStream?version=1.0";
import Flatpak from "gi://Flatpak?version=1.0";
import type { AppStreamPackage } from "../../types.ts";

/**
 * Loads AppStream metadata from each enabled remote's appstream_dir
 * and returns AppStreamPackage data objects on demand.
 */
export class AppStreamStore {
  private readonly pool: AppStream.Pool;

  constructor() {
    this.pool = new AppStream.Pool();
    // Disable automatic standard-location loading; we supply paths manually
    this.pool.set_load_std_data_locations(false);
  }

  /**
   * Register appstream directories from all enabled remotes across the given
   * installations, then load the pool. Call once before enrich().
   */
  load(installations: Flatpak.Installation[]): void {
    for (const inst of installations) {
      for (const remote of inst.list_remotes(null)) {
        if (remote.get_disabled()) continue;
        // get_appstream_dir(arch) — null means current arch
        const dir = remote.get_appstream_dir(null);
        if (!dir) continue;
        const path = dir.get_path();
        if (!path) continue;
        try {
          this.pool.add_extra_data_location(path, AppStream.FormatStyle.CATALOG);
        } catch {
          // skip unreadable dirs silently
        }
      }
    }
    try {
      this.pool.load(null);
    } catch (e) {
      logError(e as object, "[Huab] AppStreamStore: pool.load() failed");
    }
  }

  /**
   * Look up AppStream metadata by component ID.
   * Returns an AppStreamPackage if found, or null if no matching component exists.
   */
  enrich(app_id: string): AppStreamPackage | null {
    const box = this.pool.get_components_by_id(app_id);
    const comp = box ? box.as_array().at(0) : undefined;
    if (!comp) return null;

    const dev = comp.get_developer();

    // Icon: prefer CACHED, fall back to STOCK name
    const icons = comp.get_icons();
    const cached = icons.find((i: AppStream.Icon) => i.get_kind() === AppStream.IconKind.CACHED);
    const stock = icons.find((i: AppStream.Icon) => i.get_kind() === AppStream.IconKind.STOCK);

    // Screenshots: SOURCE images across all screenshots
    const screenshots = comp
      .get_screenshots_all()
      .flatMap((s: AppStream.Screenshot) => s.get_images_all())
      .filter((i: AppStream.Image) => i.get_kind() === AppStream.ImageKind.SOURCE)
      .map((i: AppStream.Image) => i.get_url())
      .filter((u: string): u is string => Boolean(u));

    // Launchable: first DESKTOP_ID entry
    const launchable = comp.get_launchable(AppStream.LaunchableKind.DESKTOP_ID);

    return {
      desc: comp.get_summary() ?? null,
      long_desc: comp.get_description() ?? null,
      url: comp.get_url(AppStream.UrlKind.HOMEPAGE) ?? null,
      app_name: comp.get_name() ?? null,
      app_id,
      launchable: launchable?.get_entries()?.at(0) ?? null,
      icon: cached?.get_filename() ?? stock?.get_name() ?? null,
      screenshots,
      license: comp.get_project_license() ?? null,
      keywords: comp.get_keywords() ?? [],
      categories: comp.get_categories() ?? [],
      developer: dev?.get_name() ?? null,
      donation_url: comp.get_url(AppStream.UrlKind.DONATION) ?? null,
      is_floss: comp.is_floss(),
    };
  }
}
