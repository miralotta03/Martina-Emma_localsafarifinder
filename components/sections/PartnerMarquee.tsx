import { partnersSection } from "@/content/upplevelser";
import { companies } from "@/data/companies";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PartnerCard } from "@/components/ui/PartnerCard";

// Med få företag måste varje halva av loopen upprepa listan så att den
// alltid är bredare än skärmen, annars syns ett tomrum i slingan.
const REPEATS = 3;

function Half({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className={`flex shrink-0 gap-6 pr-6 ${hidden ? "marquee-clone" : ""}`}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        companies.map((company) => (
          <li key={`${r}-${company.slug}`}>
            <PartnerCard
              company={company}
              linkLabel={partnersSection.linkLabel}
            />
          </li>
        )),
      )}
    </ul>
  );
}

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

      <div className="marquee mt-10 overflow-hidden lg:mt-14">
        <div className="marquee-track flex w-max">
          <Half />
          <Half hidden />
        </div>
      </div>
    </section>
  );
}
