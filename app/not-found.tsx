import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink, Button } from "@/components/ui/Button";

// 404-sidan. I den statiska exporten blir den out/404.html, som Cloudflare
// visar för alla okända sökvägar (not_found_handling i wrangler.jsonc).
export const metadata: Metadata = {
  title: "Sidan hittades inte – Local Safari Finder",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl text-forest sm:text-5xl">
            Sidan hittades inte
          </h1>
          <p className="mt-6 text-ink/85 sm:text-lg">
            Sidan du letar efter finns inte, eller har flyttats. Hitta tillbaka
            till startsidan eller utforska de lokala safariföretagen.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Button href="/" variant="forest">
              Till startsidan
            </Button>
            <ArrowLink
              href="/upplevelser"
              className="text-forest hover:text-gold-dark"
            >
              Utforska upplevelser
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
