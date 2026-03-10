import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Image optimization enabled
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
