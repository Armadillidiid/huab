import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useEffect, useState } from "react";
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
  const sdk = useSDK();
  const [packages, setPackages] = useState<FlatpakPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBackend, setActiveBackend] = useState<PackageBackendKey>(BACKENDS.flatpak);
  const [showHelp, setShowHelp] = useState(false);

  // Fetch Flatpak packages on mount
  useEffect(() => {
    sdk
      .listFlatpakPackages()
      .then((pkgs) => {
        setPackages(pkgs);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sdk]);

  useEffect(() => {
    return sdk.subscribe((event) => {
      if (event.type !== "cache.updated") return;
      sdk
        .listFlatpakPackages()
        .then((pkgs) => {
          setPackages(pkgs);
          setError(null);
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : String(err));
        });
    });
  }, [sdk]);

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
    if (key.name === "r") {
      setLoading(true);
      sdk
        .refreshFlatpakPackages()
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : String(err));
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
createRoot(renderer).render(
  <SDKProvider>
    <App />
  </SDKProvider>,
);
