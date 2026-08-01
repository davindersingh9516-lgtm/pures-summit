import type { SocialLink } from "@/types";
import { SocialIcon } from "@/components/icons/social-icons";
import { AppLink } from "./app-link";
import { cn } from "@/lib/utils";

export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map((link) => (
        <li key={link.id}>
          <AppLink
            href={link.url}
            aria-label={link.label}
            className="flex size-9 items-center justify-center rounded-(--radius-full) border border-(--color-border) text-(--color-foreground-muted) transition-colors hover:border-(--color-border-strong) hover:text-(--color-foreground)"
          >
            <SocialIcon platform={link.platform} className="size-4" />
          </AppLink>
        </li>
      ))}
    </ul>
  );
}
