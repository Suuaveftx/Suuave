/** @type {import('next').NextConfig} */

const configuredApiUrl =
  process.env.NEXT_PUBLIC_APP_PRODUCTION_URL ||
  process.env.NEXT_PUBLIC_APP_STAGING_URL ||
  process.env.APP_PRODUCTION_URL;

const apiOrigin = configuredApiUrl?.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@suuaveftx/prisma-shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const rewrites = [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback/google',
      },
    ];

    if (apiOrigin) {
      rewrites.push({
        source: '/api/backend/:path*',
        destination: `${apiOrigin}/:path*`,
      });
    }

    return rewrites;
  },
};

export default nextConfig;
