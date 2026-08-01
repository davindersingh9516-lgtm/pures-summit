import Image from "next/image";
import type { Image as ImageType } from "@/types";
import { AppLink } from "./app-link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  image: ImageType;
  href?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders whatever logo image `SiteSettings`/`HeaderData` provides - never
 * a hardcoded wordmark or file path. `logoDark` (if the backend supplies
 * one) is layered on top and shown only in dark mode via CSS, so no
 * client-side theme check is needed here.
 */
export function Logo({ image, href = "/", className, priority = false }: LogoProps) {
  return (
    <AppLink href={href} aria-label="Homepage" className={cn("inline-flex items-center", className)}>
      <Image
        src={image.url}
        alt={image.altText}
        width={image.width ?? 140}
        height={image.height ?? 36}
        priority={priority}
        className="h-11 w-auto object-contain"
      />
    </AppLink>
  );
}
