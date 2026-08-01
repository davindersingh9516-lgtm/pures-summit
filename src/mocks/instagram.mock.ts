import type { InstagramPost } from "@/types";

/**
 * MOCK DATA - stands in for the Instagram Graph API feed (fetched
 * server-side and cached, not embedded via a client widget).
 */
export const mockInstagramPosts: InstagramPost[] = [
  { id: "ig-1", image: { id: "ig-1-img", url: "/mocks/instagram-1.svg", altText: "Manuka honey jar styled shot" }, caption: "Golden hour, golden honey.", permalink: "https://instagram.com/p/1", likeCount: 482 },
  { id: "ig-2", image: { id: "ig-2-img", url: "/mocks/instagram-2.svg", altText: "Beekeeper checking hive frame" }, caption: "Checking on the hives this week.", permalink: "https://instagram.com/p/2", likeCount: 356 },
  { id: "ig-3", image: { id: "ig-3-img", url: "/mocks/instagram-3.svg", altText: "Honeycomb close-up" }, caption: "Straight from the comb.", permalink: "https://instagram.com/p/3", likeCount: 601 },
  { id: "ig-4", image: { id: "ig-4-img", url: "/mocks/instagram-4.svg", altText: "Manuka flowers in bloom" }, caption: "Manuka in full bloom.", permalink: "https://instagram.com/p/4", likeCount: 274 },
  { id: "ig-5", image: { id: "ig-5-img", url: "/mocks/instagram-5.svg", altText: "Gift set unboxing" }, caption: "Unboxing the Discovery Set.", permalink: "https://instagram.com/p/5", likeCount: 398 },
  { id: "ig-6", image: { id: "ig-6-img", url: "/mocks/instagram-6.svg", altText: "Jar of raw honey on wood table" }, caption: "Raw, unpasteurized, unforgettable.", permalink: "https://instagram.com/p/6", likeCount: 512 },
];
