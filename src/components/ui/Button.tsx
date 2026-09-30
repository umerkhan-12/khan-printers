import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "gold" | "ghost-on-ink";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-(--ease-soft) " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-text-inverse hover:bg-primary-hover hover:text-accent",
  secondary: "border border-primary/25 text-text-strong hover:border-primary hover:bg-primary hover:text-text-inverse",
  whatsapp: "bg-success text-surface hover:bg-success-hover",
  gold: "bg-accent text-text-strong hover:bg-accent-hover",
  "ghost-on-ink": "border border-text-inverse/30 text-text-inverse hover:border-accent hover:text-accent",
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
