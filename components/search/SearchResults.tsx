import Link from "next/link";
import type { Company } from "@/data/companies";
import {
  activityLabel,
  destinationLabel,
  searchFormOptions,
} from "@/data/search";
import { searchContent } from "@/content/sok";
import { format, t } from "@/lib/i18n";
import { toSearchHref, type SearchQuery } from "@/lib/search";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink, Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";
import { SearchForm } from "./SearchForm";
import { CompanyResultCard } from "./CompanyResultCard";

type Chip = { key: string; label: string; href: string };

// Ett chip per valt filter. Länken går till samma sökning utan just det värdet,
// så att chipsen fungerar även utan JavaScript.
export function filterChips(query: SearchQuery): Chip[] {
  const { travelTypeLabels } = searchContent;
  const chips: Chip[] = [];
  if (query.destination) {
    chips.push({
      key: "destination",
      label: destinationLabel(query.destination) ?? query.destination,
      href: toSearchHref({ ...query, destination: undefined }),
    });
  }
  if (query.typ) {
    chips.push({
      key: "typ",
      label: t(travelTypeLabels[query.typ]),
      href: toSearchHref({ ...query, typ: undefined }),
    });
  }
  for (const activity of query.aktiviteter ?? []) {
    chips.push({
      key: `aktivitet-${activity}`,
      label: activityLabel(activity),
      href: toSearchHref({
        ...query,
        aktiviteter: query.aktiviteter?.filter((a) => a !== activity),
      }),
    });
  }
  return chips;
}

export function SearchResults({
  query,
  companies,
}: {
  query: SearchQuery;
  companies: Company[];
}) {
  const { results } = searchContent;
  const chips = filterChips(query);

  return (
    <>
      <section className="bg-forest-deep pt-14 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <Eyebrow className="!text-gold-light">{t(results.eyebrow)}</Eyebrow>
          <h1 className="mt-4 font-serif text-3xl text-cream sm:text-4xl lg:text-5xl">
            {t(results.heading)}
          </h1>
          <div className="mt-8">
            {/* Ny nyckel per sökning, så att fälten följer URL:en vid bakåt/framåt. */}
            <SearchForm
              key={toSearchHref(query)}
              options={searchFormOptions}
              initial={query}
              variant="compact"
            />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="search-results-heading"
        className="bg-cream-dark py-12 lg:py-16"
      >
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <h2
              id="search-results-heading"
              aria-live="polite"
              className="font-serif text-2xl text-forest sm:text-3xl"
            >
              {format(t(results.count), { count: companies.length })}
            </h2>
            {chips.length > 0 && (
              <ul
                aria-label={t(results.activeFilters)}
                className="flex flex-wrap gap-2"
              >
                {chips.map((chip) => (
                  <li key={chip.key}>
                    {/* ::after ger 44 px hög tryckyta utan att chipet växer. */}
                    <Link
                      href={chip.href}
                      aria-label={format(t(results.removeFilter), {
                        label: chip.label,
                      })}
                      className="relative inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-cream py-1.5 pr-2.5 pl-4 after:absolute after:inset-x-0 after:-inset-y-[5px] after:content-[''] text-sm text-forest transition-colors hover:border-forest/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {chip.label}
                      <CloseIcon className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {companies.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <li key={company.slug}>
                  <CompanyResultCard company={company} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 max-w-xl rounded-2xl bg-cream p-8">
              <p className="font-serif text-2xl text-forest">
                {t(results.empty.heading)}
              </p>
              <p className="mt-3 text-ink/80">{t(results.empty.body)}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Button href="/sok" variant="forest">
                  {t(results.empty.clear)}
                </Button>
                <ArrowLink
                  href="/upplevelser"
                  className="text-forest hover:text-gold-dark"
                >
                  {t(results.empty.explore)}
                </ArrowLink>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
