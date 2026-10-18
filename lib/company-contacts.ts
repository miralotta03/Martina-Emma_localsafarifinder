import "server-only";

// Mottagare för formulärens mejl. Bara på servern: inga adresser i
// klientkoden eller i företagsdatan.
//
// Företagens adresser ligger INTE i koden (repot är publikt), utan i
// miljövariabeln INQUIRY_TO_<SLUG>, t.ex. INQUIRY_TO_SMART_ESCAPES. Lokalt i
// .env.local, i Cloudflare som Secret under Settings → Variables and Secrets.
// Se .env.example.

// Avsändare för alla mejl. Domänen måste vara verifierad i Resend.
export const FROM_ADDRESS =
  "Local Safari Finder <noreply@localsafarifinder.com>";

// Mottagare för det allmänna kontaktformuläret (/kontakta-oss). Sajtens egen,
// offentliga adress, så den kan stå i koden.
export const GENERAL_INBOX = "info@localsafarifinder.com";

export type Env = Record<string, string | undefined>;

export function companyRecipientEnvKey(slug: string): string {
  return `INQUIRY_TO_${slug.replace(/-/g, "_").toUpperCase()}`;
}

// Företagets mottagaradress, eller undefined om ingen är satt.
export function getCompanyRecipient(
  slug: string,
  env: Env = process.env,
): string | undefined {
  const value = env[companyRecipientEnvKey(slug)]?.trim();
  return value ? value : undefined;
}
