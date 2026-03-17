import { rename } from "node:fs/promises";
import { ensureCacheDirs, cacheEntryPath } from "./cache-paths.ts";

export interface CacheEnvelope<T> {
  key: string;
  updatedAt: number;
  staleAt: number;
  expiresAt: number;
  revision: string;
  data: T;
}

export async function readCacheEnvelope<T>(key: string): Promise<CacheEnvelope<T> | null> {
  await ensureCacheDirs();
  const path = cacheEntryPath(key);
  try {
    const file = Bun.file(path);
    if (!(await file.exists())) return null;
    const raw = await file.text();
    return JSON.parse(raw) as CacheEnvelope<T>; // TODO: Create a zod schema for this and validate the parsed data
  } catch {
    return null;
  }
}

export async function writeCacheEnvelope<T>(
  key: string,
  envelope: CacheEnvelope<T>,
): Promise<void> {
  await ensureCacheDirs();
  const path = cacheEntryPath(key);
  const tempPath = `${path}.${process.pid}.tmp`;
  await Bun.write(tempPath, JSON.stringify(envelope));
  await rename(tempPath, path);
}

export function cacheState(
  now: number,
  envelope: CacheEnvelope<unknown>,
): "fresh" | "stale" | "expired" {
  if (now <= envelope.staleAt) return "fresh";
  if (now <= envelope.expiresAt) return "stale";
  return "expired";
}

export function computeRevision(payload: unknown): string {
  const text = JSON.stringify(payload);
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
