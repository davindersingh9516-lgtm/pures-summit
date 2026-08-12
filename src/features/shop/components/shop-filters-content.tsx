"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { PriceRangeSlider } from "./price-range-slider";
import type { ProductListFilters } from "@/types";

/**
 * Every interaction here rewrites the URL (via `router.push`) rather than
 * holding filter state locally - the shop page re-fetches server-side from
 * the new `searchParams`, so every filter combination is its own shareable,
 * crawlable URL instead of client-only state.
 */
export function ShopFiltersContent({
  filters,
  showCategoryFilter = true,
}: {
  filters: ProductListFilters;
  showCategoryFilter?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategories = searchParams.getAll("category");
  const activeGrades = searchParams.getAll("grade");
  const maxPriceParam = searchParams.get("maxPrice");
  const searchQuery = searchParams.get("q") ?? "";

  function commit(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleListParam(key: string, value: string) {
    commit((params) => {
      const current = params.getAll(key);
      params.delete(key);
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      next.forEach((item) => params.append(key, item));
    });
  }

  function commitMaxPrice(value: number) {
    commit((params) => {
      if (value >= filters.priceRange.max) {
        params.delete("maxPrice");
      } else {
        params.set("maxPrice", String(value));
      }
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q");
    commit((params) => {
      if (query) {
        params.set("q", String(query));
      } else {
        params.delete("q");
      }
    });
  }

  const hasActiveFilters =
    activeCategories.length > 0 || activeGrades.length > 0 || Boolean(maxPriceParam) || Boolean(searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-(family-name:--font-display) text-lg text-(--color-foreground)">Filter Products</p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => router.push(pathname, { scroll: false })}
            className="text-xs font-medium text-(--color-foreground-muted) transition-colors hover:text-[#12291d]"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
        <Input name="q" defaultValue={searchQuery} placeholder="Search products..." />
        <Button type="submit" size="icon" variant="outline" aria-label="Search" className="shrink-0">
          <Icon name="search" className="size-4" />
        </Button>
      </form>

      <Accordion type="multiple" defaultValue={["category", "grade", "price"]} className="flex flex-col">
        {showCategoryFilter && filters.categories.length > 0 ? (
          <AccordionItem value="category">
            <AccordionTrigger className="text-xs font-semibold tracking-(--tracking-wider) text-(--color-foreground) uppercase">
              Product Type
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3">
                {filters.categories.map((option) => (
                  <li key={option.id} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`category-${option.id}`}
                      checked={activeCategories.includes(option.id)}
                      onCheckedChange={() => toggleListParam("category", option.id)}
                    />
                    <label
                      htmlFor={`category-${option.id}`}
                      className="flex flex-1 cursor-pointer items-center justify-between text-sm text-(--color-foreground)"
                    >
                      <span>{option.label}</span>
                      <span className="text-xs text-(--color-foreground-muted)">{option.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {filters.grades.length > 0 ? (
          <AccordionItem value="grade">
            <AccordionTrigger className="text-xs font-semibold tracking-(--tracking-wider) text-(--color-foreground) uppercase">
              UMF / MGO Grade
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3">
                {filters.grades.map((option) => (
                  <li key={option.id} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`grade-${option.id}`}
                      checked={activeGrades.includes(option.id)}
                      onCheckedChange={() => toggleListParam("grade", option.id)}
                    />
                    <label
                      htmlFor={`grade-${option.id}`}
                      className="flex flex-1 cursor-pointer items-center justify-between text-sm text-(--color-foreground)"
                    >
                      <span>{option.label}</span>
                      <span className="text-xs text-(--color-foreground-muted)">{option.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        <AccordionItem value="price">
          <AccordionTrigger className="text-xs font-semibold tracking-(--tracking-wider) text-(--color-foreground) uppercase">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <PriceRangeSlider
              key={maxPriceParam ?? "default"}
              min={Math.floor(filters.priceRange.min)}
              max={Math.ceil(filters.priceRange.max)}
              initialValue={maxPriceParam ? Number(maxPriceParam) : Math.ceil(filters.priceRange.max)}
              onCommit={commitMaxPrice}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
