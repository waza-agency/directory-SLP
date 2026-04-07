# SEO Improvement Checklist — sanluisway.com

Derived from the 2026-04-06 full audit (see `SEO_AUDIT_REPORT.md`). Items are grouped by priority. Check off as completed.

Legend: `[ ]` pending · `[~]` in progress · `[x]` done · `[!]` blocked

---

## CRITICAL — this week

### Per-page metadata fixes (missing or weak)
- [x] **`/parque-tangamanga`** — page has NO `<title>`, meta description, canonical, or OG tags. File: `src/pages/parque-tangamanga.tsx`. Add `SEO` component + TouristAttraction JSON-LD. _(done — commit 3fc19b29)_
- [x] **`/restaurants`** — uses raw `<Head>` with weak title `"All Restaurants - SLP Descubre"`. File: `src/pages/restaurants.tsx`. Replace with `SEO` component + ItemList schema. _(done — commit 3fc19b29)_
- [x] **`/traditional-cuisine`** — uses raw `<Head>` with `"Traditional Cuisine - SLP Descubre"` title and thin description. File: `src/pages/traditional-cuisine.tsx`. Replace with `SEO`. _(done — commit 3fc19b29)_
- [x] **`/cultural-attractions`** — has BOTH `<SEO>` and `<Head>` causing conflicting metadata (Head overrides). File: `src/pages/cultural-attractions.tsx`. Remove the raw `<Head>` block. _(done — commit 3fc19b29)_

### Stale-year titles ("2025" → drop or use 2026)
- [x] **`/` (homepage)** — title reworked to `"San Luis Potosí Expat Guide: Things to Do, Places to Eat & Live"`. _(done — commit c4360790)_
- [x] **`/resources/safety-guide`** — removed 2025 from title + og:title. _(done — commit c4360790)_
- [x] **`/resources/neighborhoods-san-luis-potosi`** — removed 2025 from title. _(done — commit c4360790)_
- [x] **`/resources/family-guide`** — removed 2025 from title. _(done — commit c4360790)_
- [x] **`/resources/expat-guide`** — removed 2025 from title + og:title. _(done — commit c4360790)_
- [x] **`/resources/living-guide`** — removed 2025 from title + og:title + JSON-LD headline; dateModified bumped to 2026-04-06. _(done — commit c4360790)_
- [x] **`/expat-guide`** — removed 2025 from title + og:title. _(done — commit c4360790)_
- [ ] Review body-content references to 2025 (`<h1>` "Family Living 2025", "VERIFIED 2025" badges, "Last updated: December 2025") — these are factual claims that should only be updated when the underlying content is actually reviewed.

### Awkward Spanish in meta description
- [x] **`/events/[category]`** — description rewritten; template now reads `"${getCategoryTitle(category)} en San Luis Potosí. Agenda cultural, conciertos, festivales y actividades familiares..."` which is grammatically correct for every category. _(done — commit c4360790)_

### "SLP Descubre" leftover branding
- [x] Removed from `events/[category]/index.tsx`, `restaurants.tsx`, `traditional-cuisine.tsx`, `cultural-attractions.tsx`. _(done — commits 3fc19b29 + c4360790)_

### Core Web Vitals — Mobile LCP 18.2s → <2.5s
- [x] **Defer AdSense, GTM, GA4 scripts** with `next/script`. Moved out of `_document.tsx` (where they blocked during HTML parse) into `_app.tsx` with `strategy="afterInteractive"` for GTM/GA4/Google Ads and `strategy="lazyOnload"` for AdSense. _(done — current commit)_
- [ ] **Hero images**: self-host instead of pulling from `images.unsplash.com`. Start with `/events/all` hero carousel and homepage hero.
- [ ] **Hero image tag**: use `next/image` with `priority` prop, explicit `width`/`height`, and `sizes="(max-width: 768px) 100vw, 1200px"`.
- [ ] **Remove `loading="lazy"`** from above-the-fold images (forces a round-trip).
- [ ] **Add `fetchpriority="high"`** to the LCP image.
- [ ] **Reserve hero container** with `aspect-ratio` CSS or explicit min-height so nothing shifts (fixes CLS 0.206).
- [x] **Fix BetaBanner CLS culprit** — banner used to mount post-hydration via `useState(false)` then flip on, pushing every section down. Now SSR-renders visible by default and uses `sticky top-0 z-40` + `transform: translateY(-100%)` for scroll-collapse so nothing below shifts. _(done — current commit)_
- [ ] **Gate Stripe** (`js.stripe.com`) to `/checkout` route only — currently nothing actively loads it, but `js.stripe.com` stays in CSP allowlist; remove from CSP too if checkout feature remains disabled.
- [x] **Optimize font loading** — Inter + Crimson Pro migrated to `next/font/google`. Fonts now self-hosted at build time, render-blocking stylesheet removed, `adjustFontFallback` eliminates CLS on swap. _(done — commit pending)_

