const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { createClient } = require('@supabase/supabase-js');
// Try loading .env.local first, then .env
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

// Your domain
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanluisway.com';

// Initialize Supabase client (only if env vars are available)
let supabase = null;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized');
} else {
  console.warn('⚠️  Supabase credentials not found. Dynamic pages will not be fetched.');
}

// Directories to scan for pages
const PAGE_DIRS = [
  'src/pages/**/*.tsx',
  'src/pages/**/*.jsx',
  '!src/pages/_*.tsx',
  '!src/pages/_*.jsx',
  '!src/pages/api/**/*.tsx',
  '!src/pages/api/**/*.jsx',
  '!src/pages/**/__tests__/**',
  '!src/pages/**/*.test.tsx',
  '!src/pages/**/*.test.jsx',
];

// Frequency and priority configuration
const CONFIG = {
  home: { changefreq: 'weekly', priority: '1.0' },
  main: { changefreq: 'weekly', priority: '0.9' },
  section: { changefreq: 'weekly', priority: '0.8' },
  subsection: { changefreq: 'monthly', priority: '0.7' },
  legal: { changefreq: 'yearly', priority: '0.5' },
  dynamic: { changefreq: 'weekly', priority: '0.8' },
};

// Pages to completely exclude from sitemap
const EXCLUDED_PAGES = [
  '/404',
  '/500',
  '/__tests__',
  // Development/backup pages
  '/index-backup',
  '/index-redesign',
  // Multiple signup/signin variants (keep only main ones)
  '/signup-minimal',
  '/signup-simple',
  '/signup-fixed',
  '/signup-production',
  '/signin-simple',
  // Private/Protected pages
  '/account',
  '/business',
  // Result/confirmation pages that shouldn't be indexed
  '/checkout/success',
  '/order-confirmation',
  '/business/subscription-success',
  // Other pages that shouldn't be indexed
  '/design-showcase',
];

// Patterns to exclude
const EXCLUDED_PATTERNS = [
  /\/account\//,
  /\/business\//,
  /\/_app$/,
  /\/_document$/,
  /\/\[.*\]/, // Exclude dynamic route templates
];

// Static dynamic pages (pages that don't change often)
const STATIC_DYNAMIC_PAGES = [
  // Events
  '/events/arts-culture',
  '/events/culinary',
  '/events/music',
  '/events/kids-family',
  '/events/sports',
  '/events/traditional',
  '/events/wellness',
  '/events/community-social',
  '/events/fenapo-2025',
  '/events/san-luis-en-primavera-2025',
  '/events/xantolo-2025',
];

// Helper function to format route path to URL
function formatPath(pagePath) {
  let formattedPath = pagePath.replace(/\.(tsx|jsx)$/, '');
  formattedPath = formattedPath.replace(/\/index$/, '');
  formattedPath = formattedPath.replace(/^(\.\/)?src\/pages/, '');

  if (!formattedPath.startsWith('/')) {
    formattedPath = '/' + formattedPath;
  }

  if (formattedPath === '') {
    formattedPath = '/';
  }

  // Note: Removed trailing slash addition logic to match next.config.js trailingSlash: false

  return formattedPath;
}

// Check if page should be excluded
function shouldExclude(url) {
  // Check excluded pages
  if (EXCLUDED_PAGES.some(excluded => url === excluded || url.startsWith(excluded + '/'))) {
    return true;
  }

  // Check excluded patterns
  if (EXCLUDED_PATTERNS.some(pattern => pattern.test(url))) {
    return true;
  }

  return false;
}

// Determine config based on URL
function getConfig(url) {
  if (url === '/') return CONFIG.home;
  if (['/places', '/events', '/services', '/community', '/cultural', '/brands', '/outdoors'].includes(url)) {
    return CONFIG.main;
  }
  if (['/privacy', '/terms', '/cookies'].includes(url)) return CONFIG.legal;
  if (url.split('/').filter(Boolean).length === 1) return CONFIG.section;
  return CONFIG.subsection;
}

// Fetch dynamic pages from Supabase
async function fetchDynamicPages() {
  const dynamicPages = [];

  if (!supabase) {
    console.log('Skipping dynamic pages fetch (Supabase not available)');
    return dynamicPages;
  }

  try {
    // Fetch brands
    const { data: brands } = await supabase
      .from('brands')
      .select('slug')
      .order('name');

    if (brands && brands.length > 0) {
      brands.forEach(brand => {
        if (brand.slug) {
          dynamicPages.push(`/brands/${brand.slug}`);
        }
      });
      console.log(`Added ${brands.length} brand pages`);
    }

    // Fetch blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach(post => {
        if (post.slug) {
          dynamicPages.push(`/blog/${post.slug}`);
        }
      });
      console.log(`Added ${blogPosts.length} blog post pages`);
    }

    // Fetch places
    const { data: places } = await supabase
      .from('places')
      .select('id');

    if (places && places.length > 0) {
      places.forEach(place => {
        if (place.id) {
          dynamicPages.push(`/places/${place.id}`);
        }
      });
      console.log(`Added ${places.length} place pages`);
    }

    // Fetch events
    // Only fetch recent and future events to avoid indexing old, dead pages
    const { data: events } = await supabase
      .from('events')
      .select('id, category, end_date');

    if (events && events.length > 0) {
      const today = new Date();
      // Keep events that end in the future or ended in the last 90 days
      const retentionDate = new Date(today);
      retentionDate.setDate(today.getDate() - 90);

      let addedEvents = 0;

      events.forEach(event => {
        const endDate = event.end_date ? new Date(event.end_date) : new Date();
        // Only include if event is recent enough
        if (endDate >= retentionDate && event.id && event.category) {
          dynamicPages.push(`/events/${event.category}/${event.id}`);
          addedEvents++;
        }
      });
      console.log(`Added ${addedEvents} event pages (filtered from ${events.length} total events)`);
    }

  } catch (error) {
    console.error('Error fetching dynamic pages:', error);
  }

  return dynamicPages;
}

// Generate the sitemap XML content
function generateSitemapXml(urls) {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  sitemap += '                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  urls.forEach(url => {
    const config = getConfig(url);
    sitemap += '  <url>\n';
    sitemap += `    <loc>${DOMAIN}${url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
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
    console.log('Generating sitemap...\n');

    // Get all page files
    const files = glob.sync(PAGE_DIRS);
    console.log(`Found ${files.length} page files`);

    // Extract paths from files
    let urls = files.map(file => formatPath(file));

    // Filter out excluded pages and patterns
    const originalCount = urls.length;
    urls = urls.filter(url => !shouldExclude(url));
    console.log(`Excluded ${originalCount - urls.length} pages based on filters`);

    // Add static dynamic pages
    STATIC_DYNAMIC_PAGES.forEach(url => {
      if (!urls.includes(url)) {
        urls.push(url);
      }
    });
    console.log(`Added ${STATIC_DYNAMIC_PAGES.length} static dynamic pages`);

    // Fetch and add dynamic pages from database
    const dynamicPages = await fetchDynamicPages();
    dynamicPages.forEach(url => {
      if (!urls.includes(url)) {
        urls.push(url);
      }
    });

    // Remove duplicates and sort
    urls = [...new Set(urls)];
    urls.sort();

    // Generate and write the sitemap XML
    const sitemapXml = generateSitemapXml(urls);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapXml);

    console.log(`\n✅ Sitemap generated successfully with ${urls.length} URLs`);
    console.log('Location: public/sitemap.xml\n');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap();
