import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "merchant-suite.bytloop.com" },
      { protocol: "https", hostname: "**.merchant-suite.bytloop.com" },
      { protocol: "https", hostname: "merchant-suite.vercel.app" },
    ],
  },
  // Browsers still request /favicon.ico; we only ship app/icon.svg, so map the path.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/favicon.ico", destination: "/icon.svg" },
      ],
    };
  },
};

export default nextConfig;
