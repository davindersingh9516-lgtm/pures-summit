"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RatingStars } from "@/components/global/rating-stars";
import type { Product } from "@/types";

export function ProductDetailsAccordion({ product }: { product: Product }) {
  function scrollToReviews() {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Accordion id="description" type="multiple" defaultValue={["description"]} className="flex flex-col">
      <AccordionItem value="description">
        <AccordionTrigger className="text-base font-medium">Product Description</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed text-(--color-foreground-muted)">{product.description}</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="reviews-summary">
        <AccordionTrigger className="text-base font-medium">Customer Reviews</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            {product.reviewSummary.count > 0 ? (
              <RatingStars value={product.reviewSummary.averageRating} count={product.reviewSummary.count} />
            ) : (
              <p className="text-sm text-(--color-foreground-muted)">
                No reviews yet - be the first to share your experience.
              </p>
            )}
            <button
              type="button"
              onClick={scrollToReviews}
              className="w-fit text-sm font-medium text-[#12291d] hover:underline"
            >
              See all reviews ↓
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="compliance">
        <AccordionTrigger className="text-base font-medium">Quality &amp; Compliance</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-(--color-foreground-muted)">
            <li>Every batch is independently lab-tested for UMF/MGO potency before release.</li>
            <li>Sourced and packed under New Zealand MPI food safety regulations.</li>
            <li>Batch-numbered and traceable back to its harvest region and hive on our Origin &amp; Traceability map.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
