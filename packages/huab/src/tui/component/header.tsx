import { Spinner } from "./spinner.tsx";

interface HeaderProps {
  title: string;
  loading?: boolean;
  error?: string | null;
}

export function Header({ title, loading, error }: HeaderProps) {
  const spinnerState = loading ? "spinning" : error != null ? "error" : "success";
  const spinnerColor = loading ? "#7aa2f7" : error != null ? "#f7768e" : "#9ece6a";

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
      <text fg={spinnerColor}>
        <Spinner state={spinnerState} />
      </text>
    </box>
  );
}
