# Huab Lib

This is D-Bus service and client library for Huab applications. It provides the functionality for interacting with the package managers (e.g Flatpak, Snap, AppStream, AppImage). Rather than be used directly by the TUI and GUI, it's functionality will be exposed under the H3 HTTP server in huab package.

##  Key notes

There are two entry points for this library: `Service` and `Client`. The `Service` class is used to create a D-Bus service and will be auto-started by systemd with a service file. For development, , we can start it manually with a pkg script. 

For the client, we can use the `Client` class to connect to the D-Bus service and call its methods. The client will be imported by huab package as an ESM module and used. 
