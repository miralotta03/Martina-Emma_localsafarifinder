import Image from "next/image";
import { aboutBeliefs } from "@/content/om-oss";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon } from "@/components/ui/icons";

export function AboutBeliefs() {
  return (
    <section
      aria-labelledby="about-beliefs-heading"
      className="bg-cream py-16 lg:py-28"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-8 border-gold sm:max-w-sm lg:max-w-none">
          <Image
            src={aboutBeliefs.image}
            alt={aboutBeliefs.imageAlt}
            fill
            sizes="(min-width: 1024px) 544px, (min-width: 640px) 384px, 320px"
            className="object-cover"
          />
        </div>

        <div>
          <Eyebrow>{aboutBeliefs.eyebrow}</Eyebrow>
          <h2
            id="about-beliefs-heading"
            className="mt-4 max-w-md font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
          >
            {aboutBeliefs.heading}
          </h2>
          <ul className="mt-8 space-y-5 lg:mt-10 lg:space-y-8">
            {aboutBeliefs.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-lg text-forest sm:text-xl lg:text-2xl"
              >
                <CheckIcon className="mt-1.5 h-5 w-5 shrink-0 lg:h-6 lg:w-6" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
