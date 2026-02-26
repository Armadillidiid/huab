import GLib from 'gi://GLib?version=2.0';
import GLibUnix from 'gi://GLibUnix?version=2.0';
import Gio from 'gi://Gio?version=2.0';
import System from 'system';
import { SERVICE_NAME, OBJECT_PATH } from './constants.js';
import { FlatpakManager } from './flatpak-manager.js';

// ---------------------------------------------------------------------------
// D-Bus name ownership + object export
// ---------------------------------------------------------------------------

const manager = new FlatpakManager();

Gio.bus_own_name(
  Gio.BusType.SESSION,
  SERVICE_NAME,
  Gio.BusNameOwnerFlags.NONE,
  // on_bus_acquired
  (conn: Gio.DBusConnection) => {
    manager.dbus.export(conn, OBJECT_PATH);
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
