import { Virtualizer, type VirtualItem } from "@tanstack/virtual-core";
import { useEffect, useMemo, useReducer, useRef, type RefObject } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";

const DEFAULT_ESTIMATE_SIZE = 1;
const DEFAULT_OVERSCAN = 8;
const RECT_POLL_MS = 33;
const OFFSET_POLL_MS = 16;
const defaultEstimateSize = () => DEFAULT_ESTIMATE_SIZE;

const RAF_SHIM = {
  requestAnimationFrame: (cb: FrameRequestCallback) =>
    setTimeout(() => cb(Date.now()), OFFSET_POLL_MS) as unknown as number,
  cancelAnimationFrame: (id: number) => clearTimeout(id),
  performance: { now: () => Date.now() },
};

function makeFakeScrollElement(scrollRef: RefObject<ScrollBoxRenderable | null>) {
  return {
    window: RAF_SHIM,
    get scrollHeight() {
      return scrollRef.current?.scrollHeight ?? 0;
    },
    get clientHeight() {
      return scrollRef.current?.viewport.height ?? 0;
    },
    get scrollWidth() {
      return scrollRef.current?.viewport.width ?? 0;
    },
    get clientWidth() {
      return scrollRef.current?.viewport.width ?? 0;
    },
  };
}

type FakeScrollElement = ReturnType<typeof makeFakeScrollElement>;

function getSpacers(virtualItems: VirtualItem[], totalSize: number) {
  if (virtualItems.length === 0) {
    return { top: 0, bottom: 0 };
  }

  const first = virtualItems[0];
  const last = virtualItems[virtualItems.length - 1];
  return {
    top: first.start,
    bottom: Math.max(0, totalSize - last.end),
  };
}

interface UseOpenTuiVirtualizerOptions {
  count: number;
  estimateSize?: (index: number) => number;
  overscan?: number;
  getItemKey?: (index: number) => number | string;
}

export function useOpenTuiVirtualizer(
  scrollRef: RefObject<ScrollBoxRenderable | null>,
  { count, estimateSize, overscan = DEFAULT_OVERSCAN, getItemKey }: UseOpenTuiVirtualizerOptions,
) {
  const estimateSizeFn = estimateSize ?? defaultEstimateSize;
  const scrollElementRef = useRef<FakeScrollElement | null>(null);
  const estimateSizeRef = useRef(estimateSizeFn);
  const getItemKeyRef = useRef(getItemKey);
  const [, rerender] = useReducer((x: number) => x + 1, 0);

  estimateSizeRef.current = estimateSizeFn;
  getItemKeyRef.current = getItemKey;

  const virtualizer = useMemo(() => {
    return new Virtualizer<Element, Element>({
      count,
      estimateSize: (index) => estimateSizeRef.current(index),
      overscan,
      getItemKey: (index) => getItemKeyRef.current?.(index) ?? index,
      getScrollElement: () => {
        if (!scrollRef.current) return null;
        if (!scrollElementRef.current) {
          scrollElementRef.current = makeFakeScrollElement(scrollRef);
        }
        return scrollElementRef.current as unknown as Element;
      },
      scrollToFn: (offset, { adjustments = 0 }) => {
        const sb = scrollRef.current;
        if (!sb) return;
        sb.scrollTo(Math.max(0, offset + adjustments));
      },
      observeElementRect: (_instance, cb) => {
        const emit = () => {
          const sb = scrollRef.current;
          cb({
            width: sb?.viewport.width ?? 0,
            height: sb?.viewport.height ?? 0,
          });
        };

        emit();
        const timer = setInterval(emit, RECT_POLL_MS);
        return () => clearInterval(timer);
      },
      observeElementOffset: (_instance, cb) => {
        let previous = -1;
        const emit = () => {
          const next = scrollRef.current?.scrollTop ?? 0;
          if (next !== previous) {
            previous = next;
            cb(next, false);
          }
        };

        emit();
        const timer = setInterval(emit, OFFSET_POLL_MS);
        return () => clearInterval(timer);
      },
      onChange: () => rerender(),
    });
  }, [scrollRef]);

  useEffect(() => {
    virtualizer.setOptions({
      ...virtualizer.options,
      count,
      estimateSize: (index) => estimateSizeRef.current(index),
      overscan,
      getItemKey: (index) => getItemKeyRef.current?.(index) ?? index,
    });
    virtualizer._willUpdate();
  }, [count, estimateSizeFn, getItemKey, overscan, virtualizer]);

  useEffect(() => {
    return virtualizer._didMount();
  }, [virtualizer]);

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = Math.ceil(virtualizer.getTotalSize());
  const { top: paddingTop, bottom: paddingBottom } = getSpacers(virtualItems, totalSize);

  return {
    virtualizer,
    virtualItems,
    totalSize,
    paddingTop,
    paddingBottom,
  };
}
