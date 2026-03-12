import { z } from "zod";
import { KNOWN_BACKENDS } from "./constants.ts";

// ---------------------------------------------------------------------------
// Backend discriminant
// ---------------------------------------------------------------------------

export const PackageBackendSchema = z.enum(
  KNOWN_BACKENDS as [
    (typeof KNOWN_BACKENDS)[number],
    ...(typeof KNOWN_BACKENDS)[number][],
  ],
);

export type PackageBackend = z.infer<typeof PackageBackendSchema>;

// ---------------------------------------------------------------------------
// Base package schema - minimal discriminant-only fields present on ALL backends.
// All values are JSON-serializable: no bigint, no Date.
// ---------------------------------------------------------------------------

export const PackageSchema = z.object({
  /** Backend-specific identifier */
  id: z.string(),
  /** Human-readable name, e.g. "Firefox" */
  name: z.string(),
  /** Available/latest version string */
  version: z.string(),
  backend: PackageBackendSchema,
});

export type Package = z.infer<typeof PackageSchema>;

// ---------------------------------------------------------------------------
// AppStream mixin - fields sourced from AppStream metadata.
// Only backends that consume AppStream data should extend this.
// ---------------------------------------------------------------------------

export const AppStreamPackageSchema = z.object({
  /** Short one-line summary (as_component_get_summary) */
  summary: z.string().nullable(),
  /** Full HTML/Markdown description (as_component_get_description) */
  description: z.string().nullable(),
  /** Homepage URL (as_component_get_url, homepage) */
  url: z.string().nullable(),
  /** Human-friendly app name from AppStream (as_component_get_name) */
  app_name: z.string().nullable(),
  /** AppStream app ID, e.g. "org.mozilla.Firefox" (as_component_get_id) */
  app_id: z.string().nullable(),
  /** Desktop file path for launching the app */
  launchable: z.string().nullable(),
  /** Icon path or name */
  icon: z.string().nullable(),
  /** Screenshot URLs */
  screenshots: z.array(z.string()),
  /** License string (as_component_get_project_license) */
  license: z.string().nullable(),
  /** AppStream keywords (as_component_get_search_tokens) */
  keywords: z.array(z.string()),
  /** AppStream categories, e.g. ["Graphics", "Utility"] */
  categories: z.array(z.string()),
  /** Human-readable developer or author name (as_component_get_developer) */
  developer: z.string().nullable(),
  /** Donation URL from AppStream metadata */
  donation_url: z.string().nullable(),
  /** Whether the app is Free/Libre Open Source Software (as_component_is_floss) */
  is_floss: z.boolean(),
});

export type AppStreamPackage = z.infer<typeof AppStreamPackageSchema>;

// ---------------------------------------------------------------------------
// Flatpak - extends both base Package and the AppStream mixin,
// plus all shared rich fields and Flatpak-specific libflatpak fields.
// ---------------------------------------------------------------------------

// TODO: stuff appstream schema under "appstream" key as not all packages will have it.
export const FlatpakPackageSchema = PackageSchema.extend(
  AppStreamPackageSchema.shape,
).extend({
  backend: z.literal("flatpak"),
  /** Currently installed version (null if not installed) */
  installed_version: z.string().nullable(),
  /** Repository/remote origin, e.g. "flathub" */
  repo: z.string().nullable(),
  /** Installed size in bytes */
  installed_size: z.number(),
  /** Download size in bytes */
  download_size: z.number(),
  /** ISO-8601 install date (null if not installed) */
  install_date: z.string().nullable(),
  /** CPU architecture, e.g. "x86_64" (flatpak_ref_get_arch) */
  arch: z.string(),
  /** Branch/channel, e.g. "stable" (flatpak_ref_get_branch) */
  branch: z.string(),
  /** Full formatted ref string (flatpak_ref_format_ref) */
  ref: z.string(),
  /** Runtime from metadata key file Application group (null if unavailable) */
  runtime: z.string().nullable(),
  /** Launch command from metadata key file Application group (null if unavailable) */
  command: z.string().nullable(),
  /** End-of-life message (null if not EOL) */
  eol: z.string().nullable(),
  /** The kind of artifact that a FlatpakRef refers to. */
  kind: z.int(),
});

export type FlatpakPackage = z.infer<typeof FlatpakPackageSchema>;

// ---------------------------------------------------------------------------
// Alpm (Arch/Manjaro native packages)
// ---------------------------------------------------------------------------

export const AlpmPackageSchema = PackageSchema.extend({
  backend: z.literal("alpm"),
  /** ISO-8601 build date */
  build_date: z.string().nullable(),
  /** Who packaged it */
  packager: z.string().nullable(),
  /** "explicit" | "dependency" */
  reason: z.string().nullable(),
  groups: z.array(z.string()),
  depends: z.array(z.string()),
  optdepends: z.array(z.string()),
  makedepends: z.array(z.string()),
  checkdepends: z.array(z.string()),
  requiredby: z.array(z.string()),
  optionalfor: z.array(z.string()),
  provides: z.array(z.string()),
  replaces: z.array(z.string()),
  conflicts: z.array(z.string()),
  /** e.g. ["MD5 Sum", "SHA-256 Sum", "Signature"] */
  validations: z.array(z.string()),
});

export type AlpmPackage = z.infer<typeof AlpmPackageSchema>;

// ---------------------------------------------------------------------------
// AUR - extends Alpm with AUR-specific metadata
// ---------------------------------------------------------------------------

export const AURPackageSchema = AlpmPackageSchema.omit({
  backend: true,
}).extend({
  backend: z.literal("aur"),
  packagebase: z.string().nullable(),
  maintainer: z.string().nullable(),
  popularity: z.number(),
  /** ISO-8601 last modified date */
  lastmodified: z.string().nullable(),
  /** ISO-8601 flagged out-of-date date (null if current) */
  outofdate: z.string().nullable(),
  /** ISO-8601 first submitted date */
  firstsubmitted: z.string().nullable(),
  numvotes: z.number(),
});

export type AURPackage = z.infer<typeof AURPackageSchema>;

// ---------------------------------------------------------------------------
// Snap
// ---------------------------------------------------------------------------

export const SnapPackageSchema = PackageSchema.extend({
  backend: z.literal("snap"),
  /** Current channel, e.g. "stable", "edge" */
  channel: z.string().nullable(),
  publisher: z.string().nullable(),
  /** Confinement status: "strict" | "classic" | "devmode" */
  confined: z.string().nullable(),
  /** Available channels */
  channels: z.array(z.string()),
});

export type SnapPackage = z.infer<typeof SnapPackageSchema>;

// ---------------------------------------------------------------------------
// Discriminated union of all concrete package types
// ---------------------------------------------------------------------------

export const AnyPackageSchema = z.discriminatedUnion("backend", [
  FlatpakPackageSchema,
  AlpmPackageSchema,
  AURPackageSchema,
  SnapPackageSchema,
]);

export type AnyPackage = z.infer<typeof AnyPackageSchema>;

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/**
 * Convert a D-Bus interface to async/Promise-based equivalent.
 */
export type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : Promise<Awaited<T[K]>>;
};
