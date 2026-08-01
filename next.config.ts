import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Mock data (src/mocks) references local placeholder SVGs under
    // public/mocks/ until real WordPress/WooCommerce media exists.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
