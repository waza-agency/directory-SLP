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
  // Export as static site for Netlify
  output: 'export',
};

module.exports = nextConfig; 