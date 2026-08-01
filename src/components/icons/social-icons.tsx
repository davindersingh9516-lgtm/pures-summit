import type { SVGProps } from "react";
import type { SocialLink } from "@/types";

/**
 * Lucide dropped brand/logo icons some releases ago (trademark reasons),
 * so social platform marks are hand-drawn minimal glyphs here instead of
 * pulled from the generic icon registry in `components/icons/index.tsx`.
 */
type SocialIconProps = SVGProps<SVGSVGElement>;

function FacebookIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function YoutubeIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...props}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c0 2.2 1.8 4 4 4" />
    </svg>
  );
}

function LinkedInIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="8" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 11.5v5" />
      <path d="M12 16.5v-3a2 2 0 0 1 4 0v3" />
      <path d="M12 13.5v3" />
    </svg>
  );
}

function PinterestIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 17c1-3 1.5-5 1.5-7a2 2 0 1 1 4 0c0 2-1 4-3 4s-2.5-1.5-2.5-3" />
    </svg>
  );
}

const socialIconByPlatform: Record<SocialLink["platform"], (props: SocialIconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
  linkedin: LinkedInIcon,
  pinterest: PinterestIcon,
};

export function SocialIcon({ platform, ...props }: { platform: SocialLink["platform"] } & SocialIconProps) {
  const IconComponent = socialIconByPlatform[platform];
  return <IconComponent {...props} />;
}
