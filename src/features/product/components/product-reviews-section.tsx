import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/global/rating-stars";
import { formatDate } from "@/utils/format-date";
import { getReviewsForProduct } from "@/services";
import { WriteReviewDialog } from "./write-review-dialog";
import type { Product, Review } from "@/types";

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-2 rounded-(--radius-xl) border border-(--color-border) p-5">
      <div className="flex items-center justify-between gap-3">
        <RatingStars value={review.rating} showCount={false} />
        <span className="shrink-0 text-xs text-(--color-foreground-muted)">{formatDate(review.createdAt)}</span>
      </div>
      {review.title ? <p className="font-medium text-(--color-foreground)">{review.title}</p> : null}
      <p className="text-sm leading-relaxed text-(--color-foreground-muted)">{review.content}</p>
      <div className="flex items-center gap-2 text-xs text-(--color-foreground-muted)">
        <span className="font-medium text-(--color-foreground)">{review.authorName}</span>
        {review.verifiedPurchase ? <Badge variant="outline">Verified Purchase</Badge> : null}
      </div>
    </div>
  );
}

export async function ProductReviewsSection({ product }: { product: Product }) {
  const result = await getReviewsForProduct(product.id);
  const reviews = result.nodes;

  return (
    <div id="reviews" className="scroll-mt-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
            Real Feedback
          </span>
          <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground)">Customer Reviews</h2>
        </div>
        <WriteReviewDialog productName={product.name} />
      </div>

      <div className="mt-8">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface) py-16 text-center">
            <span className="flex size-11 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-50) text-[#12291d]">
              <Icon name="message-circle" className="size-5" />
            </span>
            <p className="font-medium text-(--color-foreground)">No reviews yet</p>
            <p className="max-w-sm text-sm text-(--color-foreground-muted)">
              Be the first to share your experience with this product - your review helps other shoppers decide.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
