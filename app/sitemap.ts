import type { MetadataRoute } from "next";
import { categories, isCategoryReady } from "@/data/categories";
import { categoryActivityPages } from "@/data/categoryActivities";
import { companiesWithProfile } from "@/data/companies";

import { siteUrl } from "@/content/site";

// Skrivs till out/sitemap.xml vid bygget. Samma källor som sidornas
// generateStaticParams, så nya företag och kategorier kommer med automatiskt.
// /sok är inte med: sökresultaten ska inte indexeras.
export const dynamic = "force-static";

const staticPages = [
  "/",
  "/upplevelser",
  "/om-oss",
  "/kontakta-oss",
  "/for-foretag",
  "/integritetspolicy",
  "/anvandarvillkor",
  "/cookiepolicy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPages,
    ...categories.filter(isCategoryReady).map(({ slug }) => `/${slug}`),
    ...categoryActivityPages.map(
      ({ category, activity }) => `/${category}/${activity}`,
    ),
    ...companiesWithProfile.map(({ slug }) => `/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
  }));
}
