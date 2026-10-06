import type { Company, TravelerType } from "@/lib/types";

export const travelerTypes: TravelerType[] = [
  {
    slug: "for-tva",
    title: "För två",
    description: "Romantiska resor och oförglömliga upplevelser för två",
    image: "/categories/for-tva/hero.jpg",
  },
  {
    slug: "med-barn",
    title: "Med barn",
    description:
      "Skapa minnen tillsammans med upplevelser för alla familjemedlemmar.",
    image: "/categories/med-barn/hero.jpg",
  },
  {
    slug: "pa-egen-hand",
    title: "På egen hand",
    description:
      "För fotografer, naturälskare och dig som vill resa i din egen takt.",
    image: "/categories/pa-egen-hand/hero.jpg",
  },
  {
    slug: "dela-upplevelsen",
    title: "Dela upplevelsen",
    description:
      "Res med familj, vänner eller tillsammans med andra som delar ditt intresse för äventyr.",
    image: "/categories/dela-upplevelsen/hero.jpg",
  },
];

export const companies: Company[] = [
  {
    slug: "smart-escapes",
    name: "Smart Escape Limited",
    country: "Tanzania",
    description: "Safariäventyr för dig som vill uppleva det verkliga Tanzania.",
    image: "/images/companies/smart-escape.svg",
    categories: ["for-tva", "med-barn", "pa-egen-hand", "dela-upplevelsen"],
  },
  {
    slug: "hec-kilimanjaro-safaris",
    name: "HEC Kilimanjaro Safari LTD",
    country: "Tanzania",
    description: "Personliga bergsvandringar för äventyrliga själar",
    image: "/images/companies/hec-kilimanjaro.svg",
    categories: ["pa-egen-hand", "dela-upplevelsen"],
  },
];
