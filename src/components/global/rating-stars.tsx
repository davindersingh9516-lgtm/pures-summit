import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  value: number;
  count?: number;
  className?: string;
  showCount?: boolean;
}

/** Read-only star rating display (not an input) - reused anywhere a
 * `ProductReviewSummary`/`Testimonial.rating` needs to render visually. */
export function RatingStars({ value, count, className, showCount = true }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} role="img" aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index < Math.round(value);
          return (
            <Star
              key={index}
              aria-hidden
              className={cn("size-3.5", filled ? "fill-(--color-accent) text-(--color-accent)" : "text-(--color-border-strong)")}
            />
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-(--color-foreground-muted)">({count})</span>
      )}
    </div>
  );
}
