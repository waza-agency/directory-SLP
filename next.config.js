/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    domains: [],
    unoptimized: true,
  },
  // Static site export configuration
  output: 'export',
  // Disable features not compatible with static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 