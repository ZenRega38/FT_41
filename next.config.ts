import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.GITHUB_ACTIONS ? '/FT_41' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
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
  output: 'export',
};

export default nextConfig;
