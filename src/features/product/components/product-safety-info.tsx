import { Icon, type IconName } from "@/components/icons";

interface SafetyItem {
  icon: IconName;
  label: string;
  description: string;
}

const items: SafetyItem[] = [
  {
    icon: "thermometer",
    label: "Storage",
    description:
      "Keep in a cool, dry place away from direct sunlight. Crystallisation is a natural process, not a sign of spoilage - if it happens, gently warm the jar in warm water rather than boiling to soften it back to a liquid state.",
  },
  {
    icon: "baby",
    label: "Not Suitable for Infants Under 12 Months",
    description:
      "As with raw honey generally, there is a small risk of infant botulism, so this product should not be given to children under one year of age.",
  },
  {
    icon: "info",
    label: "Food Product",
    description:
      "This is a food, not a registered therapeutic good. It's intended as part of a normal, varied diet and is not intended to diagnose, treat, cure, or prevent any disease. If you have specific health concerns, please consult a healthcare provider.",
  },
];

export function ProductSafetyInfo() {
  return (
    <div className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-muted) p-6 sm:p-8">
      <h2 className="text-lg font-(family-name:--font-display) text-(--color-foreground)">Important Information</h2>
      <dl className="mt-5 space-y-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-(--radius-full) bg-(--color-surface-raised) text-(--color-foreground-muted)">
              <Icon name={item.icon} className="size-4" />
            </span>
            <div>
              <dt className="text-sm font-medium text-(--color-foreground)">{item.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-(--color-foreground-muted)">{item.description}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
