import { homedir } from "node:os";
import { join } from "node:path";

declare const __VERSION__: string;

export const VERSION =
  typeof __VERSION__ !== "undefined" ? __VERSION__ : "0.0.0";
export const NAME = "huab";

export const CONFIG_DIRECTORY = `~/.config/${NAME}`;
export const CONFIG_FILENAME = `${NAME}.json`;
export const STATE_DIRECTORY = `~/.local/share/${NAME}`;

const XDG_CACHE_HOME = process.env["XDG_CACHE_HOME"];
export const CACHE_DIRECTORY = XDG_CACHE_HOME
  ? join(XDG_CACHE_HOME, NAME)
  : join(homedir(), ".cache", NAME);

export const FLATPAK_CACHE_FRESH_MS = 5 * 60 * 1000;
export const FLATPAK_CACHE_MAX_STALE_MS = 24 * 60 * 60 * 1000;
