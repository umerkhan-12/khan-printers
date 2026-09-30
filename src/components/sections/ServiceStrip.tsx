import { services } from "@/content/services";

/** One-line scan of everything we print — answers "do they do my thing?" instantly. */
export function ServiceStrip() {
  return (
    <nav aria-label="What we print" className="border-y border-line">
      <ul className="container-page flex snap-x gap-2 overflow-x-auto py-4 [scrollbar-width:none] lg:justify-between lg:gap-0 [&::-webkit-scrollbar]:hidden">
        {services.map((service) => (
          <li key={service.slug} className="shrink-0 snap-start">
            <a
              href={`#service-${service.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm whitespace-nowrap text-text transition-colors hover:border-ink lg:border-transparent lg:px-3 lg:hover:border-transparent lg:hover:text-gold-deep"
            >
              {service.short}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
