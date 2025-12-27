import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Aumenta el límite a 5 MB
    },
  },
};

export default nextConfig;
