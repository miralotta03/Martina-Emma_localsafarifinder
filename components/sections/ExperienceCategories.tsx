import { experienceCategories } from "@/content/upplevelser";
import { Container } from "@/components/ui/Container";
import { CategoryCard } from "@/components/ui/CategoryCard";

export function ExperienceCategories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-cream py-16 lg:py-28"
    >
      <Container>
        <h2 id="categories-heading" className="sr-only">
          {experienceCategories.heading}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {experienceCategories.items.map((item) => (
            <li key={item.href}>
              <CategoryCard
                {...item}
                linkLabel={experienceCategories.linkLabel}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
