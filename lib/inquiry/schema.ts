import { z } from "zod";

// Delas av klient och server. Felmeddelanden på engelska per fält, som resten
// av företagens formulär. Nycklarna i travelStyles är interna värden.
export const travelStyles = ["solo", "par", "familj", "grupp"] as const;
export type TravelStyle = (typeof travelStyles)[number];

export const experienceTypes = [
  "mountain-trekking",
  "beach-holidays",
  "safari-adventures",
  "combination-tour",
] as const;
export type ExperienceType = (typeof experienceTypes)[number];

export const inquirySchema = z.object({
  companySlug: z.string().min(1),
  firstName: z.string().trim().min(1, "Please enter your first name."),
  email: z.email("Please enter a valid email address."),
  whatsapp: z.string().trim().min(3, "Please enter your WhatsApp number."),
  countryOfResidence: z
    .string()
    .trim()
    .min(1, "Please enter your country of residence."),
  travelDates: z.string().trim().optional().default(""),
  travelStyle: z.enum(travelStyles).optional(),
  travelers: z.string().trim().min(1, "Please tell us how many are traveling."),
  experienceTypes: z
    .array(z.enum(experienceTypes))
    .min(1, "Please choose at least one type of experience."),
  dreamTrip: z
    .string()
    .trim()
    .min(1, "Please tell us a little about your dream trip."),
  consent: z.literal(true, {
    error: "You must agree before sending your inquiry.",
  }),
  // Honeypot: ska alltid vara tom. Fylls bara i av botar. Får inte underkännas
  // av valideringen — det skulle avslöja skyddet. Kollas separat i API-routen.
  website: z.string().optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
