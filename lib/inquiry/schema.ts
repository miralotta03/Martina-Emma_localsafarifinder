import { z } from "zod";

// Delas av klient och server. Felmeddelanden på svenska per fält.
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
  firstName: z.string().trim().min(1, "Fyll i ditt förnamn."),
  email: z.email("Ange en giltig e-postadress."),
  whatsapp: z.string().trim().min(3, "Ange ditt Whatsapp-nummer."),
  countryOfResidence: z.string().trim().min(1, "Ange ditt bosättningsland."),
  travelDates: z.string().trim().optional().default(""),
  travelStyle: z.enum(travelStyles).optional(),
  travelers: z.string().trim().min(1, "Ange hur många ni reser."),
  experienceTypes: z
    .array(z.enum(experienceTypes))
    .min(1, "Välj minst en typ av upplevelse."),
  dreamTrip: z.string().trim().min(1, "Berätta lite om er drömresa."),
  consent: z.literal(true, {
    error: "Du måste godkänna för att skicka förfrågan.",
  }),
  // Honeypot: ska alltid vara tom. Fylls bara i av botar. Får inte underkännas
  // av valideringen — det skulle avslöja skyddet. Kollas separat i API-routen.
  website: z.string().optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
