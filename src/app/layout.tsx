import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { Navbar } from "@/components/layout/Navbar";
import { services } from "@/content/services";
import { site } from "@/content/site";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = `${site.name} — Premium Printing in ${site.location.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name} — printing in ${site.location.city}` }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

/** Only confirmed facts. Add the street address once the client confirms it. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/logo.png`,
  telephone: site.phone.tel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
    ...(site.location.street ? { streetAddress: site.location.street } : {}),
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "21:00",
  },
  areaServed: { "@type": "City", name: site.location.city },
  hasMap: site.location.mapUrl,
  sameAs: [site.instagram.url, site.facebook.url],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Printing services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-surface-inverse px-5 py-3 text-text-inverse focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
