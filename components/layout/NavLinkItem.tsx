"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const activeStyle =
  "text-forest underline decoration-gold decoration-2 underline-offset-8";

export function NavLinkItem({
  href,
  className = "",
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const active = isActivePath(usePathname(), href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeStyle : ""}`}
    >
      {children}
    </Link>
  );
}

// Knappen som öppnar en undermeny (Upplevelser) markeras när någon sida under den är aktiv.
export function NavParentButton({
  hrefs,
  className = "",
  children,
}: {
  hrefs: string[];
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = hrefs.some((href) => isActivePath(pathname, href));

  return (
    <button
      aria-current={active ? "true" : undefined}
      className={`${className} ${active ? activeStyle : ""}`}
    >
      {children}
    </button>
  );
}
