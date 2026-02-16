declare const __VERSION__: string;
declare const __NAME__: string;

export const VERSION: string =
  typeof __VERSION__ !== "undefined" ? __VERSION__ : "0.0.0-dev";
export const NAME: string =
  typeof __NAME__ !== "undefined" ? __NAME__ : "unknown";

export const CONFIG_DIRECTORY = `~/.config/${NAME}`;
export const CONFIG_FILENAME = `${NAME}.json`;
export const STATE_DIRECTORY = `~/.local/share/${NAME}`;
