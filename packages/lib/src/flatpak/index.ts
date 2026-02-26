import Flatpak from "gi://Flatpak?version=1.0";
import type { Package, PackageUpdate } from "../types.js";
import type { IPackageBackend } from "../backend.js";
import { refsFromInst, updateRefsFromInst } from "./utils.js";

export class FlatpakBackend implements IPackageBackend {
  private readonly userInst: Flatpak.Installation;
  private readonly sysInst: Flatpak.Installation;

  constructor() {
    this.userInst = Flatpak.Installation.new_user(null);
    this.sysInst = Flatpak.Installation.new_system(null);
  }

  listInstalled(): Package[] {
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
}
