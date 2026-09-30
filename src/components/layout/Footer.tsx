import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

import { Wordmark } from "./Wordmark";

const footerNav = [
  { href: "/#products", label: "Products" },
  { href: "/#work", label: "Our Work" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#quote", label: "Get a Quote" },
];

export function Footer() {
  const contacts = [
    { href: whatsappUrl(), label: "WhatsApp", value: site.phone.display, Icon: WhatsAppIcon, external: true },
    { href: `tel:${site.phone.tel}`, label: "Phone", value: site.phone.display, Icon: PhoneIcon },
    { href: `mailto:${site.email}`, label: "Email", value: site.email, Icon: MailIcon },
    { href: site.instagram.url, label: "Instagram", value: site.instagram.handle, Icon: InstagramIcon, external: true },
  ];

  return (
    <footer id="site-footer" className="on-ink bg-ink text-on-ink">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <Wordmark tone="paper" />
          <p className="mt-5 max-w-xs text-on-ink-muted">{site.tagline}</p>
          <p className="mt-2 text-sm text-on-ink-muted">
            {site.location.city}, {site.location.country}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="label text-gold">Explore</h2>
          <ul className="mt-5 space-y-1">
            {footerNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-10 items-center transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="label text-gold">Contact</h2>
          <ul className="mt-5 space-y-1">
            {contacts.map(({ href, label, value, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex min-h-10 items-center gap-3 transition-colors hover:text-gold"
                >
                  <Icon className="size-4 shrink-0 text-on-ink-muted group-hover:text-gold" />
                  <span className="sr-only">{label}: </span>
                  <span className="wrap-anywhere">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-on-ink">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-on-ink-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Printing in {site.location.city}</p>
        </div>
      </div>
    </footer>
  );
}
