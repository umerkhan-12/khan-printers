import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/Photo";
import { CropMarks, RegistrationMark } from "@/components/ui/PrintMarks";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { LogoBadge } from "@/components/layout/Wordmark";
import { media } from "@/content/media";
import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const heroImage = media.weddingCards;
const insetImage = media.cardsGoldGeometric;

/** Cycles in the headline. The first word is what search engines and screen readers get. */
const headlineWords = ["brand.", "mehndi.", "nikah.", "walima.", "shop.", "big day."];

/**
 * Full-screen "ink" hero. Entrance motion is pure CSS (see .hero-* in
 * globals.css), so it runs before hydration and respects reduced motion.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-ink relative flex flex-col overflow-hidden bg-surface-inverse text-text-inverse lg:min-h-[calc(100svh-4.5rem)]"
    >
      <div className="container-page flex flex-1 flex-col">
        {/* Meta row — like the slug line on a printer's proof */}
        <div
          className="hero-fade label flex items-center justify-between gap-6 border-b border-border-inverse py-4 text-text-inverse-muted"
          style={delay(100)}
        >
          <span className="flex items-center gap-3">
            <RegistrationMark className="size-3.5 text-accent" />
            Printing studio — {site.location.city}
          </span>
          <span className="hidden lg:inline">Cards · Stickers · Packaging · Large format</span>
          <span className="hidden sm:inline">Open {site.hours}</span>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-7">
            <h1 id="hero-title" className="font-serif text-hero text-text-inverse">
              <Line d={200}>Premium printing,</Line>
              <Line d={320}>
                <em className="text-accent">made for your</em>
              </Line>
              {/* The changing word has a line of its own, so swapping words never reflows the hero. */}
              <Line d={440}>
                <em className="text-accent">
                  <RotatingWord words={headlineWords} />
                </em>
              </Line>
            </h1>

            <p className="hero-fade mt-8 max-w-md text-lead text-text-inverse-muted lg:mt-10" style={delay(650)}>
              Business cards, stickers, brochures, wedding cards, banners and branded packaging — professionally printed in{" "}
              {site.location.city}.
            </p>

            <div className="hero-fade mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8" style={delay(780)}>
              <div id="hero-actions" className="grid grid-cols-2 gap-3 sm:flex">
                <ButtonLink href="#quote" variant="gold" className="px-4 sm:px-8">
                  Get a Quote
                </ButtonLink>
                <ButtonLink href={whatsappUrl()} external variant="ghost-on-ink" className="px-4 sm:px-7">
                  <WhatsAppIcon />
                  WhatsApp
                </ButtonLink>
              </div>
              <a
                href="#work"
                className="group hidden min-h-11 items-center gap-2 text-[0.9375rem] text-text-inverse-muted transition-colors hover:text-accent sm:inline-flex"
              >
                View our work
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroFigure />
          </div>
        </div>
      </div>

      <ServiceTicker />
    </section>
  );
}

function HeroFigure() {
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:mb-14 lg:max-w-none">
      <div className="relative">
        <CropMarks className="hero-fade" style={delay(900)} />
        <div className="hero-reveal relative aspect-[4/3] overflow-hidden rounded-img bg-surface-inverse-raised lg:aspect-auto lg:h-[clamp(26rem,62svh,42rem)]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1320px) 480px, (min-width: 1024px) 38vw, (min-width: 576px) 576px, 100vw"
            className="hero-zoom object-cover object-[50%_40%]"
          />
          {heroImage.sample && <SampleBadge />}
        </div>
        <div
          className="hero-fade absolute -bottom-12 -left-8 hidden rounded-full shadow-[0_12px_32px_-8px_rgb(0_0_0/0.5)] ring-4 ring-surface-inverse lg:block"
          style={delay(1100)}
        >
          <LogoBadge className="size-32" sizes="128px" />
        </div>
        {/* Second print, pinned over the first like a proof on a studio table. */}
        <div
          className="hero-fade absolute -right-4 -bottom-14 hidden aspect-[4/3] w-[44%] overflow-hidden rounded-img shadow-[0_24px_48px_-16px_rgb(0_0_0/0.6)] ring-4 ring-surface-inverse lg:block xl:-right-8"
          style={delay(1150)}
        >
          <Image
            src={insetImage.src}
            alt={insetImage.alt}
            fill
            placeholder="blur"
            sizes="220px"
            className="object-cover"
          />
        </div>
      </div>

    </figure>
  );
}

/** Masked line that slides up into place. */
function Line({ d, children }: { d: number; children: ReactNode }) {
  return (
    <span className="hero-line">
      <span style={delay(d)}>{children}</span>
    </span>
  );
}

/**
 * News-style ticker of every product. The first copy is real, focusable links;
 * the second copy only fills the loop and is hidden from assistive tech.
 * Pauses on hover/focus; becomes a static scrollable row with reduced motion.
 */
function ServiceTicker() {
  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined}>
      {services.map((s) => (
        <li key={s.slug} className="flex items-center">
          <Link
            href={serviceHref(s.slug)}
            tabIndex={copy === 1 ? -1 : undefined}
            className="inline-flex min-h-11 items-center px-6 font-serif text-[1.375rem] whitespace-nowrap text-text-inverse italic transition-colors hover:text-accent lg:px-8 lg:text-[1.625rem]"
          >
            {s.short}
          </Link>
          <span aria-hidden="true" className="text-xs text-accent">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label="What we print" className="hero-fade border-t border-border-inverse" style={delay(1200)}>
      <div className="ticker group flex overflow-hidden py-3 lg:py-4">
        <div className="ticker-track flex group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </nav>
  );
}

function delay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}
