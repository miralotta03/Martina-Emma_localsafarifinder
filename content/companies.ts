import type { Company, TravelerType } from "@/lib/types";

export const travelerTypes: TravelerType[] = [
  {
    slug: "for-tva",
    title: "För två",
    description: "Romantiska resor och oförglömliga upplevelser för två",
    image: "/images/traveler-types/for-tva.svg",
  },
  {
    slug: "med-barn",
    title: "Med barn",
    description:
      "Skapa minnen tillsammans med upplevelser för alla familjemedlemmar.",
    image: "/images/traveler-types/med-barn.svg",
  },
  {
    slug: "pa-egen-hand",
    title: "På egen hand",
    description:
      "För fotografer, naturälskare och dig som vill resa i din egen takt.",
    image: "/images/traveler-types/pa-egen-hand.svg",
  },
  {
    slug: "dela-upplevelsen",
    title: "Dela upplevelsen",
    description:
      "Res med familj, vänner eller tillsammans med andra som delar ditt intresse för äventyr.",
    image: "/images/traveler-types/dela-upplevelsen.svg",
  },
];

export const companies: Company[] = [
  {
    slug: "smart-escape-limited",
    name: "Smart Escape Limited",
    country: "Tanzania",
    description: "Safariäventyr för dig som vill uppleva det verkliga Tanzania.",
    image: "/images/companies/smart-escape.svg",
    categories: ["for-tva", "med-barn", "pa-egen-hand", "dela-upplevelsen"],
  },
  {
    slug: "hec-kilimanjaro-safari",
    name: "HEC Kilimanjaro Safari LTD",
    country: "Tanzania",
    description: "Personliga bergsvandringar för äventyrliga själar",
    image: "/images/companies/hec-kilimanjaro.svg",
    categories: ["pa-egen-hand", "dela-upplevelsen"],
  },
];
