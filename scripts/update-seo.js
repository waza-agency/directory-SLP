/**
 * SEO Optimization Guide for San Luis Way
 * 
 * This document provides guidance on how to implement SEO optimization 
 * across all pages in the San Luis Way website.
 */

/**
 * Step 1: Ensure the SEO component is in place
 * 
 * The SEO component should be at: src/components/common/SEO.tsx
 * It handles:
 * - Page titles with proper formatting
 * - Meta descriptions
 * - Keywords
 * - Open Graph tags
 * - Twitter cards
 * - Canonical URLs
 * - Article schema when applicable
 */

/**
 * Step 2: Page update template
 * 
 * For each page in the src/pages directory, replace the <Head> component with the SEO component:
 * 
 * // FROM:
 * <Head>
 *   <title>Page Title - SLP Descubre</title>
 *   <meta name="description" content="Page description..." />
 *   <meta name="keywords" content="keywords1, keywords2, keywords3" />
 *   <meta property="og:title" content="Page Title - SLP Descubre" />
 *   <meta property="og:description" content="Page description..." />
 * </Head>
 * 
 * // TO:
 * <SEO
 *   title="Page Title"
 *   description="Enhanced page description with more details..."
 *   keywords="keyword1, keyword2, keyword3, additional keyword4, additional keyword5"
 *   ogImage="/path/to/relevant-image.jpg"
 *   ogType="website" // or "article" for blog posts
 * />
 */

/**
 * Step 3: SEO content guidelines
 * 
 * For each page, ensure:
 * 
 * 1. Title (50-60 characters):
 *    - Include main keyword near the beginning
 *    - Make it compelling and descriptive
 *    - Include location "San Luis Potosí" where relevant
 *    - End with site name "| San Luis Way" (handled by component)
 * 
 * 2. Description (150-160 characters):
 *    - Summarize page content
 *    - Include primary keyword naturally
 *    - Add a call to action or value proposition
 *    - Make it compelling for users to click
 * 
 * 3. Keywords (10-15 relevant terms):
 *    - Start with most important terms
 *    - Include variations and long-tail keywords
 *    - Include location-based terms
 *    - Add expat/visitor specific terms
 * 
 * 4. Images:
 *    - Always use descriptive, keyword-rich alt text
 *    - Choose relevant, high-quality images for OG tags
 *    - Ensure OG images are 1200x630px for optimal sharing
 */

/**
 * Step 4: Important pages to prioritize
 * 
 * 1. Homepage (index.tsx) - Already updated
 * 2. About page (about.tsx) - Already updated
 * 3. FAQ page (faq.tsx) - Already updated
 * 4. Main section landing pages:
 *    - places.tsx
 *    - events/index.tsx
 *    - cultural/index.tsx - Already updated
 *    - services.tsx
 *    - community.tsx
 *    - local-connections/index.tsx
 * 
 * 5. High-traffic content pages:
 *    - cultural/festivals.tsx
 *    - cultural/language.tsx
 *    - expat-guide.tsx
 *    - living-guide.tsx
 *    - guides/* - All guide pages
 */

/**
 * Step 5: Additional SEO improvements
 * 
 * 1. Ensure all images have descriptive alt text
 * 2. Use semantic HTML (h1, h2, h3) properly
 * 3. Optimize content with relevant keywords naturally placed
 * 4. Add schema markup for specific content types (handled by SEO component)
 * 5. Ensure mobile responsiveness (already implemented with Tailwind)
 * 6. Improve page load speed 
 * 7. Use descriptive URLs that include keywords
 */

/**
 * Example SEO implementations for different page types:
 */

// Example for Service Page:
/*
<SEO
  title="Legal & Administrative Services in San Luis Potosí"
  description="Professional legal and administrative support for expatriates in SLP. Expert assistance with residency permits, banking setup, tax considerations, and official procedures."
  keywords="legal services, administrative services, San Luis Potosí, residency permits, banking setup, tax consultation, legal documentation, expat legal help, Mexico paperwork"
  ogImage="/images/legal-administrative/hero.jpg"
/>
*/

// Example for Guide Page (article type):
/*
<SEO
  title="The Ultimate Foodie Guide to San Luis Potosí"
  description="From street tacos to fine dining: Your complete guide to San Luis Potosí's culinary scene, local delicacies, and must-try restaurants."
  keywords="San Luis Potosí food, SLP restaurants, Mexican cuisine, enchiladas potosinas, where to eat in SLP, food guide, traditional dishes, best restaurants"
  ogImage="/images/guides/foodie-guide-header.jpg"
  ogType="article"
  article={{
    publishedTime: "2023-04-15T08:00:00+00:00",
    modifiedTime: "2023-06-10T10:30:00+00:00",
    tags: ["food", "cuisine", "restaurants", "dining", "San Luis Potosí"]
  }}
/>
*/ 