"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavDropdownLink, NavLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileMenu({
  nav,
  cta,
}: {
  nav: NavDropdownLink[];
  cta: NavLink;
}) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <button
        aria-label={open ? "Stäng meny" : "Öppna meny"}
        onClick={() => setOpen((v) => !v)}
        className="p-1 text-forest"
      >
        {open ? (
          <CloseIcon className="h-7 w-7" />
        ) : (
          <MenuIcon className="h-7 w-7" />
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[73px] bottom-0 z-40 overflow-y-auto bg-cream px-6 py-6">
          <nav className="flex flex-col gap-1">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenSubmenu((cur) =>
                        cur === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between py-3 text-base font-medium text-ink"
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${
                        openSubmenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSubmenu === item.label && (
                    <div className="flex flex-col gap-1 border-l border-forest/15 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="py-2.5 text-sm text-ink/80"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-ink"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Button href={cta.href} className="mt-6 w-full justify-center">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}
