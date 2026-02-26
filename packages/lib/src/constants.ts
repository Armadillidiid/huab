export const SERVICE_NAME = "org.freedesktop.Huab";
export const OBJECT_PATH = "/org/freedesktop/Huab/Manager";
export const IFACE_NAME = "org.freedesktop.Huab.Manager";

export const BACKENDS = {
  flatpak: "flatpak",
  packagekit: "packagekit",
  alpm: "alpm",
  aur: "aur",
  snap: "snap",
} as const;

export const KNOWN_BACKENDS = Object.values(BACKENDS);
