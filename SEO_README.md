# SEO Guide for SLP Directory

This README provides instructions on how to manage and optimize the SEO aspects of the SLP Directory website.

## Sitemap & Robots.txt

The site includes both a static sitemap.xml file and dynamic generation capabilities to ensure search engines can discover and index your content efficiently.

### Sitemap

The sitemap is available at: `https://yourdomain.com/sitemap.xml`

#### How it works:

1. **Static version:** A comprehensive sitemap.xml file is stored in the `/public` directory.
2. **Dynamic generation:** A script at `scripts/generate-sitemap.js` can automatically scan the codebase and generate an updated sitemap.
3. **API endpoint:** The route `/api/sitemap.ts` serves the sitemap dynamically, allowing for customizations based on environment.

#### To update the sitemap:

1. **Automatic generation:**
   ```bash
   npm run generate-sitemap
   ```
   This will create/update the `/public/sitemap.xml` file.

2. **Manual update:**
   - Edit the static `/public/sitemap.xml` file directly
   - Or modify `scripts/generate-sitemap.js` to include new routes before regenerating

3. **For dynamic routes:**
   - Update the `DYNAMIC_PAGES` array in `scripts/generate-sitemap.js` to include new dynamic routes
   - Then regenerate the sitemap

### Robots.txt

The robots.txt file controls which parts of your site search engines are allowed to crawl.

#### How it works:

1. **Static file:** A `robots.txt` file in the root directory provides the basic rules
2. **Dynamic serving:** The API route `/api/robots.ts` serves the robots.txt content with dynamic customizations

#### To update robots.txt:

Edit the root `/robots.txt` file to:
- Allow/disallow specific directories
- Add or remove crawlers
- Update the sitemap URL if needed

## Best Practices for SEO

### Page Metadata

Ensure each page has proper metadata:

```typescript
// Example component with SEO metadata
import Head from 'next/head';

export default function YourPage() {
  return (
    <>
      <Head>
        <title>Page Title | SLP Directory</title>
        <meta name="description" content="Description of the page content" />
        <meta property="og:title" content="Page Title | SLP Directory" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://yourdomain.com/images/share-image.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com/your-page/" />
      </Head>
      {/* Page content */}
    </>
  );
}
```

### URL Structure

- Use descriptive, keyword-rich URLs
- Keep URLs short and human-readable
- Use hyphens to separate words
- Maintain a logical hierarchy

### Image Optimization

- Always include descriptive `alt` text for images
- Use appropriate dimensions and file formats
- Use the Next.js `<Image>` component for automatic optimization

### Performance

- Run Lighthouse audits regularly to identify performance issues
- Minimize unused JavaScript and CSS
- Optimize images and implement lazy loading
- Consider implementing preloading for critical assets

## Testing Your SEO

1. **Google Search Console:**
   - Register your site with Google Search Console
   - Submit your sitemap
   - Monitor indexing status and issues

2. **Lighthouse:**
   - Use Chrome DevTools or https://web.dev/measure to run Lighthouse audits
   - Focus on the SEO and Performance categories

3. **Rich Results Test:**
   - Use https://search.google.com/test/rich-results to test structured data

4. **Mobile-Friendly Test:**
   - Use https://search.google.com/test/mobile-friendly to ensure your site works well on mobile devices

## Troubleshooting

If your pages aren't being indexed:

1. Check that `robots.txt` isn't blocking the pages
2. Verify the pages are included in the sitemap
3. Check for `noindex` meta tags that might be preventing indexing
4. Test the pages with Google Search Console's URL Inspection tool
5. Ensure pages are accessible (no 404, 500, or other errors)
6. Check that the site's overall SEO score is good in Lighthouse audits 