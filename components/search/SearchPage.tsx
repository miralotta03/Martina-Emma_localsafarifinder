"use client";

import { useSearchParams } from "next/navigation";
import { companies } from "@/data/companies";
import { parseCompanySearch } from "@/data/search";
import { searchCompanies, type RawSearchParams } from "@/lib/search";
import { SearchResults } from "./SearchResults";

// /sok är en statisk sida, så sökningen görs i webbläsaren utifrån URL:en
// (samma tolkning och filtrering som tidigare gjordes på servern).
export function SearchPage() {
  const params = useSearchParams();

  const raw: RawSearchParams = {};
  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    raw[key] = values.length === 1 ? values[0] : values;
  }
  const query = parseCompanySearch(raw);

  return (
    <SearchResults
      query={query}
      companies={searchCompanies(companies, query)}
    />
  );
}
