From Flatpak (libflatpak) — **not AppStream** — Bazaar reads these fields in `src/bz-flatpak-entry.c`:

**From the Flatpak ref itself**
- **Name / app ID**: `flatpak_ref_get_name(ref)`  
  `src/bz-flatpak-entry.c:488-492`
- **Version/branch**: `flatpak_ref_get_branch(ref)`  
  `src/bz-flatpak-entry.c:489-490`
- **Full ref string**: `flatpak_ref_format_ref(ref)`  
  `src/bz-flatpak-entry.c:489`
- **Remote/origin**:  
  - `flatpak_remote_get_name(remote)` or  
  - `flatpak_bundle_ref_get_origin(...)` or  
  - `flatpak_installed_ref_get_origin(...)`  
  `src/bz-flatpak-entry.c:496-501`

**Sizes**
- **Download size** (remote ref): `flatpak_remote_ref_get_download_size(...)`  
  `src/bz-flatpak-entry.c:503-505`
- **Installed size** (remote/bundle/installed ref):  
  `flatpak_remote_ref_get_installed_size`, `flatpak_bundle_ref_get_installed_size`, `flatpak_installed_ref_get_installed_size`  
  `src/bz-flatpak-entry.c:520-525`

**EOL**
- **End-of-life**: `flatpak_remote_ref_get_eol(...)` / `flatpak_installed_ref_get_eol(...)`  
  `src/bz-flatpak-entry.c:617-620`

**Metadata key file from ref**
Loaded via `flatpak_*_get_metadata()` / `flatpak_installed_ref_load_metadata()` into a `GKeyFile` and then used to read:
- **Application group**: `name`, `runtime`, optional `command`  
  `src/bz-flatpak-entry.c:456-464`
- **ExtensionOf group**: `ref`  
  `src/bz-flatpak-entry.c:466-469`
- **Runtime group**: `name`  
  `src/bz-flatpak-entry.c:472-475`

**Icons**
- **Bundle icons**: `flatpak_bundle_ref_get_icon(...)`  
  `src/bz-flatpak-entry.c:552-563`
- **Installed icon theme lookup** (not AppStream):  
  `src/bz-flatpak-entry.c:566-593`

So yes — Flatpak provides **name/appid**, **branch (version)**, **origin**, **sizes**, **EOL**, and **metadata groups** (Application/Runtime/ExtensionOf), plus bundle/installed icons. AppStream is layered on top for richer description, screenshots, developer, etc.
