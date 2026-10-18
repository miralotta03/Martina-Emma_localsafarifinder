import "server-only";
import type { ContactInput } from "./schema";

// Loggar att ett meddelande kom in, utan personuppgifter (namn, e-post,
// text). Mejlen skickas av sendInquiryEmails (lib/email.ts) i
// app/api/contact/route.ts, till info@localsafarifinder.com.
export async function deliverContact(message: ContactInput) {
  console.log("[contact]", {
    fields: Object.keys(message),
    timestamp: new Date().toISOString(),
  });
}
