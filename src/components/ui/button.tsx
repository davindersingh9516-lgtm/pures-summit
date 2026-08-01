import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-md) text-sm font-medium tracking-(--tracking-wide) transition-colors duration-(--duration-fast) ease-(--ease-standard) disabled:pointer-events-none disabled:opacity-(--opacity-disabled) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-background)",
  {
    variants: {
      variant: {
        primary: "bg-(--color-primary) text-(--color-primary-foreground) hover:opacity-(--opacity-hover)",
        secondary:
          "bg-(--color-secondary) text-(--color-secondary-foreground) hover:opacity-(--opacity-hover)",
        outline:
          "border border-(--color-border-strong) bg-transparent text-(--color-foreground) hover:bg-(--color-muted)",
        ghost: "bg-transparent text-(--color-foreground) hover:bg-(--color-muted)",
        link: "bg-transparent text-(--color-primary) underline-offset-4 hover:underline",
        destructive:
          "bg-(--color-destructive) text-(--color-destructive-foreground) hover:opacity-(--opacity-hover)",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
