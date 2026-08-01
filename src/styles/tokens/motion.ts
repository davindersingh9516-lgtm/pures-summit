/**
 * JS mirror of `styles/tokens/motion.css`, for use in Framer Motion variants
 * (components/animations/*) where values must be plain numbers/strings
 * rather than CSS custom properties. Keep numerically in sync with the CSS.
 */

export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
  slowest: 0.9,
} as const;

export const easing = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
  editorial: [0.16, 1, 0.3, 1],
} as const;

export type MotionDurationToken = keyof typeof duration;
export type MotionEasingToken = keyof typeof easing;
