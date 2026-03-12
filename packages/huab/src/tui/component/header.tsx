interface HeaderProps {
  title: string;
  loading?: boolean;
}

export function Header({ title, loading }: HeaderProps) {
  return (
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
        <strong>{title}</strong>
      </text>
      <box flexGrow={1} />
      {loading && <text fg="#444444">fetching…</text>}
    </box>
  );
}
