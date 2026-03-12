import type { FlatpakPackage } from "@huab/lib";

interface PackageListProps {
  packages: FlatpakPackage[];
  selectedIndex: number;
  focused: boolean;
  onNavigate: (index: number) => void;
  onSelect: (pkg: FlatpakPackage) => void;
}

export function PackageList({
  packages,
  selectedIndex,
  focused,
  onNavigate,
  onSelect,
}: PackageListProps) {
  return (
    <scrollbox
      focused={focused}
      height="100%"
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
        packages.map((pkg, i) => {
          const isSelected = i === selectedIndex;
          const displayName = pkg.app_name ?? pkg.name;
          const subtitle = pkg.summary ?? pkg.id;
          return (
            <box
              key={pkg.id}
              flexDirection="row"
              alignItems="center"
              gap={2}
              paddingX={1}
              paddingY={0}
              backgroundColor={isSelected ? "#2a2a4e" : "transparent"}
              onMouseDown={() => {
                onNavigate(i);
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
    </scrollbox>
  );
}
