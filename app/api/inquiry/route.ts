import { NextResponse } from "next/server";
import { z } from "zod";
import { inquirySchema } from "@/lib/inquiry/schema";
import { deliverInquiry } from "@/lib/inquiry/deliver";
import { companiesWithProfile } from "@/data/companies";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Formuläret innehåller fel.",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const { data } = parsed;

  // Honeypot-träff: låtsas att allt gick bra utan att leverera.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const company = companiesWithProfile.find((c) => c.slug === data.companySlug);
  if (!company) {
    return NextResponse.json({ error: "Okänt företag." }, { status: 400 });
  }

  await deliverInquiry(data, company);

  return NextResponse.json({ ok: true });
}
