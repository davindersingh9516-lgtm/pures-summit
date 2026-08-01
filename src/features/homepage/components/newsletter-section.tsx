"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { NewsletterSectionData, NewsletterSignup } from "@/types";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/forms";
import { FadeIn } from "@/components/animations";
import { useTranslations } from "@/hooks/use-translations";
import { toast } from "@/hooks/use-toast";
import { getHomepageNewsletter } from "@/services";

const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterSection({
  data,
  newsletter,
}: {
  data: NewsletterSectionData;
  newsletter: NewsletterSignup;
}) {
  const t = useTranslations();
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: NewsletterValues) {
    // No backend endpoint exists yet (no WordPress form handler wired up).
    // Confirms the client-side flow works end to end; wiring the real
    // subscribe mutation later only touches this function body.
    toast({ title: "Subscribed", description: `We'll be in touch at ${values.email}.` });
    form.reset();
  }

  return (
    <Section spacing="lg" className="bg-(--color-surface)" data-section-id={data.id}>
      <Container size="content">
        <FadeIn className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <div>
            <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {newsletter.title}
            </h2>
            {newsletter.description && (
              <p className="mt-4 text-base text-(--color-foreground-muted)">{newsletter.description}</p>
            )}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-center"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 text-left sm:max-w-sm">
                    <FormControl>
                      <Input type="email" placeholder={t("newsletterEmailPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {t("newsletterSubmit")}
              </Button>
            </form>
          </Form>

          {newsletter.consentText && (
            <p className="text-xs text-(--color-foreground-muted)">{newsletter.consentText}</p>
          )}
        </FadeIn>
      </Container>
    </Section>
  );
}

export async function NewsletterSectionResolver({ data }: { data: NewsletterSectionData }) {
  const newsletter = await getHomepageNewsletter();

  if (!newsletter.enabled) return null;

  return <NewsletterSection data={data} newsletter={newsletter} />;
}
