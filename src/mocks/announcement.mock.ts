import type { AnnouncementBarData } from "@/types";

/**
 * MOCK DATA - stands in for an ACF Options Page "Announcement Bar" field
 * group (repeater of items, each with an optional publish window).
 */
export const mockAnnouncementBarData: AnnouncementBarData = {
  enabled: false,
  dismissible: true,
  autoRotateSeconds: 6,
  items: [
    {
      id: "announcement-shipping",
      message: "Free shipping across New Zealand on orders over $100",
      icon: "truck",
    },
    {
      id: "announcement-harvest",
      message: "New season harvest now available",
      icon: "sparkles",
      url: "/shop/category/raw-manuka-honey",
      ctaLabel: "Shop Now",
    },
    {
      id: "announcement-packs",
      message: "Save up to $19.80 on multi-jar value packs",
      icon: "gift",
      url: "/shop/category/value-packs",
      ctaLabel: "View Value Packs",
    },
  ],
};
