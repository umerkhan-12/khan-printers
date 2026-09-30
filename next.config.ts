import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  experimental: {
    // Most visitors arrive from ads (first visit): inline the small Tailwind CSS
    // to remove a render-blocking request.
    inlineCss: true,
  },
  // Custom Printing was removed as a product page; send old links to the quote form.
  async redirects() {
    return [{ source: "/services/custom-printing", destination: "/#quote", permanent: false }];
  },
};

export default nextConfig;
