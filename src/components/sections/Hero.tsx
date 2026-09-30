import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/Photo";
import { CropMarks, RegistrationMark } from "@/components/ui/PrintMarks";
import { media } from "@/content/media";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const heroImage = media.weddingSuite;

/**
 * Full-screen "ink" hero. Entrance motion is pure CSS (see .hero-* in
 * globals.css), so it runs before hydration and respects reduced motion.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-ink relative flex flex-col overflow-hidden bg-ink text-on-ink lg:min-h-[calc(100svh-4.5rem)]"
    >
      <div className="container-page flex flex-1 flex-col">
        {/* Meta row — like the slug line on a printer's proof */}
        <div
          className="hero-fade label flex items-center justify-between gap-6 border-b border-line-on-ink py-4 text-on-ink-muted"
          style={delay(100)}
        >
          <span className="flex items-center gap-3">
            <RegistrationMark className="size-3.5 text-gold" />
            Printing studio — {site.location.city}
          </span>
          <span className="hidden lg:inline">Cards · Stickers · Packaging · Large format</span>
          <span className="hidden sm:inline">Open {site.hours}</span>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-7">
            <h1 id="hero-title" className="font-serif text-hero text-on-ink">
              <Line d={200}>Premium</Line>
              <Line d={320}>
                printing, <em className="text-gold">made</em>
              </Line>
              <Line d={440}>
                <em className="text-gold">for your brand.</em>
              </Line>
            </h1>

            <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,22rem)_auto] lg:items-end lg:gap-10">
              <p className="hero-fade max-w-sm text-lead text-on-ink-muted" style={delay(650)}>
                Business cards, stickers, brochures, wedding cards, banners and branded packaging — professionally printed
                in {site.location.city}.
              </p>

              <div className="hero-fade" style={delay(780)}>
                <div id="hero-actions" className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                  <ButtonLink href="#quote" variant="gold" className="px-4 sm:px-7">
                    Get a Quote
                  </ButtonLink>
                  <ButtonLink href={whatsappUrl()} external variant="ghost-on-ink" className="px-4 sm:px-7">
                    <WhatsAppIcon />
                    WhatsApp
                  </ButtonLink>
                </div>
                <a
                  href="#work"
                  className="group mt-4 hidden min-h-11 items-center gap-2 text-[0.9375rem] text-on-ink-muted transition-colors hover:text-gold sm:inline-flex"
                >
                  View our work
                  <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroFigure />
          </div>
        </div>
      </div>

      <ServicesMarquee />
    </section>
  );
}

function HeroFigure() {
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="relative">
        <CropMarks className="hero-fade" style={delay(900)} />
        <div className="hero-reveal relative aspect-[4/3] overflow-hidden rounded-img bg-ink-soft lg:aspect-auto lg:h-[clamp(24rem,58svh,40rem)]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1320px) 480px, (min-width: 1024px) 38vw, (min-width: 576px) 576px, 100vw"
            className="hero-zoom object-cover object-[58%_50%]"
          />
          {heroImage.sample && <SampleBadge />}
        </div>
        <StudioSeal className="hero-fade absolute -bottom-10 -left-10 hidden size-32 lg:block" style={delay(1100)} />
      </div>

      <figcaption
        className="hero-fade label mt-4 flex justify-end text-on-ink-muted sm:mt-10"
        style={delay(1000)}
      >
        Fig. 01 — Invitation suite
      </figcaption>
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

/** Slowly rotating circular seal. Decorative only. */
function StudioSeal({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div aria-hidden="true" className={className} style={style}>
      <div className="relative size-full rounded-full bg-ink">
        <svg viewBox="0 0 120 120" className="hero-spin absolute inset-0 size-full text-gold">
          <defs>
            <path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          {/* textLength = circumference (2π·46), so the phrase closes the circle exactly. */}
          <text fill="currentColor" fontSize="9" style={{ textTransform: "uppercase" }}>
            <textPath href="#seal-circle" textLength="289" lengthAdjust="spacing">
              {"Khan Printers ✦ Premium Printing ✦ Karachi ✦ "}
            </textPath>
          </text>
        </svg>
        <RegistrationMark className="absolute inset-0 m-auto size-7 text-on-ink" />
      </div>
    </div>
  );
}

function ServicesMarquee() {
  const items = services.map((s) => s.short);
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-serif text-[1.75rem] whitespace-nowrap text-on-ink italic lg:px-8 lg:text-[2.25rem]">
            {item}
          </span>
          <span className="text-sm text-gold">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="hero-fade border-t border-line-on-ink" style={delay(1200)}>
      <p className="sr-only">We print: {items.join(", ")}.</p>
      <div aria-hidden="true" className="group flex overflow-hidden py-5 lg:py-6">
        <div className="hero-marquee flex group-hover:[animation-play-state:paused]">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}
