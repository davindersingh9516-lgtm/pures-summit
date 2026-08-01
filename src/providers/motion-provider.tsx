"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes every Framer Motion animation in the app
 * automatically respect the OS-level "prefers-reduced-motion" setting
 * (durations collapse to ~0 for users who've asked for reduced motion),
 * satisfying the accessibility requirement without every animated
 * component needing its own media-query check.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
