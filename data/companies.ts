import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";
import type { CompanyProfile } from "./company-profiles/types";
import { hecKilimanjaroSafarisProfile } from "./company-profiles/hec-kilimanjaro-safaris";
import { smartEscapesProfile } from "./company-profiles/smart-escapes";

export type Company = {
  slug: string;
  name: string;
  // Valfri: saknas logotypen visas företagsnamnet som text.
  logo?: string;
  country: string;
  description: string;
  categories: TravelerCategorySlug[];
  activityTypes: ActivityTypeSlug[];
  // Innehållet på företagets egen sida (/{slug}). Utan profil finns ingen sida.
  profile?: CompanyProfile;
};

export const companies: Company[] = [
  {
    slug: "hec-kilimanjaro-safaris",
    name: "HEC Kilimanjaro Safari LTD",
    logo: "/images/companies/hec-kilimanjaro.svg",
    country: "Tanzania",
    description: "Personliga bergsvandringar för äventyrliga själar.",
    categories: ["dela-upplevelsen"],
    activityTypes: [
      "bergsvandring",
      "safariaventyr",
      "strandsemester",
      "paketresor",
    ],
    profile: hecKilimanjaroSafarisProfile,
  },
  {
    slug: "smart-escapes",
    name: "Smart Escape Limited",
    logo: "/images/companies/smart-escape.svg",
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
    profile: smartEscapesProfile,
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
