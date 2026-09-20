import Image from "next/image";
import { hero } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-forest-deep lg:min-h-[760px]">
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/40" />

      <Container className="relative py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.15] text-cream sm:text-5xl lg:text-6xl">
            {hero.heading.map((part, i) => (
              <span
                key={i}
                className={part.highlight ? "text-gold-light" : undefined}
              >
                {part.text}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base text-cream/85 sm:text-lg">
            {hero.body}
          </p>
          <Button href={hero.cta.href} className="mt-8">
            {hero.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
