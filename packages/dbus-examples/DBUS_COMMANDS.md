# D-Bus Command-Line Reference

This guide shows how to interact with D-Bus services using command-line tools instead of `dbus-next`. Learn how to use `dbus-send`, `busctl`, and other D-Bus utilities to achieve the same functionality as the examples.

## Table of Contents

- [D-Bus Tools Overview](#dbus-tools-overview)
- [Example 1: Basic Service](#example-1-basic-service)
- [Example 2: Basic Client](#example-2-basic-client)
- [Example 3: Signals](#example-3-signals)
- [Example 4: Properties](#example-4-properties)
- [Example 5: System Bus](#example-5-system-bus)
- [Example 6: Full Application](#example-6-full-application)
- [Example 7: Manager and Transactions](#example-7-manager-and-transactions)
- [Common Patterns](#common-patterns)

---

## D-Bus Tools Overview

### Available Command-Line Tools

#### 1. `dbus-send` - Send messages to D-Bus
The traditional tool for sending method calls and signals.

**Pros:**
- Available on most Linux systems
- Simple syntax for basic operations
- Good for scripting

**Cons:**
- Limited introspection capabilities
- Verbose syntax for complex types
- No interactive mode

#### 2. `busctl` - Modern D-Bus management tool
Part of systemd, provides comprehensive D-Bus management.

**Pros:**
- Interactive and scriptable
- Excellent introspection
- Clean, readable output
- Monitor signals easily
- Property access simplified

**Cons:**
- Requires systemd (not available on all systems)

#### 3. `qdbus` / `qdbus-qt5` - Qt D-Bus tool
Qt-based D-Bus interface.

**Pros:**
- Very simple syntax
- Great for quick testing
- Good for KDE/Qt applications

**Cons:**
- Requires Qt libraries
- Less flexible than others

#### 4. `d-feet` - D-Bus debugger (GUI)
Graphical D-Bus browser and debugger.

**Pros:**
- Visual interface
- Easy exploration
- Good for learning

**Cons:**
- GUI only (no scripting)

### Installation

```bash
# Ubuntu/Debian
sudo apt install dbus-x11 busctl

# Fedora/RHEL
sudo dnf install dbus-tools systemd

# Arch
sudo pacman -S dbus

# For d-feet (optional GUI tool)
sudo apt install d-feet
```

---

## Example 1: Basic Service

**Running the service:**
```bash
bun run src/01-basic-service.ts
```

### Introspecting the Service

#### Using `busctl`
```bash
# List all services on session bus
busctl --user list

# Introspect the calculator service
busctl --user introspect com.example.Calculator /com/example/Calculator

# Get detailed tree view
busctl --user tree com.example.Calculator
```

#### Using `dbus-send`
```bash
# Introspect (get XML description)
dbus-send --session --print-reply \
  --dest=com.example.Calculator \
  /com/example/Calculator \
  org.freedesktop.DBus.Introspectable.Introspect
```

#### Using `qdbus`
```bash
# List all methods
qdbus com.example.Calculator /com/example/Calculator
```

---

## Example 2: Basic Client

### Calling Methods

#### Using `busctl` (Recommended)

```bash
# Call Add method: 5 + 3
busctl --user call \
  com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator \
  Add ii 5 3

# Call Subtract method: 10 - 4
busctl --user call \
  com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator \
  Subtract ii 10 4

# Call Multiply method: 6 * 7
busctl --user call \
  com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator \
  Multiply ii 6 7

# Call Divide method: 20 / 4
busctl --user call \
  com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator \
  Divide ii 20 4

# Call Divide with error: 10 / 0
busctl --user call \
  com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator \
  Divide ii 10 0
```

**Output format:**
```
i 8    # Integer result: 8
```

#### Using `dbus-send`

```bash
# Call Add method: 5 + 3
dbus-send --session --print-reply \
  --dest=com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator.Add \
  int32:5 int32:3

# Call Subtract method: 10 - 4
dbus-send --session --print-reply \
  --dest=com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator.Subtract \
  int32:10 int32:4

# Call Multiply method: 6 * 7
dbus-send --session --print-reply \
  --dest=com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator.Multiply \
  int32:6 int32:7

# Call Divide method: 20 / 4
dbus-send --session --print-reply \
  --dest=com.example.Calculator \
  /com/example/Calculator \
  com.example.Calculator.Divide \
  int32:20 int32:4
```

**Output format:**
```
method return time=1234567.890 sender=:1.123 -> destination=:1.124 serial=3 reply_serial=2
   int32 8
```

#### Using `qdbus`

```bash
# Call Add method: 5 + 3
qdbus com.example.Calculator /com/example/Calculator \
  com.example.Calculator.Add 5 3

# Much simpler syntax!
qdbus com.example.Calculator /com/example/Calculator Add 5 3
```

---

## Example 3: Signals

**Running the example:**
```bash
bun run src/03-signals.ts
```

### Monitoring Signals

#### Using `busctl` (Recommended)

```bash
# Monitor ALL signals from the notification service
busctl --user monitor \
  --match "type='signal',sender='com.example.Notifications'"

# Monitor specific signal
busctl --user monitor \
  --match "type='signal',interface='com.example.Notifications',member='NotificationSent'"

# Monitor status changes only
busctl --user monitor \
  --match "type='signal',interface='com.example.Notifications',member='StatusChanged'"
```

#### Using `dbus-monitor`

```bash
# Monitor ALL signals on session bus
dbus-monitor --session

# Monitor only from our service
dbus-monitor --session \
  "type='signal',sender='com.example.Notifications'"

# Monitor specific signal
dbus-monitor --session \
  "type='signal',interface='com.example.Notifications',member='NotificationSent'"

# Monitor with filtering
dbus-monitor --session \
  "type='signal',path='/com/example/Notifications'"
```

**Example output:**
```
signal time=1234567.890 sender=:1.123 -> destination=(null destination) serial=45 path=/com/example/Notifications; interface=com.example.Notifications; member=NotificationSent
   string "Hello"
   string "This is a test notification"

signal time=1234567.891 sender=:1.123 -> destination=(null destination) serial=46 path=/com/example/Notifications; interface=com.example.Notifications; member=StatusChanged
   string "Working"
```

### Triggering Signals

In another terminal, while the service is running:

#### Using `busctl`

```bash
# Send a notification (triggers NotificationSent signal)
busctl --user call \
  com.example.Notifications \
  /com/example/Notifications \
  com.example.Notifications \
  SendNotification ss "Test Title" "Test Message"

# Change status (triggers StatusChanged signal)
busctl --user call \
  com.example.Notifications \
  /com/example/Notifications \
  com.example.Notifications \
  SetStatus s "Busy"

# Start background task (triggers multiple signals)
busctl --user call \
  com.example.Notifications \
  /com/example/Notifications \
  com.example.Notifications \
  StartBackgroundTask
```

#### Using `dbus-send`

```bash
# Send a notification
dbus-send --session --print-reply \
  --dest=com.example.Notifications \
  /com/example/Notifications \
  com.example.Notifications.SendNotification \
  string:"Test Title" string:"Test Message"

# Change status
dbus-send --session --print-reply \
  --dest=com.example.Notifications \
  /com/example/Notifications \
  com.example.Notifications.SetStatus \
  string:"Busy"
```

---

## Example 4: Properties

**Running the example:**
```bash
bun run src/04-properties.ts
```

### Reading Properties

#### Using `busctl` (Recommended)

```bash
# Get ALL properties at once
busctl --user get-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Volume

# Get specific properties
busctl --user get-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Brightness

busctl --user get-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Theme

busctl --user get-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Version

busctl --user get-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Enabled

# Get ALL properties with introspection
busctl --user introspect \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings
```

**Output format:**
```
i 50         # Volume
i 80         # Brightness
s "dark"     # Theme
s "1.0.0"    # Version
b true       # Enabled
```

#### Using `dbus-send`

```bash
# Get property using Properties interface
dbus-send --session --print-reply \
  --dest=com.example.Settings \
  /com/example/Settings \
  org.freedesktop.DBus.Properties.Get \
  string:"com.example.Settings" string:"Volume"

dbus-send --session --print-reply \
  --dest=com.example.Settings \
  /com/example/Settings \
  org.freedesktop.DBus.Properties.Get \
  string:"com.example.Settings" string:"Theme"

# Get ALL properties
dbus-send --session --print-reply \
  --dest=com.example.Settings \
  /com/example/Settings \
  org.freedesktop.DBus.Properties.GetAll \
  string:"com.example.Settings"
```

### Writing Properties

#### Using `busctl`

```bash
# Set Volume to 75
busctl --user set-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Volume i 75

# Set Brightness to 60
busctl --user set-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Brightness i 60

# Set Theme to "light"
busctl --user set-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Theme s "light"

# Set Enabled to false
busctl --user set-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Enabled b false

# Try to set read-only property (will fail)
busctl --user set-property \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  Version s "2.0.0"
```

#### Using `dbus-send`

```bash
# Set Volume to 75
dbus-send --session --print-reply \
  --dest=com.example.Settings \
  /com/example/Settings \
  org.freedesktop.DBus.Properties.Set \
  string:"com.example.Settings" string:"Volume" variant:int32:75

# Set Theme to "light"
dbus-send --session --print-reply \
  --dest=com.example.Settings \
  /com/example/Settings \
  org.freedesktop.DBus.Properties.Set \
  string:"com.example.Settings" string:"Theme" variant:string:"light"

# Set Enabled to false
dbus-send --session --print-reply \
  --dest=com.example.Settings \
  /com/example/Settings \
  org.freedesktop.DBus.Properties.Set \
  string:"com.example.Settings" string:"Enabled" variant:boolean:false
```

### Calling Methods

#### Using `busctl`

```bash
# Get summary
busctl --user call \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  GetSummary

# Reset to defaults
busctl --user call \
  com.example.Settings \
  /com/example/Settings \
  com.example.Settings \
  ResetToDefaults
```

---

## Example 5: System Bus

**Running the example:**
```bash
bun run src/05-system-bus.ts
```

> **Note:** System bus operations may require elevated permissions. Some commands might need `sudo` or PolicyKit authorization.

### NetworkManager

#### Using `busctl`

```bash
# Introspect NetworkManager
busctl --system introspect \
  org.freedesktop.NetworkManager \
  /org/freedesktop/NetworkManager

# Get NetworkManager version
busctl --system get-property \
  org.freedesktop.NetworkManager \
  /org/freedesktop/NetworkManager \
  org.freedesktop.NetworkManager \
  Version

# Get network state
busctl --system call \
  org.freedesktop.NetworkManager \
  /org/freedesktop/NetworkManager \
  org.freedesktop.NetworkManager \
  State

# Get active connections
busctl --system get-property \
  org.freedesktop.NetworkManager \
  /org/freedesktop/NetworkManager \
  org.freedesktop.NetworkManager \
  ActiveConnections
```

#### Using `dbus-send`

```bash
# Get NetworkManager state
dbus-send --system --print-reply \
  --dest=org.freedesktop.NetworkManager \
  /org/freedesktop/NetworkManager \
  org.freedesktop.NetworkManager.State
```

### Login Manager (systemd-logind)

#### Using `busctl`

```bash
# List current sessions
busctl --system call \
  org.freedesktop.login1 \
  /org/freedesktop/login1 \
  org.freedesktop.login1.Manager \
  ListSessions

# List users
busctl --system call \
  org.freedesktop.login1 \
  /org/freedesktop/login1 \
  org.freedesktop.login1.Manager \
  ListUsers

# Monitor session events
busctl --system monitor \
  --match "type='signal',sender='org.freedesktop.login1'"
```

#### Using `dbus-send`

```bash
# List sessions
dbus-send --system --print-reply \
  --dest=org.freedesktop.login1 \
  /org/freedesktop/login1 \
  org.freedesktop.login1.Manager.ListSessions
```

### UPower (Power Management)

#### Using `busctl`

```bash
# Check if on battery
busctl --system get-property \
  org.freedesktop.UPower \
  /org/freedesktop/UPower \
  org.freedesktop.UPower \
  OnBattery

# Enumerate power devices
busctl --system call \
  org.freedesktop.UPower \
  /org/freedesktop/UPower \
  org.freedesktop.UPower \
  EnumerateDevices

# Get battery percentage (replace PATH with actual device path)
busctl --system get-property \
  org.freedesktop.UPower \
  /org/freedesktop/UPower/devices/battery_BAT0 \
  org.freedesktop.UPower.Device \
  Percentage
```

#### Using `dbus-send`

```bash
# Check if on battery
dbus-send --system --print-reply \
  --dest=org.freedesktop.UPower \
  /org/freedesktop/UPower \
  org.freedesktop.DBus.Properties.Get \
  string:"org.freedesktop.UPower" string:"OnBattery"

# Enumerate devices
dbus-send --system --print-reply \
  --dest=org.freedesktop.UPower \
  /org/freedesktop/UPower \
  org.freedesktop.UPower.EnumerateDevices
```

### Desktop Notifications

#### Using `busctl`

```bash
# Get notification server info
busctl --user call \
  org.freedesktop.Notifications \
  /org/freedesktop/Notifications \
  org.freedesktop.Notifications \
  GetServerInformation

# Send a notification
busctl --user call \
  org.freedesktop.Notifications \
  /org/freedesktop/Notifications \
  org.freedesktop.Notifications \
  Notify \
  susssasa\{sv\}i \
  "My App" \
  0 \
  "" \
  "Hello!" \
  "This is a test notification" \
  0 \
  0 \
  5000
```

#### Using `dbus-send`

```bash
# Get server information
dbus-send --session --print-reply \
  --dest=org.freedesktop.Notifications \
  /org/freedesktop/Notifications \
  org.freedesktop.Notifications.GetServerInformation

# Send a notification
dbus-send --session --print-reply \
  --dest=org.freedesktop.Notifications \
  /org/freedesktop/Notifications \
  org.freedesktop.Notifications.Notify \
  string:"My App" \
  uint32:0 \
  string:"" \
  string:"Hello!" \
  string:"This is a test notification" \
  array:string:"" \
  dict:string:variant:"" \
  int32:5000
```

#### Using `notify-send` (Simpler!)

```bash
# Much easier way to send notifications
notify-send "Hello!" "This is a test notification"

notify-send -u critical "Important" "Critical message"

notify-send -t 10000 "Long Notification" "This will stay for 10 seconds"
```

---

## Example 6: Full Application

**Running the example:**
```bash
bun run src/06-full-example.ts
```

### Media Player Control

#### Using `busctl`

```bash
# Get playlist
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  GetPlaylist

# Get current status
busctl --user get-property \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Status

# Get volume
busctl --user get-property \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Volume

# Get current track
busctl --user get-property \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  CurrentTrack

# Get playback position
busctl --user get-property \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Position

# Play
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Play

# Pause
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Pause

# Stop
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Stop

# Next track
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Next

# Previous track
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Previous

# Seek forward 30 seconds
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Seek i 30

# Seek backward 10 seconds
busctl --user call \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Seek i -10

# Set volume to 50
busctl --user set-property \
  com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer \
  Volume i 50

# Monitor playback events
busctl --user monitor \
  --match "type='signal',sender='com.example.MediaPlayer'"
```

#### Using `dbus-send`

```bash
# Play
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.Play

# Pause
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.Pause

# Stop
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.Stop

# Next
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.Next

# Previous
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.Previous

# Seek forward 30 seconds
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.Seek \
  int32:30

# Get playlist
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  com.example.MediaPlayer.GetPlaylist

# Set volume
dbus-send --session --print-reply \
  --dest=com.example.MediaPlayer \
  /com/example/MediaPlayer \
  org.freedesktop.DBus.Properties.Set \
  string:"com.example.MediaPlayer" string:"Volume" variant:int32:50
```

---

## Example 7: Manager and Transactions

**Running the example:**
```bash
bun run src/07-manager-transactions.ts
```

This example demonstrates the **Manager/Transaction pattern**, a common D-Bus design pattern used by system services like NetworkManager, UDisks2, PackageKit, and systemd. In this pattern:

- **Manager** - Central service that creates and manages transaction objects
- **Transactions** - Temporary objects with unique paths created for specific operations
- Each transaction has its own lifecycle and emits progress signals
- Transactions are automatically cleaned up after completion

### Understanding the Pattern

The Manager creates transaction objects at dynamic paths:
```
/com/example/PackageManager              (Manager - persistent)
/com/example/PackageManager/Transaction/1 (Transaction - temporary)
/com/example/PackageManager/Transaction/2 (Transaction - temporary)
/com/example/PackageManager/Transaction/3 (Transaction - temporary)
```

### Manager Operations

#### Using `busctl`

```bash
# Introspect the manager
busctl --user introspect \
  com.example.PackageManager \
  /com/example/PackageManager

# Create an installation transaction
# Returns: object path like "/com/example/PackageManager/Transaction/1"
busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  InstallPackage s "nginx"

# Create a removal transaction
busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  RemovePackage s "apache2"

# Create an update transaction
busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  UpdatePackage ss "nodejs" "20.0.0"

# List all active transactions
busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  ListTransactions

# Cancel a transaction (use actual path from creation)
busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  CancelTransaction o "/com/example/PackageManager/Transaction/1"
```

**Example output:**
```bash
$ busctl --user call com.example.PackageManager /com/example/PackageManager \
    com.example.PackageManager InstallPackage s "nginx"
o "/com/example/PackageManager/Transaction/1"

$ busctl --user call com.example.PackageManager /com/example/PackageManager \
    com.example.PackageManager ListTransactions
ao 2 "/com/example/PackageManager/Transaction/1" "/com/example/PackageManager/Transaction/2"
```

#### Using `dbus-send`

```bash
# Create installation transaction
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager.InstallPackage \
  string:"nginx"

# Create removal transaction
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager.RemovePackage \
  string:"apache2"

# Create update transaction
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager.UpdatePackage \
  string:"nodejs" string:"20.0.0"

# List active transactions
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager.ListTransactions

# Cancel a transaction
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager.CancelTransaction \
  objpath:"/com/example/PackageManager/Transaction/1"
```

### Transaction Operations

Once you have a transaction path, you can interact with that specific transaction:

#### Using `busctl`

```bash
# First, create a transaction and save its path
TX_PATH=$(busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  InstallPackage s "postgresql" | cut -d '"' -f 2)

echo "Transaction created: $TX_PATH"

# Introspect the transaction object
busctl --user introspect \
  com.example.PackageManager \
  "$TX_PATH"

# Get transaction status
busctl --user get-property \
  com.example.PackageManager \
  "$TX_PATH" \
  com.example.PackageManager.Transaction \
  Status

# Get progress (0-100)
busctl --user get-property \
  com.example.PackageManager \
  "$TX_PATH" \
  com.example.PackageManager.Transaction \
  Progress

# Get package name
busctl --user get-property \
  com.example.PackageManager \
  "$TX_PATH" \
  com.example.PackageManager.Transaction \
  PackageName

# Get operation type
busctl --user get-property \
  com.example.PackageManager \
  "$TX_PATH" \
  com.example.PackageManager.Transaction \
  Operation

# Get detailed information (JSON)
busctl --user call \
  com.example.PackageManager \
  "$TX_PATH" \
  com.example.PackageManager.Transaction \
  GetDetails

# Cancel the transaction
busctl --user call \
  com.example.PackageManager \
  "$TX_PATH" \
  com.example.PackageManager.Transaction \
  Cancel
```

**Example output:**
```bash
$ busctl --user get-property com.example.PackageManager \
    /com/example/PackageManager/Transaction/1 \
    com.example.PackageManager.Transaction Status
s "Running"

$ busctl --user get-property com.example.PackageManager \
    /com/example/PackageManager/Transaction/1 \
    com.example.PackageManager.Transaction Progress
i 45

$ busctl --user call com.example.PackageManager \
    /com/example/PackageManager/Transaction/1 \
    com.example.PackageManager.Transaction GetDetails
s "{
  \"packageName\": \"postgresql\",
  \"operation\": \"Install\",
  \"version\": null,
  \"status\": \"Running\",
  \"progress\": 45
}"
```

#### Using `dbus-send`

```bash
# Get transaction status
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager/Transaction/1 \
  org.freedesktop.DBus.Properties.Get \
  string:"com.example.PackageManager.Transaction" string:"Status"

# Get progress
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager/Transaction/1 \
  org.freedesktop.DBus.Properties.Get \
  string:"com.example.PackageManager.Transaction" string:"Progress"

# Get details
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager/Transaction/1 \
  com.example.PackageManager.Transaction.GetDetails

# Cancel transaction
dbus-send --session --print-reply \
  --dest=com.example.PackageManager \
  /com/example/PackageManager/Transaction/1 \
  com.example.PackageManager.Transaction.Cancel
```

### Monitoring Transaction Signals

Transactions emit signals to report their progress:

#### Using `busctl`

```bash
# Monitor ALL signals from all transactions
busctl --user monitor \
  --match "type='signal',sender='com.example.PackageManager'"

# Monitor signals from a specific transaction
busctl --user monitor \
  --match "type='signal',path='/com/example/PackageManager/Transaction/1'"

# Monitor only ProgressChanged signals
busctl --user monitor \
  --match "type='signal',interface='com.example.PackageManager.Transaction',member='ProgressChanged'"

# Monitor only Completed signals
busctl --user monitor \
  --match "type='signal',interface='com.example.PackageManager.Transaction',member='Completed'"
```

**Example output:**
```
‣ Type=signal  Endian=l  Flags=1  Version=1  Serial=42
  Path=/com/example/PackageManager/Transaction/1  Interface=com.example.PackageManager.Transaction  Member=ProgressChanged
  UniqueName=:1.123  MESSAGE "is" {
        INT32 40;
        STRING "Verifying checksums...";
  };

‣ Type=signal  Endian=l  Flags=1  Version=1  Serial=43
  Path=/com/example/PackageManager/Transaction/1  Interface=com.example.PackageManager.Transaction  Member=StatusChanged
  UniqueName=:1.123  MESSAGE "s" {
        STRING "Running";
  };

‣ Type=signal  Endian=l  Flags=1  Version=1  Serial=47
  Path=/com/example/PackageManager/Transaction/1  Interface=com.example.PackageManager.Transaction  Member=Completed
  UniqueName=:1.123  MESSAGE "bs" {
        BOOLEAN true;
        STRING "Install of postgresql completed successfully";
  };
```

#### Using `dbus-monitor`

```bash
# Monitor all transaction signals
dbus-monitor --session \
  "type='signal',sender='com.example.PackageManager'"

# Monitor specific transaction
dbus-monitor --session \
  "type='signal',path='/com/example/PackageManager/Transaction/1'"

# Monitor progress updates only
dbus-monitor --session \
  "type='signal',interface='com.example.PackageManager.Transaction',member='ProgressChanged'"
```

### Practical Script Examples

#### Create and Monitor a Transaction

```bash
#!/bin/bash
# install-package.sh - Create and monitor a package installation

PACKAGE="$1"

if [ -z "$PACKAGE" ]; then
  echo "Usage: $0 <package-name>"
  exit 1
fi

# Create installation transaction
echo "Creating installation transaction for $PACKAGE..."
TX_PATH=$(busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  InstallPackage s "$PACKAGE" 2>/dev/null | cut -d '"' -f 2)

if [ -z "$TX_PATH" ]; then
  echo "Failed to create transaction"
  exit 1
fi

echo "Transaction created: $TX_PATH"
echo "Monitoring progress..."

# Monitor transaction signals in background
busctl --user monitor \
  --match "type='signal',path='$TX_PATH'" 2>/dev/null &
MONITOR_PID=$!

# Poll transaction status
while true; do
  STATUS=$(busctl --user get-property \
    com.example.PackageManager \
    "$TX_PATH" \
    com.example.PackageManager.Transaction \
    Status 2>/dev/null | cut -d '"' -f 2)
  
  PROGRESS=$(busctl --user get-property \
    com.example.PackageManager \
    "$TX_PATH" \
    com.example.PackageManager.Transaction \
    Progress 2>/dev/null | awk '{print $2}')
  
  if [ -z "$STATUS" ]; then
    # Transaction no longer exists (cleaned up)
    break
  fi
  
  echo "Status: $STATUS | Progress: ${PROGRESS}%"
  
  if [ "$STATUS" = "Completed" ] || [ "$STATUS" = "Failed" ] || [ "$STATUS" = "Cancelled" ]; then
    break
  fi
  
  sleep 1
done

# Kill monitor
kill $MONITOR_PID 2>/dev/null

echo "Transaction finished"
```

Usage:
```bash
chmod +x install-package.sh
./install-package.sh nginx
```

#### List and Cancel Active Transactions

```bash
#!/bin/bash
# list-transactions.sh - Show all active transactions

echo "Active Transactions:"
echo "==================="

# Get list of transaction paths
TX_PATHS=$(busctl --user call \
  com.example.PackageManager \
  /com/example/PackageManager \
  com.example.PackageManager \
  ListTransactions 2>/dev/null | grep -o '"/[^"]*"' | tr -d '"')

if [ -z "$TX_PATHS" ]; then
  echo "No active transactions"
  exit 0
fi

# Display each transaction
for TX_PATH in $TX_PATHS; do
  STATUS=$(busctl --user get-property \
    com.example.PackageManager \
    "$TX_PATH" \
    com.example.PackageManager.Transaction \
    Status 2>/dev/null | cut -d '"' -f 2)
  
  PROGRESS=$(busctl --user get-property \
    com.example.PackageManager \
    "$TX_PATH" \
    com.example.PackageManager.Transaction \
    Progress 2>/dev/null | awk '{print $2}')
  
  PACKAGE=$(busctl --user get-property \
    com.example.PackageManager \
    "$TX_PATH" \
    com.example.PackageManager.Transaction \
    PackageName 2>/dev/null | cut -d '"' -f 2)
  
  OPERATION=$(busctl --user get-property \
    com.example.PackageManager \
    "$TX_PATH" \
    com.example.PackageManager.Transaction \
    Operation 2>/dev/null | cut -d '"' -f 2)
  
  echo ""
  echo "Path:      $TX_PATH"
  echo "Package:   $PACKAGE"
  echo "Operation: $OPERATION"
  echo "Status:    $STATUS"
  echo "Progress:  ${PROGRESS}%"
done

# Optional: Cancel a transaction
echo ""
read -p "Cancel a transaction? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  read -p "Enter transaction path: " CANCEL_PATH
  
  if busctl --user call \
    com.example.PackageManager \
    "$CANCEL_PATH" \
    com.example.PackageManager.Transaction \
    Cancel 2>/dev/null; then
    echo "Transaction cancelled successfully"
  else
    echo "Failed to cancel transaction"
  fi
fi
```

### Real-World Examples of This Pattern

This Manager/Transaction pattern is used extensively in Linux system services:

#### NetworkManager
```bash
# NetworkManager creates connection objects
busctl --system call \
  org.freedesktop.NetworkManager \
  /org/freedesktop/NetworkManager \
  org.freedesktop.NetworkManager \
  ActivateConnection \
  ooo "/connection/path" "/device/path" "/"
# Returns: object path to ActiveConnection
```

#### UDisks2
```bash
# UDisks2 creates job objects for disk operations
busctl --system call \
  org.freedesktop.UDisks2 \
  /org/freedesktop/UDisks2/block_devices/sda1 \
  org.freedesktop.UDisks2.Filesystem \
  Mount a\{sv\} 0
# Returns: object path to Job
```

#### systemd
```bash
# systemd creates job objects when starting units
busctl --system call \
  org.freedesktop.systemd1 \
  /org/freedesktop/systemd1 \
  org.freedesktop.systemd1.Manager \
  StartUnit ss "nginx.service" "replace"
# Returns: object path to Job like /org/freedesktop/systemd1/job/1234
```

### Key Takeaways

The Manager/Transaction pattern provides:

1. **Isolation** - Each operation runs in its own object with its own state
2. **Progress Tracking** - Real-time updates via signals
3. **Cancellation** - Individual operations can be cancelled without affecting others
4. **Concurrent Operations** - Multiple transactions can run simultaneously
5. **Clean Lifecycle** - Automatic cleanup prevents object path pollution

This pattern is ideal for long-running operations that need progress reporting and user control.

---

## Common Patterns

### Type Signatures Reference

D-Bus uses type signatures to describe data types:

| Signature | Type | Example |
|-----------|------|---------|
| `b` | Boolean | `true`, `false` |
| `y` | Byte (uint8) | `255` |
| `n` | Int16 | `-32768` |
| `q` | UInt16 | `65535` |
| `i` | Int32 | `-2147483648` |
| `u` | UInt32 | `4294967295` |
| `x` | Int64 | Large integers |
| `t` | UInt64 | Large unsigned integers |
| `d` | Double | `3.14159` |
| `s` | String | `"hello"` |
| `o` | Object path | `"/org/example/Object"` |
| `g` | Signature | `"ss"` |
| `v` | Variant | Any type (boxed) |
| `as` | Array of strings | `["a", "b", "c"]` |
| `ai` | Array of integers | `[1, 2, 3]` |
| `a{sv}` | Dictionary | `{"key": variant}` |
| `(ss)` | Struct | `("first", "second")` |

### Busctl Type Syntax

```bash
# Boolean
busctl call ... MethodName b true

# Integer
busctl call ... MethodName i 42

# String
busctl call ... MethodName s "hello"

# Multiple parameters
busctl call ... MethodName isi 123 "test" 456

# Array of strings
busctl call ... MethodName as 3 "one" "two" "three"

# Array of integers
busctl call ... MethodName ai 3 1 2 3

# Variant
busctl call ... MethodName v s "string_value"
```

### dbus-send Type Syntax

```bash
# Boolean
dbus-send ... MethodName boolean:true

# Integer types
dbus-send ... MethodName int32:42
dbus-send ... MethodName uint32:42

# String
dbus-send ... MethodName string:"hello"

# Multiple parameters
dbus-send ... MethodName int32:123 string:"test" int32:456

# Array of strings
dbus-send ... MethodName array:string:"one","two","three"

# Variant
dbus-send ... MethodName variant:string:"value"
```

### Listing Services

#### Using `busctl`

```bash
# List all session bus services
busctl --user list

# List all system bus services
busctl --system list

# Filter services
busctl --user list | grep example
```

#### Using `dbus-send`

```bash
# List session bus services
dbus-send --session --print-reply \
  --dest=org.freedesktop.DBus \
  /org/freedesktop/DBus \
  org.freedesktop.DBus.ListNames

# List system bus services
dbus-send --system --print-reply \
  --dest=org.freedesktop.DBus \
  /org/freedesktop/DBus \
  org.freedesktop.DBus.ListNames
```

### Introspection

#### Using `busctl`

```bash
# Introspect service (shows methods, properties, signals)
busctl --user introspect \
  com.example.Service \
  /com/example/Object

# Show object tree
busctl --user tree com.example.Service

# Get status of a service
busctl --user status com.example.Service
```

#### Using `dbus-send`

```bash
# Get introspection XML
dbus-send --session --print-reply \
  --dest=com.example.Service \
  /com/example/Object \
  org.freedesktop.DBus.Introspectable.Introspect
```

### Monitoring All Bus Activity

```bash
# Monitor session bus
dbus-monitor --session

# Monitor system bus
dbus-monitor --system

# Monitor with filters
dbus-monitor --session "type='signal'"
dbus-monitor --session "sender='com.example.Service'"

# Using busctl
busctl --user monitor
busctl --system monitor
```

### Scripting Examples

#### Bash Script with busctl

```bash
#!/bin/bash
# Control media player from script

# Check if player is running
if busctl --user list | grep -q "com.example.MediaPlayer"; then
  # Get current status
  STATUS=$(busctl --user get-property \
    com.example.MediaPlayer \
    /com/example/MediaPlayer \
    com.example.MediaPlayer \
    Status | cut -d '"' -f 2)
  
  echo "Current status: $STATUS"
  
  # Toggle play/pause
  if [ "$STATUS" = "Playing" ]; then
    busctl --user call \
      com.example.MediaPlayer \
      /com/example/MediaPlayer \
      com.example.MediaPlayer \
      Pause
    echo "Paused"
  else
    busctl --user call \
      com.example.MediaPlayer \
      /com/example/MediaPlayer \
      com.example.MediaPlayer \
      Play
    echo "Playing"
  fi
else
  echo "Media player not running"
  exit 1
fi
```

#### Watching for Signals

```bash
#!/bin/bash
# Watch for track changes

busctl --user monitor \
  --match "type='signal',interface='com.example.MediaPlayer',member='TrackChanged'" | \
while read -r line; do
  if [[ $line == *"TrackChanged"* ]]; then
    echo "Track changed!"
  fi
done
```

---

## Quick Reference Cheatsheet

### Most Common Commands

```bash
# List services
busctl --user list

# Introspect
busctl --user introspect SERVICE_NAME OBJECT_PATH

# Call method
busctl --user call SERVICE_NAME OBJECT_PATH INTERFACE METHOD [SIGNATURE] [ARGS...]

# Get property
busctl --user get-property SERVICE_NAME OBJECT_PATH INTERFACE PROPERTY

# Set property
busctl --user set-property SERVICE_NAME OBJECT_PATH INTERFACE PROPERTY SIGNATURE VALUE

# Monitor signals
busctl --user monitor --match "sender='SERVICE_NAME'"

# Send notification
notify-send "Title" "Message"
```

### Useful Aliases

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Session bus shortcuts
alias dbus-list='busctl --user list'
alias dbus-monitor='busctl --user monitor'

# System bus shortcuts
alias dbus-system-list='busctl --system list'
alias dbus-system-monitor='busctl --system monitor'

# Example-specific shortcuts
alias calc-add='busctl --user call com.example.Calculator /com/example/Calculator com.example.Calculator Add ii'
alias player-play='busctl --user call com.example.MediaPlayer /com/example/MediaPlayer com.example.MediaPlayer Play'
alias player-pause='busctl --user call com.example.MediaPlayer /com/example/MediaPlayer com.example.MediaPlayer Pause'
alias player-next='busctl --user call com.example.MediaPlayer /com/example/MediaPlayer com.example.MediaPlayer Next'
```

---

## Troubleshooting

### Service Not Found

```bash
# Check if service is running
busctl --user list | grep com.example

# If not found, start the service
bun run src/XX-example.ts
```

### Permission Denied (System Bus)

Some system bus operations require PolicyKit authentication or root:

```bash
# Try with sudo (if safe)
sudo busctl --system call ...

# Or check PolicyKit rules
pkaction --verbose
```

### Invalid Arguments

```bash
# Check introspection for correct signatures
busctl --user introspect SERVICE_NAME OBJECT_PATH INTERFACE

# Verify type signature matches
busctl --user call ... MethodName ii 5 3  # Two integers
```

### No Response

```bash
# Increase timeout (default is 25s for busctl)
busctl --user --timeout=60 call ...

# Check if service is responsive
busctl --user status SERVICE_NAME
```

---

## Additional Resources

- [D-Bus Specification](https://dbus.freedesktop.org/doc/dbus-specification.html)
- [busctl man page](https://www.freedesktop.org/software/systemd/man/busctl.html)
- [dbus-send man page](https://dbus.freedesktop.org/doc/dbus-send.1.html)
- [D-Bus Tutorial](https://dbus.freedesktop.org/doc/dbus-tutorial.html)

---

**Pro Tip:** Use `busctl` for interactive exploration and `dbus-send` for scripting. Both are powerful, but `busctl` provides better ergonomics for manual testing and debugging.
