import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";

export type CategoryActivity = {
  slug: ActivityTypeSlug;
  title: string;
  description: string;
};

export type Category = {
  slug: TravelerCategorySlug;
  name: string;
  // Innehållet nedan är valfritt: en kategori utan det har ingen sida än (404).
  label?: string;
  heroText?: string;
  image?: string;
  imageAlt?: string;
  companiesHeading?: string;
  activities?: CategoryActivity[];
};

// Aktivitetskorten är gemensamma för kategorierna; en kategori kan skriva över dem.
const defaultActivities: CategoryActivity[] = [
  {
    slug: "bergsvandring",
    title: "Bergsvandring",
    description: "Bestig Kilimanjaro och mer",
  },
  {
    slug: "safariaventyr",
    title: "Safariäventyr",
    description: "The Big Five och allt däremellan",
  },
  {
    slug: "strandsemester",
    title: "Strandsemester",
    description: "Vit strand och turkost vatten",
  },
  {
    slug: "paketresor",
    title: "Paketresor",
    description: "Färdiga program från start till mål",
  },
];

export const categories: Category[] = [
  {
    slug: "for-tva",
    name: "För Två",
    label: "ROMANTIK, SMEKMÅNAD, LYX...",
    heroText: "Lugna, privata och hänförande - safaris skapade för två.",
    image: "/images/traveler-types/for-tva.svg",
    imageAlt: "",
    companiesHeading: "Företag för Två",
    activities: defaultActivities,
  },
  {
    slug: "med-barn",
    name: "Med Barn",
    label: "ÄVENTYR FÖR ALLA ÅLDRAR",
    heroText: "Barnvänliga lodger, engagerade guider och minnen för livet",
    image: "/images/traveler-types/med-barn.svg",
    imageAlt: "",
    companiesHeading: "För resor med Barn",
    activities: defaultActivities,
  },
  {
    slug: "pa-egen-hand",
    name: "På Egen Hand",
    label: "I DIN EGEN TAKT",
    heroText:
      "För dig som är fotograf, naturälskare och som bara vill ta det i din egen takt utan att anpassa dig efter andra",
    image: "/images/traveler-types/pa-egen-hand.svg",
    imageAlt: "",
    companiesHeading: "För dig som vill resa på egen hand",
    activities: defaultActivities,
  },
  { slug: "dela-upplevelsen", name: "Dela Upplevelsen" },
];

export type ReadyCategory = Category &
  Required<
    Pick<
      Category,
      "label" | "heroText" | "image" | "companiesHeading" | "activities"
    >
  >;

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function isCategoryReady(category: Category): category is ReadyCategory {
  return Boolean(
    category.label &&
      category.heroText &&
      category.image &&
      category.companiesHeading &&
      category.activities?.length,
  );
}
