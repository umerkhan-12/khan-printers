import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudioVideo } from "@/components/ui/StudioVideo";

/** Qualitative claims only — no numbers, awards or guarantees unless the client confirms them. */
const reasons = [
  { title: "Premium quality", text: "Clean, sharp printing and careful finishing on every order, large or small." },
  { title: "Professional designs", text: "Bring a ready file, or tell us your idea and we’ll help design it." },
  { title: "Affordable prices", text: "A clear quote before anything is printed, based on your quantity and finish." },
  { title: "Fast service", text: "Quick replies on WhatsApp and prompt work once your design is approved." },
  { title: "Custom orders", text: "Sizes, quantities and finishes to suit your brand, not a fixed menu." },
  { title: "Pickup or delivery", text: "Collect your order or have it delivered — whichever suits you." },
];

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="03" eyebrow="Why Khan Printers" title="Printing that makes your brand look right." id="why-title">
              <p>Good printing is in the details. We take care of them so your cards, labels and packaging feel as good as they look.</p>
            </SectionHeading>

            <figure className="mt-10 max-w-[20rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-img bg-surface-muted">
                <StudioVideo
                  src="/video/studio-cutting"
                  poster="/video/studio-cutting.jpg"
                  label="A print run being trimmed on the paper cutter in the Khan Printers workshop"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <figcaption className="label mt-3 text-text-muted">In our workshop — trimming a print run to size</figcaption>
            </figure>
          </div>
        </Reveal>

        <ul className="border-t border-border lg:col-span-7">
          {reasons.map((reason, i) => (
            <Reveal as="li" key={reason.title} delay={i * 60} className="grid gap-2 border-b border-border py-7 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <h3 className="font-serif text-[1.625rem] leading-tight text-text-strong">{reason.title}</h3>
              <p className="text-text-muted sm:pt-1">{reason.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
