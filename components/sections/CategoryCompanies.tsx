import type { Company } from "@/data/companies";
import { categoryPageContent } from "@/content/kategori";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CompanyStrip } from "@/components/ui/CompanyStrip";

// Färre företag än så visas som en statisk, centrerad rad i stället för en loop.
const LOOP_FROM = 5;

export function CategoryCompanies({
  heading,
  companies,
}: {
  heading: string;
  companies: Company[];
}) {
  const { companies: text } = categoryPageContent;

  return (
    <section
      aria-labelledby="companies-heading"
      className="bg-cream-dark py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{text.eyebrow}</Eyebrow>
        <h2
          id="companies-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>
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
