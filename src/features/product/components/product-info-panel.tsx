"use client";

import { useMemo, useState } from "react";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { RatingStars } from "@/components/global/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { toast } from "@/hooks/use-toast";
import { QuantityStepper } from "./quantity-stepper";
import type { Product } from "@/types";

function variantMatches(selections: Record<string, string>, target: Record<string, string>) {
  return Object.entries(target).every(([key, value]) => selections[key] === value);
}

export function ProductInfoPanel({ product }: { product: Product }) {
  const cart = useCart();
  const hasVariants = product.attributes.length > 0 && product.variants.length > 0;

  const [selections, setSelections] = useState<Record<string, string>>(() => product.variants[0]?.selections ?? {});
  const [quantity, setQuantity] = useState(1);

  const activeVariant = useMemo(() => {
    if (!hasVariants) return undefined;
    return product.variants.find((variant) => variantMatches(selections, variant.selections));
  }, [hasVariants, product.variants, selections]);

  const price = activeVariant ? (activeVariant.salePrice ?? activeVariant.price) : (product.salePrice ?? product.price);
  const compareAtPrice = activeVariant ? (activeVariant.salePrice ? activeVariant.price : undefined) : product.salePrice ? product.price : undefined;
  const stockStatus = activeVariant?.stockStatus ?? product.stockStatus;
  const isOutOfStock = stockStatus === "OUT_OF_STOCK";
  const primaryCategory = product.categories[0];

  function handleAddToCart() {
    if (hasVariants && !activeVariant) return;

    cart.addItem({
      id: activeVariant ? `cart-${product.id}-${activeVariant.id}` : `cart-${product.id}`,
      productId: product.id,
      variantId: activeVariant?.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      unitPrice: price,
      quantity,
      selections: hasVariants ? selections : undefined,
    });

    toast({
      title: "Added to cart",
      description: quantity > 1 ? `${product.name} × ${quantity}` : product.name,
    });
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-col gap-5">
      {primaryCategory ? (
        <span className="text-xs font-semibold tracking-(--tracking-wider) text-[#12291d] uppercase">
          {primaryCategory.name}
        </span>
      ) : null}

      <div className="flex flex-col gap-2">
        <h1 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {product.reviewSummary.count > 0 ? (
            <RatingStars value={product.reviewSummary.averageRating} count={product.reviewSummary.count} />
          ) : null}
          <button
            type="button"
            onClick={() => scrollTo("reviews")}
            className="flex items-center gap-1.5 text-sm font-medium text-[#12291d] hover:underline"
          >
            <Icon name="pencil-line" className="size-3.5" />
            Write a Review
          </button>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-(--color-foreground)">{price.formatted}</span>
        {compareAtPrice ? (
          <span className="text-lg text-(--color-foreground-muted) line-through">{compareAtPrice.formatted}</span>
        ) : null}
      </div>

      <div>
        <p className="max-w-md text-sm leading-relaxed text-(--color-foreground-muted)">{product.shortDescription}</p>
        <button
          type="button"
          onClick={() => scrollTo("description")}
          className="mt-1 text-sm font-medium text-[#12291d] hover:underline"
        >
          Read more
        </button>
      </div>

      {hasVariants ? (
        <div className="flex flex-col gap-3">
          {product.attributes.map((attribute) => (
            <div key={attribute.id} className="flex flex-col gap-2">
              <p className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                {attribute.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {attribute.values.map((value) => {
                  const isSelected = selections[attribute.name] === value.id;
                  return (
                    <button
                      key={value.id}
                      type="button"
                      onClick={() => setSelections((prev) => ({ ...prev, [attribute.name]: value.id }))}
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? "rounded-(--radius-md) border-2 border-[#12291d] bg-(--color-secondary-50) px-4 py-2 text-sm font-medium text-(--color-foreground)"
                          : "rounded-(--radius-md) border-2 border-(--color-border) px-4 py-2 text-sm font-medium text-(--color-foreground-muted) transition-colors hover:border-(--color-border-strong)"
                      }
                    >
                      {value.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="h-11 flex-1 bg-[#12291d] hover:bg-[#12291d] hover:opacity-90"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      <p className="flex items-center gap-1.5 text-sm">
        {isOutOfStock ? (
          <>
            <Icon name="circle-x" className="size-4 text-(--color-destructive)" />
            <span className="text-(--color-destructive)">Out of stock</span>
          </>
        ) : (
          <>
            <Icon name="circle-check" className="size-4 text-[#12291d]" />
            <span className="text-(--color-foreground)">In stock</span>
          </>
        )}
      </p>

      {product.badges && product.badges.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <Badge key={badge} variant="accent">
              {badge}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-3 rounded-(--radius-lg) bg-(--color-muted) p-4">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Icon name="flask-conical" className="size-5 text-[#12291d]" />
          <span className="text-xs font-medium text-(--color-foreground)">Independently Lab-Tested</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Icon name="badge-check" className="size-5 text-[#12291d]" />
          <span className="text-xs font-medium text-(--color-foreground)">UMF / MGO Verified</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Icon name="map-pin" className="size-5 text-[#12291d]" />
          <span className="text-xs font-medium text-(--color-foreground)">Batch Traceable</span>
        </div>
      </div>
      <AppLink href="/lab-reports" className="-mt-2 text-sm font-medium text-[#12291d] hover:underline">
        See lab reports →
      </AppLink>
    </div>
  );
}
