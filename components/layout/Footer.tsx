import Link from "next/link";
import { footer, footerColumns } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-forest text-cream">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="font-serif text-2xl">{footer.brand}</h2>
          <p className="mt-4 max-w-sm text-sm text-cream/75">{footer.about}</p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="font-serif text-lg">{column.heading}</h3>
            {/* Under lg: hela raden (44 px) är tryckbar. Från lg ser det ut som
                förut, och ::after fyller mellanrummet (32 px tryckyta). */}
            <ul className="mt-4 lg:space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-cream/80 hover:text-cream lg:relative lg:inline lg:py-0 lg:after:absolute lg:after:inset-x-0 lg:after:-inset-y-1.5 lg:after:content-['']"
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
