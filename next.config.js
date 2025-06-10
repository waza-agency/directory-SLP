/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checks during builds
    ignoreBuildErrors: true,
  },
    images: {
    // Use unoptimized for now to bypass image optimization issues
    unoptimized: true,
    domains: [
      'localhost',
      'sanluisway.com',
      'omxporaecrqsqhzjzvnx.supabase.co',
      'static.wixstatic.com',
      'assets.seobotai.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'omxporaecrqsqhzjzvnx.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.seobotai.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: blob: https:;"
  },
  trailingSlash: false,
  // Enable more detailed output during builds
  onDemandEntries: {
    // Keep pages in memory for longer during development
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },
  // Function to customize webpack configuration for more detailed logging
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Add more detailed logs in development
      config.infrastructureLogging = {
        level: 'verbose',
      };
    }
    if (!isServer) {
      // Added fallbacks for Node.js API polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false
      };
    }
    // Add explicit ignore for test files and directories
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\/__tests__\/.*|\.(spec|test)\.[tj]sx?$/,
      loader: 'ignore-loader',
    });
    return config;
  },
  // Modern Next.js config optimized for Node.js 18+
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  optimizeFonts: true,
  // Exclude test files from pages directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('test.')),
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
  // Temporarily disable rewrites
  // async rewrites() {
  //   return [
  //     {
  //       source: '/sitemap.xml',
  //       destination: '/api/sitemap',
  //     },
  //     {
  //       source: '/robots.txt',
  //       destination: '/api/robots',
  //     }
  //   ];
  // },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  // Temporarily disable experimental features
  // experimental: {
  //   forceSwcTransforms: true,
  // },
  // This will tell Next.js to ignore specific paths during build
  excludeDefaultMomentLocales: true,
  // Removed standalone output mode that was causing issues
  poweredByHeader: false,
  // Add configuration to handle build tracing issues
  outputFileTracing: false,
};

// Add performance polyfill to fix Node.js compatibility issue (only for older Node.js)
if (typeof process !== 'undefined' && !process.env.NEXT_RUNTIME) {
  const nodeVersionMatch = process.version.match(/^v(\d+)\./);
  const majorNodeVersion = nodeVersionMatch ? parseInt(nodeVersionMatch[1], 10) : 0;

  // Only add polyfill for Node.js < 16
  if (majorNodeVersion < 16 && !global.performance) {
    console.warn(`Warning: Using older Node.js ${process.version}. Adding performance API polyfill.`);
    // If performance is not available, create a polyfill
    global.performance = {
      mark: () => {},
      measure: () => {},
      getEntriesByName: () => [],
      getEntriesByType: () => [],
      clearMarks: () => {},
      clearMeasures: () => {},
      now: () => Date.now(),
    };
  }
}

module.exports = nextConfig;