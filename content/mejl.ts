// Texter för mejlen som skickas från kontaktformulären (lib/email.ts).
// Ren text, inga HTML-mallar: inget som kunden skriver kan tolkas som HTML.
// Bekräftelserna till kunden och notisen till info@ är på svenska. Notisen
// till företagen är på engelska, eftersom företagen svarar kunden på engelska.
// Partneransökan (/for-foretag): bekräftelsen till den sökande är på engelska,
// notisen till info@ på svenska.
import type { ContactInput } from "../lib/contact/schema.ts";
import type { PartnerInput } from "../lib/partner/schema.ts";
import type {
  ExperienceType,
  InquiryInput,
  TravelStyle,
} from "../lib/inquiry/schema.ts";

export type Email = { subject: string; text: string };

const signature = "Vänliga hälsningar,\nLocal Safari Finder";

// Bekräftelse till kunden, företagens formulär.
export function companyInquiryConfirmation(
  firstName: string,
  companyName: string,
): Email {
  return {
    subject: "Vi har tagit emot din förfrågan – Local Safari Finder",
    text: [
      `Hej ${firstName}!`,
      `Tack för din förfrågan. Den har skickats vidare till ${companyName}.`,
      `${companyName} hör av sig direkt till dig inom kort för att planera din resa tillsammans med dig.`,
      "Det här mejlet går inte att svara på.",
      signature,
    ].join("\n\n"),
  };
}

// Bekräftelse till kunden, /kontakta-oss.
export function contactConfirmation(name: string): Email {
  return {
    subject: "Vi har tagit emot ditt meddelande – Local Safari Finder",
    text: [
      `Hej ${name}!`,
      "Tack för ditt meddelande. Vi återkommer så snart vi kan.",
      "Det här mejlet går inte att svara på.",
      signature,
    ].join("\n\n"),
  };
}

const travelStyleLabels: Record<TravelStyle, string> = {
  solo: "Solo",
  par: "Couple",
  familj: "Family",
  grupp: "Group",
};

const experienceLabels: Record<ExperienceType, string> = {
  "mountain-trekking": "Mountain Trekking",
  "beach-holidays": "Beach Holidays",
  "safari-adventures": "Safari Adventures",
  "combination-tour": "Combination Tour",
};

// Notis till företaget (engelska). Svaret går direkt till kunden (reply-to).
export function companyInquiryNotification(
  inquiry: InquiryInput,
  companyName: string,
): Email {
  const rows: [string, string][] = [
    ["First name", inquiry.firstName],
    ["Email", inquiry.email],
    ["WhatsApp", inquiry.whatsapp],
    ["Country of residence", inquiry.countryOfResidence],
    ["Preferred travel dates", inquiry.travelDates || "–"],
    [
      "Traveling as",
      inquiry.travelStyle ? travelStyleLabels[inquiry.travelStyle] : "–",
    ],
    ["Number of travelers", inquiry.travelers],
    [
      "Interested in",
      inquiry.experienceTypes.map((type) => experienceLabels[type]).join(", "),
    ],
  ];
  return {
    subject: `New inquiry via Local Safari Finder – ${companyName}`,
    text: [
      `Hello ${companyName},`,
      "You have received a new inquiry via Local Safari Finder. Reply to this email to answer the traveler directly.",
      rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      `Dream trip:\n${inquiry.dreamTrip}`,
      "Best regards,\nLocal Safari Finder",
    ].join("\n\n"),
  };
}

// Notis till info@ från /kontakta-oss (svenska). Svaret går direkt till
// avsändaren (reply-to).
export function contactNotification(message: ContactInput): Email {
  return {
    subject: "Ny förfrågan via Local Safari Finder",
    text: [
      "Nytt meddelande via kontaktformuläret på /kontakta-oss. Svara på det här mejlet för att svara avsändaren direkt.",
      `Namn: ${message.name}\nMail: ${message.email}`,
      `Meddelande:\n${message.message}`,
    ].join("\n\n"),
  };
}

// Bekräftelse till den sökande, /for-foretag (engelska).
export function partnerApplicationConfirmation(
  application: PartnerInput,
): Email {
  return {
    subject: "We have received your application – Local Safari Finder",
    text: [
      `Hello ${application.contactPerson},`,
      `Thank you for applying to be featured on Local Safari Finder with ${application.companyName}. We will review your application and get back to you as soon as we can.`,
      "This email cannot be replied to.",
      "Best regards,\nLocal Safari Finder",
    ].join("\n\n"),
  };
}

// Notis till info@ från /for-foretag (svenska). Svaret går direkt till den
// sökande (reply-to).
export function partnerApplicationNotification(
  application: PartnerInput,
): Email {
  const rows: [string, string][] = [
    ["Företag", application.companyName],
    ["Kontaktperson", application.contactPerson],
    ["Mail", application.email],
    ["Webbplats", application.companyWebsite || "–"],
    ["Land/region", application.country],
  ];
  return {
    subject: `Ny partneransökan via Local Safari Finder – ${application.companyName}`,
    text: [
      "Ny ansökan via formuläret på /for-foretag. Svara på det här mejlet för att svara den sökande direkt.",
      rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      `Om företaget:\n${application.about}`,
      `Varför de vill synas på Local Safari Finder:\n${application.motivation}`,
    ].join("\n\n"),
  };
}
