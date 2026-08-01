import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { FullWidthBannerSectionData } from "@/types";

const heightClassName: Record<NonNullable<FullWidthBannerSectionData["height"]>, string> = {
  compact: "h-[320px]",
  standard: "h-[480px]",
  tall: "h-[640px]",
};

/** Full-bleed background-image banner with a dark/light/none overlay and
 * centered text content - used for promotional/gift-set style CMS blocks. */
export function FullWidthBannerSection({ data }: { data: FullWidthBannerSectionData }) {
  const overlay = data.overlay ?? "dark";
  const isLightOverlay = overlay === "light";

  return (
    <section
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        heightClassName[data.height ?? "standard"],
      )}
    >
      <Image
        src={data.media.url}
        alt={data.media.altText}
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />

      {overlay === "dark" ? <div className="absolute inset-0 bg-black opacity-(--opacity-overlay)" /> : null}
      {overlay === "light" ? <div className="absolute inset-0 bg-white opacity-(--opacity-overlay)" /> : null}

      <Container className="relative z-10">
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2
            className={cn(
              "font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl",
              isLightOverlay ? "text-(--color-foreground)" : "text-white",
            )}
          >
            {data.heading}
          </h2>
          {data.subheading ? (
            <p
              className={cn(
                "text-base sm:text-lg",
                isLightOverlay ? "text-(--color-foreground-muted)" : "text-white/90",
              )}
            >
              {data.subheading}
            </p>
          ) : null}
          {data.button ? (
            <Button asChild variant={data.button.variant ?? "primary"} size="lg" className="mt-2">
              <AppLink href={data.button.url}>{data.button.label}</AppLink>
            </Button>
          ) : null}
        </FadeIn>
      </Container>
    </section>
  );
}
