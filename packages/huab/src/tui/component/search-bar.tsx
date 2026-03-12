interface SearchBarProps {
  value: string;
  focused: boolean;
  onInput: (value: string) => void;
}

export function SearchBar({ value, focused, onInput }: SearchBarProps) {
  return (
    <box
      flexDirection="row"
      alignItems="center"
      gap={1}
      paddingX={2}
      height={3}
      border
      borderStyle="single"
      borderColor={focused ? "#7aa2f7" : "#2a2a4e"}
      backgroundColor="#1a1a2e"
    >
      <text fg="#666666">/</text>
      <input
        value={value}
        onInput={onInput}
        placeholder="Search packages…"
        focused={focused}
        flexGrow={1}
        backgroundColor="transparent"
        textColor="#c0caf5"
        cursorColor="#7aa2f7"
        placeholderColor="#444444"
      />
    </box>
  );
}
