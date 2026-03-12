export const HelpView = () => {
  return (
    <box
      flexGrow={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      border
      borderStyle="single"
      borderColor="#2a2a4e"
    >
      <text fg="#7aa2f7">
        <strong>Keyboard Shortcuts</strong>
      </text>
      <box flexDirection="column" gap={0} marginTop={1}>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            1–5
          </text>
          <text fg="#c0caf5">Switch backend tab</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            tab
          </text>
          <text fg="#c0caf5">Cycle focus: search → list → detail</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            /
          </text>
          <text fg="#c0caf5">Focus search bar</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            ↑ / k
          </text>
          <text fg="#c0caf5">Move selection up</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            ↓ / j
          </text>
          <text fg="#c0caf5">Move selection down</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            enter
          </text>
          <text fg="#c0caf5">Focus detail panel</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            escape
          </text>
          <text fg="#c0caf5">Return to list / clear search</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            ?
          </text>
          <text fg="#c0caf5">Toggle this help</text>
        </box>
        <box flexDirection="row" gap={2}>
          <text fg="#666666" width={20}>
            ^C
          </text>
          <text fg="#c0caf5">Quit</text>
        </box>
      </box>
    </box>
  );
};
