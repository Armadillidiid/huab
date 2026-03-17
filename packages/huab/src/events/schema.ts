import { z } from "zod";

export const CacheReasonSchema = z.enum(["startup", "stale-read", "manual", "miss", "expired"]);

const EventBaseSchema = z.object({
  ts: z.string(),
});

export const CacheRefreshStartedEventSchema = EventBaseSchema.extend({
  type: z.literal("cache.refresh_started"),
  backend: z.literal("flatpak"),
  key: z.literal("flatpak:listAvailable"),
  reason: CacheReasonSchema,
});

export const CacheUpdatedEventSchema = EventBaseSchema.extend({
  type: z.literal("cache.updated"),
  backend: z.literal("flatpak"),
  key: z.literal("flatpak:listAvailable"),
  revision: z.string(),
});

export const CacheRefreshFailedEventSchema = EventBaseSchema.extend({
  type: z.literal("cache.refresh_failed"),
  backend: z.literal("flatpak"),
  key: z.literal("flatpak:listAvailable"),
  reason: CacheReasonSchema,
  error: z.string(),
});

export const SystemHeartbeatEventSchema = EventBaseSchema.extend({
  type: z.literal("system.heartbeat"),
});

export const HuabEventSchema = z.discriminatedUnion("type", [
  CacheRefreshStartedEventSchema,
  CacheUpdatedEventSchema,
  CacheRefreshFailedEventSchema,
  SystemHeartbeatEventSchema,
]);

export type HuabEvent = z.infer<typeof HuabEventSchema>;
