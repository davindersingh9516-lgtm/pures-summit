"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel>");
  return context;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: CarouselOptions;
}

/**
 * Thin, accessible wrapper around Embla Carousel - the single carousel
 * primitive every horizontally-scrolling homepage section (products,
 * categories, blog preview, testimonials, Instagram feed) builds on, so
 * drag/snap/keyboard behavior and prev/next affordances stay identical
 * everywhere instead of being reimplemented per section.
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ options, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", ...options });
    // Re-render on Embla's own "select"/"reInit" events rather than mirroring
    // its scroll state into local state - canScrollPrev/canScrollNext are
    // then read fresh from `api` on every render (including the first one
    // where `api` becomes non-null), so there's no separate initial-sync
    // setState call inside an effect.
    const [, forceRender] = React.useReducer((count: number) => count + 1, 0);

    React.useEffect(() => {
      if (!api) return;
      api.on("select", forceRender);
      api.on("reInit", forceRender);
      return () => {
        api.off("select", forceRender);
        api.off("reInit", forceRender);
      };
    }, [api]);

    const canScrollPrev = api?.canScrollPrev() ?? false;
    const canScrollNext = api?.canScrollNext() ?? false;

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    return (
      <CarouselContext.Provider value={{ carouselRef, api, canScrollPrev, canScrollNext, scrollPrev, scrollNext }}>
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          className={cn("relative", className)}
          onKeyDownCapture={onKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} className={cn("-ml-4 flex", className)} {...props} />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  ),
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("size-10 rounded-(--radius-full)", className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous slide"
        {...props}
      >
        <ChevronLeft className="size-4" />
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("size-10 rounded-(--radius-full)", className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next slide"
        {...props}
      >
        <ChevronRight className="size-4" />
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";
