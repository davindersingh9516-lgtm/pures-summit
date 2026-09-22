import type { SVGProps } from "react";

/**
 * Build credit for the site's designer/developer, linking straight through to
 * WhatsApp. Deliberately hard-coded rather than driven from the footer CMS
 * data, so it is part of the build itself and not an editable footer row.
 *
 * Kept visually quiet - it sits on the last strip of the footer below the
 * copyright line and should read as a signature, not a promotion.
 */
const CREDIT_NAME = "Davinder Singh";

/** International format, digits only - what wa.me expects (no +, no spaces). */
const WHATSAPP_NUMBER = "919501692921";

const WHATSAPP_MESSAGE = "Hi Davinder, I came across a site you built and would like to talk about a project.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Lucide dropped brand marks for trademark reasons, and the registry in
 * `components/icons/social-icons.tsx` is typed to the platforms the store
 * actually links to - so this glyph lives with the one component using it. */
function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.2 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.8-.7-1.3-1.5-1.4-1.8-.2-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5s0-.3-.1-.4c0-.2-.6-1.4-.8-1.9-.2-.4-.4-.4-.6-.4h-.2Z" />
    </svg>
  );
}

export function SiteCredit() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Designed and developed by ${CREDIT_NAME} - message on WhatsApp`}
      className="group inline-flex items-center gap-1.5 text-xs text-(--color-foreground-muted)/70 transition-colors duration-(--duration-fast) hover:text-(--color-foreground)"
    >
      <span>
        Designed &amp; developed by <span className="font-medium">{CREDIT_NAME}</span>
      </span>
      <WhatsAppIcon className="size-3.5 shrink-0 opacity-60 transition-opacity duration-(--duration-fast) group-hover:opacity-100" />
    </a>
  );
}
