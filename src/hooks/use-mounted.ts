"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Returns true only after the component has mounted on the client. Guards
 * against hydration mismatches for anything that reads browser-only state
 * (localStorage, matchMedia, window) before rendering it.
 *
 * Built on `useSyncExternalStore` (server snapshot `false`, client snapshot
 * `true`) rather than an effect + setState, so there's no
 * setState-during-effect render cascade - React reconciles the
 * server/client snapshot mismatch for us.
 */
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
