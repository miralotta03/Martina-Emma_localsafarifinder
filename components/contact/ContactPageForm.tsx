"use client";

import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { contactPageContent } from "@/content/kontakt";
import { contactSchema } from "@/lib/contact/schema";
import { collectFieldErrors, focusFirstInvalid } from "@/lib/forms";
import { t } from "@/lib/i18n";
import {
  errorClass,
  fieldClass,
  labelClass,
  submitClass,
} from "@/components/forms/formStyles";
import { MailIcon } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

// Samma validering, felmeddelanden och POST-flöde som företagens
// kontaktformulär (components/company/ContactForm.tsx), men till /api/contact.
export function ContactPageForm() {
  const { form: text } = contactPageContent;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = contactSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    });

    if (!result.success) {
      // Felen måste synas i DOM:en innan fokus kan flyttas till första fältet.
      flushSync(() => {
        setErrors(collectFieldErrors(result.error));
        setStatus("error");
      });
      focusFirstInvalid(form);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (field: string) =>
    errors[field] ? `${id}-${field}-error` : undefined;
  const fieldError = (field: string) =>
    errors[field] && (
      <p id={`${id}-${field}-error`} className={errorClass}>
        {errors[field]}
      </p>
    );

  return (
    <div className="rounded-2xl bg-cream-dark/60 p-5 shadow-md sm:p-8">
      {status === "success" ? (
        <p
          role="status"
          className="py-6 text-center font-serif text-xl text-forest"
        >
          {t(text.success)}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {status === "error" && Object.keys(errors).length === 0 && (
            <p role="alert" className={errorClass}>
              {t(text.error)}
            </p>
          )}

          {/* Honeypot: dold för människor, ifylls bara av botar. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor={`${id}-website`}>Website</label>
            <input
              id={`${id}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <label htmlFor={`${id}-name`} className={labelClass}>
                {t(text.name.label)}
              </label>
              <input
                id={`${id}-name`}
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={t(text.name.placeholder)}
                className={`mt-2 ${fieldClass}`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy("name")}
              />
              {fieldError("name")}
            </div>

            <div>
              <label htmlFor={`${id}-email`} className={labelClass}>
                {t(text.email.label)}
              </label>
              <div className="relative mt-2">
                <MailIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink/50" />
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t(text.email.placeholder)}
                  className={`${fieldClass} pl-11`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy("email")}
                />
              </div>
              {fieldError("email")}
            </div>
          </div>

          <div>
            <label htmlFor={`${id}-message`} className={labelClass}>
              {t(text.message.label)}
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={4}
              required
              placeholder={t(text.message.placeholder)}
              className={`mt-2 ${fieldClass}`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
            />
            {fieldError("message")}
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 shrink-0 rounded border-forest/30 accent-forest"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy("consent")}
              />
              <span>
                {t(text.consent.before)}
                <Link href="/integritetspolicy" className="underline">
                  {t(text.consent.link)}
                </Link>
                {t(text.consent.after)}
              </span>
            </label>
            {fieldError("consent")}
          </div>

          <div className="flex sm:justify-end">
            <button
              type="submit"
              disabled={status === "submitting"}
              className={`w-full px-8 sm:w-auto ${submitClass}`}
            >
              {t(status === "submitting" ? text.submitting : text.submit)}
            </button>
          </div>

          <p className="text-center text-sm">
            <Link href="/integritetspolicy" className="underline">
              {t(text.privacyPolicy)}
            </Link>{" "}
            |{" "}
            <Link href="/anvandarvillkor" className="underline">
              {t(text.terms)}
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
