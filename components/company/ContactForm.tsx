"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  experienceTypes,
  inquirySchema,
  travelStyles,
  type ExperienceType,
  type TravelStyle,
} from "@/lib/inquiry/schema";
import { collectFieldErrors, focusFirstInvalid } from "@/lib/forms";
import {
  errorClass,
  fieldClass,
  labelClass,
  submitClass,
} from "@/components/forms/formStyles";

// Etiketter/platshållare för fälten vars innehåll inte syns i skärmdumparna
// (rullgardinens alternativ) eller som inte finns där alls (tack-/felläge).
// TODO: ska granskas av kunden.
const travelStyleLabels: Record<TravelStyle, string> = {
  solo: "Solo",
  par: "Par",
  familj: "Familj",
  grupp: "Grupp",
};

const experienceLabels: Record<ExperienceType, string> = {
  "mountain-trekking": "Mountain Trekking",
  "beach-holidays": "Beach Holidays",
  "safari-adventures": "Safari Adventures",
  "combination-tour": "Combination Tour",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  companySlug,
  companyName,
  intro,
}: {
  companySlug: string;
  companyName: string;
  intro: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      companySlug,
      firstName: String(formData.get("firstName") ?? ""),
      email: String(formData.get("email") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      countryOfResidence: String(formData.get("countryOfResidence") ?? ""),
      travelDates: String(formData.get("travelDates") ?? ""),
      travelStyle: formData.get("travelStyle") || undefined,
      travelers: String(formData.get("travelers") ?? ""),
      experienceTypes: formData.getAll("experienceTypes"),
      dreamTrip: String(formData.get("dreamTrip") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    const result = inquirySchema.safeParse(payload);
    if (!result.success) {
      setErrors(collectFieldErrors(result.error));
      setStatus("error");
      focusFirstInvalid(form);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiry", {
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

  if (status === "success") {
    return (
      <div role="status" className="py-6">
        <p className="font-serif text-xl text-forest">
          {`Tack! Din förfrågan har skickats till ${companyName}.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <p className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">
          KONTAKTA OSS
        </p>
        <h2 className="mt-2 font-serif text-2xl text-forest sm:text-3xl">
          Låt oss planera din resa tillsammans
        </h2>
        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm text-ink/80">
            {paragraph}
          </p>
        ))}
        <p className="mt-4 text-sm font-semibold text-forest">
          Din förfrågan skickas direkt till företaget och besvaras personligen
          av deras team. Därför ber vi dig skriva ditt meddelande på engelska.
        </p>
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className={errorClass}>
          Något gick fel. Försök igen om en stund.
        </p>
      )}

      {/* Honeypot: dold för människor, ifylls bara av botar. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-firstName`} className={labelClass}>
            First Name *
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            required
            placeholder="Enter your first name"
            className={`mt-2 ${fieldClass}`}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={
              errors.firstName ? `${formId}-firstName-error` : undefined
            }
          />
          {errors.firstName && (
            <p id={`${formId}-firstName-error`} className={errorClass}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email *
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className={`mt-2 ${fieldClass}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
          />
          {errors.email && (
            <p id={`${formId}-email-error`} className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-whatsapp`} className={labelClass}>
            Whatsapp number *
          </label>
          <input
            id={`${formId}-whatsapp`}
            name="whatsapp"
            type="tel"
            required
            placeholder="+46 000 000 000"
            className={`mt-2 ${fieldClass}`}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={
              errors.whatsapp ? `${formId}-whatsapp-error` : undefined
            }
          />
          {errors.whatsapp && (
            <p id={`${formId}-whatsapp-error`} className={errorClass}>
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-country`} className={labelClass}>
            Country of Residence *
          </label>
          <input
            id={`${formId}-country`}
            name="countryOfResidence"
            type="text"
            required
            placeholder="Country of Residence"
            className={`mt-2 ${fieldClass}`}
            aria-invalid={Boolean(errors.countryOfResidence)}
            aria-describedby={
              errors.countryOfResidence ? `${formId}-country-error` : undefined
            }
          />
          {errors.countryOfResidence && (
            <p id={`${formId}-country-error`} className={errorClass}>
              {errors.countryOfResidence}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-dates`} className={labelClass}>
          Preferred Travel Dates
        </label>
        <textarea
          id={`${formId}-dates`}
          name="travelDates"
          rows={2}
          placeholder="Preferred Travel Dates"
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-style`} className={labelClass}>
          How are you traveling?
        </label>
        <select
          id={`${formId}-style`}
          name="travelStyle"
          defaultValue=""
          className={`mt-2 ${fieldClass}`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {travelStyles.map((style) => (
            <option key={style} value={style}>
              {travelStyleLabels[style]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${formId}-travelers`} className={labelClass}>
          How many travelers are you? *
        </label>
        <textarea
          id={`${formId}-travelers`}
          name="travelers"
          rows={2}
          required
          placeholder="How many travelers are you?"
          className={`mt-2 ${fieldClass}`}
          aria-invalid={Boolean(errors.travelers)}
          aria-describedby={
            errors.travelers ? `${formId}-travelers-error` : undefined
          }
        />
        {errors.travelers && (
          <p id={`${formId}-travelers-error`} className={errorClass}>
            {errors.travelers}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={labelClass}>
          What type of experience are you interested in? *
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {experienceTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-ink"
            >
              <input
                type="checkbox"
                name="experienceTypes"
                value={type}
                className="h-4 w-4 rounded border-forest/30"
              />
              {experienceLabels[type]}
            </label>
          ))}
        </div>
        {errors.experienceTypes && (
          <p className={errorClass}>{errors.experienceTypes}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor={`${formId}-dreamTrip`} className={labelClass}>
          Tell us about your dream trip *
        </label>
        <textarea
          id={`${formId}-dreamTrip`}
          name="dreamTrip"
          rows={4}
          required
          placeholder="Tell us what you're looking for, interests, special requests, or anything else you'd like the local team to know."
          className={`mt-2 ${fieldClass}`}
          aria-invalid={Boolean(errors.dreamTrip)}
          aria-describedby={
            errors.dreamTrip ? `${formId}-dreamTrip-error` : undefined
          }
        />
        {errors.dreamTrip && (
          <p id={`${formId}-dreamTrip-error`} className={errorClass}>
            {errors.dreamTrip}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink/80">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 rounded border-forest/30"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? `${formId}-consent-error` : undefined
            }
          />
          <span>
            Jag samtycker till att Local Safari Finder behandlar mina
            personuppgifter för att vidarebefordra min intresseanmälan till det
            valda safariföretaget. Jag har läst och godkänner{" "}
            <Link href="/integritetspolicy" className="underline">
              Integritetspolicyn
            </Link>{" "}
            samt{" "}
            <Link href="/anvandarvillkor" className="underline">
              Användarvillkoren
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${formId}-consent-error`} className={errorClass}>
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full ${submitClass}`}
      >
        {status === "submitting" ? "Skickar …" : "Skicka"}
      </button>

      <p className="text-center text-sm">
        <Link href="/integritetspolicy" className="underline">
          Integritetspolicy
        </Link>{" "}
        |{" "}
        <Link href="/anvandarvillkor" className="underline">
          Användarvillkor
        </Link>
      </p>
    </form>
  );
}
