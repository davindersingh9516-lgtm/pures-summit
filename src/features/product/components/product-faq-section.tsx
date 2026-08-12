import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AppLink } from "@/components/global/app-link";
import { getFAQs } from "@/services";

/** No per-product FAQ model exists yet - reuses the site-wide FAQ list
 * filtered to the "Product" category, which is genuinely relevant to any
 * product detail page rather than one specific SKU. */
export async function ProductFAQSection() {
  const allFaqs = await getFAQs();
  const faqs = allFaqs.filter((faq) => faq.category === "Product").slice(0, 4);

  if (faqs.length === 0) return null;

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
          Got Questions?
        </span>
        <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground)">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-8">
        <Accordion type="single" collapsible className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-center text-sm text-(--color-foreground-muted)">
          Still have questions about this product?{" "}
          <AppLink href="/contact" className="font-medium text-[#12291d] hover:underline">
            Contact our team →
          </AppLink>
        </p>
      </div>
    </div>
  );
}
