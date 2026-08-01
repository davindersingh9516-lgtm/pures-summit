import * as React from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  as?: React.ElementType;
}

const gapClassName: Record<NonNullable<StackProps["gap"]>, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignClassName: Record<NonNullable<StackProps["align"]>, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClassName: Record<NonNullable<StackProps["justify"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/** Flexbox layout primitive - the reusable building block behind every
 * "row of things" / "column of things" layout in the app. */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    { className, direction = "column", gap = "md", align, justify, wrap = false, as: Comp = "div", ...props },
    ref,
  ) => (
    <Comp
      ref={ref}
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gapClassName[gap],
        align && alignClassName[align],
        justify && justifyClassName[justify],
        wrap && "flex-wrap",
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";
