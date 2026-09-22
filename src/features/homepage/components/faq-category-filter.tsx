"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/styles/tokens/motion";
import type { FAQCategory, FAQItem, FAQPreviewSectionData } from "@/types";

const CATEGORY_ICONS: Record<FAQCategory, "leaf" | "map-pin" | "truck" | "credit-card"> = {
  Product: "leaf",
  "Sourcing & Quality": "map-pin",
  "Shipping & Returns": "truck",
  "Orders & Payment": "credit-card",
};

/**
 * Pill category filter above a single-column accordion. At this scale (a
 * homepage teaser, not a full help center) a persistent sidebar reads as
 * over-built - a horizontal filter bar that swaps the list in place keeps it
 * feeling like a calm, curated set of answers rather than app UI.
 */
export function FAQCategoryFilter({ faqs, data }: { faqs: FAQItem[]; data: FAQPreviewSectionData }) {
  const categories = useMemo(() => {
    const seen = new Set<FAQCategory>();
    faqs.forEach((faq) => seen.add(faq.category));
    return Array.from(seen);
  }, [faqs]);

  const [activeCategory, setActiveCategory] = useState<FAQCategory | "All">("All");

  const visibleFaqs = activeCategory === "All" ? faqs : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("All")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-(--radius-full) px-4 py-2 text-base font-medium transition-colors duration-(--duration-fast)",
            activeCategory === "All"
              ? "bg-(--color-secondary) text-(--color-neutral-0)"
              : "bg-(--color-muted) text-(--color-foreground-muted) hover:text-(--color-foreground)",
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-(--radius-full) px-4 py-2 text-base font-medium transition-colors duration-(--duration-fast)",
              activeCategory === category
                ? "bg-(--color-secondary) text-(--color-neutral-0)"
                : "bg-(--color-muted) text-(--color-foreground-muted) hover:text-(--color-foreground)",
            )}
          >
            <Icon name={CATEGORY_ICONS[category]} className="size-3.5" />
            {category}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.fast, ease: easing.editorial }}
        className="mt-10"
      >
        <Accordion type="single" collapsible className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {visibleFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-base sm:text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {data.viewAllUrl || data.supportEmail ? (
        <p className="mx-auto mt-10 max-w-xl text-center text-base text-(--color-foreground-muted)">
          Still have questions?{" "}
          {data.supportEmail ? (
            <a href={`mailto:${data.supportEmail}`} className="font-medium text-(--color-secondary) hover:underline">
              Email us
            </a>
          ) : null}
          {data.supportEmail && data.viewAllUrl ? " or " : null}
          {data.viewAllUrl ? (
            <AppLink href={data.viewAllUrl} className="font-medium text-(--color-secondary) hover:underline">
              browse all FAQs
            </AppLink>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
