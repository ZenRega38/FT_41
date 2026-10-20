import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
=======
  ...(process.env.GITHUB_ACTIONS ? { basePath: '' } : {}),
>>>>>>> f7d961ef7ce6fa50e7e7470b2b39c59d0a601a01
  trailingSlash: true,
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
