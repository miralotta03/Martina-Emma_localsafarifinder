import Link from "next/link";
import { footer, footerColumns } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-forest text-cream">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="font-serif text-2xl">{footer.brand}</h2>
          <p className="mt-4 max-w-sm text-sm text-cream/75">
            {footer.about}
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="font-serif text-lg">{column.heading}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-cream/15">
        <Container className="flex flex-col gap-3 py-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
