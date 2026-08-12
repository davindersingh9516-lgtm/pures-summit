"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Image as ImageType } from "@/types";

export function ProductImageGallery({ images, productName }: { images: ImageType[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-(--radius-xl) border border-(--color-border) bg-(--color-brand-50)">
        <Image
          src={active.url}
          alt={active.altText}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain"
        />
      </div>

      {images.length > 1 ? (
        <div className="flex items-center gap-3 overflow-x-auto overflow-y-hidden pb-1">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${productName}`}
                aria-current={isActive}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-(--radius-md) border-2 bg-(--color-brand-50) transition-colors sm:size-20",
                  isActive ? "border-[#12291d]" : "border-transparent hover:border-(--color-border-strong)",
                )}
              >
                <Image src={image.url} alt={image.altText} fill sizes="80px" className="object-contain" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
