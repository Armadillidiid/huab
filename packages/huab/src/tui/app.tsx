import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import { useCallback, useEffect, useState } from "react";
import { HuabClient, BACKENDS } from "@huab/lib";
import type { FlatpakPackage } from "@huab/lib";
import { PackageList } from "./component/package-list.tsx";
import { PackageDetail } from "./component/package-detail.tsx";

type FocusPanel = "search" | "list" | "detail";

function App() {
  const renderer = useRenderer();

  const [packages, setPackages] = useState<FlatpakPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState<FlatpakPackage | null>(null);
  const [focus, setFocus] = useState<FocusPanel>("list");

  // Filtered list (kept in sync for keyboard nav)
  const filtered = packages.filter((pkg) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      pkg.name.toLowerCase().includes(q) ||
      (pkg.app_name?.toLowerCase().includes(q) ?? false) ||
      (pkg.summary?.toLowerCase().includes(q) ?? false) ||
      pkg.id.toLowerCase().includes(q)
    );
  });

  // Fetch on mount
  useEffect(() => {
    const client = new HuabClient();
    client
      .listAvailable(BACKENDS.flatpak)
      .then((pkgs) => {
        const flatpakPkgs = pkgs.filter((p) => p.backend === BACKENDS.flatpak);
        setPackages(flatpakPkgs);
        setSelectedPkg(flatpakPkgs[0] ?? null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        setLoading(false);
        client.disconnect();
      });
  }, []);

  // Update selected pkg when index or filtered list changes
  useEffect(() => {
    setSelectedPkg(filtered[selectedIndex] ?? null);
  }, [selectedIndex, searchQuery, packages]);

  const moveUp = useCallback(() => {
    setSelectedIndex((i) => Math.max(0, i - 1));
  }, []);

  const moveDown = useCallback(() => {
    setSelectedIndex((i) => Math.min(filtered.length - 1, i + 1));
  }, [filtered.length]);

  useKeyboard((key) => {
    if (key.name === "tab") {
      setFocus((f) => {
        if (f === "search") return "list";
        if (f === "list") return "detail";
        return "search";
      });
      return;
    }

    if (key.name === "escape") {
      if (focus === "search") {
        setSearchQuery("");
        setFocus("list");
      } else {
        setFocus("list");
      }
      return;
    }

    // Arrow navigation when list is focused
    if (focus === "list") {
      if (key.name === "up" || key.name === "k") {
        moveUp();
      } else if (key.name === "down" || key.name === "j") {
        moveDown();
      } else if (key.name === "enter") {
        setFocus("detail");
      } else if (key.name === "/") {
        setFocus("search");
      }
    }
  });

  const statusText = loading
    ? "Loading packages…"
    : error
      ? `Error: ${error}`
      : `${filtered.length} / ${packages.length} packages  •  tab: focus  •  /: search  •  ↑↓/jk: navigate  •  ^C: quit`;

  return (
    <box flexDirection="column" height="100%" width="100%">
      {/* Header */}
      <box
        flexDirection="row"
        alignItems="center"
        gap={2}
        paddingX={2}
        height={3}
        border
        borderStyle="single"
        borderColor="#2a2a4e"
        backgroundColor="#1a1a2e"
      >
        <text fg="#7aa2f7">
          <strong>huab</strong>
        </text>
        <text fg="#444444">|</text>
        <text fg="#a9b1d6">flatpak</text>
        <box flexGrow={1} />
        <text fg="#444444">{loading ? "fetching…" : ""}</text>
      </box>

      {/* Search bar */}
      <box
        flexDirection="row"
        alignItems="center"
        gap={1}
        paddingX={2}
        height={3}
        border
        borderStyle="single"
        borderColor={focus === "search" ? "#7aa2f7" : "#2a2a4e"}
        backgroundColor="#1a1a2e"
      >
        <text fg="#666666">/</text>
        <input
          value={searchQuery}
          onChange={(v) => {
            setSearchQuery(v);
            setSelectedIndex(0);
          }}
          placeholder="Search packages…"
          focused={focus === "search"}
          flexGrow={1}
          backgroundColor="transparent"
          textColor="#c0caf5"
          cursorColor="#7aa2f7"
          placeholderColor="#444444"
        />
      </box>

      {/* Main content */}
      <box flexDirection="row" flexGrow={1}>
        {/* Package list */}
        <box
          flexDirection="column"
          width="45%"
          border
          borderStyle="single"
          borderColor={focus === "list" ? "#7aa2f7" : "#2a2a4e"}
          title=" Packages "
          titleAlignment="left"
        >
          {error ? (
            <box padding={2}>
              <text fg="#f7768e">{error}</text>
            </box>
          ) : (
            <PackageList
              packages={packages}
              selectedIndex={selectedIndex}
              focused={focus === "list"}
              searchQuery={searchQuery}
              onNavigate={setSelectedIndex}
              onSelect={(pkg) => {
                setSelectedPkg(pkg);
                setFocus("detail");
              }}
            />
          )}
        </box>

        {/* Detail panel */}
        <box flexDirection="column" flexGrow={1} padding={1}>
          <PackageDetail pkg={selectedPkg} />
        </box>
      </box>

      {/* Status bar */}
      <box
        height={1}
        paddingX={2}
        backgroundColor="#1a1a2e"
        flexDirection="row"
        alignItems="center"
      >
        <text fg="#444444">{statusText}</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer({ exitOnCtrlC: true });
createRoot(renderer).render(<App />);
