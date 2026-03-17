import type { HuabEvent } from "./schema.ts";

type Listener = (event: HuabEvent) => void;

const listeners = new Set<Listener>();

export function emitEvent(event: HuabEvent): void {
  for (const listener of listeners) {
    listener(event);
  }
}

export function subscribeEvent(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
