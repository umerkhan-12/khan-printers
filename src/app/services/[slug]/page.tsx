import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Faq } from "@/components/sections/Faq";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/Photo";
import { CropMarks, RegistrationMark } from "@/components/ui/PrintMarks";
import { ProductTile } from "@/components/ui/ProductTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { getService, serviceHref, services, type Service } from "@/content/services";
import { site } from "@/content/site";
import { serviceWhatsappUrl } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const title = `${service.title} Printing in ${site.location.city}`;
  const image = service.image ? [{ url: service.image.src.src, alt: service.image.alt }] : undefined;
  return {
    title,
    description: `${service.description} Get a quote on WhatsApp from ${site.name}, ${site.location.city}.`,
    alternates: { canonical: serviceHref(service.slug) },
    openGraph: { title: `${title} — ${site.name}`, url: serviceHref(service.slug), ...(image && { images: image }) },
  };
}

const emailEnabled = Boolean(process.env.RESEND_API_KEY);

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const number = services.indexOf(service) + 1;
  const work = galleryFor(portfolio.filter((p) => p.service === service.slug));
  const others = services.filter((s) => s.slug !== service.slug && s.slug !== "custom-printing").slice(0, 4);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: service.title, item: `${site.url}${serviceHref(service.slug)}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.title} printing`,
      description: service.description,
      areaServed: { "@type": "City", name: site.location.city },
      provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone.tel, url: site.url },
    },
  ];

  return (
    <>
      <ServiceHero service={service} number={number} />
      <WhatToSend service={service} />

      {work.length > 0 && (
        <section aria-labelledby="work-title" className="section-y pt-0 lg:pt-0">
          <div className="container-page">
            <Reveal>
              <SectionHeading index="02" eyebrow="Examples" title={`${service.short} we print`} id="work-title" />
            </Reveal>
            <div className="mt-12">
              <PortfolioGallery items={work} />
            </div>
          </div>
        </section>
      )}

      <ProcessSteps index={work.length > 0 ? "03" : "02"} />
      <Faq index={work.length > 0 ? "04" : "03"} />
      <QuoteSection
        index={work.length > 0 ? "05" : "04"}
        emailEnabled={emailEnabled}
        initialService={service.slug}
        title={`Get a quote for ${service.short.toLowerCase()}.`}
      />

      <section aria-labelledby="more-title" className="on-ink section-y bg-surface-inverse text-text-inverse">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <h2 id="more-title" className="font-serif text-h2 text-text-inverse">
              More products
            </h2>
            <Link href="/#products" className="label shrink-0 pb-2 text-accent hover:text-text-inverse">
              View all
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {others.map((s) => (
              <li key={s.slug}>
                <ProductTile service={s} tone="ink" index={services.indexOf(s) + 1} sizes="(min-width: 1024px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

function ServiceHero({ service, number }: { service: Service; number: number }) {
  return (
    <section id="top" aria-labelledby="service-title" className="on-ink bg-surface-inverse text-text-inverse">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="label flex items-center gap-3 border-b border-border-inverse py-4 text-text-inverse-muted">
          <RegistrationMark className="size-3.5 text-accent" />
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#products" className="hover:text-accent">
            Products
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="truncate text-text-inverse">
            {service.short}
          </span>
        </nav>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-6">
            <p className="hero-fade label text-accent" style={{ ["--d" as string]: "100ms" }}>
              Product {String(number).padStart(2, "0")} — {site.location.city}
            </p>
            <h1 id="service-title" className="mt-5 font-serif text-display text-balance text-text-inverse">
              <span className="hero-line">
                <span style={{ ["--d" as string]: "200ms" }}>{service.title}</span>
              </span>
            </h1>
            <p className="hero-fade mt-6 max-w-md text-lead text-text-inverse-muted" style={{ ["--d" as string]: "450ms" }}>
              {service.description}
            </p>

            <ul className="hero-fade mt-7 flex flex-wrap gap-2" style={{ ["--d" as string]: "550ms" }} aria-label="Perfect for">
              {service.perfectFor.map((p) => (
                <li key={p} className="rounded-full border border-border-inverse px-3.5 py-1.5 text-sm text-text-inverse-muted">
                  {p}
                </li>
              ))}
            </ul>

            <div
              id="hero-actions"
              className="hero-fade mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
              style={{ ["--d" as string]: "650ms" }}
            >
              <ButtonLink href="#quote" variant="gold" className="px-4 sm:px-7">
                Get a Quote
              </ButtonLink>
              <ButtonLink href={serviceWhatsappUrl(service.title)} external variant="ghost-on-ink" className="px-4 sm:px-7">
                <WhatsAppIcon />
                WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <CropMarks className="hero-fade" style={{ ["--d" as string]: "900ms" }} />
              <div className="hero-reveal relative aspect-[4/3] overflow-hidden rounded-img bg-surface-inverse-raised">
                {service.image ? (
                  <>
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      preload
                      placeholder="blur"
                      sizes="(min-width: 1320px) 610px, (min-width: 1024px) 48vw, 100vw"
                      className="hero-zoom object-cover"
                    />
                    {service.image.sample && <SampleBadge />}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 border border-border-inverse">
                    <span aria-hidden="true" className="font-serif text-[8rem] leading-none text-text-inverse/10 italic">
                      {String(number).padStart(2, "0")}
                    </span>
                    <span className="label text-text-inverse-muted">Photos of our {service.short.toLowerCase()} coming soon</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatToSend({ service }: { service: Service }) {
  const items = [
    { title: "What you need", text: `The ${service.short.toLowerCase()} you want and the size, if you know it.` },
    { title: "Quantity", text: "How many you need — we’ll quote for exactly that." },
    { title: "Your design", text: "A ready file (PDF or image), or your logo, text and idea for us to design." },
    { title: "When you need it", text: "Your date, so we can confirm timing with the quote." },
    { title: "Pickup or delivery", text: "Tell us which you prefer." },
  ];

  return (
    <section aria-labelledby="send-title" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading index="01" eyebrow="Ordering" title="What to send us for a quote." id="send-title">
            <p>Share these on WhatsApp or in the form below. Don’t have everything? Send what you have — we’ll help with the rest.</p>
          </SectionHeading>
        </Reveal>
        <ol className="border-t border-border lg:col-span-7">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 60} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-6">
              <span className="font-serif text-[1.75rem] leading-none text-accent-text">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-medium text-text-strong">{item.title}</h3>
                <p className="mt-1 text-text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Picks gallery footprints that fill the grid for 1–4 images. */
function galleryFor(items: PortfolioItem[]): PortfolioItem[] {
  if (items.length === 1) return [{ ...items[0], layout: "full" }];
  if (items.length === 2) return items.map((it) => ({ ...it, layout: "half" as const }));
  return items.map((it, i) => ({ ...it, layout: i === 0 ? ("full" as const) : ("half" as const) }));
}
