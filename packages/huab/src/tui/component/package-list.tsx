import { memo, useEffect, useRef } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";
import type { FlatpakPackage } from "@huab/lib";
import { useKeyboard } from "@opentui/react";

interface PackageListProps {
  packages: FlatpakPackage[];
  selectedIndex: number;
  focused: boolean;
  onNavigate: (index: number) => void;
  onSelect: (pkg: FlatpakPackage) => void;
}

interface RowProps {
  pkg: FlatpakPackage;
  isSelected: boolean;
  index: number;
  onNavigate: (i: number) => void;
  onSelect: (pkg: FlatpakPackage) => void;
}

const PackageRow = memo(function PackageRow({
  pkg,
  isSelected,
  index,
  onNavigate,
  onSelect,
}: RowProps) {
  const displayName = pkg.app_name ?? pkg.name;
  const subtitle = pkg.summary ?? pkg.id;
  return (
    <box
      flexDirection="row"
      alignItems="center"
      gap={1}
      paddingX={1}
      paddingY={0}
      backgroundColor={isSelected ? "#2a2a4e" : "transparent"}
      onMouseDown={() => {
        onNavigate(index);
        onSelect(pkg);
      }}
    >
      <text fg={isSelected ? "#7aa2f7" : "#444444"} width={2}>
        {isSelected ? "▶" : " "}
      </text>
      <text fg={isSelected ? "#7aa2f7" : "#cccccc"} width={30}>
        {displayName.length > 28 ? displayName.slice(0, 27) + "…" : displayName}
      </text>
      <text fg={isSelected ? "#a9b1d6" : "#666666"} flexGrow={1}>
        {subtitle && subtitle.length > 50
          ? subtitle.slice(0, 49) + "…"
          : subtitle}
      </text>
      <text fg="#444">
        {pkg.version.length > 12 ? pkg.version.slice(0, 11) + "…" : pkg.version}
      </text>
    </box>
  );
});

/** Scroll the minimum amount needed to bring `index` into view. No-op if already visible. */
function scrollIntoView(sb: ScrollBoxRenderable, index: number) {
  const vh = sb.viewport.height;
  const top = sb.scrollTop;
  if (index < top) {
    sb.scrollTo(index);
  } else if (index >= top + vh) {
    sb.scrollTo(index - vh + 1);
  }
}

export function PackageList({
  packages,
  selectedIndex,
  focused,
  onNavigate,
  onSelect,
}: PackageListProps) {
  const scrollboxRef = useRef<ScrollBoxRenderable>(null);

  // Keep refs in sync so keyboard handler is always fresh without being recreated.
  const selectedIndexRef = useRef(selectedIndex);
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  const packagesRef = useRef(packages);
  useEffect(() => {
    packagesRef.current = packages;
  }, [packages]);

  // Scroll only when cursor moves outside the visible viewport.
  useEffect(() => {
    const sb = scrollboxRef.current;
    if (sb) scrollIntoView(sb, selectedIndex);
  }, [selectedIndex]);

  useKeyboard((key) => {
    const sb = scrollboxRef.current;
    if (!sb) return;

    // Navigation keys: only act when this panel is focused.
    if (focused) {
      switch (key.name) {
        case "up":
        case "k":
          key.preventDefault();
          onNavigate(Math.max(0, selectedIndexRef.current - 1));
          break;
        case "down":
        case "j":
          key.preventDefault();
          onNavigate(
            Math.min(
              packagesRef.current.length - 1,
              selectedIndexRef.current + 1,
            ),
          );
          break;
        case "pageup":
          key.preventDefault();
          onNavigate(
            Math.max(0, selectedIndexRef.current - sb.viewport.height),
          );
          sb.scrollBy(-0.5, "viewport");
          break;
        case "pagedown":
          key.preventDefault();
          onNavigate(
            Math.min(
              packagesRef.current.length - 1,
              selectedIndexRef.current + sb.viewport.height,
            ),
          );
          sb.scrollBy(0.5, "viewport");
          break;
        case "home":
          key.preventDefault();
          onNavigate(0);
          sb.scrollTo(0);
          break;
        case "end":
          key.preventDefault();
          onNavigate(packagesRef.current.length - 1);
          sb.scrollTo({ x: 0, y: sb.scrollHeight });
          break;
      }
    }
  });

  return (
    <scrollbox
      ref={scrollboxRef}
      focused={false}
      height="100%"
      viewportCulling
      style={{
        scrollbarOptions: {
          showArrows: true,
          trackOptions: {
            foregroundColor: "#7aa2f7",
            backgroundColor: "#2a2a4e",
          },
        },
      }}
    >
      {packages.length === 0 ? (
        <box paddingX={2} paddingY={1}>
          <text fg="#666666">No packages found</text>
        </box>
      ) : (
        packages.map((pkg, i) => (
          <PackageRow
            key={pkg.id}
            pkg={pkg}
            isSelected={i === selectedIndex}
            index={i}
            onNavigate={onNavigate}
            onSelect={onSelect}
          />
        ))
      )}
    </scrollbox>
  );
}
