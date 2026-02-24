[Flatpak documentation](https://docs.flatpak.org/en/latest/index.html)

- [Introduction to Flatpak](https://docs.flatpak.org/en/latest/introduction.html)
- [Getting Started](https://docs.flatpak.org/en/latest/getting-started.html)[ ]
  - [Basic concepts](https://docs.flatpak.org/en/latest/basic-concepts.html)
  - [Using Flatpak](https://docs.flatpak.org/en/latest/using-flatpak.html)
  - [Building your first Flatpak](https://docs.flatpak.org/en/latest/first-build.html)
- [Building](https://docs.flatpak.org/en/latest/building.html)[ ]
  - [Building Introduction](https://docs.flatpak.org/en/latest/building-introduction.html)
  - [Requirements & Conventions](https://docs.flatpak.org/en/latest/conventions.html)
  - [Dependencies](https://docs.flatpak.org/en/latest/dependencies.html)
  - [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html)
  - [Manifests](https://docs.flatpak.org/en/latest/manifests.html)
  - [Module Sources](https://docs.flatpak.org/en/latest/module-sources.html)
  - [Sandbox Permissions](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
  - [Guides](https://docs.flatpak.org/en/latest/guides.html)[ ]
    - [Python](https://docs.flatpak.org/en/latest/python.html)
    - [Electron](https://docs.flatpak.org/en/latest/electron.html)
    - [Dotnet](https://docs.flatpak.org/en/latest/dotnet.html)
    - [Qt](https://docs.flatpak.org/en/latest/qt.html)
    - [Multiarch support](https://docs.flatpak.org/en/latest/multiarch.html)
    - [Extensions](https://docs.flatpak.org/en/latest/extension.html)
- [Debugging](https://docs.flatpak.org/en/latest/debugging.html)
- [Publishing](https://docs.flatpak.org/en/latest/publishing.html)[ ]
  - [Repositories](https://docs.flatpak.org/en/latest/repositories.html)
  - [Hosting a repository](https://docs.flatpak.org/en/latest/hosting-a-repository.html)
  - [Single-file bundles](https://docs.flatpak.org/en/latest/single-file-bundles.html)
  - [USB Drives](https://docs.flatpak.org/en/latest/usb-drives.html)
- [Desktop Integration](https://docs.flatpak.org/en/latest/desktop-integration.html)[ ]
  - [Portal support in GTK](https://docs.flatpak.org/en/latest/portals.html)
  - [Portal support in Qt and KDE](https://docs.flatpak.org/en/latest/portals.html#portal-support-in-qt-and-kde)
- [Flatpak as a developer platform](https://docs.flatpak.org/en/latest/flatpak-devel.html)
- [Tips and Tricks](https://docs.flatpak.org/en/latest/tips-and-tricks.html)
- [Reference Documentation](https://docs.flatpak.org/en/latest/reference.html)[x]
  - [Flatpak Command Reference](https://docs.flatpak.org/en/latest/flatpak-command-reference.html)
  - [Flatpak Builder Command Reference](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
  - [Available Runtimes](https://docs.flatpak.org/en/latest/available-runtimes.html)
  - [Under the Hood](https://docs.flatpak.org/en/latest/under-the-hood.html)
  - [libflatpak API Reference](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)
  - [Portal API Reference](https://docs.flatpak.org/en/latest/portal-api-reference.html)

[Back to top](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

[View this page](https://github.com/flatpak/flatpak-docs/blob/master/docs/libflatpak-api-reference.rst?plain=true "View this page")

[Edit this page](https://github.com/flatpak/flatpak-docs/edit/master/docs/libflatpak-api-reference.rst "Edit this page")

# libflatpak API Reference [🔗](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html\#libflatpak-api-reference "Link to this heading")

Flatpak Library Reference Manual

# Flatpak Library Reference Manual

For flatpak 1.17.0



* * *

**Table of Contents**

[Flatpak](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#id1337)[FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation) — Installation information[FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote) — Remote repository[FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation) — Operation in a transaction[FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress) — Progress of an operation[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction) — Transaction information[FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef) — Application reference[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef) — Installed application reference[FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef) — Related application reference[FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef) — Remote application reference[FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef) — Application bundle reference[FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance) — Information about a running sandbox[Error codes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Error-codes)[Version information](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Version-information)[D-Bus APIs](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#id1338)[org.freedesktop.Flatpak.Authenticator](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.Authenticator)[org.freedesktop.Flatpak.AuthenticatorRequest](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.AuthenticatorRequest)[org.freedesktop.Flatpak.Development](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.Development) — Flatpak development interface[org.freedesktop.Flatpak.SessionHelper](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.SessionHelper) — Flatpak session service[org.freedesktop.Flatpak.SystemHelper](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.SystemHelper) — Flatpak system service[org.freedesktop.impl.portal.PermissionStore](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.impl.portal.PermissionStore) — Database to store permissions[org.freedesktop.portal.Documents](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.portal.Documents) — Document portal[org.freedesktop.portal.Flatpak](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.portal.Flatpak) — Flatpak portal[org.freedesktop.portal.Flatpak.UpdateMonitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.portal.Flatpak.UpdateMonitor)[Object Hierarchy](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#object-tree)[API Index](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#full-api-index)[Index of deprecated API](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#deprecated-api-index)[Annotation Glossary](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#annotation-glossary)

# Flatpak

**Table of Contents**

[FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation) — Installation information[FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote) — Remote repository[FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation) — Operation in a transaction[FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress) — Progress of an operation[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction) — Transaction information[FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef) — Application reference[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef) — Installed application reference[FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef) — Related application reference[FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef) — Remote application reference[FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef) — Application bundle reference[FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance) — Information about a running sandbox[Error codes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Error-codes)[Version information](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Version-information)

## Name

FlatpakInstallation — Installation information

## Functions

|     |     |
| --- | --- |
| [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") \* | [flatpak\_installation\_new\_system](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-system "flatpak_installation_new_system ()")() |
| [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") \* | [flatpak\_installation\_new\_system\_with\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-system-with-id "flatpak_installation_new_system_with_id ()")() |
| [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") \* | [flatpak\_installation\_new\_user](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-user "flatpak_installation_new_user ()")() |
| [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") \* | [flatpak\_installation\_new\_for\_path](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-for-path "flatpak_installation_new_for_path ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_get\_is\_user](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-is-user "flatpak_installation_get_is_user ()")() |
| [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_get\_path](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-path "flatpak_installation_get_path ()")() |
| [GFileMonitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_create\_monitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-create-monitor "flatpak_installation_create_monitor ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_install](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install "flatpak_installation_install ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_install\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-full "flatpak_installation_install_full ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update "flatpak_installation_update ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_update\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-full "flatpak_installation_update_full ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall "flatpak_installation_uninstall ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_uninstall\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall-full "flatpak_installation_uninstall_full ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_launch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch "flatpak_installation_launch ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_launch\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch-full "flatpak_installation_launch_full ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_get\_current\_installed\_app](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-current-installed-app "flatpak_installation_get_current_installed_app ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_get\_display\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-display-name "flatpak_installation_get_display_name ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_get\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-id "flatpak_installation_get_id ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_get\_installed\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-installed-ref "flatpak_installation_get_installed_ref ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_get\_min\_free\_space\_bytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-min-free-space-bytes "flatpak_installation_get_min_free_space_bytes ()")() |
| [gint](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_get\_priority](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-priority "flatpak_installation_get_priority ()")() |
| [FlatpakStorageType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakStorageType "enum FlatpakStorageType") | [flatpak\_installation\_get\_storage\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-storage-type "flatpak_installation_get_storage_type ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_set\_no\_interaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-set-no-interaction "flatpak_installation_set_no_interaction ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_get\_no\_interaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-no-interaction "flatpak_installation_get_no_interaction ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_installed\_refs](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-refs "flatpak_installation_list_installed_refs ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_installed\_refs\_by\_kind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-refs-by-kind "flatpak_installation_list_installed_refs_by_kind ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_installed\_refs\_for\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-refs-for-update "flatpak_installation_list_installed_refs_for_update ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_installed\_related\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-related-refs-sync "flatpak_installation_list_installed_related_refs_sync ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_unused\_refs](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-unused-refs "flatpak_installation_list_unused_refs ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_remote\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-refs-sync "flatpak_installation_list_remote_refs_sync ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_remote\_refs\_sync\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-refs-sync-full "flatpak_installation_list_remote_refs_sync_full ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_remotes\_by\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remotes-by-type "flatpak_installation_list_remotes_by_type ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_remote\_related\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-related-refs-sync "flatpak_installation_list_remote_related_refs_sync ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_list\_remotes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remotes "flatpak_installation_list_remotes ()")() |
| [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") \* | [flatpak\_installation\_get\_remote\_by\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-remote-by-name "flatpak_installation_get_remote_by_name ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_fetch\_remote\_metadata\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-metadata-sync "flatpak_installation_fetch_remote_metadata_sync ()")() |
| [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") \* | [flatpak\_installation\_fetch\_remote\_ref\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-ref-sync "flatpak_installation_fetch_remote_ref_sync ()")() |
| [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") \* | [flatpak\_installation\_fetch\_remote\_ref\_sync\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-ref-sync-full "flatpak_installation_fetch_remote_ref_sync_full ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_fetch\_remote\_size\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-size-sync "flatpak_installation_fetch_remote_size_sync ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_load\_app\_overrides](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-load-app-overrides "flatpak_installation_load_app_overrides ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_update\_appstream\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-appstream-sync "flatpak_installation_update_appstream_sync ()")() |
| [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") \* | [flatpak\_installation\_install\_bundle](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-bundle "flatpak_installation_install_bundle ()")() |
| [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") \* | [flatpak\_installation\_install\_ref\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-ref-file "flatpak_installation_install_ref_file ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_drop\_caches](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-drop-caches "flatpak_installation_drop_caches ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_add\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-add-remote "flatpak_installation_add_remote ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_modify\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_remove\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-remove-remote "flatpak_installation_remove_remote ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_update\_remote\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-remote-sync "flatpak_installation_update_remote_sync ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_cleanup\_local\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-cleanup-local-refs-sync "flatpak_installation_cleanup_local_refs_sync ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installation\_get\_config](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-config "flatpak_installation_get_config ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \*\* | [flatpak\_installation\_get\_default\_languages](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-default-languages "flatpak_installation_get_default_languages ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \*\* | [flatpak\_installation\_get\_default\_locales](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-default-locales "flatpak_installation_get_default_locales ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_prune\_local\_repo](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-prune-local-repo "flatpak_installation_prune_local_repo ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_remove\_local\_ref\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-remove-local-ref-sync "flatpak_installation_remove_local_ref_sync ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_set\_config\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-set-config-sync "flatpak_installation_set_config_sync ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_update\_appstream\_full\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-appstream-full-sync "flatpak_installation_update_appstream_full_sync ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installation\_run\_triggers](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-run-triggers "flatpak_installation_run_triggers ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_get\_default\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-default-arch "flatpak_get_default_arch ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \*const \* | [flatpak\_get\_supported\_arches](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-supported-arches "flatpak_get_supported_arches ()")() |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_get\_system\_installations](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-system-installations "flatpak_get_system_installations ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | ( [\*FlatpakProgressCallback](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakProgressCallback "FlatpakProgressCallback ()"))() |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation-struct "struct FlatpakInstallation") |
| enum | [FlatpakQueryFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakQueryFlags "enum FlatpakQueryFlags") |
| enum | [FlatpakUpdateFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUpdateFlags "enum FlatpakUpdateFlags") |
| enum | [FlatpakInstallFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallFlags "enum FlatpakInstallFlags") |
| enum | [FlatpakUninstallFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUninstallFlags "enum FlatpakUninstallFlags") |
| enum | [FlatpakLaunchFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakLaunchFlags "enum FlatpakLaunchFlags") |
| enum | [FlatpakStorageType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakStorageType "enum FlatpakStorageType") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakInstallation
```

## Description

FlatpakInstallation is the toplevel object that software installers
should use to operate on an flatpak applications.

An FlatpakInstallation object provides information about an installation
location for flatpak applications. Typical installation locations are either
system-wide (in $prefix/var/lib/flatpak) or per-user (in ~/.local/share/flatpak).

FlatpakInstallation can list configured remotes as well as installed application
and runtime references (in short: refs), and it can add, remove and modify remotes.

FlatpakInstallation can also run, install, update and uninstall applications and
runtimes, but [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") is a better, high-level API for these tasks.

To get a list of all configured installations, use [`flatpak_get_system_installations()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-system-installations "flatpak_get_system_installations ()"),
together with [`flatpak_installation_new_user()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-user "flatpak_installation_new_user ()").

The FlatpakInstallation API is threadsafe in the sense that it is safe to run two
operations at the same time, in different threads (or processes).

## Functions

### flatpak\_installation\_new\_system ()

```
FlatpakInstallation *
flatpak_installation_new_system (GCancellable *cancellable,
                                 GError **error);
```

Creates a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") for the default system-wide installation.

#### Parameters

|     |     |     |
| --- | --- | --- |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation").

\[transfer full\]

### flatpak\_installation\_new\_system\_with\_id ()

```
FlatpakInstallation *
flatpak_installation_new_system_with_id
                               (const char *id,
                                GCancellable *cancellable,
                                GError **error);
```

Creates a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") for the system-wide installation _`id`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| id | the ID of the system-wide installation. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation").

\[transfer full\]

Since: [0.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_new\_user ()

```
FlatpakInstallation *
flatpak_installation_new_user (GCancellable *cancellable,
                               GError **error);
```

Creates a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") for the per-user installation.

#### Parameters

|     |     |     |
| --- | --- | --- |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation").

\[transfer full\]

### flatpak\_installation\_new\_for\_path ()

```
FlatpakInstallation *
flatpak_installation_new_for_path (GFile *path,
                                   gboolean user,
                                   GCancellable *cancellable,
                                   GError **error);
```

Creates a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") for the installation at the given _`path`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| path | a [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| user | whether this is a user-specific location |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a new [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation").

\[transfer full\]

### flatpak\_installation\_get\_is\_user ()

```
gboolean
flatpak_installation_get_is_user (FlatpakInstallation *self);
```

Returns whether the installation is for a user-specific location.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if _`self`_
is a per-user installation

### flatpak\_installation\_get\_path ()

```
GFile *
flatpak_installation_get_path (FlatpakInstallation *self);
```

Returns the installation location for _`self`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

#### Returns

an [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

### flatpak\_installation\_create\_monitor ()

```
GFileMonitor *
flatpak_installation_create_monitor (FlatpakInstallation *self,
                                     GCancellable *cancellable,
                                     GError **error);
```

Gets monitor object for the installation. The returned file monitor will
emit the [“changed”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) signal whenever an application or runtime
was installed, uninstalled or updated.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a new [GFileMonitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) instance, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error.

\[transfer full\]

### flatpak\_installation\_install ()

```
FlatpakInstalledRef *
flatpak_installation_install (FlatpakInstallation *self,
                              const char *remote_name,
                              FlatpakRefKind kind,
                              const char *name,
                              const char *arch,
                              const char *branch,
                              FlatpakProgressCallback progress,
                              gpointer progress_data,
                              GCancellable *cancellable,
                              GError **error);
```

### Warning

`flatpak_installation_install` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()")
instead. It has a lot more interesting features.

Install a new application or runtime.

Note that this function was originally written to always return a
[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef"). Since 0.9.13, passing
FLATPAK\_INSTALL\_FLAGS\_NO\_DEPLOY will only pull refs into the local flatpak
repository without deploying them, however this function will
be unable to provide information on the installed ref, so
FLATPAK\_ERROR\_ONLY\_PULLED will be set and the caller must respond
accordingly.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | name of the remote to use |  |
| kind | what this ref contains (an [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind")) |  |
| name | name of the app/runtime to fetch |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |
| branch | which branch to fetch (default: 'master'). | \[nullable\] |
| progress | progress callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

The ref for the newly installed app or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on failure.

\[transfer full\]

### flatpak\_installation\_install\_full ()

```
FlatpakInstalledRef *
flatpak_installation_install_full (FlatpakInstallation *self,
                                   FlatpakInstallFlags flags,
                                   const char *remote_name,
                                   FlatpakRefKind kind,
                                   const char *name,
                                   const char *arch,
                                   const char *branch,
                                   const char * const *subpaths,
                                   FlatpakProgressCallback progress,
                                   gpointer progress_data,
                                   GCancellable *cancellable,
                                   GError **error);
```

### Warning

`flatpak_installation_install_full` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()")
instead. It has a lot more interesting features.

Install a new application or runtime.

Note that this function was originally written to always return a
[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef"). Since 0.9.13, passing
FLATPAK\_INSTALL\_FLAGS\_NO\_DEPLOY will only pull refs into the local flatpak
repository without deploying them, however this function will
be unable to provide information on the installed ref, so
FLATPAK\_ERROR\_ONLY\_PULLED will be set and the caller must respond
accordingly.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| flags | set of [FlatpakInstallFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallFlags "enum FlatpakInstallFlags") flag |  |
| remote\_name | name of the remote to use |  |
| kind | what this ref contains (an [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind")) |  |
| name | name of the app/runtime to fetch |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |
| branch | which branch to fetch (default: 'master'). | \[nullable\] |
| subpaths | A list of subpaths to fetch, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) for everything. | \[nullable\]\[array zero-terminated=1\] |
| progress | progress callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

The ref for the newly installed app or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on failure.

\[transfer full\]

### flatpak\_installation\_update ()

```
FlatpakInstalledRef *
flatpak_installation_update (FlatpakInstallation *self,
                             FlatpakUpdateFlags flags,
                             FlatpakRefKind kind,
                             const char *name,
                             const char *arch,
                             const char *branch,
                             FlatpakProgressCallback progress,
                             gpointer progress_data,
                             GCancellable *cancellable,
                             GError **error);
```

### Warning

`flatpak_installation_update` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_update()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-update "flatpak_transaction_add_update ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_update()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-update "flatpak_transaction_add_update ()")
instead. It has a lot more interesting features.

Update an application or runtime.

If the specified package is not installed, then [`FLATPAK_ERROR_NOT_INSTALLED`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR-NOT-INSTALLED:CAPS)
will be thrown.

If no updates could be found on the remote end and the package is
already up to date, then [`FLATPAK_ERROR_ALREADY_INSTALLED`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR-ALREADY-INSTALLED:CAPS) will be thrown.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| flags | set of [FlatpakUpdateFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUpdateFlags "enum FlatpakUpdateFlags") flag |  |
| kind | whether this is an app or runtime |  |
| name | name of the app or runtime to update |  |
| arch | architecture of the app or runtime to update (default: current architecture). | \[nullable\] |
| branch | name of the branch of the app or runtime to update (default: master). | \[nullable\] |
| progress | the callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

The ref for the newly updated app or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on failure.

\[transfer full\]

### flatpak\_installation\_update\_full ()

```
FlatpakInstalledRef *
flatpak_installation_update_full (FlatpakInstallation *self,
                                  FlatpakUpdateFlags flags,
                                  FlatpakRefKind kind,
                                  const char *name,
                                  const char *arch,
                                  const char *branch,
                                  const char * const *subpaths,
                                  FlatpakProgressCallback progress,
                                  gpointer progress_data,
                                  GCancellable *cancellable,
                                  GError **error);
```

### Warning

`flatpak_installation_update_full` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_update()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-update "flatpak_transaction_add_update ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_update()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-update "flatpak_transaction_add_update ()")
instead. It has a lot more interesting features.

Update an application or runtime.

If the specified package is not installed, then [`FLATPAK_ERROR_NOT_INSTALLED`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR-NOT-INSTALLED:CAPS)
will be thrown.

If no updates could be found on the remote end and the package is
already up to date, then [`FLATPAK_ERROR_ALREADY_INSTALLED`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR-ALREADY-INSTALLED:CAPS) will be thrown.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| flags | set of [FlatpakUpdateFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUpdateFlags "enum FlatpakUpdateFlags") flag |  |
| kind | whether this is an app or runtime |  |
| name | name of the app or runtime to update |  |
| arch | architecture of the app or runtime to update (default: current architecture). | \[nullable\] |
| branch | name of the branch of the app or runtime to update (default: master). | \[nullable\] |
| subpaths | A list of subpaths to fetch, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) for everything. | \[nullable\]\[array zero-terminated=1\] |
| progress | the callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

The ref for the newly updated app or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on failure.

\[transfer full\]

### flatpak\_installation\_uninstall ()

```
gboolean
flatpak_installation_uninstall (FlatpakInstallation *self,
                                FlatpakRefKind kind,
                                const char *name,
                                const char *arch,
                                const char *branch,
                                FlatpakProgressCallback progress,
                                gpointer progress_data,
                                GCancellable *cancellable,
                                GError **error);
```

### Warning

`flatpak_installation_uninstall` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_uninstall()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-uninstall "flatpak_transaction_add_uninstall ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_uninstall()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-uninstall "flatpak_transaction_add_uninstall ()")
instead. It has a lot more interesting features.

Uninstall an application or runtime.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| kind | what this ref contains (an [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind")) |  |
| name | name of the app or runtime to uninstall |  |
| arch | architecture of the app or runtime to uninstall; if<br>[`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), [`flatpak_get_default_arch()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-default-arch "flatpak_get_default_arch ()") is assumed. | \[nullable\] |
| branch | name of the branch of the app or runtime to uninstall;<br>if [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), `master` is assumed. | \[nullable\] |
| progress | the callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success

### flatpak\_installation\_uninstall\_full ()

```
gboolean
flatpak_installation_uninstall_full (FlatpakInstallation *self,
                                     FlatpakUninstallFlags flags,
                                     FlatpakRefKind kind,
                                     const char *name,
                                     const char *arch,
                                     const char *branch,
                                     FlatpakProgressCallback progress,
                                     gpointer progress_data,
                                     GCancellable *cancellable,
                                     GError **error);
```

### Warning

`flatpak_installation_uninstall_full` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_uninstall()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-uninstall "flatpak_transaction_add_uninstall ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_uninstall()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-uninstall "flatpak_transaction_add_uninstall ()")
instead. It has a lot more interesting features.

Uninstall an application or runtime.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| flags | set of [FlatpakUninstallFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUninstallFlags "enum FlatpakUninstallFlags") flags |  |
| kind | what this ref contains (an [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind")) |  |
| name | name of the app or runtime to uninstall |  |
| arch | architecture of the app or runtime to uninstall; if<br>[`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), [`flatpak_get_default_arch()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-default-arch "flatpak_get_default_arch ()") is assumed. | \[nullable\] |
| branch | name of the branch of the app or runtime to uninstall;<br>if [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), `master` is assumed. | \[nullable\] |
| progress | the callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success

Since: [0.11.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_launch ()

```
gboolean
flatpak_installation_launch (FlatpakInstallation *self,
                             const char *name,
                             const char *arch,
                             const char *branch,
                             const char *commit,
                             GCancellable *cancellable,
                             GError **error);
```

Launch an installed application.

You can use [`flatpak_installation_get_installed_ref()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-installed-ref "flatpak_installation_get_installed_ref ()") or
[`flatpak_installation_get_current_installed_app()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-current-installed-app "flatpak_installation_get_current_installed_app ()") to find out what builds
are available, in order to get a value for _`commit`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| name | name of the app to launch |  |
| arch | which architecture to launch (default: current architecture). | \[nullable\] |
| branch | which branch of the application (default: "master"). | \[nullable\] |
| commit | the commit of _`branch`_<br>to launch. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), unless an error occurred

### flatpak\_installation\_launch\_full ()

```
gboolean
flatpak_installation_launch_full (FlatpakInstallation *self,
                                  FlatpakLaunchFlags flags,
                                  const char *name,
                                  const char *arch,
                                  const char *branch,
                                  const char *commit,
                                  FlatpakInstance **instance_out,
                                  GCancellable *cancellable,
                                  GError **error);
```

Launch an installed application.

You can use [`flatpak_installation_get_installed_ref()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-installed-ref "flatpak_installation_get_installed_ref ()") or
[`flatpak_installation_get_current_installed_app()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-current-installed-app "flatpak_installation_get_current_installed_app ()") to find out what builds
are available, in order to get a value for _`commit`_
.

Compared to [`flatpak_installation_launch()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch "flatpak_installation_launch ()"), this function returns a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")
that can be used to get information about the running instance. You can also use
it to wait for the instance to be done with [`g_child_watch_add()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if you pass the
[FLATPAK\_LAUNCH\_FLAGS\_DO\_NOT\_REAP](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-LAUNCH-FLAGS-DO-NOT-REAP:CAPS) flag.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| flags | set of [FlatpakLaunchFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakLaunchFlags "enum FlatpakLaunchFlags") |  |
| name | name of the app to launch |  |
| arch | which architecture to launch (default: current architecture). | \[nullable\] |
| branch | which branch of the application (default: "master"). | \[nullable\] |
| commit | the commit of _`branch`_<br>to launch. | \[nullable\] |
| instance\_out | return location for a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance"). | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), unless an error occurred

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_current\_installed\_app ()

```
FlatpakInstalledRef *
flatpak_installation_get_current_installed_app
                               (FlatpakInstallation *self,
                                const char *name,
                                GCancellable *cancellable,
                                GError **error);
```

Get the last build of reference _`name`_
that was installed with
[`flatpak_installation_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install "flatpak_installation_install ()"), or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the reference has
never been installed locally.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| name | the name of the app |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

an [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef").

\[transfer full\]

### flatpak\_installation\_get\_display\_name ()

```
const char *
flatpak_installation_get_display_name (FlatpakInstallation *self);
```

Returns the display name of the installation for _`self`_
.

Note that this function may return [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the installation
does not have a display name.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

#### Returns

a string with the installation's display name.

\[transfer none\]

Since: [0.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_id ()

```
const char *
flatpak_installation_get_id (FlatpakInstallation *self);
```

Returns the ID of the installation for _`self`_
.

The ID for the default system installation is "default".
The ID for the user installation is "user".

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

#### Returns

a string with the installation's ID.

\[transfer none\]

Since: [0.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_installed\_ref ()

```
FlatpakInstalledRef *
flatpak_installation_get_installed_ref
                               (FlatpakInstallation *self,
                                FlatpakRefKind kind,
                                const char *name,
                                const char *arch,
                                const char *branch,
                                GCancellable *cancellable,
                                GError **error);
```

Returns information about an installed ref, such as the available builds,
its size, location, etc.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| kind | whether this is an app or runtime |  |
| name | name of the app/runtime to fetch |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |
| branch | which branch to fetch (default: "master"). | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

an [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef"), or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if an error occurred.

\[transfer full\]

### flatpak\_installation\_get\_min\_free\_space\_bytes ()

```
gboolean
flatpak_installation_get_min_free_space_bytes
                               (FlatpakInstallation *self,
                                guint64 *out_bytes,
                                GError **error);
```

Returns the min-free-space config value from the OSTree repository of this installation.

Applications can use this value, together with information about the available
disk space and the size of pending updates or installs, to estimate whether a
pull operation will fail due to running out of disk space.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| out\_bytes | Location to store the result. | \[out\] |
| error | Return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success, or [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error.

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_priority ()

```
gint
flatpak_installation_get_priority (FlatpakInstallation *self);
```

Returns the numeric priority of the installation for _`self`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

#### Returns

an integer with the configured priority value

Since: [0.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_storage\_type ()

```
FlatpakStorageType
flatpak_installation_get_storage_type (FlatpakInstallation *self);
```

Returns the type of storage of the installation for _`self`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

#### Returns

a [FlatpakStorageType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakStorageType "enum FlatpakStorageType")

Since: [0.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_set\_no\_interaction ()

```
void
flatpak_installation_set_no_interaction
                               (FlatpakInstallation *self,
                                gboolean no_interaction);
```

This method can be used to prevent interactive authorization dialogs to appear
for operations on _`self`_
. This is useful for background operations that are not
directly triggered by a user action.

By default, interaction is allowed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| no\_interaction | Whether to disallow interactive authorization for operations |  |

Since: [1.1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_no\_interaction ()

```
gboolean
flatpak_installation_get_no_interaction
                               (FlatpakInstallation *self);
```

Returns the value set with [`flatpak_installation_set_no_interaction()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-set-no-interaction "flatpak_installation_set_no_interaction ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if interactive authorization dialogs are not allowed

Since: [1.1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_list\_installed\_refs ()

```
GPtrArray *
flatpak_installation_list_installed_refs
                               (FlatpakInstallation *self,
                                GCancellable *cancellable,
                                GError **error);
```

Lists the installed references.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") instances.

\[transfer container\]\[element-type FlatpakInstalledRef\]

### flatpak\_installation\_list\_installed\_refs\_by\_kind ()

```
GPtrArray *
flatpak_installation_list_installed_refs_by_kind
                               (FlatpakInstallation *self,
                                FlatpakRefKind kind,
                                GCancellable *cancellable,
                                GError **error);
```

Lists the installed references of a specific kind.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| kind | the kind of installation |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") instances.

\[transfer container\]\[element-type FlatpakInstalledRef\]

### flatpak\_installation\_list\_installed\_refs\_for\_update ()

```
GPtrArray *
flatpak_installation_list_installed_refs_for_update
                               (FlatpakInstallation *self,
                                GCancellable *cancellable,
                                GError **error);
```

Lists the installed apps and runtimes that have an update available, either
from the configured remote or locally available but not deployed (see
[`flatpak_transaction_set_no_deploy()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-deploy "flatpak_transaction_set_no_deploy ()")).

This also checks if any of [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") has a missing [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")
(which has `should-download` set to [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)) or runtime. If so, it adds the
ref to the returning [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to pull in the [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") or runtime
again via an update operation in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction").

In case more than one app needs an update of the same runtime or extension,
this function will return all of those apps.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") instances, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error.

\[transfer container\]\[element-type FlatpakInstalledRef\]

### flatpak\_installation\_list\_installed\_related\_refs\_sync ()

```
GPtrArray *
flatpak_installation_list_installed_related_refs_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                const char *ref,
                                GCancellable *cancellable,
                                GError **error);
```

Lists all the locally installed refs that are related to _`ref`_
. These are
things that are interesting to install, update, or uninstall together with
_`ref`_
. For instance, locale data or debug information.

Note that while the related refs are usually installed from the same remote
as _`ref`_
( _`remote_name`_
), it is possible they were installed from another
remote.

This function is similar to flatpak\_installation\_list\_remote\_related\_refs\_sync,
but instead of looking at what is available on the remote, it only looks
at the locally installed refs. This is useful for instance when you're
looking for related refs to uninstall, or when you're planning to use
FLATPAK\_UPDATE\_FLAGS\_NO\_PULL to install previously pulled refs.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote providing _`ref`_ |  |
| ref | the ref |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") instances.

\[transfer container\]\[element-type FlatpakRelatedRef\]

Since: [0.6.7](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_list\_unused\_refs ()

```
GPtrArray *
flatpak_installation_list_unused_refs (FlatpakInstallation *self,
                                       const char *arch,
                                       GCancellable *cancellable,
                                       GError **error);
```

Lists the installed references that are not 'used'.

A reference is used if it is either an application,
or the runtime or sdk of a used ref, or an extension of a used ref.
Pinned runtimes are also considered used; see flatpak-pin(1) and
[`flatpak_installation_list_pinned_refs()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| arch | if non- [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), the architecture of refs to collect. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") instances.

\[transfer container\]\[element-type FlatpakInstalledRef\]

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_list\_remote\_refs\_sync ()

```
GPtrArray *
flatpak_installation_list_remote_refs_sync
                               (FlatpakInstallation *self,
                                const char *remote_or_uri,
                                GCancellable *cancellable,
                                GError **error);
```

Lists all the applications and runtimes in a remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_or\_uri | the name or URI of the remote |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") instances.

\[transfer container\]\[element-type FlatpakRemoteRef\]

### flatpak\_installation\_list\_remote\_refs\_sync\_full ()

```
GPtrArray *
flatpak_installation_list_remote_refs_sync_full
                               (FlatpakInstallation *self,
                                const char *remote_or_uri,
                                FlatpakQueryFlags flags,
                                GCancellable *cancellable,
                                GError **error);
```

Lists all the applications and runtimes in a remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_or\_uri | the name or URI of the remote |  |
| flags | set of [FlatpakQueryFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakQueryFlags "enum FlatpakQueryFlags") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") instances.

\[transfer container\]\[element-type FlatpakRemoteRef\]

Since: [1.3.3](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_list\_remotes\_by\_type ()

```
GPtrArray *
flatpak_installation_list_remotes_by_type
                               (FlatpakInstallation *self,
                                const FlatpakRemoteType types[],
                                gsize num_types,
                                GCancellable *cancellable,
                                GError **error);
```

Lists only the remotes whose type is included in the _`types`_
argument.

Since flatpak 1.7 this will never return any types except FLATPAK\_REMOTE\_TYPE\_STATIC.
Equivalent functionallity to FLATPAK\_REMOTE\_TYPE\_USB can be had by listing remote refs
with FLATPAK\_QUERY\_FLAGS\_ONLY\_SIDELOADED.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| types | an array of [FlatpakRemoteType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteType "enum FlatpakRemoteType"). | \[array length=num\_types\] |
| num\_types | the number of types provided in _`types`_ |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") instances.

\[transfer container\]\[element-type FlatpakRemote\]

### flatpak\_installation\_list\_remote\_related\_refs\_sync ()

```
GPtrArray *
flatpak_installation_list_remote_related_refs_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                const char *ref,
                                GCancellable *cancellable,
                                GError **error);
```

Lists all the available refs on _`remote_name`_
that are related to
_`ref`_
, and the subpaths to use. These are things that are
interesting to install, update, or uninstall together with
_`ref`_
. For instance, locale data or debug information.

The returned list contains all available related refs, but not
every one should always be installed. For example,
[`flatpak_related_ref_should_download()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-download "flatpak_related_ref_should_download ()") returns [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the
reference should be installed/updated with the app, and
[`flatpak_related_ref_should_delete()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-delete "flatpak_related_ref_should_delete ()") returns [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if it
should be uninstalled with the main ref.

The commit property of each [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") is not guaranteed to be
non- [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| ref | the ref |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") instances.

\[transfer container\]\[element-type FlatpakRelatedRef\]

Since: [0.6.7](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_list\_remotes ()

```
GPtrArray *
flatpak_installation_list_remotes (FlatpakInstallation *self,
                                   GCancellable *cancellable,
                                   GError **error);
```

Lists the static remotes, in priority (highest first) order. For same
priority, an earlier added remote comes before a later added one.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") instances.

\[transfer container\]\[element-type FlatpakRemote\]

### flatpak\_installation\_get\_remote\_by\_name ()

```
FlatpakRemote *
flatpak_installation_get_remote_by_name
                               (FlatpakInstallation *self,
                                const gchar *name,
                                GCancellable *cancellable,
                                GError **error);
```

Looks up a remote by name.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| name | a remote name |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") instance, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set.

\[transfer full\]

### flatpak\_installation\_fetch\_remote\_metadata\_sync ()

```
GBytes *
flatpak_installation_fetch_remote_metadata_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                FlatpakRef *ref,
                                GCancellable *cancellable,
                                GError **error);
```

Obtains the metadata file from a commit.

NOTE: Since 0.11.4 this information is accessible in FlatpakRemoteRef, so this
function is not very useful anymore.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| ref | the ref |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) containing the flatpak metadata file,
or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if an error occurred.

\[transfer full\]

### flatpak\_installation\_fetch\_remote\_ref\_sync ()

```
FlatpakRemoteRef *
flatpak_installation_fetch_remote_ref_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                FlatpakRefKind kind,
                                const char *name,
                                const char *arch,
                                const char *branch,
                                GCancellable *cancellable,
                                GError **error);
```

Gets the current remote branch of a ref in the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| kind | what this ref contains (an [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind")) |  |
| name | name of the app/runtime to fetch |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |
| branch | which branch to fetch (default: 'master'). | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") instance, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

### flatpak\_installation\_fetch\_remote\_ref\_sync\_full ()

```
FlatpakRemoteRef *
flatpak_installation_fetch_remote_ref_sync_full
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                FlatpakRefKind kind,
                                const char *name,
                                const char *arch,
                                const char *branch,
                                FlatpakQueryFlags flags,
                                GCancellable *cancellable,
                                GError **error);
```

Gets the current remote branch of a ref in the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| kind | what this ref contains (an [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind")) |  |
| name | name of the app/runtime to fetch |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |
| branch | which branch to fetch (default: 'master'). | \[nullable\] |
| flags | set of [FlatpakQueryFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakQueryFlags "enum FlatpakQueryFlags") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") instance, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

Since: [1.3.3](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_fetch\_remote\_size\_sync ()

```
gboolean
flatpak_installation_fetch_remote_size_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                FlatpakRef *ref,
                                guint64 *download_size,
                                guint64 *installed_size,
                                GCancellable *cancellable,
                                GError **error);
```

Gets information about the maximum amount of data that needs to be transferred
to pull the ref from a remote repository, and about the amount of
local disk space that is required to check out this commit.

Note that if there are locally available data that are in the ref, which is common
for instance if you're doing an update then the real download size may be smaller
than what is returned here.

NOTE: Since 0.11.4 this information is accessible in FlatpakRemoteRef, so this
function is not very useful anymore.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| ref | the ref |  |
| download\_size | return location for the (maximum) download size. | \[out\] |
| installed\_size | return location for the installed size. | \[out\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), unless an error occurred

### flatpak\_installation\_load\_app\_overrides ()

```
char *
flatpak_installation_load_app_overrides
                               (FlatpakInstallation *self,
                                const char *app_id,
                                GCancellable *cancellable,
                                GError **error);
```

Loads the metadata overrides file for an application.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| app\_id | an application id |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

the contents of the overrides files,
or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if an error occurred.

\[transfer full\]

### flatpak\_installation\_update\_appstream\_sync ()

```
gboolean
flatpak_installation_update_appstream_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                const char *arch,
                                gboolean *out_changed,
                                GCancellable *cancellable,
                                GError **error);
```

Updates the local copy of appstream for _`remote_name`_
for the specified _`arch`_
.
If you need progress feedback, use [`flatpak_installation_update_appstream_full_sync()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-appstream-full-sync "flatpak_installation_update_appstream_full_sync ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| arch | Architecture to update, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) for the local machine arch. | \[nullable\] |
| out\_changed | Set to [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the contents of the appstream changed, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if nothing changed. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success, or [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error

### flatpak\_installation\_install\_bundle ()

```
FlatpakInstalledRef *
flatpak_installation_install_bundle (FlatpakInstallation *self,
                                     GFile *file,
                                     FlatpakProgressCallback progress,
                                     gpointer progress_data,
                                     GCancellable *cancellable,
                                     GError **error);
```

### Warning

`flatpak_installation_install_bundle` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_install_bundle()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-bundle "flatpak_transaction_add_install_bundle ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_install_bundle()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-bundle "flatpak_transaction_add_install_bundle ()")
instead. It has a lot more interesting features.

Install an application or runtime from an flatpak bundle file.
See flatpak-build-bundle(1) for how to create bundles.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| file | a [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) that is an flatpak bundle |  |
| progress | progress callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

The ref for the newly installed app or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on failure.

\[transfer full\]

### flatpak\_installation\_install\_ref\_file ()

```
FlatpakRemoteRef *
flatpak_installation_install_ref_file (FlatpakInstallation *self,
                                       GBytes *ref_file_data,
                                       GCancellable *cancellable,
                                       GError **error);
```

### Warning

`flatpak_installation_install_ref_file` has been deprecated since version 1.7.0 and should not be used in newly-written code.

Use [`flatpak_transaction_add_install_flatpakref()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-flatpakref "flatpak_transaction_add_install_flatpakref ()") instead.

This is an old deprecated function, you should use
[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") and [`flatpak_transaction_add_install_flatpakref()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-flatpakref "flatpak_transaction_add_install_flatpakref ()")
instead. It has a lot more interesting features.

Creates a remote based on the passed in .flatpakref file contents
in _`ref_file_data`_
and returns the [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") that can be used
to install it.

Note, the [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") will not have the commit field set, or other details, to
avoid unnecessary roundtrips. If you need that you have to resolve it
explicitly with [`flatpak_installation_fetch_remote_ref_sync()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-ref-sync "flatpak_installation_fetch_remote_ref_sync ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| ref\_file\_data | The ref file contents |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") if the remote has been added successfully, [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)
on error.

\[transfer full\]

Since: [0.6.10](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_drop\_caches ()

```
gboolean
flatpak_installation_drop_caches (FlatpakInstallation *self,
                                  GCancellable *cancellable,
                                  GError **error);
```

Drops all internal (in-memory) caches. For instance, this may be needed to pick up new or changed
remotes configured outside this installation instance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error

### flatpak\_installation\_add\_remote ()

```
gboolean
flatpak_installation_add_remote (FlatpakInstallation *self,
                                 FlatpakRemote *remote,
                                 gboolean if_needed,
                                 GCancellable *cancellable,
                                 GError **error);
```

Adds a new _`remote`_
object to the set of remotes. This is similar
to [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for non-existing remote
names. However, if the named remote already exists then instead of
modifying it it fails with [`FLATPAK_ERROR_ALREADY_INSTALLED`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR-ALREADY-INSTALLED:CAPS), or if
_`if_needed`_
is true it silently succeeds without doing anything.

As an exception to the last, if the local config has a filter defined,
but the new remote unsets the filter (for example, it comes from an
unfiltered .flatpakref via [`flatpak_remote_new_from_file()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-new-from-file "flatpak_remote_new_from_file ()")) the the local
remote filter gets reset. This is to allow the setup where there is a
default setup of a filtered remote, yet you can still use the standard
flatpakref file to get the full contents without getting two remotes.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote | the new [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| if\_needed | if [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), only add if it doesn't exists |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the modifications have been committed successfully

Since: [1.3.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_modify\_remote ()

```
gboolean
flatpak_installation_modify_remote (FlatpakInstallation *self,
                                    FlatpakRemote *remote,
                                    GCancellable *cancellable,
                                    GError **error);
```

Saves changes in the _`remote`_
object.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote | the modified [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the modifications have been committed successfully

### flatpak\_installation\_remove\_remote ()

```
gboolean
flatpak_installation_remove_remote (FlatpakInstallation *self,
                                    const char *name,
                                    GCancellable *cancellable,
                                    GError **error);
```

Removes the remote with the given name from the installation.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| name | the name of the remote to remove |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the remote has been removed successfully

### flatpak\_installation\_update\_remote\_sync ()

```
gboolean
flatpak_installation_update_remote_sync
                               (FlatpakInstallation *self,
                                const char *name,
                                GCancellable *cancellable,
                                GError **error);
```

Updates the local configuration of a remote repository by fetching
the related information from the summary file in the remote OSTree
repository and committing the changes to the local installation.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| name | the name of the remote to update |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the remote has been updated successfully

Since: [0.6.13](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_cleanup\_local\_refs\_sync ()

```
gboolean
flatpak_installation_cleanup_local_refs_sync
                               (FlatpakInstallation *self,
                                GCancellable *cancellable,
                                GError **error);
```

Remove all OSTree refs from the local flatpak repository which are not
in a deployed state. The next time the underlying OSTree repo is pruned,
objects which were attached to that ref will be removed. This is useful if
you pulled a flatpak refs using [`flatpak_installation_install_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-full "flatpak_installation_install_full ()") and
specified [`FLATPAK_INSTALL_FLAGS_NO_DEPLOY`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-INSTALL-FLAGS-NO-DEPLOY:CAPS) but then decided not to
deploy the refs later on and want to remove the local refs to prevent them
from taking up disk space. Note that this will not remove the objects
referred to by _`ref`_
from the underlying OSTree repo, you should use
[`flatpak_installation_prune_local_repo()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-prune-local-repo "flatpak_installation_prune_local_repo ()") to do that.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success

Since: [0.10.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_config ()

```
char *
flatpak_installation_get_config (FlatpakInstallation *self,
                                 const char *key,
                                 GCancellable *cancellable,
                                 GError **error);
```

Get a global configuration option for the installation, see
[`flatpak_installation_set_config_sync()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-set-config-sync "flatpak_installation_set_config_sync ()") for supported keys.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| key | the name of the key to get |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

The (newly allocated) value, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error ( [`G_KEY_FILE_ERROR_KEY_NOT_FOUND`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) error if key is not set)

### flatpak\_installation\_get\_default\_languages ()

```
char **
flatpak_installation_get_default_languages
                               (FlatpakInstallation *self,
                                GError **error);
```

Get the default languages used by the installation to decide which
subpaths to install of locale extensions. This list may also be used
by frontends like GNOME Software to decide which language-specific apps
to display. An empty array means that all languages should be installed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

A possibly empty array of strings, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error.

\[array zero-terminated=1\]\[element-type utf8\]\[transfer full\]

Since: [1.5.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_get\_default\_locales ()

```
char **
flatpak_installation_get_default_locales
                               (FlatpakInstallation *self,
                                GError **error);
```

Like [`flatpak_installation_get_default_languages()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-default-languages "flatpak_installation_get_default_languages ()") but includes territory
information (e.g. `en_US` rather than `en`) which may be included in the
`extra-languages` configuration.

Strings returned by this function are in the format specified by
[`setlocale()`](man:setlocale): `language[_territory][.codeset][@modifier]`.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

A possibly empty array of locale strings, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error.

\[array zero-terminated=1\]\[element-type utf8\]\[transfer full\]

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_prune\_local\_repo ()

```
gboolean
flatpak_installation_prune_local_repo (FlatpakInstallation *self,
                                       GCancellable *cancellable,
                                       GError **error);
```

Remove all orphaned OSTree objects from the underlying OSTree repo in
_`self`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success

Since: [0.10.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_remove\_local\_ref\_sync ()

```
gboolean
flatpak_installation_remove_local_ref_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                const char *ref,
                                GCancellable *cancellable,
                                GError **error);
```

Remove the OSTree ref given by _`remote_name`_
: _`ref`_
from the local flatpak
repository. The next time the underlying OSTree repo is pruned, objects
which were attached to that ref will be removed. This is useful if you
pulled a flatpak ref using [`flatpak_installation_install_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-full "flatpak_installation_install_full ()") and
specified [`FLATPAK_INSTALL_FLAGS_NO_DEPLOY`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-INSTALL-FLAGS-NO-DEPLOY:CAPS) but then decided not to
deploy the ref later on and want to remove the local ref to prevent it
from taking up disk space. Note that this will not remove the objects
referred to by _`ref`_
from the underlying OSTree repo, you should use
[`flatpak_installation_prune_local_repo()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-prune-local-repo "flatpak_installation_prune_local_repo ()") to do that.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| ref | the ref |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success

Since: [0.10.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installation\_set\_config\_sync ()

```
gboolean
flatpak_installation_set_config_sync (FlatpakInstallation *self,
                                      const char *key,
                                      const char *value,
                                      GCancellable *cancellable,
                                      GError **error);
```

Set a global configuration option for the installation, currently
the only supported keys are `languages`, which is a semicolon-separated
list of language codes like `"sv;en;pl"`, or `""` to mean all languages,
and `extra-languages`, which is a semicolon-separated list of locale
identifiers like `"en;en_DK;zh_HK.big5hkscs;uz_UZ.utf8@cyrillic"`.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| key | the name of the key to set |  |
| value | the new value, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to unset |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the option was set correctly

### flatpak\_installation\_update\_appstream\_full\_sync ()

```
gboolean
flatpak_installation_update_appstream_full_sync
                               (FlatpakInstallation *self,
                                const char *remote_name,
                                const char *arch,
                                FlatpakProgressCallback progress,
                                gpointer progress_data,
                                gboolean *out_changed,
                                GCancellable *cancellable,
                                GError **error);
```

Updates the local copy of appstream for _`remote_name`_
for the specified _`arch`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| remote\_name | the name of the remote |  |
| arch | Architecture to update, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) for the local machine arch. | \[nullable\] |
| progress | progress callback. | \[scope call\]\[closure progress\_data\]\[nullable\] |
| progress\_data | user data passed to _`progress`_<br>. | \[nullable\] |
| out\_changed | Set to [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the contents of the appstream changed, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if nothing changed. | \[nullable\] |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success, or [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error

### flatpak\_installation\_run\_triggers ()

```
gboolean
flatpak_installation_run_triggers (FlatpakInstallation *self,
                                   GCancellable *cancellable,
                                   GError **error);
```

Run the trigger commands to update the files exported by the apps in
_`self`_
. Should be used after one or more app install, upgrade or
uninstall operations with the [`FLATPAK_INSTALL_FLAGS_NO_TRIGGERS`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-INSTALL-FLAGS-NO-TRIGGERS:CAPS),
[`FLATPAK_UPDATE_FLAGS_NO_TRIGGERS`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-UPDATE-FLAGS-NO-TRIGGERS:CAPS) or [`FLATPAK_UNINSTALL_FLAGS_NO_TRIGGERS`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-UNINSTALL-FLAGS-NO-TRIGGERS:CAPS)
flags set.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success

Since: [1.0.3](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_get\_default\_arch ()

```
const char *
flatpak_get_default_arch (void);
```

Returns the canonical name for the arch of the current machine.

#### Returns

an arch string

### flatpak\_get\_supported\_arches ()

```
const char *const *
flatpak_get_supported_arches (void);
```

Returns the canonical names for the arches that are supported (i.e. can run)
on the current machine, in order of priority (default is first).

#### Returns

a zero terminated array of arch strings

### flatpak\_get\_system\_installations ()

```
GPtrArray *
flatpak_get_system_installations (GCancellable *cancellable,
                                  GError **error);
```

Lists the system installations according to the current configuration and current
availability (e.g. doesn't return a configured installation if not reachable).

#### Parameters

|     |     |     |
| --- | --- | --- |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a GPtrArray of
[FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") instances.

\[transfer container\]\[element-type FlatpakInstallation\]

Since: [0.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### FlatpakProgressCallback ()

```
void
(*FlatpakProgressCallback) (const char *status,
                            guint progress,
                            gboolean estimating,
                            gpointer user_data);
```

The progress callback is called repeatedly during long-running operations
such as installations or updates, and can be used to update progress information
in a user interface.

The callback occurs in the thread-default context of the caller.

#### Parameters

|     |     |     |
| --- | --- | --- |
| status | A status string, suitable for display |  |
| progress | percentage of completion |  |
| estimating | whether _`progress`_<br>is just an estimate |  |
| user\_data | User data passed to the caller |  |

## Types and Values

### struct FlatpakInstallation

```
struct FlatpakInstallation;
```

### enum FlatpakQueryFlags

Flags to alter the behavior of e.g [`flatpak_installation_list_remote_refs_sync_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-refs-sync-full "flatpak_installation_list_remote_refs_sync_full ()").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_QUERY\_FLAGS\_NONE | Default |  |
| FLATPAK\_QUERY\_FLAGS\_ONLY\_CACHED | Don't do any network i/o, but only return cached data.<br>This can return stale data, or a [FLATPAK\_ERROR\_NOT\_CACHED](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR-NOT-CACHED:CAPS) error, however it is a<br>lot more efficient if you're doing many requests. |  |
| FLATPAK\_QUERY\_FLAGS\_ONLY\_SIDELOADED | Only list refs available from sideload<br>repos; see flatpak(1). (Since: 1.7) |  |
| FLATPAK\_QUERY\_FLAGS\_ALL\_ARCHES | Include refs from all arches, not just the primary ones. (Since: 1.11.2) |  |

Since: [1.3.3](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### enum FlatpakUpdateFlags

Flags to alter the behavior of [`flatpak_installation_update()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update "flatpak_installation_update ()").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_UPDATE\_FLAGS\_NONE | Fetch remote builds and install the latest one (default) |  |
| FLATPAK\_UPDATE\_FLAGS\_NO\_DEPLOY | Don't install any new builds that might be fetched |  |
| FLATPAK\_UPDATE\_FLAGS\_NO\_PULL | Don't try to fetch new builds from the remote repo |  |
| FLATPAK\_UPDATE\_FLAGS\_NO\_STATIC\_DELTAS | Don't use static deltas when pulling |  |
| FLATPAK\_UPDATE\_FLAGS\_NO\_PRUNE | Don't prune the local OSTree repository after updating (Since: 0.11.8) |  |
| FLATPAK\_UPDATE\_FLAGS\_NO\_TRIGGERS | Don't call triggers after updating. If used,<br>the caller must later call [`flatpak_installation_run_triggers()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-run-triggers "flatpak_installation_run_triggers ()") to update<br>the exported files. (Since: 1.0.3) |  |

### enum FlatpakInstallFlags

Flags to alter the behavior of [`flatpak_installation_install_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-full "flatpak_installation_install_full ()").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_INSTALL\_FLAGS\_NONE | Default |  |
| FLATPAK\_INSTALL\_FLAGS\_NO\_STATIC\_DELTAS | Don't use static deltas when pulling |  |
| FLATPAK\_INSTALL\_FLAGS\_NO\_DEPLOY | Don't install any new builds that might be fetched |  |
| FLATPAK\_INSTALL\_FLAGS\_NO\_PULL | Don't try to fetch new builds from the remote repo |  |
| FLATPAK\_INSTALL\_FLAGS\_NO\_TRIGGERS | Don't call triggers after installing. If used,<br>the caller must later call [`flatpak_installation_run_triggers()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-run-triggers "flatpak_installation_run_triggers ()") to update<br>the exported files. (Since: 1.0.3) |  |

### enum FlatpakUninstallFlags

Flags to alter the behavior of [`flatpak_installation_uninstall_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall-full "flatpak_installation_uninstall_full ()").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_UNINSTALL\_FLAGS\_NONE | Default |  |
| FLATPAK\_UNINSTALL\_FLAGS\_NO\_PRUNE | Don't prune the local OSTree repository after uninstalling |  |
| FLATPAK\_UNINSTALL\_FLAGS\_NO\_TRIGGERS | Don't call triggers after uninstalling. If used,<br>the caller must later call [`flatpak_installation_run_triggers()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-run-triggers "flatpak_installation_run_triggers ()") to update<br>the exported file. (Since: 1.0.3) |  |

Since: [0.11.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### enum FlatpakLaunchFlags

Flags to alter the behavior of [`flatpak_installation_launch_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch-full "flatpak_installation_launch_full ()").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_LAUNCH\_FLAGS\_NONE | Default |  |
| FLATPAK\_LAUNCH\_FLAGS\_DO\_NOT\_REAP | Do not reap the child. Use this if you want to wait<br>for the child with [`g_child_watch_add()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). (Since: 1.1) |  |

### enum FlatpakStorageType

Information about the storage of an installation.

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_STORAGE\_TYPE\_DEFAULT | default |  |
| FLATPAK\_STORAGE\_TYPE\_HARD\_DISK | installation is on a hard disk |  |
| FLATPAK\_STORAGE\_TYPE\_SDCARD | installation is on a SD card |  |
| FLATPAK\_STORAGE\_TYPE\_MMC | installation is on an MMC |  |
| FLATPAK\_STORAGE\_TYPE\_NETWORK | installation is on the network |  |

Since: [0.6.15](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## See Also

FlatpakTransaction

* * *

## Name

FlatpakRemote — Remote repository

## Functions

|     |     |
| --- | --- |
| [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") \* | [flatpak\_remote\_new](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-new "flatpak_remote_new ()")() |
| [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") \* | [flatpak\_remote\_new\_from\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-new-from-file "flatpak_remote_new_from_file ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-name "flatpak_remote_get_name ()")() |
| [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_appstream\_dir](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-appstream-dir "flatpak_remote_get_appstream_dir ()")() |
| [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_appstream\_timestamp](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-appstream-timestamp "flatpak_remote_get_appstream_timestamp ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_collection\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-collection-id "flatpak_remote_get_collection_id ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_collection\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-collection-id "flatpak_remote_set_collection_id ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_default\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-default-branch "flatpak_remote_get_default_branch ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_default\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-default-branch "flatpak_remote_set_default_branch ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_get\_gpg\_verify](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-gpg-verify "flatpak_remote_get_gpg_verify ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_gpg\_verify](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-gpg-verify "flatpak_remote_set_gpg_verify ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_gpg\_key](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-gpg-key "flatpak_remote_set_gpg_key ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_get\_nodeps](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-nodeps "flatpak_remote_get_nodeps ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_nodeps](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-nodeps "flatpak_remote_set_nodeps ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_get\_noenumerate](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-noenumerate "flatpak_remote_get_noenumerate ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_noenumerate](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-noenumerate "flatpak_remote_set_noenumerate ()")() |
| [int](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_get\_prio](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-prio "flatpak_remote_get_prio ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_prio](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-prio "flatpak_remote_set_prio ()")() |
| [FlatpakRemoteType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteType "enum FlatpakRemoteType") | [flatpak\_remote\_get\_remote\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-remote-type "flatpak_remote_get_remote_type ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_title](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-title "flatpak_remote_get_title ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_title](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-title "flatpak_remote_set_title ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_comment](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-comment "flatpak_remote_get_comment ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_comment](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-comment "flatpak_remote_set_comment ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_description](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-description "flatpak_remote_get_description ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_description](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-description "flatpak_remote_set_description ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_homepage](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-homepage "flatpak_remote_get_homepage ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_homepage](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-homepage "flatpak_remote_set_homepage ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_icon](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-icon "flatpak_remote_get_icon ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_icon](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-icon "flatpak_remote_set_icon ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_url](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-url "flatpak_remote_get_url ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_url](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-url "flatpak_remote_set_url ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_get\_disabled](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-disabled "flatpak_remote_get_disabled ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_disabled](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-disabled "flatpak_remote_set_disabled ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_filter](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-filter "flatpak_remote_get_filter ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_filter](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-filter "flatpak_remote_set_filter ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_get\_main\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-main-ref "flatpak_remote_get_main_ref ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_set\_main\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-main-ref "flatpak_remote_set_main_ref ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote--name "The “name” property") | Read / Write |
| [FlatpakRemoteType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteType "enum FlatpakRemoteType") | [type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote--type "The “type” property") | Read / Write / Construct Only |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote-struct "struct FlatpakRemote") |
| enum | [FlatpakRemoteType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteType "enum FlatpakRemoteType") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakRemote
```

## Description

A [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") object provides information about a remote
repository (or short: remote) that has been configured.

At its most basic level, a remote has a name and the URL for
the repository. In addition, they provide some additional
information that can be useful when presenting repositories
in a UI, such as a title, a priority or a "don't enumerate"
flags.

To obtain FlatpakRemote objects for the configured remotes
on a system, use [`flatpak_installation_list_remotes()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remotes "flatpak_installation_list_remotes ()") or
[`flatpak_installation_get_remote_by_name()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-remote-by-name "flatpak_installation_get_remote_by_name ()").

## Functions

### flatpak\_remote\_new ()

```
FlatpakRemote *
flatpak_remote_new (const char *name);
```

Returns a new remote object which can be used to configure a new remote.

Note: This is a local configuration object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") or [`flatpak_installation_add_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-add-remote "flatpak_installation_add_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| name | a name |  |

#### Returns

a new [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote").

\[transfer full\]

### flatpak\_remote\_new\_from\_file ()

```
FlatpakRemote *
flatpak_remote_new_from_file (const char *name,
                              GBytes *data,
                              GError **error);
```

Returns a new pre-filled remote object which can be used to configure a new remote.
The fields in the remote are filled in according to the values in the
passed in flatpakrepo file.

Note: This is a local configuration object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") or [`flatpak_installation_add_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-add-remote "flatpak_installation_add_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| name | a name |  |
| data | The content of a flatpakrepo file |  |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a new [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote"), or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on error.

\[transfer full\]

Since: [1.3.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_name ()

```
const char *
flatpak_remote_get_name (FlatpakRemote *self);
```

Returns the name of the remote repository.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the name.

\[transfer none\]

### flatpak\_remote\_get\_appstream\_dir ()

```
GFile *
flatpak_remote_get_appstream_dir (FlatpakRemote *self,
                                  const char *arch);
```

Returns the directory where this remote will store locally cached
appstream information for the specified _`arch`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |

#### Returns

a [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

### flatpak\_remote\_get\_appstream\_timestamp ()

```
GFile *
flatpak_remote_get_appstream_timestamp
                               (FlatpakRemote *self,
                                const char *arch);
```

Returns the timestamp file that will be updated whenever the appstream information
has been updated (or tried to update) for the specified _`arch`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| arch | which architecture to fetch (default: current architecture). | \[nullable\] |

#### Returns

a [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

### flatpak\_remote\_get\_collection\_id ()

```
char *
flatpak_remote_get_collection_id (FlatpakRemote *self);
```

Returns the repository collection ID of this remote, if set.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the collection ID, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if unset.

\[transfer full\]\[nullable\]

### flatpak\_remote\_set\_collection\_id ()

```
void
flatpak_remote_set_collection_id (FlatpakRemote *self,
                                  const char *collection_id);
```

Sets the repository collection ID of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| collection\_id | The new collection ID, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to unset. | \[nullable\] |

### flatpak\_remote\_get\_default\_branch ()

```
char *
flatpak_remote_get_default_branch (FlatpakRemote *self);
```

Returns the default branch configured for the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the default branch, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

Since: [0.6.12](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_default\_branch ()

```
void
flatpak_remote_set_default_branch (FlatpakRemote *self,
                                   const char *default_branch);
```

Sets the default branch configured for this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| default\_branch | The new default\_branch, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to unset |  |

Since: [0.6.12](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_gpg\_verify ()

```
gboolean
flatpak_remote_get_gpg_verify (FlatpakRemote *self);
```

Returns whether GPG verification is enabled for the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

whether GPG verification is enabled

### flatpak\_remote\_set\_gpg\_verify ()

```
void
flatpak_remote_set_gpg_verify (FlatpakRemote *self,
                               gboolean gpg_verify);
```

Sets the gpg\_verify config of this remote. See [`flatpak_remote_get_gpg_verify()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-gpg-verify "flatpak_remote_get_gpg_verify ()").

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| gpg\_verify | a bool |  |

### flatpak\_remote\_set\_gpg\_key ()

```
void
flatpak_remote_set_gpg_key (FlatpakRemote *self,
                            GBytes *gpg_key);
```

Sets the trusted gpg key for this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| gpg\_key | a [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with gpg binary key data |  |

### flatpak\_remote\_get\_nodeps ()

```
gboolean
flatpak_remote_get_nodeps (FlatpakRemote *self);
```

Returns whether this remote should be used to find dependencies.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

whether the remote is marked as "don't use for dependencies"

### flatpak\_remote\_set\_nodeps ()

```
void
flatpak_remote_set_nodeps (FlatpakRemote *self,
                           gboolean nodeps);
```

Sets the nodeps config of this remote. See [`flatpak_remote_get_nodeps()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-nodeps "flatpak_remote_get_nodeps ()").

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| nodeps | a bool |  |

### flatpak\_remote\_get\_noenumerate ()

```
gboolean
flatpak_remote_get_noenumerate (FlatpakRemote *self);
```

Returns whether this remote should be used to list applications.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

whether the remote is marked as "don't enumerate"

### flatpak\_remote\_set\_noenumerate ()

```
void
flatpak_remote_set_noenumerate (FlatpakRemote *self,
                                gboolean noenumerate);
```

Sets the noenumeration config of this remote. See [`flatpak_remote_get_noenumerate()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-noenumerate "flatpak_remote_get_noenumerate ()").

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| noenumerate | a bool |  |

### flatpak\_remote\_get\_prio ()

```
int
flatpak_remote_get_prio (FlatpakRemote *self);
```

Returns the priority for the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the priority

### flatpak\_remote\_set\_prio ()

```
void
flatpak_remote_set_prio (FlatpakRemote *self,
                         int prio);
```

Sets the prio config of this remote. See [`flatpak_remote_get_prio()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-prio "flatpak_remote_get_prio ()").

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| prio | a bool |  |

### flatpak\_remote\_get\_remote\_type ()

```
FlatpakRemoteType
flatpak_remote_get_remote_type (FlatpakRemote *self);
```

Get the value of [“type”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote--type "The “type” property").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the type of remote this is

Since: [0.9.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_title ()

```
char *
flatpak_remote_get_title (FlatpakRemote *self);
```

Returns the title of the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the title.

\[transfer full\]

### flatpak\_remote\_set\_title ()

```
void
flatpak_remote_set_title (FlatpakRemote *self,
                          const char *title);
```

Sets the repository title of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| title | The new title, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to unset |  |

### flatpak\_remote\_get\_comment ()

```
char *
flatpak_remote_get_comment (FlatpakRemote *self);
```

Returns the comment of the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the comment.

\[transfer full\]

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_comment ()

```
void
flatpak_remote_set_comment (FlatpakRemote *self,
                            const char *comment);
```

Sets the comment of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| comment | The new comment |  |

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_description ()

```
char *
flatpak_remote_get_description (FlatpakRemote *self);
```

Returns the description of the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the description.

\[transfer full\]

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_description ()

```
void
flatpak_remote_set_description (FlatpakRemote *self,
                                const char *description);
```

Sets the description of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| description | The new description |  |

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_homepage ()

```
char *
flatpak_remote_get_homepage (FlatpakRemote *self);
```

Returns the homepage url of the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the homepage url.

\[transfer full\]

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_homepage ()

```
void
flatpak_remote_set_homepage (FlatpakRemote *self,
                             const char *homepage);
```

Sets the homepage of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| homepage | The new homepage |  |

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_icon ()

```
char *
flatpak_remote_get_icon (FlatpakRemote *self);
```

Returns the icon url of the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the icon url.

\[transfer full\]

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_icon ()

```
void
flatpak_remote_set_icon (FlatpakRemote *self,
                         const char *icon);
```

Sets the homepage of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| icon | The new homepage |  |

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_url ()

```
char *
flatpak_remote_get_url (FlatpakRemote *self);
```

Returns the repository URL of this remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the URL.

\[transfer full\]

### flatpak\_remote\_set\_url ()

```
void
flatpak_remote_set_url (FlatpakRemote *self,
                        const char *url);
```

Sets the repository URL of this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| url | The new url |  |

### flatpak\_remote\_get\_disabled ()

```
gboolean
flatpak_remote_get_disabled (FlatpakRemote *self);
```

Returns whether this remote is disabled.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

whether the remote is marked as disabled

### flatpak\_remote\_set\_disabled ()

```
void
flatpak_remote_set_disabled (FlatpakRemote *self,
                             gboolean disabled);
```

Sets the disabled config of this remote. See [`flatpak_remote_get_disabled()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-disabled "flatpak_remote_get_disabled ()").

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| disabled | a bool |  |

### flatpak\_remote\_get\_filter ()

```
char *
flatpak_remote_get_filter (FlatpakRemote *self);
```

Returns the filter file of the remote.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

a pathname to a filter file.

\[transfer full\]

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_filter ()

```
void
flatpak_remote_set_filter (FlatpakRemote *self,
                           const char *filter_path);
```

Sets a filter for this remote.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| filter\_path | The pathname of the new filter file |  |

Since: [1.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_get\_main\_ref ()

```
char *
flatpak_remote_get_main_ref (FlatpakRemote *self);
```

Returns the main ref of this remote, if set. The main ref is the ref that an
origin remote is created for.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |

#### Returns

the main ref, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

Since: [1.1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_remote\_set\_main\_ref ()

```
void
flatpak_remote_set_main_ref (FlatpakRemote *self,
                             const char *main_ref);
```

Sets the main ref of this remote. The main ref is the ref that an origin
remote is created for.

Note: This is a local modification of this object, you must commit changes
using [`flatpak_installation_modify_remote()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()") for the changes to take
effect.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote") |  |
| main\_ref | The new main ref |  |

Since: [1.1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## Types and Values

### struct FlatpakRemote

```
struct FlatpakRemote;
```

### enum FlatpakRemoteType

Different types of _`FlatpakRemote`_
.

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_REMOTE\_TYPE\_STATIC | Statically configured remote |  |
| FLATPAK\_REMOTE\_TYPE\_USB | Dynamically detected local pathname remote |  |
| FLATPAK\_REMOTE\_TYPE\_LAN | Dynamically detected network remote |  |

## Property Details

### The `“name”` property

```
  “name”                     char *
```

Name of the remote, as used in configuration files and when interfacing
with OSTree. This is typically human readable, but could be generated, and
must conform to [`ostree_validate_remote_name()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). It should typically not be
presented in the UI.

Owner: FlatpakRemote

Flags: Read / Write

Default value: NULL

### The `“type”` property

```
  “type”                     FlatpakRemoteType
```

The type of the remote: whether it comes from static configuration files
( _`FLATPAK_REMOTE_TYPE_STATIC`_
) or has been dynamically found from the local
network or a mounted USB drive ( _`FLATPAK_REMOTE_TYPE_LAN`_
,
_`FLATPAK_REMOTE_TYPE_USB`_
). Dynamic remotes may be added and removed over
time.

Owner: FlatpakRemote

Flags: Read / Write / Construct Only

Default value: FLATPAK\_REMOTE\_TYPE\_STATIC

Since: [0.9.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

* * *

## Name

FlatpakTransactionOperation — Operation in a transaction

## Functions

|     |     |
| --- | --- |
| [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_get\_bundle\_path](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-bundle-path "flatpak_transaction_operation_get_bundle_path ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_get\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-commit "flatpak_transaction_operation_get_commit ()")() |
| [FlatpakTransactionOperationType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperationType "enum FlatpakTransactionOperationType") | [flatpak\_transaction\_operation\_get\_operation\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-operation-type "flatpak_transaction_operation_get_operation_type ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_get\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-ref "flatpak_transaction_operation_get_ref ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_get\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-remote "flatpak_transaction_operation_get_remote ()")() |
| [GKeyFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_get\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-metadata "flatpak_transaction_operation_get_metadata ()")() |
| [GKeyFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_get\_old\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-old-metadata "flatpak_transaction_operation_get_old_metadata ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_operation\_get\_download\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-download-size "flatpak_transaction_operation_get_download_size ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_operation\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-installed-size "flatpak_transaction_operation_get_installed_size ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_operation\_type\_to\_string](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-type-to-string "flatpak_transaction_operation_type_to_string ()")() |

## Types and Values

|     |     |
| --- | --- |
|  | [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation-struct "FlatpakTransactionOperation") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakTransactionOperation
```

## Description

FlatpakTransactionOperation is an object that represents a single operation
in a transaction. You receive a FlatpakTransactionOperation object with the
[“new-operation”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-new-operation "The “new-operation” signal") signal.

## Functions

### flatpak\_transaction\_operation\_get\_bundle\_path ()

```
GFile *
flatpak_transaction_operation_get_bundle_path
                               (FlatpakTransactionOperation *self);
```

Gets the path to the bundle.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the bundle [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_transaction\_operation\_get\_commit ()

```
const char *
flatpak_transaction_operation_get_commit
                               (FlatpakTransactionOperation *self);
```

Gets the commit ID for the operation.

This information is available when the transaction is resolved,
i.e. when [“ready”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") is emitted.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the commit ID.

\[transfer none\]

### flatpak\_transaction\_operation\_get\_operation\_type ()

```
FlatpakTransactionOperationType
flatpak_transaction_operation_get_operation_type
                               (FlatpakTransactionOperation *self);
```

Gets the type of the operation.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the type of operation, as [FlatpakTransactionOperationType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperationType "enum FlatpakTransactionOperationType")

### flatpak\_transaction\_operation\_get\_ref ()

```
const char *
flatpak_transaction_operation_get_ref (FlatpakTransactionOperation *self);
```

Gets the ref that the operation applies to.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the ref.

\[transfer none\]

### flatpak\_transaction\_operation\_get\_remote ()

```
const char *
flatpak_transaction_operation_get_remote
                               (FlatpakTransactionOperation *self);
```

Gets the remote that the operation applies to.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the remote.

\[transfer none\]

### flatpak\_transaction\_operation\_get\_metadata ()

```
GKeyFile *
flatpak_transaction_operation_get_metadata
                               (FlatpakTransactionOperation *self);
```

Gets the metadata that will be applicable when the
operation is done.

This can be compared to the current metadata returned
by [`flatpak_transaction_operation_get_old_metadata()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-old-metadata "flatpak_transaction_operation_get_old_metadata ()")
to find new required permissions and similar changes.

This information is available when the transaction is resolved,
i.e. when [“ready”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") is emitted.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the metadata [GKeyFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_transaction\_operation\_get\_old\_metadata ()

```
GKeyFile *
flatpak_transaction_operation_get_old_metadata
                               (FlatpakTransactionOperation *self);
```

Gets the metadata current metadata for the ref that _`self`_
works on.
Also see [`flatpak_transaction_operation_get_metadata()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-metadata "flatpak_transaction_operation_get_metadata ()").

This information is available when the transaction is resolved,
i.e. when [“ready”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") is emitted.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

the old metadata [GKeyFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_transaction\_operation\_get\_download\_size ()

```
guint64
flatpak_transaction_operation_get_download_size
                               (FlatpakTransactionOperation *self);
```

Gets the maximum download size for the operation.

Note that this does not include the size of dependencies, and
the actual download may be smaller, if some of the data is already
available locally.

For uninstall operations, this returns 0.

This information is available when the transaction is resolved,
i.e. when [“ready”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") is emitted.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [flatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

the download size, in bytes

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_operation\_get\_installed\_size ()

```
guint64
flatpak_transaction_operation_get_installed_size
                               (FlatpakTransactionOperation *self);
```

Gets the installed size for the operation.

Note that even for a new install, the extra space required on
disk may be smaller than this number, if some of the data is already
available locally.

For uninstall operations, this returns 0.

This information is available when the transaction is resolved,
i.e. when [“ready”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") is emitted.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [flatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

the installed size, in bytes

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_operation\_type\_to\_string ()

```
const char *
flatpak_transaction_operation_type_to_string
                               (FlatpakTransactionOperationType kind);
```

Converts the operation type to a string.

#### Parameters

|     |     |     |
| --- | --- | --- |
| kind | a [FlatpakTransactionOperationType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperationType "enum FlatpakTransactionOperationType") |  |

#### Returns

a string representing _`kind`_
.

\[transfer none\]

## Types and Values

### FlatpakTransactionOperation

```
typedef struct _FlatpakTransactionOperation FlatpakTransactionOperation;
```

* * *

## Name

FlatpakTransactionProgress — Progress of an operation

## Functions

|     |     |
| --- | --- |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_progress\_get\_is\_estimating](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-is-estimating "flatpak_transaction_progress_get_is_estimating ()")() |
| [int](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_progress\_get\_progress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-progress "flatpak_transaction_progress_get_progress ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_progress\_get\_status](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-status "flatpak_transaction_progress_get_status ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_progress\_set\_update\_frequency](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-set-update-frequency "flatpak_transaction_progress_set_update_frequency ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_progress\_get\_bytes\_transferred](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-bytes-transferred "flatpak_transaction_progress_get_bytes_transferred ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_progress\_get\_start\_time](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-start-time "flatpak_transaction_progress_get_start_time ()")() |

## Signals

|     |     |     |
| --- | --- | --- |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [changed](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress-changed "The “changed” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |

## Types and Values

|     |     |
| --- | --- |
|  | [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress-struct "FlatpakTransactionProgress") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakTransactionProgress
```

## Description

FlatpakTransactionProgress is an object that represents the progress
of a single operation in a transaction. You obtain a FlatpakTransactionProgress
with the [“new-operation”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-new-operation "The “new-operation” signal") signal.

## Functions

### flatpak\_transaction\_progress\_get\_is\_estimating ()

```
gboolean
flatpak_transaction_progress_get_is_estimating
                               (FlatpakTransactionProgress *self);
```

Gets whether the progress is currently estimating

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |

#### Returns

whether we're estimating

### flatpak\_transaction\_progress\_get\_progress ()

```
int
flatpak_transaction_progress_get_progress
                               (FlatpakTransactionProgress *self);
```

Gets the current progress.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |

#### Returns

the current progress, as an integer between 0 and 100

### flatpak\_transaction\_progress\_get\_status ()

```
char *
flatpak_transaction_progress_get_status
                               (FlatpakTransactionProgress *self);
```

Gets the current status string

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |

#### Returns

the current status.

\[transfer full\]

### flatpak\_transaction\_progress\_set\_update\_frequency ()

```
void
flatpak_transaction_progress_set_update_frequency
                               (FlatpakTransactionProgress *self,
                                guint update_interval);
```

Sets how often progress should be updated.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |
| update\_interval | the update interval, in milliseconds |  |

### flatpak\_transaction\_progress\_get\_bytes\_transferred ()

```
guint64
flatpak_transaction_progress_get_bytes_transferred
                               (FlatpakTransactionProgress *self);
```

Gets the number of bytes that have been transferred.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |

#### Returns

the number of bytes transferred

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_progress\_get\_start\_time ()

```
guint64
flatpak_transaction_progress_get_start_time
                               (FlatpakTransactionProgress *self);
```

Gets the time at which this operation has started, as monotonic time.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |

#### Returns

the start time

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## Types and Values

### FlatpakTransactionProgress

```
typedef struct _FlatpakTransactionProgress FlatpakTransactionProgress;
```

## Signal Details

### The `“changed”` signal

```
void
user_function (FlatpakTransactionProgress *object,
               gpointer                    user_data)
```

Emitted when some detail of the progress object changes, you can call the various methods to get the current status.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

* * *

## Name

FlatpakTransaction — Transaction information

## Functions

|     |     |
| --- | --- |
| [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") \* | [flatpak\_transaction\_new\_for\_installation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-new-for-installation "flatpak_transaction_new_for_installation ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_install](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_install\_bundle](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-bundle "flatpak_transaction_add_install_bundle ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_install\_flatpakref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-flatpakref "flatpak_transaction_add_install_flatpakref ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase "flatpak_transaction_add_rebase ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_rebase\_and\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase-and-uninstall "flatpak_transaction_add_rebase_and_uninstall ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-update "flatpak_transaction_add_update ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-uninstall "flatpak_transaction_add_uninstall ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_default\_dependency\_sources](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-default-dependency-sources "flatpak_transaction_add_default_dependency_sources ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_add\_dependency\_source](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-dependency-source "flatpak_transaction_add_dependency_source ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_run](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-run "flatpak_transaction_run ()")() |
| [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") \* | [flatpak\_transaction\_get\_current\_operation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-current-operation "flatpak_transaction_get_current_operation ()")() |
| [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") \* | [flatpak\_transaction\_get\_installation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-installation "flatpak_transaction_get_installation ()")() |
| [GList](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_get\_operations](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-operations "flatpak_transaction_get_operations ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_is\_empty](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-is-empty "flatpak_transaction_is_empty ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_disable\_dependencies](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-dependencies "flatpak_transaction_set_disable_dependencies ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_disable\_prune](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-prune "flatpak_transaction_set_disable_prune ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_disable\_related](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-related "flatpak_transaction_set_disable_related ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_disable\_static\_deltas](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-static-deltas "flatpak_transaction_set_disable_static_deltas ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_no\_deploy](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-deploy "flatpak_transaction_set_no_deploy ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_get\_no\_deploy](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-no-deploy "flatpak_transaction_get_no_deploy ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_no\_pull](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-pull "flatpak_transaction_set_no_pull ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_get\_no\_pull](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-no-pull "flatpak_transaction_get_no_pull ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_reinstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-reinstall "flatpak_transaction_set_reinstall ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_force\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-force-uninstall "flatpak_transaction_set_force_uninstall ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_default\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-default-arch "flatpak_transaction_set_default_arch ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_set\_parent\_window](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-parent-window "flatpak_transaction_set_parent_window ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_transaction\_get\_parent\_window](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-parent-window "flatpak_transaction_get_parent_window ()")() |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_transaction\_abort\_webflow](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-abort-webflow "flatpak_transaction_abort_webflow ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") \* | [installation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction--installation "The “installation” property") | Read / Write / Construct Only |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [no-interaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction--no-interaction "The “no-interaction” property") | Read / Write |

## Signals

|     |     |     |
| --- | --- | --- |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [add-new-remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-add-new-remote "The “add-new-remote” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [basic-auth-start](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-basic-auth-start "The “basic-auth-start” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [int](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [choose-remote-for-ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-choose-remote-for-ref "The “choose-remote-for-ref” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [end-of-lifed](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-end-of-lifed "The “end-of-lifed” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [end-of-lifed-with-rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-end-of-lifed-with-rebase "The “end-of-lifed-with-rebase” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [install-authenticator](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-install-authenticator "The “install-authenticator” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [new-operation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-new-operation "The “new-operation” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [operation-done](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-done "The “operation-done” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [operation-error](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-error "The “operation-error” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [ready](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [ready-pre-auth](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready-pre-auth "The “ready-pre-auth” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [void](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [webflow-done](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-webflow-done "The “webflow-done” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [webflow-start](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-webflow-start "The “webflow-start” signal") | [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |

## Types and Values

|     |     |
| --- | --- |
|  | [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-struct "FlatpakTransaction") |
| enum | [FlatpakTransactionOperationType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperationType "enum FlatpakTransactionOperationType") |
| enum | [FlatpakTransactionErrorDetails](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionErrorDetails "enum FlatpakTransactionErrorDetails") |
| enum | [FlatpakTransactionRemoteReason](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionRemoteReason "enum FlatpakTransactionRemoteReason") |
| enum | [FlatpakTransactionResult](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionResult "enum FlatpakTransactionResult") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakTransaction
```

## Implemented Interfaces

FlatpakTransaction implements
[GInitable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

## Description

FlatpakTransaction is an object representing an install/update/uninstall
transaction. You create an object like this using [`flatpak_transaction_new_for_installation()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-new-for-installation "flatpak_transaction_new_for_installation ()")
and then you add all the operations (installs, updates, etc) you wish to do. Then
you start the transaction with [`flatpak_transaction_run()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-run "flatpak_transaction_run ()") which will resolve all kinds
of dependencies and report progress and status while downloading and installing these.

The dependency resolution that is the first step of executing a transaction can
be influenced by [`flatpak_transaction_set_disable_dependencies()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-dependencies "flatpak_transaction_set_disable_dependencies ()"),
[`flatpak_transaction_set_disable_related()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-related "flatpak_transaction_set_disable_related ()"), [`flatpak_transaction_add_dependency_source()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-dependency-source "flatpak_transaction_add_dependency_source ()")
and [`flatpak_transaction_add_default_dependency_sources()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-default-dependency-sources "flatpak_transaction_add_default_dependency_sources ()").

The underlying operations that get orchestrated by a FlatpakTransaction are: pulling
new data from remote repositories, deploying newer applications or runtimes and pruning
old deployments. Which of these operations are carried out can be controlled with
[`flatpak_transaction_set_no_pull()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-pull "flatpak_transaction_set_no_pull ()"), [`flatpak_transaction_set_no_deploy()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-deploy "flatpak_transaction_set_no_deploy ()") and
[`flatpak_transaction_set_disable_prune()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-prune "flatpak_transaction_set_disable_prune ()").

A transaction is a blocking operation, and all signals are emitted in the same thread.
This means you should either handle the signals directly (say, by doing blocking console
interaction, or by just returning without interaction), or run the operation in a separate
thread and do your own forwarding to the GUI thread.

Despite the name, a FlatpakTransaction is more like a batch operation than a transaction
in the database sense. Individual operations are carried out sequentially, and are atomic.
They become visible to the system as they are completed. When an error occurs, already
completed operations are not rolled back.

For each operation that is executed during a transaction, you first get a
[“new-operation”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-new-operation "The “new-operation” signal") signal, followed by either a
[“operation-done”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-done "The “operation-done” signal") or [“operation-error”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-error "The “operation-error” signal").

The FlatpakTransaction API is threadsafe in the sense that it is safe to run two
transactions at the same time, in different threads (or processes).

Note: Transactions (or any other install/update operation) to a
system installation rely on the ability to create files that are readable
by other users. Some users set a umask that prohibits this. Unfortunately
there is no good way to work around this in a threadsafe, local way, so
such setups will break by default. The flatpak commandline app works
around this by calling umask(022) in the early setup, and it is recommended
that other apps using libflatpak do this too.

## Functions

### flatpak\_transaction\_new\_for\_installation ()

```
FlatpakTransaction *
flatpak_transaction_new_for_installation
                               (FlatpakInstallation *installation,
                                GCancellable *cancellable,
                                GError **error);
```

Creates a new [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") object that can be used to do installation
and updates of multiple refs, as well as their dependencies, in a single
operation. Set the options you want on the transaction and add the
refs you want to install/update, then start the transaction with
[`flatpak_transaction_run()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-run "flatpak_transaction_run ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| installation | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction"), or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on failure.

\[transfer full\]

### flatpak\_transaction\_add\_install ()

```
gboolean
flatpak_transaction_add_install (FlatpakTransaction *self,
                                 const char *remote,
                                 const char *ref,
                                 const char **subpaths,
                                 GError **error);
```

Adds installing the given ref to this transaction.

The _`remote`_
can either be a configured remote of the installation,
or a file:// uri pointing at a local repository to install from,
in which case an origin remote is created.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | the name of the remote |  |
| ref | the ref |  |
| subpaths | subpaths to install, or the<br>empty list or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to pull all subpaths. | \[nullable\]\[array zero-terminated=1\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

### flatpak\_transaction\_add\_install\_bundle ()

```
gboolean
flatpak_transaction_add_install_bundle
                               (FlatpakTransaction *self,
                                GFile *file,
                                GBytes *gpg_data,
                                GError **error);
```

Adds installing the given bundle to this transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| file | a [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) that is an flatpak bundle |  |
| gpg\_data | GPG key with which to check bundle signatures, or<br>[`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to use the key embedded in the bundle (if any). | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

### flatpak\_transaction\_add\_install\_flatpakref ()

```
gboolean
flatpak_transaction_add_install_flatpakref
                               (FlatpakTransaction *self,
                                GBytes *flatpakref_data,
                                GError **error);
```

Adds installing the given flatpakref to this transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| flatpakref\_data | data from a flatpakref file |  |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

### flatpak\_transaction\_add\_rebase ()

```
gboolean
flatpak_transaction_add_rebase (FlatpakTransaction *self,
                                const char *remote,
                                const char *ref,
                                const char **subpaths,
                                const char **previous_ids,
                                GError **error);
```

Adds updating the _`previous_ids`_
of the given ref to this transaction, via either
installing the _`ref`_
if it was not already present or updating it. This will
treat _`ref`_
as the result of following an eol-rebase, and data migration from
the refs in _`previous_ids`_
will be set up.

If you want to rebase the ref and uninstall the old version of it, consider
using [`flatpak_transaction_add_rebase_and_uninstall()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase-and-uninstall "flatpak_transaction_add_rebase_and_uninstall ()") instead. It will add
appropriate dependencies between the rebase and uninstall operations.

See [`flatpak_transaction_add_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()") for a description of _`remote`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | the name of the remote |  |
| ref | the ref |  |
| subpaths | the subpaths to include, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to install the complete ref. | \[nullable\] |
| previous\_ids | Previous ids to add to the<br>given ref. These should simply be the ids, not the full ref names (e.g. org.foo.Bar,<br>not org.foo.Bar/x86\_64/master). | \[nullable\]\[array zero-terminated=1\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

Since: [1.3.3.](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_add\_rebase\_and\_uninstall ()

```
gboolean
flatpak_transaction_add_rebase_and_uninstall
                               (FlatpakTransaction *self,
                                const char *remote,
                                const char *new_ref,
                                const char *old_ref,
                                const char **subpaths,
                                const char **previous_ids,
                                GError **error);
```

Adds updating the _`previous_ids`_
of the given _`new_ref`_
to this transaction,
via either installing the _`new_ref`_
if it was not already present or updating
it. This will treat _`new_ref`_
as the result of following an eol-rebase, and
data migration from the refs in _`previous_ids`_
will be set up.

Also adds an operation to uninstall _`old_ref`_
to this transaction. This
operation will only be run if the operation to install/update _`new_ref`_

succeeds.

If _`old_ref`_
is not already installed (which can happen if requesting to
install an EOLed app, rather than update one which is already installed), the
uninstall operation will silently not be added, and this function will behave
similarly to [`flatpak_transaction_add_rebase()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase "flatpak_transaction_add_rebase ()").

See [`flatpak_transaction_add_install()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()") for a description of _`remote`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | the name of the remote |  |
| new\_ref | the ref to rebase to |  |
| old\_ref | the ref to uninstall |  |
| subpaths | the subpaths to include, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to install the complete ref. | \[nullable\] |
| previous\_ids | Previous ids to add to the<br>given ref. These should simply be the ids, not the full ref names (e.g. org.foo.Bar,<br>not org.foo.Bar/x86\_64/master). | \[nullable\]\[array zero-terminated=1\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

Since: [1.15.4](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_add\_update ()

```
gboolean
flatpak_transaction_add_update (FlatpakTransaction *self,
                                const char *ref,
                                const char **subpaths,
                                const char *commit,
                                GError **error);
```

Adds updating the given ref to this transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| ref | the ref |  |
| subpaths | subpaths to install; [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)<br>to use the current set plus the set of configured languages, or<br>`{ NULL }` or `{ "", NULL }` to pull all subpaths. | \[nullable\]\[array zero-terminated=1\] |
| commit | the commit to update to, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to use the latest. | \[nullable\] |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

### flatpak\_transaction\_add\_uninstall ()

```
gboolean
flatpak_transaction_add_uninstall (FlatpakTransaction *self,
                                   const char *ref,
                                   GError **error);
```

Adds uninstalling the given ref to this transaction. If the transaction is
set to not deploy updates, the request is ignored.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| ref | the ref |  |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success; [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with _`error`_
set on failure.

### flatpak\_transaction\_add\_default\_dependency\_sources ()

```
void
flatpak_transaction_add_default_dependency_sources
                               (FlatpakTransaction *self);
```

Similar to [`flatpak_transaction_add_dependency_source()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-dependency-source "flatpak_transaction_add_dependency_source ()"), but adds
all the default installations, which means all the defined system-wide
(but not per-user) installations.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

### flatpak\_transaction\_add\_dependency\_source ()

```
void
flatpak_transaction_add_dependency_source
                               (FlatpakTransaction *self,
                                FlatpakInstallation *installation);
```

Adds an extra installation as a source for application dependencies.
This means that applications can be installed in this transaction relying
on runtimes from this additional installation (whereas it would normally
install required runtimes that are not installed in the installation
the transaction works on).

Also see [`flatpak_transaction_add_default_dependency_sources()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-default-dependency-sources "flatpak_transaction_add_default_dependency_sources ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| installation | a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation") |  |

### flatpak\_transaction\_run ()

```
gboolean
flatpak_transaction_run (FlatpakTransaction *transaction,
                         GCancellable *cancellable,
                         GError **error);
```

Executes the transaction.

During the course of the execution, various signals will get emitted.
The FlatpakTransaction::choose-remote-for-ref and
[“add-new-remote”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-add-new-remote "The “add-new-remote” signal") signals may get emitted while
resolving operations. [“ready”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal") is emitted when
the transaction has been fully resolved, and [“new-operation”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-new-operation "The “new-operation” signal")
and [“operation-done”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-done "The “operation-done” signal") are emitted while the operations
are carried out. If an error occurs at any point during the execution,
[“operation-error”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-error "The “operation-error” signal") is emitted.

Note that this call blocks until the transaction is done.

#### Parameters

|     |     |     |
| --- | --- | --- |
| transaction | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | return location for an error |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) on success, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if an error occurred

### flatpak\_transaction\_get\_current\_operation ()

```
FlatpakTransactionOperation *
flatpak_transaction_get_current_operation
                               (FlatpakTransaction *self);
```

Gets the current operation.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

the current [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation").

\[transfer full\]

### flatpak\_transaction\_get\_installation ()

```
FlatpakInstallation *
flatpak_transaction_get_installation (FlatpakTransaction *self);
```

Gets the installation this transaction was created for.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |

#### Returns

a [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation").

\[transfer full\]

### flatpak\_transaction\_get\_operations ()

```
GList *
flatpak_transaction_get_operations (FlatpakTransaction *self);
```

Gets the list of operations. Skipped operations are not included. The order
of the list is the order in which the operations are executed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

a [GList](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) of operations.

\[transfer full\]\[element-type FlatpakTransactionOperation\]

### flatpak\_transaction\_is\_empty ()

```
gboolean
flatpak_transaction_is_empty (FlatpakTransaction *self);
```

Returns whether the transaction contains any non-skipped operations.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the transaction is empty

### flatpak\_transaction\_set\_disable\_dependencies ()

```
void
flatpak_transaction_set_disable_dependencies
                               (FlatpakTransaction *self,
                                gboolean disable_dependencies);
```

Sets whether the transaction should ignore runtime dependencies
when resolving operations for applications.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| disable\_dependencies | whether to disable runtime dependencies |  |

### flatpak\_transaction\_set\_disable\_prune ()

```
void
flatpak_transaction_set_disable_prune (FlatpakTransaction *self,
                                       gboolean disable_prune);
```

Sets whether the transaction should avoid pruning the local OSTree
repository after updating.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| disable\_prune | whether to avoid pruning |  |

### flatpak\_transaction\_set\_disable\_related ()

```
void
flatpak_transaction_set_disable_related
                               (FlatpakTransaction *self,
                                gboolean disable_related);
```

Sets whether the transaction should avoid adding related refs
when resolving operations. Related refs are extensions that are
suggested by apps, such as locales.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| disable\_related | whether to avoid adding related refs |  |

### flatpak\_transaction\_set\_disable\_static\_deltas ()

```
void
flatpak_transaction_set_disable_static_deltas
                               (FlatpakTransaction *self,
                                gboolean disable_static_deltas);
```

Sets whether the transaction should avoid using static
deltas when pulling.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| disable\_static\_deltas | whether to avoid static deltas |  |

### flatpak\_transaction\_set\_no\_deploy ()

```
void
flatpak_transaction_set_no_deploy (FlatpakTransaction *self,
                                   gboolean no_deploy);
```

Sets whether the transaction should download updates, but
not deploy them.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| no\_deploy | whether to avoid deploying |  |

### flatpak\_transaction\_get\_no\_deploy ()

```
gboolean
flatpak_transaction_get_no_deploy (FlatpakTransaction *self);
```

Gets whether the transaction is only downloading updates,
and not deploying them.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if no\_deploy is set, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) otherwise

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_set\_no\_pull ()

```
void
flatpak_transaction_set_no_pull (FlatpakTransaction *self,
                                 gboolean no_pull);
```

Sets whether the transaction should operate only on locally
available data.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| no\_pull | whether to avoid pulls |  |

### flatpak\_transaction\_get\_no\_pull ()

```
gboolean
flatpak_transaction_get_no_pull (FlatpakTransaction *self);
```

Gets whether the transaction should operate only on locally
available data.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if no\_pull is set, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) otherwise

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_set\_reinstall ()

```
void
flatpak_transaction_set_reinstall (FlatpakTransaction *self,
                                   gboolean reinstall);
```

Sets whether the transaction should uninstall first if a
ref is already installed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| reinstall | whether to reinstall refs |  |

### flatpak\_transaction\_set\_force\_uninstall ()

```
void
flatpak_transaction_set_force_uninstall
                               (FlatpakTransaction *self,
                                gboolean force_uninstall);
```

Sets whether the transaction should uninstall files even
if they're used by a running application.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| force\_uninstall | whether to force-uninstall refs |  |

### flatpak\_transaction\_set\_default\_arch ()

```
void
flatpak_transaction_set_default_arch (FlatpakTransaction *self,
                                      const char *arch);
```

Sets the architecture to default to where it is unspecified.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| arch | the arch to make default |  |

### flatpak\_transaction\_set\_parent\_window ()

```
void
flatpak_transaction_set_parent_window (FlatpakTransaction *self,
                                       const char *parent_window);
```

Sets the parent window (if any) to use for any UI show by this transaction.
This is used by authenticators if they need to interact with the user during
authentication.

The format of this string depends on the display system in use, and is the
same as used by xdg-desktop-portal.

On X11 it should be of the form x11:$xid where $xid is the hex
version of the xwindows id.

On wayland is should be wayland:$handle where handle is gotten by
using the export call of the xdg-foreign-unstable wayland extension.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| parent\_window | whether to avoid pulls |  |

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_get\_parent\_window ()

```
const char *
flatpak_transaction_get_parent_window (FlatpakTransaction *self);
```

Gets the parent window set for this transaction, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if unset. See
[`flatpak_transaction_get_parent_window()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-parent-window "flatpak_transaction_get_parent_window ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |

#### Returns

a window name, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_transaction\_abort\_webflow ()

```
void
flatpak_transaction_abort_webflow (FlatpakTransaction *self,
                                   guint id);
```

Cancel an ongoing webflow authentication request. This can be call
in the time between [“webflow-start”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-webflow-start "The “webflow-start” signal") returned
[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#), and [“webflow-done”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-webflow-done "The “webflow-done” signal") is emitted. It will
cancel the ongoing authentication operation.

This is useful for example if you're showing an authenticaion
window with a browser, but the user closed it before it was finished.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| id | The webflow id, as passed into the webflow-start signal |  |

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## Types and Values

### FlatpakTransaction

```
typedef struct _FlatpakTransaction FlatpakTransaction;
```

### enum FlatpakTransactionOperationType

The type of a [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_TRANSACTION\_OPERATION\_INSTALL | Install a ref from a remote |  |
| FLATPAK\_TRANSACTION\_OPERATION\_UPDATE | Update an installed ref |  |
| FLATPAK\_TRANSACTION\_OPERATION\_INSTALL\_BUNDLE | Install a bundle from a file |  |
| FLATPAK\_TRANSACTION\_OPERATION\_UNINSTALL | Uninstall a ref |  |
| FLATPAK\_TRANSACTION\_OPERATION\_LAST\_TYPE | The (currently) last operation type |  |

### enum FlatpakTransactionErrorDetails

The details for [“operation-error”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-error "The “operation-error” signal").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_TRANSACTION\_ERROR\_DETAILS\_NON\_FATAL | The operation failure was not fatal |  |

### enum FlatpakTransactionRemoteReason

The reason for [“add-new-remote”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-add-new-remote "The “add-new-remote” signal").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_TRANSACTION\_REMOTE\_GENERIC\_REPO | The remote specified in the flatpakref has other apps too |  |
| FLATPAK\_TRANSACTION\_REMOTE\_RUNTIME\_DEPS | The remote has runtimes needed for the app |  |

### enum FlatpakTransactionResult

The details for [“operation-done”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-done "The “operation-done” signal").

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_TRANSACTION\_RESULT\_NO\_CHANGE | The update caused no changes |  |

## Property Details

### The `“installation”` property

```
  “installation”             FlatpakInstallation *
```

The installation that the transaction operates on.

Owner: FlatpakTransaction

Flags: Read / Write / Construct Only

### The `“no-interaction”` property

```
  “no-interaction”           gboolean
```

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the transaction is not interactive, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) otherwise.

See [`flatpak_transaction_set_no_interaction()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

Owner: FlatpakTransaction

Flags: Read / Write

Default value: FALSE

Since: [1.13.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## Signal Details

### The `“add-new-remote”` signal

```
gboolean
user_function (FlatpakTransaction *object,
               int                 reason,
               char               *from_id,
               char               *suggested_remote_name,
               char               *url,
               gpointer            user_data)
```

The ::add-new-remote signal gets emitted if, as part of the transaction,
it is required or recommended that a new remote is added, for the reason
described in _`reason`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| reason | A [FlatpakTransactionRemoteReason](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionRemoteReason "enum FlatpakTransactionRemoteReason") for this suggestion. | \[type FlatpakTransactionRemoteReason\] |
| from\_id | The id of the app/runtime |  |
| suggested\_remote\_name | The suggested remote name |  |
| url | The repo url |  |
| user\_data | user data set when the signal handler was connected. |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to add the remote

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“basic-auth-start”` signal

```
gboolean
user_function (FlatpakTransaction *object,
               char               *remote,
               char               *realm,
               GVariant           *options,
               int                 id,
               gpointer            user_data)
```

The ::basic-auth-start signal gets emitted when a basic user/password
authentication is needed during the operation. If the caller handles this
it should ask the user for the user and password and return [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). Once
the information is gathered call [`flatpak_transaction_complete_basic_auth()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)
with it.

If the client does not support basic auth then return [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) from this signal
(or don't implement it). This will abort the authentication and likely
result in the transaction failing (unless the authentication was somehow
optional).

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | The remote we're authenticating with |  |
| realm | The url to show |  |
| options | Extra options, currently unused |  |
| id | The id of the operation, can be used to finish it |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [1.5.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“choose-remote-for-ref”` signal

```
int
user_function (FlatpakTransaction *object,
               char               *for_ref,
               char               *runtime_ref,
               GStrv               remotes,
               gpointer            user_data)
```

The ::choose-remote-for-ref signal gets emitted when a
remote needs to be selected during the execution of the transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| for\_ref | The ref we are installing |  |
| runtime\_ref | The ref we are looking for |  |
| remotes | the remotes that has the ref, sorted in prio order |  |
| user\_data | user data set when the signal handler was connected. |  |

#### Returns

the index of the remote to use, or -1 to not pick one (and fail)

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“end-of-lifed”` signal

```
void
user_function (FlatpakTransaction *object,
               char               *ref,
               char               *reason,
               char               *rebase,
               gpointer            user_data)
```

The ::end-of-lifed signal gets emitted when a ref is found to
be marked as end-of-life during the execution of the transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| ref | The ref we are installing |  |
| reason | The eol reason, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| rebase | The new name, if rebased, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“end-of-lifed-with-rebase”` signal

```
gboolean
user_function (FlatpakTransaction *object,
               char               *remote,
               char               *ref,
               char               *reason,
               char               *rebased_to_ref,
               GStrv               previous_ids,
               gpointer            user_data)
```

The ::end-of-lifed-with-rebase signal gets emitted when a ref is found
to be marked as end-of-life before the transaction begins. Unlike
[“end-of-lifed”](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-end-of-lifed "The “end-of-lifed” signal"), this signal allows for the
transaction to be modified in order to e.g. install the rebased
ref.

If the caller wants to install the rebased ref, they should call
[`flatpak_transaction_add_rebase_and_uninstall()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase-and-uninstall "flatpak_transaction_add_rebase_and_uninstall ()") on _`rebased_to_ref`_
and _`ref`_
,
and return [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). Otherwise [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) may be returned.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | The remote for the ref we are processing |  |
| ref | The ref we are processing |  |
| reason | The eol reason, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| rebased\_to\_ref | The new name, if rebased, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| previous\_ids | The previous names for the rebased ref (if any), including the one from _`ref`_ |  |
| user\_data | user data set when the signal handler was connected. |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the operation on this end-of-lifed ref should
be skipped (e.g. because the rebased ref has been added to the
transaction), [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if it should remain.

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [1.3.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“install-authenticator”` signal

```
void
user_function (FlatpakTransaction *object,
               char               *remote,
               char               *authenticator_ref,
               gpointer            user_data)
```

The ::install-authenticator signal gets emitted if, as part of
resolving the transaction, we need to use an authenticator, but the authentication
is not installed, but is available to be installed from the ref.

The application can handle this signal, and if so create another transaction
to install the authenticator.

The default handler does nothing, and if the authenticator is not installed when
the signal handler fails the transaction will error out.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | The remote name |  |
| authenticator\_ref | The ref for the authenticator |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [1.8.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“new-operation”` signal

```
void
user_function (FlatpakTransaction          *object,
               FlatpakTransactionOperation *operation,
               FlatpakTransactionProgress  *progress,
               gpointer                     user_data)
```

The ::new-operation signal gets emitted during the execution of
the transaction when a new operation is beginning.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| operation | The new [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") |  |
| progress | A [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress") for _`operation`_ |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“operation-done”` signal

```
void
user_function (FlatpakTransaction          *object,
               FlatpakTransactionOperation *operation,
               char                        *commit,
               int                          result,
               gpointer                     user_data)
```

The ::operation-done signal gets emitted during the execution of
the transaction when an operation is finished.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| operation | The [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") which finished |  |
| commit | The commit. | \[nullable\] |
| result | A [FlatpakTransactionResult](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionResult "enum FlatpakTransactionResult") giving details about the result. | \[type FlatpakTransactionResult\] |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“operation-error”` signal

```
gboolean
user_function (FlatpakTransaction          *object,
               FlatpakTransactionOperation *operation,
               GError                      *error,
               int                          details,
               gpointer                     user_data)
```

The ::operation-error signal gets emitted when an error occurs during the
execution of the transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| operation | The [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation") which failed |  |
| error | A [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| details | A [FlatpakTransactionErrorDetails](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionErrorDetails "enum FlatpakTransactionErrorDetails") with details about the error. | \[type FlatpakTransactionErrorDetails\] |
| user\_data | user data set when the signal handler was connected. |  |

#### Returns

the [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to continue transaction, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to stop

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“ready”` signal

```
gboolean
user_function (FlatpakTransaction *object,
               gpointer            user_data)
```

The ::ready signal is emitted when all the refs involved in the operation
have been resolved to commits, and the required authentication for all ops is gotten.
At this point [`flatpak_transaction_get_operations()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-operations "flatpak_transaction_get_operations ()") will return all the operations
that will be executed as part of the transaction.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| user\_data | user data set when the signal handler was connected. |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to carry on with the transaction, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to abort

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“ready-pre-auth”` signal

```
gboolean
user_function (FlatpakTransaction *object,
               gpointer            user_data)
```

The ::ready-pre-auth signal is emitted when all the refs involved in the
transaction have been resolved to commits, but we might not necessarily
have asked for authentication for all their required operations. This is
very similar to the ::ready signal, and you can choose which one (or both)
to use depending on how you want to handle authentication in your user
interface.

At this point [`flatpak_transaction_get_operations()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-operations "flatpak_transaction_get_operations ()") will return all the
operations that will be executed as part of the transaction. You can call
[`flatpak_transaction_operation_get_requires_authentication()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to see which
will require authentication.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| user\_data | user data set when the signal handler was connected. |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to carry on with the transaction, [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) to abort

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [1.9.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“webflow-done”` signal

```
void
user_function (FlatpakTransaction *object,
               GVariant           *options,
               int                 id,
               gpointer            user_data)
```

The ::webflow-done signal gets emitted when the authentication
finished the webflow, independent of the reason and results. If
you for were showing a web-browser window it can now be closed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| options | Extra options, currently unused |  |
| id | The id of the operation |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### The `“webflow-start”` signal

```
gboolean
user_function (FlatpakTransaction *object,
               char               *remote,
               char               *url,
               GVariant           *options,
               int                 id,
               gpointer            user_data)
```

The ::webflow-start signal gets emitted when some kind of user
authentication is needed during the operation. If the caller handles this
it should show the url in a webbrowser and return [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). This will
eventually cause the webbrowser to finish the authentication operation and
operation will continue, as signaled by the webflow-done being emitted.

If the client does not support webflow then return [`FALSE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) from this signal
(or don't implement it). This will abort the authentication and likely
result in the transaction failing (unless the authentication was somehow
optional).

During the time between webflow-start and webflow-done the client can call
[`flatpak_transaction_abort_webflow()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-abort-webflow "flatpak_transaction_abort_webflow ()") to manually abort the authentication.
This is useful if the user aborted the authentication operation some way,
like e.g. closing the browser window.

#### Parameters

|     |     |     |
| --- | --- | --- |
| object | A [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction") |  |
| remote | The remote we're authenticating with |  |
| url | The url to show |  |
| options | Extra options, currently unused |  |
| id | The id of the operation, can be used to cancel it |  |
| user\_data | user data set when the signal handler was connected. |  |

Flags: [Run Last](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [1.5.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

* * *

## Name

FlatpakRef — Application reference

## Functions

|     |     |
| --- | --- |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_ref\_format\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-format-ref "flatpak_ref_format_ref ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_ref\_get\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-arch "flatpak_ref_get_arch ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_ref\_get\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-branch "flatpak_ref_get_branch ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_ref\_get\_collection\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-collection-id "flatpak_ref_get_collection_id ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_ref\_get\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-commit "flatpak_ref_get_commit ()")() |
| [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind") | [flatpak\_ref\_get\_kind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-kind "flatpak_ref_get_kind ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_ref\_get\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-name "flatpak_ref_get_name ()")() |
| [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") \* | [flatpak\_ref\_parse](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-parse "flatpak_ref_parse ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--arch "The “arch” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--branch "The “branch” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [collection-id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--collection-id "The “collection-id” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--commit "The “commit” property") | Read / Write / Construct Only |
| [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind") | [kind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--kind "The “kind” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--name "The “name” property") | Read / Write / Construct Only |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef-struct "struct FlatpakRef") |
| enum | [FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakRef
        ├── FlatpakBundleRef
        ├── FlatpakInstalledRef
        ├── FlatpakRelatedRef
        ╰── FlatpakRemoteRef
```

## Description

Currently Flatpak manages two types of binary artifacts: applications, and
runtimes. Applications contain a program that desktop users can run, while
runtimes contain only libraries and data. An FlatpakRef object (or short: ref)
can refer to either of these.

Both applications and runtimes are identified by a 4-tuple of strings: kind,
name, arch and branch, e.g. app/org.gnome.evince/x86\_64/master. The functions
[`flatpak_ref_parse()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-parse "flatpak_ref_parse ()") and [`flatpak_ref_format_ref()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-format-ref "flatpak_ref_format_ref ()") can be used to convert
FlatpakRef objects into this string representation and back.

Note that the identifiers must be unique within a repo (e.g. Flathub) based
only on the name, arch, and branch 3-tuple, without regard to the kind. In
other words if app/org.gnome.evince/x86\_64/master exists,
runtime/org.gnome.evince/x86\_64/master must not exist. This requirement is
not enforced by libflatpak but is enforced by GNOME Software's use of
libappstream, since Appstream IDs are assumed to be unique.

FlatpakRef objects are immutable and can be passed freely between threads.

To uniquely identify a particular version of an application or runtime, you
need a commit.

The subclasses [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") and [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") provide more information
for artifacts that are locally installed or available from a remote repository.

## Functions

### flatpak\_ref\_format\_ref ()

```
char *
flatpak_ref_format_ref (FlatpakRef *self);
```

Convert an FlatpakRef object into a string representation that
can be parsed by [`flatpak_ref_parse()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-parse "flatpak_ref_parse ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

string representation.

\[transfer full\]

### flatpak\_ref\_get\_arch ()

```
const char *
flatpak_ref_get_arch (FlatpakRef *self);
```

Gets the arch or the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

the arch.

\[transfer none\]

### flatpak\_ref\_get\_branch ()

```
const char *
flatpak_ref_get_branch (FlatpakRef *self);
```

Gets the branch of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

the branch.

\[transfer none\]

### flatpak\_ref\_get\_collection\_id ()

```
const char *
flatpak_ref_get_collection_id (FlatpakRef *self);
```

Gets the collection ID of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

the collection ID.

\[transfer none\]

### flatpak\_ref\_get\_commit ()

```
const char *
flatpak_ref_get_commit (FlatpakRef *self);
```

Gets the commit of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

the commit.

\[transfer none\]

### flatpak\_ref\_get\_kind ()

```
FlatpakRefKind
flatpak_ref_get_kind (FlatpakRef *self);
```

Gets the kind of artifact that this ref refers to.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

the kind of artifact

### flatpak\_ref\_get\_name ()

```
const char *
flatpak_ref_get_name (FlatpakRef *self);
```

Gets the name of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") |  |

#### Returns

the name.

\[transfer none\]

### flatpak\_ref\_parse ()

```
FlatpakRef *
flatpak_ref_parse (const char *ref,
                   GError **error);
```

Tries to parse a full ref name and return a [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef") (without a
commit set) or fail if the ref is invalid somehow.

#### Parameters

|     |     |     |
| --- | --- | --- |
| ref | A string ref name, such as "app/org.test.App/x86\_64/master" |  |
| error | return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

an [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef"), or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer full\]

## Types and Values

### struct FlatpakRef

```
struct FlatpakRef;
```

### enum FlatpakRefKind

The kind of artifact that a FlatpakRef refers to.

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_REF\_KIND\_APP | An application |  |
| FLATPAK\_REF\_KIND\_RUNTIME | A runtime that applications can use. |  |

## Property Details

### The `“arch”` property

```
  “arch”                     char *
```

The architecture of the application or runtime.

Owner: FlatpakRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“branch”` property

```
  “branch”                   char *
```

The branch of the application or runtime.

Owner: FlatpakRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“collection-id”` property

```
  “collection-id”            char *
```

The collection ID.

Owner: FlatpakRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“commit”` property

```
  “commit”                   char *
```

The commit.

Owner: FlatpakRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“kind”` property

```
  “kind”                     FlatpakRefKind
```

The kind of artifact.

Owner: FlatpakRef

Flags: Read / Write / Construct Only

Default value: FLATPAK\_REF\_KIND\_APP

### The `“name”` property

```
  “name”                     char *
```

The name of the application or runtime.

Owner: FlatpakRef

Flags: Read / Write / Construct Only

Default value: NULL

* * *

## Name

FlatpakInstalledRef — Installed application reference

## Functions

|     |     |
| --- | --- |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_deploy\_dir](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-deploy-dir "flatpak_installed_ref_get_deploy_dir ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installed\_ref\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-installed-size "flatpak_installed_ref_get_installed_size ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_installed\_ref\_get\_is\_current](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-is-current "flatpak_installed_ref_get_is_current ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_latest\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-latest-commit "flatpak_installed_ref_get_latest_commit ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_origin](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-origin "flatpak_installed_ref_get_origin ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_load\_appdata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-load-appdata "flatpak_installed_ref_load_appdata ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_load\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-load-metadata "flatpak_installed_ref_load_metadata ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_appdata\_license](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-license "flatpak_installed_ref_get_appdata_license ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_appdata\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-name "flatpak_installed_ref_get_appdata_name ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_appdata\_summary](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-summary "flatpak_installed_ref_get_appdata_summary ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_appdata\_version](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-version "flatpak_installed_ref_get_appdata_version ()")() |
| [GHashTable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_appdata\_content\_rating](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-content-rating "flatpak_installed_ref_get_appdata_content_rating ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_appdata\_content\_rating\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-content-rating-type "flatpak_installed_ref_get_appdata_content_rating_type ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \\* const \* | [flatpak\_installed\_ref\_get\_subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-subpaths "flatpak_installed_ref_get_subpaths ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_eol](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-eol "flatpak_installed_ref_get_eol ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_installed\_ref\_get\_eol\_rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-eol-rebase "flatpak_installed_ref_get_eol_rebase ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [GHashTable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [appdata-content-rating](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-content-rating "The “appdata-content-rating” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [appdata-content-rating-type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-content-rating-type "The “appdata-content-rating-type” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [appdata-license](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-license "The “appdata-license” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [appdata-name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-name "The “appdata-name” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [appdata-summary](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-summary "The “appdata-summary” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [appdata-version](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-version "The “appdata-version” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [deploy-dir](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--deploy-dir "The “deploy-dir” property") | Read / Write |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [end-of-life](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--end-of-life "The “end-of-life” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [end-of-life-rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--end-of-life-rebase "The “end-of-life-rebase” property") | Read / Write / Construct Only |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [installed-size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--installed-size "The “installed-size” property") | Read / Write |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [is-current](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--is-current "The “is-current” property") | Read / Write |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [latest-commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--latest-commit "The “latest-commit” property") | Read / Write |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [origin](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--origin "The “origin” property") | Read / Write |
| [GStrv](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--subpaths "The “subpaths” property") | Read / Write |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef-struct "struct FlatpakInstalledRef") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakRef
        ╰── FlatpakInstalledRef
```

## Description

A FlatpakInstalledRef provides information about an installed
application or runtime (in short: ref), such as the available
builds, its size, location, etc.

## Functions

### flatpak\_installed\_ref\_get\_deploy\_dir ()

```
const char *
flatpak_installed_ref_get_deploy_dir (FlatpakInstalledRef *self);
```

Gets the deploy dir of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the deploy dir.

\[transfer none\]

### flatpak\_installed\_ref\_get\_installed\_size ()

```
guint64
flatpak_installed_ref_get_installed_size
                               (FlatpakInstalledRef *self);
```

Returns the installed size of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the installed size

### flatpak\_installed\_ref\_get\_is\_current ()

```
gboolean
flatpak_installed_ref_get_is_current (FlatpakInstalledRef *self);
```

Returns whether the ref is current.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the ref is current

### flatpak\_installed\_ref\_get\_latest\_commit ()

```
const char *
flatpak_installed_ref_get_latest_commit
                               (FlatpakInstalledRef *self);
```

Gets the latest commit of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the latest commit.

\[transfer none\]\[nullable\]

### flatpak\_installed\_ref\_get\_origin ()

```
const char *
flatpak_installed_ref_get_origin (FlatpakInstalledRef *self);
```

Gets the origin of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the origin.

\[transfer none\]

### flatpak\_installed\_ref\_load\_appdata ()

```
GBytes *
flatpak_installed_ref_load_appdata (FlatpakInstalledRef *self,
                                    GCancellable *cancellable,
                                    GError **error);
```

Loads the compressed xml appdata for this ref (if it exists).

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | a return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) containing the compressed appdata file,
or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if an error occurred.

\[transfer full\]

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_load\_metadata ()

```
GBytes *
flatpak_installed_ref_load_metadata (FlatpakInstalledRef *self,
                                     GCancellable *cancellable,
                                     GError **error);
```

Loads the metadata file for this ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |
| cancellable | a [GCancellable](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#). | \[nullable\] |
| error | a return location for a [GError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |

#### Returns

a [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) containing the metadata file,
or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if an error occurred.

\[transfer full\]

### flatpak\_installed\_ref\_get\_appdata\_license ()

```
const char *
flatpak_installed_ref_get_appdata_license
                               (FlatpakInstalledRef *self);
```

Returns the license field from the appdata.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the license or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_get\_appdata\_name ()

```
const char *
flatpak_installed_ref_get_appdata_name
                               (FlatpakInstalledRef *self);
```

Returns the name field from the appdata.

The returned string is localized.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the name or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_get\_appdata\_summary ()

```
const char *
flatpak_installed_ref_get_appdata_summary
                               (FlatpakInstalledRef *self);
```

Returns the summary field from the appdata.

The returned string is localized.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the summary or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_get\_appdata\_version ()

```
const char *
flatpak_installed_ref_get_appdata_version
                               (FlatpakInstalledRef *self);
```

Returns the default version field from the appdata.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the version or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

Since: [1.1.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_get\_appdata\_content\_rating ()

```
GHashTable *
flatpak_installed_ref_get_appdata_content_rating
                               (FlatpakInstalledRef *self);
```

Returns the content rating field from the appdata. This is a potentially
empty mapping of content rating attribute IDs to values, to be interpreted
by the semantics of the content rating type (see
[`flatpak_installed_ref_get_appdata_content_rating_type()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-content-rating-type "flatpak_installed_ref_get_appdata_content_rating_type ()")).

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the content
rating or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]\[nullable\]\[element-type utf8 utf8\]

Since: [1.4.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_get\_appdata\_content\_rating\_type ()

```
const char *
flatpak_installed_ref_get_appdata_content_rating_type
                               (FlatpakInstalledRef *self);
```

Returns the content rating type from the appdata. For example, `oars-1.0` or
`oars-1.1`.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the content rating type or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]\[nullable\]

Since: [1.4.2](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_installed\_ref\_get\_subpaths ()

```
const char * const *
flatpak_installed_ref_get_subpaths (FlatpakInstalledRef *self);
```

Returns the subpaths that are installed, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if all files installed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

A strv, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_installed\_ref\_get\_eol ()

```
const char *
flatpak_installed_ref_get_eol (FlatpakInstalledRef *self);
```

Returns the end-of-life reason string, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the
ref is not end-of-lifed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the end-of-life reason or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_installed\_ref\_get\_eol\_rebase ()

```
const char *
flatpak_installed_ref_get_eol_rebase (FlatpakInstalledRef *self);
```

Returns the end-of-life rebased ref, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the
ref is not end-of-lifed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef") |  |

#### Returns

the end-of-life rebased ref or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

## Types and Values

### struct FlatpakInstalledRef

```
struct FlatpakInstalledRef;
```

## Property Details

### The `“appdata-content-rating”` property

```
  “appdata-content-rating”   GHashTable *
```

The content rating data from the appdata.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

### The `“appdata-content-rating-type”` property

```
  “appdata-content-rating-type” char *
```

The type of the content rating data from the appdata.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“appdata-license”` property

```
  “appdata-license”          char *
```

The license from the appdata.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“appdata-name”` property

```
  “appdata-name”             char *
```

The localized name field from the appdata.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“appdata-summary”` property

```
  “appdata-summary”          char *
```

The localized summary field from the appdata.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“appdata-version”` property

```
  “appdata-version”          char *
```

The default version field from the appdata.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“deploy-dir”` property

```
  “deploy-dir”               char *
```

Where the application is installed.

Owner: FlatpakInstalledRef

Flags: Read / Write

Default value: NULL

### The `“end-of-life”` property

```
  “end-of-life”              char *
```

The reason for the ref to be end of life.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“end-of-life-rebase”` property

```
  “end-of-life-rebase”       char *
```

The new ref for the end-of-lifed ref.

Owner: FlatpakInstalledRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“installed-size”` property

```
  “installed-size”           guint64
```

The installed size of the application.

Owner: FlatpakInstalledRef

Flags: Read / Write

Default value: 0

### The `“is-current”` property

```
  “is-current”               gboolean
```

Whether the application is current.

Owner: FlatpakInstalledRef

Flags: Read / Write

Default value: FALSE

### The `“latest-commit”` property

```
  “latest-commit”            char *
```

The latest commit.

Owner: FlatpakInstalledRef

Flags: Read / Write

Default value: NULL

### The `“origin”` property

```
  “origin”                   char *
```

The origin.

Owner: FlatpakInstalledRef

Flags: Read / Write

Default value: NULL

### The `“subpaths”` property

```
  “subpaths”                 GStrv
```

The subpaths for a partially installed ref.

Owner: FlatpakInstalledRef

Flags: Read / Write

* * *

## Name

FlatpakRelatedRef — Related application reference

## Functions

|     |     |
| --- | --- |
| [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") \* | [flatpak\_related\_ref\_new](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-new "flatpak_related_ref_new ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \\* const \* | [flatpak\_related\_ref\_get\_subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-get-subpaths "flatpak_related_ref_get_subpaths ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_related\_ref\_should\_download](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-download "flatpak_related_ref_should_download ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_related\_ref\_should\_delete](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-delete "flatpak_related_ref_should_delete ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_related\_ref\_should\_autoprune](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-autoprune "flatpak_related_ref_should_autoprune ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [should-autoprune](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--should-autoprune "The “should-autoprune” property") | Read / Write / Construct Only |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [should-delete](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--should-delete "The “should-delete” property") | Read / Write / Construct Only |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [should-download](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--should-download "The “should-download” property") | Read / Write / Construct Only |
| [GStrv](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--subpaths "The “subpaths” property") | Read / Write / Construct Only |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef-struct "struct FlatpakRelatedRef") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakRef
        ╰── FlatpakRelatedRef
```

## Description

A FlatpakRelatedRef provides information about a ref that is related
to another ref. For instance, the local extension ref of an app.

## Functions

### flatpak\_related\_ref\_new ()

```
FlatpakRelatedRef *
flatpak_related_ref_new (const char *full_ref,
                         const char *commit,
                         char **subpaths,
                         gboolean download,
                         gboolean delete);
```

Creates a new FlatpakRelatedRef object.

#### Parameters

|     |     |     |
| --- | --- | --- |
| full\_ref | a full ref to refer to |  |
| commit | a commit ID to refer to. | \[nullable\] |
| subpaths | a nul-terminated array of subpaths. | \[nullable\] |
| download | whether to auto-download the ref with the main ref |  |
| delete | whether to auto-delete the ref with the main ref |  |

#### Returns

a new ref

### flatpak\_related\_ref\_get\_subpaths ()

```
const char * const *
flatpak_related_ref_get_subpaths (FlatpakRelatedRef *self);
```

Returns the subpaths that should be installed/updated for the ref.
This returns [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if all files should be installed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") |  |

#### Returns

A strv, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

Since: [0.6.7](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_related\_ref\_should\_download ()

```
gboolean
flatpak_related_ref_should_download (FlatpakRelatedRef *self);
```

Returns whether to auto-download the ref with the main ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the ref should be downloaded with the main ref.

Since: [0.6.7](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_related\_ref\_should\_delete ()

```
gboolean
flatpak_related_ref_should_delete (FlatpakRelatedRef *self);
```

Returns whether to auto-delete the ref with the main ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the ref should be deleted with the main ref.

Since: [0.6.7](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_related\_ref\_should\_autoprune ()

```
gboolean
flatpak_related_ref_should_autoprune (FlatpakRelatedRef *self);
```

Returns whether to delete when pruning unused refs.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the ref should be considered unused when pruning.

Since: [0.11.8](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## Types and Values

### struct FlatpakRelatedRef

```
struct FlatpakRelatedRef;
```

## Property Details

### The `“should-autoprune”` property

```
  “should-autoprune”         gboolean
```

Whether to delete when pruning unused refs.

Owner: FlatpakRelatedRef

Flags: Read / Write / Construct Only

Default value: FALSE

### The `“should-delete”` property

```
  “should-delete”            gboolean
```

Whether to auto-delete the ref with the main ref.

Owner: FlatpakRelatedRef

Flags: Read / Write / Construct Only

Default value: FALSE

### The `“should-download”` property

```
  “should-download”          gboolean
```

Whether to auto-download the ref with the main ref.

Owner: FlatpakRelatedRef

Flags: Read / Write / Construct Only

Default value: FALSE

### The `“subpaths”` property

```
  “subpaths”                 GStrv
```

The subpaths for a partially installed ref.

Owner: FlatpakRelatedRef

Flags: Read / Write / Construct Only

* * *

## Name

FlatpakRemoteRef — Remote application reference

## Functions

|     |     |
| --- | --- |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_ref\_get\_remote\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-remote-name "flatpak_remote_ref_get_remote_name ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_ref\_get\_download\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-download-size "flatpak_remote_ref_get_download_size ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_ref\_get\_eol](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-eol "flatpak_remote_ref_get_eol ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_ref\_get\_eol\_rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-eol-rebase "flatpak_remote_ref_get_eol_rebase ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_remote\_ref\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-installed-size "flatpak_remote_ref_get_installed_size ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_remote\_ref\_get\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-metadata "flatpak_remote_ref_get_metadata ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [download-size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--download-size "The “download-size” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [end-of-life](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--end-of-life "The “end-of-life” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [end-of-life-rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--end-of-life-rebase "The “end-of-life-rebase” property") | Read / Write / Construct Only |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [installed-size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--installed-size "The “installed-size” property") | Read / Write / Construct Only |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--metadata "The “metadata” property") | Read / Write / Construct Only |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [remote-name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--remote-name "The “remote-name” property") | Read / Write / Construct Only |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef-struct "struct FlatpakRemoteRef") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakRef
        ╰── FlatpakRemoteRef
```

## Description

A FlatpakRemoteRef provides information about an application or runtime
(in short: ref) that is available from a remote repository.

## Functions

### flatpak\_remote\_ref\_get\_remote\_name ()

```
const char *
flatpak_remote_ref_get_remote_name (FlatpakRemoteRef *self);
```

Gets the remote name of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") |  |

#### Returns

the remote name.

\[transfer none\]

### flatpak\_remote\_ref\_get\_download\_size ()

```
guint64
flatpak_remote_ref_get_download_size (FlatpakRemoteRef *self);
```

Returns the download size of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") |  |

#### Returns

the download size

### flatpak\_remote\_ref\_get\_eol ()

```
const char *
flatpak_remote_ref_get_eol (FlatpakRemoteRef *self);
```

Returns the end-of-life reason string, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the
ref is not end-of-lifed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") |  |

#### Returns

the end-of-life reason or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_remote\_ref\_get\_eol\_rebase ()

```
const char *
flatpak_remote_ref_get_eol_rebase (FlatpakRemoteRef *self);
```

Returns the end-of-life rebased ref, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the
ref is not end-of-lifed.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") |  |

#### Returns

the end-of-life rebased ref or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]

### flatpak\_remote\_ref\_get\_installed\_size ()

```
guint64
flatpak_remote_ref_get_installed_size (FlatpakRemoteRef *self);
```

Returns the installed size of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") |  |

#### Returns

the installed size

### flatpak\_remote\_ref\_get\_metadata ()

```
GBytes *
flatpak_remote_ref_get_metadata (FlatpakRemoteRef *self);
```

Returns the app metadata from the metadata cache of the ref.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef") |  |

#### Returns

a [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with the metadata file
contents or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[transfer none\]\[nullable\]

## Types and Values

### struct FlatpakRemoteRef

```
struct FlatpakRemoteRef;
```

## Property Details

### The `“download-size”` property

```
  “download-size”            guint64
```

The download size of the application.

Owner: FlatpakRemoteRef

Flags: Read / Write / Construct Only

Default value: 0

### The `“end-of-life”` property

```
  “end-of-life”              char *
```

The reason for the ref to be end of life.

Owner: FlatpakRemoteRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“end-of-life-rebase”` property

```
  “end-of-life-rebase”       char *
```

The new ref for the end of lifeed ref.

Owner: FlatpakRemoteRef

Flags: Read / Write / Construct Only

Default value: NULL

### The `“installed-size”` property

```
  “installed-size”           guint64
```

The installed size of the application.

Owner: FlatpakRemoteRef

Flags: Read / Write / Construct Only

Default value: 0

### The `“metadata”` property

```
  “metadata”                 GBytes *
```

The metadata info for the application.

Owner: FlatpakRemoteRef

Flags: Read / Write / Construct Only

### The `“remote-name”` property

```
  “remote-name”              char *
```

The name of the remote.

Owner: FlatpakRemoteRef

Flags: Read / Write / Construct Only

Default value: NULL

* * *

## Name

FlatpakBundleRef — Application bundle reference

## Functions

|     |     |
| --- | --- |
| [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") \* | [flatpak\_bundle\_ref\_new](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-new "flatpak_bundle_ref_new ()")() |
| [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_bundle\_ref\_get\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-file "flatpak_bundle_ref_get_file ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_bundle\_ref\_get\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-metadata "flatpak_bundle_ref_get_metadata ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_bundle\_ref\_get\_appstream](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-appstream "flatpak_bundle_ref_get_appstream ()")() |
| [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_bundle\_ref\_get\_icon](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-icon "flatpak_bundle_ref_get_icon ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_bundle\_ref\_get\_origin](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-origin "flatpak_bundle_ref_get_origin ()")() |
| [guint64](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_bundle\_ref\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-installed-size "flatpak_bundle_ref_get_installed_size ()")() |
| [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_bundle\_ref\_get\_runtime\_repo\_url](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-runtime-repo-url "flatpak_bundle_ref_get_runtime_repo_url ()")() |

## Properties

|     |     |     |
| --- | --- | --- |
| [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef--file "The “file” property") | Read / Write / Construct Only |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef-struct "struct FlatpakBundleRef") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakRef
        ╰── FlatpakBundleRef
```

## Description

A FlatpakBundleRef refers to a single-file bundle containing an
application or runtime.

## Functions

### flatpak\_bundle\_ref\_new ()

```
FlatpakBundleRef *
flatpak_bundle_ref_new (GFile *file,
                        GError **error);
```

Creates a new bundle ref for the given file.

#### Parameters

|     |     |     |
| --- | --- | --- |
| file | a [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) |  |
| error | return location for an error. | \[allow-none\] |

#### Returns

a new bundle ref.

### flatpak\_bundle\_ref\_get\_file ()

```
GFile *
flatpak_bundle_ref_get_file (FlatpakBundleRef *self);
```

Get the file this bundle is stored in.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") |  |

#### Returns

(transfer full) : an [GFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_bundle\_ref\_get\_metadata ()

```
GBytes *
flatpak_bundle_ref_get_metadata (FlatpakBundleRef *self);
```

Get the metadata for the app/runtime

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") |  |

#### Returns

(transfer full) : an [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with the metadata contents, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_bundle\_ref\_get\_appstream ()

```
GBytes *
flatpak_bundle_ref_get_appstream (FlatpakBundleRef *self);
```

Get the compressed appstream for the app/runtime

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") |  |

#### Returns

(transfer full) : an [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with the appstream contents, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_bundle\_ref\_get\_icon ()

```
GBytes *
flatpak_bundle_ref_get_icon (FlatpakBundleRef *self,
                             int size);
```

Get the icon png data for the app/runtime

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") |  |
| size | 64 or 128 |  |

#### Returns

(transfer full) : an [GBytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) with png contents

### flatpak\_bundle\_ref\_get\_origin ()

```
char *
flatpak_bundle_ref_get_origin (FlatpakBundleRef *self);
```

Get the origin url stored in the bundle

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") |  |

#### Returns

(transfer full) : an url string, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_bundle\_ref\_get\_installed\_size ()

```
guint64
flatpak_bundle_ref_get_installed_size (FlatpakBundleRef *self);
```

Returns the installed size for the bundle.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a FlatpakBundleRef |  |

#### Returns

the installed size

### flatpak\_bundle\_ref\_get\_runtime\_repo\_url ()

```
char *
flatpak_bundle_ref_get_runtime_repo_url
                               (FlatpakBundleRef *self);
```

Get the runtime flatpakrepo url stored in the bundle (if any)

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef") |  |

#### Returns

(transfer full) : an url string, or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

Since: [0.8.0](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

## Types and Values

### struct FlatpakBundleRef

```
struct FlatpakBundleRef;
```

## Property Details

### The `“file”` property

```
  “file”                     GFile *
```

The bundle file that this ref refers to.

Owner: FlatpakBundleRef

Flags: Read / Write / Construct Only

* * *

## Name

FlatpakInstance — Information about a running sandbox

## Functions

|     |     |
| --- | --- |
| [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_all](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-all "flatpak_instance_get_all ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-id "flatpak_instance_get_id ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_app](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-app "flatpak_instance_get_app ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-arch "flatpak_instance_get_arch ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-branch "flatpak_instance_get_branch ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-commit "flatpak_instance_get_commit ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_runtime](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-runtime "flatpak_instance_get_runtime ()")() |
| const [char](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_runtime\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-runtime-commit "flatpak_instance_get_runtime_commit ()")() |
| [int](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_instance\_get\_pid](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-pid "flatpak_instance_get_pid ()")() |
| [int](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_instance\_get\_child\_pid](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-child-pid "flatpak_instance_get_child_pid ()")() |
| [GKeyFile](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) \* | [flatpak\_instance\_get\_info](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-info "flatpak_instance_get_info ()")() |
| [gboolean](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) | [flatpak\_instance\_is\_running](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-is-running "flatpak_instance_is_running ()")() |

## Types and Values

|     |     |
| --- | --- |
| struct | [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance-struct "struct FlatpakInstance") |

## Object Hierarchy

```
    GObject
    ╰── FlatpakInstance
```

## Description

A FlatpakInstance refers to a running sandbox, and contains
some basic information about the sandbox setup, such as the
application and runtime used inside the sandbox.

Importantly, it also gives access to the PID of the main
processes in the sandbox.

One way to obtain FlatpakInstances is to use [`flatpak_instance_get_all()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-all "flatpak_instance_get_all ()").
Another way is to use [`flatpak_installation_launch_full()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch-full "flatpak_installation_launch_full ()").

Note that process lifecycle tracking is fundamentally racy.
You have to be prepared for the sandbox and the processes
represented by a FlatpakInstance to not be around anymore.

The FlatpakInstance api was added in Flatpak 1.1.

## Functions

### flatpak\_instance\_get\_all ()

```
GPtrArray *
flatpak_instance_get_all (void);
```

Gets FlatpakInstance objects for all running sandboxes in the current session.

#### Returns

a [GPtrArray](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) of
[FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") objects.

\[transfer full\]\[element-type FlatpakInstance\]

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_id ()

```
const char *
flatpak_instance_get_id (FlatpakInstance *self);
```

Gets the instance ID. The ID is used by Flatpak for bookkeeping
purposes and has no further relevance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the instance ID

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_app ()

```
const char *
flatpak_instance_get_app (FlatpakInstance *self);
```

Gets the application ID of the application running in the instance.

Note that this may return [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) for sandboxes that don't have an application.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the application ID or [`NULL`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#).

\[nullable\]

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_arch ()

```
const char *
flatpak_instance_get_arch (FlatpakInstance *self);
```

Gets the architecture of the application running in the instance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the architecture

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_branch ()

```
const char *
flatpak_instance_get_branch (FlatpakInstance *self);
```

Gets the branch of the application running in the instance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the architecture

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_commit ()

```
const char *
flatpak_instance_get_commit (FlatpakInstance *self);
```

Gets the commit of the application running in the instance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the commit

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_runtime ()

```
const char *
flatpak_instance_get_runtime (FlatpakInstance *self);
```

Gets the ref of the runtime used in the instance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the runtime ref

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_runtime\_commit ()

```
const char *
flatpak_instance_get_runtime_commit (FlatpakInstance *self);
```

Gets the commit of the runtime used in the instance.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the runtime commit

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_pid ()

```
int
flatpak_instance_get_pid (FlatpakInstance *self);
```

Gets the PID of the outermost process in the sandbox. This is not the
application process itself, but a bubblewrap 'babysitter' process.

See [`flatpak_instance_get_child_pid()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-child-pid "flatpak_instance_get_child_pid ()").

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the outermost process PID

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_child\_pid ()

```
int
flatpak_instance_get_child_pid (FlatpakInstance *self);
```

Gets the PID of the application process in the sandbox.

See [`flatpak_instance_get_pid()`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-pid "flatpak_instance_get_pid ()").

Note that this function may return 0 immediately after launching
a sandbox, for a short amount of time.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the application process PID

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_get\_info ()

```
GKeyFile *
flatpak_instance_get_info (FlatpakInstance *self);
```

Gets a keyfile that holds information about the running sandbox.

This file is available as /.flatpak-info inside the sandbox as well.

The most important data in the keyfile is available with separate getters,
but there may be more information in the keyfile.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

the flatpak-info keyfile

Since: [1.1](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#)

### flatpak\_instance\_is\_running ()

```
gboolean
flatpak_instance_is_running (FlatpakInstance *self);
```

Finds out if the sandbox represented by _`self`_
is still running.

#### Parameters

|     |     |     |
| --- | --- | --- |
| self | a [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance") |  |

#### Returns

[`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) if the sandbox is still running

## Types and Values

### struct FlatpakInstance

```
struct FlatpakInstance;
```

* * *

## Name

Error codes

## Types and Values

|     |     |
| --- | --- |
| #define | [FLATPAK\_ERROR](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR:CAPS "FLATPAK_ERROR") |
| enum | [FlatpakError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakError "enum FlatpakError") |
| #define | [FLATPAK\_PORTAL\_ERROR](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-PORTAL-ERROR:CAPS "FLATPAK_PORTAL_ERROR") |
| enum | [FlatpakPortalError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakPortalError "enum FlatpakPortalError") |

## Description

The FlatpakError and FlatpakPortalError enumerations contain error codes
for some common errors.

## Functions

## Types and Values

### FLATPAK\_ERROR

```
#define FLATPAK_ERROR flatpak_error_quark ()
```

The error domain for [FlatpakError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakError "enum FlatpakError") errors.

### enum FlatpakError

Error codes for library functions.

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_ERROR\_ALREADY\_INSTALLED | App/runtime/remote is already installed |  |
| FLATPAK\_ERROR\_NOT\_INSTALLED | App/runtime is not installed |  |
| FLATPAK\_ERROR\_ONLY\_PULLED | App/runtime was only pulled into the local<br>repository but not installed. |  |
| FLATPAK\_ERROR\_DIFFERENT\_REMOTE | The App/Runtime is already installed, but from a different remote. |  |
| FLATPAK\_ERROR\_ABORTED | The transaction was aborted (returned [`TRUE`](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) in operation-error signal). |  |
| FLATPAK\_ERROR\_SKIPPED | The App/Runtime install was skipped due to earlier errors. |  |
| FLATPAK\_ERROR\_NEED\_NEW\_FLATPAK | The App/Runtime needs a more recent version of flatpak. |  |
| FLATPAK\_ERROR\_REMOTE\_NOT\_FOUND | The specified remote was not found. |  |
| FLATPAK\_ERROR\_RUNTIME\_NOT\_FOUND | A runtime needed for the app was not found. |  |
| FLATPAK\_ERROR\_DOWNGRADE | The pulled commit is a downgrade, and a downgrade wasn't<br>specifically allowed. (Since: 1.0) |  |
| FLATPAK\_ERROR\_INVALID\_REF | A ref could not be parsed. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_INVALID\_DATA | Invalid data. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_UNTRUSTED | Missing GPG key or signature. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_SETUP\_FAILED | Sandbox setup failed. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_EXPORT\_FAILED | Exporting data failed. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_REMOTE\_USED | Remote can't be uninstalled. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_RUNTIME\_USED | Runtime can't be uninstalled. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_INVALID\_NAME | Application, runtime or remote name is invalid. (Since: 1.0.3) |  |
| FLATPAK\_ERROR\_OUT\_OF\_SPACE | More disk space needed. (Since: 1.2.0) |  |
| FLATPAK\_ERROR\_WRONG\_USER | An operation is being attempted by the wrong user (such as<br>root operating on a user installation). (Since: 1.2.0) |  |
| FLATPAK\_ERROR\_NOT\_CACHED | Cached data was requested, but it was not available. (Since: 1.4.0) |  |
| FLATPAK\_ERROR\_REF\_NOT\_FOUND | The specified ref was not found. (Since: 1.4.0) |  |
| FLATPAK\_ERROR\_PERMISSION\_DENIED | An operation was not allowed by the administrative policy.<br>For example, an app is not allowed to be installed due<br>to not complying with the parental controls policy. (Since: 1.5.1) |  |
| FLATPAK\_ERROR\_AUTHENTICATION\_FAILED | An authentication operation failed, for example, no<br>correct password was supplied. (Since: 1.7.3) |  |
| FLATPAK\_ERROR\_NOT\_AUTHORIZED | An operation tried to access a ref, or information about it that it<br>was not authorized. For example, when succesfully authenticating with a<br>server but the user doesn't have permissions for a private ref. (Since: 1.7.3) |  |

### FLATPAK\_PORTAL\_ERROR

```
#define FLATPAK_PORTAL_ERROR flatpak_portal_error_quark ()
```

The error domain for [FlatpakPortalError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakPortalError "enum FlatpakPortalError") errors.

### enum FlatpakPortalError

Error codes returned by portal calls.

#### Members

|     |     |     |
| --- | --- | --- |
| FLATPAK\_PORTAL\_ERROR\_FAILED | General portal failure |  |
| FLATPAK\_PORTAL\_ERROR\_INVALID\_ARGUMENT | An argument was invalid |  |
| FLATPAK\_PORTAL\_ERROR\_NOT\_FOUND | The object was not found |  |
| FLATPAK\_PORTAL\_ERROR\_EXISTS | The object already exists |  |
| FLATPAK\_PORTAL\_ERROR\_NOT\_ALLOWED | The call was not allowed |  |
| FLATPAK\_PORTAL\_ERROR\_CANCELLED | The call was cancelled by the user |  |
| FLATPAK\_PORTAL\_ERROR\_WINDOW\_DESTROYED | The window was destroyed by the user |  |

* * *

## Name

Version information

## Functions

|     |     |
| --- | --- |
| #define | [FLATPAK\_CHECK\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-CHECK-VERSION:CAPS "FLATPAK_CHECK_VERSION()")() |

## Types and Values

|     |     |
| --- | --- |
| #define | [FLATPAK\_MAJOR\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-MAJOR-VERSION:CAPS "FLATPAK_MAJOR_VERSION") |
| #define | [FLATPAK\_MINOR\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-MINOR-VERSION:CAPS "FLATPAK_MINOR_VERSION") |
| #define | [FLATPAK\_MICRO\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-MICRO-VERSION:CAPS "FLATPAK_MICRO_VERSION") |

## Description

These macros can be used to check the library version in use.

## Functions

### FLATPAK\_CHECK\_VERSION()

```
#define             FLATPAK_CHECK_VERSION(major,minor,micro)
```

Check that the current version is at least _`major`_
. _`minor`_
. _`micro`_
.

#### Parameters

|     |     |     |
| --- | --- | --- |
| major | major version to compare against |  |
| minor | minor version to compare against |  |
| micro | micro version to compare against |  |

## Types and Values

### FLATPAK\_MAJOR\_VERSION

```
#define FLATPAK_MAJOR_VERSION (1)
```

The major version.

### FLATPAK\_MINOR\_VERSION

```
#define FLATPAK_MINOR_VERSION (17)
```

The minor version.

### FLATPAK\_MICRO\_VERSION

```
#define FLATPAK_MICRO_VERSION (0)
```

The micro version.

# D-Bus APIs

**Table of Contents**

[org.freedesktop.Flatpak.Authenticator](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.Authenticator)[org.freedesktop.Flatpak.AuthenticatorRequest](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.AuthenticatorRequest)[org.freedesktop.Flatpak.Development](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.Development) — Flatpak development interface[org.freedesktop.Flatpak.SessionHelper](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.SessionHelper) — Flatpak session service[org.freedesktop.Flatpak.SystemHelper](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.Flatpak.SystemHelper) — Flatpak system service[org.freedesktop.impl.portal.PermissionStore](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.impl.portal.PermissionStore) — Database to store permissions[org.freedesktop.portal.Documents](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.portal.Documents) — Document portal[org.freedesktop.portal.Flatpak](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.portal.Flatpak) — Flatpak portal[org.freedesktop.portal.Flatpak.UpdateMonitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-org.freedesktop.portal.Flatpak.UpdateMonitor)

## Name

org.freedesktop.Flatpak.Authenticator

## Methods

```
RequestRefTokens (IN  s           handle_token,
                  IN  a{sv}       authenticator_options,
                  IN  s           remote,
                  IN  s           remote_uri,
                  IN  a(ssia{sv}) refs,
                  IN  a{sv}       options,
                  IN  s           parent_window,
                  OUT o           handle);
```

## Properties

```
version  readable   u
```

## Description

## Method Details

### The RequestRefTokens() method

```
RequestRefTokens (IN  s           handle_token,
                  IN  a{sv}       authenticator_options,
                  IN  s           remote,
                  IN  s           remote_uri,
                  IN  a(ssia{sv}) refs,
                  IN  a{sv}       options,
                  IN  s           parent_window,
                  OUT o           handle);
```

object path element. See the [org.freedesktop.Flatpak.AuthenticatorRequest](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-interface-org-freedesktop-Flatpak-AuthenticatorRequest.top_of_page) documentation for
more information about the _`handle`_.
_`authenticator_options`_: Data from the xa.authenticator-options key in the configuration for the remote, it is up to the authenticator to interpret this how it wants.
_`remote`_: The name of the remote we're pulling from.
_`remote_uri`_: The uri of the remote we're pulling from.
_`refs`_: An array of ref that flatpak wants to pull and info about each ref.
_`options`_: An extensible dict with extra options.
_`parent_window`_: Identifier for the application window, see [xdg-desktop-portal docs](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) for details on its format.
_`handle`_: Object path for the [org.freedesktop.Flatpak.AuthenticatorRequest](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-interface-org-freedesktop-Flatpak-AuthenticatorRequest.top_of_page) object representing this call.

Starts a request for resolving the tokens to use for _`refs`_ from the _`remote`_ (with uri _`remote_uri`_).

This is not a regular dbus call that blocks until the result is done, instead it creates
a org.freedesktop.Flatpak.AuthenticatorRequest object representing the ongoing operation and
returns an object path _`handle`_ to it. When the operation succeds the Response signal is emitted
on the request with a response status and a dict with details.

The _`refs`_ array elements are of type (ssia{sv}) where the items are:

|     |
| --- |
| s: The ref being pulled |
| s: The exact commit being pulled |
| i: The token-type of the commit |
| a{sv}: Extra per-ref metadata, currenlty only has summary.\* fields which are copied from the summary per-commit metadata. |

On success (response 0) the returned details should have:

tokens a{sas}

A list of tokens (the first element of the struct), and the refs (the second).


For other response types, see the [org.freedesktop.Flatpak.AuthenticatorRequest](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-interface-org-freedesktop-Flatpak-AuthenticatorRequest.top_of_page) docs.

Exactly how the authenticator decides on what token to use is up to each implementation, but typically it needs to talk to
some kind of network service which in turn may need interaction such as login or entering credit card details.
This can be done in two ways:

The authenticator can use a native ui toolkit directly (as its running in the session). To make this work well the
flatpak client can (if its has a UI) pass in the _`parent_window`_ argument, allowing the authenticator to open its
dialog in a way that is correctly parented.

Alternatively, if the interaction is web-based, then rather than showing a web browser itself it can emit
the WebFlow signal on the request object, which lets the flatpak client show a webview embedded in its ui in a
way that works best with its user interface.

For simple user/password authentication (such as http basic authentication systems) there is also a BasicAuth signal
that can be used to get the user to interactively authenticate. This kind of authentication is quite limited, but
if used it can allow nice interactive authentication even in the command line case.

Currently used keys in the _`options`_ argument:

xa.oci-registry-uri s

For OCI remotes this is extracted from the summary file and contains the uri to the OCI registry that
contains the images.


no-interation b

If true, the authenticator should not do any interaction (and fail instead if it needs to). This can be enabled by
clients that want to run in the background.


`IN s handle_token`:

A string that will be used as the last element of the _`handle`_. Must be a valid

`IN a{sv} authenticator_options`:

`IN s remote`:

`IN s remote_uri`:

`IN a(ssia{sv}) refs`:

`IN a{sv} options`:

`IN s parent_window`:

`OUT o handle`:

## Property Details

### The "version" property

```
version  readable   u
```

* * *

## Name

org.freedesktop.Flatpak.AuthenticatorRequest

## Methods

```
Close          ();
BasicAuthReply (IN  s     user,
                IN  s     password,
                IN  a{sv} options);
```

## Signals

```
Webflow     (s     uri,
             a{sv} options);
WebflowDone (a{sv} options);
BasicAuth   (s     realm,
             a{sv} options);
Response    (u     response,
             a{sv} results);
```

## Description

## Method Details

### The Close() method

```
Close ();
```

Closes the authenticator request to which this object refers and ends all
related user interaction (dialogs, webflows etc).

A Response signal with the cancelled response will be emitted if the operation
was cancelled. There is still a posibility of a race, so the operation might succeed
or fail before processing the close request, so there is no guarantee that the
operation will be cancelled.

### The BasicAuthReply() method

```
BasicAuthReply (IN  s     user,
                IN  s     password,
                IN  a{sv} options);
```

Call to finish the request started with the BasicAuth signal.

`IN s user`:

The user

`IN s password`:

The password

`IN a{sv} options`:

An extensible dict with extra options.

## Signal Details

### The "Webflow" signal

```
Webflow (s     uri,
         a{sv} options);
```

Emitted by the authenticator when it needs to do web-based interaction. The
client handles this by showing the URI in a graphical web view. Typically the uri
includes information about a final redirect to a localhost uri that will happen
when the operation is finished allowing the authenticator to get the result of
the operation. This is similar to how OAUTH2 webflows typically work.

If at any point the user closes or otherwise dismisses the web view the client
should call the org.freedesktop.Flatpak.AuthenticatorRequest.Close method to
tell the authenticator that the operation is aborted.

`s uri`:

The uri to show

`a{sv} options`:

An extensible dict with extra options.

### The "WebflowDone" signal

```
WebflowDone (a{sv} options);
```

Emitted by the authenticator when the web view is done, at this point the client
can close the WebView.

`a{sv} options`:

An extensible dict with extra options.

### The "BasicAuth" signal

```
BasicAuth (s     realm,
           a{sv} options);
```

Emitted by the authenticator when it needs to do a simple user + password authentication.
This is only useful for very simple authentication interaction, but this is still used (for
instance for http basic access authentication), and for those cases this allows a nicely
integrated UI and CLI experience.

`s realm`:

String showing what the auth is for, similar to http basic auth realm.

`a{sv} options`:

An extensible dict with extra options.

### The "Response" signal

```
Response (u     response,
          a{sv} results);
```

Emitted when the user interaction for a portal request is over.
The _`response`_ indicates how the user interaction ended:


|     |
| --- |
| 0: Success, the request is carried out |
| 1: The user cancelled the interaction |
| 2: The user interaction was ended in some other way |

In the case of an error (response 2) _`results`_ can contain a error-message value
describing what went wrong.

`u response`:

Numeric response

`a{sv} results`:

Vardict with results. The keys and values in the vardict depend on the request.

* * *

## Name

org.freedesktop.Flatpak.Development — Flatpak development interface

## Methods

```
HostCommand       (IN  ay    cwd_path,
                   IN  aay   argv,
                   IN  a{uh} fds,
                   IN  a{ss} envs,
                   IN  u     flags,
                   OUT u     pid);
HostCommandSignal (IN  u     pid,
                   IN  u     signal,
                   IN  b     to_process_group);
```

## Signals

```
HostCommandExited (u pid,
                   u exit_status);
```

## Properties

```
version  readable   u
```

## Description

The Development interface lets any client, possibly in a sandbox if
it has access to the session helper, spawn a process on the host,
outside any sandbox.

Clearly this is not something you typically want a sandboxed app to
do: it is a sandbox escape allowing arbitrary code execution,
and must not be allowed for applications where sandboxing is
intended to be a security boundary.

However, it is very useful when using Flatpak for distribution and
choice of runtime library stack, without intending to create a
security boundary. For instance, if an IDE like GNOME Builder is
distributed as a trusted Flatpak app and will be used to build other
Flatpak apps, it needs to use this facility to launch a Flatpak
build operation inside the sandbox, because otherwise recursive
calls to flatpak will not work.

This interface is provided on the D-Bus session bus by the
well-known D-Bus name org.freedesktop.Flatpak,
at the object path /org/freedesktop/Flatpak/Development.

This documentation describes version 1 of this interface.

## Method Details

### The HostCommand() method

```
HostCommand (IN  ay    cwd_path,
             IN  aay   argv,
             IN  a{uh} fds,
             IN  a{ss} envs,
             IN  u     flags,
             OUT u     pid);
```

This method lets trusted applications (insider or outside a
sandbox) run arbitrary commands in the user's session, outside
any sandbox.

The following flags values are supported:

1 (FLATPAK\_HOST\_COMMAND\_FLAGS\_CLEAR\_ENV)

Clear the environment.


2 (FLATPAK\_HOST\_COMMAND\_FLAGS\_WATCH\_BUS)

Kill the sandbox when the caller disappears from the session bus.


Unknown (unsupported) flags are an error and will cause HostCommand()
to fail.

Note that unlike [Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method"), there
is no options parameter here.

`IN ay cwd_path`:

the working directory for the new process

`IN aay argv`:

the argv for the new process, starting with the executable to launch

`IN a{uh} fds`:

an array of file descriptors to pass to the new process

`IN a{ss} envs`:

an array of variable/value pairs for the environment of the new process

`IN u flags`:

flags

`OUT u pid`:

the PID of the new process

### The HostCommandSignal() method

```
HostCommandSignal (IN  u pid,
                   IN  u signal,
                   IN  b to_process_group);
```

This method lets you send a Unix signal to a process
that was started with [HostCommand()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-Flatpak-Development.HostCommand "The HostCommand() method").
The _`pid`_ argument here must be a PID that was returned by a
call to HostCommand() from the same sender: terminating unrelated
processes is not allowed.

`IN u pid`:

the process ID on the host system

`IN u signal`:

the signal to send (see [signal(7)](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#signal))

`IN b to_process_group`:

whether to send the signal to the process group

## Signal Details

### The "HostCommandExited" signal

```
HostCommandExited (u pid,
                   u exit_status);
```

Emitted when a process started by
[HostCommand()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-Flatpak-Development.HostCommand "The HostCommand() method") exits.
Use g\_spawn\_check\_exit\_status(), or the macros such as
WIFEXITED documented in
[waitpid(2)](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#waitpid),
to interpret the _`exit_status`_.

This signal is not emitted for processes that were not launched
directly by HostCommand(), for example if a process launched by
HostCommand() runs foreground or background child processes.

`u pid`:

the PID of the process that has ended

`u exit_status`:

the wait status (see [waitpid(2)](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#waitpid))

## Property Details

### The "version" property

```
version  readable   u
```

The API version number.
This documentation describes version 1 of this interface.

* * *

## Name

org.freedesktop.Flatpak.SessionHelper — Flatpak session service

## Methods

```
RequestSession (OUT a{sv} data);
```

## Properties

```
version  readable   u
```

## Description

The Flatpak session service is used by the
**flatpak run** command
to bridge various resources from the host system into Flatpak
sandboxes. It is not intended to be contacted by third-party
applications or libraries.

This interface is provided on the D-Bus session bus by the
well-known D-Bus name org.freedesktop.Flatpak,
at the object path /org/freedesktop/Flatpak/SessionHelper.

Note that the service owning the org.freedesktop.Flatpak
well-known name also exports the
org.freedesktop.Flatpak.Development interface. As a result,
letting a sandboxed application contact that well-known name
is a sandbox escape, which must only be allowed for trusted
applications where there is not intended to be any security
boundary between sandbox and host system.

This documentation describes version 1 of this interface.

## Method Details

### The RequestSession() method

```
RequestSession (OUT a{sv} data);
```

Set up monitoring and resources for a
**flatpak run** session.
See the Flatpak source code for details.

`OUT a{sv} data`:

Information about the new session

## Property Details

### The "version" property

```
version  readable   u
```

The API version number.
This documentation describes version 1 of this interface.

* * *

## Name

org.freedesktop.Flatpak.SystemHelper — Flatpak system service

## Methods

```
Deploy             (IN  ay repo_path,
                    IN  u  flags,
                    IN  s  ref,
                    IN  s  origin,
                    IN  as subpaths,
                    IN  as previous_ids,
                    IN  s  installation);
DeployAppstream    (IN  ay repo_path,
                    IN  u  flags,
                    IN  s  origin,
                    IN  s  arch,
                    IN  s  installation);
Uninstall          (IN  u  flags,
                    IN  s  ref,
                    IN  s  installation);
InstallBundle      (IN  ay bundle_path,
                    IN  u  flags,
                    IN  s  remote,
                    IN  s  installation,
                    OUT s  ref);
ConfigureRemote    (IN  u  flags,
                    IN  s  remote,
                    IN  s  config,
                    IN  ay gpg_key,
                    IN  s  installation);
Configure          (IN  u  flags,
                    IN  s  key,
                    IN  s  value,
                    IN  s  installation);
UpdateRemote       (IN  u  flags,
                    IN  s  remote,
                    IN  s  installation,
                    IN  ay summary_path,
                    IN  ay summary_sig_path);
RemoveLocalRef     (IN  u  flags,
                    IN  s  remote,
                    IN  s  ref,
                    IN  s  installation);
PruneLocalRepo     (IN  u  flags,
                    IN  s  installation);
RunTriggers        (IN  u  flags,
                    IN  s  installation);
EnsureRepo         (IN  u  flags,
                    IN  s  installation);
UpdateSummary      (IN  u  flags,
                    IN  s  installation);
GenerateOciSummary (IN  u  flags,
                    IN  s  origin,
                    IN  s  installation);
CancelPull         (IN  u  flags,
                    IN  s  installation,
                    IN  s  src_dir);
GetRevokefsFd      (IN  u  flags,
                    IN  s  installation,
                    OUT h  fd_index,
                    OUT s  src_dir);
```

## Properties

```
version  readable   u
```

## Description

The Flatpak system service is used by the libflatpak library
to manipulate Flatpak applications and runtimes that are installed
system-wide, for example when implementing
**flatpak install**.
It is not intended to be contacted by third-party applications
or libraries. See the Flatpak source code for more
details of this interface's methods.

This interface is provided on the D-Bus system bus by the
well-known D-Bus name org.freedesktop.Flatpak.SystemHelper,
at the object path /org/freedesktop/Flatpak/SystemHelper.

The system helper runs as a privileged user at the system level,
and receives method calls from less-privileged users.
Authorization for method calls on this interface is mediated by
polkit (formerly PolicyKit) using the policy configuration
org.freedesktop.Flatpak.policy, and can be configured by
system administrators in the same way as for any other system service
that uses polkit.

## Method Details

### The Deploy() method

```
Deploy (IN  ay repo_path,
        IN  u  flags,
        IN  s  ref,
        IN  s  origin,
        IN  as subpaths,
        IN  as previous_ids,
        IN  s  installation);
```

`IN ay repo_path`:

`IN u flags`:

`IN s ref`:

`IN s origin`:

`IN as subpaths`:

`IN as previous_ids`:

`IN s installation`:

### The DeployAppstream() method

```
DeployAppstream (IN  ay repo_path,
                 IN  u  flags,
                 IN  s  origin,
                 IN  s  arch,
                 IN  s  installation);
```

`IN ay repo_path`:

`IN u flags`:

`IN s origin`:

`IN s arch`:

`IN s installation`:

### The Uninstall() method

```
Uninstall (IN  u flags,
           IN  s ref,
           IN  s installation);
```

`IN u flags`:

`IN s ref`:

`IN s installation`:

### The InstallBundle() method

```
InstallBundle (IN  ay bundle_path,
               IN  u  flags,
               IN  s  remote,
               IN  s  installation,
               OUT s  ref);
```

`IN ay bundle_path`:

`IN u flags`:

`IN s remote`:

`IN s installation`:

`OUT s ref`:

### The ConfigureRemote() method

```
ConfigureRemote (IN  u  flags,
                 IN  s  remote,
                 IN  s  config,
                 IN  ay gpg_key,
                 IN  s  installation);
```

`IN u flags`:

`IN s remote`:

`IN s config`:

`IN ay gpg_key`:

`IN s installation`:

### The Configure() method

```
Configure (IN  u flags,
           IN  s key,
           IN  s value,
           IN  s installation);
```

`IN u flags`:

`IN s key`:

`IN s value`:

`IN s installation`:

### The UpdateRemote() method

```
UpdateRemote (IN  u  flags,
              IN  s  remote,
              IN  s  installation,
              IN  ay summary_path,
              IN  ay summary_sig_path);
```

`IN u flags`:

`IN s remote`:

`IN s installation`:

`IN ay summary_path`:

`IN ay summary_sig_path`:

### The RemoveLocalRef() method

```
RemoveLocalRef (IN  u flags,
                IN  s remote,
                IN  s ref,
                IN  s installation);
```

`IN u flags`:

`IN s remote`:

`IN s ref`:

`IN s installation`:

### The PruneLocalRepo() method

```
PruneLocalRepo (IN  u flags,
                IN  s installation);
```

`IN u flags`:

`IN s installation`:

### The RunTriggers() method

```
RunTriggers (IN  u flags,
             IN  s installation);
```

`IN u flags`:

`IN s installation`:

### The EnsureRepo() method

```
EnsureRepo (IN  u flags,
            IN  s installation);
```

`IN u flags`:

`IN s installation`:

### The UpdateSummary() method

```
UpdateSummary (IN  u flags,
               IN  s installation);
```

`IN u flags`:

`IN s installation`:

### The GenerateOciSummary() method

```
GenerateOciSummary (IN  u flags,
                    IN  s origin,
                    IN  s installation);
```

`IN u flags`:

`IN s origin`:

`IN s installation`:

### The CancelPull() method

```
CancelPull (IN  u flags,
            IN  s installation,
            IN  s src_dir);
```

`IN u flags`:

`IN s installation`:

`IN s src_dir`:

### The GetRevokefsFd() method

```
GetRevokefsFd (IN  u flags,
               IN  s installation,
               OUT h fd_index,
               OUT s src_dir);
```

`IN u flags`:

`IN s installation`:

`OUT h fd_index`:

`OUT s src_dir`:

## Property Details

### The "version" property

```
version  readable   u
```

* * *

## Name

org.freedesktop.impl.portal.PermissionStore — Database to store permissions

## Methods

```
Lookup           (IN  s      table,
                  IN  s      id,
                  OUT a{sas} permissions,
                  OUT v      data);
Set              (IN  s      table,
                  IN  b      create,
                  IN  s      id,
                  IN  a{sas} app_permissions,
                  IN  v      data);
Delete           (IN  s      table,
                  IN  s      id);
SetValue         (IN  s      table,
                  IN  b      create,
                  IN  s      id,
                  IN  v      data);
SetPermission    (IN  s      table,
                  IN  b      create,
                  IN  s      id,
                  IN  s      app,
                  IN  as     permissions);
DeletePermission (IN  s      table,
                  IN  s      id,
                  IN  s      app);
List             (IN  s      table,
                  OUT as     ids);
```

## Signals

```
Changed (s      table,
         s      id,
         b      deleted,
         v      data,
         a{sas} permissions);
```

## Properties

```
version  readable   u
```

## Description

The permission store can be used by portals to store permissions
that sandboxed applications have to various resources, such as
files outside the sandbox.

Since the resources managed by portals can be varied, the permission
store is fairly free-form: there can be multiple tables; resources are
identified by an ID, as are applications, and permissions are stored as
string arrays. None of these strings are interpreted by the permission
store in any way.

In addition, the permission store allows to associate extra data
(in the form of a GVariant) with each resource.

This document describes version 2 of the permission store interface.

## Method Details

### The Lookup() method

```
Lookup (IN  s      table,
        IN  s      id,
        OUT a{sas} permissions,
        OUT v      data);
```

Looks up the entry for a resource in one of the tables and returns
all associated application permissions and data.

`IN s table`:

the name of the table to use

`IN s id`:

the resource ID to look up

`OUT a{sas} permissions`:

map from application ID to permissions

`OUT v data`:

data that is associated with the resource

### The Set() method

```
Set (IN  s      table,
     IN  b      create,
     IN  s      id,
     IN  a{sas} app_permissions,
     IN  v      data);
```

Writes the entry for a resource in the given table.

`IN s table`:

the name of the table to use

`IN b create`:

whether to create the table if it does not exist

`IN s id`:

the resource ID to modify

`IN a{sas} app_permissions`:

map from application ID to permissions

`IN v data`:

data to associate with the resource

### The Delete() method

```
Delete (IN  s table,
        IN  s id);
```

Removes the entry for a resource in the given table.

`IN s table`:

the name of the table to use

`IN s id`:

the resource ID to delete

### The SetValue() method

```
SetValue (IN  s table,
          IN  b create,
          IN  s id,
          IN  v data);
```

Sets just the data for a resource in the given table.

`IN s table`:

the name of the table to use

`IN b create`:

whether to create the table if it does not exist

`IN s id`:

the resource ID to modify

`IN v data`:

data to associate with the resource

### The SetPermission() method

```
SetPermission (IN  s  table,
               IN  b  create,
               IN  s  id,
               IN  s  app,
               IN  as permissions);
```

Sets the permissions for an application and a resource
in the given table.

`IN s table`:

the name of the table to use

`IN b create`:

whether to create the table if it does not exist

`IN s id`:

the resource ID to modify

`IN s app`:

the application ID to modify

`IN as permissions`:

permissions to set

### The DeletePermission() method

```
DeletePermission (IN  s table,
                  IN  s id,
                  IN  s app);
```

Removes the entry for an application and a resource
in the given table.

This method was added in version 2.

`IN s table`:

the name of the table to use

`IN s id`:

the resource ID to modify

`IN s app`:

the application ID to modify

### The List() method

```
List (IN  s  table,
      OUT as ids);
```

Returns all the resources that are present in the table.

`IN s table`:

the name of the table to use

`OUT as ids`:

IDs of all resources that are present in the table

## Signal Details

### The "Changed" signal

```
Changed (s      table,
         s      id,
         b      deleted,
         v      data,
         a{sas} permissions);
```

The Changed signal is emitted when the entry for a resource
is modified or deleted. If the entry was deleted, then _`data`_
and _`permissions`_ contain the last values that were found in the
database. If the entry was modified, they contain the new values.

`s table`:

the name of the table

`s id`:

`b deleted`:

whether the resource was deleted

`v data`:

the data that is associated the resource

`a{sas} permissions`:

the permissions that are associated with the resource

## Property Details

### The "version" property

```
version  readable   u
```

* * *

## Name

org.freedesktop.portal.Documents — Document portal

## Methods

```
GetMountPoint     (OUT ay     path);
Add               (IN  h      o_path_fd,
                   IN  b      reuse_existing,
                   IN  b      persistent,
                   OUT s      doc_id);
AddNamed          (IN  h      o_path_parent_fd,
                   IN  ay     filename,
                   IN  b      reuse_existing,
                   IN  b      persistent,
                   OUT s      doc_id);
AddFull           (IN  ah     o_path_fds,
                   IN  u      flags,
                   IN  s      app_id,
                   IN  as     permissions,
                   OUT as     doc_ids,
                   OUT a{sv}  extra_out);
AddNamedFull      (IN  h      o_path_fd,
                   IN  ay     filename,
                   IN  u      flags,
                   IN  s      app_id,
                   IN  as     permissions,
                   OUT s      doc_id,
                   OUT a{sv}  extra_out);
GrantPermissions  (IN  s      doc_id,
                   IN  s      app_id,
                   IN  as     permissions);
RevokePermissions (IN  s      doc_id,
                   IN  s      app_id,
                   IN  as     permissions);
Delete            (IN  s      doc_id);
Lookup            (IN  ay     filename,
                   OUT s      doc_id);
Info              (IN  s      doc_id,
                   OUT ay     path,
                   OUT a{sas} apps);
List              (IN  s      app_id,
                   OUT a{say} docs);
```

## Properties

```
version  readable   u
```

## Description

The document portal allows to make files from the outside world
available to sandboxed applications in a controlled way.

Exported files will be made accessible to the application via
a fuse filesystem that gets mounted at /run/user/$UID/doc/. The
filesystem gets mounted both outside and inside the sandbox, but
the view inside the sandbox is restricted to just those files
that the application is allowed to access.

Individual files will appear at /run/user/$UID/doc/$DOC\_ID/filename,
where $DOC\_ID is the ID of the file in the document store. It is
returned by the [Add()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Documents.Add "The Add() method") and
[AddNamed()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Documents.AddNamed "The AddNamed() method") calls.

The permissions that the application has for a document store entry
(see [GrantPermissions()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Documents.GrantPermissions "The GrantPermissions() method")) are reflected
in the POSIX mode bits in the fuse filesystem.

The D-Bus interface for the document portal is available under the
bus name org.freedesktop.portal.Documents and the object path
/org/freedesktop/portal/documents.

This documentation describes version 3 of this interface.

## Method Details

### The GetMountPoint() method

```
GetMountPoint (OUT ay path);
```

Returns the path at which the document store fuse filesystem
is mounted. This will typically be /run/user/$UID/doc/.

`OUT ay path`:

the path at which the fuse filesystem is mounted

### The Add() method

```
Add (IN  h o_path_fd,
     IN  b reuse_existing,
     IN  b persistent,
     OUT s doc_id);
```

Adds a file to the document store. The file is passed in the
form of an open file descriptor to prove that the caller has
access to the file.

`IN h o_path_fd`:

open file descriptor for the file to add

`IN b reuse_existing`:

whether to reuse an existing document store entry for the file

`IN b persistent`:

whether to add the file only for this session or permanently

`OUT s doc_id`:

the ID of the file in the document store

### The AddNamed() method

```
AddNamed (IN  h  o_path_parent_fd,
          IN  ay filename,
          IN  b  reuse_existing,
          IN  b  persistent,
          OUT s  doc_id);
```

Creates an entry in the document store for writing a new file.

`IN h o_path_parent_fd`:

open file descriptor for the parent directory

`IN ay filename`:

the basename for the file

`IN b reuse_existing`:

whether to reuse an existing document store entry for the file

`IN b persistent`:

whether to add the file only for this session or permanently

`OUT s doc_id`:

the ID of the file in the document store

### The AddFull() method

```
AddFull (IN  ah    o_path_fds,
         IN  u     flags,
         IN  s     app_id,
         IN  as    permissions,
         OUT as    doc_ids,
         OUT a{sv} extra_out);
```

Adds multiple files to the document store. The file is passed in the
form of an open file descriptor to prove that the caller has
access to the file.

If the as-needed-by-app flag is given, files will only be added to
the document store if the application does not already have access to them.
For files that are not added to the document store, the doc\_ids array will
contain an empty string.

Additionally, if app\_id is specified, it will be given the permissions
listed in GrantPermission.

The method also returns some extra info that can be used to avoid
multiple roundtrips. For now it only contains as "mountpoint", the
fuse mountpoint of the document portal.

This method was added in version 2 of the org.freedesktop.portal.Documents interface.

`IN ah o_path_fds`:

open file descriptors for the files to export

`IN u flags`:

flags, 1 == reuse\_existing, 2 == persistent, 4 == as-needed-by-app

`IN s app_id`:

an application ID, or empty string

`IN as permissions`:

the permissions to grant, possible values are 'read', 'write', 'grant-permissions' and 'delete'

`OUT as doc_ids`:

the IDs of the files in the document store

`OUT a{sv} extra_out`:

### The AddNamedFull() method

```
AddNamedFull (IN  h     o_path_fd,
              IN  ay    filename,
              IN  u     flags,
              IN  s     app_id,
              IN  as    permissions,
              OUT s     doc_id,
              OUT a{sv} extra_out);
```

Creates an entry in the document store for writing a new file.

If the as-needed-by-app flag is given, file will only be added to
the document store if the application does not already have access to it.
For file that is not added to the document store, the doc\_id will
contain an empty string.

Additionally, if app\_id is specified, it will be given the permissions
listed in GrantPermission.

The method also returns some extra info that can be used to avoid
multiple roundtrips. For now it only contains as "mountpoint", the
fuse mountpoint of the document portal.

This method was added in version 3 of the org.freedesktop.portal.Documents interface.

`IN h o_path_fd`:

`IN ay filename`:

the basename for the file

`IN u flags`:

flags, 1 == reuse\_existing, 2 == persistent, 4 == as-needed-by-app

`IN s app_id`:

an application ID, or empty string

`IN as permissions`:

the permissions to grant, possible values are 'read', 'write', 'grant-permissions' and 'delete'

`OUT s doc_id`:

the ID of the file in the document store

`OUT a{sv} extra_out`:

### The GrantPermissions() method

```
GrantPermissions (IN  s  doc_id,
                  IN  s  app_id,
                  IN  as permissions);
```

Grants access permissions for a file in the document store
to an application.

This call is available inside the sandbox if the application
has the 'grant-permissions' permission for the document.

`IN s doc_id`:

the ID of the file in the document store

`IN s app_id`:

the ID of the application to which permissions are granted

`IN as permissions`:

the permissions to grant, possible values are 'read', 'write', 'grant-permissions' and 'delete'

### The RevokePermissions() method

```
RevokePermissions (IN  s  doc_id,
                   IN  s  app_id,
                   IN  as permissions);
```

Revokes access permissions for a file in the document store
from an application.

This call is available inside the sandbox if the application
has the 'grant-permissions' permission for the document.

`IN s doc_id`:

the ID of the file in the document store

`IN s app_id`:

the ID of the application from which permissions are revoked

`IN as permissions`:

the permissions to revoke, possible values are 'read', 'write', 'grant-permissions' and 'delete'

### The Delete() method

```
Delete (IN  s doc_id);
```

Removes an entry from the document store. The file itself is
not deleted.

This call is available inside the sandbox if the application
has the 'delete' permission for the document.

`IN s doc_id`:

the ID of the file in the document store

### The Lookup() method

```
Lookup (IN  ay filename,
        OUT s  doc_id);
```

Looks up the document ID for a file.

This call is not available inside the sandbox.

`IN ay filename`:

a path in the host filesystem

`OUT s doc_id`:

the ID of the file in the document store, or '' if the file is not in the document store

### The Info() method

```
Info (IN  s      doc_id,
      OUT ay     path,
      OUT a{sas} apps);
```

Gets the filesystem path and application permissions for a document store
entry.

This call is not available inside the sandbox.

`IN s doc_id`:

the ID of the file in the document store

`OUT ay path`:

the path for the file in the host filesystem

`OUT a{sas} apps`:

a dictionary mapping application IDs to the permissions for that application

### The List() method

```
List (IN  s      app_id,
      OUT a{say} docs);
```

Lists documents in the document store for an application (or for
all applications).

This call is not available inside the sandbox.

`IN s app_id`:

an application ID, or '' to list all documents

`OUT a{say} docs`:

a dictonary mapping document IDs to their filesystem path

## Property Details

### The "version" property

```
version  readable   u
```

* * *

## Name

org.freedesktop.portal.Flatpak — Flatpak portal

## Methods

```
Spawn               (IN  ay    cwd_path,
                     IN  aay   argv,
                     IN  a{uh} fds,
                     IN  a{ss} envs,
                     IN  u     flags,
                     IN  a{sv} options,
                     OUT u     pid);
SpawnSignal         (IN  u     pid,
                     IN  u     signal,
                     IN  b     to_process_group);
CreateUpdateMonitor (IN  a{sv} options,
                     OUT o     handle);
```

## Signals

```
SpawnStarted (u pid,
              u relpid);
SpawnExited  (u pid,
              u exit_status);
```

## Properties

```
version   readable   u
supports  readable   u
```

## Description

The flatpak portal exposes some interactions with flatpak on the
host to the sandbox. For example, it allows you to restart the
applications or start a more sandboxed instance.

This portal is available on the D-Bus session bus under the
bus name org.freedesktop.portal.Flatpak and the object path
/org/freedesktop/portal/Flatpak.

This documentation describes version 7 of this interface.

## Method Details

### The Spawn() method

```
Spawn (IN  ay    cwd_path,
       IN  aay   argv,
       IN  a{uh} fds,
       IN  a{ss} envs,
       IN  u     flags,
       IN  a{sv} options,
       OUT u     pid);
```

`IN ay cwd_path`:

`IN aay argv`:

`IN a{uh} fds`:

`IN a{ss} envs`:

`IN u flags`:

`IN a{sv} options`:

`OUT u pid`:

### The SpawnSignal() method

```
SpawnSignal (IN  u pid,
             IN  u signal,
             IN  b to_process_group);
```

This method lets you send a Unix signal to a process
that was started with [Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method").
The _`pid`_ argument here should be the PID that is returned
by the Spawn() call: it is not necessarily valid in the caller's
PID namespace.

`IN u pid`:

the PID inside the container to signal

`IN u signal`:

the signal to send (see [signal(7)](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#signal))

`IN b to_process_group`:

whether to send the signal to the process group

### The CreateUpdateMonitor() method

```
CreateUpdateMonitor (IN  a{sv} options,
                     OUT o     handle);
```

Creates an update monitor object that will emit
signals when an update for the caller becomes
available, and can be used to install it.

The handle will be of the form /org/freedesktop/portal/Flatpak/update\_monitor/SENDER/TOKEN,
where SENDER is the caller's unique name, with the initial ':' removed and
all '.' replaced by '\_', and TOKEN is a unique token that the caller can optionally provide
with the 'handle\_token' key in the options vardict.

Currently, no other options are accepted.

This was added in version 2 of this interface (available from flatpak 1.5.0 and later).

`IN a{sv} options`:

Vardict with optional further information

`OUT o handle`:

Object path for the [org.freedesktop.portal.Flatpak.UpdateMonitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-interface-org-freedesktop-portal-Flatpak-UpdateMonitor.top_of_page) object

## Signal Details

### The "SpawnStarted" signal

```
SpawnStarted (u pid,
              u relpid);
```

This is only non-zero if the expose PIDs flag (32) or the share
PIDs flag (128) was passed to
[Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method"), and it may still be zero if
the process exits before its relative PID could be read.

Emitted when a process started by [Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method")
has fully started. In other words, [Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method") returns once the sandbox
has been started, and this signal is emitted once the process inside
itself is started.

Only emitted by version 4 of this interface (available from flatpak
1.8.0 and later) and if the notify start flag (64) was passed to
[Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method").

`u pid`:

the PID of the process that has been started

`u relpid`:

the PID of the process relative to the current namespace.

### The "SpawnExited" signal

```
SpawnExited (u pid,
             u exit_status);
```

Emitted when a process started by [Spawn()](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-method-org-freedesktop-portal-Flatpak.Spawn "The Spawn() method")
exits.
Use g\_spawn\_check\_exit\_status(), or the macros such as
WIFEXITED documented in
[waitpid(2)](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#waitpid),
to interpret the _`exit_status`_.

This signal is not emitted for processes that were not launched
directly by Spawn(), for example if a process launched by
Spawn() runs foreground or background child processes.

`u pid`:

the PID of the process that has ended

`u exit_status`:

the wait status (see [waitpid(2)](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#waitpid))

## Property Details

### The "version" property

```
version  readable   u
```

### The "supports" property

```
supports  readable   u
```

Flags marking what optional features are available.
The following flags values are supported:


1 (FLATPAK\_SPAWN\_SUPPORT\_FLAGS\_EXPOSE\_PIDS)

Supports the expose sandbox pids flag of Spawn.
If the version of this interface is 5 or later, this also
indicates that the share sandbox pids flag is available.


This was added in version 3 of this interface (available from flatpak 1.6.0 and later).

* * *

## Name

org.freedesktop.portal.Flatpak.UpdateMonitor

## Methods

```
Close  ();
Update (IN  s     parent_window,
        IN  a{sv} options);
```

## Signals

```
UpdateAvailable (a{sv} update_info);
Progress        (a{sv} info);
```

## Description

## Method Details

### The Close() method

```
Close ();
```

Ends the update monitoring and cancels any ongoing
installation.

### The Update() method

```
Update (IN  s     parent_window,
        IN  a{sv} options);
```

see [Common Conventions](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#) _`options`_: Vardict with optional further information

Asks to install an update of the calling app.
During the installation,
["Progress"](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#gdbus-signal-org-freedesktop-portal-Flatpak-UpdateMonitor.Progress "The \"Progress\" signal")
signals will be emitted to communicate the status
and progress.

Note that updates are only allowed if the new version
has the same permissions (or less) than the currently installed
version. If the new version requires a new permission then the
operation will fail with the error org.freedesktop.DBus.Error.NotSupported
and updates has to be done with the system tools.

Currently, no options are accepted.

`IN s parent_window`:

Identifier for the application window,

`IN a{sv} options`:

## Signal Details

### The "UpdateAvailable" signal

```
UpdateAvailable (a{sv} update_info);
```

Gets emitted when a new update is available. This is only
sent once with the same information, but can be sent many
times if new updates appear.

The following information may be included in the
_`update_info`_ dictionary:

running-commit s

The commit of the currently running instance.


local-commit s

The commit that is currently installed. Restarting
the application will cause this commit to be used.


remote-commit s

The commit that is available as an update from the
remote. Updating the application will deploy this
commit.


`a{sv} update_info`:

More information about the available update

### The "Progress" signal

```
Progress (a{sv} info);
```

Gets emitted to indicate progress of the installation. It's
undefined exactly how often this is sent, but it will be emitted
at least once at the end with non-zero status field. For each
successful operation in the update we're also guaranteed to send
one (and only one) signal with progress 100.

The following fields may be included in the info:


n\_ops u

The number of operations that the update
consists of.


op u

The position of the currently active
operation.


progress u

The progress of the currently active
operation, as a number between 0 and 100.


status u

The overall status of the update.


|     |
| --- |
| 0: Running |
| 1: Empty. No update to install |
| 2: Done |
| 3: Failed |

error s

The error name, sent when status is Failed


error\_message s

The error message, sent when status is Failed


`a{sv} info`:

More information about the update progress

# Object Hierarchy

```
    GObject
    ├── FlatpakRef
    │   ├── FlatpakBundleRef
    │   ├── FlatpakInstalledRef
    │   ├── FlatpakRelatedRef
    │   ╰── FlatpakRemoteRef
    ├── FlatpakInstallation
    ├── FlatpakInstance
    ├── FlatpakRemote
    ├── FlatpakTransaction
    ├── FlatpakTransactionOperation
    ╰── FlatpakTransactionProgress
```

# API Index

### B

[FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef-struct "struct FlatpakBundleRef"), struct in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[FlatpakBundleRef:file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef--file "The “file” property"), object property in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_appstream](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-appstream "flatpak_bundle_ref_get_appstream ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-file "flatpak_bundle_ref_get_file ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_icon](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-icon "flatpak_bundle_ref_get_icon ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-installed-size "flatpak_bundle_ref_get_installed_size ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-metadata "flatpak_bundle_ref_get_metadata ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_origin](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-origin "flatpak_bundle_ref_get_origin ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_get\_runtime\_repo\_url](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-get-runtime-repo-url "flatpak_bundle_ref_get_runtime_repo_url ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")[flatpak\_bundle\_ref\_new](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-bundle-ref-new "flatpak_bundle_ref_new ()"), function in [FlatpakBundleRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakBundleRef "FlatpakBundleRef")

### C

[FLATPAK\_CHECK\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-CHECK-VERSION:CAPS "FLATPAK_CHECK_VERSION()"), macro in [Version information](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Version-information "Version information")

### E

[FLATPAK\_ERROR](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-ERROR:CAPS "FLATPAK_ERROR"), macro in [Error codes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Error-codes "Error codes")[FlatpakError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakError "enum FlatpakError"), enum in [Error codes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Error-codes "Error codes")

### G

[flatpak\_get\_default\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-default-arch "flatpak_get_default_arch ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_get\_supported\_arches](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-supported-arches "flatpak_get_supported_arches ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_get\_system\_installations](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-get-system-installations "flatpak_get_system_installations ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

### I

[FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation-struct "struct FlatpakInstallation"), struct in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_add\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-add-remote "flatpak_installation_add_remote ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_cleanup\_local\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-cleanup-local-refs-sync "flatpak_installation_cleanup_local_refs_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_create\_monitor](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-create-monitor "flatpak_installation_create_monitor ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_drop\_caches](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-drop-caches "flatpak_installation_drop_caches ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_fetch\_remote\_metadata\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-metadata-sync "flatpak_installation_fetch_remote_metadata_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_fetch\_remote\_ref\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-ref-sync "flatpak_installation_fetch_remote_ref_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_fetch\_remote\_ref\_sync\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-ref-sync-full "flatpak_installation_fetch_remote_ref_sync_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_fetch\_remote\_size\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-fetch-remote-size-sync "flatpak_installation_fetch_remote_size_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_config](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-config "flatpak_installation_get_config ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_current\_installed\_app](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-current-installed-app "flatpak_installation_get_current_installed_app ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_default\_languages](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-default-languages "flatpak_installation_get_default_languages ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_default\_locales](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-default-locales "flatpak_installation_get_default_locales ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_display\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-display-name "flatpak_installation_get_display_name ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-id "flatpak_installation_get_id ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_installed\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-installed-ref "flatpak_installation_get_installed_ref ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_is\_user](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-is-user "flatpak_installation_get_is_user ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_min\_free\_space\_bytes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-min-free-space-bytes "flatpak_installation_get_min_free_space_bytes ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_no\_interaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-no-interaction "flatpak_installation_get_no_interaction ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_path](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-path "flatpak_installation_get_path ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_priority](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-priority "flatpak_installation_get_priority ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_remote\_by\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-remote-by-name "flatpak_installation_get_remote_by_name ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_get\_storage\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-get-storage-type "flatpak_installation_get_storage_type ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install "flatpak_installation_install ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install\_bundle](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-bundle "flatpak_installation_install_bundle ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-full "flatpak_installation_install_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install\_ref\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-ref-file "flatpak_installation_install_ref_file ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_launch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch "flatpak_installation_launch ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_launch\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-launch-full "flatpak_installation_launch_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_installed\_refs](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-refs "flatpak_installation_list_installed_refs ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_installed\_refs\_by\_kind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-refs-by-kind "flatpak_installation_list_installed_refs_by_kind ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_installed\_refs\_for\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-refs-for-update "flatpak_installation_list_installed_refs_for_update ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_installed\_related\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-installed-related-refs-sync "flatpak_installation_list_installed_related_refs_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_remotes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remotes "flatpak_installation_list_remotes ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_remotes\_by\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remotes-by-type "flatpak_installation_list_remotes_by_type ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_remote\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-refs-sync "flatpak_installation_list_remote_refs_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_remote\_refs\_sync\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-refs-sync-full "flatpak_installation_list_remote_refs_sync_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_remote\_related\_refs\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-remote-related-refs-sync "flatpak_installation_list_remote_related_refs_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_list\_unused\_refs](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-list-unused-refs "flatpak_installation_list_unused_refs ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_load\_app\_overrides](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-load-app-overrides "flatpak_installation_load_app_overrides ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_modify\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-modify-remote "flatpak_installation_modify_remote ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_new\_for\_path](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-for-path "flatpak_installation_new_for_path ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_new\_system](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-system "flatpak_installation_new_system ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_new\_system\_with\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-system-with-id "flatpak_installation_new_system_with_id ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_new\_user](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-new-user "flatpak_installation_new_user ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_prune\_local\_repo](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-prune-local-repo "flatpak_installation_prune_local_repo ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_remove\_local\_ref\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-remove-local-ref-sync "flatpak_installation_remove_local_ref_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_remove\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-remove-remote "flatpak_installation_remove_remote ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_run\_triggers](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-run-triggers "flatpak_installation_run_triggers ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_set\_config\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-set-config-sync "flatpak_installation_set_config_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_set\_no\_interaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-set-no-interaction "flatpak_installation_set_no_interaction ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall "flatpak_installation_uninstall ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_uninstall\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall-full "flatpak_installation_uninstall_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update "flatpak_installation_update ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update\_appstream\_full\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-appstream-full-sync "flatpak_installation_update_appstream_full_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update\_appstream\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-appstream-sync "flatpak_installation_update_appstream_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-full "flatpak_installation_update_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update\_remote\_sync](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-remote-sync "flatpak_installation_update_remote_sync ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef-struct "struct FlatpakInstalledRef"), struct in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:appdata-content-rating](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-content-rating "The “appdata-content-rating” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:appdata-content-rating-type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-content-rating-type "The “appdata-content-rating-type” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:appdata-license](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-license "The “appdata-license” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:appdata-name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-name "The “appdata-name” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:appdata-summary](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-summary "The “appdata-summary” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:appdata-version](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--appdata-version "The “appdata-version” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:deploy-dir](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--deploy-dir "The “deploy-dir” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:end-of-life](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--end-of-life "The “end-of-life” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:end-of-life-rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--end-of-life-rebase "The “end-of-life-rebase” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:installed-size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--installed-size "The “installed-size” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:is-current](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--is-current "The “is-current” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:latest-commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--latest-commit "The “latest-commit” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:origin](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--origin "The “origin” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstalledRef:subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef--subpaths "The “subpaths” property"), object property in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_appdata\_content\_rating](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-content-rating "flatpak_installed_ref_get_appdata_content_rating ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_appdata\_content\_rating\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-content-rating-type "flatpak_installed_ref_get_appdata_content_rating_type ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_appdata\_license](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-license "flatpak_installed_ref_get_appdata_license ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_appdata\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-name "flatpak_installed_ref_get_appdata_name ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_appdata\_summary](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-summary "flatpak_installed_ref_get_appdata_summary ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_appdata\_version](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-appdata-version "flatpak_installed_ref_get_appdata_version ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_deploy\_dir](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-deploy-dir "flatpak_installed_ref_get_deploy_dir ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_eol](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-eol "flatpak_installed_ref_get_eol ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_eol\_rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-eol-rebase "flatpak_installed_ref_get_eol_rebase ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-installed-size "flatpak_installed_ref_get_installed_size ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_is\_current](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-is-current "flatpak_installed_ref_get_is_current ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_latest\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-latest-commit "flatpak_installed_ref_get_latest_commit ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_origin](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-origin "flatpak_installed_ref_get_origin ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_get\_subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-get-subpaths "flatpak_installed_ref_get_subpaths ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_load\_appdata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-load-appdata "flatpak_installed_ref_load_appdata ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[flatpak\_installed\_ref\_load\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installed-ref-load-metadata "flatpak_installed_ref_load_metadata ()"), function in [FlatpakInstalledRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstalledRef "FlatpakInstalledRef")[FlatpakInstallFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallFlags "enum FlatpakInstallFlags"), enum in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance-struct "struct FlatpakInstance"), struct in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_all](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-all "flatpak_instance_get_all ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_app](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-app "flatpak_instance_get_app ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-arch "flatpak_instance_get_arch ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-branch "flatpak_instance_get_branch ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_child\_pid](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-child-pid "flatpak_instance_get_child_pid ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-commit "flatpak_instance_get_commit ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-id "flatpak_instance_get_id ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_info](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-info "flatpak_instance_get_info ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_pid](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-pid "flatpak_instance_get_pid ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_runtime](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-runtime "flatpak_instance_get_runtime ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_get\_runtime\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-get-runtime-commit "flatpak_instance_get_runtime_commit ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")[flatpak\_instance\_is\_running](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-instance-is-running "flatpak_instance_is_running ()"), function in [FlatpakInstance](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstance "FlatpakInstance")

### L

[FlatpakLaunchFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakLaunchFlags "enum FlatpakLaunchFlags"), enum in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

### M

[FLATPAK\_MAJOR\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-MAJOR-VERSION:CAPS "FLATPAK_MAJOR_VERSION"), macro in [Version information](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Version-information "Version information")[FLATPAK\_MICRO\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-MICRO-VERSION:CAPS "FLATPAK_MICRO_VERSION"), macro in [Version information](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Version-information "Version information")[FLATPAK\_MINOR\_VERSION](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-MINOR-VERSION:CAPS "FLATPAK_MINOR_VERSION"), macro in [Version information](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Version-information "Version information")

### P

[FlatpakPortalError](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakPortalError "enum FlatpakPortalError"), enum in [Error codes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Error-codes "Error codes")[FLATPAK\_PORTAL\_ERROR](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FLATPAK-PORTAL-ERROR:CAPS "FLATPAK_PORTAL_ERROR"), macro in [Error codes](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-Error-codes "Error codes")[FlatpakProgressCallback](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakProgressCallback "FlatpakProgressCallback ()"), user\_function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

### Q

[FlatpakQueryFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakQueryFlags "enum FlatpakQueryFlags"), enum in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

### R

[FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef-struct "struct FlatpakRef"), struct in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRef:arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--arch "The “arch” property"), object property in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRef:branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--branch "The “branch” property"), object property in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRef:collection-id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--collection-id "The “collection-id” property"), object property in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRef:commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--commit "The “commit” property"), object property in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRef:kind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--kind "The “kind” property"), object property in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRef:name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef--name "The “name” property"), object property in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRefKind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRefKind "enum FlatpakRefKind"), enum in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_format\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-format-ref "flatpak_ref_format_ref ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_get\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-arch "flatpak_ref_get_arch ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_get\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-branch "flatpak_ref_get_branch ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_get\_collection\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-collection-id "flatpak_ref_get_collection_id ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_get\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-commit "flatpak_ref_get_commit ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_get\_kind](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-kind "flatpak_ref_get_kind ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_get\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-get-name "flatpak_ref_get_name ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[flatpak\_ref\_parse](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-ref-parse "flatpak_ref_parse ()"), function in [FlatpakRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRef "FlatpakRef")[FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef-struct "struct FlatpakRelatedRef"), struct in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[FlatpakRelatedRef:should-autoprune](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--should-autoprune "The “should-autoprune” property"), object property in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[FlatpakRelatedRef:should-delete](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--should-delete "The “should-delete” property"), object property in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[FlatpakRelatedRef:should-download](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--should-download "The “should-download” property"), object property in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[FlatpakRelatedRef:subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef--subpaths "The “subpaths” property"), object property in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[flatpak\_related\_ref\_get\_subpaths](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-get-subpaths "flatpak_related_ref_get_subpaths ()"), function in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[flatpak\_related\_ref\_new](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-new "flatpak_related_ref_new ()"), function in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[flatpak\_related\_ref\_should\_autoprune](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-autoprune "flatpak_related_ref_should_autoprune ()"), function in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[flatpak\_related\_ref\_should\_delete](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-delete "flatpak_related_ref_should_delete ()"), function in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[flatpak\_related\_ref\_should\_download](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-related-ref-should-download "flatpak_related_ref_should_download ()"), function in [FlatpakRelatedRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRelatedRef "FlatpakRelatedRef")[FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote-struct "struct FlatpakRemote"), struct in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[FlatpakRemote:name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote--name "The “name” property"), object property in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[FlatpakRemote:type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote--type "The “type” property"), object property in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef-struct "struct FlatpakRemoteRef"), struct in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteRef:download-size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--download-size "The “download-size” property"), object property in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteRef:end-of-life](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--end-of-life "The “end-of-life” property"), object property in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteRef:end-of-life-rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--end-of-life-rebase "The “end-of-life-rebase” property"), object property in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteRef:installed-size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--installed-size "The “installed-size” property"), object property in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteRef:metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--metadata "The “metadata” property"), object property in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteRef:remote-name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef--remote-name "The “remote-name” property"), object property in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[FlatpakRemoteType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteType "enum FlatpakRemoteType"), enum in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_appstream\_dir](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-appstream-dir "flatpak_remote_get_appstream_dir ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_appstream\_timestamp](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-appstream-timestamp "flatpak_remote_get_appstream_timestamp ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_collection\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-collection-id "flatpak_remote_get_collection_id ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_comment](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-comment "flatpak_remote_get_comment ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_default\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-default-branch "flatpak_remote_get_default_branch ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_description](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-description "flatpak_remote_get_description ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_disabled](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-disabled "flatpak_remote_get_disabled ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_filter](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-filter "flatpak_remote_get_filter ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_gpg\_verify](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-gpg-verify "flatpak_remote_get_gpg_verify ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_homepage](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-homepage "flatpak_remote_get_homepage ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_icon](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-icon "flatpak_remote_get_icon ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_main\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-main-ref "flatpak_remote_get_main_ref ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-name "flatpak_remote_get_name ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_nodeps](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-nodeps "flatpak_remote_get_nodeps ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_noenumerate](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-noenumerate "flatpak_remote_get_noenumerate ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_prio](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-prio "flatpak_remote_get_prio ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_remote\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-remote-type "flatpak_remote_get_remote_type ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_title](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-title "flatpak_remote_get_title ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_get\_url](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-get-url "flatpak_remote_get_url ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_new](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-new "flatpak_remote_new ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_new\_from\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-new-from-file "flatpak_remote_new_from_file ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_ref\_get\_download\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-download-size "flatpak_remote_ref_get_download_size ()"), function in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[flatpak\_remote\_ref\_get\_eol](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-eol "flatpak_remote_ref_get_eol ()"), function in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[flatpak\_remote\_ref\_get\_eol\_rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-eol-rebase "flatpak_remote_ref_get_eol_rebase ()"), function in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[flatpak\_remote\_ref\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-installed-size "flatpak_remote_ref_get_installed_size ()"), function in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[flatpak\_remote\_ref\_get\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-metadata "flatpak_remote_ref_get_metadata ()"), function in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[flatpak\_remote\_ref\_get\_remote\_name](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-ref-get-remote-name "flatpak_remote_ref_get_remote_name ()"), function in [FlatpakRemoteRef](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemoteRef "FlatpakRemoteRef")[flatpak\_remote\_set\_collection\_id](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-collection-id "flatpak_remote_set_collection_id ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_comment](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-comment "flatpak_remote_set_comment ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_default\_branch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-default-branch "flatpak_remote_set_default_branch ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_description](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-description "flatpak_remote_set_description ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_disabled](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-disabled "flatpak_remote_set_disabled ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_filter](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-filter "flatpak_remote_set_filter ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_gpg\_key](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-gpg-key "flatpak_remote_set_gpg_key ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_gpg\_verify](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-gpg-verify "flatpak_remote_set_gpg_verify ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_homepage](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-homepage "flatpak_remote_set_homepage ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_icon](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-icon "flatpak_remote_set_icon ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_main\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-main-ref "flatpak_remote_set_main_ref ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_nodeps](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-nodeps "flatpak_remote_set_nodeps ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_noenumerate](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-noenumerate "flatpak_remote_set_noenumerate ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_prio](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-prio "flatpak_remote_set_prio ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_title](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-title "flatpak_remote_set_title ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")[flatpak\_remote\_set\_url](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-remote-set-url "flatpak_remote_set_url ()"), function in [FlatpakRemote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakRemote "FlatpakRemote")

### S

[FlatpakStorageType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakStorageType "enum FlatpakStorageType"), enum in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

### T

[FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-struct "FlatpakTransaction"), struct in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::add-new-remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-add-new-remote "The “add-new-remote” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::basic-auth-start](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-basic-auth-start "The “basic-auth-start” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::choose-remote-for-ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-choose-remote-for-ref "The “choose-remote-for-ref” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::end-of-lifed](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-end-of-lifed "The “end-of-lifed” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::end-of-lifed-with-rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-end-of-lifed-with-rebase "The “end-of-lifed-with-rebase” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::install-authenticator](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-install-authenticator "The “install-authenticator” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::new-operation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-new-operation "The “new-operation” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::operation-done](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-done "The “operation-done” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::operation-error](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-operation-error "The “operation-error” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::ready](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready "The “ready” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::ready-pre-auth](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-ready-pre-auth "The “ready-pre-auth” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::webflow-done](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-webflow-done "The “webflow-done” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction::webflow-start](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction-webflow-start "The “webflow-start” signal"), object signal in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction:installation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction--installation "The “installation” property"), object property in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransaction:no-interaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction--no-interaction "The “no-interaction” property"), object property in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransactionErrorDetails](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionErrorDetails "enum FlatpakTransactionErrorDetails"), enum in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation-struct "FlatpakTransactionOperation"), struct in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[FlatpakTransactionOperationType](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperationType "enum FlatpakTransactionOperationType"), enum in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress-struct "FlatpakTransactionProgress"), struct in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[FlatpakTransactionProgress::changed](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress-changed "The “changed” signal"), object signal in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[FlatpakTransactionRemoteReason](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionRemoteReason "enum FlatpakTransactionRemoteReason"), enum in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[FlatpakTransactionResult](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionResult "enum FlatpakTransactionResult"), enum in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_abort\_webflow](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-abort-webflow "flatpak_transaction_abort_webflow ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_default\_dependency\_sources](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-default-dependency-sources "flatpak_transaction_add_default_dependency_sources ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_dependency\_source](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-dependency-source "flatpak_transaction_add_dependency_source ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_install](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install "flatpak_transaction_add_install ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_install\_bundle](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-bundle "flatpak_transaction_add_install_bundle ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_install\_flatpakref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-install-flatpakref "flatpak_transaction_add_install_flatpakref ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_rebase](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase "flatpak_transaction_add_rebase ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_rebase\_and\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-rebase-and-uninstall "flatpak_transaction_add_rebase_and_uninstall ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-uninstall "flatpak_transaction_add_uninstall ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_add\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-add-update "flatpak_transaction_add_update ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_get\_current\_operation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-current-operation "flatpak_transaction_get_current_operation ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_get\_installation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-installation "flatpak_transaction_get_installation ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_get\_no\_deploy](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-no-deploy "flatpak_transaction_get_no_deploy ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_get\_no\_pull](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-no-pull "flatpak_transaction_get_no_pull ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_get\_operations](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-operations "flatpak_transaction_get_operations ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_get\_parent\_window](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-get-parent-window "flatpak_transaction_get_parent_window ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_is\_empty](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-is-empty "flatpak_transaction_is_empty ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_new\_for\_installation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-new-for-installation "flatpak_transaction_new_for_installation ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_operation\_get\_bundle\_path](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-bundle-path "flatpak_transaction_operation_get_bundle_path ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_commit](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-commit "flatpak_transaction_operation_get_commit ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_download\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-download-size "flatpak_transaction_operation_get_download_size ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_installed\_size](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-installed-size "flatpak_transaction_operation_get_installed_size ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-metadata "flatpak_transaction_operation_get_metadata ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_old\_metadata](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-old-metadata "flatpak_transaction_operation_get_old_metadata ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_operation\_type](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-operation-type "flatpak_transaction_operation_get_operation_type ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_ref](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-ref "flatpak_transaction_operation_get_ref ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_get\_remote](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-get-remote "flatpak_transaction_operation_get_remote ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_operation\_type\_to\_string](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-operation-type-to-string "flatpak_transaction_operation_type_to_string ()"), function in [FlatpakTransactionOperation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionOperation "FlatpakTransactionOperation")[flatpak\_transaction\_progress\_get\_bytes\_transferred](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-bytes-transferred "flatpak_transaction_progress_get_bytes_transferred ()"), function in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[flatpak\_transaction\_progress\_get\_is\_estimating](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-is-estimating "flatpak_transaction_progress_get_is_estimating ()"), function in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[flatpak\_transaction\_progress\_get\_progress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-progress "flatpak_transaction_progress_get_progress ()"), function in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[flatpak\_transaction\_progress\_get\_start\_time](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-start-time "flatpak_transaction_progress_get_start_time ()"), function in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[flatpak\_transaction\_progress\_get\_status](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-get-status "flatpak_transaction_progress_get_status ()"), function in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[flatpak\_transaction\_progress\_set\_update\_frequency](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-progress-set-update-frequency "flatpak_transaction_progress_set_update_frequency ()"), function in [FlatpakTransactionProgress](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransactionProgress "FlatpakTransactionProgress")[flatpak\_transaction\_run](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-run "flatpak_transaction_run ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_default\_arch](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-default-arch "flatpak_transaction_set_default_arch ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_disable\_dependencies](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-dependencies "flatpak_transaction_set_disable_dependencies ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_disable\_prune](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-prune "flatpak_transaction_set_disable_prune ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_disable\_related](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-related "flatpak_transaction_set_disable_related ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_disable\_static\_deltas](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-disable-static-deltas "flatpak_transaction_set_disable_static_deltas ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_force\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-force-uninstall "flatpak_transaction_set_force_uninstall ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_no\_deploy](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-deploy "flatpak_transaction_set_no_deploy ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_no\_pull](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-no-pull "flatpak_transaction_set_no_pull ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_parent\_window](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-parent-window "flatpak_transaction_set_parent_window ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")[flatpak\_transaction\_set\_reinstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-transaction-set-reinstall "flatpak_transaction_set_reinstall ()"), function in [FlatpakTransaction](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakTransaction "FlatpakTransaction")

### U

[FlatpakUninstallFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUninstallFlags "enum FlatpakUninstallFlags"), enum in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[FlatpakUpdateFlags](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakUpdateFlags "enum FlatpakUpdateFlags"), enum in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

# Index of deprecated API

### I

[flatpak\_installation\_install](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install "flatpak_installation_install ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install\_bundle](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-bundle "flatpak_installation_install_bundle ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-full "flatpak_installation_install_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_install\_ref\_file](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-install-ref-file "flatpak_installation_install_ref_file ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_uninstall](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall "flatpak_installation_uninstall ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_uninstall\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-uninstall-full "flatpak_installation_uninstall_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update "flatpak_installation_update ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")[flatpak\_installation\_update\_full](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#flatpak-installation-update-full "flatpak_installation_update_full ()"), function in [FlatpakInstallation](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html#FlatpakInstallation "FlatpakInstallation")

# Annotation Glossary

### A

allow-none

NULL is OK, both for passing and for returning.

array

Parameter points to an array of items.

### C

closure

This parameter is a 'user\_data', for callbacks; many bindings can pass NULL here.

### E

element-type

Generics and defining elements of containers and arrays.

### N

nullable

NULL may be passed as the value in, out, in-out; or as a return value.

### O

out

Parameter for returning results. Default is transfer full.

### S

scope call

The callback is valid only during the call to the method.

### T

transfer container

The caller owns the data container, but not the data inside it.

transfer full

The caller owns the data, and is responsible for free it.

transfer none

The data is owned by the callee, which is responsible of freeing it.

type

Override the parsed C type with given type.

[Next\\
\\
Portal API Reference](https://docs.flatpak.org/en/latest/portal-api-reference.html) [Previous\\
\\
Under the Hood](https://docs.flatpak.org/en/latest/under-the-hood.html)

Copyright © 2017-2025, Flatpak Team. Licensed under Creative Commons Attribution 4.0 International License.


Made with [Sphinx](https://www.sphinx-doc.org/) and [@pradyunsg](https://pradyunsg.me/)'s

[Furo](https://github.com/pradyunsg/furo)

![Read the Docs](<Base64-Image-Removed>)enlatest
Languages[de](https://docs.flatpak.org/de/latest/libflatpak-api-reference.html)**[en](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html)**[es](https://docs.flatpak.org/es/latest/libflatpak-api-reference.html)[fr](https://docs.flatpak.org/fr/latest/libflatpak-api-reference.html)[ko](https://docs.flatpak.org/ko/latest/libflatpak-api-reference.html)[pt-br](https://docs.flatpak.org/pt-br/latest/libflatpak-api-reference.html)[ru](https://docs.flatpak.org/ru/latest/libflatpak-api-reference.html)[zh-cn](https://docs.flatpak.org/zh-cn/latest/libflatpak-api-reference.html)Versions**[latest](https://docs.flatpak.org/en/latest/libflatpak-api-reference.html)**On Read the Docs[Project Home](https://app.readthedocs.org/projects/flatpak/?utm_source=flatpak&utm_content=flyout)[Builds](https://app.readthedocs.org/projects/flatpak/builds/?utm_source=flatpak&utm_content=flyout)Search

* * *

[Addons documentation](https://docs.readthedocs.io/page/addons.html?utm_source=flatpak&utm_content=flyout) ― Hosted by
[Read the Docs](https://about.readthedocs.com/?utm_source=flatpak&utm_content=flyout)
