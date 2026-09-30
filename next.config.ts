import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Custom Printing was removed as a product page; send old links to the quote form.
  async redirects() {
    return [{ source: "/services/custom-printing", destination: "/#quote", permanent: false }];
  },
};

export default nextConfig;
