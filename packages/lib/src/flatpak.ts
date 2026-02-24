import * as dbus from "dbus-next";
import type { Package, PackageUpdate } from "./types.ts";

const FLATPAK_SERVICE = "org.freedesktop.Flatpak";
const FLATPAK_USER_PATH = "/org/freedesktop/Flatpak/User";
const FLATPAK_IFACE = "org.freedesktop.Flatpak";

/**
 * Tuple returned by Flatpak's ListInstalledRefs D-Bus method.
 * Signature: a(ssssssia{sv})
 * Fields: [ref, origin, commit, deploy-dir, latest-commit, subpaths, installed-size, metadata]
 */
type InstalledRef = [
  string,                      // 0: ref  e.g. "app/org.mozilla.Firefox/x86_64/stable"
  string,                      // 1: origin / remote  e.g. "flathub"
  string,                      // 2: commit hash
  string,                      // 3: deploy-dir
  string,                      // 4: latest-commit
  string[],                    // 5: subpaths
  number,                      // 6: installed-size in bytes
  Record<string, unknown>,     // 7: metadata dict
];

type FlatpakUserProxy = dbus.ClientInterface & {
  ListInstalledRefs: () => Promise<InstalledRef[]>;
};

export class FlatpakClient {
  private bus: dbus.MessageBus;

  constructor() {
    this.bus = dbus.sessionBus();
  }

  async listInstalled(): Promise<Package[]> {
    const obj = await this.bus.getProxyObject(FLATPAK_SERVICE, FLATPAK_USER_PATH);
    const flatpak = obj.getInterface(FLATPAK_IFACE) as unknown as FlatpakUserProxy;
    const refs = await flatpak.ListInstalledRefs();
    return refs.map(refToPackage);
  }

  /**
   * List available Flatpak updates.
   * Full implementation deferred to a follow-up phase (Flatpak D-Bus update API
   * requires a separate transaction flow). Returns empty array for now.
   */
  async listUpdates(): Promise<PackageUpdate[]> {
    return [];
  }

  disconnect(): void {
    this.bus.disconnect();
  }
}

/**
 * Convert a raw InstalledRef tuple from the Flatpak D-Bus API into a Package.
 */
function refToPackage(ref: InstalledRef): Package {
  const refStr = ref[0]; // "app/org.mozilla.Firefox/x86_64/stable"
  const parts = refStr.split("/");
  const appId = parts[1] ?? refStr; // "org.mozilla.Firefox"
  // Derive a human-readable name from the last component of the reverse-DNS app ID
  const name = appId.split(".").at(-1) ?? appId; // "Firefox"

  return {
    id: refStr,
    name,
    // Use the commit hash as the version — it's the only version-like field
    // returned by ListInstalledRefs. A richer version string requires a separate
    // GetInstalledRef call with AppStream metadata lookup.
    version: ref[2] ?? "unknown",
    description: "",
    installedSize: ref[6],
    status: "installed",
    backend: "flatpak",
  };
}
