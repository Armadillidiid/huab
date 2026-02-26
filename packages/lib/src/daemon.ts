import GLib from 'gi://GLib?version=2.0';
import GLibUnix from 'gi://GLibUnix?version=2.0';
import Gio from 'gi://Gio?version=2.0';
import Flatpak from 'gi://Flatpak?version=1.0';
import System from 'system';
import type { Package, PackageUpdate } from './types.js';

const SERVICE_NAME = 'org.freedesktop.Huab';
const OBJECT_PATH  = '/org/freedesktop/Huab/Manager';
const IFACE_NAME   = 'org.freedesktop.Huab.Manager';

const IFACE_XML = `
<node>
  <interface name="${IFACE_NAME}">
    <method name="ListInstalled">
      <arg direction="out" type="s" name="packages"/>
    </method>
    <method name="ListUpdates">
      <arg direction="out" type="s" name="updates"/>
    </method>
  </interface>
</node>`;

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

const userInst = Flatpak.Installation.new_user(null);
const sysInst  = Flatpak.Installation.new_system(null);

// ---------------------------------------------------------------------------
// Method implementations
// ---------------------------------------------------------------------------

const methods: Record<string, () => string> = {
  ListInstalled() {
    const packages = [...refsFromInst(userInst), ...refsFromInst(sysInst)];
    return JSON.stringify(packages);
  },

  ListUpdates() {
    const installed    = [...refsFromInst(userInst), ...refsFromInst(sysInst)];
    const installedMap = new Map(installed.map(p => [p.name, p]));
    const updates: PackageUpdate[] = [
      ...updateRefsFromInst(userInst, installedMap),
      ...updateRefsFromInst(sysInst,  installedMap),
    ];
    return JSON.stringify(updates);
  },
};

// ---------------------------------------------------------------------------
// D-Bus registration
// ---------------------------------------------------------------------------

const nodeInfo  = Gio.DBusNodeInfo.new_for_xml(IFACE_XML);
const ifaceInfo = nodeInfo.lookup_interface(IFACE_NAME)!;

/** Build the out-signature tuple string for a method, e.g. "(s)" */
function outSig(methodName: string): string {
  const m = ifaceInfo.lookup_method(methodName)!;
  const types = m.out_args.map(a => a.signature);
  return `(${types.join('')})`;
}

const vtable = {
  method_call(
    _conn: Gio.DBusConnection,
    _sender: string | null,
    _objPath: string,
    _ifaceName: string | null,
    methodName: string,
    _params: GLib.Variant,
    invocation: Gio.DBusMethodInvocation,
  ) {
    const fn = methods[methodName];
    if (!fn) {
      invocation.return_error_literal(
        Gio.dbus_error_quark(),
        Gio.DBusError.UNKNOWN_METHOD,
        `Unknown method: ${methodName}`,
      );
      return;
    }
    try {
      const result = fn();
      invocation.return_value(new GLib.Variant(outSig(methodName), [result]));
    } catch (e) {
      logError(e as object, `[Huab] ${methodName} threw`);
      invocation.return_error_literal(
        Gio.io_error_quark(),
        Gio.IOErrorEnum.FAILED,
        (e as Error).message,
      );
    }
  },
};

Gio.bus_own_name(
  Gio.BusType.SESSION,
  SERVICE_NAME,
  Gio.BusNameOwnerFlags.NONE,
  // on_bus_acquired
  (conn: Gio.DBusConnection) => {
    conn.register_object(
      OBJECT_PATH,
      ifaceInfo,
      // GJS closure-based form: pass method_call handler, null for property accessors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vtable.method_call as any,
      null,
      null,
    );
    log(`[Huab] Exported Manager at ${OBJECT_PATH}`);
  },
  // on_name_acquired
  () => log(`[Huab] Acquired name: ${SERVICE_NAME}`),
  // on_name_lost
  () => {
    logError(new Error(`[Huab] Lost bus name: ${SERVICE_NAME}`));
    System.exit(1);
  },
);

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------

log('[Huab] Manager daemon starting…');

const loop = GLib.MainLoop.new(null, false);

GLibUnix.signal_add_full(GLib.PRIORITY_DEFAULT, /* SIGINT  */ 2, () => {
  log('[Huab] Shutting down (SIGINT)');
  loop.quit();
  return GLib.SOURCE_REMOVE;
});

GLibUnix.signal_add_full(GLib.PRIORITY_DEFAULT, /* SIGTERM */ 15, () => {
  log('[Huab] Shutting down (SIGTERM)');
  loop.quit();
  return GLib.SOURCE_REMOVE;
});

loop.run();
