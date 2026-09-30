import type { CSSProperties } from "react";

/**
 * Printer's crop marks around a framed image — the brand's signature detail.
 * Place inside a `relative` wrapper; hidden on the smallest screens where the
 * gutter is too narrow.
 */
export function CropMarks({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const mark = "pointer-events-none absolute bg-on-ink-muted/60";
  return (
    <div aria-hidden="true" className={`hidden sm:block ${className}`} style={style}>
      <span className={`${mark} -top-px -left-7 h-px w-4`} />
      <span className={`${mark} -top-7 -left-px h-4 w-px`} />
      <span className={`${mark} -top-px -right-7 h-px w-4`} />
      <span className={`${mark} -top-7 -right-px h-4 w-px`} />
      <span className={`${mark} -bottom-px -left-7 h-px w-4`} />
      <span className={`${mark} -bottom-7 -left-px h-4 w-px`} />
      <span className={`${mark} -right-7 -bottom-px h-px w-4`} />
      <span className={`${mark} -right-px -bottom-7 h-4 w-px`} />
    </div>
  );
}

export function RegistrationMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="6" />
      <path d="M12 1v22M1 12h22" />
    </svg>
  );
}
