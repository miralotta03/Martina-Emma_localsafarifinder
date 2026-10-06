"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/types";
import { ChevronDownIcon } from "@/components/ui/icons";
import { touchTarget } from "@/components/ui/touchTarget";
import { NavParentButton } from "./NavLinkItem";

// Undermenyn i desktopnavigeringen. Öppnas vid hover (mus) som förut, men
// också med klick/tap och tangentbord, så att den fungerar på surfplattor i
// liggande läge (som saknar hover) och utan mus. Stängs med Esc, klick
// utanför eller när fokus lämnar menyn.
export function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="group relative"
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <NavParentButton
        hrefs={[href, ...items.map((item) => item.href)]}
        expanded={open}
        controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`flex cursor-pointer items-center gap-1 text-sm font-medium text-ink hover:text-forest ${touchTarget}`}
      >
        {label}
        {/* Pilen vänds när menyn är öppen (hover, tap eller tangentbord). */}
        <ChevronDownIcon
          className={`h-4 w-4 transition-[rotate] duration-200 ease-out group-hover:rotate-180 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </NavParentButton>
      {/* Panelen tonar in och glider ner; visibility gör den oklickbar och
          osynlig för skärmläsare när den är stängd. */}
      <div
        id={panelId}
        className={`absolute top-full left-1/2 z-10 w-56 -translate-x-1/2 pt-3 transition-[opacity,translate,visibility] duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm text-ink hover:bg-cream hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
