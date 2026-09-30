import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon, ClockIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** Where to find us: live Google Map (when an embed URL is set) + directions. */
export function Location({ index }: { index: string }) {
  const { location } = site;
  const address = `${location.street ? `${location.street}, ` : ""}${location.city}, ${location.country}`;

  return (
    <section id="location" aria-labelledby="location-title" className="section-y bg-surface-muted">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading index={index} eyebrow="Visit us" title="Find us in Karachi." id="location-title">
            <p>Drop in to discuss your order, see paper samples, or pick up your prints.</p>
          </SectionHeading>

          <ul className="mt-8 space-y-3 text-text">
            <li className="flex items-center gap-3">
              <PinIcon className="size-5 shrink-0 text-accent-text" />
              {address}
            </li>
            <li className="flex items-center gap-3">
              <ClockIcon className="size-5 shrink-0 text-accent-text" />
              Open {site.hours} · {site.closed}
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={location.mapUrl} external variant="primary">
              Open in Google Maps
              <ArrowUpRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl("Hi Khan Printers, please share directions to your shop.")} external variant="secondary">
              <WhatsAppIcon className="size-[1.125rem] text-success" />
              Ask for directions
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-img border border-border bg-surface sm:aspect-[16/10]">
            {location.mapEmbedUrl ? (
              <iframe
                src={location.mapEmbedUrl}
                title={`Map showing ${site.name} in ${location.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            ) : (
              <MapPreview href={location.mapUrl} />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Lightweight stand-in until the embed URL is supplied: a map-like panel that opens Google Maps. */
function MapPreview({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface"
      aria-label={`Open ${site.name} on Google Maps`}
    >
      <svg aria-hidden="true" className="absolute inset-0 size-full text-border" preserveAspectRatio="none" viewBox="0 0 400 250">
        <path d="M0 60 L400 110 M0 170 L400 140 M90 0 L140 250 M260 0 L230 250 M0 230 L180 0" stroke="currentColor" strokeWidth="6" fill="none" />
        <path d="M0 20 L400 40 M320 0 L360 250 M0 120 L60 250" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-primary text-accent shadow-[0_12px_24px_-12px_rgb(17_26_58/0.6)] transition-transform duration-300 group-hover:-translate-y-1">
        <PinIcon className="size-6" />
      </span>
      <span className="relative rounded-full bg-background px-4 py-2 text-sm font-medium text-text-strong shadow-sm">
        Tap to open the live map
      </span>
    </a>
  );
}
