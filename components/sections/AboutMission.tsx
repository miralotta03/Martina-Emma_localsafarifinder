import { aboutMission } from "@/content/om-oss";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function AboutMission() {
  return (
    <section
      className="bg-cream-dark py-16 text-center lg:py-24"
    >
      <Container>
        <Eyebrow className="text-center">{aboutMission.eyebrow}</Eyebrow>
        <p
          className="mx-auto mt-6 max-w-5xl font-serif text-2xl leading-snug text-forest italic sm:text-3xl lg:text-5xl lg:leading-[1.2]"
        >
          {aboutMission.text.map((part, i) => (
            <span
              key={i}
              className={part.highlight ? "text-gold" : undefined}
            >
              {part.text}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
