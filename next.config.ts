import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Mock data (src/mocks) references local placeholder SVGs under
    // public/mocks/ until real WordPress/WooCommerce media exists.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow-list the future WPGraphQL media host so `next/image` doesn't
    // throw the moment product/blog images move off local mocks - update
    // the hostname once the real WordPress origin is known.
    remotePatterns: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL
      ? [{ protocol: "https", hostname: new URL(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL).hostname }]
      : [],
  },
};

export default nextConfig;
