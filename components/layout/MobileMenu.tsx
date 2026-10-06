"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { NavDropdownLink, NavLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NavLinkItem } from "./NavLinkItem";

export function MobileMenu({
  nav,
  cta,
}: {
  nav: NavDropdownLink[];
  cta: NavLink;
}) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Medan menyn är öppen: sidan bakom ska inte scrolla, och Esc stänger.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        aria-label={open ? "Stäng meny" : "Öppna meny"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-1 flex h-11 w-11 items-center justify-center text-forest"
      >
        {open ? (
          <CloseIcon className="h-7 w-7" />
        ) : (
          <MenuIcon className="h-7 w-7" />
        )}
      </button>

      {open && (
        // Börjar precis under headern (80 px, 88 px från sm).
        <div
          id={menuId}
          className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-cream px-6 py-6 motion-safe:animate-[slide-down-in_200ms_ease-out] sm:top-22"
        >
          <nav className="flex flex-col gap-1">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    aria-expanded={openSubmenu === item.label}
                    onClick={() =>
                      setOpenSubmenu((cur) =>
                        cur === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between py-3 text-base font-medium text-ink"
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-[rotate] duration-200 ease-out motion-reduce:transition-none ${
                        openSubmenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Fälls ut på höjden (0fr → 1fr). Stängd är den inert, så
                      länkarna varken syns, går att tabba till eller läses upp. */}
                  <div
                    inert={openSubmenu !== item.label}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      openSubmenu === item.label
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 border-l border-forest/15 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="py-3 text-sm text-ink/80"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLinkItem
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-ink"
                >
                  {item.label}
                </NavLinkItem>
              ),
            )}
          </nav>
          {/* Länkarna navigerar inom samma layout, så menyn stängs vid klick. */}
          <div onClick={() => setOpen(false)}>
            <Button href={cta.href} className="mt-6 w-full justify-center">
              {cta.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
