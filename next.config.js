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
    formats: ['image/avif', 'image/webp'],
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
    domains: ['localhost', 'your-supabase-project.supabase.co'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable trailing slash for consistency
  trailingSlash: true,
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
    return config;
  },
  // Modern Next.js config optimized for Node.js 18+
  experimental: {
    swcMinify: true,
    scrollRestoration: true
  },
  optimizeFonts: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? "default-src 'self'; script-src 'self' 'unsafe-eval' https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com https://pagead2.googlesyndication.com 'unsafe-inline'; frame-src https://js.stripe.com https://www.google.com/recaptcha/ https://www.youtube.com https://www.youtube-nocookie.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: https://pagead2.googlesyndication.com; connect-src 'self' http://localhost:3000 https://your-supabase-project.supabase.co https: https://pagead2.googlesyndication.com;"
              : "default-src 'self'; script-src 'self' https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com https://pagead2.googlesyndication.com 'unsafe-inline'; frame-src https://js.stripe.com https://www.google.com/recaptcha/ https://www.youtube.com https://www.youtube-nocookie.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: https://pagead2.googlesyndication.com; connect-src 'self' http://localhost:3000 https://your-supabase-project.supabase.co https: https://pagead2.googlesyndication.com;"
          }
        ],
      },
    ];
  },
  // Add rewrites for SEO-related files
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
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