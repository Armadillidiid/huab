interface ComingSoonViewProps {
  backend: string;
}

export function ComingSoonView({ backend }: ComingSoonViewProps) {
  const displayName = backend.charAt(0).toUpperCase() + backend.slice(1);
  return (
    <box flexGrow={1} flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
      <text fg="#7aa2f7">{displayName}</text>
      <text fg="#444444">Coming soon</text>
    </box>
  );
}
