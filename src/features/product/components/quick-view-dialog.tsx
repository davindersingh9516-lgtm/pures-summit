"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { RatingStars } from "@/components/global/rating-stars";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useTranslations } from "@/hooks/use-translations";
import { ROUTES } from "@/constants/routes.constants";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addItem } = useCart();
  const t = useTranslations();
  const hasVariants = product.variants.length > 0;
  const hasSale = Boolean(product.salePrice && product.salePrice.amount < product.price.amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-square bg-(--color-muted) sm:rounded-l-(--radius-lg)">
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText}
              fill
              sizes="(min-width: 640px) 320px, 100vw"
              className="object-cover sm:rounded-l-(--radius-lg)"
            />
          </div>

          <div className="flex flex-col gap-4 p-6">
            <DialogTitle className="pr-6">{product.name}</DialogTitle>

            {product.reviewSummary.count > 0 && (
              <RatingStars value={product.reviewSummary.averageRating} count={product.reviewSummary.count} />
            )}

            <div className="flex items-center gap-2">
              {hasSale && product.salePrice ? (
                <>
                  <span className="text-(--color-foreground-muted) line-through">{product.price.formatted}</span>
                  <span className="text-lg font-medium text-(--color-primary)">{product.salePrice.formatted}</span>
                </>
              ) : (
                <span className="text-lg font-medium text-(--color-foreground)">{product.price.formatted}</span>
              )}
            </div>

            <p className="text-sm text-(--color-foreground-muted)">{product.shortDescription}</p>

            {product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.badges.map((badge) => (
                  <Badge key={badge} variant="accent">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-col gap-2">
              {hasVariants ? (
                <Button asChild>
                  <AppLink href={ROUTES.product(product.slug)}>Select Options</AppLink>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    addItem({
                      id: `cart-${product.id}`,
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      image: product.images[0],
                      unitPrice: product.salePrice ?? product.price,
                      quantity: 1,
                    });
                    onOpenChange(false);
                  }}
                  disabled={product.stockStatus === "OUT_OF_STOCK"}
                >
                  {product.stockStatus === "OUT_OF_STOCK" ? "Out of Stock" : t("cart") + " - Add"}
                </Button>
              )}
              <Button variant="outline" asChild>
                <AppLink href={ROUTES.product(product.slug)}>View Full Details</AppLink>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
