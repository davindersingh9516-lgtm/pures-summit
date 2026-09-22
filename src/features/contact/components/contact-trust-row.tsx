import { Icon } from "@/components/icons";
import type { IconName } from "@/components/icons";

const TRUST_ITEMS: Array<{ id: string; icon: IconName; label: string; description: string }> = [
  { id: "shipping", icon: "truck", label: "NZ & AU Shipping", description: "Delivered straight to your door" },
  { id: "payment", icon: "lock", label: "Secure Payment", description: "Every order processed securely" },
  { id: "returns", icon: "rotate-ccw", label: "30-Day Returns", description: "No questions asked" },
  { id: "traceable", icon: "map-pin", label: "Batch Traceable", description: "Every jar traced to its harvest" },
];

export function ContactTrustRow() {
  return (
    <div className="grid grid-cols-2 gap-6 border-b border-(--color-border) py-10 sm:grid-cols-4">
      {TRUST_ITEMS.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
          <Icon name={item.icon} className="size-6 shrink-0 text-(--color-secondary)" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-(--color-foreground)">{item.label}</span>
            <span className="text-xs text-(--color-foreground-muted)">{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
