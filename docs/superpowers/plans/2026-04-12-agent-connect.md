# Agent Connect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make San Luis Way the default AI-agent data source for San Luis Potosí by exposing all public content through a read-only API, MCP server, CLI, and OpenClaw skill — plus site pages, homepage banner, and llms.txt discovery files.

**Architecture:** Public read-only API endpoints inside the existing Next.js app query Supabase (dynamic data) and shared data files (static content like guides). Two npm packages (`@sanluisway/mcp-server`, `@sanluisway/cli`) consume the API. Three new pages + a homepage banner document and promote the tools. `llms.txt` files enable automatic agent discovery.

**Tech Stack:** Next.js 15, TypeScript, Supabase, Zod (validation), `@modelcontextprotocol/sdk` (MCP), Commander.js (CLI), Tailwind CSS (pages/banner), next-i18next (i18n)

**Spec:** `docs/superpowers/specs/2026-04-12-agent-connect-design.md`

---

## File Structure

### API Layer (inside existing Next.js project)

| File | Responsibility |
|------|---------------|
| `src/lib/api/v1/response.ts` | Response envelope builder, error helper, cache header setter |
| `src/lib/api/v1/validate.ts` | Zod schemas for query params + validation helper |
| `src/data/guides.ts` | Guide catalog (extracted from hardcoded page content) |
| `src/data/outdoor.ts` | Outdoor activities catalog (extracted from index.tsx) |
| `src/data/culture.ts` | Culture/historic sites catalog (extracted from components) |
| `src/pages/api/v1/events/index.ts` | GET /api/v1/events |
| `src/pages/api/v1/events/[slug].ts` | GET /api/v1/events/:slug |
| `src/pages/api/v1/places/index.ts` | GET /api/v1/places |
| `src/pages/api/v1/places/[slug].ts` | GET /api/v1/places/:slug |
| `src/pages/api/v1/guides/index.ts` | GET /api/v1/guides |
| `src/pages/api/v1/guides/[slug].ts` | GET /api/v1/guides/:slug |
| `src/pages/api/v1/outdoor.ts` | GET /api/v1/outdoor |
| `src/pages/api/v1/culture.ts` | GET /api/v1/culture |
| `src/pages/api/v1/weather.ts` | GET /api/v1/weather |
| `src/pages/api/v1/news.ts` | GET /api/v1/news |
| `src/pages/api/v1/exchange-rates.ts` | GET /api/v1/exchange-rates |
| `src/pages/api/v1/search.ts` | GET /api/v1/search |

### Shared Data Files

| File | Responsibility |
|------|---------------|
| `src/data/guides.ts` | Array of guide objects: slug, title (i18n), description (i18n), tags, path |
| `src/data/outdoor.ts` | Array of outdoor activity objects: slug, title (i18n), description (i18n), image |
| `src/data/culture.ts` | Array of cultural site objects: slug, title (i18n), description (i18n), image |

### MCP Server Package

