import "server-only";
import type { PartnerInput } from "./schema";

// Loggar att en ansökan kom in, utan personuppgifter (namn, e-post, text).
// Mejlen skickas av sendPartnerApplicationEmails (lib/email.ts) i
// app/api/partner-application/route.ts, till info@localsafarifinder.com.
export async function deliverPartnerApplication(application: PartnerInput) {
  console.log("[partner]", {
    fields: Object.keys(application),
    timestamp: new Date().toISOString(),
  });
}