### Image optimization (next.config.js)
- [x] **`unoptimized: true` removed** — image optimization re-enabled. AVIF/WebP, responsive srcset, automatic resizing all now active. `remotePatterns` covers all remote hosts. _(done — commit aa2d6fca)_
- [x] **Removed deprecated `domains` array** from `next.config.js` images config. _(done — commit aa2d6fca)_

### GSC sitemap warnings
- [ ] Open Google Search Console → Indexing → Sitemaps → `sitemap.xml` → review the **121 warnings**. Common causes: 4xx URLs in sitemap, canonicalized-away URLs, noindex URLs. Remove affected URLs from sitemap.

---

## HIGH — within 1 week

### Schema / structured data
- [x] **TouristInformationCenter + Organization + WebSite** schema on homepage. Includes `areaServed`, `geo`, `priceRange`, `address`, `sameAs` (Wikidata Q80786 + Wikipedia), and SearchAction. _(done — current commit)_
- [ ] **TouristAttraction / Place** schema on:
  - [ ] `/parque-tangamanga` (done as part of metadata fix)
  - [ ] `/centro-historico`
  - [ ] `/cultural/history`
  - [ ] `/cultural-attractions`
- [ ] **Event** schema on each event detail page (`src/pages/events/[category]/[id].tsx`) with `@type: Event`, `name`, `startDate`, `endDate`, `location` (Place with address + geo), `image`, `offers` if ticketed, `organizer`.
- [ ] **ItemList** schema on:
  - [ ] `/events/[category]` index pages (wraps event list)
  - [ ] `/restaurants` (wraps restaurant list)
  - [ ] `/places` (already has SEO, add structuredData prop)
- [ ] **Restaurant** schema on individual restaurant detail pages.
- [ ] **BreadcrumbList** schema on every non-home page (add to `_app.tsx` or Layout).

### GEO / AI search readiness
- [x] **Published `/public/llms.txt`** following llmstxt.org spec — name, description, top-level URLs grouped by Places, Food, Events, Cultural, Living/Expat, Community. _(done — current commit)_
- [x] **Added sameAs links** on Organization schema pointing to Wikidata Q80786 + Wikipedia. Instagram/LinkedIn pending until accounts confirmed. _(done — current commit)_
- [ ] **Convert guide H2/H3s to question form** where possible ("How safe is SLP?", "Where should expats live in SLP?") — AI Overviews prefer Q&A headings.
- [ ] **Add structured tables** for data-dense guides (rent by neighborhood, crime stats, school tuition ranges) — AI systems prefer extractable tables.

### HTML lang & og:locale
- [x] **`<html lang>` per route** — `_document.tsx` already uses `props.__NEXT_DATA__.locale` via `<Html lang={currentLocale}>`. Verified 2026-04-06. _(already done)_
- [x] **`og:locale` per route** — SEO component already uses `router.locale` to map en→en_US, es→es_MX. Verified `src/components/common/SEO.tsx:55`. _(already done)_

### Hreflang
- [x] **Removed `hreflang` for `de` and `ja`** — no German/Japanese content existed, were pointing to English homepage which is actively harmful per Google docs. _(done — current commit)_
- [x] **`hreflang="es"` points to `/es`** — verified in `_document.tsx`. Per-page alternates would be better but root-level x-default + en/es is at minimum correct now. _(done — current commit)_

