import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";

export type CategoryActivity = {
  slug: ActivityTypeSlug;
  title: string;
  description: string;
  // Valfri: utan bild visas kortet som rent textkort.
  image?: string;
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
export const defaultActivities: CategoryActivity[] = [
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

// Aktivitetskort med bild från public/categories/{kategori}/{aktivitet}.jpg.
// Används bara för kategorier som har alla bilder på plats.
function withActivityImages(categorySlug: TravelerCategorySlug) {
  return defaultActivities.map((activity) => ({
    ...activity,
    image: `/categories/${categorySlug}/${activity.slug}.jpg`,
  }));
}

export const categories: Category[] = [
  {
    slug: "for-tva",
    name: "För Två",
    label: "ROMANTIK, SMEKMÅNAD, LYX...",
    heroText: "Lugna, privata och hänförande - safaris skapade för två.",
    image: "/categories/for-tva/hero.jpg",
    imageAlt: "",
    companiesHeading: "Företag för Två",
    activities: withActivityImages("for-tva"),
  },
  {
    slug: "med-barn",
    name: "Med Barn",
    label: "ÄVENTYR FÖR ALLA ÅLDRAR",
    heroText: "Barnvänliga lodger, engagerade guider och minnen för livet",
    image: "/categories/med-barn/hero.jpg",
    imageAlt: "",
    companiesHeading: "För resor med Barn",
    activities: withActivityImages("med-barn"),
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
  {
    slug: "dela-upplevelsen",
    name: "Dela Upplevelsen",
    label: "ÄVENTYR TILLSAMMANS",
    heroText:
      "För dig som vill dela upplevelsen med familj vänner eller andra likasinnade",
    image: "/images/traveler-types/dela-upplevelsen.svg",
    imageAlt: "",
    companiesHeading: "För dig som vill dela upplevelsen",
    activities: defaultActivities,
  },
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
