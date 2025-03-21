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
  
  // Temporarily disable any experimental or i18n features
  // that might cause export issues
  experimental: {
    // Disable any experimental features
  },
};

module.exports = nextConfig; 