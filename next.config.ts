/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['logan-entered-kenny-much.trycloudflare.com'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@auth/drizzle-adapter', 'drizzle-orm', '@libsql/client'],
  },
};

export default nextConfig;
