import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact/schema";
import { deliverContact } from "@/lib/contact/deliver";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Formuläret innehåller fel.",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  // Honeypot-träff: låtsas att allt gick bra utan att leverera.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  await deliverContact(parsed.data);

  return NextResponse.json({ ok: true });
}
