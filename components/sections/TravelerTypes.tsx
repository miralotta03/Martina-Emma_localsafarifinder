import { travelerTypesSection } from "@/content/site";
import { travelerTypes } from "@/content/companies";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/Button";
import { TravelerTypeCard } from "@/components/ui/TravelerTypeCard";
import { getCategory, isCategoryReady } from "@/data/categories";

// Kategorier utan innehåll har ingen sida än och länkas inte.
function isLive(slug: string) {
  const category = getCategory(slug);
  return Boolean(category && isCategoryReady(category));
}

export function TravelerTypes() {
  return (
    <section className="bg-cream-dark py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{travelerTypesSection.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-forest sm:text-4xl">
              {travelerTypesSection.heading}
            </h2>
            <p className="mt-4 text-ink/80">{travelerTypesSection.body}</p>
          </div>
          <ArrowLink
            href={travelerTypesSection.cta.href}
            className="text-forest shrink-0"
          >
            {travelerTypesSection.cta.label}
          </ArrowLink>
        </div>

        <div className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {travelerTypes.map((type) => (
            <TravelerTypeCard
              key={type.slug}
              type={type}
              href={isLive(type.slug) ? `/${type.slug}` : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
