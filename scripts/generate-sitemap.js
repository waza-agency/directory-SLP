const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Your domain
const DOMAIN = 'https://sanluisway.com';

// Directories to scan for pages
const PAGE_DIRS = [
  'src/pages/**/*.tsx',
  'src/pages/**/*.jsx',
  '!src/pages/_*.tsx',
  '!src/pages/_*.jsx',
  '!src/pages/api/**/*.tsx',
  '!src/pages/api/**/*.jsx',
];

// Frequency and priority configuration
const CONFIG = {
  home: { changefreq: 'weekly', priority: '1.0' },
  main: { changefreq: 'weekly', priority: '0.9' },
  section: { changefreq: 'weekly', priority: '0.8' },
  subsection: { changefreq: 'monthly', priority: '0.7' },
  legal: { changefreq: 'yearly', priority: '0.5' },
};

// Pages with dynamic parameters
const DYNAMIC_PAGES = [
  { path: '/events/[category]', urls: [
    '/events/arts-culture',
    '/events/culinary',
    '/events/music',
    '/events/kids-family',
    '/events/sports',
    '/events/traditional',
    '/events/wellness',
    '/events/community-social',
  ]},
  { path: '/category/[category]', urls: [
    '/category/sports-fitness',
    '/category/outdoors',
    '/category/cocktail-bars',
    '/category/terraces',
    '/category/cantinas',
    '/category/live-music',
    '/category/open-for-breakfast',
    '/category/meeting-spots',
    '/category/rainy-day-activities',
    '/category/local-organic-products',
  ]},
  // Add more dynamic pages as needed
];

// Pages to exclude
const EXCLUDED_PAGES = [
  '/404',
  '/500',
  '/__tests__',
  '/__tests__/auth-test.test'
];

// Helper function to format route path to URL
function formatPath(pagePath) {
  // Remove file extension
  let formattedPath = pagePath.replace(/\.(tsx|jsx)$/, '');

  // Handle index pages
  formattedPath = formattedPath.replace(/\/index$/, '/');

  // Remove /src/pages prefix
  formattedPath = formattedPath.replace(/^(\.\/)?src\/pages/, '');

  // Ensure leading slash
  if (!formattedPath.startsWith('/')) {
    formattedPath = '/' + formattedPath;
  }

  return formattedPath;
}

// Determine config based on URL
function getConfig(url) {
  if (url === '/') return CONFIG.home;
  if (['/places', '/events', '/services', '/community', '/cultural', '/brands'].includes(url)) return CONFIG.main;
  if (['/privacy', '/terms', '/cookies'].includes(url)) return CONFIG.legal;
  if (url.split('/').length - 1 === 1) return CONFIG.section;
  return CONFIG.subsection;
}

// Generate the sitemap XML content
function generateSitemapXml(urls) {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  sitemap += '                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  // Add each URL to the sitemap
  urls.forEach(url => {
    const config = getConfig(url);
    sitemap += '  <url>\n';
    sitemap += `    <loc>${DOMAIN}${url}</loc>\n`;
    sitemap += `    <changefreq>${config.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${config.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';
  return sitemap;
}

// Main function to generate the sitemap
async function generateSitemap() {
  try {
    // Get all page files
    const files = glob.sync(PAGE_DIRS);

    // Extract paths from files
    let urls = files.map(file => formatPath(file));

    // Filter out excluded pages
    urls = urls.filter(url => !EXCLUDED_PAGES.some(excluded => url.includes(excluded)));

    // Filter out dynamic page templates (with [] parameters)
    urls = urls.filter(url => !url.includes('[') && !url.includes(']'));

    // Add dynamic URLs
    DYNAMIC_PAGES.forEach(({ urls: dynamicUrls }) => {
      dynamicUrls.forEach(url => {
        if (!urls.includes(url)) {
          urls.push(url);
        }
      });
    });

    // Sort the URLs
    urls.sort();

    // Generate and write the sitemap XML
    const sitemapXml = generateSitemapXml(urls);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapXml);

    console.log(`Sitemap generated with ${urls.length} URLs`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Run the generator
generateSitemap();