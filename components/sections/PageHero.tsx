import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PageHero({
  eyebrow,
  heading,
  body,
  image,
}: {
  eyebrow: string;
  heading: string[];
  body: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[480px] items-end overflow-hidden bg-forest-deep sm:min-h-[560px] lg:min-h-[620px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-forest-deep/20" />

      <Container className="relative pt-24 pb-14 lg:pb-20">
        <Eyebrow className="!text-gold-light">{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl leading-[1.15] text-cream sm:text-5xl lg:text-6xl">
          {heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-base text-cream/90 sm:text-lg">
          {body}
        </p>
      </Container>
    </section>
  );
}
