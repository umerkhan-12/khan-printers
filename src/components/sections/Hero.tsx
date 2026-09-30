import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, ClockIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Mobile order: message → actions → photo → facts, so the product photo
 * is visible on the first screen. Desktop: text left, photo right.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="container-page pt-6 pb-16 lg:pt-12 lg:pb-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-14 lg:gap-y-10">
        <div className="lg:col-span-6 lg:self-center">
          <p className="label flex items-center gap-3 text-gold-deep">
            <span aria-hidden="true" className="h-px w-8 bg-gold-deep/50" />
            Printing studio · {site.location.city}
          </p>

          <h1 id="hero-title" className="mt-5 font-serif text-display text-ink text-balance lg:mt-6">
            Premium printing, <em className="text-gold-deep">made for your brand.</em>
          </h1>

          <p className="mt-5 max-w-md text-lead text-muted lg:mt-6">
            Business cards, stickers, brochures, wedding cards, banners and branded packaging — professionally printed in{" "}
            {site.location.city}.
          </p>

          <div id="hero-actions" className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:mt-9">
            <ButtonLink href="#quote" variant="primary" className="px-4 sm:px-7">
              Get a Quote
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} external variant="whatsapp" className="px-4 sm:px-7">
              <WhatsAppIcon />
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </ButtonLink>
          </div>

          <a
            href="#work"
            className="group mt-5 hidden min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink sm:inline-flex"
          >
            View our work
            <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="lg:col-span-6 lg:row-span-2">
          <Photo
            media={media.stickersLabels}
            preload
            sizes="(min-width: 1320px) 610px, (min-width: 1024px) 48vw, 100vw"
            frameClassName="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
          />
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-muted lg:col-span-6 lg:self-end">
          <li className="inline-flex items-center gap-2">
            <ClockIcon className="size-4 text-gold-deep" />
            Open {site.hours}
          </li>
          <li className="inline-flex items-center gap-2">
            <PinIcon className="size-4 text-gold-deep" />
            {site.location.city} · {site.fulfilment}
          </li>
        </ul>
      </div>
    </section>
  );
}
