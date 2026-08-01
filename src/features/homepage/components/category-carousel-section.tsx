import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { FadeIn } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getHomepageCategories } from "@/services";
import { ROUTES } from "@/constants/routes.constants";
import type { CategoryCarouselSectionData } from "@/types";

/**
 * Horizontally-scrolling shop-by-category showcase. Fetches its own
 * categories via the homepage service, so the section simply disappears
 * (renders nothing) if there are no categories to feature yet.
 */
export async function CategoryCarouselSection({ data }: { data: CategoryCarouselSectionData }) {
  const categories = await getHomepageCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Section spacing="md">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-3">
            {data.eyebrow ? (
              <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                {data.eyebrow}
              </span>
            ) : null}
            <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {data.heading}
            </h2>
            {data.subheading ? (
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground-muted)">
                {data.subheading}
              </p>
            ) : null}
          </div>
        </FadeIn>

        <Carousel className="mt-10" options={{ align: "start" }}>
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/5">
                <AppLink href={ROUTES.category(category.slug)} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-(--radius-lg) bg-(--color-muted)">
                    {category.image ? (
                      <Image
                        src={category.image.url}
                        alt={category.image.altText}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
                      <h3 className="font-(family-name:--font-display) text-lg text-white">{category.name}</h3>
                      <span className="text-xs tracking-(--tracking-wide) text-white/80">
                        {category.productCount} {category.productCount === 1 ? "product" : "products"}
                      </span>
                    </div>
                  </div>
                </AppLink>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-3 sm:justify-end">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </Container>
    </Section>
  );
}
