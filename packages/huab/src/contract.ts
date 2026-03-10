import { oc } from "@orpc/contract";
import { z } from "zod";

export const PackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  installed_version: z.string().nullable(),
  desc: z.string().nullable(),
  repo: z.string().nullable(),
  icon: z.string().nullable(),
  backend: z.enum(["flatpak", "snap", "alpm", "aur"]),
});

const flatpakListAvailable = oc
  .route({ method: "GET", path: "/flatpak/packages" })
  .output(z.array(PackageSchema));

const listAllAvailable = oc
  .route({ method: "GET", path: "/packages" })
  .output(z.array(PackageSchema));

// Router

export const router = {
  flatpak: {
    listAvailable: flatpakListAvailable,
  },
  listAllAvailable,
};
