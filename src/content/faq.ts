import { site } from "./site";

/** Answers use confirmed facts only — no timelines, prices or minimums until the client confirms them. */
export const faqs = [
  {
    q: "How do I get a quote?",
    a: "Message us on WhatsApp or fill in the quote form. Tell us what you need printed, the quantity and any size or finish you have in mind, and we’ll reply with a price.",
  },
  {
    q: "Can I send my own design?",
    a: "Yes. Send your ready design file (PDF or image) on WhatsApp or through the quote form, and we’ll check it before printing.",
  },
  {
    q: "I don’t have a design. Can you help?",
    a: "Yes. Share your logo, text and idea, and we’ll help design it. You approve the final design before anything is printed.",
  },
  {
    q: "How long will my order take?",
    a: "It depends on the product and quantity. We confirm the timing with your quote, so you know before you order.",
  },
  {
    q: "Do you deliver?",
    a: `Both options are available — pick up your order or have it delivered. We’ll confirm the details when you order.`,
  },
  {
    q: "What are your hours?",
    a: `We’re open ${site.hours}, and you can message us on WhatsApp any time.`,
  },
];
