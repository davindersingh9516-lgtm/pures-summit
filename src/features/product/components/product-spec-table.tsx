import { cn } from "@/lib/utils";
import type { ProductSpecification } from "@/types";

export function ProductSpecTable({ specifications }: { specifications: ProductSpecification[] }) {
  if (!specifications || specifications.length === 0) return null;

  return (
    <div>
      <h2 className="mb-5 font-(family-name:--font-display) text-xl text-(--color-foreground)">Product Details</h2>
      <div className="overflow-hidden rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised)">
        {specifications.map((spec, index) => (
          <div
            key={spec.label}
            className={cn(
              "flex items-start px-5 py-3.5",
              index !== specifications.length - 1 && "border-b border-(--color-border)"
            )}
          >
            <span className="w-2/5 shrink-0 text-sm font-medium text-(--color-foreground-muted)">{spec.label}</span>
            <span className="text-sm font-medium text-(--color-foreground)">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
