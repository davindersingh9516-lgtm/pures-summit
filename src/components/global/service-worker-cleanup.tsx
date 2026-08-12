"use client";

import { useEffect } from "react";

/**
 * This project never registers a service worker - but a browser can still
 * have one cached for `localhost:3000` from a completely different project
 * that once ran on the same port (service workers are scoped by origin, not
 * by app), causing a stray `/sw.js` 404 on every load. Unregistering
 * anything found is always safe here since we never intentionally register
 * one ourselves.
 */
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  }, []);

  return null;
}
