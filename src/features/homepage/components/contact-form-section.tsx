"use client";

import { useState, type FormEvent } from "react";
import { FadeIn } from "@/components/animations";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ContactFormSectionData } from "@/types";

type FieldName = "name" | "email" | "topic" | "message";
type Fields = Record<FieldName, string>;
type SubmitStatus = "idle" | "sending" | "sent";

const EMPTY_FIELDS: Fields = { name: "", email: "", topic: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "That doesn't look like a valid email.";
  if (!fields.topic) errors.topic = "Please choose a topic.";
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = "Tell us a little more (at least 10 characters).";
  }
  return errors;
}

function ContactFormPanel({ data }: { data: ContactFormSectionData }) {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");

  const errors = validate(fields);

  function updateField(field: FieldName, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }));
  }

  function markTouched(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentErrors = validate(fields);
    if (Object.keys(currentErrors).length > 0) {
      setTouched({ name: true, email: true, topic: true, message: true });
      setFormError("Please fix the highlighted fields above.");
      return;
    }

    setFormError(null);
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSentTo(fields.email.trim());
    setStatus("sent");
  }

  function handleReset() {
    setFields(EMPTY_FIELDS);
    setTouched({});
    setFormError(null);
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-100) text-[#12291d]">
          <Icon name="badge-check" className="size-6" />
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium text-(--color-foreground)">Message received</p>
          <p className="max-w-sm text-sm text-(--color-foreground-muted)">
            We&apos;ll reply to {sentTo} within 1 business day.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="-mx-1 -my-2 px-1 py-2 text-sm font-medium text-[#12291d] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {formError ? <p className="text-sm text-(--color-destructive)">{formError}</p> : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          onBlur={() => markTouched("name")}
          className={cn(touched.name && errors.name && "border-(--color-destructive)")}
        />
        {touched.name && errors.name ? <p className="text-xs text-(--color-destructive)">{errors.name}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={() => markTouched("email")}
          className={cn(touched.email && errors.email && "border-(--color-destructive)")}
        />
        {touched.email && errors.email ? <p className="text-xs text-(--color-destructive)">{errors.email}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-topic">Topic</Label>
        <Select
          value={fields.topic}
          onValueChange={(value) => {
            updateField("topic", value);
            markTouched("topic");
          }}
        >
          <SelectTrigger
            id="contact-topic"
            className={cn(touched.topic && errors.topic && "border-(--color-destructive)")}
          >
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {data.topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched.topic && errors.topic ? <p className="text-xs text-(--color-destructive)">{errors.topic}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={4}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          onBlur={() => markTouched("message")}
          className={cn(touched.message && errors.message && "border-(--color-destructive)")}
        />
        {touched.message && errors.message ? (
          <p className="text-xs text-(--color-destructive)">{errors.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 bg-[#12291d] hover:bg-[#12291d] hover:opacity-90"
      >
        {status === "sending" ? (
          <>
            <Icon name="loader-2" className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Icon name="send" className="size-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

function TrustPanel({ data }: { data: ContactFormSectionData }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#12291d] p-8 text-(--color-neutral-0) sm:p-10 lg:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 100% 100%, transparent 0, transparent 46px, #ffffff 47px, #ffffff 48px)",
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <p className="text-lg font-medium text-(--color-neutral-0)">{data.responseTimeNote}</p>

        <dl className="mt-8 flex flex-col gap-5 text-sm text-(--color-neutral-0)/85">
          <div className="flex items-center gap-3">
            <Icon name="clock" className="size-4 shrink-0 text-(--color-neutral-0)/55" />
            <dd>{data.hours}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="mail" className="size-4 shrink-0 text-(--color-neutral-0)/55" />
            <dd>
              <a href={`mailto:${data.email}`} className="hover:underline">
                {data.email}
              </a>
            </dd>
          </div>
          {data.phone ? (
            <div className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-(--color-neutral-0)/55" />
              <dd className="flex flex-col gap-0.5">
                <a href={`tel:${data.phone}`} className="hover:underline">
                  {data.phone}
                </a>
                {data.phoneNote ? <span className="text-xs text-(--color-neutral-0)/50">{data.phoneNote}</span> : null}
              </dd>
            </div>
          ) : null}
        </dl>

        {data.trustBadges && data.trustBadges.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t border-(--color-neutral-0)/15 pt-8">
            {data.trustBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-2 text-xs text-(--color-neutral-0)/70">
                <Icon name={badge.icon} className="size-4" />
                {badge.label}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Homepage-embedded "Contact Us" - a working-in-spirit form (name, email,
 * topic, message) paired with a trust panel (response-time expectation,
 * hours, direct email, trade phone line, certification badges). Submission
 * is a mock confirmation (no real backend) - the success state says exactly
 * that ("message received") rather than implying delivery to a real inbox.
 */
export function ContactFormSection({ data }: { data: ContactFormSectionData }) {
  return (
    <Section spacing="md">
      <Container size="full">
        <FadeIn>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            {data.eyebrow ? (
              <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                {data.eyebrow}
              </span>
            ) : null}
            <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {data.heading}
            </h2>
            {data.subheading ? (
              <p className="text-base leading-relaxed text-(--color-foreground-muted)">{data.subheading}</p>
            ) : null}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 overflow-hidden rounded-(--radius-xl) border border-(--color-border)">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="bg-(--color-surface-raised) p-8 sm:p-10 md:col-span-2">
              <ContactFormPanel data={data} />
            </div>
            <div className="md:col-span-3">
              <TrustPanel data={data} />
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
