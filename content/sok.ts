import type { LocalizedText } from "@/lib/i18n";
import type { TravelerCategorySlug } from "@/lib/types";

// Texter för sökrutan och resultatsidan /sok. {namn} fylls i med format().
const text = (sv: string, en?: string): LocalizedText => ({ sv, en });

export const searchContent = {
  form: {
    ariaLabel: text("Sök safariföretag"),
    submit: text("Sök"),
    destination: {
      label: text("Vart vill du resa?"),
      all: text("Alla destinationer"),
      wholeCountry: text("Hela {country}"),
      // Hur en vald stad visas i fältet och som chip.
      city: text("{country} – {city}"),
    },
    travelType: {
      label: text("Hur vill du resa?"),
      all: text("Alla sätt att resa"),
    },
    activities: {
      label: text("Vad vill du uppleva?"),
      // Visas i stället för namnen när fler än två är valda.
      selectedCount: text("{count} valda"),
    },
  },
  // Skissens etiketter. Avviker från kategorinamnen (För Två, Dela Upplevelsen).
  // TODO: kunden väljer om de ska vara samma ord överallt.
  travelTypeLabels: {
    "for-tva": text("Med partner"),
    "med-barn": text("Med barn"),
    "pa-egen-hand": text("På egen hand"),
    "dela-upplevelsen": text("I grupp"),
  } satisfies Record<TravelerCategorySlug, LocalizedText>,
  results: {
    metaTitle: text("Sök företag – Local Safari Finder"),
    metaTitleFiltered: text("{filters} – Sök företag – Local Safari Finder"),
    metaDescription: text(
      "Hitta lokala safariföretag efter destination, sätt att resa och upplevelse.",
    ),
    eyebrow: text("SÖK"),
    heading: text("Hitta ditt lokala safariföretag"),
    count: text("{count} företag"),
    activeFilters: text("Valda filter"),
    removeFilter: text("Ta bort filter: {label}"),
    readMore: text("Läs mer"),
    activities: text("Upplevelser"),
    speciality: text("Specialitet"),
    empty: {
      heading: text("Inga företag matchar din sökning"),
      body: text(
        "Prova att ta bort ett filter eller välja en annan destination. Du kan också utforska alla upplevelser.",
      ),
      clear: text("Rensa filter"),
      explore: text("Utforska upplevelser"),
    },
  },
};
