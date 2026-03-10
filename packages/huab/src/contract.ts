import { oc } from "@orpc/contract";
import { z } from "zod";
import { AnyPackageSchema } from "@huab/lib";

const flatpakListAvailable = oc
  .route({ method: "GET", path: "/flatpak/packages" })
  .output(z.array(AnyPackageSchema));

const listAllAvailable = oc
  .route({ method: "GET", path: "/packages" })
  .output(z.array(AnyPackageSchema));

export const router = {
  flatpak: {
    listAvailable: flatpakListAvailable,
  },
  listAllAvailable,
};
