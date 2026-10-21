import { z } from "zod";

// Ansökningsformuläret på /for-foretag ("Bli Partner"). Delas av klient och
// server. Felmeddelanden på engelska, som resten av formuläret.
export const partnerSchema = z.object({
  companyName: z.string().trim().min(1, "Please enter your company name."),
  contactPerson: z.string().trim().min(1, "Please enter a contact person."),
  email: z.email("Please enter a valid email address."),
  // Företagets webbplats, valfri. (Honeypoten heter `website`, se nedan.)
  companyWebsite: z.string().trim().optional().default(""),
  country: z.string().trim().min(1, "Please enter your country or region."),
  about: z
    .string()
    .trim()
    .min(1, "Please tell us a little about your company."),
  motivation: z
    .string()
    .trim()
    .min(1, "Please tell us why you want to be featured."),
  consent: z.literal(true, {
    error: "You must agree before sending your application.",
  }),
  // Honeypot: ska alltid vara tom. Kollas separat i API-routen (se
  // lib/inquiry/schema.ts).
  website: z.string().optional().default(""),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