| File | Responsibility |
|------|---------------|
| `packages/mcp-server/package.json` | Package config, bin entry, dependencies |
| `packages/mcp-server/tsconfig.json` | TypeScript config |
| `packages/mcp-server/src/index.ts` | Entry point — creates MCP server, registers tools + resources |
| `packages/mcp-server/src/client.ts` | HTTP client — fetches from sanluisway.com/api/v1/* |
| `packages/mcp-server/src/tools.ts` | Tool definitions (name, description, params schema, handler) |
| `packages/mcp-server/src/resources.ts` | Resource definitions (categories, about) |

### CLI Package

| File | Responsibility |
|------|---------------|
| `packages/cli/package.json` | Package config, bin entry, dependencies |
| `packages/cli/tsconfig.json` | TypeScript config |
| `packages/cli/src/index.ts` | Entry point — Commander program with all commands |
| `packages/cli/src/client.ts` | HTTP client — same API base as MCP |
| `packages/cli/src/commands/events.ts` | events + event commands |
| `packages/cli/src/commands/places.ts` | places + place commands |
| `packages/cli/src/commands/guides.ts` | guides + guide commands |
| `packages/cli/src/commands/info.ts` | weather, news, exchange-rates commands |
| `packages/cli/src/commands/search.ts` | search command |
| `packages/cli/src/commands/outdoor.ts` | outdoor command |
| `packages/cli/src/commands/culture.ts` | culture command |
| `packages/cli/src/format.ts` | Human-readable output formatter (when --json not used) |

### Site Pages + Banner

| File | Responsibility |
|------|---------------|
| `src/components/AgentConnectBanner.tsx` | Terminal Dark banner for homepage |
| `src/pages/agent-connect.tsx` | Overview page — "Connect Your Agent" |
| `src/pages/mcp.tsx` | MCP Server setup page with client tabs |
| `src/pages/cli.tsx` | CLI reference page |

### Discovery Files

| File | Responsibility |
|------|---------------|
| `public/llms.txt` | Short discovery file for agents |
| `public/llms-full.txt` | Complete API reference for agents |

---

## Phase 1: API Foundation

### Task 1: API Response Helpers

**Files:**
- Create: `src/lib/api/v1/response.ts`
- Create: `src/lib/api/v1/validate.ts`
- Test: `src/lib/api/v1/__tests__/response.test.ts`
- Test: `src/lib/api/v1/__tests__/validate.test.ts`

- [ ] **Step 1: Write failing tests for response helpers**

```typescript
// src/lib/api/v1/__tests__/response.test.ts
import { apiSuccess, apiError, setCacheHeaders } from '../response';

describe('apiSuccess', () => {
  it('wraps data in standard envelope', () => {
    const result = apiSuccess({ items: [1, 2] }, { total: 2, limit: 20 });
    expect(result).toEqual({
      ok: true,
      data: { items: [1, 2] },
      meta: { total: 2, limit: 20 },
      source: 'sanluisway.com',
    });
  });

  it('omits meta when not provided', () => {
    const result = apiSuccess({ temp: 25 });
    expect(result).toEqual({
      ok: true,
      data: { temp: 25 },
      source: 'sanluisway.com',
    });
  });
});

describe('apiError', () => {
  it('builds error envelope', () => {
    const result = apiError('NOT_FOUND', 'Event not found');
    expect(result).toEqual({
      ok: false,
      error: { code: 'NOT_FOUND', message: 'Event not found' },
      source: 'sanluisway.com',
    });
  });
});

describe('setCacheHeaders', () => {
  it('sets Cache-Control header on response', () => {
    const setHeader = jest.fn();
    const res = { setHeader } as any;
    setCacheHeaders(res);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    );
  });

  it('accepts custom maxAge', () => {
    const setHeader = jest.fn();
    const res = { setHeader } as any;
    setCacheHeaders(res, 60);
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=120'
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest src/lib/api/v1/__tests__/response.test.ts --no-coverage`
Expected: FAIL — module not found

- [ ] **Step 3: Implement response helpers**

```typescript
// src/lib/api/v1/response.ts
import type { NextApiResponse } from 'next';

interface ApiMeta {
  total: number;
  limit: number;
}

interface ApiSuccessResponse {
  ok: true;
  data: unknown;
  meta?: ApiMeta;
  source: string;
}

interface ApiErrorResponse {
  ok: false;
  error: { code: string; message: string };
  source: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export function apiSuccess(data: unknown, meta?: ApiMeta): ApiSuccessResponse {
  const response: ApiSuccessResponse = {
    ok: true,
    data,
    source: 'sanluisway.com',
  };
  if (meta) response.meta = meta;
  return response;
}

export function apiError(code: string, message: string): ApiErrorResponse {
  return {
    ok: false,
    error: { code, message },
    source: 'sanluisway.com',
  };
}

export function setCacheHeaders(res: NextApiResponse, maxAge = 300): void {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  );
}

export function methodNotAllowed(res: NextApiResponse): void {
  res.status(405).json(apiError('METHOD_NOT_ALLOWED', 'Only GET is allowed'));
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx jest src/lib/api/v1/__tests__/response.test.ts --no-coverage`
Expected: PASS (3 tests)

- [ ] **Step 5: Write failing tests for validation helpers**

```typescript
// src/lib/api/v1/__tests__/validate.test.ts
import { paginationSchema, parseQuery } from '../validate';

describe('paginationSchema', () => {
  it('parses valid limit', () => {
    const result = paginationSchema.safeParse({ limit: '10' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(10);
  });

  it('defaults limit to 20', () => {
    const result = paginationSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(20);
  });

  it('caps limit at 100', () => {
    const result = paginationSchema.safeParse({ limit: '500' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(100);
  });

  it('rejects non-numeric limit', () => {
    const result = paginationSchema.safeParse({ limit: 'abc' });
    expect(result.success).toBe(false);
  });
});

describe('parseQuery', () => {
  it('returns parsed data on success', () => {
    const result = parseQuery(paginationSchema, { limit: '5' });
    expect(result).toEqual({ success: true, data: { limit: 5 } });
  });

  it('returns error message on failure', () => {
    const result = parseQuery(paginationSchema, { limit: 'bad' });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBeDefined();
  });
});
```

- [ ] **Step 6: Run tests to verify they fail**

Run: `npx jest src/lib/api/v1/__tests__/validate.test.ts --no-coverage`
Expected: FAIL — module not found

- [ ] **Step 7: Implement validation helpers**

```typescript
// src/lib/api/v1/validate.ts
import { z } from 'zod';

const coerceInt = z.string().pipe(z.coerce.number().int().positive()).optional();

export const paginationSchema = z.object({
  limit: z
    .string()
    .optional()
    .default('20')
    .pipe(z.coerce.number().int().min(1).max(100)),
});

export const eventsQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  from: z.string().datetime({ offset: true }).optional(),
  to: z.string().datetime({ offset: true }).optional(),
});

export const placesQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  sort: z.enum(['newest', 'rating', 'name']).optional().default('newest'),
});

export const guidesQuerySchema = paginationSchema.extend({
  tag: z.string().optional(),
});

export const newsQuerySchema = paginationSchema.extend({
  lang: z.enum(['en', 'es', 'de', 'ja']).optional().default('en'),
});

export const searchQuerySchema = paginationSchema.extend({
  q: z.string().min(2, 'Query must be at least 2 characters'),
  type: z
    .enum(['events', 'places', 'guides', 'outdoor', 'culture', 'all'])
    .optional()
    .default('all'),
});

interface ParseSuccess<T> {
  success: true;
  data: T;
}

interface ParseFailure {
  success: false;
  error: string;
}

export function parseQuery<T>(
  schema: z.ZodSchema<T>,
  query: Record<string, unknown>
): ParseSuccess<T> | ParseFailure {
  const result = schema.safeParse(query);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const message = result.error.issues.map((i) => i.message).join('; ');
  return { success: false, error: message };
}
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npx jest src/lib/api/v1/__tests__/validate.test.ts --no-coverage`
Expected: PASS (4 tests)

- [ ] **Step 9: Commit**

```bash
git add src/lib/api/v1/
git commit -m "feat(api): add v1 response envelope and validation helpers"
```

---

### Task 2: Extract Shared Data Files (Guides, Outdoor, Culture)

Currently guides, outdoor activities, and culture content are hardcoded in page components. Extract them into shared data files so both the pages and the API can use them.

**Files:**
- Create: `src/data/guides.ts`
- Create: `src/data/outdoor.ts`
- Create: `src/data/culture.ts`
- Test: `src/data/__tests__/guides.test.ts`

**Context:** The outdoor activities array is in `src/pages/index.tsx` around lines 128-189 with i18n translation keys. Guide references are in `src/pages/index.tsx` around lines 192+. Culture content lives across `src/pages/cultural/` page files. The data files should export typed arrays with i18n keys that pages can consume via `useTranslation`.

- [ ] **Step 1: Read the existing hardcoded data**

Read the outdoor activities array from `src/pages/index.tsx` lines 128-200 to capture the exact structure, slugs, image paths, and translation keys. Also read guide references from lines 200-260. Check `src/components/home/CultureSection.tsx` for culture data structure.

- [ ] **Step 2: Write test for guides data**

```typescript
// src/data/__tests__/guides.test.ts
import { guides } from '../guides';
import { outdoorActivities } from '../outdoor';
import { cultureSites } from '../culture';

describe('guides', () => {
  it('exports a non-empty array', () => {
    expect(guides.length).toBeGreaterThan(0);
  });

  it('each guide has required fields', () => {
    for (const guide of guides) {
      expect(guide.slug).toBeDefined();
      expect(guide.titleKey).toBeDefined();
      expect(guide.descriptionKey).toBeDefined();
      expect(guide.path).toMatch(/^\/guides\//);
    }
  });

  it('slugs are unique', () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('outdoorActivities', () => {
  it('exports a non-empty array', () => {
    expect(outdoorActivities.length).toBeGreaterThan(0);
  });

  it('each activity has required fields', () => {
    for (const activity of outdoorActivities) {
      expect(activity.slug).toBeDefined();
      expect(activity.titleKey).toBeDefined();
      expect(activity.image).toBeDefined();
    }
  });
});

describe('cultureSites', () => {
  it('exports a non-empty array', () => {
    expect(cultureSites.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx jest src/data/__tests__/guides.test.ts --no-coverage`
Expected: FAIL — modules not found

- [ ] **Step 4: Create guides data file**

Extract guide metadata from the existing pages. Each guide gets a slug, i18n title/description keys, tags, image, and the page path.

```typescript
// src/data/guides.ts
export interface Guide {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  image: string;
  path: string;
}

export const guides: Guide[] = [
  {
    slug: 'family-activities',
    titleKey: 'homepage.practical.family',
    descriptionKey: 'homepage.practical.familyDesc',
    tags: ['family', 'kids'],
    image: '/images/guides/family.jpg',
    path: '/guides/family-activities',
  },
  {
    slug: 'rainy-day',
    titleKey: 'homepage.practical.rainyDay',
    descriptionKey: 'homepage.practical.rainyDayDesc',
    tags: ['weather', 'indoor'],
    image: '/images/guides/rainy-day.jpg',
    path: '/guides/rainy-day',
  },
  // ... extract all guides from existing pages
  // Check /src/pages/guides/ directory for the full list of guide pages
  // Each page file = one guide entry here
];
```

**Important:** Read every file in `src/pages/guides/` to build the complete list. Each `.tsx` file there is a guide page. Extract slug from filename, match to existing i18n keys.

- [ ] **Step 5: Create outdoor data file**

Extract from the hardcoded array in `src/pages/index.tsx` (around lines 128-189).

```typescript
// src/data/outdoor.ts
export interface OutdoorActivity {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  path: string;
}

export const outdoorActivities: OutdoorActivity[] = [
  // Extract directly from the existing array in index.tsx
  // Preserve exact slugs, image paths, and i18n keys
];
```

- [ ] **Step 6: Create culture data file**

Extract from `src/components/home/CultureSection.tsx` and `src/pages/cultural/`.

```typescript
// src/data/culture.ts
export interface CultureSite {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  path: string;
}

export const cultureSites: CultureSite[] = [
  // Extract from existing CultureSection component and cultural pages
];
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx jest src/data/__tests__/guides.test.ts --no-coverage`
Expected: PASS (5 tests)

- [ ] **Step 8: Update existing components to use shared data files**

Replace the hardcoded arrays in `src/pages/index.tsx` and relevant components with imports from `src/data/`. This ensures a single source of truth. Example:

```typescript
// In src/pages/index.tsx, replace the inline outdoorActivities array with:
import { outdoorActivities } from '@/data/outdoor';
```

Do the same for guides and culture references. Test the site still builds: `npm run build`.

- [ ] **Step 9: Commit**

```bash
git add src/data/ src/pages/index.tsx src/components/
git commit -m "refactor: extract guides, outdoor, culture data into shared files"
```

---

### Task 3: Events API Endpoints

**Files:**
- Create: `src/pages/api/v1/events/index.ts`
- Create: `src/pages/api/v1/events/[slug].ts`
- Test: `src/pages/api/v1/events/__tests__/index.test.ts`
- Test: `src/pages/api/v1/events/__tests__/[slug].test.ts`

**Context:** Events are in the `events` Supabase table. Key columns: `id`, `title`, `description`, `start_date`, `end_date`, `location`, `category`, `image_url`, `featured`. Use `supabaseAdmin` from `src/lib/api/supabase-admin.ts`. Filter to upcoming events only (`end_date >= now`).

- [ ] **Step 1: Write failing test for events list endpoint**

```typescript
// src/pages/api/v1/events/__tests__/index.test.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../index';

// Mock supabase-admin
jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Fenapo 2026',
          description: 'Annual fair',
          start_date: '2026-08-01T00:00:00Z',
          end_date: '2026-08-20T00:00:00Z',
          location: 'SLP',
          category: 'traditional',
          image_url: '/img/fenapo.jpg',
          featured: true,
        },
      ],
      error: null,
    }),
  },
}));

function createMocks(query = {}) {
  const req = { method: 'GET', query } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json, setHeader };
}

describe('GET /api/v1/events', () => {
  it('returns events in standard envelope', async () => {
    const { req, res, json } = createMocks();
    await handler(req, res);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        data: expect.any(Array),
        source: 'sanluisway.com',
      })
    );
  });

  it('rejects non-GET methods', async () => {
    const { res, json, status } = createMocks();
    const req = { method: 'POST', query: {} } as unknown as NextApiRequest;
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(405);
  });

  it('validates query params', async () => {
    const { req, res, status } = createMocks({ limit: 'bad' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/pages/api/v1/events/__tests__/index.test.ts --no-coverage`
Expected: FAIL — module not found

- [ ] **Step 3: Implement events list endpoint**

```typescript
// src/pages/api/v1/events/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { eventsQuerySchema, parseQuery } from '@/lib/api/v1/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(eventsQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, category, from, to } = parsed.data;

  try {
    let query = supabaseAdmin
      .from('events')
      .select('id, title, description, start_date, end_date, location, category, image_url, featured')
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(limit);

    if (category) query = query.eq('category', category);
    if (from) query = query.gte('start_date', from);
    if (to) query = query.lte('start_date', to);

    const { data, error } = await query;

    if (error) {
      return res.status(500).json(apiError('DB_ERROR', 'Failed to fetch events'));
    }

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data || [], { total: data?.length || 0, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx jest src/pages/api/v1/events/__tests__/index.test.ts --no-coverage`
Expected: PASS (3 tests)

- [ ] **Step 5: Write failing test for event detail endpoint**

```typescript
// src/pages/api/v1/events/__tests__/[slug].test.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../[slug]';

jest.mock('@/lib/api/supabase-admin', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: {
        id: '1',
        title: 'Fenapo 2026',
        description: 'Annual fair in SLP',
        start_date: '2026-08-01T00:00:00Z',
        end_date: '2026-08-20T00:00:00Z',
        location: 'Parque Tangamanga',
        category: 'traditional',
        image_url: '/img/fenapo.jpg',
        featured: true,
      },
      error: null,
    }),
  },
}));

function createMocks(slug: string) {
  const req = { method: 'GET', query: { slug } } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json };
}

describe('GET /api/v1/events/[slug]', () => {
  it('returns event detail', async () => {
    const { req, res, json } = createMocks('fenapo-2026');
    await handler(req, res);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, data: expect.objectContaining({ title: 'Fenapo 2026' }) })
    );
  });

  it('returns 400 for missing slug', async () => {
    const req = { method: 'GET', query: {} } as unknown as NextApiRequest;
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const setHeader = jest.fn();
    const res = { status, json, setHeader } as unknown as NextApiResponse;
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
  });
});
```

- [ ] **Step 6: Implement event detail endpoint**

```typescript
// src/pages/api/v1/events/[slug].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json(apiError('INVALID_PARAMS', 'Missing required param: slug'));
  }

  try {
    // Events don't have a slug column — search by title slug-ified
    // Use ilike for case-insensitive match on a generated slug pattern
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .ilike('title', slug.replace(/-/g, '%'))
      .single();

    if (error || !data) {
      return res.status(404).json(apiError('NOT_FOUND', `Event '${slug}' not found`));
    }

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
```

**Note:** The events table may not have a `slug` column. Check the actual table schema. If there's no slug, you may need to: (a) add a slug column to events, (b) search by title with fuzzy matching, or (c) use the event ID. Prefer option (a) — add a `slug` column and populate it from title. If that's not feasible, use ID-based lookup and document it in the API.

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx jest src/pages/api/v1/events/__tests__/ --no-coverage`
Expected: PASS (5 tests)

- [ ] **Step 8: Commit**

```bash
git add src/pages/api/v1/events/
git commit -m "feat(api): add GET /api/v1/events and /api/v1/events/[slug]"
```

---

### Task 4: Places API Endpoints

**Files:**
- Create: `src/pages/api/v1/places/index.ts`
- Create: `src/pages/api/v1/places/[slug].ts`
- Test: `src/pages/api/v1/places/__tests__/index.test.ts`
- Test: `src/pages/api/v1/places/__tests__/[slug].test.ts`

**Context:** Places are in the `places` Supabase table. Key columns: `id`, `name`, `category`, `address`, `city`, `phone`, `website`, `instagram`, `latitude`, `longitude`, `description`, `image_url`, `hours`, `featured`, `rating`, `price_level`. Localization: use `getLocalizedField()` from `src/lib/supabase.ts` for `name` and `description` fields. Category is an enum: `'food'`, `'beverages'`, `'sports-fitness'`, `'outdoor-activities'`, `'private-dining-rooms'`, `'language-exchange-cafes'`, `'family-activities'`, `'terraces'`, `'live-music'`, `'service'`, `'other'`.

- [ ] **Step 1: Write failing tests for places list**

Same test pattern as Task 3 events. Mock `supabaseAdmin` with place data. Test: standard envelope, method validation, query param validation, category filtering.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest src/pages/api/v1/places/__tests__/index.test.ts --no-coverage`

- [ ] **Step 3: Implement places list endpoint**

```typescript
// src/pages/api/v1/places/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { placesQuerySchema, parseQuery } from '@/lib/api/v1/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(placesQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, category, sort } = parsed.data;

  try {
    let query = supabaseAdmin
      .from('places')
      .select('id, name, category, address, city, phone, website, instagram, latitude, longitude, description, image_url, hours, featured, rating, price_level')
      .limit(limit);

    if (category) query = query.eq('category', category);

    const orderMap: Record<string, { column: string; ascending: boolean }> = {
      newest: { column: 'created_at', ascending: false },
      rating: { column: 'rating', ascending: false },
      name: { column: 'name', ascending: true },
    };
    const order = orderMap[sort] || orderMap.newest;
    query = query.order(order.column, { ascending: order.ascending });

    const { data, error } = await query;

    if (error) {
      return res.status(500).json(apiError('DB_ERROR', 'Failed to fetch places'));
    }

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data || [], { total: data?.length || 0, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

- [ ] **Step 5: Write tests + implement place detail endpoint**

Same pattern as events `[slug]`. Places likely have `name` but not `slug` — use name-based lookup or add slug. Check actual table structure.

```typescript
// src/pages/api/v1/places/[slug].ts
// Same pattern as events/[slug].ts but querying places table
// Include reviews join if possible: .select('*, reviews(*)')
```

- [ ] **Step 6: Run all places tests**

Run: `npx jest src/pages/api/v1/places/__tests__/ --no-coverage`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/pages/api/v1/places/
git commit -m "feat(api): add GET /api/v1/places and /api/v1/places/[slug]"
```

---

### Task 5: Guides, Outdoor, Culture API Endpoints

**Files:**
- Create: `src/pages/api/v1/guides/index.ts`
- Create: `src/pages/api/v1/guides/[slug].ts`
- Create: `src/pages/api/v1/outdoor.ts`
- Create: `src/pages/api/v1/culture.ts`
- Test: `src/pages/api/v1/guides/__tests__/index.test.ts`
- Test: `src/pages/api/v1/__tests__/outdoor.test.ts`
- Test: `src/pages/api/v1/__tests__/culture.test.ts`

**Context:** These endpoints serve data from the shared data files created in Task 2 (`src/data/guides.ts`, `src/data/outdoor.ts`, `src/data/culture.ts`). No Supabase queries — just filter and return the typed arrays. Localization is handled by returning translation keys that the consuming agent resolves, OR by accepting a `lang` param and resolving the keys server-side using the i18n JSON files.

**Decision:** Resolve translation keys server-side by reading from `public/locales/{lang}/common.json`. This way agents get actual text, not opaque keys.

- [ ] **Step 1: Write failing tests for guides list**

```typescript
// src/pages/api/v1/guides/__tests__/index.test.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../index';

function createMocks(query = {}) {
  const req = { method: 'GET', query } as unknown as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const setHeader = jest.fn();
  const res = { status, json, setHeader } as unknown as NextApiResponse;
  return { req, res, status, json };
}

describe('GET /api/v1/guides', () => {
  it('returns guides array in envelope', async () => {
    const { req, res, json } = createMocks();
    await handler(req, res);
    const response = json.mock.calls[0][0];
    expect(response.ok).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  it('filters by tag', async () => {
    const { req, res, json } = createMocks({ tag: 'family' });
    await handler(req, res);
    const response = json.mock.calls[0][0];
    expect(response.ok).toBe(true);
    for (const guide of response.data) {
      expect(guide.tags).toContain('family');
    }
  });
});
```

- [ ] **Step 2: Implement guides endpoint + resolve i18n keys**

Create a helper `resolveTranslations(locale)` that reads the JSON file and resolves translation keys to actual strings.

```typescript
// src/pages/api/v1/guides/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { guides } from '@/data/guides';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { guidesQuerySchema, parseQuery } from '@/lib/api/v1/validate';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(guidesQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, tag } = parsed.data;
  const lang = (req.query.lang as string) || 'en';

  let filtered = guides;
  if (tag) filtered = filtered.filter((g) => g.tags.includes(tag));
  filtered = filtered.slice(0, limit);

  const data = filtered.map((g) => ({
    slug: g.slug,
    title: resolveKey(g.titleKey, lang),
    description: resolveKey(g.descriptionKey, lang),
    tags: g.tags,
    image: g.image,
    path: g.path,
  }));

  setCacheHeaders(res, 600); // 10 min cache for static data
  return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
}
```

Create `src/lib/api/v1/i18n.ts`:

```typescript
// src/lib/api/v1/i18n.ts
import fs from 'fs';
import path from 'path';

const cache: Record<string, Record<string, unknown>> = {};

function loadLocale(lang: string): Record<string, unknown> {
  if (cache[lang]) return cache[lang];
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    cache[lang] = JSON.parse(content);
    return cache[lang];
  } catch {
    return {};
  }
}

export function resolveKey(key: string, lang = 'en'): string {
  const translations = loadLocale(lang);
  const parts = key.split('.');
  let current: unknown = translations;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      // Fallback to English
      if (lang !== 'en') return resolveKey(key, 'en');
      return key; // Return key itself as last resort
    }
  }
  return typeof current === 'string' ? current : key;
}
```

- [ ] **Step 3: Implement outdoor and culture endpoints**

Same pattern — read from data files, resolve i18n, return in envelope.

```typescript
// src/pages/api/v1/outdoor.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { outdoorActivities } from '@/data/outdoor';
import { apiSuccess, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const lang = (req.query.lang as string) || 'en';

  const data = outdoorActivities.slice(0, limit).map((a) => ({
    slug: a.slug,
    title: resolveKey(a.titleKey, lang),
    description: resolveKey(a.descriptionKey, lang),
    image: a.image,
    path: a.path,
  }));

  setCacheHeaders(res, 600);
  return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
}
```

```typescript
// src/pages/api/v1/culture.ts — same pattern with cultureSites
```

- [ ] **Step 4: Implement guide detail endpoint**

```typescript
// src/pages/api/v1/guides/[slug].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { guides } from '@/data/guides';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json(apiError('INVALID_PARAMS', 'Missing required param: slug'));
  }

  const lang = (req.query.lang as string) || 'en';
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return res.status(404).json(apiError('NOT_FOUND', `Guide '${slug}' not found`));
  }

  const data = {
    slug: guide.slug,
    title: resolveKey(guide.titleKey, lang),
    description: resolveKey(guide.descriptionKey, lang),
    tags: guide.tags,
    image: guide.image,
    path: guide.path,
    url: `https://www.sanluisway.com${guide.path}`,
  };

  setCacheHeaders(res, 600);
  return res.status(200).json(apiSuccess(data));
}
```

- [ ] **Step 5: Run all tests**

Run: `npx jest src/pages/api/v1/guides/ src/pages/api/v1/__tests__/outdoor.test.ts src/pages/api/v1/__tests__/culture.test.ts --no-coverage`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/api/v1/guides/ src/pages/api/v1/outdoor.ts src/pages/api/v1/culture.ts src/lib/api/v1/i18n.ts
git commit -m "feat(api): add guides, outdoor, culture endpoints with i18n resolution"
```

---

### Task 6: Weather, News, Exchange Rates API Endpoints

**Files:**
- Create: `src/pages/api/v1/weather.ts`
- Create: `src/pages/api/v1/news.ts`
- Create: `src/pages/api/v1/exchange-rates.ts`
- Test: `src/pages/api/v1/__tests__/weather.test.ts`
- Test: `src/pages/api/v1/__tests__/news.test.ts`
- Test: `src/pages/api/v1/__tests__/exchange-rates.test.ts`

**Context:** The existing `/api/dashboard-data` endpoint already fetches weather (OpenWeatherMap), exchange rates (Frankfurter API), and news (Supabase `news_headlines` + `community_news` tables). Reuse the same data-fetching logic from `src/lib/api/dashboard-data.ts` — import and call the existing functions, then wrap in the v1 envelope.

- [ ] **Step 1: Write failing tests**

One test per endpoint. Mock the existing dashboard data functions.

- [ ] **Step 2: Implement weather endpoint**

```typescript
// src/pages/api/v1/weather.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const SLP_LAT = 22.1565;
const SLP_LON = -100.9855;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(503).json(apiError('SERVICE_UNAVAILABLE', 'Weather service not configured'));
    }

    const response = await fetch(
      `${OPENWEATHER_URL}?lat=${SLP_LAT}&lon=${SLP_LON}&units=metric&appid=${apiKey}`
    );
    const raw = await response.json();

    const data = {
      temperature: raw.main?.temp,
      feels_like: raw.main?.feels_like,
      humidity: raw.main?.humidity,
      condition: raw.weather?.[0]?.main,
      description: raw.weather?.[0]?.description,
      wind_speed: raw.wind?.speed,
      city: 'San Luis Potosí',
      updated_at: new Date().toISOString(),
    };

    setCacheHeaders(res, 180); // 3 min cache for weather
    return res.status(200).json(apiSuccess(data));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Failed to fetch weather'));
  }
}
```

- [ ] **Step 3: Implement news endpoint**

```typescript
// src/pages/api/v1/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { newsQuerySchema, parseQuery } from '@/lib/api/v1/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(newsQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { limit, lang } = parsed.data;

  try {
    // Fetch from news_headlines
    const { data: headlines, error: hErr } = await supabaseAdmin
      .from('news_headlines')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false })
      .limit(limit);

    if (hErr) {
      return res.status(500).json(apiError('DB_ERROR', 'Failed to fetch news'));
    }

    // Map to localized fields
    const data = (headlines || []).map((h: Record<string, unknown>) => ({
      id: h.id,
      title: h[`text_${lang}`] || h.text_en,
      summary: h[`summary_${lang}`] || h.summary_en,
      source: h.source,
      source_url: h.source_url,
      created_at: h.created_at,
    }));

    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(data, { total: data.length, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
```

- [ ] **Step 4: Implement exchange-rates endpoint**

```typescript
// src/pages/api/v1/exchange-rates.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';

const FRANKFURTER_URL = 'https://api.frankfurter.app/latest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  try {
    const response = await fetch(`${FRANKFURTER_URL}?from=MXN&to=USD,EUR,GBP,JPY,CNY`);
    const raw = await response.json();

    const data = {
      base: 'MXN',
      rates: raw.rates || {},
      date: raw.date,
      updated_at: new Date().toISOString(),
    };

    setCacheHeaders(res, 600); // 10 min cache for rates
    return res.status(200).json(apiSuccess(data));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Failed to fetch exchange rates'));
  }
}
```

- [ ] **Step 5: Run all tests**

Run: `npx jest src/pages/api/v1/__tests__/weather.test.ts src/pages/api/v1/__tests__/news.test.ts src/pages/api/v1/__tests__/exchange-rates.test.ts --no-coverage`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/api/v1/weather.ts src/pages/api/v1/news.ts src/pages/api/v1/exchange-rates.ts
git commit -m "feat(api): add weather, news, exchange-rates endpoints"
```

---

### Task 7: Search API Endpoint

**Files:**
- Create: `src/pages/api/v1/search.ts`
- Test: `src/pages/api/v1/__tests__/search.test.ts`

**Context:** Cross-content search. Searches across Supabase tables (events, places) using `ilike` and across static data files (guides, outdoor, culture) using string matching. Returns unified results tagged by type.

- [ ] **Step 1: Write failing test**

- [ ] **Step 2: Implement search endpoint**

```typescript
// src/pages/api/v1/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/api/supabase-admin';
import { guides } from '@/data/guides';
import { outdoorActivities } from '@/data/outdoor';
import { cultureSites } from '@/data/culture';
import { apiSuccess, apiError, setCacheHeaders, methodNotAllowed } from '@/lib/api/v1/response';
import { searchQuerySchema, parseQuery } from '@/lib/api/v1/validate';
import { resolveKey } from '@/lib/api/v1/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res);

  const parsed = parseQuery(searchQuerySchema, req.query);
  if (!parsed.success) {
    return res.status(400).json(apiError('INVALID_PARAMS', parsed.error));
  }

  const { q, limit, type } = parsed.data;
  const lang = (req.query.lang as string) || 'en';
  const pattern = `%${q}%`;
  const results: Array<{ type: string; slug: string; title: string; description?: string }> = [];

  try {
    // Search events
    if (type === 'all' || type === 'events') {
      const { data } = await supabaseAdmin
        .from('events')
        .select('title, description, category, start_date')
        .or(`title.ilike.${pattern},description.ilike.${pattern}`)
        .limit(limit);
      for (const e of data || []) {
        results.push({ type: 'event', slug: e.title, title: e.title, description: e.description });
      }
    }

    // Search places
    if (type === 'all' || type === 'places') {
      const { data } = await supabaseAdmin
        .from('places')
        .select('name, description, category, address')
        .or(`name.ilike.${pattern},description.ilike.${pattern}`)
        .limit(limit);
      for (const p of data || []) {
        results.push({ type: 'place', slug: p.name, title: p.name, description: p.description });
      }
    }

    // Search guides (static data)
    if (type === 'all' || type === 'guides') {
      const qLower = q.toLowerCase();
      for (const g of guides) {
        const title = resolveKey(g.titleKey, lang);
        const desc = resolveKey(g.descriptionKey, lang);
        if (title.toLowerCase().includes(qLower) || desc.toLowerCase().includes(qLower)) {
          results.push({ type: 'guide', slug: g.slug, title, description: desc });
        }
      }
    }

    // Search outdoor (static data)
    if (type === 'all' || type === 'outdoor') {
      const qLower = q.toLowerCase();
      for (const a of outdoorActivities) {
        const title = resolveKey(a.titleKey, lang);
        if (title.toLowerCase().includes(qLower)) {
          results.push({ type: 'outdoor', slug: a.slug, title });
        }
      }
    }

    // Search culture (static data)
    if (type === 'all' || type === 'culture') {
      const qLower = q.toLowerCase();
      for (const c of cultureSites) {
        const title = resolveKey(c.titleKey, lang);
        if (title.toLowerCase().includes(qLower)) {
          results.push({ type: 'culture', slug: c.slug, title });
        }
      }
    }

    const limited = results.slice(0, limit);
    setCacheHeaders(res);
    return res.status(200).json(apiSuccess(limited, { total: limited.length, limit }));
  } catch {
    return res.status(500).json(apiError('INTERNAL_ERROR', 'Internal server error'));
  }
}
```

- [ ] **Step 3: Run tests, verify pass**

- [ ] **Step 4: Commit**

```bash
git add src/pages/api/v1/search.ts src/pages/api/v1/__tests__/search.test.ts
git commit -m "feat(api): add cross-content search endpoint"
```

---

### Task 8: llms.txt and llms-full.txt

**Files:**
- Create: `public/llms.txt`
- Create: `public/llms-full.txt`

- [ ] **Step 1: Create llms.txt**

```text
# San Luis Way
> The most complete guide to San Luis Potosí, Mexico — for AI agents and humans.

## Agent Access
- MCP Server: npx @sanluisway/mcp-server (no API keys needed)
- CLI: npx @sanluisway/cli (no API keys needed)
- Docs: https://www.sanluisway.com/agent-connect
- API Base: https://www.sanluisway.com/api/v1

## Available Data (all read-only JSON)
- Events: upcoming events, festivals, conferences in SLP
- Places: restaurants, cafés, bars, museums, shops with ratings and reviews
- Guides: practical visitor and resident guides (family, rainy day, foodie, etc.)
- Outdoor: hiking, camping, Real de Catorce, Huasteca Potosina
- Culture: historic sites, museums, Centro Histórico
- Weather: current conditions in SLP
- News: local headlines in 4 languages (en, es, de, ja)
- Exchange Rates: MXN to USD, EUR, GBP, JPY, CNY

## Quick Start
MCP: Add to Claude Desktop config: {"mcpServers":{"SanLuisWay":{"command":"npx","args":["-y","@sanluisway/mcp-server"]}}}
CLI: npx @sanluisway/cli events --limit 5 --json
```

- [ ] **Step 2: Create llms-full.txt**

Full API documentation with all 12 endpoints, every parameter, response shapes, MCP tools, CLI commands, and example prompts. Write the complete file — this is the primary reference an LLM reads to understand the full API surface.

- [ ] **Step 3: Verify serving**

Next.js serves files from `public/` at the site root. Verify with `npm run dev` that `http://localhost:3001/llms.txt` and `http://localhost:3001/llms-full.txt` return the content with `Content-Type: text/plain`.

- [ ] **Step 4: Commit**

```bash
git add public/llms.txt public/llms-full.txt
git commit -m "feat: add llms.txt and llms-full.txt for agent discovery"
```

---

## Phase 2: Distribution Packages

### Task 9: MCP Server Package

**Files:**
- Create: `packages/mcp-server/package.json`
- Create: `packages/mcp-server/tsconfig.json`
- Create: `packages/mcp-server/src/index.ts`
- Create: `packages/mcp-server/src/client.ts`
- Create: `packages/mcp-server/src/tools.ts`
- Create: `packages/mcp-server/src/resources.ts`
- Test: `packages/mcp-server/src/__tests__/client.test.ts`
- Test: `packages/mcp-server/src/__tests__/tools.test.ts`

**Context:** Uses `@modelcontextprotocol/sdk` to create an MCP server that exposes tools calling the public API at `https://www.sanluisway.com/api/v1/`. Published as `@sanluisway/mcp-server` on npm. Entry point runs via `npx`.

- [ ] **Step 1: Initialize package**

```bash
mkdir -p packages/mcp-server/src/__tests__
```

```json
// packages/mcp-server/package.json
{
  "name": "@sanluisway/mcp-server",
  "version": "0.1.0",
  "description": "MCP server for San Luis Way — structured access to San Luis Potosí data",
  "main": "dist/index.js",
  "bin": {
    "sanluisway-mcp": "dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "test": "jest"
  },
  "keywords": ["mcp", "san-luis-potosi", "travel", "ai-agent"],
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tsx": "^4.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

- [ ] **Step 2: Write failing test for API client**

```typescript
// packages/mcp-server/src/__tests__/client.test.ts
import { SanLuisWayClient } from '../client';

// Mock global fetch
global.fetch = jest.fn();

describe('SanLuisWayClient', () => {
  const client = new SanLuisWayClient();

  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it('fetches events from API', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true, data: [{ title: 'Fenapo' }] }),
    });
    const result = await client.getEvents({ limit: 5 });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/events?limit=5')
    );
    expect(result.data).toHaveLength(1);
  });

  it('throws on HTTP error', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });
    await expect(client.getEvents()).rejects.toThrow();
  });
});
```

- [ ] **Step 3: Implement API client**

```typescript
// packages/mcp-server/src/client.ts
const API_BASE = process.env.SANLUISWAY_API_URL || 'https://www.sanluisway.com';

interface ApiResponse {
  ok: boolean;
  data: unknown;
  meta?: { total: number; limit: number };
  error?: { code: string; message: string };
}

export class SanLuisWayClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE;
  }

  private async request(path: string, params: Record<string, string | number | undefined> = {}): Promise<ApiResponse> {
    const url = new URL(`/api/v1${path}`, this.baseUrl);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getEvents(params?: { limit?: number; category?: string; from?: string; to?: string }) {
    return this.request('/events', params);
  }

  async getEvent(slug: string) {
    return this.request(`/events/${slug}`);
  }

  async getPlaces(params?: { limit?: number; category?: string; sort?: string }) {
    return this.request('/places', params);
  }

  async getPlace(slug: string) {
    return this.request(`/places/${slug}`);
  }

  async getGuides(params?: { limit?: number; tag?: string }) {
    return this.request('/guides', params);
  }

  async getGuide(slug: string) {
    return this.request(`/guides/${slug}`);
  }

  async getOutdoor(params?: { limit?: number }) {
    return this.request('/outdoor', params);
  }

  async getCulture(params?: { limit?: number }) {
    return this.request('/culture', params);
  }

  async getWeather() {
    return this.request('/weather');
  }

  async getNews(params?: { limit?: number; lang?: string }) {
    return this.request('/news', params);
  }

  async getExchangeRates() {
    return this.request('/exchange-rates');
  }

  async search(params: { q: string; limit?: number; type?: string }) {
    return this.request('/search', params);
  }
}
```

- [ ] **Step 4: Implement MCP server entry point with tools**

```typescript
// packages/mcp-server/src/index.ts
#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { SanLuisWayClient } from './client.js';

const client = new SanLuisWayClient();
const server = new McpServer({
  name: 'SanLuisWay',
  version: '0.1.0',
});

// Register all 12 tools
server.tool('get_events', 'Get upcoming events in San Luis Potosí', {
  limit: z.number().optional().describe('Max results (default 20, max 100)'),
  category: z.string().optional().describe('Event category filter'),
  from: z.string().optional().describe('Start date ISO filter'),
  to: z.string().optional().describe('End date ISO filter'),
}, async (params) => {
  const result = await client.getEvents(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_event', 'Get full detail of a specific event', {
  slug: z.string().describe('Event slug (required)'),
}, async ({ slug }) => {
  const result = await client.getEvent(slug);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_places', 'Get places in SLP: restaurants, cafés, museums, bars, etc.', {
  limit: z.number().optional().describe('Max results (default 20, max 100)'),
  category: z.string().optional().describe('Place category: food, beverages, sports-fitness, outdoor-activities, etc.'),
  sort: z.string().optional().describe('Sort: newest, rating, name'),
}, async (params) => {
  const result = await client.getPlaces(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_place', 'Get full detail of a specific place with reviews', {
  slug: z.string().describe('Place slug (required)'),
}, async ({ slug }) => {
  const result = await client.getPlace(slug);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_guides', 'Get practical visitor and resident guides for SLP', {
  limit: z.number().optional(),
  tag: z.string().optional().describe('Filter by tag: family, weather, food, etc.'),
}, async (params) => {
  const result = await client.getGuides(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_guide', 'Get full content of a specific guide', {
  slug: z.string().describe('Guide slug (required)'),
}, async ({ slug }) => {
  const result = await client.getGuide(slug);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_outdoor', 'Get outdoor activities: hiking, camping, Real de Catorce, Huasteca Potosina', {
  limit: z.number().optional(),
}, async (params) => {
  const result = await client.getOutdoor(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_culture', 'Get cultural and historic sites in SLP', {
  limit: z.number().optional(),
}, async (params) => {
  const result = await client.getCulture(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_weather', 'Get current weather in San Luis Potosí', {}, async () => {
  const result = await client.getWeather();
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_news', 'Get local news headlines from San Luis Potosí', {
  limit: z.number().optional(),
  lang: z.string().optional().describe('Language: en, es, de, ja (default en)'),
}, async (params) => {
  const result = await client.getNews(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('get_exchange_rates', 'Get MXN exchange rates (USD, EUR, GBP, JPY, CNY)', {}, async () => {
  const result = await client.getExchangeRates();
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

server.tool('search', 'Search across all SLP content by keyword', {
  q: z.string().describe('Search query (min 2 chars)'),
  limit: z.number().optional(),
  type: z.string().optional().describe('Filter: events, places, guides, outdoor, culture, all'),
}, async (params) => {
  const result = await client.search(params);
  return { content: [{ type: 'text', text: JSON.stringify(result.data, null, 2) }] };
});

// Resources
server.resource('sanluisway://categories', 'sanluisway://categories', async () => ({
  contents: [{
    uri: 'sanluisway://categories',
    mimeType: 'application/json',
    text: JSON.stringify({
      places: ['food', 'beverages', 'sports-fitness', 'outdoor-activities', 'private-dining-rooms', 'language-exchange-cafes', 'family-activities', 'terraces', 'live-music', 'service', 'other'],
      events: ['arts-culture', 'culinary', 'music', 'sports', 'traditional', 'wellness', 'community-social'],
    }),
  }],
}));

server.resource('sanluisway://about', 'sanluisway://about', async () => ({
  contents: [{
    uri: 'sanluisway://about',
    mimeType: 'text/plain',
    text: 'San Luis Way is the most complete English-language guide to San Luis Potosí, Mexico. It provides structured data on events, places (restaurants, cafés, museums, bars), practical guides, outdoor activities, cultural sites, weather, news, and exchange rates. All data is read-only and requires no authentication.',
  }],
}));

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

- [ ] **Step 5: Run tests**

Run: `cd packages/mcp-server && npm install && npx jest --no-coverage`
Expected: PASS

- [ ] **Step 6: Build and verify**

```bash
cd packages/mcp-server && npm run build
```

- [ ] **Step 7: Commit**

```bash
git add packages/mcp-server/
git commit -m "feat: add @sanluisway/mcp-server package"
```

---

### Task 10: CLI Package

**Files:**
- Create: `packages/cli/package.json`
- Create: `packages/cli/tsconfig.json`
- Create: `packages/cli/src/index.ts`
- Create: `packages/cli/src/client.ts`
- Create: `packages/cli/src/commands/events.ts`
- Create: `packages/cli/src/commands/places.ts`
- Create: `packages/cli/src/commands/guides.ts`
- Create: `packages/cli/src/commands/info.ts`
- Create: `packages/cli/src/commands/search.ts`
- Create: `packages/cli/src/commands/outdoor.ts`
- Create: `packages/cli/src/commands/culture.ts`
- Create: `packages/cli/src/format.ts`
- Test: `packages/cli/src/__tests__/client.test.ts`
- Test: `packages/cli/src/__tests__/commands.test.ts`

**Context:** Uses Commander.js. Same API client as MCP server (copy, don't share — YAGNI, these are separate packages). All commands support `--json` for structured output and have a human-readable default format.

- [ ] **Step 1: Initialize package**

```json
// packages/cli/package.json
{
  "name": "@sanluisway/cli",
  "version": "0.1.0",
  "description": "CLI for San Luis Way — query SLP data from your terminal",
  "main": "dist/index.js",
  "bin": {
    "sanluisway": "dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "test": "jest"
  },
  "keywords": ["cli", "san-luis-potosi", "travel", "ai-agent", "openclaw"],
  "license": "MIT",
  "dependencies": {
    "commander": "^12.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tsx": "^4.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

- [ ] **Step 2: Copy and adapt API client from MCP server**

Same `SanLuisWayClient` class. Copy `packages/mcp-server/src/client.ts` to `packages/cli/src/client.ts`.

- [ ] **Step 3: Implement CLI entry point with Commander**

```typescript
// packages/cli/src/index.ts
#!/usr/bin/env node
import { program } from 'commander';
import { registerEventsCommands } from './commands/events.js';
import { registerPlacesCommands } from './commands/places.js';
import { registerGuidesCommands } from './commands/guides.js';
import { registerInfoCommands } from './commands/info.js';
import { registerSearchCommand } from './commands/search.js';
import { registerOutdoorCommand } from './commands/outdoor.js';
import { registerCultureCommand } from './commands/culture.js';

program
  .name('sanluisway')
  .description('Query San Luis Potosí data from your terminal')
  .version('0.1.0');

registerEventsCommands(program);
registerPlacesCommands(program);
registerGuidesCommands(program);
registerInfoCommands(program);
registerSearchCommand(program);
registerOutdoorCommand(program);
registerCultureCommand(program);

program.parse();
```

- [ ] **Step 4: Implement events commands (template for all others)**

```typescript
// packages/cli/src/commands/events.ts
import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerEventsCommands(program: Command) {
  program
    .command('events')
    .description('List upcoming events in San Luis Potosí')
    .option('--limit <n>', 'Max results', '20')
    .option('--category <cat>', 'Filter by category')
    .option('--from <date>', 'Start date filter (ISO)')
    .option('--to <date>', 'End date filter (ISO)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getEvents({
        limit: Number(opts.limit),
        category: opts.category,
        from: opts.from,
        to: opts.to,
      });
      output(result, opts.json);
    });

  program
    .command('event <slug>')
    .description('Get full detail of a specific event')
    .option('--json', 'Output as JSON')
    .action(async (slug, opts) => {
      const result = await client.getEvent(slug);
      output(result, opts.json);
    });
}
```

- [ ] **Step 5: Implement format helper**

```typescript
// packages/cli/src/format.ts
interface ApiResponse {
  ok: boolean;
  data: unknown;
  meta?: { total: number; limit: number };
  error?: { code: string; message: string };
}

export function output(result: ApiResponse, json?: boolean) {
  if (json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (!result.ok) {
    console.error(`Error: ${result.error?.message || 'Unknown error'}`);
    process.exit(1);
  }

  if (Array.isArray(result.data)) {
    for (const item of result.data) {
      const title = item.title || item.name || item.slug || 'Untitled';
      const desc = item.description ? ` — ${item.description.slice(0, 80)}` : '';
      console.log(`  ${title}${desc}`);
    }
    if (result.meta) {
      console.log(`\n  ${result.meta.total} results`);
    }
  } else {
    console.log(JSON.stringify(result.data, null, 2));
  }
}
```

- [ ] **Step 6: Implement remaining command files**

Follow the same pattern as events for: places, guides, outdoor, culture, info (weather + news + exchange-rates), search. Each file exports a `register*Commands(program)` function.

- [ ] **Step 7: Write tests for commands**

Test that the CLI parses args correctly and calls the right client methods.

- [ ] **Step 8: Build and test manually**

```bash
cd packages/cli && npm install && npm run build
node dist/index.js --help
node dist/index.js events --json
```

- [ ] **Step 9: Commit**

```bash
git add packages/cli/
git commit -m "feat: add @sanluisway/cli package"
```

---

## Phase 3: Site Pages + Banner

### Task 11: AgentConnectBanner Component (Homepage)

**Files:**
- Create: `src/components/AgentConnectBanner.tsx`
- Modify: `src/pages/index.tsx` (insert banner after HeroSection)
- Modify: `public/locales/en/common.json` (add translation keys)
- Modify: `public/locales/es/common.json`
- Modify: `public/locales/de/common.json`
- Modify: `public/locales/ja/common.json`

- [ ] **Step 1: Add i18n keys to all 4 locale files**

Add under `"agentConnect"` namespace in each locale's `common.json`:

```json
// English (en)
"agentConnect": {
  "bannerCta": "Connect Your Agent",
  "bannerResponse": "→ 12 upcoming events in SLP",
  "bannerTags": "MCP · CLI · OpenClaw"
}
```

```json
// Spanish (es)
"agentConnect": {
  "bannerCta": "Conecta Tu Agente",
  "bannerResponse": "→ 12 eventos próximos en SLP",
  "bannerTags": "MCP · CLI · OpenClaw"
}
```

```json
// German (de)
"agentConnect": {
  "bannerCta": "Verbinde Deinen Agenten",
  "bannerResponse": "→ 12 bevorstehende Veranstaltungen in SLP",
  "bannerTags": "MCP · CLI · OpenClaw"
}
```

```json
// Japanese (ja)
"agentConnect": {
  "bannerCta": "エージェントを接続",
  "bannerResponse": "→ SLPの今後のイベント12件",
  "bannerTags": "MCP · CLI · OpenClaw"
}
```

- [ ] **Step 2: Create AgentConnectBanner component**

Terminal Dark style: dark background (#0d1117), traffic light dots, monospace font, green accent, gradient CTA button.

```tsx
// src/components/AgentConnectBanner.tsx
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function AgentConnectBanner() {
  const { t } = useTranslation('common');

  return (
    <section className="w-full px-4 py-3">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-lg bg-[#0d1117] p-5 font-mono text-sm text-[#e6edf3] shadow-lg">
          {/* Traffic light dots */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#f85149]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#d29922]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#3fb950]" />
            <span className="ml-2 text-xs text-[#8b949e]">terminal</span>
          </div>

          {/* Command line */}
          <div className="text-[#3fb950]">
            $ npx @sanluisway/cli events --json
          </div>
          <div className="mt-1.5 text-[#8b949e]">
            {t('agentConnect.bannerResponse')}
          </div>

          {/* CTA row */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/agent-connect"
              className="rounded-md bg-gradient-to-r from-[#6e40c9] to-[#2ea043] px-4 py-1.5 font-sans text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              {t('agentConnect.bannerCta')} →
            </Link>
            <span className="text-xs text-[#58a6ff]">
              {t('agentConnect.bannerTags')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Insert banner into homepage**

In `src/pages/index.tsx`, import and place `<AgentConnectBanner />` after `<HeroSection>` and before `<TodayInSLP>`:

```typescript
import AgentConnectBanner from '@/components/AgentConnectBanner';

// In the JSX, after <HeroSection ... />:
<AgentConnectBanner />
<TodayInSLP ... />
```

- [ ] **Step 4: Verify visually**

Run `npm run dev`, open `http://localhost:3001`, confirm the Terminal Dark banner appears after the hero. Test all 4 locales by switching language.

- [ ] **Step 5: Commit**

```bash
git add src/components/AgentConnectBanner.tsx src/pages/index.tsx public/locales/
git commit -m "feat: add Terminal Dark AgentConnect banner to homepage"
```

---

### Task 12: /agent-connect Page

**Files:**
- Create: `src/pages/agent-connect.tsx`
- Modify: locale files (add translation keys)

- [ ] **Step 1: Add i18n keys for the page**

Add extensive keys under `"agentConnect"` in all 4 locale files:
- `pageTitle`, `pageSubtitle`
- `whatYourAgentGets` section title
- Category cards: events, places, guides, outdoor, culture, weather, news, exchangeRates
- MCP card: title, description
- CLI card: title, description
- FAQ questions and answers
- SEO title, description

- [ ] **Step 2: Create the page**

Build the page following the spec:
- H1: "Connect Your Agent to San Luis Way"
- Subtitle explaining the value proposition
- "What Your Agent Gets" — responsive grid of 8 data category cards with icons
- Two large cards: MCP → `/mcp`, CLI → `/cli`
- "Copy directions for AI" button (copies llms.txt content to clipboard)
- FAQ section with expandable items
- Standard SEO component from existing pattern
- `getStaticProps` with `serverSideTranslations`

- [ ] **Step 3: Add to nav if applicable**

Check if the nav has an "AI Agents" or similar section. If TechSnif's footer pattern applies, add links to `/agent-connect`, `/mcp`, `/cli` in the site footer.

- [ ] **Step 4: Verify visually in all 4 locales**

- [ ] **Step 5: Commit**

```bash
git add src/pages/agent-connect.tsx public/locales/
git commit -m "feat: add /agent-connect overview page"
```

---

### Task 13: /mcp Page

**Files:**
- Create: `src/pages/mcp.tsx`
- Modify: locale files

- [ ] **Step 1: Add i18n keys**

Keys for: page title, quick start section, client tabs (Claude Desktop, Cursor, Claude Code, Windsurf, Gemini CLI, Codex CLI), tools reference, resources, example prompts, "What is MCP?" section, FAQ.

- [ ] **Step 2: Create the page**

Follow TechSnif's `/mcp` structure adapted for SLP:
- Quick Start with Claude Desktop config JSON (copyable code block)
- Client tabs component — tab UI showing config for each MCP client
- "What You Can Do" capabilities grid
- Tools reference tables with parameter details (all 12 tools)
- Resources table
- Example prompts section (SLP-specific)
- "What is MCP?" explainer
- FAQ
- SEO + `getStaticProps`

- [ ] **Step 3: Verify + commit**

```bash
git add src/pages/mcp.tsx public/locales/
git commit -m "feat: add /mcp setup page with client tabs"
```

---

### Task 14: /cli Page

**Files:**
- Create: `src/pages/cli.tsx`
- Modify: locale files

- [ ] **Step 1: Add i18n keys**

Keys for: page title, quick start, install section, OpenClaw section, command reference, example commands, JSON output, CLI vs MCP comparison, FAQ.

- [ ] **Step 2: Create the page**

Follow TechSnif's `/cli` structure adapted for SLP:
- Quick Start with `npx` one-liner (copyable)
- OpenClaw section explaining skill integration
- Install: global + npx options
- Command reference with all commands and flags
- Example commands section
- JSON output shape
- CLI vs MCP comparison table
- FAQ
- SEO + `getStaticProps`

- [ ] **Step 3: Verify + commit**

```bash
git add src/pages/cli.tsx public/locales/
git commit -m "feat: add /cli reference page"
```

---

### Task 15: Footer + Nav Integration

**Files:**
- Modify: `src/components/common/Footer.tsx` (or equivalent)
- Modify: locale files if needed

- [ ] **Step 1: Add "AI Agents" section to footer**

Like TechSnif's footer has "AI Agents: MCP | CLI | Overview", add:

```tsx
// In Footer component, add a new section:
<div>
  <h4>{t('footer.aiAgents')}</h4>
  <Link href="/agent-connect">{t('footer.agentConnect')}</Link>
  <Link href="/mcp">MCP Server</Link>
  <Link href="/cli">CLI</Link>
</div>
```

- [ ] **Step 2: Add nav links if appropriate**

Check the site's navigation structure. If there's a top nav or mega menu, add "Agent Connect" or "For Agents" link. Follow existing nav patterns.

- [ ] **Step 3: Commit**

```bash
git add src/components/
git commit -m "feat: add AI Agents section to footer + nav"
```

---

### Task 16: OpenClaw Skill

**Files:**
- Create: `packages/openclaw-skill/skill.yaml`
- Create: `packages/openclaw-skill/README.md`

- [ ] **Step 1: Create OpenClaw skill definition**

The skill wraps the CLI for OpenClaw agent workflows. Create a skill.yaml that describes the available commands and how to invoke them via `npx @sanluisway/cli`.

```yaml
# packages/openclaw-skill/skill.yaml
name: sanluisway
description: Query San Luis Potosí data — events, places, guides, weather, news, and more
version: 0.1.0
commands:
  - name: events
    description: List upcoming events in SLP
    usage: npx @sanluisway/cli events --json
  - name: places
    description: List places (restaurants, cafés, museums, bars)
    usage: npx @sanluisway/cli places --json
  - name: search
    description: Search across all SLP content
    usage: npx @sanluisway/cli search "<query>" --json
  - name: weather
    description: Get current weather in SLP
    usage: npx @sanluisway/cli weather --json
  - name: guides
    description: Get practical visitor and resident guides
    usage: npx @sanluisway/cli guides --json
  - name: outdoor
    description: Get outdoor activities
    usage: npx @sanluisway/cli outdoor --json
  - name: culture
    description: Get cultural and historic sites
    usage: npx @sanluisway/cli culture --json
  - name: news
    description: Get local news headlines
    usage: npx @sanluisway/cli news --json
  - name: exchange-rates
    description: Get MXN exchange rates
    usage: npx @sanluisway/cli exchange-rates --json
```

- [ ] **Step 2: Publish to ClawHub**

Follow ClawHub publishing instructions to make the skill discoverable.

- [ ] **Step 3: Commit**

```bash
git add packages/openclaw-skill/
git commit -m "feat: add OpenClaw skill for ClawHub"
```

---

## Phase 4: Publish & Polish

### Task 17: Publish npm Packages

- [ ] **Step 1: Verify both packages build**

```bash
cd packages/mcp-server && npm run build
cd packages/cli && npm run build
```

- [ ] **Step 2: Test MCP server locally**

```bash
# In Claude Code:
claude mcp add sanluisway-dev -- node packages/mcp-server/dist/index.js
# Then ask Claude to use get_events tool
```

- [ ] **Step 3: Test CLI locally**

```bash
node packages/cli/dist/index.js events --json
node packages/cli/dist/index.js weather --json
node packages/cli/dist/index.js search "tacos" --json
```

- [ ] **Step 4: Publish to npm**

```bash
cd packages/mcp-server && npm publish --access public
cd packages/cli && npm publish --access public
```

**Note:** Requires npm account with `@sanluisway` scope. If scope not claimed yet, create it first: `npm org create sanluisway`.

- [ ] **Step 5: Test npx install**

```bash
npx @sanluisway/cli events --limit 3 --json
npx @sanluisway/mcp-server  # Should start and wait for MCP connection
```

- [ ] **Step 6: Commit any publish-related changes (version bumps, etc.)**

---

### Task 18: Final Integration Test

- [ ] **Step 1: Deploy to Netlify (staging or preview)**

Push to a branch and verify the Netlify preview deploy.

- [ ] **Step 2: Test all API endpoints against live deploy**

```bash
curl https://preview-url.netlify.app/api/v1/events | jq
curl https://preview-url.netlify.app/api/v1/places?category=food | jq
curl https://preview-url.netlify.app/api/v1/weather | jq
curl https://preview-url.netlify.app/llms.txt
```

- [ ] **Step 3: Test MCP server against live API**

Update the MCP server to point to the preview URL and verify all 12 tools work.

- [ ] **Step 4: Test all 3 pages + banner visually**

Open `/agent-connect`, `/mcp`, `/cli` in browser. Test all 4 locales. Verify banner on homepage.

- [ ] **Step 5: Run full test suite**

```bash
npm test
```

- [ ] **Step 6: Final commit + merge**

```bash
git add -A
git commit -m "feat: complete Agent Connect system — API, MCP, CLI, pages, banner, llms.txt"
```
