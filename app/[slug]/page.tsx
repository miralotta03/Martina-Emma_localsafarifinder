import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, isCategoryReady } from "@/data/categories";
import { companies } from "@/data/companies";
import "@/data/routes";
import { CategoryPage } from "@/components/sections/CategoryPage";

// Kategorier och företag delar toppnivå-URL:er. Allt löses här: sluggen slås
// upp bland kategorier och (senare) företag, annars 404. data/routes.ts ser till
// att en slug aldrig kan tillhöra båda.
export function generateStaticParams() {
  return categories
    .filter(isCategoryReady)
    .map((category) => ({ slug: category.slug }));
}

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

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category || !isCategoryReady(category)) notFound();

  const categoryCompanies = companies.filter((company) =>
    company.categories.includes(category.slug),
  );

  return <CategoryPage category={category} companies={categoryCompanies} />;
}
