import Image from "next/image";
import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/Photo";
import { serviceHref, type Service } from "@/content/services";

type Tone = "paper" | "ink";

type Props = {
  service: Service;
  index: number;
  sizes: string;
  /** Section background the tile sits on. */
  tone?: Tone;
  className?: string;
  /** Image area classes — control aspect ratio / height per layout. */
  mediaClassName?: string;
};

const toneClasses: Record<Tone, { media: string; number: string; title: string; body: string }> = {
  paper: {
    media: "bg-surface-muted",
    number: "text-accent-text",
    title: "text-text-strong group-hover:text-accent-text",
    body: "text-text-muted",
  },
  ink: {
    media: "bg-surface-inverse-raised",
    number: "text-accent",
    title: "text-text-inverse group-hover:text-accent",
    body: "text-text-inverse-muted",
  },
};

/** Catalog tile: photo (or a designed "photo pending" panel), number, title, link. Title sits under the photo, never on it. */
export function ProductTile({ service, index, sizes, tone = "paper", className = "", mediaClassName = "aspect-[4/5]" }: Props) {
  const t = toneClasses[tone];
  return (
    <Link href={serviceHref(service.slug)} className={`group flex flex-col ${className}`}>
      <div className={`relative overflow-hidden rounded-img ${t.media} ${mediaClassName}`}>
        {service.image ? (
          <>
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes={sizes}
              placeholder="blur"
              className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.04]"
            />
            {service.image.sample && <SampleBadge />}
          </>
        ) : (
          <PhotoPending index={index} tone={tone} />
        )}
        <span className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full bg-background text-text-strong shadow-[0_1px_2px_rgb(17_26_58/0.12)] transition-[background-color,transform] duration-300 group-hover:rotate-45 group-hover:bg-accent">
          <ArrowUpRightIcon className="size-4" />
        </span>
      </div>

      <div className="flex items-baseline gap-3 pt-4">
        <span className={`label ${t.number}`}>{String(index).padStart(2, "0")}</span>
        <h3 className={`font-serif text-[1.5rem] leading-tight transition-colors duration-300 lg:text-[1.75rem] ${t.title}`}>
          {service.short}
        </h3>
      </div>
      <p className={`mt-1.5 line-clamp-2 pl-8 text-sm ${t.body}`}>{service.description}</p>
    </Link>
  );
}

/** Designed placeholder for categories still waiting on real photos. */
function PhotoPending({ index, tone }: { index: number; tone: Tone }) {
  const ink = tone === "ink";
  const mark = `absolute h-3 w-3 ${ink ? "border-text-inverse-muted/40" : "border-text-muted/40"}`;
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 border ${ink ? "border-border-inverse" : "border-border"}`}>
      <span aria-hidden="true" className={`font-serif text-[5rem] leading-none italic ${ink ? "text-text-inverse/10" : "text-text-strong/10"}`}>
        {String(index).padStart(2, "0")}
      </span>
      <span className={`label !text-[0.625rem] ${ink ? "text-text-inverse-muted" : "text-text-muted"}`}>Photo coming soon</span>
      <span aria-hidden="true" className={`${mark} top-3 left-3 border-t border-l`} />
      <span aria-hidden="true" className={`${mark} top-3 right-3 border-t border-r`} />
      <span aria-hidden="true" className={`${mark} bottom-3 left-3 border-b border-l`} />
    </div>
  );
}
