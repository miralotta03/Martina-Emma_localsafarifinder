import type { Company } from "@/data/companies";
import { categoryPageContent } from "@/content/kategori";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/Button";
import { CompanyStrip } from "@/components/ui/CompanyStrip";

// Färre företag än så visas som en statisk, centrerad rad i stället för en loop.
const LOOP_FROM = 5;

export function ActivityCompanies({
  heading,
  backLabel,
  backHref,
  companies,
}: {
  heading: string;
  backLabel: string;
  backHref: string;
  companies: Company[];
}) {
  const { companies: text } = categoryPageContent;

  return (
    <section
      aria-labelledby="activity-companies-heading"
      className="bg-cream py-16 lg:py-24"
    >
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="activity-companies-heading"
          className="font-serif text-3xl text-forest sm:text-4xl"
        >
          {heading}
        </h2>
        <ArrowLink
          href={backHref}
          className="shrink-0 font-normal text-gold hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {backLabel}
        </ArrowLink>
      </Container>

      <div className="mt-10 lg:mt-14">
        {companies.length > 0 ? (
          <CompanyStrip
            companies={companies}
            linkLabel={text.readMore}
            staticBelow={LOOP_FROM}
          />
        ) : (
          <Container>
            <p className="font-serif text-2xl text-forest sm:text-center">
              {text.emptyTitle}
            </p>
          </Container>
        )}
      </div>
    </section>
  );
}
