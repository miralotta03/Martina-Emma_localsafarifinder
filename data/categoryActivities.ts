import type { ActivityTypeSlug, TravelerCategorySlug } from "@/lib/types";

export type CategoryActivityPageData = {
  category: TravelerCategorySlug;
  activity: ActivityTypeSlug;
  label: string;
  heading: string;
  heroText: string;
  image: string;
  imageAlt: string;
  companiesHeading: string;
  backLabel: string;
};

// Sidorna /{kategori}/{aktivitet}. En ny kombination är bara en ny post här:
// kategorisidans kort för aktiviteten blir då en länk i stället för ett filter.
const bergsvandring = {
  activity: "bergsvandring",
  heroText: "Bestig Kilimanjaro och mer",
  // Platshållare: alla varianter delar samma bild tills riktiga foton finns.
  image: "/images/bergsvandring/hero.svg",
  imageAlt: "",
  companiesHeading: "Företag redo att ta emot dig",
} as const;

export const categoryActivityPages: CategoryActivityPageData[] = [
  {
    ...bergsvandring,
    category: "for-tva",
    label: "FÖR TVÅ · BERGSVANDRING",
    heading: "Bergsvandring För Två",
    backLabel: "Tillbaka till resor för två",
  },
  {
    ...bergsvandring,
    category: "med-barn",
    label: "MED BARN · BERGSVANDRING",
    heading: "Bergsvandring Med Barn",
    // Länktexten syns inte i skärmdumpen; härledd ur mönstret för de andra.
    backLabel: "Tillbaka till resor med barn",
  },
  {
    ...bergsvandring,
    category: "pa-egen-hand",
    label: "PÅ EGEN HAND · BERGSVANDRING",
    heading: "Bergsvandring På Egen Hand",
    // Länktexten syns inte i skärmdumpen; härledd ur mönstret för de andra.
    backLabel: "Tillbaka till resor på egen hand",
  },
  {
    ...bergsvandring,
    category: "dela-upplevelsen",
    label: "DELA UPPLEVELSEN · BERGSVANDRING",
    heading: "Bergsvandring Dela Upplevelsen",
    backLabel: "Tillbaka till resor dela upplevelsen",
  },
];

export function getCategoryActivityPage(
  category: string,
  activity: string,
): CategoryActivityPageData | undefined {
  return categoryActivityPages.find(
    (page) => page.category === category && page.activity === activity,
  );
}
