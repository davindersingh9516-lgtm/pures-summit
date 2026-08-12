"use client";

import { useState } from "react";
import { formatMoney } from "@/utils/money";

/**
 * Single-thumb "up to $X" price cap, matching the reference layout (not a
 * dual-range slider). The parent keys this component by the URL's current
 * `maxPrice` value, so browser back/forward re-syncs the thumb by remounting
 * with a fresh initial state rather than needing a state-sync effect.
 */
export function PriceRangeSlider({
  min,
  max,
  initialValue,
  onCommit,
}: {
  min: number;
  max: number;
  initialValue: number;
  onCommit: (value: number) => void;
}) {
  const [value, setValue] = useState(initialValue);

  function commit() {
    onCommit(value);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-(--color-foreground-muted)">
        <span>{formatMoney(min * 100, "NZD")}</span>
        <span>{formatMoney(max * 100, "NZD")}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        onMouseUp={commit}
        onTouchEnd={commit}
        onKeyUp={commit}
        aria-label="Maximum price"
        className="h-1.5 w-full cursor-pointer appearance-none rounded-(--radius-full) bg-(--color-muted) accent-[#12291d]"
      />
      <p className="text-center text-sm font-medium text-(--color-foreground)">Up to {formatMoney(value * 100, "NZD")}</p>
    </div>
  );
}
