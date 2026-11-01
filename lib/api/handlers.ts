import "server-only";
import { z } from "zod";
import { contactSchema } from "@/lib/contact/schema";
import { deliverContact } from "@/lib/contact/deliver";
import { inquirySchema } from "@/lib/inquiry/schema";
import { deliverInquiry } from "@/lib/inquiry/deliver";
import { partnerSchema } from "@/lib/partner/schema";
import { deliverPartnerApplication } from "@/lib/partner/deliver";
import { sendInquiryEmails, sendPartnerApplicationEmails } from "@/lib/email";
import { companiesWithProfile } from "@/data/companies";

// Formulärens API (/api/*). Körs i den lilla Workern (worker/index.ts), inte av
// Next.js: sajten i övrigt är statisk. Samma flöde i alla tre: läs JSON,
// validera med samma schema som formuläret, honeypot-kontroll, logga utan
// personuppgifter och skicka mejlen (kastar aldrig).

const json = (body: unknown, status = 200) => Response.json(body, { status });

async function parse<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<{ data: T } | { response: Response }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { response: json({ error: "Ogiltig förfrågan." }, 400) };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      response: json(
        {
          error: "Formuläret innehåller fel.",
          issues: z.treeifyError(parsed.error),
        },
        400,
      ),
    };
  }
  return { data: parsed.data };
}

// /kontakta-oss
export async function handleContact(request: Request): Promise<Response> {
  const result = await parse(request, contactSchema);
  if ("response" in result) return result.response;
  const { data } = result;

  // Honeypot-träff: låtsas att allt gick bra utan att leverera.
  if (data.website) return json({ ok: true });

  await deliverContact(data);
  await sendInquiryEmails(data, null);
  return json({ ok: true });
}

// Företagens kontaktformulär
export async function handleInquiry(request: Request): Promise<Response> {
  const result = await parse(request, inquirySchema);
  if ("response" in result) return result.response;
  const { data } = result;

  if (data.website) return json({ ok: true });

  const company = companiesWithProfile.find((c) => c.slug === data.companySlug);
  if (!company) return json({ error: "Okänt företag." }, 400);

  await deliverInquiry(data, company);
  await sendInquiryEmails(data, company);
  return json({ ok: true });
}

// /for-foretag
export async function handlePartnerApplication(
  request: Request,
): Promise<Response> {
  const result = await parse(request, partnerSchema);
  if ("response" in result) return result.response;
  const { data } = result;

  if (data.website) return json({ ok: true });

  await deliverPartnerApplication(data);
  await sendPartnerApplicationEmails(data);
  return json({ ok: true });
}
