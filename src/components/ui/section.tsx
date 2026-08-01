import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Vertical rhythm - maps to the spacing scale rather than one-off values. */
  spacing?: "sm" | "md" | "lg";
}

const spacingClassName: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-24 lg:py-32",
};

/** A full-bleed vertical section wrapper with consistent rhythm; compose
 * with `<Container>` inside for the horizontal width constraint. */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Comp = "section", spacing = "md", ...props }, ref) => (
    <Comp ref={ref} className={cn(spacingClassName[spacing], className)} {...props} />
  ),
);
Section.displayName = "Section";
