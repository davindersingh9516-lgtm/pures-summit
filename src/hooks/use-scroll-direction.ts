"use client";

import { useSyncExternalStore } from "react";

export type ScrollDirection = "up" | "down" | "none";

interface ScrollSnapshot {
  scrollY: number;
  direction: ScrollDirection;
}

/**
 * Module-level (not `useRef`) shared scroll state - React's `refs` lint rule
 * forbids reading/writing a ref during render, so the "compare against the
 * previous value" logic lives here instead, mutated only from the scroll
 * event callback (an external system), never during render. A single
 * shared listener/snapshot is also simply correct: there is exactly one
 * window scroll position for every consumer of this hook to agree on.
 */
let snapshot: ScrollSnapshot = { scrollY: 0, direction: "none" };
const listeners = new Set<() => void>();
let isListening = false;

function startListening() {
  if (typeof window === "undefined" || isListening) return;
  isListening = true;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const direction: ScrollDirection =
        currentY > snapshot.scrollY + 2 ? "down" : currentY < snapshot.scrollY - 2 ? "up" : snapshot.direction;

      if (currentY !== snapshot.scrollY || direction !== snapshot.direction) {
        snapshot = { scrollY: currentY, direction };
        listeners.forEach((listener) => listener());
      }
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  startListening();
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return snapshot;
}

/**
 * Tracks scroll position/direction via `useSyncExternalStore` - used by the
 * sticky Header to switch between transparent/solid and
 * hide-on-scroll-down/show-on-scroll-up states.
 */
export function useScrollDirection(topThreshold = 8) {
  const { scrollY, direction } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { scrollY, direction, isAtTop: scrollY < topThreshold };
}
