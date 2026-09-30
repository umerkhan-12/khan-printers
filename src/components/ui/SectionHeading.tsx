import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  children?: ReactNode;
  tone?: "paper" | "ink";
  className?: string;
};

/** Numbered editorial heading: "01 — Our Work" + serif title + optional intro. */
export function SectionHeading({ index, eyebrow, title, id, children, tone = "paper", className = "" }: Props) {
  const onInk = tone === "ink";
  return (
    <header className={`max-w-3xl ${className}`}>
      <p className={`label flex items-center gap-3 ${onInk ? "text-gold" : "text-gold-deep"}`}>
        <span>{index}</span>
        <span aria-hidden="true" className={`h-px w-8 ${onInk ? "bg-gold/60" : "bg-gold-deep/50"}`} />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className={`mt-5 font-serif text-h2 text-balance ${onInk ? "text-on-ink" : "text-ink"}`}>
        {title}
      </h2>
      {children && (
        <div className={`mt-5 max-w-xl text-lead ${onInk ? "text-on-ink-muted" : "text-muted"}`}>{children}</div>
      )}
    </header>
  );
}
