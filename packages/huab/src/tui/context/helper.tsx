import { createContext, useContext, type ReactNode } from "react";

type ReadyAware = { ready?: boolean };

function hasReady(value: unknown): value is ReadyAware {
  return typeof value === "object" && value !== null && "ready" in value;
}

export function createSimpleContext<T, Props extends Record<string, unknown>>(input: {
  name: string;
  init: (input: Omit<Props , "children">) => T;
}) {
  const ctx = createContext<T | undefined>(undefined);

  return {
    provider: ({ children, ...props }: Props & { children: ReactNode }) => {
      const value = input.init(props);

      if (hasReady(value) && value.ready !== undefined && value.ready !== true) {
        return null;
      }

      return <ctx.Provider value={value}>{children}</ctx.Provider>;
    },
    use() {
      const value = useContext(ctx);
      if (value === undefined) {
        throw new Error(`${input.name} context must be used within a context provider`);
      }
      return value;
    },
  };
}
