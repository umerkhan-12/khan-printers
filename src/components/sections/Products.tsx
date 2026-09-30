import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ProductTile } from "@/components/ui/ProductTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getService, services } from "@/content/services";
import { whatsappUrl } from "@/lib/whatsapp";

const FEATURED = "stickers-labels";

/**
 * Catalog on paper, so the product photos (not the page) carry the colour.
 * Desktop grid, 4 columns:
 *   [ featured 2×2 ][ a ][ b ]
 *   [              ][ c ][ d ]
 *   [ e ][ f ][ anything-else 2×1 ]
 */
export function Products() {
  const featured = getService(FEATURED)!;
  const rest = services.filter((s) => s.slug !== FEATURED);
  const number = (slug: string) => services.findIndex((s) => s.slug === slug) + 1;

  return (
    <section id="products" aria-labelledby="products-title" className="section-y bg-background">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading index="01" eyebrow="Products" title="What would you like printed?" id="products-title">
              <p>Choose a product to see details, or tell us what you need and we’ll quote it.</p>
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <ButtonLink href="/#quote" variant="secondary" size="md">
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
            <SomethingElseTile />
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/** The one ink panel in the catalog — a clear "anything else?" call to action. */
function SomethingElseTile() {
  const title = "Need something else printed?";
  return (
    <div className="on-ink flex h-full flex-col justify-between gap-8 rounded-img bg-surface-inverse p-6 text-text-inverse sm:p-8 lg:min-h-full">
      <div>
        <p className="label text-accent">Not listed?</p>
        <h3 className="mt-4 font-serif text-h3 text-text-inverse">{title}</h3>
        <p className="mt-3 max-w-md text-text-inverse-muted">
          Send us a photo or a description of what you have in mind, and we’ll tell you how we can print it.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={whatsappUrl()} external variant="gold" size="md">
          <WhatsAppIcon className="size-[1.125rem]" />
          Ask on WhatsApp
        </ButtonLink>
        <ButtonLink href="/#quote" variant="ghost-on-ink" size="md">
          Get a quote
        </ButtonLink>
      </div>
    </div>
  );
}
