import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maps to the `--container-*` tokens in styles/tokens/spacing.css.
   * "full" has NO max-width - content runs edge to edge with only the
   * responsive side padding, for chrome (header/hero) that should never
   * gutter out into empty space on ultra-wide screens. */
  size?: "content" | "3xl" | "page" | "full";
  as?: React.ElementType;
}

const sizeClassName: Record<NonNullable<ContainerProps["size"]>, string> = {
  content: "max-w-(--container-content)",
  "3xl": "max-w-(--container-3xl)",
  page: "max-w-(--container-page)",
  full: "",
};

/** Centered, horizontally-padded content wrapper - the standard width
 * constraint for every section on the site. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "page", as: Comp = "div", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        "mx-auto w-full px-14 sm:px-18 lg:px-22 min-[1400px]:px-[70px]!",
        sizeClassName[size],
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = "Container";
