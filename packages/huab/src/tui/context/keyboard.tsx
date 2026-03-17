import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { KeyEvent } from "@opentui/core";

export type KeyboardScope = "search" | "list" | "detail";

export type KeyboardAction = KeyEvent;

export interface KeyboardState {
  scope: KeyboardScope;
}

const initialState: KeyboardState = { scope: "list" };

export function keyboardReducer(
  state: KeyboardState,
  action: KeyboardAction,
): KeyboardState {
  const { name, ctrl } = action;

  if (name === "tab") {
    const next: KeyboardScope =
      state.scope === "search"
        ? "list"
        : state.scope === "list"
          ? "detail"
          : "search";
    return { ...state, scope: next };
  }

  if (name === "escape") {
    return { ...state, scope: "list" };
  }

  if (state.scope === "list") {
    if (name === "enter") return { ...state, scope: "detail" };
    if (ctrl && name === "k") return { ...state, scope: "search" };
  }

  return state;
}

interface KeyboardContextValue {
  state: KeyboardState;
  dispatch: React.Dispatch<KeyboardAction>;
}

const KeyboardContext = createContext<KeyboardContextValue | undefined>(
  undefined,
);

interface KeyboardProviderProps {
  children: ReactNode;
}

export function KeyboardProvider({ children }: KeyboardProviderProps) {
  const [state, dispatch] = useReducer(keyboardReducer, initialState);

  return (
    <KeyboardContext.Provider value={{ state, dispatch }}>
      {children}
    </KeyboardContext.Provider>
  );
}

/** Returns [state, dispatch] for the keyboard reducer. */
export function useKeyboardState(): [
  KeyboardState,
  React.Dispatch<KeyboardAction>,
] {
  const ctx = useContext(KeyboardContext);
  if (!ctx)
    throw new Error("useKeyboardState must be used within KeyboardProvider");
  return [ctx.state, ctx.dispatch];
}
