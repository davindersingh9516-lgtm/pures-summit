import { Icon } from "@/components/icons";
import { SocialLinks } from "@/components/global/social-links";
import type { ContactInfo, SocialLink } from "@/types";

export function ContactInfoPanel({ contact, socialLinks }: { contact: ContactInfo; socialLinks: SocialLink[] }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-(family-name:--font-display) text-2xl text-(--color-foreground)">Get In Touch</h2>
        <p className="mt-2 text-sm leading-relaxed text-(--color-foreground-muted)">
          Please enter the details of your request. A member of our team will respond as soon as possible.
        </p>
      </div>

      <dl className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-(--color-foreground-muted)" />
          <div>
            <dt className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Address
            </dt>
            <dd className="text-sm text-(--color-foreground)">{contact.address}</dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-(--color-foreground-muted)" />
          <div>
            <dt className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Email
            </dt>
            <dd>
              <a href={`mailto:${contact.email}`} className="text-sm text-(--color-foreground) hover:text-[#12291d]">
                {contact.email}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-(--color-foreground-muted)" />
          <div>
            <dt className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Call Us
            </dt>
            <dd>
              <a href={`tel:${contact.phone}`} className="text-sm text-(--color-foreground) hover:text-[#12291d]">
                {contact.phone}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-(--color-foreground-muted)" />
          <div>
            <dt className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Opening Hours
            </dt>
            <dd className="text-sm text-(--color-foreground)">{contact.businessHours}</dd>
          </div>
        </div>
      </dl>

      <SocialLinks links={socialLinks} />
    </div>
  );
}
