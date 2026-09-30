import Link from "next/link";

/**
 * Text wordmark in the logo's style (serif KHAN + spaced PRINTERS, navy + gold),
 * used until the official logo file is added to the repo.
 */
export function Wordmark({ tone = "ink", onClick }: { tone?: "ink" | "paper"; onClick?: () => void }) {
  return (
    <Link
      href="/#top"
      onClick={onClick}
      className={`group inline-flex items-baseline gap-2 ${tone === "ink" ? "text-text-strong" : "text-text-inverse"}`}
      aria-label="Khan Printers — home"
    >
      <span className="font-serif text-[1.625rem] leading-none tracking-tight">Khan</span>
      <span className="label !text-[0.6875rem] !tracking-[0.28em]">Printers</span>
      <span
        aria-hidden="true"
        className="size-1.5 translate-y-[-0.15rem] rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
      />
    </Link>
  );
}
