import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { CACHE_DIRECTORY } from "../constants.ts";

export const CACHE_ROOT = CACHE_DIRECTORY;
export const CACHE_ENTRIES_DIR = join(CACHE_ROOT, "entries");

export function cacheEntryPath(key: string): string {
  return join(CACHE_ENTRIES_DIR, `${sanitizeKey(key)}.json`);
}

export async function ensureCacheDirs(): Promise<void> {
  await mkdir(CACHE_ENTRIES_DIR, { recursive: true });
}

function sanitizeKey(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9_-]/g, "_");
}
