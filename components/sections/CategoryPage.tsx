import type { ReadyCategory } from "@/data/categories";
import type { Company } from "@/data/companies";
import { categoryPageContent } from "@/content/kategori";
import { PageHero } from "./PageHero";
import { ActivityCards } from "./ActivityCards";
import { CategoryCompanies } from "./CategoryCompanies";

export function CategoryPage({
  category,
  companies,
}: {
  category: ReadyCategory;
  companies: Company[];
}) {
  const { activities } = categoryPageContent;

  return (
    <>
      <PageHero
        eyebrow={category.label}
        heading={category.name}
        body={category.heroText}
        image={category.image}
        size="compact"
      />
      <ActivityCards
        eyebrow={activities.eyebrow}
        heading={activities.heading}
        cardLink={activities.cardLink}
        activities={category.activities.map((activity) => ({
          ...activity,
          href: `/${category.slug}/${activity.slug}`,
        }))}
      />
      <CategoryCompanies
        heading={category.companiesHeading}
        companies={companies}
      />
    </>
  );
}
