/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@suuaveftx/prisma-shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
