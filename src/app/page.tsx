import { Hero } from "@/components/sections/Hero";
import { OurWork } from "@/components/sections/OurWork";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";

// Evaluated at build time: the upload field and email copy only appear once email is configured.
const emailEnabled = Boolean(process.env.RESEND_API_KEY);

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurWork />
      <Services />
      <WhyUs />
      <ProcessSteps />
      <QuoteSection emailEnabled={emailEnabled} />
    </>
  );
}
