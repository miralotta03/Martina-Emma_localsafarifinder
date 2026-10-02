import { searchContent } from "@/content/sok";
import { format, t } from "@/lib/i18n";
import {
  buildDestinationOptions,
  parseSearchParams,
  type RawSearchParams,
  type SearchQuery,
  type SearchVocabulary,
} from "@/lib/search";
import { categories, defaultActivities } from "./categories";
import { companies } from "./companies";

// Allt sökrutan och /sok behöver, byggt från datan. Ett nytt företag med
// destinations syns här utan kodändringar.
export const searchVocabulary: SearchVocabulary = {
  destinations: buildDestinationOptions(companies),
  travelTypes: categories.map((category) => category.slug),
  activities: defaultActivities.map((activity) => activity.slug),
};

export type SearchOption = { value: string; label: string };

// Det sökrutan (en klientkomponent) får som props, i stället för hela datan.
export type SearchFormOptions = {
  destinations: {
    country: string;
    options: (SearchOption & { selectedLabel: string })[];
  }[];
  travelTypes: SearchOption[];
  activities: SearchOption[];
};

const { form, travelTypeLabels } = searchContent;

export const searchFormOptions: SearchFormOptions = {
  destinations: searchVocabulary.destinations.map((d) => {
    const whole = format(t(form.destination.wholeCountry), {
      country: d.country,
    });
    return {
      country: d.country,
      options: [
        { value: d.slug, label: whole, selectedLabel: whole },
        ...d.cities.map((c) => ({
          value: c.slug,
          label: c.city,
          selectedLabel: format(t(form.destination.city), {
            country: d.country,
            city: c.city,
          }),
        })),
      ],
    };
  }),
  travelTypes: searchVocabulary.travelTypes.map((slug) => ({
    value: slug,
    label: t(travelTypeLabels[slug]),
  })),
  activities: defaultActivities.map((activity) => ({
    value: activity.slug,
    label: activity.title,
  })),
};

export function parseCompanySearch(raw: RawSearchParams): SearchQuery {
  return parseSearchParams(raw, searchVocabulary);
}

export function destinationLabel(slug: string): string | undefined {
  return searchFormOptions.destinations
    .flatMap((group) => group.options)
    .find((option) => option.value === slug)?.selectedLabel;
}

export function activityLabel(slug: string): string {
  return (
    defaultActivities.find((activity) => activity.slug === slug)?.title ?? slug
  );
}
