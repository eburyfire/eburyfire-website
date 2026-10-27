import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Blog and Resources merged into Articles (redesign v2). Order matters:
      // the specific retired article comes before the general rule.
      { source: "/resources/understanding-bafe-sp203-1", destination: "/articles", permanent: true },
      { source: "/resources", destination: "/articles", permanent: true },
      { source: "/resources/:slug", destination: "/articles/:slug", permanent: true },
      // The portal-fed blog never published publicly.
      { source: "/blog", destination: "/articles", permanent: true },
      { source: "/blog/:slug", destination: "/articles", permanent: true },
      { source: "/favicon.ico", destination: "/favicon-32x32.png", permanent: false },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
