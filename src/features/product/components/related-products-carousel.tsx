"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import type { Product } from "@/types";

export function RelatedProductsCarousel({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground)">Related Products</h2>

      <Carousel className="mt-8" options={{ align: "start" }}>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
              <ProductCard product={product} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
            </CarouselItem>
          ))}
        </CarouselContent>
        {products.length > 4 ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        ) : null}
      </Carousel>
    </div>
  );
}
