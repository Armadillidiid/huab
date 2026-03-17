import { oc } from "@orpc/contract";
import { z } from "zod";
import {
  AnyPackageSchema,
  FlatpakPackageSchema,
} from "@huab/lib";
import {
  CacheRefreshFailedEventSchema,
  CacheRefreshStartedEventSchema,
  CacheUpdatedEventSchema,
  SystemHeartbeatEventSchema,
} from "./events/schema.ts";

const flatpakListAvailable = oc
  .route({ method: "GET", path: "/flatpak/packages" })
  .output(z.array(FlatpakPackageSchema));

const listAllAvailable = oc
  .route({ method: "GET", path: "/packages" })
  .output(z.array(AnyPackageSchema));

const flatpakRefresh = oc
  .route({ method: "POST", path: "/flatpak/packages/refresh" })
  .output(z.object({ ok: z.literal(true) }));

export const router = {
  flatpak: {
    listAvailable: flatpakListAvailable,
    refresh: flatpakRefresh,
  },
  listAllAvailable,
};

export const eventSchemas = {
  cacheRefreshStarted: CacheRefreshStartedEventSchema,
  cacheUpdated: CacheUpdatedEventSchema,
  cacheRefreshFailed: CacheRefreshFailedEventSchema,
  heartbeat: SystemHeartbeatEventSchema,
};
