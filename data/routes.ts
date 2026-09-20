import { categories } from "./categories";
import { companies } from "./companies";
import { categoryActivityPages } from "./categoryActivities";

// Toppnivå-URL:er som redan är upptagna av statiska routes eller av sidor som
// header/footer länkar till. Statiska mappar vinner tyst över [slug], så ett
// företag med en sådan slug skulle annars skuggas utan att någon märker det.
const reservedSlugs = [
  "upplevelser",
  "om-oss",
  "kontakt",
  "bli-partner",
  "anvandarvillkor",
  "integritetspolicy",
  "cookiepolicy",
];

// Kategorier och företag delar toppnivå-URL:er (/for-tva, /hec-kilimanjaro-safaris).
// Körs när modulen laddas, så en krock stoppar bygget i stället för att ge fel sida.
function assertNoSlugCollisions() {
  const taken = new Map<string, string>();
  for (const slug of reservedSlugs) taken.set(slug, "reserverad route");
  for (const { slug } of categories) {
    if (taken.has(slug)) {
      throw new Error(`Slug "${slug}" (kategori) krockar med ${taken.get(slug)}.`);
    }
    taken.set(slug, "kategori");
  }
  for (const { slug } of companies) {
    if (taken.has(slug)) {
      throw new Error(`Slug "${slug}" (företag) krockar med ${taken.get(slug)}.`);
    }
    taken.set(slug, "företag");
  }
}

// Varje aktivitetssida (/{kategori}/{aktivitet}) måste höra till en kategori som
// har aktiviteten, och en kombination får inte finnas två gånger.
function assertValidActivityPages() {
  const seen = new Set<string>();
  for (const { category, activity } of categoryActivityPages) {
    const key = `${category}/${activity}`;
    if (seen.has(key)) {
      throw new Error(`Aktivitetssidan "${key}" finns två gånger.`);
    }
    seen.add(key);

    const owner = categories.find((c) => c.slug === category);
    if (!owner?.activities?.some((a) => a.slug === activity)) {
      throw new Error(
        `Aktivitetssidan "${key}" hör till en okänd kategori eller aktivitet.`,
      );
    }
  }
}

assertNoSlugCollisions();
assertValidActivityPages();
