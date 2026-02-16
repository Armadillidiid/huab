# Huab

A TUI to manage system dependencies for Linux. It uses packagekit under the hood to manage packages across different distros (e.g Snap, Flatpak and AppImage). It also supports native package for only Arch Linux and its derivatives using ALPM.

With Bauh not been actively maintained, Huab is meant to be a replacement for it but in TUI form. In the future, there will be a GUI using local web dashboard.

## Roadmap

- [ ] Core TUI implementation
- [ ] PackageKit integration (Flatpak/Snap)
- [ ] ALPM backend for Arch packages
- [ ] AppImage support
- [ ] Local web dashboard (GUI)

## Inspiration

Huab takes inspiration from:

- [Bauh](https://github.com/vinifmor/bauh) - Universal package manager
- [OpenCode](https://github.com/anomalyco/opencode) - Client/server architecture
- [PackageKit](https://www.freedesktop.org/software/PackageKit/) - Cross-distro package abstraction
