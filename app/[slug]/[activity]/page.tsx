import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryActivityPages,
  getCategoryActivityPage,
} from "@/data/categoryActivities";
import { companies } from "@/data/companies";
import "@/data/routes";
import { CategoryActivityPage } from "@/components/sections/CategoryActivityPage";

// /{kategori}/{aktivitet} har två segment och kan därför aldrig krocka med
// kategorisidorna eller företagssidorna (ett segment). Bara kombinationer i
// data/categoryActivities.ts finns; allt annat är 404.
export function generateStaticParams() {
  return categoryActivityPages.map(({ category, activity }) => ({
    slug: category,
    activity,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]/[activity]">): Promise<Metadata> {
  const { slug, activity } = await params;
  const page = getCategoryActivityPage(slug, activity);
  if (!page) return {};

  return {
    title: `${page.heading} – Local Safari Finder`,
    description: page.heroText,
  };
}

export default async function CategoryActivityRoute({
  params,
}: PageProps<"/[slug]/[activity]">) {
  const { slug, activity } = await params;
  const page = getCategoryActivityPage(slug, activity);
  if (!page) notFound();

  const pageCompanies = companies.filter(
    (company) =>
      company.categories.includes(page.category) &&
      company.activityTypes.includes(page.activity),
  );

  return <CategoryActivityPage page={page} companies={pageCompanies} />;
}
