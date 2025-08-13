import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 This will skip ESLint errors during build
  },
};

export default nextConfig;
