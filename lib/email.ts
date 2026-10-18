import "server-only";
import { Resend } from "resend";
// Relativa importer med .ts så att filen också kan testas med node --test
// (som inte förstår @/-aliaset).
import type { ContactInput } from "./contact/schema.ts";
import type { InquiryInput } from "./inquiry/schema.ts";
import {
  FROM_ADDRESS,
  GENERAL_INBOX,
  getCompanyRecipient,
  type Env,
} from "./company-contacts.ts";
import {
  companyInquiryConfirmation,
  companyInquiryNotification,
  contactConfirmation,
  contactNotification,
  type Email,
} from "../content/mejl.ts";

export type OutgoingEmail = Email & {
  from: string;
  to: string;
  replyTo?: string;
};

// Skickar ett mejl. Returnerar ett fel i stället för att kasta (som Resend).
export type EmailSender = (
  email: OutgoingEmail,
) => Promise<{ error?: unknown }>;

export type EmailResult = "sent" | "failed" | "skipped";

export type SendResult = { customer: EmailResult; notification: EmailResult };

function resendSender(apiKey: string): EmailSender {
  const resend = new Resend(apiKey);
  return async ({ from, to, subject, text, replyTo }) => {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo,
    });
    return { error: error ?? undefined };
  };
}

async function sendOne(
  send: EmailSender,
  email: OutgoingEmail,
  label: string,
  company: string,
): Promise<EmailResult> {
  try {
    const { error } = await send(email);
    if (!error) return "sent";
    // Bara felets namn/meddelande loggas, inga adresser eller formulärtext.
    console.error("[email] misslyckades", { label, company, error });
    return "failed";
  } catch (error) {
    console.error("[email] misslyckades", { label, company, error });
    return "failed";
  }
}

// Skickar bekräftelse till kunden och notis till företaget (eller till info@
// för /kontakta-oss, då `company` är null). Kastar aldrig: förfrågan är redan
// loggad, så ett misslyckat utskick ska inte se ut som ett fel för kunden.
// Saknas mottagare eller API-nyckel skickas inget, men det loggas.
export async function sendInquiryEmails(
  inquiry: InquiryInput | ContactInput,
  company: { slug: string; name: string } | null,
  { env = process.env, send }: { env?: Env; send?: EmailSender } = {},
): Promise<SendResult> {
  const skipped: SendResult = { customer: "skipped", notification: "skipped" };
  const companyLabel = company?.slug ?? "kontakta-oss";

  const recipient = company
    ? getCompanyRecipient(company.slug, env)
    : GENERAL_INBOX;
  if (!recipient) {
    console.warn(
      `[email] Ingen mottagaradress för "${company?.slug}" (INQUIRY_TO_…). Förfrågan är loggad, men inget mejl skickas.`,
    );
    return skipped;
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  const sender = send ?? (apiKey ? resendSender(apiKey) : undefined);
  if (!sender) {
    console.warn(
      "[email] RESEND_API_KEY saknas. Förfrågan är loggad, men inget mejl skickas.",
    );
    return skipped;
  }

  let customer: Email;
  let notification: Email;
  if (company) {
    const data = inquiry as InquiryInput;
    customer = companyInquiryConfirmation(data.firstName, company.name);
    notification = companyInquiryNotification(data, company.name);
  } else {
    const data = inquiry as ContactInput;
    customer = contactConfirmation(data.name);
    notification = contactNotification(data);
  }

  const [customerResult, notificationResult] = await Promise.all([
    sendOne(
      sender,
      { ...customer, from: FROM_ADDRESS, to: inquiry.email },
      "bekräftelse",
      companyLabel,
    ),
    sendOne(
      sender,
      // Svar på notisen går direkt till kunden.
      {
        ...notification,
        from: FROM_ADDRESS,
        to: recipient,
        replyTo: inquiry.email,
      },
      "notis",
      companyLabel,
    ),
  ]);

  console.log("[email]", {
    company: companyLabel,
    customer: customerResult,
    notification: notificationResult,
  });
  return { customer: customerResult, notification: notificationResult };
}
