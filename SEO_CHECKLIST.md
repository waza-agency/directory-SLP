# SEO Improvement Checklist — sanluisway.com

Derived from the 2026-04-06 full audit (see `SEO_AUDIT_REPORT.md`). Items are grouped by priority. Check off as completed.

Legend: `[ ]` pending · `[~]` in progress · `[x]` done · `[!]` blocked

---

## CRITICAL — this week

### Per-page metadata fixes (missing or weak)
- [ ] **`/parque-tangamanga`** — page has NO `<title>`, meta description, canonical, or OG tags. File: `src/pages/parque-tangamanga.tsx`. Add `SEO` component + TouristAttraction JSON-LD.
- [ ] **`/restaurants`** — uses raw `<Head>` with weak title `"All Restaurants - SLP Descubre"`. File: `src/pages/restaurants.tsx`. Replace with `SEO` component + ItemList schema.
- [ ] **`/traditional-cuisine`** — uses raw `<Head>` with `"Traditional Cuisine - SLP Descubre"` title and thin description. File: `src/pages/traditional-cuisine.tsx`. Replace with `SEO`.
- [ ] **`/cultural-attractions`** — has BOTH `<SEO>` and `<Head>` causing conflicting metadata (Head overrides). File: `src/pages/cultural-attractions.tsx`. Remove the raw `<Head>` block.

### Stale-year titles ("2025" → drop or use 2026)
- [ ] **`/` (homepage)** — title ends in "Your Elegant Expat Guide **2025**". File: `src/pages/index.tsx` line ~247.
- [ ] **`/resources/safety-guide`** — title "Complete Safety Guide **2025**". File: `src/pages/resources/safety-guide.tsx` line ~64.
- [ ] **`/resources/neighborhoods-san-luis-potosi`** — title "Neighborhoods Guide San Luis Potosí **2025**". File: `src/pages/resources/neighborhoods-san-luis-potosi.tsx` line ~250.
- [ ] Grep the whole `src/pages/` tree for `"2025"` in title/description strings and fix any remaining hardcoded years. Replace with `new Date().getFullYear()` or remove entirely.

### Awkward Spanish in meta description
- [ ] **`/events/[category]`** — description reads `"Descubre los mejores todos los eventos..."` (wrong word order). File: `src/pages/events/[category]/index.tsx` line ~125-126. Should be `"Descubre todos los mejores eventos y actividades..."`. Also drop "SLP Descubre" from the title template.

### "SLP Descubre" leftover branding
- [ ] Global find/replace for `"SLP Descubre"` across `src/pages/` — if not an active brand, remove from titles and descriptions. Confirmed in:
  - `events/[category]/index.tsx`
  - `restaurants.tsx` (fixed via SEO refactor)
  - `traditional-cuisine.tsx` (fixed via SEO refactor)
  - `cultural-attractions.tsx` (fixed via Head cleanup)

### Core Web Vitals — Mobile LCP 18.2s → <2.5s
- [ ] **Hero images**: self-host instead of pulling from `images.unsplash.com`. Start with `/events/all` hero carousel and homepage hero.
- [ ] **Hero image tag**: use `next/image` with `priority` prop, explicit `width`/`height`, and `sizes="(max-width: 768px) 100vw, 1200px"`.
- [ ] **Remove `loading="lazy"`** from above-the-fold images (forces a round-trip).
- [ ] **Add `fetchpriority="high"`** to the LCP image.
- [ ] **Reserve hero container** with `aspect-ratio` CSS or explicit min-height so nothing shifts (fixes CLS 0.206).
- [ ] **Defer AdSense, ad-quality, and GTM scripts** with `next/script strategy="lazyOnload"`.
- [ ] **Gate Stripe** (`js.stripe.com`) to the `/checkout` route only — currently loads on every page.

### GSC sitemap warnings
- [ ] Open Google Search Console → Indexing → Sitemaps → `sitemap.xml` → review the **121 warnings**. Common causes: 4xx URLs in sitemap, canonicalized-away URLs, noindex URLs. Remove affected URLs from sitemap.

---

## HIGH — within 1 week

### Schema / structured data
- [ ] **LocalBusiness / TouristInformationCenter** schema on homepage. Include `areaServed`, `geo`, `priceRange`, `openingHours`.
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
- [ ] **Publish `/public/llms.txt`** following the llmstxt.org spec — name, description, top-level URLs by category (Events, Places, Resources, Blog), link to a `/llms-full.txt` variant.
- [ ] **Add sameAs links** on Organization schema pointing to Wikidata (Q80786 for San Luis Potosí city), Wikipedia, Instagram, LinkedIn — strengthens brand entity graph.
- [ ] **Convert guide H2/H3s to question form** where possible ("How safe is SLP?", "Where should expats live in SLP?") — AI Overviews prefer Q&A headings.
- [ ] **Add structured tables** for data-dense guides (rent by neighborhood, crime stats, school tuition ranges) — AI systems prefer extractable tables.

### HTML lang & og:locale
- [ ] **Fix `<html lang>`** per route in `_document.tsx` or via `_app.tsx` — currently always `"en"` even on Spanish pages. Use the router locale.
- [ ] **Fix `og:locale`** to match page content language (already done in SEO component via `router.locale`, but verify).

### Hreflang
- [ ] **Remove `hreflang` for `de` and `ja`** unless real German/Japanese content exists — currently all pointing to the same English URL.
- [ ] **Verify `hreflang="es"` points to the actual Spanish route** (`/es/*`), not the default URL.

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
- [ ] **Unify robots.txt host declaration** — currently lists `www.sanluisway.com/sitemap.xml` but GSC references `sanluisway.com/sitemap.xml`. Pick one host.
- [ ] **Remove `Crawl-delay: 1`** from robots.txt — Googlebot ignores it and it creates confusion.
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
- [ ] Add `/robots.txt` explicit rules for AI crawlers (GPTBot, ClaudeBot, Perplexity-Bot, Google-Extended) — currently implicitly allowed via `User-agent: *`. Explicit allow is clearer and audit-friendly.

---

## Re-audit cadence

After completing CRITICAL and HIGH sections, re-run:
- `python scripts/pagespeed_check.py https://sanluisway.com --strategy mobile`
- `python scripts/gsc_query.py query --property sc-domain:sanluisway.com --days 28 --dimensions query,page --limit 100 --json`
- `python scripts/ga4_report.py --property 494279422 --days 28`

Target deltas: mobile perf ≥70, CLS <0.1, CTR ≥1.5%, indexed pages warnings <20.
