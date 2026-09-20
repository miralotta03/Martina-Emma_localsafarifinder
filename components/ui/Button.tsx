import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const variants = {
    solid: "bg-gold text-forest-deep hover:bg-gold-dark",
    outline:
      "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all ${className}`}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}
