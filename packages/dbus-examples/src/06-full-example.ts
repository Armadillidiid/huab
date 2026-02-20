#!/usr/bin/env bun
/**
 * Example 6: Full Application Example
 * 
 * This example demonstrates a complete D-Bus application combining all concepts:
 * - Methods
 * - Properties
 * - Signals
 * - Error handling
 * 
 * Simulates a media player service that:
 * - Exposes playback controls (play, pause, stop, next, previous)
 * - Has properties (status, volume, current track)
 * - Emits signals (track changed, playback status changed)
 * - Can be controlled via a client
 */

import * as dbus from "dbus-next";
const DBusInterface = dbus.interface.Interface;

// Type-safe interface for the D-Bus client proxy
interface MediaPlayerClientInterface {
  Status: Promise<string>;
  Volume: Promise<number>;
  CurrentTrack: Promise<string>;
  Position: Promise<number>;
  Play: () => Promise<boolean>;
  Pause: () => Promise<boolean>;
  Stop: () => Promise<boolean>;
  Next: () => Promise<boolean>;
  Previous: () => Promise<boolean>;
  Seek: (seconds: number) => Promise<boolean>;
  GetPlaylist: () => Promise<string[]>;
  on(event: "TrackChanged", handler: (title: string, artist: string) => void): void;
  on(event: "StatusChanged", handler: (status: string) => void): void;
  on(event: "VolumeChanged", handler: (volume: number) => void): void;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
}

const PLAYLIST: Track[] = [
  { id: 1, title: "Electric Dreams", artist: "Synthwave FM", duration: 240 },
  { id: 2, title: "Neon Nights", artist: "Retro Vision", duration: 195 },
  { id: 3, title: "Cyber City", artist: "Digital Horizon", duration: 210 },
  { id: 4, title: "Future Memories", artist: "Time Capsule", duration: 180 },
];

enum PlaybackStatus {
  Stopped = "Stopped",
  Playing = "Playing",
  Paused = "Paused",
}

class MediaPlayerInterface extends DBusInterface {
  private _status: PlaybackStatus = PlaybackStatus.Stopped;
  private _volume: number = 75;
  private _currentTrackIndex: number = 0;
  private _position: number = 0;
  private playbackInterval?: NodeJS.Timeout;

  // Helper to safely get track from playlist
  private getTrack(index: number): Track {
    const track = PLAYLIST[index];
    if (!track) {
      throw new Error(`Invalid track index: ${index}`);
    }
    return track;
  }

  // Signals - these return the values to be emitted
  TrackChanged(title: string, artist: string): [string, string] {
    return [title, artist];
  }

  StatusChanged(status: string): string {
    return status;
  }

  VolumeChanged(volume: number): number {
    return volume;
  }

  // Properties
  get Status(): string {
    return this._status;
  }

  get Volume(): number {
    return this._volume;
  }

  set Volume(value: number) {
    if (value < 0 || value > 100) {
      throw new Error("Volume must be between 0 and 100");
    }
    const oldValue = this._volume;
    this._volume = value;
    console.log(`[Player] Volume: ${oldValue}% -> ${value}%`);
    this.VolumeChanged(value);
  }

  get CurrentTrack(): string {
    const track = this.getTrack(this._currentTrackIndex);
    return JSON.stringify({
      title: track.title,
      artist: track.artist,
      duration: track.duration,
      position: this._position,
    });
  }

  get Position(): number {
    return this._position;
  }

  // Methods
  Play(): boolean {
    if (this._status === PlaybackStatus.Playing) {
      console.log("[Player] Already playing");
      return false;
    }

    this._status = PlaybackStatus.Playing;
    const track = this.getTrack(this._currentTrackIndex);
    console.log(`[Player] Playing: ${track.title}`);
    this.StatusChanged(this._status);

    // Simulate playback progress
    this.playbackInterval = setInterval(() => {
      this._position += 1;
      const track = this.getTrack(this._currentTrackIndex);
      
      if (this._position >= track.duration) {
        // Auto advance to next track
        this.Next();
      }
    }, 1000);

    return true;
  }

  Pause(): boolean {
    if (this._status !== PlaybackStatus.Playing) {
      console.log("[Player] Not currently playing");
      return false;
    }

    this._status = PlaybackStatus.Paused;
    console.log("[Player] Paused");
    this.StatusChanged(this._status);

    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = undefined;
    }

    return true;
  }

  Stop(): boolean {
    if (this._status === PlaybackStatus.Stopped) {
      console.log("[Player] Already stopped");
      return false;
    }

    this._status = PlaybackStatus.Stopped;
    this._position = 0;
    console.log("[Player] Stopped");
    this.StatusChanged(this._status);

    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = undefined;
    }

    return true;
  }

  Next(): boolean {
    const wasPlaying = this._status === PlaybackStatus.Playing;
    
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = undefined;
    }

    this._currentTrackIndex = (this._currentTrackIndex + 1) % PLAYLIST.length;
    this._position = 0;

    const track = this.getTrack(this._currentTrackIndex);
    console.log(`[Player] Next track: ${track.title} by ${track.artist}`);
    this.TrackChanged(track.title, track.artist);

    if (wasPlaying) {
      this._status = PlaybackStatus.Stopped;
      this.Play();
    }

    return true;
  }

  Previous(): boolean {
    const wasPlaying = this._status === PlaybackStatus.Playing;
    
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = undefined;
    }

    this._currentTrackIndex =
      (this._currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this._position = 0;

    const track = this.getTrack(this._currentTrackIndex);
    console.log(`[Player] Previous track: ${track.title} by ${track.artist}`);
    this.TrackChanged(track.title, track.artist);

    if (wasPlaying) {
      this._status = PlaybackStatus.Stopped;
      this.Play();
    }

    return true;
  }

  Seek(seconds: number): boolean {
    const track = this.getTrack(this._currentTrackIndex);
    const newPosition = Math.max(0, Math.min(track.duration, this._position + seconds));
    
    console.log(`[Player] Seek: ${this._position}s -> ${newPosition}s`);
    this._position = newPosition;

    return true;
  }

  GetPlaylist(): string[] {
    return PLAYLIST.map(
      (track) => `${track.title} - ${track.artist} (${track.duration}s)`
    );
  }

  cleanup() {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
    }
  }
}

