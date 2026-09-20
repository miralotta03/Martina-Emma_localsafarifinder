export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.2em] text-gold uppercase ${className}`}
    >
      {children}
    </p>
  );
}
