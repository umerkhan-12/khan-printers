import Image, { type ImageProps } from "next/image";

import type { Media } from "@/content/media";

type Props = Omit<ImageProps, "src" | "alt"> & {
  media: Media;
  /** Classes for the wrapping frame (sizing, aspect ratio). */
  frameClassName?: string;
};

/**
 * Photo in a trimmed-paper frame. Sample images always carry a visible
 * label so nothing on the site is mistaken for real client work.
 */
export function Photo({ media, frameClassName = "", className = "", ...imageProps }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-img bg-paper-deep ${frameClassName}`}>
      <Image
        src={media.src}
        alt={media.alt}
        placeholder="blur"
        className={`h-full w-full object-cover ${className}`}
        {...imageProps}
      />
      {media.sample && <SampleBadge />}
    </div>
  );
}

export function SampleBadge() {
  return (
    <span className="label pointer-events-none absolute top-3 left-3 rounded-full bg-paper/90 px-2.5 py-1.5 !text-[0.625rem] text-ink">
      Sample image
    </span>
  );
}
