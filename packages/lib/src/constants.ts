export const SERVICE_NAME = "org.freedesktop.Huab";
export const OBJECT_PATH = "/org/freedesktop/Huab/Manager";
export const IFACE_NAME = "org.freedesktop.Huab.Manager";

export const KNOWN_BACKENDS = [
  "flatpak",
  "packagekit",
  "alpm",
  "aur",
  "snap",
] as const;
