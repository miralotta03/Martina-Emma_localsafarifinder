import "server-only";
import type { ContactInput } from "./schema";

// TODO: PLATSHÅLLARE. Mottagaren för kontaktformuläret är inte bestämd än.
// Fylls i via CONTACT_TO (se .env.example). Tills dess loggas bara att ett
// meddelande kom in, utan personuppgifter (namn, e-post, text).
export async function deliverContact(message: ContactInput) {
  const recipient = process.env.CONTACT_TO?.trim();

  console.log("[contact]", {
    hasRecipient: Boolean(recipient),
    fields: Object.keys(message),
    timestamp: new Date().toISOString(),
  });

  // TODO: skicka mejl till `recipient` när adressen finns.
}
