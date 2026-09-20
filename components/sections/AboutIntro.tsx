import Image from "next/image";
import { aboutIntro } from "@/content/om-oss";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function AboutIntro() {
  return (
    <section
      aria-labelledby="about-intro-heading"
      className="bg-cream py-16 lg:py-28"
    >
      <Container>
        <Eyebrow>{aboutIntro.eyebrow}</Eyebrow>
        <h2
          id="about-intro-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {aboutIntro.heading}
        </h2>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
          <div className="space-y-6 text-base text-forest lg:text-lg">
            <p>{aboutIntro.lead}</p>
            {aboutIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full max-lg:order-first sm:max-w-sm lg:max-w-none">
            <Image
              src={aboutIntro.image}
              alt={aboutIntro.imageAlt}
              fill
              sizes="(min-width: 1024px) 544px, (min-width: 640px) 384px, 320px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
