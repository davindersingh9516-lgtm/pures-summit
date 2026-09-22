import { Icon, type IconName } from "@/components/icons";

interface Highlight {
  icon: IconName;
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    icon: "badge-check",
    title: "Independently Graded MGO 263+",
    description:
      "Every jar carries its MGO grade and is independently lab-verified before it ever leaves our facility. The number on the label isn't a claim - it's a result you can check.",
  },
  {
    icon: "leaf",
    title: "Traditional-Use Wellness",
    description:
      "Raw Manuka honey has featured in daily wellness routines for generations. We harvest and pack it to preserve that traditional character, so it earns its place in your routine the same way.",
  },
  {
    icon: "utensils",
    title: "Genuinely Versatile",
    description:
      "Stirred into tea, spread on toast, or taken by the spoonful - it holds up equally well. We never heat-process past raw, so its natural character carries through however you use it.",
  },
];

export function ProductHighlights() {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
          Certified Quality
        </span>
        <h2 className="font-(family-name:--font-display) text-2xl text-(--color-foreground) sm:text-3xl">
          What Makes This Different
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-6 sm:p-8"
          >
            <span className="flex size-11 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-50) text-(--color-secondary) sm:size-12">
              <Icon name={highlight.icon} className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-(--color-foreground)">{highlight.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-(--color-foreground-muted)">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
