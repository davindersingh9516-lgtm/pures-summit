/**
 * JS mirror of styles/tokens/misc.css breakpoint values, for use in
 * hooks/use-media-query.ts and any logic that needs breakpoints outside CSS.
 * Keep numerically in sync with the CSS source of truth.
 */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointToken = keyof typeof BREAKPOINTS;
