"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/Photo";
import type { PortfolioItem } from "@/content/portfolio";

const tileLayout: Record<PortfolioItem["layout"], { className: string; sizes: string }> = {
  feature: {
    className: "col-span-2 aspect-[3/2] lg:col-span-8 lg:row-span-4 lg:aspect-auto",
    sizes: "(min-width: 1024px) 66vw, 100vw",
  },
  tall: {
    className: "aspect-[4/5] lg:col-span-4 lg:row-span-4 lg:aspect-auto",
    sizes: "(min-width: 1024px) 33vw, 50vw",
  },
  third: {
    className: "aspect-[4/5] lg:col-span-4 lg:row-span-3 lg:aspect-auto",
    sizes: "(min-width: 1024px) 33vw, 50vw",
  },
  wide: {
    className: "col-span-2 aspect-[16/9] lg:col-span-8 lg:row-span-3 lg:aspect-auto",
    sizes: "(min-width: 1024px) 66vw, 100vw",
  },
  full: {
    className: "col-span-2 aspect-[3/2] lg:col-span-12 lg:row-span-5 lg:aspect-auto",
    sizes: "100vw",
  },
  half: {
    className: "aspect-[4/5] sm:aspect-[4/3] lg:col-span-6 lg:row-span-3 lg:aspect-auto",
    sizes: "50vw",
  },
};

export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[7.5rem] lg:grid-cols-12 lg:gap-5">
        {items.map((item, i) => {
          const layout = tileLayout[item.layout];
          return (
            <li key={item.id} className={`relative ${layout.className}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group absolute inset-0 overflow-hidden rounded-img bg-paper-deep text-left"
                aria-label={`View larger: ${item.category}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={layout.sizes}
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.03]"
                />
                {item.sample && <SampleBadge />}
                <span className="label absolute bottom-3 left-3 rounded-full bg-paper/90 px-2.5 py-1.5 !text-[0.625rem] text-ink">
                  {item.category}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ExpandIcon className="size-4" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox items={items} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}

function Lightbox({
  items,
  index,
  onChange,
}: {
  items: PortfolioItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  const step = useCallback(
    (delta: number) => onChange(index === null ? null : (index + delta + count) % count),
    [index, count, onChange],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const item = index === null ? null : items[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Project image viewer"
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
      className="on-ink m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-on-ink open:flex open:flex-col"
    >
      {item && (
        <>
          <div className="container-page flex h-16 shrink-0 items-center justify-between">
            <p className="label text-on-ink-muted" aria-live="polite">
              {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="-mr-2 inline-flex size-11 items-center justify-center hover:text-gold"
              aria-label="Close image viewer"
              autoFocus
            >
              <CloseIcon className="size-6" />
            </button>
          </div>

          <figure
            className="relative mx-4 min-h-0 flex-1 sm:mx-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) onChange(null);
            }}
          >
            <Image
              key={item.id}
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-contain"
            />
            <figcaption className="sr-only">{item.alt}</figcaption>
          </figure>

          <div className="container-page flex shrink-0 items-center justify-between gap-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => step(-1)}
              className="inline-flex size-12 items-center justify-center rounded-full border border-line-on-ink hover:border-gold hover:text-gold"
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <div className="text-center">
              <p className="font-serif text-2xl">{item.category}</p>
              {item.sample && <p className="text-sm text-on-ink-muted">Sample image</p>}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="inline-flex size-12 items-center justify-center rounded-full border border-line-on-ink hover:border-gold hover:text-gold"
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
