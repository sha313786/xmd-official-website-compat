import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,

  async redirects() {
    return [
      {
        source: "/dashboard/reports",
        destination: "/dashboard/report",
        permanent: true,
      },
      {
        source: "/dashboard/promotion-tracker",
        destination: "/dashboard/promotion",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
};

export default nextConfig;