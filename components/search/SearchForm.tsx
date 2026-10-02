import Form from "next/form";
import { searchContent } from "@/content/sok";
import type { SearchFormOptions } from "@/data/search";
import { t } from "@/lib/i18n";
import { searchParamNames, type SearchQuery } from "@/lib/search";
import { CompassIcon, PinIcon, UserIcon } from "@/components/ui/icons";
import { SearchSelect } from "./SearchSelect";
import { SearchMultiSelect } from "./SearchMultiSelect";

const layouts = {
  // Startsidan: två fält på första raden, det tredje och Sök under (skissen).
  hero: {
    panel:
      "rounded-3xl bg-cream p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] sm:p-6",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4",
    last: "sm:col-span-2",
  },
  // Resultatsidan: allt på en rad på stora skärmar.
  compact: {
    panel: "rounded-2xl bg-cream p-3 shadow-lg sm:p-4",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[1fr_1fr_1.6fr]",
    last: "sm:col-span-2 lg:col-span-1",
  },
};

// GET-formulär till /sok. Utan JS skickas de native fälten; med JS sker
// navigeringen på klientsidan (next/form) och historiken fungerar som vanligt.
export function SearchForm({
  options,
  initial = {},
  variant = "hero",
}: {
  options: SearchFormOptions;
  initial?: SearchQuery;
  variant?: keyof typeof layouts;
}) {
  const { form } = searchContent;
  const layout = layouts[variant];

  return (
    <Form
      action="/sok"
      role="search"
      aria-label={t(form.ariaLabel)}
      className={layout.panel}
    >
      <div className={layout.grid}>
        <SearchSelect
          name={searchParamNames.destination}
          label={t(form.destination.label)}
          allLabel={t(form.destination.all)}
          icon={<PinIcon />}
          groups={options.destinations.map((group) => ({
            label: group.country,
            options: group.options,
          }))}
          defaultValue={initial.destination}
        />
        <SearchSelect
          name={searchParamNames.typ}
          label={t(form.travelType.label)}
          allLabel={t(form.travelType.all)}
          icon={<UserIcon />}
          groups={[{ options: options.travelTypes }]}
          defaultValue={initial.typ}
        />
        <div className={`flex flex-col gap-3 sm:flex-row sm:gap-4 ${layout.last}`}>
          <SearchMultiSelect
            name={searchParamNames.aktiviteter}
            label={t(form.activities.label)}
            selectedCountLabel={t(form.activities.selectedCount)}
            icon={<CompassIcon />}
            options={options.activities}
            defaultValue={initial.aktiviteter}
            className="min-w-0 flex-1"
          />
          <button
            type="submit"
            className="inline-flex h-14 w-full shrink-0 cursor-pointer items-center justify-center rounded-full bg-gold px-10 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:w-auto"
          >
            {t(form.submit)}
          </button>
        </div>
      </div>
    </Form>
  );
}
