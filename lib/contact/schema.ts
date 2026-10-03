import { z } from "zod";

// Kontaktformuläret på /kontakta-oss. Delas av klient och server.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Fyll i ditt namn."),
  email: z.email("Ange en giltig e-postadress."),
  message: z.string().trim().min(1, "Skriv ett meddelande."),
  consent: z.literal(true, {
    error: "Du måste godkänna för att skicka meddelandet.",
  }),
  // Honeypot: ska alltid vara tom. Kollas separat i API-routen (se
  // lib/inquiry/schema.ts).
  website: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