// Configure the interface members (alternative to decorators)
MediaPlayerInterface.configureMembers({
  signals: {
    TrackChanged: {
      signature: "ss"
    },
    StatusChanged: {
      signature: "s"
    },
    VolumeChanged: {
      signature: "i"
    }
  },
  properties: {
    Status: {
      signature: "s",
      access: dbus.interface.ACCESS_READ
    },
    Volume: {
      signature: "i",
      access: dbus.interface.ACCESS_READWRITE
    },
    CurrentTrack: {
      signature: "s",
      access: dbus.interface.ACCESS_READ
    },
    Position: {
      signature: "i",
      access: dbus.interface.ACCESS_READ
    }
  },
  methods: {
    Play: {
      inSignature: "",
      outSignature: "b"
    },
    Pause: {
      inSignature: "",
      outSignature: "b"
    },
    Stop: {
      inSignature: "",
      outSignature: "b"
    },
    Next: {
      inSignature: "",
      outSignature: "b"
    },
    Previous: {
      inSignature: "",
      outSignature: "b"
    },
    Seek: {
      inSignature: "i",
      outSignature: "b"
    },
    GetPlaylist: {
      inSignature: "",
      outSignature: "as"
    }
  }
});

async function startService() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.MediaPlayer";
  const objectPath = "/com/example/MediaPlayer";
  const interfaceName = "com.example.MediaPlayer";

  try {
    await bus.requestName(serviceName, 0);
    console.log(`[Service] Acquired name: ${serviceName}`);

    const player = new MediaPlayerInterface(interfaceName);
    bus.export(objectPath, player);

    console.log("[Service] Media player service is ready!");
    const firstTrack = PLAYLIST[0];
    if (firstTrack) {
      console.log(`[Service] Initial track: ${firstTrack.title}\n`);
    }

    return { bus, player };
  } catch (err) {
    console.error("[Service] Error:", err);
    throw err;
  }
}

async function startClient() {
  const bus = dbus.sessionBus();
  const serviceName = "com.example.MediaPlayer";
  const objectPath = "/com/example/MediaPlayer";
  const interfaceName = "com.example.MediaPlayer";

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const obj = await bus.getProxyObject(serviceName, objectPath);
    const player = obj.getInterface(interfaceName) as unknown as MediaPlayerClientInterface;

    console.log("[Client] Connected to media player\n");

    // Listen to signals
    player.on("TrackChanged", (title: string, artist: string) => {
      console.log(`[Client] 🎵 Now playing: "${title}" by ${artist}`);
    });

    player.on("StatusChanged", (status: string) => {
      console.log(`[Client] 📊 Playback status: ${status}`);
    });

    player.on("VolumeChanged", (volume: number) => {
      console.log(`[Client] 🔊 Volume changed: ${volume}%`);
    });

    console.log("[Client] Signal listeners registered\n");

    return { bus, player };
  } catch (err) {
    console.error("[Client] Error:", err);
    throw err;
  }
}

async function demonstrateMediaPlayer() {
  console.log("=== Full D-Bus Application: Media Player ===\n");

  const service = await startService();
  const client = await startClient();

  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("=== Getting Initial State ===\n");
  
  const playlist = await client.player.GetPlaylist();
  console.log("[Client] Playlist:");
  playlist.forEach((track, i: number) => {
    console.log(`  ${i + 1}. ${track}`);
  });
  console.log();

  const status = await client.player.Status;
  const volume = await client.player.Volume;
  const currentTrack = await client.player.CurrentTrack;
  
  console.log(`[Client] Status: ${status}`);
  console.log(`[Client] Volume: ${volume}%`);
  console.log(`[Client] Current track: ${currentTrack}\n`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("=== Playback Controls ===\n");

  console.log("[Client] Starting playback...");
  await client.player.Play();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("[Client] Adjusting volume to 50...");
  (client.player as any).Volume = 50;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("[Client] Next track...");
  await client.player.Next();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("[Client] Pausing...");
  await client.player.Pause();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("[Client] Resuming...");
  await client.player.Play();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("[Client] Previous track...");
  await client.player.Previous();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("[Client] Seeking forward 30 seconds...");
  await client.player.Seek(30);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const position = await client.player.Position;
  console.log(`[Client] Current position: ${position}s`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("[Client] Stopping playback...");
  await client.player.Stop();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("\n=== Demonstration Complete ===\n");

  service.player.cleanup();
  service.bus.disconnect();
  client.bus.disconnect();
  process.exit(0);
}

process.on("SIGINT", () => {
  console.log("\n[Example] Shutting down...");
  process.exit(0);
});

demonstrateMediaPlayer().catch(console.error);
