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
- [x] Review body-content references to 2025 (`<h1>` "Family Living 2025", "VERIFIED 2025" badges, "Last updated: December 2025"). Bumped year badges (VERIFIED 2025 → 2026), dropped stale year from titles/H2s/H3s in health-guide, school-guide, expat-guide, family-guide, living-guide, neighborhoods, safety-guide, resources/index. Preserved legitimate historical citations (INEGI Q3 2025, H1 2025 homicide stats, 2025-2026 school calendar, event URLs). _(done — commit ac8cee9d)_

### Awkward Spanish in meta description
- [x] **`/events/[category]`** — description rewritten; template now reads `"${getCategoryTitle(category)} en San Luis Potosí. Agenda cultural, conciertos, festivales y actividades familiares..."` which is grammatically correct for every category. _(done — commit c4360790)_

### "SLP Descubre" leftover branding
- [x] Removed from `events/[category]/index.tsx`, `restaurants.tsx`, `traditional-cuisine.tsx`, `cultural-attractions.tsx`. _(done — commits 3fc19b29 + c4360790)_

### Core Web Vitals — Mobile LCP 18.2s → <2.5s
- [x] **Defer AdSense, GTM, GA4 scripts** with `next/script`. Moved out of `_document.tsx` (where they blocked during HTML parse) into `_app.tsx` with `strategy="afterInteractive"` for GTM/GA4/Google Ads and `strategy="lazyOnload"` for AdSense. _(done — current commit)_
- [x] **Hero images self-hosted** — Homepage hero (`/images/hero-bg.jpg`), Centro Histórico, Parque Tangamanga, Cultural, Cultural Attractions all use local assets. EventHeroCarousel uses event.image_url from the DB (optimized via next/image). Only dead mock path in `lib/api/google-sheets.ts` still references `images.unsplash.com` — not hit at runtime. _(done — pending commit)_
- [x] **Hero image tag uses `next/image` with `priority` + `sizes="100vw"`** on homepage, cultural-attractions, cultural, EventHeroCarousel. _(done — pending commit)_
- [x] **Removed `loading="lazy"` from above-the-fold images** — cultural-attractions + cultural/index no longer use `loading="eager"` workaround; they now use `priority` which does the right thing. _(done — pending commit)_
- [x] **Added `fetchPriority="high"`** to the LCP images on cultural-attractions, cultural/index, EventHeroCarousel first slide. (Homepage hero's next/image already sets this via `priority`.) _(done — pending commit)_
- [x] **Hero containers have reserved height** — HeroSection uses `h-screen min-h-[700px]`, cultural-attractions uses `h-[60vh] min-h-[500px]`, cultural/index uses `h-[50vh] min-h-[400px]`, EventHeroCarousel uses `h-[420px] md:h-[500px]`. All reserve space so nothing shifts on image load. _(done — verified)_
- [x] **Fix BetaBanner CLS culprit** — banner used to mount post-hydration via `useState(false)` then flip on, pushing every section down. Now SSR-renders visible by default and uses `sticky top-0 z-40` + `transform: translateY(-100%)` for scroll-collapse so nothing below shifts. _(done — current commit)_
- [x] **Gated Stripe from CSP** — `js.stripe.com` removed from the `httpEquiv` CSP in `_document.tsx`. Checkout feature stays disabled; if re-enabled later, add it back scoped to `/checkout` only. _(done — pending commit)_
- [x] **Optimize font loading** — Inter + Crimson Pro migrated to `next/font/google`. Fonts now self-hosted at build time, render-blocking stylesheet removed, `adjustFontFallback` eliminates CLS on swap. _(done — commit pending)_

### Image optimization (next.config.js)
- [x] **`unoptimized: true` removed** — image optimization re-enabled. AVIF/WebP, responsive srcset, automatic resizing all now active. `remotePatterns` covers all remote hosts. _(done — commit aa2d6fca)_
- [x] **Removed deprecated `domains` array** from `next.config.js` images config. _(done — commit aa2d6fca)_

### GSC sitemap warnings
- [~] Open Google Search Console → Indexing → Sitemaps → `sitemap.xml` → review the **121 warnings**. This requires the user to open GSC directly (agent cannot browse GSC UI). However, we already removed the private routes that were likely causing the bulk of the warnings: `/admin/newsletter`, `/checkout`, `/signin`, `/signup`, `/index-backup-*`. Re-run sitemap submission in GSC after deploy. _(partial — user action required for residual warnings)_

---

## HIGH — within 1 week

### Schema / structured data
- [x] **TouristInformationCenter + Organization + WebSite** schema on homepage. Includes `areaServed`, `geo`, `priceRange`, `address`, `sameAs` (Wikidata Q80786 + Wikipedia), and SearchAction. _(done — current commit)_
- [x] **TouristAttraction / Place** schema on:
  - [x] `/parque-tangamanga` (done as part of metadata fix in commit 3fc19b29)
  - [x] `/centro-historico` _(done — current commit)_
  - [x] `/cultural/history` (Article + about Place w/ Wikidata link) _(done — current commit)_
  - [x] `/cultural-attractions` (ItemList of TouristAttractions) _(done — current commit)_
- [x] **Event** schema on each event detail page (`src/pages/events/[category]/[id].tsx`) — enriched with name, startDate, endDate, location (Place with address), image, inLanguage, canonical url. _(done — commit c4360790)_
- [x] **ItemList** schema on:
  - [x] `/events/[category]` index pages — wraps first 20 events as nested Event items with Place/address/eventStatus/eventAttendanceMode. _(done — pending commit)_
  - [x] `/restaurants` (wraps restaurant list, done in commit 3fc19b29)
  - [x] `/places` — emits ItemList with first 20 items as ListItems, switches between Places and Services based on active tab. _(done — commit 4483e775)_
- [x] **Restaurant** schema on individual restaurant detail pages — `src/pages/places/[id].tsx` already maps `restaurant` → `Restaurant` via `CATEGORY_TO_SCHEMA`. Enhanced with `@id`, `priceRange` derived from priceLevel, `hasMap` Google Maps link, and moved external website into `sameAs` (was overwriting canonical `url`). _(done — pending commit)_
- [x] **BreadcrumbList** schema on every non-home page — new `BreadcrumbJsonLd` component auto-generates from URL path, mounted globally in `_app.tsx`. Skips homepage and dynamic [id]/[slug] routes (those mount the full UI Breadcrumbs component with explicit labels). _(done — current commit)_

### GEO / AI search readiness
- [x] **Published `/public/llms.txt`** following llmstxt.org spec — name, description, top-level URLs grouped by Places, Food, Events, Cultural, Living/Expat, Community. _(done — current commit)_
- [x] **Added sameAs links** on Organization schema pointing to Wikidata Q80786 + Wikipedia. Instagram/LinkedIn pending until accounts confirmed. _(done — current commit)_
- [x] **Convert guide H2/H3s to question form** — applied to the flagship `/resources/safety-guide` page. Six top-level H2s rewritten: "Overview: Safety" → "How safe is San Luis Potosí overall?", "Crime Statistics" → "What do the crime statistics actually show?", "Local Perception" → "How do residents perceive safety in SLP?", "Safe Neighborhoods for Expats" → "Which neighborhoods are safest for expats in SLP?", "What Expats Actually Say" → "What do expats report about living safely in SLP?", "Practical Safety Tips" → "What practical safety tips should I follow in SLP?". Also added `FAQPage` JSON-LD in `<Head>` that mirrors the existing `faqs` array so Google can surface the Q&A as rich results. Pattern can be replicated on other guides. _(done — pending commit)_
- [x] **Add structured tables** for data-dense guides — `/resources/living-guide` now has a proper `<table>` under "Where should expats live in SLP?" comparing rent, safety and "best for" across all 4 neighborhoods (Lomas, Centro Histórico, Tangamanga, Zona Industrial). Uses `<caption class="sr-only">`, `<th scope>` headers, and a visible "Updated December 2025" note for machine extraction. Living-guide H2s also converted to question form (Why should expats move, Which Mexican visa, How much does it cost, How does healthcare work, How do I open a bank account, Where should expats live). FAQPage JSON-LD added mirroring the visible Q&A block. `/resources/safety-guide` already had a Numbeo comparison table. _(done — pending commit)_

### HTML lang & og:locale
- [x] **`<html lang>` per route** — `_document.tsx` already uses `props.__NEXT_DATA__.locale` via `<Html lang={currentLocale}>`. Verified 2026-04-06. _(already done)_
- [x] **`og:locale` per route** — SEO component already uses `router.locale` to map en→en_US, es→es_MX. Verified `src/components/common/SEO.tsx:55`. _(already done)_

### Hreflang
- [x] **Hreflang restored to all 4 locales** — earlier removal of `de`/`ja` was based on the incorrect assumption that no German/Japanese content existed. All 4 locales (en/es/de/ja) actually serve real translated content via next-i18next — verified 2026-04-07 by fetching `/de` (returned German: "Startseite", "Entdecken") and `/ja` (returned Japanese: "ホーム", "探索", `lang="ja"`). Restored `hreflang="de"` → `/de` and `hreflang="ja"` → `/ja` in `_document.tsx` alongside en/es/x-default. _(done — pending commit)_
- [x] **`hreflang="es"` points to `/es`** — verified in `_document.tsx`. Per-page alternates would still be better but root-level entries now cover all 4 real locales. _(done — current commit)_
- [x] **Per-page hreflang alternates** — new `HreflangAlternates` component (mounted globally in `_app.tsx`) emits `<link rel="alternate" hrefLang="…">` for all 4 locales + `x-default` based on `router.asPath`, so `/places` advertises `/es/places`, `/de/places`, `/ja/places`, etc. Strips query/hash. Removed the old root-only set from `_document.tsx` to avoid duplicates. SEO component canonical also fixed to point to the **current locale's** URL instead of always the apex (so `/de/places` canonicalizes to itself, not the EN page). Build verified. _(done — pending commit)_

### Quick-win landing pages (keywords already rank page 1)
- [~] **`/family-friendly-activities-san-luis-potosi`** — 1,338 impressions / pos 9.7 / 0 clicks. Existing `/family-friendly-activities` page already has keyword-rich title including the city; leaving URL as-is to avoid fighting Google canonicalization.
- [x] **`/free-events-san-luis-potosi`** — built as dedicated landing page with 8 recurring + annual free events (Ciclovía, Noche de Museos, FENAPO, Festival Primavera, Procesión del Silencio, Plaza de Armas concerts, Xantolo, Tangamanga). ItemList + FAQPage schema, LastUpdated component, bilingual EN/ES copy. _(done — pending commit)_
- [x] **`/farmers-markets-san-luis-potosi`** — built as LocalBusiness list of 6 SLP markets (Tianguis del Martes, Jueves, Mercado Hidalgo, Mercado República, Tianguis Orgánico, Mercado 16 de Septiembre) with days, hours, addresses, specialties, and Google Maps links. ItemList + FAQPage schema. _(done — pending commit)_
- [x] **`/food-festivals-san-luis-potosi`** — built as Festival ItemList with 6 annual food festivals (Festival del Vino Potosino, Festival del Queso, Muestra FENAPO, Festival de la Enchilada Potosina, Festival del Mezcal y Sotol, Feria de la Gordita). ItemList + FAQPage schema. _(done — pending commit)_
- [x] **`/breakfast-spots-san-luis-potosi`** — built as Restaurant ItemList with 7 breakfast spots (La Parroquia Potosina, El Mesón de San Pascual, La Oruga y la Cebolla, Café Córtex, Sanborns, Gorditas Carmelita, La Virgen) with must-order items, price ranges, addresses. ItemList + FAQPage schema. _(done — pending commit)_

---

## MEDIUM — within 1 month

- [ ] **Rewrite event detail URLs** from `/events/{category}/{uuid}` to `/events/{category}/{slug}-{short-id}` for keyword relevance. Add 301 redirects from old UUIDs.
- [x] **Add "Last updated" dates** visible on guides — shared `<LastUpdated>` component at `src/components/common/LastUpdated.tsx` (renders "Reviewed on …" in EN / "Revisado el …" in ES, uses `<time dateTime>` element for machine-readable freshness signal). Now mounted under the `<h1>` on every `/resources/*`, `/cultural/*`, and `/guides/*` page: safety-guide, living-guide, neighborhoods-san-luis-potosi, health-guide, family-guide, school-guide, expat-guide, arrival-checklist, resources/index, cultural/history, cultural/festivals, cultural/music-dance, cultural/culinary-traditions, cultural/customs-etiquette, cultural/religious-practices, guides/foodie-guide, guides/potosino-wine-scene. _(done — pending commit)_
- [x] **Add author bylines** to editorial content — new `<Byline>` component at `src/components/common/Byline.tsx` renders "By San Luis Way Editorial · [published/updated date]" in a `<time dateTime>` element (localized EN/ES/DE/JA). Mounted under the `<Breadcrumbs>` on `/blog/[slug]` pages. `Article` JSON-LD `author` on blog posts upgraded from `Organization` to a typed `Person` entity with stable `@id` (`https://sanluisway.com/about#editorial-team`), `jobTitle`, and `worksFor` reference back to the Organization graph node. _(done — pending commit)_
- [x] **Sitemap improvements** — replaced static `public/sitemap.xml` with a dynamic generator at `src/pages/sitemap.xml.tsx` (`getServerSideProps`) backed by `src/lib/sitemap.ts`. Static routes (~41) live in a config; dynamic rows are pulled live from Supabase (`blog_posts` published, `places`, `events` filtered to `end_date >= today`, `brands` with derived slugs). Per-row `lastmod` comes from each row's `updated_at`/`created_at`. Cache headers: `s-maxage=3600, stale-while-revalidate=86400`. Verified locally: 241 URLs (16 blog + 116 places + 46 upcoming events + 21 brands + 41 static), HTTP 200 with `application/xml`. New content is now indexed automatically — no manual sitemap edits needed. _(done — pending commit)_
- [x] **Optimize top-10 images** — PSI image-delivery-insight flagged `logo.jpeg` (354 KB, 1120×1120 shipped for a 74×74 render) and `hero-bg.jpg` (314 KB, ~31 KB wasted from over-compression at the mobile variant). Re-encoded both with `sharp` + mozjpeg: `logo.jpeg` 354 KB → 13 KB (-96%), `hero-bg.jpg` 314 KB → 246 KB (-21%). Header + Footer `<Image>` now pass correct 1:1 width/height and explicit `sizes="(max-width: 640px) 48px, 96px"` so Next.js serves the 48w/64w/96w variant instead of the 640w one. Hero section now hints `fetchPriority="high"` and `quality={75}` so the browser starts LCP image fetch above all other resources. _(done — pending commit)_
- [x] **Audit bundle with `@next/bundle-analyzer`** — inspected the `.next` output directly (skipped installing a new dep). Biggest win: `react-toastify` (used on exactly 1 page, `src/components/auth/AuthForm.tsx`) was being imported unconditionally from `_app.tsx` along with its CSS, forcing every page to ship it on first load. Moved to a dedicated `src/components/common/Toaster.tsx` wrapper and dynamic-imported it with `ssr: false`. Result: `_app` chunk 306 KB → 81.5 KB (-73%); first load JS shared 194 KB → 186 KB (-8 KB off the critical path), and toast JS + CSS no longer block LCP. _(done — pending commit)_
- [x] **Rewrite meta descriptions** for pages ranking page 1–2 with 0 clicks — rewrote descriptions on `family-friendly-activities` ("30+ family plans with prices, hours and age ranges — find the perfect weekend plan in one click"), `parque-tangamanga` ("411 ha gratis en SLP: zoológico, planetario, acuario… planea tu visita"), `traditional-cuisine` ("Where locals actually eat: 15+ family-run spots… with addresses, hours and what to order"), `weekend-getaways` ("Escape SLP this weekend: Real de Catorce, Huasteca, Media Luna. 2-day itineraries — start planning in 2 minutes"), and `centro-historico` (updated across all 4 locales in `common.json`: en/es/de/ja — "UNESCO walk-through: Plaza de Armas, Cathedral, Teatro de la Paz + 20 restaurants…"). All new descriptions lead with a concrete benefit or number, include a direct CTA, and stay under 160 chars. _(done — pending commit)_
- [x] **Unified robots.txt host** — sitemap now points to apex `sanluisway.com` (matches GSC). _(done — current commit)_
- [x] **Removed `Crawl-delay: 1`** from robots.txt. _(done — current commit)_
- [x] **Unified host from `www.sanluisway.com` → `sanluisway.com` across all SEO-sensitive page files**: blog index/detail, factchecks index/detail, copa-potosi-2026, expat-guide, family-friendly-activities, parque-tangamanga, resources (arrival-checklist, living-guide, index, school-guide, expat-guide, safety-guide), subscribe, events/[category]/[id], SEO component fallback, Breadcrumbs JSON-LD. Newsletter/email/API code still uses www (no SEO impact, Netlify redirect handles it). _(done — pending commit)_
- [x] **Fix links-without-descriptive-text** — rewrote vague "Learn more" / "Read more" visible text across: `cultural/index` (3 category cards → "Explore SLP history" / "Discover SLP festivals" / "Explore music & dance"), `cultural-attractions` (attraction cards → "Learn more about {attraction.name}"), `about` (brand cards → "Visit {brand.name}" + added target="_blank" rel=noopener), `brands/index` (2 brand cards → "Learn more about {brand.name}"), `EventsCarousel` ("View event details" + aria-label with event title), `ImageCarousel` (aria-label interpolates `item.title`). `RobotMindBanner` "Learn More" variant relabeled + aria-label on both banner CTA anchors with full context. `Footer` Instagram + TikTok social icons now have `aria-label` using new translation keys added to all 4 locales (en/es/de/ja), and decorative SVGs marked `aria-hidden`. Lighthouse audit should pass; Google and screen readers get descriptive link text in every locale. _(done — pending commit)_
- [x] **Fix button accessibility names** — added `aria-label` (and `aria-pressed`/`aria-current` where appropriate) to icon-only buttons across: `HeroCarousel` (prev/next/dots), `ImageCarousel` (dots), `EventsCarousel` (dots), `PlaceModal` (close), `ShareButton` (WhatsApp/Twitter/Facebook/LinkedIn + `aria-hidden` on decorative SVGs), `NewsletterBanner` (close), `BookingForm` (close), `PlaceFilters` (star rating + price level), `ReviewForm` (star rating), `Pagination` (numeric page buttons + `aria-current="page"`), `business/PromoteButton` (close modal), `admin/AdSelector` (clear), `listings/[id]` (thumbnail switcher). Buttons already correctly labeled: Header, Footer (no buttons), ScrollToTop, Cart, BetaBanner, LanguageSwitcher, HeaderUserMenu, HeaderSearch, SearchFilter, EventCategoryFilter, EventSearchBar, TodayInSLP, BlogCarousel, EventHeroCarousel, FeaturedPlaces. _(done — pending commit)_
- [x] **Fix color contrast** flagged in Lighthouse accessibility — Resolved 49 failing elements from PSI mobile audit. Pattern fixes: (1) eyebrow `text-primary` (#FFCB05 = 1.52:1) → `text-primary-800` (#B37A00 = 5.17:1) across FeaturedPlaces, DiningSection, EventsPreview, BrandsShowcase, OutdoorsSection, PracticalGuidesSection, LifestyleBenefits; (2) yellow CTA buttons `bg-primary text-white` → `bg-primary text-secondary` (navy on yellow ≈ 11:1) on CultureSection viewCalendar, BrandsShowcase exploreAll, LifestyleBenefits recognition, FinalCTA contact, Footer b2b; (3) `text-{color}-600` pills/eyebrows → `text-{color}-700/800` in TodayInSLP (amber, emerald, cyan, rose, violet, blue) and traffic CTA (`bg-cyan-600` → `bg-cyan-800`); (4) outdoor activity `bg-{color}-500` badges in `pages/index.tsx` bumped to `bg-{color}-700`; (5) ImageCarousel default badge `bg-primary` → `bg-secondary`, description `text-gray-600` → `text-gray-700`, CTA `text-primary` → `text-primary-800`; (6) CultureSection emerald-tinted eyebrow → `text-emerald-900`. _(done — pending commit)_
- [x] **Fix touch target size** — Lighthouse target-size flagged 16 carousel dot buttons (7-9px each, WCAG 2.5.5 minimum is 24×24px). Wrapped each visible dot in a `min-w-[24px] min-h-[24px]` flex-centered button while keeping the small visual dot as a child `<span>`. Applied to: TodayInSLP news ticker dots, BlogCarousel dots, ImageCarousel dots, HeroCarousel dots, EventsCarousel dots. Parent gap reduced (gap-2/gap-3 → gap-1) to compensate for wider buttons. `aria-current` added where missing. _(done — pending commit)_

---

## LOW — backlog

- [ ] Set up `scripts/gsc_inspect.py` automation for the top 50 URLs to track indexation status weekly via GSC URL Inspection API.
- [x] Build a `/sitemaps-report.json` internal monitoring file that flags pages missing title/description/canonical on build (fail build in CI). Added `scripts/sitemap-report.js` + `npm run seo:report`. Statically scans every indexable page in `src/pages`, skips redirect-only and noindex pages, and writes `sitemaps-report.json` at the repo root. Current status: 97/97 indexable pages pass (100%). Canonical is emitted globally by `HreflangAlternates` (mounted in `_app.tsx`) — the old SEO component used to emit its own canonical, causing duplication; refactored so canonical lives in exactly one place. Script exits non-zero on failure to gate CI. _(done — pending commit)_
- [ ] Add `Review` / `AggregateRating` schema once real user reviews exist on places/restaurants.
- [ ] Evaluate DataForSEO or Moz API integration for backlink profile analysis.
- [x] Submit "San Luis Way" to Wikidata as an organization entity to strengthen the brand knowledge graph. Published as **Q139031973** (https://www.wikidata.org/wiki/Q139031973) on 2026-04-08 with 7 statements: instance of website (Q35127), official website, country Mexico (Q96), main subject San Luis Potosí city (Q204271), area served San Luis Potosí state (Q78980), language of work (EN/ES/DE/JA), inception 2025. Homepage Organization schema sameAs array now links to Q139031973 for knowledge-graph reinforcement. _(done — pending commit)_
- [x] Implement a `<LastUpdated>` build-time date injector that reads git log for each page. `scripts/refresh-lastupdated.js` scans every `.tsx` file under `src/pages` for `<LastUpdated date="YYYY-MM-DD" />`, queries `git log -1 --format=%cs` per file, and rewrites the date to match each file's most recent commit. `--check` mode exits non-zero when any file is stale so CI can gate on it. Exposed as `npm run lastupdated:refresh` and `npm run lastupdated:check`. _(done — pending commit)_
- [x] Added `/robots.txt` explicit rules for AI crawlers — GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended. _(done — current commit)_

---

## Re-audit cadence

After completing CRITICAL and HIGH sections, re-run:
- `python scripts/pagespeed_check.py https://sanluisway.com --strategy mobile`
- `python scripts/gsc_query.py query --property sc-domain:sanluisway.com --days 28 --dimensions query,page --limit 100 --json`
- `python scripts/ga4_report.py --property 494279422 --days 28`

Target deltas: mobile perf ≥70, CLS <0.1, CTR ≥1.5%, indexed pages warnings <20.
