import Image from "next/image";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import type { BreadcrumbItem, Image as ImageType } from "@/types";

export function ShopHeaderBanner({
  breadcrumbItems,
  heading,
  description,
  image,
}: {
  breadcrumbItems: BreadcrumbItem[];
  heading: string;
  description?: string;
  image?: ImageType;
}) {
  return (
    <div className="border-b border-(--color-border) bg-(--color-secondary-50)">
      <Container
        size="full"
        className="flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14"
      >
        <div className="flex flex-col gap-4">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex flex-col gap-3">
            <h1 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {heading}
            </h1>
            {description ? (
              <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground-muted)">{description}</p>
            ) : null}
          </div>
        </div>

        {image ? (
          <div className="relative hidden h-40 w-56 shrink-0 overflow-hidden rounded-(--radius-xl) sm:block">
            <Image src={image.url} alt={image.altText} fill sizes="224px" className="object-cover" />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
