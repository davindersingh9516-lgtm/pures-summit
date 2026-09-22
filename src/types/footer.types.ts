import type { ID, Image, Link } from "./common.types";

export interface FooterColumn {
  id: ID;
  title: string;
  links: Link[];
}

export interface SocialLink {
  id: ID;
  platform:
    | "facebook"
    | "instagram"
    | "twitter"
    | "youtube"
    | "tiktok"
    | "linkedin"
    | "pinterest";
  url: string;
  label: string;
}

export interface PaymentMethodIcon {
  id: ID;
  name: string;
  image: Image;
}

export interface NewsletterSignup {
  enabled: boolean;
  title: string;
  description?: string;
  consentText?: string;
}

/** An image-based certification mark (MGO lab verification, BioGro organic, ...) -
 * distinct from `TrustBadge` (homepage-domain.types.ts), which is the
 * icon+label style badge used in hero/trust-icon sections. */
export interface CertificationBadge {
  id: ID;
  name: string;
  image: Image;
  /** One-line credibility caption shown under the badge name, e.g.
   * "Independent MGO lab test, every batch" - an unlabeled badge reads as
   * decoration, a captioned one reads as an actual certification. */
  caption?: string;
}

export interface FooterData {
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactHours?: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  paymentIcons: PaymentMethodIcon[];
  shippingIcons: PaymentMethodIcon[];
  certifications: CertificationBadge[];
  newsletter: NewsletterSignup;
  copyrightText: string;
  bottomLinks: Link[];
}
