import { Suspense } from "react";
import type { Metadata } from "next";
import "@/data/routes";
import { searchContent } from "@/content/sok";
import { t } from "@/lib/i18n";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchPage } from "@/components/search/SearchPage";

const { results } = searchContent;

// Varje filterkombination är en egen URL; de ska inte indexeras, men länkarna
// till företagssidorna ska följas.
export const metadata: Metadata = {
  title: t(results.metaTitle),
  description: t(results.metaDescription),
  robots: { index: false, follow: true },
};

// Statisk sida: sökningen läses från URL:en och filtreras i webbläsaren
// (components/search/SearchPage.tsx). Den förrenderade HTML:en visar
// sökfältet utan resultat tills dess.
export default function SearchRoute() {
  return (
    <Suspense fallback={<SearchResults query={{}} companies={[]} pending />}>
      <SearchPage />
    </Suspense>
  );
}
