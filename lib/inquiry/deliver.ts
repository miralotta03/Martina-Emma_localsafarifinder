import "server-only";
import type { InquiryInput } from "./schema";
import { getRecipient } from "./recipients";

// Skiljer leveransen från valideringen så att mejlutskick kan läggas till
// senare utan att röra app/api/inquiry/route.ts. Loggar bara vad som behövs
// för felsökning: företag, fälten som fanns med och tidsstämpel — inga
// personuppgifter (namn, e-post, telefon, text) hamnar i loggen.
export async function deliverInquiry(
  inquiry: InquiryInput,
  company: { slug: string; name: string },
) {
  const recipient = getRecipient(company.slug);

  console.log("[inquiry]", {
    company: company.slug,
    hasRecipient: Boolean(recipient),
    fields: Object.keys(inquiry),
    timestamp: new Date().toISOString(),
  });

  // TODO: skicka mejl till `recipient` när adresserna finns (se .env.example).
  // Tills dess är detta den enda leveransen.
}
