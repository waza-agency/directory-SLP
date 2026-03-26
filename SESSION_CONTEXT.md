# Session Context Log - Coding Agent

## Project: San Luis Way (directory-SLP)

**Last Updated:** 2026-03-25
**Purpose:** Provide context for coding agents to understand the project state when starting a new session.

---

## Project Overview

San Luis Way is a comprehensive directory and resource guide for expats living in San Luis Potosí, Mexico. The project consists of:

- **Main Frontend:** Next.js with Pages Router (src/pages/)
- **Admin Panel:** Admin interfaces for managing content
- **Database:** Supabase (PostgreSQL)
- **Key Features:** Business directory, blog, events calendar, neighborhoods guide, advertising system

---

## Recent Changes (2026-03-25)

### 1. Refactoring: Homepage Components

**Problem:** `src/pages/index.tsx` had 1,228 lines (violating 200-line max rule in CLAUDE.md)

**Solution:** Extracted sections into modular components in `src/components/home/`:

Created files:
- `src/components/home/HeroSection.tsx` (77 lines)
- `src/components/home/EventsPreview.tsx` (128 lines)
- `src/components/home/FeaturedPlaces.tsx` (98 lines)
- `src/components/home/DiningSection.tsx` (68 lines)
- `src/components/home/CultureSection.tsx` (106 lines)
- `src/components/home/OutdoorsSection.tsx` (46 lines)
- `src/components/home/PracticalGuidesSection.tsx` (37 lines)
- `src/components/home/BrandsShowcase.tsx` (76 lines)
- `src/components/home/LifestyleBenefits.tsx` (99 lines)
- `src/components/home/FinalCTA.tsx` (45 lines)
- `src/components/home/index.ts` (barrel export)

Result: Reduced index.tsx to ~498 lines (~60% reduction)

---

### 2. New Feature: Social Sharing

**Created:**
- `src/components/sharing/ShareButton.tsx` - Reusable share button component
  - Native navigator.share for mobile
  - WhatsApp, Twitter/X, Facebook, LinkedIn support
  - Copy link to clipboard
  - Configurable variants (inline, floating) and sizes (sm, md, lg)
- `src/components/sharing/index.ts` - Barrel export

**Integration:**
- Added to `src/pages/blog/[slug].tsx` - After hero title
- Added to `src/pages/resources/living-guide.tsx` - After hero description

---

### 3. New Feature: Neighborhood Pages (SEO)

**Created data file:**
- `src/data/neighborhoods.ts` - Centralized neighborhood data with slugs
  - 7 neighborhoods: Lomas del Tecnológico, Tangamanga, Centro Histórico, Privadas del Pedregal, Villa Magna, Zona Industrial, Soledad
  - Each with full details: prices, pros, cons, sub-areas, highlights
  - Helper functions: getNeighborhoodBySlug, getAllNeighborhoodSlugs

**Created dynamic page:**
- `src/pages/neighborhoods/[slug].tsx` - Dynamic route for each neighborhood
  - Full SEO optimization (title, meta description, OG tags)
  - Hero section with badge and tags
  - Quick stats (starting rent, pros/cons count, sub-areas)
  - Pricing section with rental ranges
  - Pros & Cons with visual indicators
  - Highlights (why expats choose, school/park info)
  - Sub-areas section
  - Who lives here section
  - Warning boxes where applicable
  - CTA section with contact link
  - ShareButton integration

**Updated existing page:**
- `src/pages/resources/neighborhoods-san-luis-potosi.tsx` - Added links to individual pages under each neighborhood heading

---

### 4. New Feature: Monetization - PromoteButton

**Created:**
- `src/components/business/PromoteButton.tsx` - Modal component for business upgrades
  - 3 tiers: Featured ($500/month), Premium ($1,000/month), Verified ($300/month)
  - Modal with plan comparison
  - Directs to contact page with pre-filled subject

---

### 5. Monetization: Updated Advertise Page

**Updated:** `src/pages/advertise.tsx`

Changes:
- Added visible pricing to package tiers:
  - Basic: $1,500/month (with annual savings note)
  - Premium: $3,000/month (highlighted as popular)
  - Enterprise: $5,000+/month (custom pricing)

---

## Key Architectural Decisions

1. **Pages Router:** Project uses Pages Router (not App Router). When making changes, use `getStaticProps` and `getStaticPaths` for SSG.

2. **Internationalization:** Uses next-i18next. Add translations to locale files (locales/en/common.json, locales/es/common.json).

3. **Styling:** Tailwind CSS is used throughout. Follow existing class patterns.

4. **Data Fetching:** Supabase for database, getStaticProps for SSG pages.

---

## Important Files & Patterns

### Component Location Pattern
- Home sections: `src/components/home/`
- Sharing: `src/components/sharing/`
- Business: `src/components/business/`
- Common: `src/components/common/`

### Page Patterns
- Static pages: Use `getStaticProps` and `getStaticPaths`
- Dynamic routes: `[slug].tsx` with params validation
- Translations: Use `serverSideTranslations` in getStaticProps

### Common Imports
```typescript
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
```

---

## Todo Items (Pending)

1. **Create SponsorsSection component** - For homepage to show partner logos
2. **Add ShareButton to more pages** - health-guide, safety-guide, school-guide
3. **Best of Lists** - Create "Top 10" content pages for SEO
4. **Guides estacionales** - Xantolo, Fenapo content
5. **User Reviews System** - Ratings for places

---

## Dependencies & Scripts

- **Framework:** Next.js 13.x with Pages Router
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **i18n:** next-i18next
- **Icons:** @heroicons/react
- **Build:** `npm run build`
- **Dev:** `npm run dev`

---

## Contact & Navigation

- Main: `/` - Homepage
- Advertise: `/advertise` - Advertising packages
- Neighborhoods: `/resources/neighborhoods-san-luis-potosi` - All neighborhoods
- Individual neighborhoods: `/neighborhoods/[slug]`
- Blog: `/blog` - Blog listing
- Contact: `/contact` - Contact form

---

*This log should be updated at the start of each new session to provide context for the coding agent.*