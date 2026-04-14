# Broken Links & Missing Images Audit Report

**Site:** sanluisway.com
**Date:** 2026-04-13
**Pages audited:** 40+ pages (all core, guides, blog posts, sample of 125 places, 104 events, 20 brands)
**Total sitemap URLs:** 455

---

## Summary

| Category | Count |
|----------|-------|
| Broken internal links (404) | **13 unique URLs** |
| Broken images | **0** |
| Links with `undefined` slug (code bug) | **6 instances** |
| Redirects (working but suboptimal) | **3** |

---

## CRITICAL - Code Bugs (Fix in source code)

### 1. `/brands/undefined` - 6 instances on Homepage
- **Status:** 404
- **Source file:** `src/components/home/BrandsShowcase.tsx:61`
- **Bug:** `href={`/brands/${brand.slug}`}` — some brands from Supabase DB don't have a `slug` field
- **Fix:** Use the same fallback as `src/pages/brands/index.tsx:188`:
  ```tsx
  href={`/brands/${brand.slug || generateBrandSlug(brand.name, brand.category, brand.city)}`}
  ```

### 2. `/modern-dining` - Homepage
- **Status:** 404
- **Source file:** `src/components/home/DiningSection.tsx:18`
- **Fix:** Change `link: '/modern-dining'` to `/restaurants` or create the page

### 3. `/cultural/language` - Homepage
- **Status:** 404
- **Source file:** `src/data/culture.ts:29`
- **Fix:** Either create `/cultural/language` page or change path to an existing page like `/cultural/customs-etiquette`

### 4. `/cultural-experiences` - 3 locations
- **Status:** 404
- **Source files:**
  - `src/components/ServiceCards.tsx:22`
  - `src/pages/guides/foodie-guide.tsx:479`
  - `src/pages/weekend-getaways.tsx:550`
- **Fix:** Change to `/cultural` or `/cultural-attractions`

---

## HIGH - Blog Post Links (Content stored in Supabase CMS)

These broken links are inside blog post content stored in the database. They need to be updated directly in Supabase.

### 5. `/blog/costo-de-vida-san-luis-potosi-2025`
- **Status:** 404
- **Found on:** `/blog/navigating-mexican-immigration-system-slp`
- **Fix:** Change to `/blog/cost-of-living-san-luis-potosi-2025` (correct English slug)

### 6. `/blog/costo-de-vida-san-luis-potosi-guia-completa`
- **Status:** 404
- **Found on:** `/blog/ultimate-guide-living-san-luis-potosi-expat`
- **Fix:** Change to `/blog/cost-of-living-san-luis-potosi-2025`

### 7. `/blog/mejores-colonias-san-luis-potosi-donde-vivir`
- **Status:** 404
- **Found on:** `/blog/ultimate-guide-living-san-luis-potosi-expat`
- **Fix:** Change to `/resources/neighborhoods-san-luis-potosi` (the existing neighborhoods page)

### 8. `/blog/centro-historico-san-luis-potosi-guia`
- **Status:** 404
- **Found on:** `/blog/ultimate-guide-living-san-luis-potosi-expat`
- **Fix:** Change to `/centro-historico`

### 9. `/directory`
- **Status:** 404
- **Found on:** `/blog/ultimate-guide-living-san-luis-potosi-expat`
- **Fix:** Change to `/places`

### 10. `/copa-potosi-2026`
- **Status:** 404
- **Found on:** `/blog/semana-santa-san-luis-potosi-2026-guia-completa`
- **Fix:** Remove the link or create the event page

### 11. `/category/tours`
- **Status:** 404
- **Found on:** `/blog/san-luis-rey-tranvia`
- **Fix:** Change to `/cultural-tours`

### 12. `/guides`
- **Status:** 404
- **Found on:** `/blog/san-luis-rey-tranvia`, `/blog/la-gran-via`
- **Fix:** Change to `/guides/foodie-guide` or `/resources/expat-guide` depending on context

### 13. `/category/restaurants-and-bars`
- **Status:** 404
- **Found on:** `/blog/la-gran-via`
- **Fix:** Change to `/restaurants`

---

## MINOR - Suboptimal Redirects (Working but should update)

These links work but go through a redirect, which is suboptimal for SEO:

| Current link | Redirects to | Found on |
|-------------|-------------|----------|
| `/expat-guide` | `/resources/expat-guide` | Homepage footer |
| `/living-guide` | `/resources/living-guide` | Homepage footer |
| `/events` | `/events/all` | Various pages |

---

## Images - All Clear

No broken images were detected across any page. All image sources are loading correctly:
- Next.js Image optimization (`/_next/image`) - OK
- Supabase storage images - OK
- Static images in `/images/` - OK
- External images (Unsplash, Wix) - OK

---

## Pages Audited (Full List)

### Core Pages (all clean)
`/`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/cookies`, `/advertise`, `/services`, `/community`

### Section Pages (all clean)
`/places`, `/events`, `/blog`, `/brands`, `/restaurants`, `/cultural`

### Cultural Subpages (all clean)
`/cultural-attractions`, `/cultural-tours`, `/cultural/history`, `/cultural/festivals`, `/cultural/music-dance`, `/cultural/culinary-traditions`, `/cultural/customs-etiquette`, `/cultural/religious-practices`

### Content Pages (all clean)
`/outdoors`, `/parque-tangamanga`, `/centro-historico`, `/traditional-cuisine`, `/family-friendly-activities`, `/farmers-markets-san-luis-potosi`, `/free-events-san-luis-potosi`, `/food-festivals-san-luis-potosi`, `/breakfast-spots-san-luis-potosi`, `/weekend-getaways`

### Featured Events (all clean)
`/festival-primavera-2026`, `/events/san-luis-metal-fest-2026`, `/events/maraton-tangamanga-2026`, `/events/fenapo-2026`

### Resource Guides (all clean)
`/resources/expat-guide`, `/resources/living-guide`, `/resources/safety-guide`, `/resources/health-guide`, `/resources/family-guide`, `/resources/school-guide`, `/resources/arrival-checklist`, `/resources/neighborhoods-san-luis-potosi`

### Other Guides (clean except foodie-guide)
`/guides/foodie-guide` (1 broken link), `/guides/potosino-wine-scene`, `/digital-nomad-guide`, `/visit-san-luis-potosi`

### Blog Posts
| Post | Status |
|------|--------|
| corazon-de-xoconostle | Clean |
| mining-history-baroque-architecture | Clean |
| top-5-cozy-cafes-winter | Clean |
| procesion-del-silencio-2026 | Clean |
| **ultimate-guide-living-expat** | **4 broken links** |
| **la-gran-via** | **2 broken links** |
| guia-completa-rentar-casa-2025 | Clean |
| cost-of-living-2025 | Clean |
| foreign-direct-investment | Clean |
| checklist-mudanza-15-pasos | Clean |
| **navigating-mexican-immigration** | **1 broken link** |
| fin-de-semana-familiar | Clean |
| **san-luis-rey-tranvia** | **2 broken links** |
| leonora-carrington-surrealism | Clean |
| potosino-art-history | Clean |
| **semana-santa-2026-guia** | **1 broken link** |

### Sample Places Pages (all clean)
Museo Laberinto, Capilla de Aranzazu + random samples

### Sample Events Pages (all clean)
La Texana at Multiforo Sonica + random samples

### Sample Brand Pages (all clean)
Chocolates Costanzo + random samples
