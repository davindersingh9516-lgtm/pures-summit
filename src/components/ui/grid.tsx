import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: { base?: number; sm?: number; md?: number; lg?: number };
  gap?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const gapClassName: Record<NonNullable<GridProps["gap"]>, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const smColsMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

const mdColsMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColsMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/** Responsive CSS grid primitive with an explicit, statically-analyzable
 * column map per breakpoint (Tailwind can't see dynamically-built class
 * strings, so each breakpoint's column count is looked up from a table). */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = { base: 1 }, gap = "md", as: Comp = "div", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        "grid",
        cols.base && colsMap[cols.base],
        cols.sm && smColsMap[cols.sm],
        cols.md && mdColsMap[cols.md],
        cols.lg && lgColsMap[cols.lg],
        gapClassName[gap],
        className,
      )}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";
