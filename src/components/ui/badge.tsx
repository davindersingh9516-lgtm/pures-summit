import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-(--radius-full) border px-2.5 py-0.5 text-xs font-medium tracking-(--tracking-wide) transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-(--color-primary) text-(--color-primary-foreground)",
        secondary: "border-transparent bg-(--color-secondary) text-(--color-secondary-foreground)",
        outline: "border-(--color-border-strong) text-(--color-foreground)",
        accent: "border-transparent bg-(--color-accent) text-(--color-accent-foreground)",
        destructive: "border-transparent bg-(--color-destructive) text-(--color-destructive-foreground)",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
