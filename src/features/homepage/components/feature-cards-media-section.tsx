import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { FeatureCardsMediaSectionData } from "@/types";

const cardBackgrounds = ["bg-(--color-brand-100)", "bg-(--color-secondary-100)", "bg-(--color-neutral-100)"];

/**
 * Editorial copy + a stack of explainer cards on one side, a single large
 * image (with an optional small stats row beneath it) on the other -
 * e.g. "MGO 263+, Explained". `data.imagePosition` controls which side the
 * image renders on, via order classes rather than duplicated markup.
 */
export function FeatureCardsMediaSection({ data }: { data: FeatureCardsMediaSectionData }) {
  const isImageLeft = data.imagePosition === "left";

  return (
    <Section spacing="md">
      <Container size="full">
        <Grid cols={{ base: 1, lg: 2 }} gap="lg" className="items-start">
          <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
            <FadeIn className="flex flex-col gap-5">
              {data.eyebrow && (
                <span className="inline-flex w-fit items-center rounded-(--radius-full) bg-(--color-accent) px-3 py-1 text-xs font-semibold tracking-(--tracking-wider) text-(--color-accent-foreground) uppercase">
                  {data.eyebrow}
                </span>
              )}
              <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
                {data.heading}
              </h2>
              <p className="text-base leading-relaxed text-(--color-foreground-muted)">{data.description}</p>
              {data.button && (
                <div>
                  <Button asChild variant={data.button.variant ?? "secondary"} size="lg">
                    <AppLink href={data.button.url}>{data.button.label}</AppLink>
                  </Button>
                </div>
              )}
            </FadeIn>

            <Stagger className="mt-8">
              <div className="flex flex-col gap-5">
                {data.cards.map((card, index) => (
                  <StaggerItem key={card.id}>
                    <div
                      className={`flex flex-col gap-3 rounded-(--radius-xl) p-6 sm:p-8 ${cardBackgrounds[index % cardBackgrounds.length]}`}
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-(--radius-full) bg-(--color-surface-raised)">
                        <Icon name={card.icon} className="size-6 text-(--color-foreground)" />
                      </span>
                      <p className="text-lg font-semibold text-(--color-foreground)">{card.title}</p>
                      <p className="text-base leading-relaxed text-(--color-foreground-muted)">{card.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </div>

          <FadeIn
            delay={0.1}
            className={cn("lg:sticky lg:top-28 lg:self-start", isImageLeft ? "lg:order-2" : "lg:order-1")}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-(--radius-lg)">
              <Image
                src={data.media.url}
                alt={data.media.altText}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {/* Covers a small generator watermark baked into the source
                  photo (lower-right) - there's no way to remove it from
                  the image pixels, so it's masked here instead. */}
              <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-[12%] w-[14%] bg-black/45 blur-2xl" />
            </div>

            {data.stats && data.stats.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-(--color-foreground-muted) sm:justify-between">
                {data.stats.map((stat, index) => (
                  <div key={stat.id} className="flex items-center gap-3">
                    {index > 0 && <span aria-hidden className="h-4 w-px bg-(--color-border)" />}
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </FadeIn>
        </Grid>
      </Container>
    </Section>
  );
}
