import type { ReadyCategory } from "@/data/categories";
import type { Company } from "@/data/companies";
import type { ActivityTypeSlug } from "@/lib/types";
import { categoryPageContent, companiesSectionId } from "@/content/kategori";
import { PageHero } from "./PageHero";
import { ActivityFilter } from "./ActivityFilter";
import { CategoryCompanies } from "./CategoryCompanies";
import { getCategoryActivityPage } from "@/data/categoryActivities";

export function CategoryPage({
  category,
  companies,
  activeActivity,
}: {
  category: ReadyCategory;
  companies: Company[];
  activeActivity: ActivityTypeSlug | null;
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
      <ActivityFilter
        eyebrow={activities.eyebrow}
        heading={activities.heading}
        cardLink={activities.cardLink}
        showAll={activities.showAll}
        activities={category.activities.map((activity) =>
          getCategoryActivityPage(category.slug, activity.slug)
            ? { ...activity, href: `/${category.slug}/${activity.slug}` }
            : activity,
        )}
        active={activeActivity}
      />
      <CategoryCompanies
        heading={category.companiesHeading}
        companies={companies}
        resetHref={`/${category.slug}#${companiesSectionId}`}
      />
    </>
  );
}
