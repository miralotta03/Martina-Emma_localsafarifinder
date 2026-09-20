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
  // Utkast som kunden inte har godkänt. Renderas inte, sidan ser ut som övriga.
  draft?: boolean;
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

const safariaventyr = {
  activity: "safariaventyr",
  heroText: "Big 5 och allt däremellan",
  imageAlt: "",
  companiesHeading: "Företag redo att ta emot dig",
} as const;

// Platshållare tills riktiga foton finns (paret med utsikt / safaribåten).
const safariForTva = "/images/safariaventyr/for-tva.svg";
const safariDela = "/images/safariaventyr/dela-upplevelsen.svg";

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
  {
    ...safariaventyr,
    category: "for-tva",
    image: safariForTva,
    label: "FÖR TVÅ · SAFARIÄVENTYR",
    heading: "Safariäventyr För Två",
    backLabel: "Tillbaka till resor för två",
  },
  {
    ...safariaventyr,
    category: "med-barn",
    // TODO: utkast, ska godkännas av kunden. Texten är härledd ur de andra
    // sidorna, ingen skärmdump finns. Bilden återanvänder Dela Upplevelsen.
    draft: true,
    image: safariDela,
    label: "MED BARN · SAFARIÄVENTYR",
    heading: "Safariäventyr Med Barn",
    backLabel: "Tillbaka till resor med barn",
  },
  {
    ...safariaventyr,
    category: "pa-egen-hand",
    // TODO: utkast, ska godkännas av kunden. Texten är härledd ur de andra
    // sidorna, ingen skärmdump finns. Bilden återanvänder För Två.
    draft: true,
    image: safariForTva,
    label: "PÅ EGEN HAND · SAFARIÄVENTYR",
    heading: "Safariäventyr På Egen Hand",
    backLabel: "Tillbaka till resor på egen hand",
  },
  {
    ...safariaventyr,
    category: "dela-upplevelsen",
    image: safariDela,
    label: "DELA UPPLEVELSEN · SAFARIÄVENTYR",
    heading: "Safariäventyr Dela Upplevelsen",
    // Länktexten syns inte i skärmdumpen; härledd ur mönstret för de andra.
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
