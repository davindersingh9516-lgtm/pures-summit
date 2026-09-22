import type { IconName } from "lucide-react/dynamic";
import type {
  Certificate,
  CertificationBadge,
  FAQCategory,
  FAQItem,
  NewsletterSignup,
  SocialLink,
  Statistic,
  Testimonial,
  TrustBadge,
} from "@/types";

/**
 * Raw shape of the JSON string returned by the `siteContent` root field
 * (see graphql/queries/site-content.queries.ts). Mirrors what the
 * `pure-summit-site-content.php` mu-plugin seeds - kept as a plain
 * "Raw*" set of interfaces distinct from the mapped domain types below,
 * since the JSON's field names don't always line up 1:1 (e.g. `mediaUrl`/
 * `mediaAlt` vs. the domain `Image` shape).
 */
export interface RawSiteContentHero {
  eyebrow: string;
  heading: string;
  subheading: string;
  mediaUrl: string;
  mediaAlt: string;
}

export interface RawSiteContentTrustBadge {
  id: string;
  icon: string;
  label: string;
  description: string;
}

export interface RawSiteContentTestimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  quote: string;
  rating: number;
  featured?: boolean;
}

export interface RawSiteContentStatistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface RawSiteContentCertificate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface RawSiteContentFAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export interface RawSiteContentNewsletter {
  enabled: boolean;
  title: string;
  description: string;
  consentText: string;
}

export interface RawSiteContentSocialLink {
  id: string;
  platform: SocialLink["platform"];
  url: string;
  label: string;
}

export interface SiteContent {
  hero: RawSiteContentHero;
  trustBadges: RawSiteContentTrustBadge[];
  testimonials: RawSiteContentTestimonial[];
  statistics: RawSiteContentStatistic[];
  certificates: RawSiteContentCertificate[];
  faqs: RawSiteContentFAQ[];
  newsletter: RawSiteContentNewsletter;
  instagramHandle: string;
  socialLinks: RawSiteContentSocialLink[];
}

const EMPTY_SITE_CONTENT: SiteContent = {
  hero: { eyebrow: "", heading: "", subheading: "", mediaUrl: "", mediaAlt: "" },
  trustBadges: [],
  testimonials: [],
  statistics: [],
  certificates: [],
  faqs: [],
  newsletter: { enabled: false, title: "", description: "", consentText: "" },
  instagramHandle: "",
  socialLinks: [],
};

/** Parses the `siteContent` JSON string. Falls back to an empty-but-valid
 * shape (rather than throwing) if the backend ever returns malformed JSON,
 * so one bad mu-plugin deploy degrades sections to "nothing to show"
 * instead of a hard 500 across the whole homepage. */
export function parseSiteContent(raw: string | null | undefined): SiteContent {
  if (!raw) return EMPTY_SITE_CONTENT;
  try {
    // Merged with defaults so a field added to the schema after a response
    // was cached (see Next's fetch `revalidate` window) degrades to empty
    // instead of throwing when a repository maps over it.
    return { ...EMPTY_SITE_CONTENT, ...(JSON.parse(raw) as Partial<SiteContent>) };
  } catch (error) {
    console.error("[graphql] Failed to parse `siteContent` JSON:", error);
    return EMPTY_SITE_CONTENT;
  }
}

export function mapSiteContentTrustBadge(node: RawSiteContentTrustBadge): TrustBadge {
  return { id: node.id, icon: node.icon as IconName, label: node.label, description: node.description };
}

export function mapSiteContentTestimonial(node: RawSiteContentTestimonial): Testimonial {
  return {
    id: node.id,
    authorName: node.authorName,
    authorTitle: node.authorTitle,
    quote: node.quote,
    rating: node.rating,
    featured: node.featured,
  };
}

export function mapSiteContentStatistic(node: RawSiteContentStatistic): Statistic {
  return { id: node.id, value: node.value, suffix: node.suffix, label: node.label };
}

export function mapSiteContentCertificate(node: RawSiteContentCertificate): Certificate {
  return {
    id: node.id,
    name: node.name,
    description: node.description,
    image: { id: `${node.id}-image`, url: node.imageUrl, altText: node.name },
  };
}

export function mapSiteContentFAQ(node: RawSiteContentFAQ): FAQItem {
  return { id: node.id, question: node.question, answer: node.answer, category: node.category };
}

export function mapSiteContentNewsletter(node: RawSiteContentNewsletter): NewsletterSignup {
  return { enabled: node.enabled, title: node.title, description: node.description, consentText: node.consentText };
}

/** Footer's `CertificationBadge` (name/image/caption) differs slightly from
 * the homepage's `Certificate` (name/image/description) - same source data,
 * different field name for the same one-line credibility text. */
export function mapSiteContentCertificationBadge(node: RawSiteContentCertificate): CertificationBadge {
  return {
    id: node.id,
    name: node.name,
    caption: node.description,
    image: { id: `${node.id}-image`, url: node.imageUrl, altText: node.name },
  };
}

export function mapSiteContentSocialLink(node: RawSiteContentSocialLink): SocialLink {
  return { id: node.id, platform: node.platform, url: node.url, label: node.label };
}
