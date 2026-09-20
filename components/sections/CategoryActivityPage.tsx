import type { CategoryActivityPageData } from "@/data/categoryActivities";
import type { Company } from "@/data/companies";
import { PageHero } from "./PageHero";
import { ActivityCompanies } from "./ActivityCompanies";

// Mall för /{kategori}/{aktivitet}. All text och bild kommer från `page`.
export function CategoryActivityPage({
  page,
  companies,
}: {
  page: CategoryActivityPageData;
  companies: Company[];
}) {
  return (
    <>
      <PageHero
        eyebrow={page.label}
        heading={page.heading}
        body={page.heroText}
        image={page.image}
      />
      <ActivityCompanies
        heading={page.companiesHeading}
        backLabel={page.backLabel}
        backHref={`/${page.category}`}
        companies={companies}
      />
    </>
  );
}
