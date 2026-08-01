"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { NewsletterSignup } from "@/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/forms";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/use-translations";
import { toast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm({ newsletter }: { newsletter: NewsletterSignup }) {
  const t = useTranslations();
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  if (!newsletter.enabled) return null;

  function onSubmit(values: NewsletterValues) {
    // No backend endpoint exists yet (no WordPress form handler wired up).
    // Confirms the client-side flow works end to end; wiring the real
    // subscribe mutation later only touches this function body.
    toast({ title: "Subscribed", description: `We'll be in touch at ${values.email}.` });
    form.reset();
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="font-(family-name:--font-display) text-lg text-(--color-foreground)">{newsletter.title}</p>
        {newsletter.description && (
          <p className="mt-1 text-sm text-(--color-foreground-muted)">{newsletter.description}</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input type="email" placeholder={t("newsletterEmailPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-[#12291d] hover:bg-[#12291d] hover:opacity-90"
          >
            {t("newsletterSubmit")}
          </Button>
        </form>
      </Form>

      {newsletter.consentText && (
        <p className="text-xs text-(--color-foreground-muted)">{newsletter.consentText}</p>
      )}
    </div>
  );
}
