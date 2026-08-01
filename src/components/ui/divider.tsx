import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

/** A content divider - a plain `<Separator>` line, optionally interrupted
 * by a centered label (e.g. "or", a footer column's mobile section title).
 * Use `<Separator>` directly for a bare line with no label. */
export function Divider({ label, className, ...props }: DividerProps) {
  if (!label) return <Separator className={className} {...props} />;

  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <Separator className="flex-1" />
      <span className="text-xs font-medium tracking-(--tracking-wide) text-(--color-foreground-muted) uppercase">
        {label}
      </span>
      <Separator className="flex-1" />
    </div>
  );
}
