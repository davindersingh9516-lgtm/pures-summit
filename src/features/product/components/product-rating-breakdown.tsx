import { Icon } from "@/components/icons";
import type { Review } from "@/types";

export interface ProductRatingBreakdownProps {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

export function ProductRatingBreakdown({ reviews, averageRating, totalCount }: ProductRatingBreakdownProps) {
  if (reviews.length === 0) return null;

  const ratings = [5, 4, 3, 2, 1] as const;
  const filledStars = Math.floor(averageRating);

  return (
    <div className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="font-(family-name:--font-display) text-4xl text-(--color-foreground)">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                name="star"
                aria-hidden
                className={index < filledStars ? "size-4 text-(--color-secondary)" : "size-4 text-(--color-border)"}
              />
            ))}
          </div>
          <span className="text-sm text-(--color-foreground-muted)">{totalCount} reviews</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {ratings.map((rating) => {
          const count = reviews.filter((review) => review.rating === rating).length;
          const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

          return (
            <div key={rating} className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-sm text-(--color-foreground-muted)">{rating} star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-(--radius-full) bg-(--color-muted)">
                <div
                  className="h-full rounded-(--radius-full) bg-(--color-secondary)"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs tabular-nums text-(--color-foreground-muted)">
                {Math.round(percentage)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
