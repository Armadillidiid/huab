export function StatusBar() {
  return (
    <box
      height={1}
      paddingX={2}
      backgroundColor="#1a1a2e"
      flexDirection="row"
      alignItems="center"
    >
      <text fg="#444444">
        ?:help 1-5:switch backend tab:focus /:search ↑↓/jk:navigate ^C:quit
      </text>
    </box>
  );
}
