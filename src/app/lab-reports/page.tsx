import type { Metadata } from "next";
import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { createMockSEO } from "@/mocks/seo.mock";
import { getCertificates, getPage } from "@/services";

function getLabReportsFallbackSEO() {
  return createMockSEO({
    path: "/lab-reports",
    title: "Lab Reports & Certifications | Pure Summit",
    description: "How every batch of Pure Summit Manuka honey is independently lab-tested, certified, and traced back to its harvest region.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("lab-reports");
  return buildMetadata(page?.seo ?? getLabReportsFallbackSEO());
}

const VERIFICATION_STEPS = [
  {
    icon: "flask-conical" as const,
    title: "Independent lab testing",
    description:
      "Every batch is sampled and sent to an accredited, independent laboratory - never tested only in-house - for MGO and authenticity marker analysis.",
  },
  {
    icon: "badge-check" as const,
    title: "MGO verification",
    description:
      "Results are checked against the MGO 263+ threshold before any grade is approved and printed on a jar - a batch that misses it doesn't ship under that grade.",
  },
  {
    icon: "map-pin" as const,
    title: "Batch traceability",
    description:
      "Each jar carries a batch code linking it back to its harvest region and test date, so any claim on the label can be independently checked.",
  },
];

export default async function LabReportsPage() {
  const certificates = await getCertificates();

  return (
    <>
      <Section spacing="sm" className="border-b border-(--color-border) bg-(--color-secondary-50)">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Lab Reports & Certifications" }]} />
          <h1 className="max-w-2xl font-(family-name:--font-display) text-4xl text-(--color-foreground) sm:text-5xl">
            Lab Reports & Certifications
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground-muted)">
            Every jar of Pure Summit honey is independently lab-tested and traceable back to its harvest batch.
            Here&apos;s what that verification actually involves, and the certifications behind it.
          </p>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {VERIFICATION_STEPS.map((step) => (
              <div key={step.title} className="flex flex-col items-start gap-3 rounded-(--radius-xl) border border-(--color-border) p-6">
                <span className="flex size-11 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-50) text-(--color-secondary)">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <p className="text-base font-semibold text-(--color-foreground)">{step.title}</p>
                <p className="text-sm leading-relaxed text-(--color-foreground-muted)">{step.description}</p>
              </div>
            ))}
          </div>

          {certificates.length > 0 ? (
            <div className="mt-16">
              <h2 className="font-(family-name:--font-display) text-2xl text-(--color-foreground)">Certifications</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="flex items-center gap-4 rounded-(--radius-xl) border border-(--color-border) p-6"
                  >
                    <Image
                      src={certificate.image.url}
                      alt={certificate.image.altText}
                      width={56}
                      height={56}
                      className="size-14 shrink-0 object-contain"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold text-(--color-foreground)">{certificate.name}</p>
                      {certificate.description ? (
                        <p className="text-sm text-(--color-foreground-muted)">{certificate.description}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 flex flex-col items-start gap-3 rounded-(--radius-xl) bg-(--color-secondary-50) p-8">
            <p className="font-(family-name:--font-display) text-xl text-(--color-foreground)">
              Want the full story behind a batch?
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-(--color-foreground-muted)">
              Read how we trace every jar from hive to shelf, or look up a specific batch code from your own jar.
            </p>
            <AppLink
              href="/blog/how-we-verify-every-batch"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-secondary) hover:underline"
            >
              How we verify every batch
              <Icon name="arrow-right" className="size-4" />
            </AppLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
