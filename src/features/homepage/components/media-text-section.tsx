"use client";

import Image from "next/image";
import { useState } from "react";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { MediaTextSectionData } from "@/types";

/**
 * Two-column editorial media/text block - covers the CMS "Split Hero",
 * "Image Left", and "Image Right" layouts. Image and text order are flipped
 * via `data.layout` using order classes rather than duplicating markup.
 * When `data.video` is present, it autoplays muted and looped inside the
 * media panel (poster = `data.media`, shown until the first frame decodes),
 * the same technique as the hero - just contained instead of full-bleed.
 */
export function MediaTextSection({ data }: { data: MediaTextSectionData }) {
  const isImageRight = data.layout === "imageRight";
  const [videoReady, setVideoReady] = useState(false);

  return (
    <Section spacing="md">
      <Container size="full">
        <Grid cols={{ base: 1, md: 2 }} gap="lg" className="items-center">
          <div className={isImageRight ? "md:order-2" : "md:order-1"}>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-(--radius-lg)">
              {data.video ? (
                <>
                  <video
                    className={cn(
                      "absolute inset-0 size-full object-cover transition-opacity duration-700",
                      videoReady ? "opacity-100" : "opacity-0",
                    )}
                    src={data.video.url}
                    poster={data.video.poster?.url ?? data.media.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={() => setVideoReady(true)}
                    onPlaying={() => setVideoReady(true)}
                    aria-hidden
                    tabIndex={-1}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
                      videoReady ? "opacity-0" : "opacity-100",
                    )}
                    style={{ backgroundImage: `url(${data.video.poster?.url ?? data.media.url})` }}
                  />
                  {/* Covers a small generator watermark baked into the
                      source footage (bottom-right, same spot the hero
                      video's watermark sits at) - there's no way to remove
                      it from the video pixels, so it's masked here instead. */}
                  <div aria-hidden className="pointer-events-none absolute right-0 bottom-[6%] h-[14%] w-[12%] bg-black/55 blur-2xl" />
                </>
              ) : (
                <Image
                  src={data.media.url}
                  alt={data.media.altText}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>

          <FadeIn className={isImageRight ? "md:order-1" : "md:order-2"}>
            <div className="flex flex-col gap-5">
              {data.eyebrow ? (
                <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                  {data.eyebrow}
                </span>
              ) : null}
              <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
                {data.heading}
              </h2>
              <p className="text-base leading-relaxed text-(--color-foreground-muted)">{data.description}</p>
              {data.highlights && data.highlights.length > 0 ? (
                <dl className="mt-1 grid grid-cols-1 gap-4 border-t border-(--color-border) pt-5 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  {data.highlights.map((highlight) => (
                    <div key={highlight.id} className="flex flex-col gap-2">
                      <Icon name={highlight.icon} className="size-5 text-(--color-primary)" aria-hidden />
                      <dt className="text-sm font-semibold text-(--color-foreground)">{highlight.label}</dt>
                      <dd className="text-sm text-(--color-foreground-muted)">{highlight.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {data.buttons && data.buttons.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-4">
                  {data.buttons.map((button) => (
                    <Button key={button.url} asChild variant={button.variant ?? "primary"} size="lg">
                      <AppLink href={button.url}>{button.label}</AppLink>
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </FadeIn>
        </Grid>
      </Container>
    </Section>
  );
}
