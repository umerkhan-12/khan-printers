import { Suspense } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

import { QuoteForm, ServiceFromUrl } from "./QuoteForm";

type Props = {
  emailEnabled: boolean;
  index: string;
  /** Preselects the service (used on product pages). */
  initialService?: string;
  title?: string;
};

export function QuoteSection({ emailEnabled, index, initialService, title = "Tell us what you need." }: Props) {
  const details = [
    { Icon: PhoneIcon, label: "Phone", value: site.phone.display, href: `tel:${site.phone.tel}` },
    { Icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: InstagramIcon, label: "Instagram", value: site.instagram.handle, href: site.instagram.url, external: true },
    { Icon: ClockIcon, label: "Hours", value: `Open ${site.hours}` },
    { Icon: PinIcon, label: "Location", value: `${site.location.street ? `${site.location.street}, ` : ""}${site.location.city}, ${site.location.country}` },
  ];

  return (
    <section id="quote" aria-labelledby="quote-title" className="section-y">
      {/* Mobile order: intro → form → contact details. Desktop: intro + details left, form right. */}
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading index={index} eyebrow="Get a quote" title={title} id="quote-title">
            <p>Send your details and we’ll reply on WhatsApp with a quote. Prefer to chat? Message us directly.</p>
          </SectionHeading>

          <ButtonLink href={whatsappUrl()} external variant="whatsapp" className="mt-8">
            <WhatsAppIcon />
            Chat on WhatsApp
          </ButtonLink>
        </div>

        <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="rounded-img bg-white p-6 shadow-[0_1px_0_rgb(17_17_17/0.04),0_24px_48px_-24px_rgb(17_17_17/0.18)] sm:p-10">
            <QuoteForm emailEnabled={emailEnabled} initialService={initialService} />
            <Suspense fallback={null}>
              <ServiceFromUrl />
            </Suspense>
          </div>
        </div>

        <div id="contact" className="min-w-0 scroll-mt-24 lg:col-span-5">
          <h3 className="sr-only">Contact details</h3>
          <dl className="border-t border-line">
            {details.map(({ Icon, label, value, href, external }) => (
              <div key={label} className="flex items-center gap-4 border-b border-line py-4">
                <dt className="flex w-24 shrink-0 sm:w-28 items-center gap-3 text-sm text-muted">
                  <Icon className="size-4 text-gold-deep" />
                  {label}
                </dt>
                <dd className="min-w-0 wrap-anywhere text-ink">
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="underline decoration-line underline-offset-4 transition-colors hover:decoration-gold-deep"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
