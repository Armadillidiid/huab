interface BackendTabsProps {
  backends: string[];
  active: string;
  onSelect: (backend: string) => void;
}

function formatTabLabel(backend: string, index: number): string {
  const name = backend.charAt(0).toUpperCase() + backend.slice(1);
  return `${name} (${index + 1})`;
}

export function BackendTabs({ backends, active, onSelect }: BackendTabsProps) {
  return (
    <box flexDirection="row" gap={0}>
      {backends.map((backend, i) => {
        const isActive = backend === active;
        return (
          <box
            key={backend}
            paddingX={2}
            paddingY={0}
            backgroundColor={isActive ? "#2a2a4e" : "transparent"}
            onMouseDown={() => onSelect(backend)}
          >
            <text fg={isActive ? "#7aa2f7" : "#444444"}>{formatTabLabel(backend, i)}</text>
          </box>
        );
      })}
    </box>
  );
}
