import Image from "next/image";
import Link from "next/link";
import { nav, headerCta } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { touchTarget } from "@/components/ui/touchTarget";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";
import { NavLinkItem } from "./NavLinkItem";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream">
      <Container className="flex items-center justify-between py-4">
        {/* Logotypfilen (1800×700) har genomskinlig marginal runt själva
            logotypen (1488×402 från x 136, y 149). Rutan har logotypens
            proportioner och bilden flyttas så att bara logotypen syns. */}
        <Link
          href="/"
          className="relative block aspect-[1488/402] h-12 shrink-0 overflow-hidden sm:h-14"
        >
          <Image
            src="/logos/site-logo-with-text.png"
            alt="Local Safari Finder"
            width={1800}
            height={700}
            sizes="(min-width: 640px) 251px, 216px"
            priority
            className="absolute top-[-37.065%] left-[-9.14%] h-auto w-[120.968%] max-w-none"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                href={item.href}
                items={item.children}
              />
            ) : (
              <NavLinkItem
                key={item.href}
                href={item.href}
                className={`text-sm font-medium text-ink hover:text-forest ${touchTarget}`}
              >
                {item.label}
              </NavLinkItem>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href={headerCta.href}>{headerCta.label}</Button>
        </div>

        <MobileMenu nav={nav} cta={headerCta} />
      </Container>
    </header>
  );
}
