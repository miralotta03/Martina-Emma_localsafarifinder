import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, isCategoryReady } from "@/data/categories";
import {
  companies,
  companiesWithProfile,
  getCompanyWithProfile,
} from "@/data/companies";
import "@/data/routes";
import { CategoryPage } from "@/components/sections/CategoryPage";
import { CompanyPage } from "@/components/company/CompanyPage";
import { t } from "@/lib/i18n";

// Kategorier och företag delar toppnivå-URL:er. Allt löses här: sluggen slås
// upp bland kategorier och företag med profil, annars 404. data/routes.ts ser
// till att en slug aldrig kan tillhöra båda.
export function generateStaticParams() {
  return [
    ...categories
      .filter(isCategoryReady)
      .map((category) => ({ slug: category.slug })),
    ...companiesWithProfile.map((company) => ({ slug: company.slug })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category && isCategoryReady(category)) {
    return {
      title: `${category.name} – Local Safari Finder`,
      description: category.heroText,
    };
  }

  // Ingen OG-bild än: inga bilder finns. Läggs till när heroImage.src finns.
  const company = getCompanyWithProfile(slug);
  if (company) {
    return {
      title: `${company.profile.pageName} – Local Safari Finder`,
      description: t(company.profile.heroIntro),
    };
  }

  return {};
}

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category || !isCategoryReady(category)) {
    const company = getCompanyWithProfile(slug);
    if (!company) notFound();
    return <CompanyPage company={company} />;
  }

  const categoryCompanies = companies.filter((company) =>
    company.categories.includes(category.slug),
  );

  return <CategoryPage category={category} companies={categoryCompanies} />;
}
