import type { Metadata } from "next";
import { companies } from "@/data/companies";
import { parseCompanySearch } from "@/data/search";
import "@/data/routes";
import { searchContent } from "@/content/sok";
import { format, t } from "@/lib/i18n";
import { searchCompanies } from "@/lib/search";
import {
  SearchResults,
  filterChips,
} from "@/components/search/SearchResults";

const { results } = searchContent;

// Varje filterkombination är en egen URL; de ska inte indexeras, men länkarna
// till företagssidorna ska följas.
export async function generateMetadata({
  searchParams,
}: PageProps<"/sok">): Promise<Metadata> {
  const query = parseCompanySearch(await searchParams);
  const filters = filterChips(query).map((chip) => chip.label);

  return {
    title: filters.length
      ? format(t(results.metaTitleFiltered), { filters: filters.join(", ") })
      : t(results.metaTitle),
    description: t(results.metaDescription),
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps<"/sok">) {
  const query = parseCompanySearch(await searchParams);

  return (
    <SearchResults query={query} companies={searchCompanies(companies, query)} />
  );
}
