import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { CTABannerSectionData } from "@/types";

/** Bold closing CTA - full-bleed background image with a dark scrim when
 * `data.media` is present, otherwise a solid dark section. Meant to be the
 * last, highest-weight section before the footer. */
export function CTABannerSection({ data }: { data: CTABannerSectionData }) {
  const hasMedia = Boolean(data.media);

  return (
    <section
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden py-24",
        !hasMedia && "bg-(--color-neutral-900) text-(--color-neutral-0)",
      )}
    >
      {data.media ? (
        <>
          <Image
            src={data.media.url}
            alt={data.media.altText}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black opacity-(--opacity-overlay)" />
        </>
      ) : null}

      <Container className="relative z-10">
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2
            className={cn(
              "font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl",
              hasMedia ? "text-white" : "text-(--color-neutral-0)",
            )}
          >
            {data.heading}
          </h2>
          {data.description ? (
            <p className={cn("text-base sm:text-lg", hasMedia ? "text-white/90" : "text-(--color-neutral-0)/80")}>
              {data.description}
            </p>
          ) : null}
          <Button asChild variant={data.button.variant ?? "primary"} size="lg" className="mt-2">
            <AppLink href={data.button.url}>{data.button.label}</AppLink>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
