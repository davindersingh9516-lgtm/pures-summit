import type { Metadata } from "next";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { createMockSEO } from "@/mocks/seo.mock";
import { getFooter, getSettings } from "@/services";
import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactInfoPanel } from "@/features/contact/components/contact-info-panel";
import { ContactTrustRow } from "@/features/contact/components/contact-trust-row";

function getContactSEO() {
  return createMockSEO({
    path: "/contact",
    title: "Contact Us | Pure Summit",
    description: "Questions about an order, a batch, or stocking Pure Summit in your store - get in touch with our team.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getContactSEO());
}

export default async function ContactPage() {
  const [settings, footer] = await Promise.all([getSettings(), getFooter()]);

  return (
    <>
      <JsonLd graph={getContactSEO().jsonLd} />

      <Section spacing="sm" className="border-b border-(--color-border) bg-(--color-secondary-50)">
        <Container size="full" className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Contact" }]} />
          <div className="flex flex-col gap-3">
            <h1 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              Contact Us
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground-muted)">
              Questions about an order, a batch, or stocking Pure Summit in your store - we&apos;d love to hear from
              you.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full">
          <ContactTrustRow />

          <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfoPanel contact={settings.contact} socialLinks={footer.socialLinks} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
