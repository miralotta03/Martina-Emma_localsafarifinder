import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";
import type { CompanyProfile } from "./company-profiles/types";
import { hecKilimanjaroSafarisProfile } from "./company-profiles/hec-kilimanjaro-safaris";
import { smartEscapesProfile } from "./company-profiles/smart-escapes";
import { caracalToursSafarisProfile } from "./company-profiles/caracal-tours-safaris";
import { safariJensProfile } from "./company-profiles/safari-jens";
import { utukufuTravelsAdventuresProfile } from "./company-profiles/utukufu-travels-adventures";

// Vart företaget kör resor (inte var det sitter, se profile.region).
// `slug` är stadens värde i sök-URL:en, t.ex. /sok?destination=tanzania-moshi.
// Landets värde härleds från `country` (se lib/search.ts).
export type Destination = {
  country: string;
  city: string;
  slug: string;
};

export type Company = {
  slug: string;
  name: string;
  // Valfri: saknas logotypen visas företagsnamnet som text.
  logo?: string;
  country: string;
  description: string;
  categories: TravelerCategorySlug[];
  activityTypes: ActivityTypeSlug[];
  destinations: Destination[];
  // Innehållet på företagets egen sida (/{slug}). Utan profil finns ingen sida.
  profile?: CompanyProfile;
};

export const companies: Company[] = [
  {
    slug: "hec-kilimanjaro-safaris",
    name: "HEC Kilimanjaro Safari LTD",
    logo: "/companies/HEC-kilimanjaro-safaris/logo/logo.webp",
    country: "Tanzania",
    description: "Personliga bergsvandringar för äventyrliga själar.",
    categories: ["dela-upplevelsen"],
    activityTypes: [
      "bergsvandring",
      "safariaventyr",
      "strandsemester",
      "paketresor",
    ],
    // TODO: PLATSHÅLLARE, utgår från region (Moshi, Tanzania). Ska bekräftas
    // av kunden.
    destinations: [
      { country: "Tanzania", city: "Moshi", slug: "tanzania-moshi" },
    ],
    profile: hecKilimanjaroSafarisProfile,
  },
  {
    slug: "smart-escapes",
    name: "Smart Escape Limited",
    logo: "/companies/smart-escapes/logo/logo.png",
    country: "Tanzania",
    description:
      "Safariäventyr för dig som vill uppleva det verkliga Tanzania.",
    categories: [
      // TODO: PLATSHÅLLARE. De verkliga kategorierna för Smart Escapes är inte
      // kända än. Byt ut när uppgifterna finns.
      "for-tva",
      "med-barn",
      "pa-egen-hand",
      // Verklig data: originalsidan visar Smart Escapes under Dela Upplevelsen.
      "dela-upplevelsen",
    ],
    // Verklig data: originalsidan anger dessa tre.
    activityTypes: ["safariaventyr", "strandsemester", "paketresor"],
    // TODO: PLATSHÅLLARE, utgår från region (Morogoro, Tanzania). Ska
    // bekräftas av kunden.
    destinations: [
      { country: "Tanzania", city: "Morogoro", slug: "tanzania-morogoro" },
    ],
    profile: smartEscapesProfile,
  },
  {
    slug: "caracal-tours-safaris",
    name: "Caracal Tours & Safaris",
    logo: "/companies/caracal-tours-safaris/logo/logo.jpg",
    country: "Tanzania",
    // TODO: utkast, ska godkännas av kunden.
    description: "Personliga safarier i din egen takt, bortom folkmassorna.",
    categories: ["med-barn"],
    activityTypes: [
      "bergsvandring",
      "safariaventyr",
      "strandsemester",
      "paketresor",
    ],
    // TODO: PLATSHÅLLARE, utgår från region (Moshi, Tanzania). Ska bekräftas
    // av kunden.
    destinations: [
      { country: "Tanzania", city: "Moshi", slug: "tanzania-moshi" },
    ],
    profile: caracalToursSafarisProfile,
  },
  {
    slug: "safari-jens",
    name: "Safari Jens",
    // Ingen logotyp än: företagsnamnet visas som text i samma ruta.
    country: "Tanzania",
    // TODO: utkast, ska godkännas av kunden.
    description:
      "Skräddarsydda safarier, bergsvandringar och strandsemestrar i Tanzania.",
    categories: ["med-barn"],
    activityTypes: ["bergsvandring", "safariaventyr", "strandsemester"],
    // TODO: PLATSHÅLLARE, utgår från region (Arusha, Tanzania). Ska bekräftas
    // av kunden.
    destinations: [
      { country: "Tanzania", city: "Arusha", slug: "tanzania-arusha" },
    ],
    profile: safariJensProfile,
  },
  {
    slug: "utukufu-travels-adventures",
    name: "Utukufu Travels & Adventures",
    // Ingen logotyp än: företagsnamnet visas som text i samma ruta.
    country: "Tanzania",
    // TODO: utkast, ska godkännas av kunden.
    description: "Personligt planerade resor med lokal kunskap och ärliga råd.",
    categories: ["med-barn"],
    activityTypes: [
      "bergsvandring",
      "safariaventyr",
      "strandsemester",
      "paketresor",
    ],
    // TODO: PLATSHÅLLARE, utgår från region (Arusha, Tanzania). Ska bekräftas
    // av kunden.
    destinations: [
      { country: "Tanzania", city: "Arusha", slug: "tanzania-arusha" },
    ],
    profile: utukufuTravelsAdventuresProfile,
  },
];

export type CompanyWithProfile = Company & { profile: CompanyProfile };

export const companiesWithProfile = companies.filter(
  (company): company is CompanyWithProfile => Boolean(company.profile),
);

export function getCompanyWithProfile(
  slug: string,
): CompanyWithProfile | undefined {
  return companiesWithProfile.find((company) => company.slug === slug);
}
