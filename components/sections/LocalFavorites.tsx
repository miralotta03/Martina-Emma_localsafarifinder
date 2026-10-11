import { localFavoritesSection } from "@/content/site";
import { companiesWithProfile } from "@/data/companies";
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

      {/* Alla företag med en egen sida. Mobil/surfplatta: svepbar remsa.
          Desktop: rutnät i Containerns bredd, så att alla kort syns. */}
      <div className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 lg:mx-auto lg:grid lg:max-w-7xl lg:auto-rows-fr lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-10 lg:pb-0">
        {companiesWithProfile.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </section>
  );
}
