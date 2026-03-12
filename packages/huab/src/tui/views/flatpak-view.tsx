import { useCallback, useMemo, useState } from "react";
import { useKeyboard } from "@opentui/react";
import type { FlatpakPackage } from "@huab/lib";
import { PackageList } from "../component/package-list.tsx";
import { PackageDetail } from "../component/package-detail.tsx";
import { SearchBar } from "../component/search-bar.tsx";
import { useKeyboardScope } from "../context/keyboard.tsx";

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
  const [scope, setScope] = useKeyboardScope();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPackages = useMemo(
    () => filterPackages(packages, searchQuery),
    [packages, searchQuery],
  );

  const selectedPkg = filteredPackages[selectedIndex] ?? null;

  const moveUp = useCallback(() => {
    setSelectedIndex((i) => Math.max(0, i - 1));
  }, []);

  const moveDown = useCallback(() => {
    setSelectedIndex((i) => Math.min(filteredPackages.length - 1, i + 1));
  }, [filteredPackages.length]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setSelectedIndex(0);
  }, []);

  useKeyboard((key) => {
    if (key.name === "tab") {
      setScope(scope === "search" ? "list" : scope === "list" ? "detail" : "search");
      return;
    }

    if (key.name === "escape") {
      if (scope === "search") {
        setSearchQuery("");
        setScope("list");
      } else {
        setScope("list");
      }
      return;
    }

    if (scope === "list") {
      if (key.name === "up" || key.name === "k") {
        moveUp();
      } else if (key.name === "down" || key.name === "j") {
        moveDown();
      } else if (key.name === "enter") {
        setScope("detail");
      } else if (key.name === "/") {
        setScope("search");
      }
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
      <SearchBar value={searchQuery} focused={scope === "search"} onInput={handleSearch} />

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
              onSelect={() => setScope("detail")}
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
