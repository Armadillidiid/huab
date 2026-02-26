import Gio from 'gi://Gio?version=2.0';
import Flatpak from 'gi://Flatpak?version=1.0';
import type { Package, PackageUpdate } from './types.js';
import { MANAGER_IFACE_XML, type ManagerIface } from './manager-iface.js';

// ---------------------------------------------------------------------------
// Flatpak helpers
// ---------------------------------------------------------------------------

function refsFromInst(inst: Flatpak.Installation): Package[] {
  try {
    return inst.list_installed_refs(null)
      .filter(r => r.get_kind() === Flatpak.RefKind.APP)
      .map(r => ({
        id:            `app/${r.get_name()}/${r.get_arch()}/${r.get_branch()}`,
        name:          r.get_name().split('.').at(-1) ?? r.get_name(),
        version:       r.get_appdata_version() || 'unknown',
        description:   '',
        installedSize: r.get_installed_size(),
        origin:        r.get_origin() || undefined,
        status:        'installed' as const,
        backend:       'flatpak' as const,
      }));
  } catch (e) {
    logError(e as object, '[Huab] list_installed_refs failed');
    return [];
  }
}

function updateRefsFromInst(
  inst: Flatpak.Installation,
  installedMap: Map<string, Package>,
): PackageUpdate[] {
  try {
    return inst.list_installed_refs_for_update(null)
      .filter(r => r.get_kind() === Flatpak.RefKind.APP)
      .flatMap(r => {
        const shortName = r.get_name().split('.').at(-1) ?? r.get_name();
        const pkg = installedMap.get(shortName);
        if (!pkg) return [];
        return [{
          id:             pkg.id,
          name:           pkg.name,
          currentVersion: pkg.version,
          newVersion:     'update available',
          backend:        'flatpak' as const,
        }];
      });
  } catch (e) {
    logError(e as object, '[Huab] list_installed_refs_for_update failed');
    return [];
  }
}

// ---------------------------------------------------------------------------
// FlatpakManager — D-Bus service object
// ---------------------------------------------------------------------------

export class FlatpakManager implements ManagerIface {
  readonly dbus: Gio.DBusExportedObject;

  private readonly userInst: Flatpak.Installation;
  private readonly sysInst: Flatpak.Installation;

  constructor() {
    this.userInst = Flatpak.Installation.new_user(null);
    this.sysInst  = Flatpak.Installation.new_system(null);

    // GJS routes D-Bus method calls to same-named methods on this object.
    this.dbus = Gio.DBusExportedObject.wrapJSObject(MANAGER_IFACE_XML, this);
  }

  ListInstalled(): string {
    const packages = [
      ...refsFromInst(this.userInst),
      ...refsFromInst(this.sysInst),
    ];
    return JSON.stringify(packages);
  }

  ListUpdates(): string {
    const installed    = [
      ...refsFromInst(this.userInst),
      ...refsFromInst(this.sysInst),
    ];
    const installedMap = new Map(installed.map(p => [p.name, p]));
    const updates: PackageUpdate[] = [
      ...updateRefsFromInst(this.userInst, installedMap),
      ...updateRefsFromInst(this.sysInst,  installedMap),
    ];
    return JSON.stringify(updates);
  }
}
