"use client";

import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { partnerPageContent } from "@/content/for-foretag";
import { partnerSchema } from "@/lib/partner/schema";
import { collectFieldErrors, focusFirstInvalid } from "@/lib/forms";
import { trackEvent } from "@/lib/analytics";
import {
  errorClass,
  fieldClass,
  labelClass,
  submitClass,
} from "@/components/forms/formStyles";

type Status = "idle" | "submitting" | "success" | "error";

type TextField = "companyName" | "contactPerson" | "email" | "companyWebsite";

// Ansökningsformuläret på /for-foretag. Samma validering, felhantering och
// POST-flöde som /kontakta-oss (components/contact/ContactPageForm.tsx), men
// till /api/partner-application och på engelska.
export function PartnerApplicationForm() {
  const { form: text } = partnerPageContent;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (name: string) => String(formData.get(name) ?? "");

    const result = partnerSchema.safeParse({
      companyName: value("companyName"),
      contactPerson: value("contactPerson"),
      email: value("email"),
      companyWebsite: value("companyWebsite"),
      country: value("country"),
      about: value("about"),
      motivation: value("motivation"),
      consent: formData.get("consent") === "on",
      website: value("website"),
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
      const response = await fetch("/api/partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      trackEvent("formular-skickat", { form: "bli-partner" });
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

  const input = (
    field: TextField,
    type: string,
    autoComplete: string,
    required = true,
  ) => (
    <div>
      <label htmlFor={`${id}-${field}`} className={labelClass}>
        {text[field].label}
      </label>
      <input
        id={`${id}-${field}`}
        name={field}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={text[field].placeholder}
        className={`mt-2 ${fieldClass}`}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={describedBy(field)}
      />
      {fieldError(field)}
    </div>
  );

  const textarea = (field: "about" | "motivation", rows: number) => (
    <div>
      <label htmlFor={`${id}-${field}`} className={labelClass}>
        {text[field].label}
      </label>
      <textarea
        id={`${id}-${field}`}
        name={field}
        rows={rows}
        required
        placeholder={text[field].placeholder}
        className={`mt-2 ${fieldClass}`}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={describedBy(field)}
      />
      {fieldError(field)}
    </div>
  );

  return (
    <div className="rounded-2xl bg-cream-dark/60 p-5 shadow-md sm:p-8">
      {status === "success" ? (
        <p
          role="status"
          className="py-6 text-center font-serif text-xl text-forest"
        >
          {text.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {status === "error" && Object.keys(errors).length === 0 && (
            <p role="alert" className={errorClass}>
              {text.error}
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
            {input("companyName", "text", "organization")}
            {input("contactPerson", "text", "name")}
            {input("email", "email", "email")}
            {input("companyWebsite", "url", "url", false)}
          </div>

          <div>
            <label htmlFor={`${id}-country`} className={labelClass}>
              {text.country.label}
            </label>
            <input
              id={`${id}-country`}
              name="country"
              type="text"
              required
              autoComplete="country-name"
              placeholder={text.country.placeholder}
              className={`mt-2 ${fieldClass}`}
              aria-invalid={Boolean(errors.country)}
              aria-describedby={describedBy("country")}
            />
            {fieldError("country")}
          </div>

          {textarea("about", 6)}
          {textarea("motivation", 4)}

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
                {text.consent.before}
                <Link href="/integritetspolicy" className="underline">
                  {text.consent.privacyLink}
                </Link>
                {text.consent.between}
                <Link href="/anvandarvillkor" className="underline">
                  {text.consent.termsLink}
                </Link>
                {text.consent.after}
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
              {status === "submitting" ? text.submitting : text.submit}
            </button>
          </div>

          <p className="text-center text-sm">
            <Link href="/integritetspolicy" className="underline">
              {text.privacyPolicy}
            </Link>{" "}
            |{" "}
            <Link href="/anvandarvillkor" className="underline">
              {text.terms}
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
