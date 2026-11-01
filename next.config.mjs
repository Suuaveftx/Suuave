/** @type {import('next').NextConfig} */

const apiOrigin = process.env.API_URL?.replace(/\/api\/v1\/?$/, '');

const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@suuaveftx/prisma-shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${apiOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;
