"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * localStorage-backed state, safe for SSR via `useSyncExternalStore` (no
 * setState-in-effect render cascade, no hydration flash). Used by the
 * cart/wishlist/compare/locale/currency contexts to persist client-only
 * state across sessions until real backend persistence (WooCommerce
 * sessions/customer meta) replaces it.
 *
 * A module-level emitter keyed by storage key means every component reading
 * the same key (e.g. two components both watching "cart") re-renders in
 * sync, and a `storage` event listener keeps multiple tabs in sync too.
 */
const emitters = new Map<string, Set<() => void>>();

function notify(key: string) {
  emitters.get(key)?.forEach((callback) => callback());
}

function subscribe(key: string) {
  return (callback: () => void) => {
    let set = emitters.get(key);
    if (!set) {
      set = new Set();
      emitters.set(key, set);
    }
    set.add(callback);

    const onStorage = (event: StorageEvent) => {
      if (event.key === key) callback();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      set?.delete(callback);
      window.removeEventListener("storage", onStorage);
    };
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, raw: string) {
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // Ignore quota/availability errors - in-memory readers still update.
  }
  notify(key);
}

function parse<T>(raw: string | null, initialValue: T): T {
  if (raw === null) return initialValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const rawSubscribe = useMemo(() => subscribe(key), [key]);
  const raw = useSyncExternalStore(
    rawSubscribe,
    () => readRaw(key),
    () => null,
  );
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const value = useMemo(() => parse(raw, initialValue), [raw, initialValue]);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = parse<T>(readRaw(key), initialValue);
      const resolved = next instanceof Function ? next(prev) : next;
      writeRaw(key, JSON.stringify(resolved));
    },
    [key, initialValue],
  );

  return [value, setValue, hydrated] as const;
}
