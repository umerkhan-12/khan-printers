import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio, portfolioHasSamples } from "@/content/portfolio";

import { PortfolioGallery } from "./PortfolioGallery";

export function OurWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="01" eyebrow="Our Work" title={portfolioHasSamples ? "What we print." : "Real projects. Real printing."} id="work-title">
            {portfolioHasSamples ? (
              <p>
                Stickers, invitations, packaging, brochures and large-format prints.{" "}
                <span className="text-text">Sample images are shown</span> until our own project photos are added.
              </p>
            ) : (
              <p>A selection of recent work printed for businesses and families in Karachi.</p>
            )}
          </SectionHeading>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <PortfolioGallery items={portfolio} />
        </div>
      </div>
    </section>
  );
}
