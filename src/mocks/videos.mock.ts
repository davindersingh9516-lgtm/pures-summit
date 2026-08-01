import type { FeaturedVideo } from "@/types";

/**
 * MOCK DATA - stands in for a "Videos" CPT/media field surfaced through
 * WPGraphQL. `asset.url` points at a not-yet-uploaded file (no real backend
 * exists yet); every video renderer must treat `poster` as the primary,
 * always-correct visual and only attempt playback on explicit interaction.
 */
export const mockVideos: FeaturedVideo[] = [
  {
    id: "video-harvest-story",
    title: "A Season in Northland",
    description: "Follow our apiary partners through a single harvest, from hive to jar.",
    asset: {
      id: "video-harvest-story-asset",
      url: "/mocks/videos/harvest-story.mp4",
      poster: { id: "video-harvest-story-poster", url: "/mocks/hero-1.svg", altText: "Beekeeper at work in a Northland apiary" },
      caption: "A Season in Northland - behind the harvest",
    },
  },
];
