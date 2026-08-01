"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Loader2, Search, SearchX, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { SearchSuggestions } from "@/types";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchModal } from "@/contexts/search-context";
import { useDebounce } from "@/hooks/use-debounce";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { useTranslations } from "@/hooks/use-translations";
import { ROUTES } from "@/constants/routes.constants";
import { cn } from "@/lib/utils";

interface FocusableItem {
  key: string;
  label: string;
  onSelect: () => void;
}

/**
 * Enterprise search UI - NOT search functionality. Every suggestion here is
 * pre-computed mock/merchandising data (`getSearchSuggestions()`); typing a
 * query never hits a real index, it only demonstrates the loading/empty
 * states a real implementation will fill in later.
 */
export function SearchModal({ suggestions }: { suggestions: SearchSuggestions }) {
  const { isOpen, close } = useSearchModal();
  const t = useTranslations();
  const router = useRouter();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const isLoading = query.trim().length > 0 && query !== debouncedQuery;
  const hasQuery = debouncedQuery.trim().length > 0;

  const [activeIndex, setActiveIndex] = useState(-1);

  function goTo(url: string, term?: string) {
    if (term) addRecentSearch(term);
    close();
    setQuery("");
    router.push(url);
  }

  const items = useMemo<FocusableItem[]>(() => {
    if (hasQuery) return [];

    const recent: FocusableItem[] = recentSearches.map((term) => ({
      key: `recent-${term}`,
      label: term,
      onSelect: () => setQuery(term),
    }));

    const popular: FocusableItem[] = suggestions.popularSearches.map((term) => ({
      key: `popular-${term}`,
      label: term,
      onSelect: () => setQuery(term),
    }));

    const products: FocusableItem[] = suggestions.trendingProducts.map((product) => ({
      key: `product-${product.id}`,
      label: product.name,
      onSelect: () => goTo(ROUTES.product(product.slug), product.name),
    }));

    const categories: FocusableItem[] = suggestions.suggestedCategories.map((category) => ({
      key: `category-${category.id}`,
      label: category.name,
      onSelect: () => goTo(ROUTES.category(category.slug)),
    }));

    const articles: FocusableItem[] = suggestions.suggestedArticles.map((article) => ({
      key: `article-${article.id}`,
      label: article.title,
      onSelect: () => goTo(ROUTES.blogPost(article.slug)),
    }));

    return [...recent, ...popular, ...products, ...categories, ...articles];
    // eslint-disable-next-line react-hooks/exhaustive-deps -- goTo is stable enough for this list's lifetime
  }, [hasQuery, recentSearches, suggestions]);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (items.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      items[activeIndex]?.onSelect();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
          setQuery("");
          setActiveIndex(-1);
        }
      }}
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-[10vh] left-1/2 z-(--z-index-modal) w-full max-w-2xl -translate-x-1/2 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface-raised) shadow-(--shadow-elevation-5)",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
        >
          <DialogTitle className="sr-only">{t("search")}</DialogTitle>

          <div className="flex items-center gap-3 border-b border-(--color-border) px-5 py-4">
            {isLoading ? (
              <Loader2 className="size-5 shrink-0 animate-spin text-(--color-foreground-muted)" />
            ) : (
              <Search className="size-5 shrink-0 text-(--color-foreground-muted)" />
            )}
            <Input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={onKeyDown}
              placeholder={t("searchPlaceholder")}
              className="h-auto border-none bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-5">
            {hasQuery ? (
              isLoading ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center text-(--color-foreground-muted)">
                  <Loader2 className="size-5 animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <SearchX className="size-8 text-(--color-foreground-muted)" />
                  <p className="font-medium text-(--color-foreground)">{t("searchEmptyTitle")}</p>
                  <p className="text-sm text-(--color-foreground-muted)">{t("searchEmptyDescription")}</p>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-8">
                {recentSearches.length > 0 && (
                  <SuggestionSection title={t("searchRecent")} action={{ label: t("searchClearRecent"), onClick: clearRecentSearches }}>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <SuggestionPill
                          key={term}
                          icon={<Clock className="size-3.5" />}
                          label={term}
                          active={items[activeIndex]?.key === `recent-${term}`}
                          onClick={() => setQuery(term)}
                        />
                      ))}
                    </div>
                  </SuggestionSection>
                )}

                {suggestions.popularSearches.length > 0 && (
                  <SuggestionSection title={t("searchPopular")}>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.popularSearches.map((term) => (
                        <SuggestionPill
                          key={term}
                          icon={<TrendingUp className="size-3.5" />}
                          label={term}
                          active={items[activeIndex]?.key === `popular-${term}`}
                          onClick={() => setQuery(term)}
                        />
                      ))}
                    </div>
                  </SuggestionSection>
                )}

                {suggestions.trendingProducts.length > 0 && (
                  <SuggestionSection title={t("searchTrendingProducts")}>
                    <div className="grid grid-cols-3 gap-3">
                      {suggestions.trendingProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => goTo(ROUTES.product(product.slug), product.name)}
                          className={cn(
                            "flex flex-col gap-2 rounded-(--radius-md) p-2 text-left transition-colors hover:bg-(--color-muted)",
                            items[activeIndex]?.key === `product-${product.id}` && "bg-(--color-muted)",
                          )}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-(--radius-sm) bg-(--color-muted)">
                            <Image src={product.image.url} alt={product.image.altText} fill sizes="120px" className="object-cover" />
                          </div>
                          <p className="line-clamp-1 text-xs font-medium text-(--color-foreground)">{product.name}</p>
                          <p className="text-xs text-(--color-foreground-muted)">{product.price.formatted}</p>
                        </button>
                      ))}
                    </div>
                  </SuggestionSection>
                )}

                {suggestions.suggestedCategories.length > 0 && (
                  <SuggestionSection title={t("searchSuggestedCategories")}>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.suggestedCategories.map((category) => (
                        <SuggestionPill
                          key={category.id}
                          label={category.name}
                          active={items[activeIndex]?.key === `category-${category.id}`}
                          onClick={() => goTo(ROUTES.category(category.slug))}
                        />
                      ))}
                    </div>
                  </SuggestionSection>
                )}

                {suggestions.suggestedArticles.length > 0 && (
                  <SuggestionSection title={t("searchSuggestedArticles")}>
                    <div className="flex flex-col gap-1">
                      {suggestions.suggestedArticles.map((article) => (
                        <button
                          key={article.id}
                          type="button"
                          onClick={() => goTo(ROUTES.blogPost(article.slug))}
                          className={cn(
                            "rounded-(--radius-md) px-2 py-2 text-left text-sm text-(--color-foreground) transition-colors hover:bg-(--color-muted)",
                            items[activeIndex]?.key === `article-${article.id}` && "bg-(--color-muted)",
                          )}
                        >
                          {article.title}
                        </button>
                      ))}
                    </div>
                  </SuggestionSection>
                )}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function SuggestionSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
          {title}
        </p>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="text-xs text-(--color-foreground-muted) underline-offset-2 hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function SuggestionPill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-(--radius-full) border border-(--color-border) px-3 py-1.5 text-sm text-(--color-foreground) transition-colors hover:bg-(--color-muted)",
        active && "bg-(--color-muted)",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
