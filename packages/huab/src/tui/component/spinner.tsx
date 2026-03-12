import { useState, useEffect } from "react";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

type SpinnerState = "spinning" | "success" | "error";

interface SpinnerProps {
  state?: SpinnerState;
}

export function Spinner({ state = "spinning" }: SpinnerProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (state !== "spinning") return;
    const id = setInterval(() => setFrameIndex((i) => i + 1), 80);
    return () => clearInterval(id);
  }, [state]);

  const icon =
    state === "success"
      ? "✓"
      : state === "error"
        ? "✗"
        : FRAMES[frameIndex % FRAMES.length];

  return icon;
}
