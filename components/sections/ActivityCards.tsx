import Link from "next/link";
import type { CategoryActivity } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/icons";

// Varje aktivitet har en egen sida (/{kategori}/{aktivitet}).
export type ActivityCard = CategoryActivity & { href: string };

export function ActivityCards({
  eyebrow,
  heading,
  cardLink,
  activities,
}: {
  eyebrow: string;
  heading: string;
  cardLink: string;
  activities: ActivityCard[];
}) {
  return (
    <section
      aria-labelledby="activity-heading"
      className="bg-cream py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id="activity-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Link
                href={activity.href}
                className="flex h-full w-full flex-col rounded-3xl border-2 border-forest/5 bg-white/60 p-8 transition-colors hover:border-gold/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <span className="font-serif text-xl text-forest lg:text-2xl">
                  {activity.title}
                </span>
                <span className="mt-3 text-base text-forest/90">
                  {activity.description}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-gold">
                  {cardLink}
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
