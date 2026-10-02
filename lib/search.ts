import { z } from "zod";
import type { Company, Destination } from "@/data/companies";
import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";

// Sökningen. Ett fält som saknas (eller en tom lista) betyder "alla".
// Nya fält, t.ex. datum, läggs till här och i parseSearchParams.
export type SearchQuery = {
  // En stads slug ("tanzania-moshi") eller ett lands slug ("tanzania").
  destination?: string;
  typ?: TravelerCategorySlug;
  aktiviteter?: ActivityTypeSlug[];
};

// URL-parametrarnas namn på /sok.
export const searchParamNames = {
  destination: "destination",
  typ: "typ",
  aktiviteter: "aktivitet",
} as const;

export type DestinationOption = {
  country: string;
  slug: string;
  cities: { city: string; slug: string }[];
};

type SearchableCompany = Pick<
  Company,
  "categories" | "activityTypes" | "destinations"
>;

// "Tanzania" → "tanzania", "Côte d'Ivoire" → "cote-d-ivoire".
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function countrySlug(destination: Pick<Destination, "country">): string {
  return slugify(destination.country);
}

// Alla länder och städer som något företag kör resor till, sorterade.
export function buildDestinationOptions(
  companies: Pick<Company, "destinations">[],
): DestinationOption[] {
  const byCountry = new Map<string, DestinationOption>();
  for (const company of companies) {
    for (const destination of company.destinations) {
      const slug = countrySlug(destination);
      let option = byCountry.get(slug);
      if (!option) {
        option = { country: destination.country, slug, cities: [] };
        byCountry.set(slug, option);
      }
      if (!option.cities.some((c) => c.slug === destination.slug)) {
        option.cities.push({ city: destination.city, slug: destination.slug });
      }
    }
  }

  const options = [...byCountry.values()];
  options.sort((a, b) => a.country.localeCompare(b.country, "sv"));
  for (const option of options) {
    option.cities.sort((a, b) => a.city.localeCompare(b.city, "sv"));
  }
  return options;
}

function matchesDestination(company: SearchableCompany, destination: string) {
  return company.destinations.some(
    (d) => d.slug === destination || countrySlug(d) === destination,
  );
}

// Fälten kombineras med OCH. Inom aktiviteter räcker en av de valda (ELLER).
export function searchCompanies<T extends SearchableCompany>(
  companies: T[],
  query: SearchQuery,
): T[] {
  const { destination, typ, aktiviteter } = query;
  return companies.filter(
    (company) =>
      (!destination || matchesDestination(company, destination)) &&
      (!typ || company.categories.includes(typ)) &&
      (!aktiviteter?.length ||
        aktiviteter.some((a) => company.activityTypes.includes(a))),
  );
}

// Giltiga värden för URL:en, byggda från datan.
export type SearchVocabulary = {
  destinations: DestinationOption[];
  travelTypes: readonly TravelerCategorySlug[];
  activities: readonly ActivityTypeSlug[];
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

const paramValue = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .catch(undefined);

const rawSchema = z.object({
  [searchParamNames.destination]: paramValue,
  [searchParamNames.typ]: paramValue,
  [searchParamNames.aktiviteter]: paramValue,
});

function first(value: string | string[] | undefined): string | undefined {
  return (Array.isArray(value) ? value[0] : value)?.trim() || undefined;
}

// Validerar URL-parametrarna. Okända eller trasiga värden ignoreras.
// `aktivitet` får vara kommaseparerad (a,b) eller upprepad (aktivitet=a&aktivitet=b).
export function parseSearchParams(
  raw: RawSearchParams,
  vocabulary: SearchVocabulary,
): SearchQuery {
  const params = rawSchema.parse(raw);
  const query: SearchQuery = {};

  const destination = first(params[searchParamNames.destination]);
  const knownDestinations = new Set(
    vocabulary.destinations.flatMap((d) => [
      d.slug,
      ...d.cities.map((c) => c.slug),
    ]),
  );
  if (destination && knownDestinations.has(destination)) {
    query.destination = destination;
  }

  const typ = z
    .enum(vocabulary.travelTypes as [TravelerCategorySlug])
    .optional()
    .catch(undefined)
    .parse(first(params[searchParamNames.typ]));
  if (typ) query.typ = typ;

  const activity = z.enum(vocabulary.activities as [ActivityTypeSlug]);
  const rawActivities = params[searchParamNames.aktiviteter];
  const aktiviteter = [
    ...new Set(
      (Array.isArray(rawActivities) ? rawActivities : [rawActivities ?? ""])
        .flatMap((value) => value.split(","))
        .map((value) => activity.safeParse(value.trim()))
        .flatMap((result) => (result.success ? [result.data] : [])),
    ),
  ];
  if (aktiviteter.length) query.aktiviteter = aktiviteter;

  return query;
}

// Kanonisk URL för en sökning, t.ex. /sok?destination=tanzania&aktivitet=a,b
export function toSearchHref(query: SearchQuery, path = "/sok"): string {
  const params = new URLSearchParams();
  if (query.destination) {
    params.set(searchParamNames.destination, query.destination);
  }
  if (query.typ) params.set(searchParamNames.typ, query.typ);
  if (query.aktiviteter?.length) {
    params.set(searchParamNames.aktiviteter, query.aktiviteter.join(","));
  }
  // Kommatecknet är tillåtet i en query-sträng och gör URL:en läsbar.
  const search = params.toString().replaceAll("%2C", ",");
  return search ? `${path}?${search}` : path;
}
