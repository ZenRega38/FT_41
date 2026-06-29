import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'scholar.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ubt.ac.id',
      },
    ],
  },
};

export default nextConfig;
