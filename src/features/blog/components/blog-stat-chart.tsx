"use client";

import { useEffect, useRef, useState } from "react";

interface BlogStatChartProps {
  title: string;
  data: { label: string; value: number }[];
  unit?: string;
}

export function BlogStatChart({ title, data, unit }: BlogStatChartProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...data.map((item) => item.value));

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-6 sm:p-8"
    >
      <h3 className="text-lg font-(family-name:--font-display) text-(--color-foreground)">{title}</h3>

      <div aria-hidden className="mt-6 flex flex-col gap-4">
        {data.map((item) => {
          const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <div key={item.label} className="flex items-center gap-4">
              <span className="w-28 flex-shrink-0 text-sm text-(--color-foreground-muted) sm:w-36">
                {item.label}
              </span>
              <span className="relative h-3 flex-1 overflow-hidden rounded-(--radius-full) bg-(--color-muted)">
                <span
                  className="absolute inset-y-0 left-0 rounded-(--radius-full) bg-(--color-secondary) transition-all duration-700 ease-out"
                  style={{ width: visible ? `${percentage}%` : "0%" }}
                />
              </span>
              <span className="flex-shrink-0 text-right text-sm font-medium tabular-nums text-(--color-foreground)">
                {item.value}
                {unit ? ` ${unit}` : ""}
              </span>
            </div>
          );
        })}
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value{unit ? ` (${unit})` : ""}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td>
                {item.value}
                {unit ? ` ${unit}` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
