/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@suuaveftx/prisma-shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
