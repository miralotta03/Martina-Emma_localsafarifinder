import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, isCategoryReady } from "@/data/categories";
import { companies } from "@/data/companies";
import "@/data/routes";
import { CategoryPage } from "@/components/sections/CategoryPage";

// Kategorier och företag delar toppnivå-URL:er. Allt löses här: sluggen slås
// upp bland kategorier och (senare) företag, annars 404. data/routes.ts ser till
// att en slug aldrig kan tillhöra båda.
export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category || !isCategoryReady(category)) return {};

  return {
    title: `${category.name} – Local Safari Finder`,
    description: category.heroText,
  };
}

export default async function SlugPage({
  params,
  searchParams,
}: PageProps<"/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category || !isCategoryReady(category)) notFound();

  const { aktivitet } = await searchParams;
  const requested = Array.isArray(aktivitet) ? aktivitet[0] : aktivitet;
  // Okända värden ignoreras och ger det oskiftade läget.
  const activeActivity =
    category.activities.find((activity) => activity.slug === requested)?.slug ??
    null;

  const categoryCompanies = companies.filter(
    (company) =>
      company.categories.includes(category.slug) &&
      (!activeActivity || company.activityTypes.includes(activeActivity)),
  );

  return (
    <CategoryPage
      category={category}
      companies={categoryCompanies}
      activeActivity={activeActivity}
    />
  );
}
