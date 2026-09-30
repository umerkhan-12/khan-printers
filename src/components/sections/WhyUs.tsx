import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
          </div>
        </Reveal>

        <ul className="border-t border-line lg:col-span-7">
          {reasons.map((reason, i) => (
            <Reveal as="li" key={reason.title} delay={i * 60} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <h3 className="font-serif text-[1.625rem] leading-tight text-ink">{reason.title}</h3>
              <p className="text-muted sm:pt-1">{reason.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
