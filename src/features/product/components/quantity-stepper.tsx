"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex h-11 items-center rounded-(--radius-md) border border-(--color-border-strong)", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-10 items-center justify-center text-(--color-foreground) transition-colors hover:bg-(--color-muted) disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="flex w-10 items-center justify-center text-sm font-medium text-(--color-foreground)" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-10 items-center justify-center text-(--color-foreground) transition-colors hover:bg-(--color-muted) disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
