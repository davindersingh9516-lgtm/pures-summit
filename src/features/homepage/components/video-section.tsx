"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getVideos } from "@/services";
import type { FeaturedVideo, VideoSectionData } from "@/types";

/**
 * Editorial video showcase (brand story / harvesting process / lab tour).
 * Split into a client player (`VideoSection`) and a server-side data
 * wrapper (`VideoSectionResolver`) because the play/pause interaction needs
 * local state, but the video itself is a homepage-service-fetched record -
 * the resolver fetches once on the server and hands the already-resolved
 * `FeaturedVideo` down as a plain prop.
 */
export function VideoSection({ data, video }: { data: VideoSectionData; video: FeaturedVideo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const poster = video.asset.poster;
  const hasHeading = Boolean(data.eyebrow || data.heading || data.description);

  return (
    <Section spacing="md">
      <Container>
        {hasHeading ? (
          <FadeIn>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
              {data.eyebrow ? (
                <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                  {data.eyebrow}
                </span>
              ) : null}
              {data.heading ? (
                <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
                  {data.heading}
                </h2>
              ) : null}
              {data.description ? (
                <p className="text-base leading-relaxed text-(--color-foreground-muted)">{data.description}</p>
              ) : null}
            </div>
          </FadeIn>
        ) : null}

        <FadeIn className={hasHeading ? "mt-10" : undefined}>
          <div className="relative aspect-video w-full overflow-hidden rounded-(--radius-lg) bg-(--color-muted)">
            {isPlaying ? (
              <video
                controls
                autoPlay
                src={video.asset.url}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <>
                {poster ? (
                  <Image
                    src={poster.url}
                    alt={poster.altText}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
                >
                  <span className="flex size-16 items-center justify-center rounded-(--radius-full) bg-(--color-surface-raised)/90 shadow-(--shadow-elevation-3) transition-transform duration-(--duration-fast) ease-(--ease-standard) hover:scale-105">
                    <Play className="size-6 fill-current text-(--color-foreground)" />
                  </span>
                </button>
              </>
            )}
          </div>
        </FadeIn>

        {video.asset.caption ? (
          <p className="mt-4 text-center text-sm text-(--color-foreground-muted)">{video.asset.caption}</p>
        ) : null}
      </Container>
    </Section>
  );
}

/** Server-side data wrapper - fetches the featured video list and renders
 * the client player with the first entry, disappearing entirely if none. */
export async function VideoSectionResolver({ data }: { data: VideoSectionData }) {
  const videos = await getVideos();

  if (videos.length === 0) {
    return null;
  }

  return <VideoSection data={data} video={videos[0]} />;
}
