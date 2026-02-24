import { spawnSync } from "child_process";
import type { Package, PackageUpdate } from "./types.ts";

/**
 * Parse the tab-separated output of:
 *   flatpak list --app --columns=ref,origin,version,size
 *
 * Each line: "<ref>\t<origin>\t<version>\t<size>"
 * e.g.  "app/org.mozilla.Firefox/x86_64/stable\tflathub\t125.0\t210.5 MB"
 *
 * Note: `flatpak list` without --app also returns runtimes (kind=runtime).
 * We only care about apps here, so we pass --app.
 */
function parseFlatpakList(stdout: string): Package[] {
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [ref = "", origin = "", version = "", sizeStr = ""] =
        line.split("\t");

      // ref format: "app/<app-id>/<arch>/<branch>" or just "<app-id>/<arch>/<branch>"
      const parts = ref.split("/");
      // Handle both "app/com.example.Foo/x86_64/stable" and "com.example.Foo/x86_64/stable"
      const appId =
        parts[0] === "app" ? (parts[1] ?? ref) : (parts[0] ?? ref);
      const name = appId.split(".").at(-1) ?? appId;

      return {
        id: ref,
        name,
        version: version || "unknown",
        description: "",
        // Parse size string like "210.5 MB" into bytes (best-effort)
        installedSize: parseSizeToBytes(sizeStr),
        status: "installed" as const,
        backend: "flatpak" as const,
        origin: origin || undefined,
      };
    });
}

/**
 * Parse a human-readable size string like "210.5 MB", "1.2 GB", "512 kB"
 * into bytes. Returns 0 if unparseable.
 */
function parseSizeToBytes(s: string): number {
  const m = s.match(/^([\d.]+)\s*(B|kB|MB|GB|TB)?$/i);
  if (!m) return 0;
  const n = parseFloat(m[1] ?? "0");
  switch ((m[2] ?? "B").toUpperCase()) {
    case "KB":
      return Math.round(n * 1_000);
    case "MB":
      return Math.round(n * 1_000_000);
    case "GB":
      return Math.round(n * 1_000_000_000);
    case "TB":
      return Math.round(n * 1_000_000_000_000);
    default:
      return Math.round(n);
  }
}

export class FlatpakClient {
  async listInstalled(): Promise<Package[]> {
    const result = spawnSync(
      "flatpak",
      ["list", "--app", "--columns=ref,origin,version,size"],
      { encoding: "utf8" },
    );

    if (result.error) {
      throw new Error(`Failed to run flatpak: ${result.error.message}`);
    }
    if (result.status !== 0) {
      throw new Error(
        `flatpak list exited with status ${result.status}: ${result.stderr}`,
      );
    }

    return parseFlatpakList(result.stdout);
  }

  /**
   * List available Flatpak updates.
   * Full implementation deferred to a follow-up phase.
   */
  async listUpdates(): Promise<PackageUpdate[]> {
    return [];
  }

  /** No-op: no persistent connection to close. */
  disconnect(): void {}
}
