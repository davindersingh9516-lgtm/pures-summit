"use client";

import Image from "next/image";
import { Eye, Heart, Scale } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { RatingStars } from "@/components/global/rating-stars";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useCompare } from "@/contexts/compare-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes.constants";
import { cn } from "@/lib/utils";
import { QuickViewDialog } from "./quick-view-dialog";

export interface ProductCardProps {
  product: Product;
  className?: string;
  /** Image `sizes` attribute - pass the real rendered width context (grid
   * column vs. carousel slide) so Next/Image doesn't over-fetch. */
  sizes?: string;
}

/**
 * The single shared product card used everywhere a product needs to render
 * as a tile: homepage carousels now, Shop/Collection grids in Prompt 4.
 * Wishlist/Compare state is read from their respective contexts (Prompt 1),
 * so toggling here stays in sync with the header's wishlist count etc.
 */
export function ProductCard({ product, className, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw" }: ProductCardProps) {
  const wishlist = useWishlist();
  const compare = useCompare();
  const cart = useCart();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const inWishlist = wishlist.has(product.id);
  const inCompare = compare.has(product.id);
  const compareDisabled = !inCompare && compare.isFull;
  const hasSale = Boolean(product.salePrice && product.salePrice.amount < product.price.amount);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const hasVariants = product.variants.length > 0;
  const primaryCategory = product.categories[0];

  function handleAddToCart() {
    cart.addItem(product.id, 1);
    toast({ title: "Added to cart", description: product.name });
  }

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-(--radius-xl) border border-(--color-border) bg-(--color-brand-50) transition-shadow duration-(--duration-normal) hover:shadow-(--shadow-elevation-3)",
        className,
      )}
    >
      {/* Matches the source photo's own aspect ratio exactly - with
          object-contain, any mismatch between this box's ratio and the
          image's real ratio shows up as empty letterboxing on the sides
          or top/bottom, which read as unwanted padding. */}
      <div className="relative aspect-[1664/2570] overflow-hidden">
        <AppLink href={ROUTES.product(product.slug)} className="absolute inset-0" tabIndex={-1} aria-hidden>
          <div className="relative size-full">
            <Image
              src={primaryImage.url}
              alt=""
              fill
              sizes={sizes}
              className={cn(
                "object-contain transition-all duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-[1.04]",
                secondaryImage && "group-hover:opacity-0",
              )}
            />
            {secondaryImage && (
              <Image
                src={secondaryImage.url}
                alt=""
                fill
                sizes={sizes}
                className="object-contain opacity-0 transition-all duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-[1.04] group-hover:opacity-100"
              />
            )}
          </div>
        </AppLink>

        <div className="pointer-events-none absolute top-4 left-4 flex flex-col items-start gap-1.5">
          {isOutOfStock && <Badge variant="outline">Sold Out</Badge>}
          {hasSale && <Badge variant="destructive">Sale</Badge>}
          {product.badges?.map((badge) => (
            <Badge key={badge} variant="accent">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-1.5 opacity-100 transition-opacity duration-(--duration-fast) lg:opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100">
          <button
            type="button"
            aria-pressed={inWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => wishlist.toggle(product.id)}
            className="flex size-10 items-center justify-center rounded-(--radius-full) bg-(--color-surface-raised)/95 text-(--color-foreground) backdrop-blur-sm transition-colors hover:text-(--color-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring)"
          >
            <Heart className={cn("size-4", inWishlist && "fill-current text-(--color-primary)")} />
          </button>
          <button
            type="button"
            aria-pressed={inCompare}
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            onClick={() => compare.toggle(product.id)}
            disabled={compareDisabled}
            className="flex size-10 items-center justify-center rounded-(--radius-full) bg-(--color-surface-raised)/95 text-(--color-foreground) backdrop-blur-sm transition-colors hover:text-(--color-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring) disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)"
          >
            <Scale className={cn("size-4", inCompare && "text-(--color-primary)")} />
          </button>
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            aria-label="Quick view"
            className="flex size-10 items-center justify-center rounded-(--radius-full) bg-(--color-surface-raised)/95 text-(--color-foreground) backdrop-blur-sm transition-colors hover:text-(--color-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring)"
          >
            <Eye className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 px-4 pt-4 pb-4 text-center sm:px-5 sm:pb-5">
        {primaryCategory && (
          <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
            {primaryCategory.name}
          </span>
        )}

        <AppLink
          href={ROUTES.product(product.slug)}
          className="line-clamp-2 font-(family-name:--font-display) text-lg font-medium text-(--color-foreground) transition-colors hover:text-(--color-primary)"
        >
          {product.name}
        </AppLink>

        {product.reviewSummary.count > 0 && (
          <RatingStars value={product.reviewSummary.averageRating} count={product.reviewSummary.count} />
        )}

        <div className="flex items-center gap-2 pt-0.5">
          {hasSale && product.salePrice ? (
            <>
              <span className="text-sm text-(--color-foreground-muted) line-through">{product.price.formatted}</span>
              <span className="text-lg font-semibold text-(--color-primary)">{product.salePrice.formatted}</span>
            </>
          ) : (
            <span className="text-lg font-semibold text-(--color-foreground)">{product.price.formatted}</span>
          )}
        </div>

        {hasVariants ? (
          <AppLink
            href={ROUTES.product(product.slug)}
            className="mt-3 flex h-11 w-full items-center justify-center rounded-(--radius-full) bg-(--color-secondary) text-xs font-semibold tracking-(--tracking-wider) text-(--color-neutral-0) uppercase transition-opacity hover:opacity-90"
          >
            Select Options
          </AppLink>
        ) : (
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="mt-3 flex h-11 w-full items-center justify-center rounded-(--radius-full) bg-(--color-secondary) text-xs font-semibold tracking-(--tracking-wider) text-(--color-neutral-0) uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>

      <QuickViewDialog product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </div>
  );
}
