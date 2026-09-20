import { partnersSection } from "@/content/upplevelser";
import { companies } from "@/data/companies";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CompanyStrip } from "@/components/ui/CompanyStrip";

export function PartnerMarquee() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="bg-cream-dark py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{partnersSection.eyebrow}</Eyebrow>
        <h2
          id="partners-heading"
          className="mt-4 max-w-4xl font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {partnersSection.heading}
        </h2>
      </Container>

      <div className="mt-10 lg:mt-14">
        <CompanyStrip
          companies={companies}
          linkLabel={partnersSection.linkLabel}
        />
      </div>
    </section>
  );
}
