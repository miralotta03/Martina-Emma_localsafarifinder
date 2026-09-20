import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";

export type Company = {
  slug: string;
  name: string;
  logo: string;
  country: string;
  description: string;
  categories: TravelerCategorySlug[];
  activityTypes: ActivityTypeSlug[];
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
  },
  {
    slug: "smart-escapes",
    name: "Smart Escape Limited",
    logo: "/images/companies/smart-escape.svg",
    country: "Tanzania",
    description: "Safariäventyr för dig som vill uppleva det verkliga Tanzania.",
    categories: [
      // TODO: PLATSHÅLLARE. De verkliga kategorierna för Smart Escapes är inte
      // kända än. Byt ut när uppgifterna finns.
      "for-tva",
      "med-barn",
      "pa-egen-hand",
      // Verklig data: originalsidan visar Smart Escapes under Dela Upplevelsen.
      "dela-upplevelsen",
    ],
    // TODO: PLATSHÅLLARE. Smart Escapes verkliga aktivitetstyper är inte kända än.
    activityTypes: ["safariaventyr"],
  },
];
