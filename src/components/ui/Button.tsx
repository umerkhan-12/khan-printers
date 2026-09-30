import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "gold" | "ghost-on-ink";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-(--ease-soft) " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-on-ink hover:bg-ink-soft hover:text-gold",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-on-ink",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  gold: "bg-gold text-ink hover:bg-on-ink",
  "ghost-on-ink": "border border-on-ink/30 text-on-ink hover:border-gold hover:text-gold",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

/** Link styled as a button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  external,
  ...props
}: CommonProps & ComponentProps<"a"> & { href: string; external?: boolean }) {
  const classes = buttonClasses(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
