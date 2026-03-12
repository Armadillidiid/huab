import { useEffect, useRef, useState } from "react";
import { useTerminalDimensions } from "@opentui/react";
import { Virtualizer } from "@tanstack/virtual-core";
import type { VirtualizerOptions } from "@tanstack/virtual-core";
import type { FlatpakPackage } from "@huab/lib";

interface PackageListProps {
  packages: FlatpakPackage[];
  selectedIndex: number;
  focused: boolean;
  onNavigate: (index: number) => void;
  onSelect: (pkg: FlatpakPackage) => void;
}

// Virtualizer<TScrollElement, TItemElement> requires TScrollElement extends
// Element | Window, but we have no DOM in the terminal. We pass null as the
// scroll element and supply all callbacks manually.
type FakeElement = Element;

export function PackageList({
  packages,
  selectedIndex,
  focused,
  onNavigate,
  onSelect,
}: PackageListProps) {
  const { height: termHeight } = useTerminalDimensions();
  // Reserve ~8 rows for surrounding chrome (header, search bar, count, status bar).
  const listHeight = Math.max(1, termHeight - 8);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [, forceUpdate] = useState(0);

  const offsetCallbackRef = useRef<((offset: number, isScrolling: boolean) => void) | null>(null);
  const onChangeRef = useRef<(() => void) | null>(null);

  // Wire the onChange ref to trigger React re-renders when the virtualizer updates.
  onChangeRef.current = () => forceUpdate((n) => n + 1);

  const virtualizerRef = useRef<Virtualizer<FakeElement, FakeElement> | null>(null);

  if (virtualizerRef.current === null) {
    const opts: VirtualizerOptions<FakeElement, FakeElement> = {
      count: packages.length,
      getScrollElement: () => null,
      estimateSize: () => 1,
      scrollToFn: (offset) => setScrollOffset(offset),
      observeElementRect: (_instance, cb) => {
        cb({ width: 0, height: listHeight });
      },
      observeElementOffset: (_instance, cb) => {
        offsetCallbackRef.current = cb;
      },
      onChange: () => onChangeRef.current?.(),
      overscan: 5,
    };
    virtualizerRef.current = new Virtualizer(opts as VirtualizerOptions<FakeElement, FakeElement>);
  }

  const virtualizer = virtualizerRef.current;

  // Mount / unmount lifecycle.
  useEffect(() => {
    return virtualizer._didMount();
  }, [virtualizer]);

  // Sync options on every render so count and listHeight stay current.
  useEffect(() => {
    virtualizer.setOptions({
      count: packages.length,
      getScrollElement: () => null,
      estimateSize: () => 1,
      scrollToFn: (offset) => setScrollOffset(offset),
      observeElementRect: (_instance, cb) => {
        cb({ width: 0, height: listHeight });
      },
      observeElementOffset: (_instance, cb) => {
        offsetCallbackRef.current = cb;
      },
      onChange: () => onChangeRef.current?.(),
      overscan: 5,
    } as VirtualizerOptions<FakeElement, FakeElement>);
    virtualizer._willUpdate();
  });

  // Propagate scroll offset into the virtualizer.
  useEffect(() => {
    offsetCallbackRef.current?.(scrollOffset, false);
  }, [scrollOffset]);

  // Scroll to keep selected item in view.
  useEffect(() => {
    if (packages.length > 0) {
      virtualizer.scrollToIndex(selectedIndex, { align: "auto" });
    }
  }, [selectedIndex, packages.length, virtualizer]);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <box focused={focused} height="100%" flexDirection="column" overflow="hidden">
      {packages.length === 0 ? (
        <box paddingX={2} paddingY={1}>
          <text fg="#666666">No packages found</text>
        </box>
      ) : (
        virtualItems.map((vItem) => {
          // noUncheckedIndexedAccess is false; virtualizer only yields valid indices
          const pkg = packages[vItem.index]!;
          const isSelected = vItem.index === selectedIndex;
          const displayName = pkg.app_name ?? pkg.name;
          const subtitle = pkg.summary ?? pkg.id;
          return (
            <box
              key={vItem.key}
              flexDirection="row"
              alignItems="center"
              gap={2}
              paddingX={1}
              paddingY={0}
              height={1}
              backgroundColor={isSelected ? "#2a2a4e" : "transparent"}
              onMouseDown={() => {
                onNavigate(vItem.index);
                onSelect(pkg);
              }}
            >
              <text fg={isSelected ? "#7aa2f7" : "#cccccc"} width={30}>
                {displayName.length > 28 ? displayName.slice(0, 27) + "…" : displayName}
              </text>
              <text fg={isSelected ? "#a9b1d6" : "#666666"} flexGrow={1}>
                {subtitle && subtitle.length > 50 ? subtitle.slice(0, 49) + "…" : subtitle}
              </text>
              <text fg="#444">
                {pkg.version.length > 12 ? pkg.version.slice(0, 11) + "…" : pkg.version}
              </text>
            </box>
          );
        })
      )}
    </box>
  );
}
