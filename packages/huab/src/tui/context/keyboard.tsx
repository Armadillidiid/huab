import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type KeyboardScope = "search" | "list" | "detail";

interface KeyboardContextValue {
  scope: KeyboardScope;
  setScope: (scope: KeyboardScope) => void;
}

const KeyboardContext = createContext<KeyboardContextValue | undefined>(undefined);

interface KeyboardProviderProps {
  initialScope?: KeyboardScope;
  children: ReactNode;
}

export function KeyboardProvider({ initialScope = "list", children }: KeyboardProviderProps) {
  const [scope, setScopeState] = useState<KeyboardScope>(initialScope);

  const setScope = useCallback((s: KeyboardScope) => {
    setScopeState(s);
  }, []);

  return (
    <KeyboardContext.Provider value={{ scope, setScope }}>{children}</KeyboardContext.Provider>
  );
}

/** Access the current keyboard scope and a setter. */
export function useKeyboardScope(): [KeyboardScope, (scope: KeyboardScope) => void] {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useKeyboardScope must be used within KeyboardProvider");
  return [ctx.scope, ctx.setScope];
}
