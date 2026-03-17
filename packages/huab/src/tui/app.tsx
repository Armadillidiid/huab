import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useCallback, useEffect, useState } from "react";
import { BACKENDS, KNOWN_BACKENDS } from "@huab/lib";
import type { FlatpakPackage } from "@huab/lib";
import { Header } from "./component/header.tsx";
import { BackendTabs } from "./component/backend-tabs.tsx";
import { StatusBar } from "./component/status-bar.tsx";
import { FlatpakView } from "./views/flatpak-view.tsx";
import { ComingSoonView } from "./component/coming-soon-view.tsx";
import { KeyboardProvider } from "./context/keyboard.tsx";
import { SDKProvider, useSDK } from "./context/sdk.tsx";
import { HelpView } from "./views/help-view.tsx";

type PackageBackendKey = (typeof KNOWN_BACKENDS)[number];

function App() {
  const { client: sdk, event } = useSDK();
  const [packages, setPackages] = useState<FlatpakPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBackend, setActiveBackend] = useState<PackageBackendKey>(
    BACKENDS.flatpak,
  );
  const [showHelp, setShowHelp] = useState(false);

  const formatError = useCallback((err: unknown): string => {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }, []);

  // Fetch Flatpak packages on mount
  useEffect(() => {
    let active = true;
    sdk.flatpak
      .listAvailable({
        responseStyle: "fields",
        throwOnError: true,
      })
      .then((result) => {
        if (!active) return;
        setPackages(result.data as FlatpakPackage[]);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(formatError(err));
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [formatError, sdk]);

  useEffect(() => {
    return event.subscribeEvent((evt) => {
      if (evt.type !== "cache.updated") return;
      sdk.flatpak
        .listAvailable({
          responseStyle: "fields",
          throwOnError: true,
        })
        .then((result) => {
          setPackages(result.data as FlatpakPackage[]);
          setError(null);
        })
        .catch((err: unknown) => {
          setError(formatError(err));
        });
    });
  }, [event, formatError, sdk]);

  // Global shortcuts: number keys switch backend tabs, ? toggles help
  useKeyboard((key) => {
    const idx = Number(key.name) - 1;
    if (!Number.isNaN(idx) && idx >= 0 && idx < KNOWN_BACKENDS.length) {
      const backend = KNOWN_BACKENDS[idx];
      setActiveBackend(backend);
      return;
    }
    if (key.name === "?") {
      setShowHelp((v) => !v);
      return;
    }

    if (key.ctrl && key.name === "r") {
      setLoading(true);
      setError(null);
      sdk.flatpak
        .refresh({
          responseStyle: "data",
          throwOnError: true,
        })
        .catch((err: unknown) => {
          setError(formatError(err));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });
  const backendsArray: PackageBackendKey[] = [...KNOWN_BACKENDS];

  return (
    <KeyboardProvider>
      <box flexDirection="column" height="100%" width="100%">
        {/* Header row with title + backend tabs */}
        <box
          flexDirection="row"
          alignItems="center"
          height={3}
          border
          borderStyle="single"
          borderColor="#2a2a4e"
          backgroundColor="#1a1a2e"
        >
          <Header title="huab" loading={loading} error={error} />
          <box flexGrow={1} />
          <BackendTabs
            backends={backendsArray}
            active={activeBackend}
            onSelect={(b) => setActiveBackend(b as PackageBackendKey)}
          />
        </box>

        {/* Main content area */}
        {showHelp ? (
          <HelpView />
        ) : activeBackend === BACKENDS.flatpak ? (
          <FlatpakView packages={packages} loading={loading} error={error} />
        ) : (
          <ComingSoonView backend={activeBackend} />
        )}

        <StatusBar />
      </box>
    </KeyboardProvider>
  );
}

const renderer = await createCliRenderer({ exitOnCtrlC: true });
renderer.keyInput.on("keypress", (key) => {
  // Toggle with backtick key for development/debugging purposes
  if (key.name === "`") {
    renderer.console.toggle();
  }
});

createRoot(renderer).render(
  <SDKProvider>
    <App />
  </SDKProvider>,
);
