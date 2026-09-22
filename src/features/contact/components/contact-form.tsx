"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "subject" | "message";
type Fields = Record<FieldName, string>;
type SubmitStatus = "idle" | "sending" | "sent";

const EMPTY_FIELDS: Fields = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "That doesn't look like a valid email.";
  if (!fields.subject.trim()) errors.subject = "Please enter a subject.";
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = "Tell us a little more (at least 10 characters).";
  }
  return errors;
}

/** No contact-form endpoint exists yet - this confirms the client-side flow
 * end to end (validation, submit state, success confirmation), the same
 * "working in spirit" pattern used by the footer newsletter form and the
 * homepage contact section. Wiring a real mail/ticketing endpoint later only
 * touches `handleSubmit`. */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

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
      setTouched({ name: true, email: true, subject: true, message: true });
      setFormError("Please fix the highlighted fields above.");
      return;
    }

    setFormError(null);
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
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
      <div className="flex flex-col items-center justify-center gap-4 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface) py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-100) text-(--color-secondary)">
          <Icon name="badge-check" className="size-6" />
        </span>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium text-(--color-foreground)">Message received</p>
          <p className="max-w-sm text-sm text-(--color-foreground-muted)">
            Thanks for reaching out - a member of our team will reply within 1 business day.
          </p>
        </div>
        <button type="button" onClick={handleReset} className="text-sm font-medium text-(--color-secondary) hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {formError ? <p className="text-sm text-(--color-destructive)">{formError}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-page-name">Your Name</Label>
          <Input
            id="contact-page-name"
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            onBlur={() => markTouched("name")}
            className={cn(touched.name && errors.name && "border-(--color-destructive)")}
          />
          {touched.name && errors.name ? <p className="text-xs text-(--color-destructive)">{errors.name}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-page-email">Your Email</Label>
          <Input
            id="contact-page-email"
            type="email"
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => markTouched("email")}
            className={cn(touched.email && errors.email && "border-(--color-destructive)")}
          />
          {touched.email && errors.email ? <p className="text-xs text-(--color-destructive)">{errors.email}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-page-subject">Subject</Label>
        <Input
          id="contact-page-subject"
          value={fields.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          onBlur={() => markTouched("subject")}
          className={cn(touched.subject && errors.subject && "border-(--color-destructive)")}
        />
        {touched.subject && errors.subject ? (
          <p className="text-xs text-(--color-destructive)">{errors.subject}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-page-message">Your Message</Label>
        <Textarea
          id="contact-page-message"
          rows={6}
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
        className="mt-2 h-12 w-fit bg-(--color-secondary) px-8 hover:bg-(--color-secondary) hover:opacity-90"
      >
        {status === "sending" ? (
          <>
            <Icon name="loader-2" className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Now"
        )}
      </Button>
    </form>
  );
}
