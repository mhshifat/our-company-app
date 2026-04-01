import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
