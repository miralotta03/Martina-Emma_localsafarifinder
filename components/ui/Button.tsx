import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import { touchTarget } from "./touchTarget";

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: string;
  variant?: "solid" | "outline" | "forest";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const variants = {
    solid: "bg-gold text-forest-deep hover:bg-gold-dark",
    outline:
      "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
    forest: "bg-forest text-cream hover:bg-forest-deep",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

// Övriga data-*-attribut (t.ex. data-track-event för Umami) hamnar på länken.
type DataAttributes = { [key: `data-${string}`]: string | undefined };

export function ArrowLink({
  href,
  children,
  className = "",
  ...data
}: {
  href: string;
  children: string;
  className?: string;
} & DataAttributes) {
  return (
    <Link
      {...data}
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3 ${touchTarget} ${className}`}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}
