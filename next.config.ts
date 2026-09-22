import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Mock data (src/mocks) references local placeholder SVGs under
    // public/mocks/ until real WordPress/WooCommerce media exists.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow-list the WPGraphQL media host so `next/image` doesn't throw
    // rendering product/blog images. Protocol is derived from the URL too
    // (not hardcoded to https) - local WordPress dev servers are plain
    // http, production WP is expected to be https.
    remotePatterns: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL
      ? [
          {
            protocol: new URL(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL).protocol.replace(":", "") as
              | "http"
              | "https",
            hostname: new URL(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL).hostname,
            port: new URL(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL).port || undefined,
          },
        ]
      : [],
  },
};

export default nextConfig;
