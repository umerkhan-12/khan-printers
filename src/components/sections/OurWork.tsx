import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePortfolio, portfolioHasSamples } from "@/content/portfolio";

import { PortfolioGallery } from "./PortfolioGallery";

export function OurWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="02" eyebrow="Our Work" title="Our work." id="work-title">
            {portfolioHasSamples ? (
              <p>
                Stickers, invitations, packaging, brochures and large-format prints.{" "}
                <span className="text-text">Sample images are shown</span> until our own project photos are added.
              </p>
            ) : (
              <p>Visiting cards, wedding cards, stickers, packaging and banners — a look at what we design and print.</p>
            )}
          </SectionHeading>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <PortfolioGallery items={homePortfolio} />
        </div>
      </div>
    </section>
  );
}
