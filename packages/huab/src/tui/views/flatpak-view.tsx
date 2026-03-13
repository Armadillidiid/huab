import { useEffect, useMemo, useState } from "react";
import { useKeyboard } from "@opentui/react";
import type { KeyEvent } from "@opentui/core";
import type { FlatpakPackage } from "@huab/lib";
import { PackageList } from "../component/package-list.tsx";
import { PackageDetail } from "../component/package-detail.tsx";
import { SearchBar } from "../component/search-bar.tsx";
import { useKeyboardState } from "../context/keyboard.tsx";

/** Synthesize a minimal KeyEvent-shaped object for dispatching scope transitions. */
function syntheticKey(name: string): KeyEvent {
  return { name } as KeyEvent;
}

interface FlatpakViewProps {
  packages: FlatpakPackage[];
  loading: boolean;
  error: string | null;
}

function filterPackages(packages: FlatpakPackage[], query: string): FlatpakPackage[] {
  if (!query) return packages;
  const q = query.toLowerCase();
  return packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(q) ||
      (pkg.app_name?.toLowerCase().includes(q) ?? false) ||
      (pkg.summary?.toLowerCase().includes(q) ?? false) ||
      pkg.id.toLowerCase().includes(q),
  );
}

export function FlatpakView({ packages, loading, error }: FlatpakViewProps) {
  const [{ scope }, dispatch] = useKeyboardState();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPackages = useMemo(
    () => filterPackages(packages, searchQuery),
    [packages, searchQuery],
  );

  useEffect(() => {
    const max = filteredPackages.length - 1;
    setSelectedIndex((current) => {
      if (max < 0) return 0;
      return Math.max(0, Math.min(max, current));
    });
  }, [filteredPackages.length]);

  const selectedPkg = filteredPackages[selectedIndex] ?? null;

  useKeyboard((key) => {
    // Let the reducer handle scope transitions (tab, escape, enter, /)
    dispatch(key);

    // Clear search query when escaping from search scope
    if (key.name === "escape" && scope === "search") {
      setSearchQuery("");
    }
  });

  const totalText = loading
    ? "Loading…"
    : error
      ? `Error: ${error}`
      : `${filteredPackages.length} / ${packages.length} packages`;

  return (
    <box flexDirection="column" flexGrow={1}>
      {/* Search bar */}
      <SearchBar
        value={searchQuery}
        focused={scope === "search"}
        onInput={(value) => {
          setSearchQuery(value);
          setSelectedIndex(0);
        }}
      />

      {/* Count line */}
      <box paddingX={2} height={1}>
        <text fg="#444444">{totalText}</text>
      </box>

      {/* Main list + detail */}
      <box flexDirection="row" flexGrow={1}>
        {/* Package list panel */}
        <box
          flexDirection="column"
          width="45%"
          border
          borderStyle="single"
          borderColor={scope === "list" ? "#7aa2f7" : "#2a2a4e"}
          title=" Packages "
          titleAlignment="left"
        >
          {error ? (
            <box padding={2}>
              <text fg="#f7768e">{error}</text>
            </box>
          ) : (
            <PackageList
              packages={filteredPackages}
              selectedIndex={selectedIndex}
              focused={scope === "list"}
              onNavigate={setSelectedIndex}
              onSelect={() => dispatch(syntheticKey("enter"))}
            />
          )}
        </box>

        {/* Detail panel */}
        <box flexDirection="column" flexGrow={1} padding={1}>
          <PackageDetail pkg={selectedPkg} focused={scope === "detail"} />
        </box>
      </box>
    </box>
  );
}
