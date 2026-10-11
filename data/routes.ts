import { categories, isCategoryReady } from "./categories";
import { companies } from "./companies";
import { categoryActivityPages } from "./categoryActivities";
import { countrySlug } from "@/lib/search";

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
  "for-foretag",
  "kontakta-oss",
  "api",
  "sok",
];

// Kategorier och företag delar toppnivå-URL:er (/for-tva, /hec-kilimanjaro-safaris).
// Körs när modulen laddas, så en krock stoppar bygget i stället för att ge fel sida.
function assertNoSlugCollisions() {
  const taken = new Map<string, string>();
  for (const slug of reservedSlugs) taken.set(slug, "reserverad route");
  for (const { slug } of categories) {
    if (taken.has(slug)) {
      throw new Error(
        `Slug "${slug}" (kategori) krockar med ${taken.get(slug)}.`,
      );
    }
    taken.set(slug, "kategori");
  }
  for (const { slug } of companies) {
    if (taken.has(slug)) {
      throw new Error(
        `Slug "${slug}" (företag) krockar med ${taken.get(slug)}.`,
      );
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

// Kategorisidans kort länkar till /{kategori}/{aktivitet} för varje aktivitet.
// En färdig kategori vars aktivitet saknar sida skulle ge ett kort till en 404.
function assertEveryActivityHasPage() {
  const existing = new Set(
    categoryActivityPages.map((page) => `${page.category}/${page.activity}`),
  );
  for (const category of categories.filter(isCategoryReady)) {
    for (const activity of category.activities) {
      const key = `${category.slug}/${activity.slug}`;
      if (!existing.has(key)) {
        throw new Error(
          `Aktivitetssidan "${key}" saknas i categoryActivityPages.`,
        );
      }
    }
  }
}

// Destinationernas slugs blir värden i /sok?destination=…. Samma slug måste
// alltid betyda samma land och stad, och en stad får inte krocka med ett land.
function assertValidDestinations() {
  const cities = new Map<string, string>();
  const countries = new Set<string>();
  for (const company of companies) {
    for (const destination of company.destinations) {
      const place = `${destination.country} – ${destination.city}`;
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(destination.slug)) {
        throw new Error(
          `Destinationen "${place}" (${company.slug}) har en ogiltig slug "${destination.slug}".`,
        );
      }
      const existing = cities.get(destination.slug);
      if (existing && existing !== place) {
        throw new Error(
          `Destinationens slug "${destination.slug}" används för både "${existing}" och "${place}".`,
        );
      }
      cities.set(destination.slug, place);
      countries.add(countrySlug(destination));
    }
  }
  for (const slug of cities.keys()) {
    if (countries.has(slug)) {
      throw new Error(
        `Destinationens slug "${slug}" krockar med ett lands slug.`,
      );
    }
  }
}

assertNoSlugCollisions();
assertValidActivityPages();
assertEveryActivityHasPage();
assertValidDestinations();
