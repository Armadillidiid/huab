import Flatpak from "gi://Flatpak?version=1.0";
import type { FlatpakPackage } from "../../types.ts";
import type { IPackageBackend } from "../backend.ts";
import { refsFromInst, remoteRefsFromInst } from "./utils.ts";

export class FlatpakBackend implements IPackageBackend {
  private readonly userInst: Flatpak.Installation;
  private readonly sysInst: Flatpak.Installation;

  constructor() {
    this.userInst = Flatpak.Installation.new_user(null);
    this.sysInst = Flatpak.Installation.new_system(null);
  }

  /**
   * Returns installed packages from both user and system installations.
   * Used internally by listAvailable to enrich results with installed_version.
   */
  private listInstalled(): FlatpakPackage[] {
    return [...refsFromInst(this.userInst), ...refsFromInst(this.sysInst)];
  }

  /**
   * List all APP refs available from all configured remotes.
   * Installed packages appear first (with installed_version set).
   * Remote-only refs follow, with installed_version: null.
   * NOTE: This fetches from remotes and may be slow on first call.
   */
  listAvailable(): FlatpakPackage[] {
    const installed = this.listInstalled();
    const installedById = new Map(installed.map((p) => [p.id, p]));

    const remoteResults: FlatpakPackage[] = [];
    const seenRemote = new Set<string>();

    const addFromInst = (inst: Flatpak.Installation) => {
      for (const remote of inst.list_remotes(null)) {
        if (remote.get_disabled()) continue;
        const remoteName = remote.get_name();
        for (const pkg of remoteRefsFromInst(inst, remoteName)) {
          if (!seenRemote.has(pkg.id) && !installedById.has(pkg.id)) {
            seenRemote.add(pkg.id);
            remoteResults.push(pkg);
          }
        }
      }
    };

    addFromInst(this.userInst);
    addFromInst(this.sysInst);

    return [...installed, ...remoteResults];
  }
}
