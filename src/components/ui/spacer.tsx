import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  axis?: "vertical" | "horizontal";
}

const verticalSizeClassName: Record<NonNullable<SpacerProps["size"]>, string> = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
  "2xl": "h-24",
};

const horizontalSizeClassName: Record<NonNullable<SpacerProps["size"]>, string> = {
  xs: "w-2",
  sm: "w-4",
  md: "w-8",
  lg: "w-12",
  xl: "w-16",
  "2xl": "w-24",
};

/** An explicit, named spacing block - for the rare case a margin utility on
 * a sibling isn't the clearer choice (e.g. spacing between unrelated,
 * independently-composed blocks). */
export function Spacer({ size = "md", axis = "vertical", className, ...props }: SpacerProps) {
  return (
    <div
      aria-hidden
      className={cn(axis === "vertical" ? verticalSizeClassName[size] : horizontalSizeClassName[size], className)}
      {...props}
    />
  );
}
