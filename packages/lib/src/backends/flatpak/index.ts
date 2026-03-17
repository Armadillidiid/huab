import Flatpak from "gi://Flatpak?version=1.0";
import type { FlatpakPackage as FlatpakPackageType } from "../../types.ts";
import type { IPackageBackend } from "../backend.ts";
import { FlatpakPackage } from "./utils.ts";
import { AppStreamStore } from "./appstream-store.ts";

export class FlatpakBackend implements IPackageBackend<FlatpakPackageType> {
  private readonly userInst: Flatpak.Installation;
  private readonly sysInst: Flatpak.Installation;
  private readonly appstream: AppStreamStore;

  constructor() {
    this.userInst = Flatpak.Installation.new_user(null);
    this.sysInst = Flatpak.Installation.new_system(null);
    this.appstream = new AppStreamStore();
    this.appstream.load([this.userInst, this.sysInst]);
  }

  /**
   * Returns installed packages from both user and system installations.
   * Used internally by listAvailable to enrich results with installed_version.
   */
  private listInstalled(): FlatpakPackageType[] {
    const fromInst = (inst: Flatpak.Installation) =>
      inst
        .list_installed_refs_by_kind(Flatpak.RefKind.APP, null)
        .map((r) => FlatpakPackage.from(r, this.appstream));
    return [...fromInst(this.userInst), ...fromInst(this.sysInst)];
  }

  /**
   * List all APP refs available from all configured remotes.
   * Installed packages appear first (with installed_version set).
   * Remote-only refs follow, with installed_version: null.
   * AppStream metadata is applied during FlatpakPackage.from().
   */
  listAvailable(): FlatpakPackageType[] {
    const startedAt = Date.now();
    log("[Huab] flatpak listAvailable start");
    const installed = this.listInstalled();
    const installedById = new Map(installed.map((p) => [p.id, p]));
    log(`[Huab] flatpak listInstalled ${installed.length} apps`);

    const remoteResults: FlatpakPackageType[] = [];
    const seenRemote = new Set<string>();

    const addFromInst = (inst: Flatpak.Installation) => {
      for (const remote of inst.list_remotes(null)) {
        if (remote.get_disabled()) continue;
        const remoteName = remote.get_name();
        try {
          const remoteStart = Date.now();
          for (const r of inst.list_remote_refs_sync(remoteName, null)) {
            if (r.get_kind() !== Flatpak.RefKind.APP) continue;
            const pkg = FlatpakPackage.from(r, this.appstream);
            // TODO: Craate a class to group the same ref from different remotes and installations, instead of just skipping duplicates.
            if (!seenRemote.has(pkg.id) && !installedById.has(pkg.id)) {
              seenRemote.add(pkg.id);
              remoteResults.push(pkg);
            }
          }
          const remoteElapsed = Date.now() - remoteStart;
          log(
            `[Huab] flatpak list_remote_refs_sync ${remoteName} ${remoteElapsed}ms (${remoteResults.length} total)`,
          );
        } catch (e) {
          logError(e as object, `[Huab] list_remote_refs_sync failed for remote "${remoteName}"`);
        }
      }
    };

    addFromInst(this.userInst);
    addFromInst(this.sysInst);

    const result = [...installed, ...remoteResults];
    const totalElapsed = Date.now() - startedAt;
    log(`[Huab] flatpak listAvailable total ${totalElapsed}ms`);
    return result;
  }
}
