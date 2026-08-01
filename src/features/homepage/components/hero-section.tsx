"use client";

import Image from "next/image";
import { ChevronDown, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { HeroSectionData } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { RatingStars } from "@/components/global/rating-stars";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";
import { TransparentHeroBoundary } from "@/contexts/header-appearance-context";
import { cn } from "@/lib/utils";

const overlayClassName = {
  // Literal black (not the brand's warm --color-neutral-950) - matching the
  // reference exactly here matters more than the warm palette, since this
  // scrim sits directly over video footage, not brand-colored chrome.
  dark: "bg-gradient-to-b from-black/65 via-black/25 to-black/75",
  light: "bg-gradient-to-b from-white/65 via-white/25 to-white/75",
  none: "",
} as const;

/**
 * Primary full-viewport landing hero. When `data.video` is present it plays
 * as a muted, looping background (poster shown until the first frame
 * decodes, and again if playback ever fails); otherwise `data.media` alone
 * is the background. `TransparentHeroBoundary` tells the sticky header to
 * render transparent for as long as this section is mounted.
 */
export function HeroSection({ data }: { data: HeroSectionData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = () => {
      void video.play().catch(() => setPlaying(false));
    };
    start();

    const onEnded = () => {
      video.currentTime = 0;
      start();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible" && video.paused) start();
    };

    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) void video.play().catch(() => undefined);
  };

  const overlay = data.overlay ?? (data.video ? "dark" : "none");

  return (
    <section className="relative isolate h-svh w-full overflow-hidden bg-black">
      <TransparentHeroBoundary />

      {data.video ? (
        <video
          ref={videoRef}
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
          onPlaying={() => {
            setVideoReady(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          aria-hidden
          tabIndex={-1}
        />
      ) : (
        <Image src={data.media.url} alt={data.media.altText} fill priority sizes="100vw" className="object-cover" />
      )}

      {data.video && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
            videoReady ? "opacity-0" : "opacity-100",
          )}
          style={{ backgroundImage: `url(${data.video.poster?.url ?? data.media.url})` }}
        />
      )}

      {overlay !== "none" && <div aria-hidden className={cn("absolute inset-0", overlayClassName[overlay])} />}

      {/* Covers a small generator watermark baked into the source footage
          itself (bottom-right, consistent across the whole loop) - there's
          no way to remove it from the video pixels, so it's masked here
          instead, on every device, regardless of viewport size. */}
      {data.video && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-[8%] h-[16%] w-[14%] bg-black/55 blur-2xl"
        />
      )}

      <div className="relative flex size-full flex-col">
        <div className="flex flex-1 items-center">
          <Container size="full" className="w-full pt-20">
            <FadeIn className="max-w-3xl">
              <div className="flex flex-col items-start gap-6 text-(--color-neutral-0)">
                {data.eyebrow && (
                  <span className="inline-flex items-center rounded-(--radius-full) border border-(--color-neutral-0)/25 bg-(--color-neutral-0)/10 px-3 py-1 text-xs font-medium tracking-(--tracking-widest) uppercase backdrop-blur-sm">
                    {data.eyebrow}
                  </span>
                )}

                {/* The homepage's only <h1> - HeroSection is always the
                    first section on the homepage, so its heading IS the
                    page title. */}
                <h1 className="font-(family-name:--font-display) text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  {data.heading}
                </h1>

                {data.subheading && (
                  <p className="max-w-2xl text-lg font-normal text-(--color-neutral-0)/90 sm:text-xl">
                    {data.subheading}
                  </p>
                )}

                {data.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {data.buttons.map((button) => (
                      <Button
                        key={button.label}
                        asChild
                        size="lg"
                        variant={button.variant ?? "primary"}
                        className={cn(
                          button.variant === "secondary" &&
                            "border border-(--color-neutral-0)/30 bg-(--color-neutral-0)/10 text-(--color-neutral-0) backdrop-blur-sm hover:bg-(--color-neutral-0)/20",
                        )}
                      >
                        <AppLink href={button.url}>{button.label}</AppLink>
                      </Button>
                    ))}
                  </div>
                )}

                {data.rating && (
                  <div className="flex items-center gap-2 pt-1">
                    <RatingStars value={data.rating.value} showCount={false} />
                    <span className="text-sm text-(--color-neutral-0)/70">({data.rating.count} reviews)</span>
                  </div>
                )}

                {data.trustBadges && data.trustBadges.length > 0 && (
                  <dl className="grid max-w-2xl grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
                    {data.trustBadges.map((badge) => (
                      <div key={badge.id} className="flex flex-col gap-1">
                        <Icon name={badge.icon} className="size-5 text-(--color-neutral-0)" aria-hidden />
                        <dt className="text-base font-semibold text-(--color-neutral-0)">{badge.label}</dt>
                        {badge.description && (
                          <dd className="text-sm leading-relaxed text-(--color-neutral-0)/80">{badge.description}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </FadeIn>
          </Container>
        </div>

        <Container size="full" className="flex w-full flex-wrap items-end justify-between gap-y-3 gap-x-4 pb-8">
          {data.scrollToId ? (
            <a
              href={`#${data.scrollToId}`}
              className="group flex items-center gap-2 rounded-(--radius-full) border border-(--color-neutral-0)/25 bg-(--color-neutral-0)/10 px-4 py-2 text-xs font-medium text-(--color-neutral-0) backdrop-blur-sm transition-colors hover:bg-(--color-neutral-0)/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-neutral-0)/40"
            >
              <span className="hidden sm:inline">Scroll to explore</span>
              <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          ) : (
            <span />
          )}

          {data.video && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause the background video" : "Play the background video"}
                className="flex size-10 items-center justify-center rounded-(--radius-full) border border-(--color-neutral-0)/25 bg-(--color-neutral-0)/10 text-(--color-neutral-0) backdrop-blur-sm transition-colors hover:bg-(--color-neutral-0)/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-neutral-0)/40"
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              </button>
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Unmute the background video" : "Mute the background video"}
                className="flex size-10 items-center justify-center rounded-(--radius-full) border border-(--color-neutral-0)/25 bg-(--color-neutral-0)/10 text-(--color-neutral-0) backdrop-blur-sm transition-colors hover:bg-(--color-neutral-0)/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-neutral-0)/40"
              >
                {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}
