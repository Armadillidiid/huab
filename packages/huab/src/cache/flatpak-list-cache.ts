import type { FlatpakPackage } from "@huab/lib";
import { FlatpakPackageSchema } from "@huab/lib";
import { FLATPAK_CACHE_FRESH_MS, FLATPAK_CACHE_MAX_STALE_MS } from "../constants.ts";
import { emitEvent } from "../events/event-bus.ts";
import {
  cacheState,
  computeRevision,
  readCacheEnvelope,
  writeCacheEnvelope,
} from "./disk-cache.ts";

const CACHE_KEY = "flatpak:listAvailable";
const FlatpakPackagesSchema = FlatpakPackageSchema.array();

type RefreshReason = "startup" | "stale-read" | "manual" | "miss" | "expired";

const inFlight = new Map<string, Promise<FlatpakPackage[]>>();

function nowIso(): string {
  return new Date().toISOString();
}

function sanitizeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function persist(payload: FlatpakPackage[]): Promise<FlatpakPackage[]> {
  const now = Date.now();
  await writeCacheEnvelope(CACHE_KEY, {
    key: CACHE_KEY,
    updatedAt: now,
    staleAt: now + FLATPAK_CACHE_FRESH_MS,
    expiresAt: now + FLATPAK_CACHE_MAX_STALE_MS,
    revision: computeRevision(payload),
    data: payload,
  });
  return payload;
}

async function runRefresh(
  loader: () => Promise<FlatpakPackage[]>,
  reason: RefreshReason,
): Promise<FlatpakPackage[]> {
  const existing = inFlight.get(CACHE_KEY);
  if (existing) return existing;

  emitEvent({
    type: "cache.refresh_started",
    ts: nowIso(),
    backend: "flatpak",
    key: CACHE_KEY,
    reason,
  });

  const promise = loader()
    .then((loaded) => loaded.map((item) => FlatpakPackageSchema.parse(item)))
    .then(persist)
    .then((payload) => {
      emitEvent({
        type: "cache.updated",
        ts: nowIso(),
        backend: "flatpak",
        key: CACHE_KEY,
        revision: computeRevision(payload),
      });
      return payload;
    })
    .catch((error: unknown) => {
      emitEvent({
        type: "cache.refresh_failed",
        ts: nowIso(),
        backend: "flatpak",
        key: CACHE_KEY,
        reason,
        error: sanitizeError(error),
      });
      throw error;
    })
    .finally(() => {
      inFlight.delete(CACHE_KEY);
    });

  inFlight.set(CACHE_KEY, promise);
  return promise;
}

export interface FlatpakCachedResult {
  packages: FlatpakPackage[];
  cache: "miss" | "fresh" | "stale";
}

export async function getFlatpakPackagesCached(
  loader: () => Promise<FlatpakPackage[]>,
): Promise<FlatpakCachedResult> {
  const envelope = await readCacheEnvelope<FlatpakPackage[]>(CACHE_KEY);
  if (!envelope) {
    return {
      packages: await runRefresh(loader, "miss"),
      cache: "miss",
    };
  }

  const parsed = FlatpakPackagesSchema.safeParse(envelope.data);
  if (!parsed.success) {
    return {
      packages: await runRefresh(loader, "expired"),
      cache: "miss",
    };
  }

  const state = cacheState(Date.now(), envelope);
  if (state === "fresh") {
    return { packages: parsed.data, cache: "fresh" };
  }

  if (state === "stale") {
    runRefresh(loader, "stale-read").catch(() => {});
    return { packages: parsed.data, cache: "stale" };
  }

  return {
    packages: await runRefresh(loader, "expired"),
    cache: "miss",
  };
}

export async function refreshFlatpakPackages(
  loader: () => Promise<FlatpakPackage[]>,
): Promise<FlatpakPackage[]> {
  return runRefresh(loader, "manual");
}
