import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import type { EditorialStorySectionData } from "@/types";

/**
 * Large-format magazine-style brand-story block - the homepage's editorial
 * "moment", with generous vertical rhythm, a layered photo treatment, and an
 * optional pull quote. Image and text order flip via `data.layout` using
 * order classes rather than duplicating markup.
 */
export function EditorialStorySection({ data }: { data: EditorialStorySectionData }) {
  const isImageRight = data.layout === "imageRight";
  const paragraphs = data.body.split("\n\n");

  return (
    <Section spacing="lg">
      <Container>
        <Grid cols={{ base: 1, lg: 2 }} gap="lg" className="items-center">
          <div className={isImageRight ? "lg:order-2" : "lg:order-1"}>
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-(--radius-lg)">
                <Image
                  src={data.media.url}
                  alt={data.media.altText}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {data.secondaryMedia ? (
                <div
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-6 w-2/5 overflow-hidden rounded-(--radius-lg) border-4 border-(--color-background) shadow-(--shadow-elevation-4) sm:-right-10 sm:w-1/2"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={data.secondaryMedia.url}
                      alt={data.secondaryMedia.altText}
                      fill
                      sizes="(min-width: 1024px) 25vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <FadeIn
            className={
              isImageRight
                ? "lg:order-1"
                : data.secondaryMedia
                  ? "lg:order-2 mt-12 lg:mt-0"
                  : "lg:order-2"
            }
          >
            <div className="flex flex-col gap-6">
              {data.eyebrow ? (
                <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                  {data.eyebrow}
                </span>
              ) : null}
              <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl lg:text-5xl">
                {data.heading}
              </h2>
              <div className="flex flex-col gap-4">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-(--color-foreground-muted) sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {data.pullQuote ? (
                <blockquote className="border-l-2 border-(--color-primary) pl-6 font-(family-name:--font-display) text-xl italic text-(--color-foreground) sm:text-2xl">
                  {data.pullQuote}
                </blockquote>
              ) : null}
              {data.button ? (
                <div className="mt-2">
                  <Button asChild variant={data.button.variant ?? "primary"} size="lg">
                    <AppLink href={data.button.url}>{data.button.label}</AppLink>
                  </Button>
                </div>
              ) : null}
            </div>
          </FadeIn>
        </Grid>
      </Container>
    </Section>
  );
}
