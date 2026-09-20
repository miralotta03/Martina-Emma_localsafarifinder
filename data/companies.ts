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
    // TODO: PLATSHÅLLARE. De verkliga kategorierna och aktivitetstyperna för
    // Smart Escapes är inte kända än. Byt ut när uppgifterna finns.
    categories: ["for-tva"],
    activityTypes: ["safariaventyr"],
  },
];
