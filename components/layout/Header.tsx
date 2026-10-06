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
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="Local Safari Finder"
            width={56}
            height={56}
            className="h-12 w-12 sm:h-14 sm:w-14"
            priority
          />
          <span className="font-serif leading-tight text-forest">
            <span className="block text-xl sm:text-2xl">Local Safari</span>
            <span className="block text-xs font-semibold tracking-[0.3em]">
              FINDER
            </span>
          </span>
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
