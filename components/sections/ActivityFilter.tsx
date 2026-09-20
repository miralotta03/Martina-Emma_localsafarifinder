"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CategoryActivity } from "@/data/categories";
import type { ActivityTypeSlug } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/icons";
import { companiesSectionId } from "@/content/kategori";

// `href` finns när aktiviteten har en egen sida (/{kategori}/{aktivitet}).
export type ActivityCard = CategoryActivity & { href?: string };

export function ActivityFilter({
  eyebrow,
  heading,
  cardLink,
  showAll,
  activities,
  active,
}: {
  eyebrow: string;
  heading: string;
  cardLink: string;
  showAll: string;
  activities: ActivityCard[];
  active: ActivityTypeSlug | null;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function select(slug: ActivityTypeSlug) {
    // Klick på det valda kortet rensar filtret.
    const next = slug === active ? null : slug;
    router.push(next ? `${pathname}?aktivitet=${next}` : pathname, {
      scroll: false,
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById(companiesSectionId)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      aria-labelledby="activity-heading"
      className="bg-cream py-16 lg:py-24"
    >
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id="activity-heading"
              className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h2>
          </div>
          {active && (
            <Link
              href={pathname}
              scroll={false}
              className="text-sm font-medium text-forest underline underline-offset-4 hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {showAll}
            </Link>
          )}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => {
            const pressed = activity.slug === active;
            const content = (
              <>
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
              </>
            );
            const cardClass = `flex h-full w-full cursor-pointer flex-col rounded-3xl border-2 p-8 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
              pressed
                ? "border-gold bg-white"
                : "border-forest/5 bg-white/60 hover:border-gold/60"
            }`;

            return (
              <li key={activity.slug}>
                {activity.href ? (
                  // Aktiviteter med en egen sida är vanliga länkar, inte filter.
                  <Link href={activity.href} className={cardClass}>
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => select(activity.slug)}
                    className={cardClass}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
