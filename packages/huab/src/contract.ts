import { oc } from "@orpc/contract";
import { z } from "zod";
import { AnyPackageSchema, FlatpakPackageSchema } from "@huab/lib";
import {
  CacheRefreshFailedEventSchema,
  CacheRefreshStartedEventSchema,
  CacheUpdatedEventSchema,
  SystemHeartbeatEventSchema,
} from "./events/schema.ts";

const flatpakListAvailable = oc
  .route({
    method: "GET",
    path: "/flatpak/packages",
    summary: "List all Flatpak packages (installed + available)",
  })
  .output(z.array(FlatpakPackageSchema));

const listAllAvailable = oc
  .route({
    method: "GET",
    path: "/packages",
    summary: "List all packages across all backends",
  })
  .output(z.array(AnyPackageSchema));

const flatpakRefresh = oc
  .route({
    method: "POST",
    path: "/flatpak/packages/refresh",
    summary: "Force refresh the Flatpak package cache, forcing a reload.",
  })
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
