/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
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
  // Fix for experimental.outputStandalone deprecation warning
  output: 'standalone',

  // Ensure localization works correctly in production
  trailingSlash: false,
  
  // Configure static generation
  env: {
    // Add any additional environment variables needed at build time
    NODE_ENV: process.env.NODE_ENV,
  }
};

module.exports = nextConfig; 