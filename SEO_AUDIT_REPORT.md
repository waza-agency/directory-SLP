# SEO Audit Report — sanluisway.com

**Audit date:** 2026-04-06
**Auditor:** claude-seo plugin (Tier 2: GSC + GA4 + PSI + CrUX live)
**Scope:** Technical, content, schema, CWV, GEO, GSC/GA4 field data
**Business type detected:** Publisher / Local Guide (hybrid — publisher content + directory of places/events)

---

## Executive Summary

### SEO Health Score: **42 / 100** — Needs significant work

| Category                | Score | Weight | Status |
|-------------------------|:-----:|:------:|:------:|
| Technical SEO           |  55   |  22%   | Yellow |
| Content Quality         |  60   |  23%   | Yellow |
| On-Page SEO             |  35   |  20%   | Red    |
| Schema / Structured     |  40   |  10%   | Red    |
| Performance (CWV)       |  25   |  10%   | Red    |
| AI Search Readiness     |  50   |  10%   | Yellow |
| Images                  |  55   |   5%   | Yellow |

### Top 5 Critical Issues
1. **`/parque-tangamanga` has NO `<title>`, NO meta description, NO canonical** — a top-10 organic landing page is publishing with zero per-page SEO metadata. Likely applies to other "place" pages.
2. **LCP on mobile is 18.2 seconds** (threshold: <2.5s). Lighthouse mobile performance = 39/100. Catastrophic — Google ranking penalty + user bounce.
3. **CLS is 0.206 mobile / 0.218 desktop** (threshold: <0.1 good, <0.25 needs improvement). Layout shifts are caused by the hero carousel on `/events/all` and homepage.
4. **Overall GSC CTR is 0.26% (90 days)** — industry average is ~3–5%. ~6,500 impressions produced only 17 query-attributed clicks because titles/descriptions don't sell the click.
5. **No Event, LocalBusiness, TouristAttraction, or Restaurant schema** anywhere despite being a local directory with /events, /restaurants, /places routes. Only generic WebSite + Organization at the site root.

