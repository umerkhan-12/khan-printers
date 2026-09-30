import Image from "next/image";
import Link from "next/link";

import { buttonClasses } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredServiceSlug, services, type Service } from "@/content/services";

const quoteHref = (slug: string) => `/?service=${slug}#quote`;

export function Services() {
  const featured = services.find((s) => s.slug === featuredServiceSlug)!;
  const rest = services.filter((s) => s.slug !== featuredServiceSlug);

  return (
    <section id="services" aria-labelledby="services-title" className="on-ink section-y bg-ink text-on-ink">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="02" eyebrow="Services" title="Everything your brand needs on paper." id="services-title" tone="ink">
            <p>From a single box of visiting cards to shop-front pana flex — tell us what you need and we’ll print it properly.</p>
          </SectionHeading>
        </Reveal>

        <FeaturedService service={featured} />

        <ol className="mt-16 border-t border-line-on-ink lg:mt-24">
          {rest.map((service, i) => (
            <ServiceRow key={service.slug} service={service} number={i + 2} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function FeaturedService({ service }: { service: Service }) {
  return (
    <Reveal
      as="article"
      className="mt-12 grid scroll-mt-24 items-end gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12"
    >
      <div id={`service-${service.slug}`} className="lg:col-span-8">
        {service.image && (
          <Photo
            media={service.image}
            sizes="(min-width: 1320px) 820px, (min-width: 1024px) 64vw, 100vw"
            frameClassName="aspect-[3/2]"
          />
        )}
      </div>
      <div className="lg:col-span-4 lg:pb-2">
        <p className="label text-gold">01 — Featured</p>
        <h3 className="mt-4 font-serif text-h3 text-on-ink">{service.title}</h3>
        <p className="mt-4 text-on-ink-muted">{service.description}</p>
        <Link href={quoteHref(service.slug)} className={buttonClasses("gold", "lg", "mt-8")}>
          Get a quote
        </Link>
      </div>
    </Reveal>
  );
}

function ServiceRow({ service, number }: { service: Service; number: number }) {
  return (
    <li id={`service-${service.slug}`} className="scroll-mt-24 border-b border-line-on-ink">
      <Link
        href={quoteHref(service.slug)}
        className="group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 py-7 md:grid-cols-12 md:gap-x-6 lg:py-9"
        aria-label={`${service.title} — get a quote`}
      >
        <span className="label hidden text-gold md:col-span-1 md:block">{String(number).padStart(2, "0")}</span>

        <h3 className="font-serif text-h3 text-on-ink transition-colors duration-300 group-hover:text-gold md:col-span-4">
          {service.title}
        </h3>

        <div className="row-span-2 md:order-last md:col-span-3 md:row-span-1 md:flex md:items-center md:justify-end md:gap-6">
          {service.image ? (
            <div className="relative h-16 w-20 overflow-hidden rounded-img bg-ink-soft md:h-20 md:w-28">
              <Image
                src={service.image.src}
                alt=""
                fill
                sizes="112px"
                className="object-cover opacity-80 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          ) : (
            <span aria-hidden="true" className="hidden md:block" />
          )}
          <ArrowUpRightIcon className="hidden size-6 shrink-0 text-on-ink-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold md:block" />
        </div>

        <p className="text-[0.9375rem] text-on-ink-muted md:col-span-4">{service.description}</p>
      </Link>
    </li>
  );
}
