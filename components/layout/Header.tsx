import Image from "next/image";
import Link from "next/link";
import { nav, headerCta } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/icons";
import { MobileMenu } from "./MobileMenu";
import { NavLinkItem, NavParentButton } from "./NavLinkItem";

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
              <div key={item.label} className="group relative">
                <NavParentButton
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-ink hover:text-forest"
                >
                  {item.label}
                  <ChevronDownIcon className="h-4 w-4" />
                </NavParentButton>
                <div className="invisible absolute top-full left-1/2 z-10 w-56 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-ink hover:bg-cream hover:text-forest"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLinkItem
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink hover:text-forest"
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
