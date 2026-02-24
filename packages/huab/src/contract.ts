import { oc } from "@orpc/contract";
import { z } from "zod";

// ── Shared schemas ─────────────────────────────────────────────────────────

export const PackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  description: z.string(),
  iconUrl: z.string().optional(),
  installedSize: z.number().int().optional(),
  status: z.enum(["installed", "not_installed", "update_available"]),
  backend: z.enum(["flatpak", "packagekit", "alpm"]),
});

export const PackageUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  currentVersion: z.string(),
  newVersion: z.string(),
  backend: z.enum(["flatpak", "packagekit", "alpm"]),
});

// ── Flatpak contracts ───────────────────────────────────────────────────────

const flatpakListInstalled = oc
  .route({ method: "GET", path: "/flatpak/packages" })
  .output(z.array(PackageSchema));

const flatpakListUpdates = oc
  .route({ method: "GET", path: "/flatpak/updates" })
  .output(z.array(PackageUpdateSchema));

// ── Router ──────────────────────────────────────────────────────────────────

export const router = {
  flatpak: {
    listInstalled: flatpakListInstalled,
    listUpdates: flatpakListUpdates,
  },
};