### Quick-win landing pages (keywords already rank page 1)
- [ ] **`/family-friendly-activities-san-luis-potosi`** — 1,338 impressions / pos 9.7 / 0 clicks. Keyword: "family friendly activities". NOTE: page already exists at `/family-friendly-activities` — check if URL matches searcher intent or needs a Spanish-area-locked variant.
- [ ] **`/free-events-san-luis-potosi`** — 737 imp / pos 7.6 / 0 clicks. Keyword: "free events near me". Filter /events/all by free admission + dedicated landing.
- [ ] **`/farmers-markets-san-luis-potosi`** — 127 imp / pos **5.4** / 0 clicks (closest to page 1 top!). Keyword: "farmers market near me". LocalBusiness list with schedule.
- [ ] **`/food-festivals-san-luis-potosi`** — 118 imp / pos 9.7. Keyword: "food festivals near me".
- [ ] **`/breakfast-spots-san-luis-potosi`** — 73 imp / pos 7.9. Keyword: "best breakfast spots near me".

---

## MEDIUM — within 1 month

- [ ] **Rewrite event detail URLs** from `/events/{category}/{uuid}` to `/events/{category}/{slug}-{short-id}` for keyword relevance. Add 301 redirects from old UUIDs.
- [ ] **Add "Last updated" dates** visible on all `/resources/*` and `/cultural/*` guides. Use a shared `<LastUpdated date={...}/>` component.
- [ ] **Add author bylines** to editorial content — blog posts, resources, guides. Create `Person` schema for each author and link via `author` property on BlogPosting/Article.
- [ ] **Split sitemap into an index** — emit `/sitemap.xml` → index → `/sitemap-pages.xml`, `/sitemap-events.xml`, `/sitemap-places.xml`, `/sitemap-blog.xml`. Emit real per-page `lastmod` (currently all stuck on `2025-12-08`).
- [ ] **Optimize top-10 images** — convert to WebP/AVIF, add responsive `srcset`/`sizes`. Target: save the 525–631 KB PSI flagged.
- [ ] **Audit bundle with `@next/bundle-analyzer`** — find chunks >50 KB, especially unused translations or duplicate libs.
- [ ] **Rewrite meta descriptions** for all pages ranking page 1–2 with 0 clicks — add a call-to-action and benefit statement. Target: 2–3× CTR.
- [x] **Unified robots.txt host** — sitemap now points to apex `sanluisway.com` (matches GSC). _(done — current commit)_
- [x] **Removed `Crawl-delay: 1`** from robots.txt. _(done — current commit)_
- [ ] **Fix links-without-descriptive-text** Lighthouse audit failure — replace "click here", "read more", icon-only links with descriptive labels or `aria-label`.
- [ ] **Fix button accessibility names** — Lighthouse flagged buttons without accessible names. Add `aria-label` to icon-only buttons.
- [ ] **Fix color contrast** flagged in Lighthouse accessibility.
- [ ] **Fix touch target size** — minimum 48×48px per Material/WCAG.

---

## LOW — backlog

- [ ] Set up `scripts/gsc_inspect.py` automation for the top 50 URLs to track indexation status weekly via GSC URL Inspection API.
- [ ] Build a `/sitemaps-report.json` internal monitoring file that flags pages missing title/description/canonical on build (fail build in CI).
- [ ] Add `Review` / `AggregateRating` schema once real user reviews exist on places/restaurants.
- [ ] Evaluate DataForSEO or Moz API integration for backlink profile analysis.
- [ ] Submit "San Luis Way" to Wikidata as an organization entity to strengthen the brand knowledge graph.
- [ ] Implement a `<LastUpdated>` build-time date injector that reads git log for each page.
- [x] Added `/robots.txt` explicit rules for AI crawlers — GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended. _(done — current commit)_

---

## Re-audit cadence

After completing CRITICAL and HIGH sections, re-run:
- `python scripts/pagespeed_check.py https://sanluisway.com --strategy mobile`
- `python scripts/gsc_query.py query --property sc-domain:sanluisway.com --days 28 --dimensions query,page --limit 100 --json`
- `python scripts/ga4_report.py --property 494279422 --days 28`

Target deltas: mobile perf ≥70, CLS <0.1, CTR ≥1.5%, indexed pages warnings <20.
