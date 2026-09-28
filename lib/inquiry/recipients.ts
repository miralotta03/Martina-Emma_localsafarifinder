import "server-only";

// Mottagaradresser hör inte hemma i klientbundeln eller i företagsdatan.
// TODO: PLATSHÅLLARE. Miljövariablerna ska fyllas i av kunden, se .env.example.
// Tills dess levererar deliverInquiry bara till loggen.
function envKey(slug: string) {
  return `INQUIRY_TO_${slug.replace(/-/g, "_").toUpperCase()}`;
}

export function getRecipient(slug: string): string | undefined {
  const value = process.env[envKey(slug)];
  return value && value.trim() !== "" ? value : undefined;
}
