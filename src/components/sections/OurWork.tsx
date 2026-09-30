import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePortfolio, portfolioHasSamples } from "@/content/portfolio";

import { PortfolioGallery } from "./PortfolioGallery";

export function OurWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="on-ink section-y bg-surface-inverse text-text-inverse"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Our Work"
              title="Our work."
              id="work-title"
              tone="ink"
            >
              {portfolioHasSamples ? (
                <p>
                  Stickers, invitations, packaging, brochures and large-format
                  prints.{" "}
                  <span className="text-text-inverse">
                    Sample images are shown
                  </span>{" "}
                  until our own project photos are added.
                </p>
              ) : (
                <p>
                  Visiting cards, wedding cards, stickers, packaging and banners
                  — a look at what we design and print.
                </p>
              )}
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <a
              href="#quote"
              className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-text-inverse-muted transition-colors hover:text-accent"
            >
              Want something like this? Get a quote
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16">
          <PortfolioGallery items={homePortfolio} />
        </div>
      </div>
    </section>
  );
}
