import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { OurWork } from "@/components/sections/OurWork";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Products } from "@/components/sections/Products";
import { WhyUs } from "@/components/sections/WhyUs";

// Evaluated at build time: the upload field and email copy only appear once email is configured.
const emailEnabled = Boolean(process.env.RESEND_API_KEY);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <OurWork />
      <WhyUs />
      <ProcessSteps />
      <Faq index="05" />
      <QuoteSection index="06" emailEnabled={emailEnabled} />
    </>
  );
}
