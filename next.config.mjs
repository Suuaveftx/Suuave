/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@suuaveftx/prisma-shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },
<<<<<<< HEAD
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
=======
>>>>>>> 665f213fc5b0b66a1b0dd860b42bd08c9a26ce75
};

export default nextConfig;
