import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ProductTile } from "@/components/ui/ProductTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getService, services } from "@/content/services";
import { serviceWhatsappUrl } from "@/lib/whatsapp";

const FEATURED = "stickers-labels";
const CUSTOM = "custom-printing";

/**
 * Catalog grid (desktop, 4 columns):
 *   [ featured 2×2 ][ a ][ b ]
 *   [              ][ c ][ d ]
 *   [ e ][ f ][ custom 2×1   ]
 */
export function Products() {
  const featured = getService(FEATURED)!;
  const custom = getService(CUSTOM)!;
  const rest = services.filter((s) => s.slug !== FEATURED && s.slug !== CUSTOM);
  const number = (slug: string) => services.findIndex((s) => s.slug === slug) + 1;

  return (
    <section id="products" aria-labelledby="products-title" className="on-ink section-y bg-ink text-on-ink">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading index="01" eyebrow="Products" title="What would you like printed?" id="products-title" tone="ink">
              <p>Choose a product to see details, or tell us what you need and we’ll quote it.</p>
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <ButtonLink href="/#quote" variant="ghost-on-ink" size="md">
              Get a quote for any product
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          <Reveal as="li" className="col-span-2 lg:row-span-2">
            <ProductTile
              service={featured}
              index={number(featured.slug)}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full"
              mediaClassName="aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[32rem]"
            />
          </Reveal>

          {rest.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={(i % 4) * 70}>
              <ProductTile service={service} index={number(service.slug)} sizes="(min-width: 1024px) 25vw, 50vw" />
            </Reveal>
          ))}

          <Reveal as="li" className="col-span-2">
            <CustomTile index={number(custom.slug)} title={custom.title} description={custom.description} />
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

function CustomTile({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-img border border-gold/40 p-6 sm:p-8 lg:min-h-full">
      <div>
        <p className="label text-gold">{String(index).padStart(2, "0")} — Something else?</p>
        <h3 className="mt-4 font-serif text-h3 text-on-ink">{title}</h3>
        <p className="mt-3 max-w-md text-on-ink-muted">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={serviceWhatsappUrl(title)} external variant="gold" size="md">
          <WhatsAppIcon className="size-[1.125rem]" />
          Ask on WhatsApp
        </ButtonLink>
        <ButtonLink href="/services/custom-printing" variant="ghost-on-ink" size="md">
          Learn more
        </ButtonLink>
      </div>
    </div>
  );
}