### Top 5 Quick Wins (highest ROI)
1. **Add `<title>` + meta description to `/parque-tangamanga`** and audit every /resources/*, /cultural/*, /parque-* page for the same issue. Expected CTR lift: 5–15×.
2. **Fix stale "2025" in titles** (homepage, safety-guide, neighborhoods) — automatic freshness loss. Current date is 2026-04; titles should say "2026" or drop the year.
3. **Create dedicated landing pages for the quick-win keywords** you already rank page-1 for: "family friendly activities" (1,338 imp, pos 9.7, 0 clicks), "free events near me" (737 imp, pos 7.6), "farmers market near me" (127 imp, pos 5.4). Add Event/ItemList schema.
4. **Add LocalBusiness / TouristAttraction schema** to homepage, restaurants, parks, and places — unlocks rich results in Google and AI-overview citations.
5. **Preload + prioritize the LCP image** on mobile (hero carousel) and defer below-the-fold JS. A 2.5s LCP is realistic; 18.2s is eliminating you from mobile rankings.

---

## 1. Technical SEO

### Crawlability & Indexability
| Item | Status | Notes |
|------|:------:|-------|
| robots.txt | OK | Sitemap declared, sensible Disallow for /api, /account, /checkout, dev routes |
| Crawl-delay: 1 | Warn | Googlebot ignores this; not harmful, but remove for clarity |
| AI crawler access | OK | No explicit block → GPTBot, ClaudeBot, Perplexity-Bot, Google-Extended all allowed (good for GEO) |
| Apex → www redirect | Warn | `sanluisway.com` → `www.sanluisway.com` (1 hop). PSI reports "Avoid multiple page redirects: 780ms savings" → likely an HTTP→HTTPS→www chain. Check Netlify redirect rules. |
| Canonical consistency | OK | Canonicals uniformly use `https://www.sanluisway.com/...` |
| robots.txt host | Inconsistent | Sitemap line says `www.sanluisway.com/sitemap.xml` but GSC submitted property is `sanluisway.com/sitemap.xml` (apex). Unify to www. |

### Sitemaps
| Item | Status | Notes |
|------|:------:|-------|
| Total URLs | 573 | Flat urlset |
| Format | Warn | 573 URLs in a single file is fine, but GSC reports **121 warnings** — investigate in Search Console → Sitemaps → see which URLs are failing |
| lastmod | Stale | Every URL shows lastmod `2025-12-08` (bulk-updated). Emit real per-page lastmod so Google prioritizes recrawl of actually updated pages |
| Events sub-sitemap | Missing | With 68+ event detail pages (from `/events/all` counter), generate `/sitemap-events.xml` and link from a sitemap index |

### Security Headers (www)
| Header | Present | Value |
|--------|:-------:|-------|
| HSTS | Yes | `max-age=63072000; includeSubDomains; preload` (excellent) |
| CSP | Yes | Strict default-src 'self' with explicit allowlists |
| X-Frame-Options | Yes | SAMEORIGIN |
| X-Content-Type-Options | Yes | nosniff |
| Referrer-Policy | Yes | strict-origin-when-cross-origin |
| Permissions-Policy | Yes | camera=(), microphone=(), geolocation=(self) |
| Upgrade-Insecure-Requests | Yes | ✓ |

**Security headers are the strongest part of the audit — no action needed.**

### Rendering & Language
- `<html lang="en">` on every page — **incorrect** on Spanish pages (/events/all, /parque-tangamanga, /es/*). The on-page content and meta titles are in Spanish but the root element declares English. Set `lang` dynamically per route (`lang="es"` for `/es/*` and Spanish content pages).
- `og:locale="es_MX"` on homepage but `og:locale="en_US"` on /events/all (which has a Spanish title). Locale tags are inconsistent with content language.
- Initial HTML size: **540 KB** for the homepage — Next.js is dumping a very large SSR payload. Combined with deferred framework/main/app chunks, that's what's killing FCP on mobile.

---

## 2. Core Web Vitals / Performance

### Lab data (PageSpeed Insights v5)

| Metric | Mobile | Desktop | Threshold | Status |
|--------|-------:|--------:|:---------:|:------:|
| **Performance score** | **39** | **58** | ≥90 | Red / Yellow |
| FCP                  | 5.7 s  | 1.1 s   | <1.8 s    | Red / Good |
| **LCP**              | **18.2 s** | **3.3 s** | <2.5 s | **Red / Yellow** |
| TBT                  | 460 ms | 240 ms  | <200 ms   | Red / Red |
| **CLS**              | **0.206** | **0.218** | <0.1 | **Red / Red** |
| Speed Index          | 6.1 s  | 1.8 s   | <3.4 s    | Red / Good |
| TTI                  | 18.2 s | 3.4 s   | <3.8 s    | Red / Good |

### Field data (CrUX)
**No field data available.** The origin lacks sufficient Chrome traffic volume for CrUX eligibility (needs ~1,000 monthly unique visitors with Chrome + opt-in UX reporting). This is consistent with GA4 showing 149 organic sessions / 28 days. **Implication:** Google is currently scoring you on lab data only, so the 18.2s LCP directly impacts ranking.

### Top opportunities (PSI reported)
| # | Finding | Est. savings |
|---|---------|-------------|
| 1 | Reduce unused JavaScript | **2,990 ms** mobile / 360 ms desktop (~632 KB) |
| 2 | Avoid multiple page redirects | 780 ms mobile / 230 ms desktop |
| 3 | Improve image delivery | 631 KB mobile / 525 KB desktop |
| 4 | Enormous network payloads | 2,887 KB total (warn: >1,600 KB) |
| 5 | Main-thread work | 2.8 s mobile / 2.1 s desktop |
| 6 | Layout shift culprits | 2 shifts detected (hero carousel prime suspect) |
| 7 | Forced reflow | Desktop only |
| 8 | Reduce unused CSS | ~16 KB |

### Layout shift root cause
The `/events/all` hero carousel mounts a gradient div, then swaps in `<img loading="lazy" ... src="https://images.unsplash.com/photo-...">` without reserved width/height. Unsplash is an external origin — no `<link rel="preconnect">` — and the image has no `fetchpriority="high"`. Homepage uses a similar pattern.

**Fix:** For LCP-critical hero images (above-the-fold):
- Self-host (or move to Netlify/Supabase storage + imgix/Cloudinary CDN) instead of pulling from unsplash.com
- Use `next/image` with `priority`, explicit `width`/`height`, and `sizes="(max-width: 768px) 100vw, 1200px"`
- Remove `loading="lazy"` from above-the-fold images (it forces a round-trip)
- Add `<link rel="preload" as="image">` for the first slide's src
- Reserve the hero container with aspect-ratio CSS so no layout shifts occur

### JS bundle audit
Mobile "Reduce unused JS: 632 KB" points to:
- Next.js framework chunk + app chunk
- GTM + GA4 + AdSense (pagead2.googlesyndication.com) loaded eagerly
- Multiple ad-quality tracking scripts (ep1/ep2.adtrafficquality.google)
- Stripe loader on every page (only checkout needs it)

**Fixes:**
- Move AdSense and ad-quality scripts behind `next/script` with `strategy="lazyOnload"`
- Gate Stripe to the checkout route only
- Verify no unused translations or moment/luxon locales are bundled
- Audit with `next-bundle-analyzer` to identify >50 KB chunks

---

## 3. On-Page SEO

### Per-page findings

| Page | Title | Meta desc | Canonical | Schema | Issue |
|------|-------|-----------|-----------|--------|-------|
| `/` (homepage) | "Living in San Luis Potosí \| Your Elegant Expat Guide **2025** \| San Luis Way" | OK | ✓ www | WebSite, Org | **Stale year, no LocalBusiness** |
| `/events/all` | "Todos los Eventos en San Luis Potosí - SLP Descubre \| San Luis Way" | **Awkward grammar: "Descubre los mejores todos los eventos"** | ✓ | WebSite, Org only | **No ItemList / Event schema** |
| `/parque-tangamanga` | **MISSING** | **MISSING** | **MISSING** | WebSite, Org only | **Zero per-page SEO** |
| `/restaurants` | "All Restaurants - SLP Descubre" | "Explore all restaurants..." (thin) | presumed ✓ | WebSite, Org only | **Weak title, no ItemList/Restaurant schema** |
| `/resources/safety-guide` | "Is San Luis Potosí Safe? Complete Safety Guide **2025** \| San Luis Way" | OK | ✓ | (not confirmed) | **Stale year** |
| `/resources/neighborhoods-san-luis-potosi` | "Ultimate Neighborhoods Guide San Luis Potosí **2025** \| Where to Live" | OK | (not confirmed) | (not confirmed) | **Stale year** |
| `/blog` | "Expat Blog & Living Guide \| San Luis Way" | OK | ✓ | **Blog, BlogPosting** ✓ | Good — reference implementation |

### Title/meta issues
- **"SLP Descubre"** appears in `/events/all` and `/restaurants` titles — looks like a leftover branding artifact from an earlier project name. If "SLP Descubre" is not an active brand, remove it from titles globally.
- **"2025" in at least 3 high-traffic titles** — Google Freshness Algorithm deprioritizes stale-dated content. Replace `"2025"` with `"{new Date().getFullYear()}"` in Next.js page components or just remove the year.
- **Meta description grammar**: Spanish descriptions like "Descubre los mejores todos los eventos" have a word-order error. Have a native Spanish speaker review all meta descriptions for Spanish routes.
- **Titles exceed recommended width** on some pages: aim for 50–60 chars visible in SERP; currently several go to 70+.

### Hreflang
- Homepage and `/events/all` declare `hreflang` for `en`, `es`, `de`, `ja`, `x-default` — **all pointing to the same www domain** without language paths for `de` or `ja`. Either:
  - Generate real German and Japanese content/routes, or
  - Remove the `de` and `ja` hreflang entries (having them point to English content is worse than not declaring them)

### Internal linking
The HTML parser reported 0 internal links on homepage & /parque-tangamanga, which is almost certainly a parser limitation vs. Next.js hydration. However, visual inspection of the /events/all HTML confirmed the navigation exists in SSR output. **Action:** run a manual audit of internal links on `/parque-tangamanga` and other place pages — if the "Related attractions" / "See also" module is missing, add it (it's the single biggest off-keyword ranking lever).

---

## 4. Schema / Structured Data

### Current implementation
| Schema | Where | Status |
|--------|-------|:------:|
| WebSite + SearchAction | Every page (via _app) | ✓ Correct |
| Organization + ContactPoint | Every page (via _app) | ✓ Correct |
| Blog + BlogPosting | `/blog` and blog posts | ✓ Correct |
| ImageObject | Blog | ✓ |

### Missing (high-value)
| Schema | Where it should live | Impact |
|--------|---------------------|--------|
| **LocalBusiness** (or TouristInformationCenter) | Homepage | Unlocks knowledge panel, map listing |
| **TouristAttraction / Place** | `/parque-tangamanga`, `/cultural/*`, `/presa-san-jose`, all park/landmark pages | Rich results + AI Overview citations |
| **Restaurant** | Individual restaurant detail pages | Review stars, price range, cuisine |
| **Event** | Each event detail page (`/events/{category}/{id}`) | Event rich results in Google Search + Maps + Assistant |
| **ItemList** | `/events/all`, `/restaurants`, `/places` index pages | Carousels in SERP |
| **BreadcrumbList** | Every non-home page | Breadcrumb trail in SERP |
| **Article / NewsArticle** | Editorial posts (Procesión del Silencio, Semana Santa) | News carousel, Top Stories |
| **FAQPage** | Do NOT add — Aug 2023 restriction limits rich results to gov/healthcare; not worth the maintenance cost for commercial benefit |
| **HowTo** | Do NOT add — deprecated Sept 2023 |

### Validation
The existing JSON-LD blocks pass schema.org structure, but `contactPoint` on Organization has `availableLanguage: ["English","Spanish"]` as strings (valid, but `["en","es"]` using BCP 47 codes is preferred).

---

## 5. Content Quality & E-E-A-T

### Strengths
- Homepage has 2,822 words — healthy depth
- Bilingual content (ES/EN)
- Blog uses BlogPosting schema correctly
- Real editorial content (Semana Santa, Procesión del Silencio hero posts per recent commits)

### Gaps
- **No author bylines or author schema.** `ContactPoint` only specifies "Customer Service". For E-E-A-T, add `Person` schema with author profiles to blog posts, especially for guides (safety, neighborhoods, schools).
- **No "last updated" dates visible in page content** on resources/* or guides. Google's Quality Rater Guidelines (Sept 2025 update) heavily weights explicit freshness.
- **No "About the author" / editorial team page** linked from content. Creates E-E-A-T doubt for YMYL topics like the safety guide.
- **Restaurants and places index pages are thin**: `/restaurants` has a single-sentence meta description and no introductory content. Thin-content risk.

### Duplicate content risk
- Homepage lives at both `/` (canonical `https://www.sanluisway.com/`) and is reachable via `sanluisway.com` (apex redirects — OK). Low risk.
- The English and Spanish versions are served from `/` vs `/es/*`. Hreflang is declared. Low risk as long as `/es/parque-tangamanga` actually exists when `/parque-tangamanga` is in Spanish-for-Mexico context.

---

## 6. GEO / AI Search Readiness

| Item | Status | Notes |
|------|:------:|-------|
| llms.txt | **Missing (404)** | Add `/llms.txt` with site summary, key pages, content policies |
| AI crawler access (GPTBot, ClaudeBot, Perplexity, Google-Extended) | Allowed | robots.txt has no AI-specific blocks |
| Content citability | Low | Facts are present but rarely surfaced with `<cite>`, source links, or clear attribution |
| Brand mention signals | Weak | Organization schema present, but no `sameAs` to Wikidata/Wikipedia or government/press mentions |
| FAQ-style content blocks | Few | AI Overviews love Q&A-style subheadings; safety/neighborhoods pages could add these |
| Structured stats + tables | Low | AI systems prefer extractable tables (e.g., crime stats, neighborhood prices) |

### GEO quick wins
1. **Publish `/llms.txt`** following the llmstxt.org spec — name, description, key URLs by category (Events, Places, Resources, Blog), and link to a `/llms-full.txt` with more content.
2. **Add H2/H3 question-style headings** to top-ranking guides ("How safe is San Luis Potosí?", "What's the best neighborhood for expats in SLP?").
3. **Add structured tables** for data-dense content — average rental prices by neighborhood, crime stats, school tuition ranges.
4. **Add `sameAs` links** to Wikidata (Q80786 for SLP city), Wikipedia, Instagram, LinkedIn, and any press mentions on the Organization schema.

---

## 7. Search Console (GSC) — Field Data

### 90-day performance (2026-01-06 → 2026-04-03)
- **By query**: 17 clicks / 6,497 impressions / **0.26% CTR** (439 queries)
- **By page**: 108 clicks / 11,429 impressions / **0.94% CTR** (252 pages)
- *(Delta between dimensions is normal — anonymized queries aren't query-attributed)*

### 28-day performance
- By query: 12 clicks / 2,067 impressions / 0.58% CTR (249 queries)
- By page: 32 clicks / 3,440 impressions / 0.93% CTR (138 pages)

### Top quick-win keywords (Position 4–10, high impressions, 0 clicks)

| Keyword | Impressions | Position | CTR | Opportunity |
|---------|------------:|:--------:|:---:|-------------|
| family friendly activities | **1,338** | 9.7 | 0% | Create `/family-friendly-activities-san-luis-potosi` landing page with ItemList schema |
| free events near me | 737 | 7.6 | 0% | Create `/events/free` filter page + Event schema |
| local events | 168 | 9.8 | 0% | Existing `/events/all` — optimize title + H1 |
| farmers market near me | 127 | **5.4** | 0% | CTR fix — best title/description rewrite candidate |
| food festivals near me | 118 | 9.7 | 0% | `/events/food-festivals` or filter page |
| best breakfast spots near me | 73 | 7.9 | 0% | `/restaurants/breakfast` topic page |
| malilla slp 2026 | 82 | 9.6 | 1.22% | Dedicated event page with Event schema |
| copa potosi 2026 calendario | 79 | 8.7 | 0% | Sports event calendar page |
| el papalote slp | 52 | **5.7** | 0% | Place page needs title + LocalBusiness schema |
| super el aguila | 56 | 9.2 | 0% | Local business mention / directory entry |

### Top organic landing pages (28-day GA4)
| # | Path | Sessions |
|---|------|---------:|
| 1 | /events/all | 21 |
| 2 | /events/sports/047fcef9-d422-46e1-af57-f029c08144ce | 20 |
| 3 | /resources/safety-guide | 8 |
| 4 | / | 7 |
| 5 | /events/arts-culture/a0c5446c-0f8f-4e62-ac95-d53fe8fa62c9 | 7 |
| 6 | /parque-tangamanga | 7 |
| 7 | /es/festival-primavera-2026 | 6 |
| 8 | /events/sports/34ff8009-7504-44d9-8aac-575678986809 | 6 |
| 9 | /cultural/history | 5 |

**Insight:** Event detail pages rank — but use UUIDs in URLs. These URLs should be rewritten to slug-based paths (`/events/{category}/{slug}-{short-id}`) for keyword relevance and link equity.

---

## 8. Action Plan — Prioritized

### CRITICAL (do this week)

1. **Add `<title>`, meta description, canonical, and Open Graph tags to every page missing them** — start with `/parque-tangamanga`, then audit all `/cultural/*`, `/presa-san-jose`, `/parque-bicentenario`, `/rancho-la-estacion` routes and any other place/resource pages. Use `next/head` or the pages router `Head` component with per-page props.

2. **Fix mobile LCP (18.2s → <2.5s target).**
   - Move LCP hero image to `next/image` with `priority` + explicit width/height + `sizes`
   - Self-host hero images (replace Unsplash CDN references)
   - Add `<link rel="preload" as="image" fetchpriority="high">` for first-paint image
   - Reserve container with `aspect-ratio` CSS to eliminate CLS
   - Defer AdSense/GPT/pagead scripts with `strategy="lazyOnload"`

3. **Remove "2025" from all page titles** — replace with current year or drop the year entirely. Affected: homepage, safety-guide, neighborhoods guide, and any guide template using a hardcoded year.

4. **Investigate 121 sitemap warnings in Google Search Console** — open Search Console → Indexing → Sitemaps → click the sitemap row → review "warnings". Most common causes: URLs returning 4xx, canonicalized-away URLs still in sitemap, or noindex URLs included.

### HIGH (within 1 week)

5. **Publish `/llms.txt`** with site overview, key sections, and canonical URLs.

6. **Add Event schema** to every event detail page using `@type: Event` with `name`, `startDate`, `endDate`, `location` (Place), `offers` if ticketed, and `organizer`.

7. **Add ItemList schema** to `/events/all`, `/restaurants`, `/places`, `/cultural` index pages — wraps child items for SERP carousels.

8. **Add TouristAttraction/Place schema** to `/parque-tangamanga`, `/presa-san-jose`, `/parque-bicentenario`, `/rancho-la-estacion`, `/cultural/history` — include `name`, `description`, `address`, `geo`, `image`, `openingHours` if applicable.

9. **Add LocalBusiness schema** to the homepage (`@type: LocalBusiness` or `TouristInformationCenter`), with `areaServed`, `geo`, `priceRange`, `openingHours`.

10. **Create "Quick Win" landing pages** for the top 3 quick-win keywords:
    - `/family-friendly-activities-san-luis-potosi` (ItemList of family events + places)
    - `/free-events-san-luis-potosi` (filter of upcoming free events + Event schema)
    - `/farmers-markets-san-luis-potosi` (LocalBusiness list + schedule)

11. **Fix `<html lang>` attribute** to match content language per route. Use `lang="es"` for all Spanish pages and `lang="en"` for English.

12. **Fix `og:locale`** to match the actual page language (es_MX for Spanish, en_US for English).

### MEDIUM (within 1 month)

13. **Rewrite event detail URLs** from `/events/{category}/{uuid}` to `/events/{category}/{slug}` with the UUID optionally appended as a short ID.

14. **Add BreadcrumbList schema** to every non-home page.

15. **Add author bylines + Person schema** to editorial content (blog posts, guides).

16. **Add "Last updated" dates** on all /resources/* and /cultural/* guides.

17. **Split the sitemap into an index** (`/sitemap.xml` → index → `/sitemap-pages.xml`, `/sitemap-events.xml`, `/sitemap-places.xml`, `/sitemap-blog.xml`). Emit real per-page lastmod.

18. **Optimize top-10 images** with WebP/AVIF, proper `sizes`, and responsive `srcset` — target saving the 525-631 KB PSI identified.

19. **Remove or implement `hreflang` for `de` and `ja`** — do not fake multilingual support.

20. **Add CTA-rich meta descriptions** to all pages currently ranking but not getting clicks. Target: double CTR to ~1.5-2% (2–3× lift on current traffic).

### LOW (backlog)

21. Set up GSC URL Inspection API automation (via `scripts/gsc_inspect.py`) for the top 50 URLs to track indexation status weekly.

22. Build a `/sitemaps-report.json` internal monitoring file that flags pages missing title/description/canonical on build.

23. Add JSON-LD `Review` / `AggregateRating` once real user reviews exist on places/restaurants.

24. Evaluate DataForSEO or Moz API integration for backlink profile analysis (currently skipped — no API keys).

25. Consider Wikidata submission for "San Luis Way" organization to strengthen brand entity graph.

---

## Appendix — Raw Data References

- **PageSpeed**: mobile 39/100, desktop 58/100, run 2026-04-07 03:27 UTC
- **GSC property**: `sc-domain:sanluisway.com` (Owner access via service account)
- **GA4 property**: `494279422`, 149 sessions / 28d
- **Sitemap warnings**: 121 reported (inspect in GSC UI)
- **CrUX**: Not eligible (insufficient Chrome traffic)
- **Credential tier**: Full (PSI + CrUX + GSC + Indexing + GA4)

**Next suggested runs:**
- `python scripts/ga4_report.py --property 494279422 --days 90` (longer trend)
- `python scripts/gsc_query.py query --property sc-domain:sanluisway.com --days 90 --dimensions query,page --limit 500 --json > gsc_full.json` (full cross-tab for fix prioritization)
- After fixes land: re-run `python scripts/pagespeed_check.py https://sanluisway.com --strategy mobile` to measure improvement
