import type { LocalizedText } from "@/lib/i18n";

// Texter för /kontakta-oss.
const text = (sv: string, en?: string): LocalizedText => ({ sv, en });

export const contactPageContent = {
  metaTitle: text("Kontakta oss – Local Safari Finder"),
  eyebrow: text("KONTAKTA OSS"),
  heading: text("Vi Hjälper dig gärna"),
  intro: [
    text(
      "Har du frågor om Local Safari Finder, vill veta mer om hur plattformen fungerar eller är du ett safariföretag som vill synas hos oss?",
    ),
    text("Fyll i formuläret nedan så återkommer vi så snart vi kan."),
  ],
  form: {
    name: { label: text("Namn *"), placeholder: text("Namn") },
    email: { label: text("Mail *"), placeholder: text("din@mail.se") },
    message: {
      label: text("Meddelande *"),
      placeholder: text(
        "Berätta gärna hur vi kan hjälpa dig så återkommer vi så snart vi kan.",
      ),
    },
    // Samtyckestexten delas runt länken till integritetspolicyn.
    // TODO: stäm av med kunden. Texten talar om "det företag jag valt", men
    // på kontaktsidan väljer man inget företag.
    consent: {
      before: text("Jag har läst och godkänner Local Safari Finders "),
      link: text("Integritetspolicy"),
      after: text(
        " och samtycker till att mina uppgifter skickas vidare till det företag jag valt för att de ska kunna kontakta mig angående min förfrågan.",
      ),
    },
    submit: text("Skicka"),
    submitting: text("Skickar …"),
    success: text(
      "Tack! Ditt meddelande har skickats. Vi återkommer så snart vi kan.",
    ),
    error: text("Något gick fel. Försök igen om en stund."),
    privacyPolicy: text("Integritetspolicy"),
    terms: text("Användarvillkor"),
  },
};
