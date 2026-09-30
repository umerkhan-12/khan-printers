import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Send your requirements", text: "Message us on WhatsApp or use the quote form. Share your design or idea." },
  { title: "Get a quote", text: "We confirm the size, paper, finish and quantity, and send you a price." },
  { title: "Approve your design", text: "You check the final design. Nothing is printed until you approve it." },
  { title: "We print", text: "Your order is printed and finished with care." },
  { title: "Pickup or delivery", text: "Collect your order or have it delivered to you." },
];

export function ProcessSteps({ index = "04" }: { index?: string }) {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y bg-surface-muted">
      <div className="container-page">
        <Reveal>
          <SectionHeading index={index} eyebrow="How it works" title="From idea to print in five steps." id="process-title" />
        </Reveal>

        <ol className="mt-12 grid gap-0 lg:mt-16 lg:grid-cols-5 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className="relative grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-text-strong/15 py-6 lg:block lg:pt-8"
            >
              <span className="font-serif text-[2.5rem] leading-none text-accent-text italic lg:text-[3.25rem]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-[1.5rem] leading-tight text-text-strong lg:mt-8">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
