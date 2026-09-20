import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PageHero({
  eyebrow,
  heading,
  body,
  image,
  align = "end",
  size = "default",
}: {
  eyebrow: string;
  heading: string | string[];
  body: string;
  image: string;
  align?: "end" | "center";
  size?: "default" | "compact";
}) {
  const lines = Array.isArray(heading) ? heading : [heading];

  return (
    <section
      className={`relative flex overflow-hidden bg-forest-deep ${
        size === "compact"
          ? "min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]"
          : "min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]"
      } ${align === "center" ? "items-center" : "items-end"}`}
    >
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
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.15] text-cream sm:text-5xl lg:text-6xl">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-3xl text-base text-cream/90 sm:text-lg">
          {body}
        </p>
      </Container>
    </section>
  );
}
