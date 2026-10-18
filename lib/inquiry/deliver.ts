import "server-only";
import type { InquiryInput } from "./schema";
import { getCompanyRecipient } from "@/lib/company-contacts";

// Loggar förfrågan. Mejlen skickas av sendInquiryEmails (lib/email.ts) i
// app/api/inquiry/route.ts. Loggar bara vad som behövs för felsökning:
// företag, fälten som fanns med och tidsstämpel — inga personuppgifter
// (namn, e-post, telefon, text) hamnar i loggen.
export async function deliverInquiry(
  inquiry: InquiryInput,
  company: { slug: string; name: string },
) {
  console.log("[inquiry]", {
    company: company.slug,
    hasRecipient: Boolean(getCompanyRecipient(company.slug)),
    fields: Object.keys(inquiry),
    timestamp: new Date().toISOString(),
  });
}
