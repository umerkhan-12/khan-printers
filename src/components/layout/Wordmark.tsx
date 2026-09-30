import Image from "next/image";
import Link from "next/link";

import logoBadge from "@/assets/brand/logo-badge.png";

/**
 * Official circular logo badge + the name in live text, styled like the logo
 * (serif KHAN in navy, spaced PRINTERS in gold). The badge alone is too
 * detailed to read at header size, so the name is always real text beside it.
 */
export function Wordmark({ tone = "ink", onClick }: { tone?: "ink" | "paper"; onClick?: () => void }) {
  const onPaper = tone === "ink";
  return (
    <Link
      href="/#top"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 ${onPaper ? "text-text-strong" : "text-text-inverse"}`}
      aria-label="Khan Printers — home"
    >
      <LogoBadge className="size-10 transition-transform duration-300 group-hover:rotate-[-6deg] lg:size-11" />
      <span className="inline-flex items-baseline gap-2">
        <span className="font-serif text-[1.625rem] leading-none tracking-tight">Khan</span>
        <span className={`label !text-[0.6875rem] !tracking-[0.28em] ${onPaper ? "text-accent-text" : "text-accent"}`}>
          Printers
        </span>
      </span>
    </Link>
  );
}

/** The client's logo badge (decorative wherever the name is also shown as text). */
export function LogoBadge({ className = "", sizes = "48px" }: { className?: string; sizes?: string }) {
  return <Image src={logoBadge} alt="" sizes={sizes} className={`shrink-0 rounded-full ${className}`} />;
}
