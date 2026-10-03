import type { z } from "zod";

// Första felmeddelandet per fält, t.ex. { email: "Ange en giltig e-postadress." }.
export function collectFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

// Flyttar fokus till första fältet med fel, så att tangentbords- och
// skärmläsaranvändare hamnar där de behöver rätta.
export function focusFirstInvalid(form: HTMLFormElement) {
  form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
}
