import { localFavoritesSection } from "@/content/site";
import { companies } from "@/content/companies";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CompanyCard } from "@/components/ui/CompanyCard";

export function LocalFavorites() {
  return (
    <section className="bg-cream-dark py-20 lg:py-28">
      <Container>
        <Eyebrow>{localFavoritesSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-forest sm:text-4xl">
          {localFavoritesSection.heading}
        </h2>
        <p className="mt-4 max-w-3xl text-ink/80">
          {localFavoritesSection.body}
        </p>
      </Container>

      <div className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 lg:px-[calc((100vw-80rem)/2+2.5rem)]">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </section>
  );
}
