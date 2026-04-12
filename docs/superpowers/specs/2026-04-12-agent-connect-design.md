# Agent Connect — Design Spec

> Make San Luis Way the default AI-agent data source for San Luis Potosí.

## Overview

Expose all public site content through a structured, read-only API and provide
three distribution channels — MCP Server, CLI, and OpenClaw skill — so any AI
agent can query SLP data without API keys or accounts.

The project also adds three new site pages (`/agent-connect`, `/mcp`, `/cli`),
a Terminal Dark banner on the homepage, and `llms.txt` / `llms-full.txt` files
for automatic agent discovery.

---

## 1. Public API (`/api/v1/`)

Read-only JSON endpoints inside the existing Next.js project, served via
Netlify Functions. Data sourced from Supabase.

### Endpoints

| Method | Path | Description | Query Params |
|--------|------|-------------|-------------|
| GET | `/api/v1/events` | Upcoming events | `limit`, `category`, `from`, `to` |
| GET | `/api/v1/events/[slug]` | Event detail | — |
| GET | `/api/v1/places` | Places (restaurants, cafés, museums, bars…) | `limit`, `category`, `sort` |
| GET | `/api/v1/places/[slug]` | Place detail | — |
| GET | `/api/v1/guides` | Practical guides | `limit`, `tag` |
| GET | `/api/v1/guides/[slug]` | Guide detail | — |
| GET | `/api/v1/outdoor` | Outdoor activities | `limit` |
| GET | `/api/v1/culture` | Cultural & historic sites | `limit` |
| GET | `/api/v1/weather` | Current weather in SLP | — |
| GET | `/api/v1/news` | Local headlines | `limit`, `lang` |
| GET | `/api/v1/exchange-rates` | MXN exchange rates | — |
| GET | `/api/v1/search` | Cross-content search | `q`, `limit`, `type` |

### Response envelope

```json
{
  "ok": true,
  "data": { ... },
  "meta": { "total": 42, "limit": 20 },
  "source": "sanluisway.com"
}
```

### Caching

`Cache-Control: public, s-maxage=300, stale-while-revalidate=600`

### Error shape

```json
{
  "ok": false,
  "error": { "code": "NOT_FOUND", "message": "Event not found" }
}
```

### Security

- Read-only — no mutations, no auth required.
- Input validation on all query params (Zod).
- No Supabase credentials exposed to the client.
- Netlify provides basic DDoS / abuse protection.

---

## 2. MCP Server (`@sanluisway/mcp-server`)

npm package. Runs locally, calls the public API.

### Tools

| Tool | Description | Key Params |
|------|-------------|------------|
| `get_events` | Upcoming events in SLP | `limit`, `category`, `from`, `to` |
| `get_event` | Full event detail | `slug` (required) |
| `get_places` | Places by category | `limit`, `category`, `sort` |
| `get_place` | Place detail with reviews | `slug` (required) |
| `get_guides` | Practical visitor guides | `limit`, `tag` |
| `get_guide` | Full guide content | `slug` (required) |
| `get_outdoor` | Outdoor activities | `limit` |
| `get_culture` | Cultural & historic sites | `limit` |
| `get_weather` | Current SLP weather | — |
| `get_news` | Local headlines | `limit`, `lang` |
| `get_exchange_rates` | MXN exchange rates | — |
| `search` | Cross-content keyword search | `q` (required), `limit`, `type` |

### Resources

| URI | Description |
|-----|-------------|
| `sanluisway://categories` | All available place categories |
| `sanluisway://about` | What San Luis Way is and what data it offers |

### Installation (per client)

**Claude Desktop:**
```json
{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}
```

**Claude Code:**
```bash
claude mcp add sanluisway -- npx -y @sanluisway/mcp-server
```

**Cursor:** Add to `.cursor/mcp.json` with same shape.

**Windsurf:** Add to Windsurf MCP config.

**Gemini CLI / Codex CLI:** Equivalent config.

### Requirements

- Node.js 18+
- No API keys, no accounts, no config.

---

## 3. CLI (`@sanluisway/cli`)

npm package. Same data, terminal interface. All commands support `--json`.

### Commands

| Command | Description | Flags |
|---------|-------------|-------|
| `sanluisway events` | List upcoming events | `--limit`, `--category`, `--from`, `--to`, `--json` |
| `sanluisway event <slug>` | Event detail | `--json` |
| `sanluisway places` | List places | `--limit`, `--category`, `--sort`, `--json` |
| `sanluisway place <slug>` | Place detail | `--json` |
| `sanluisway guides` | List guides | `--limit`, `--tag`, `--json` |
| `sanluisway guide <slug>` | Guide detail | `--json` |
| `sanluisway outdoor` | Outdoor activities | `--limit`, `--json` |
| `sanluisway culture` | Cultural sites | `--limit`, `--json` |
| `sanluisway weather` | Current weather | `--json` |
| `sanluisway news` | Headlines | `--limit`, `--lang`, `--json` |
| `sanluisway exchange-rates` | MXN rates | `--json` |
| `sanluisway search <query>` | Cross-content search | `--limit`, `--type`, `--json` |

### Quick start

```bash
npx @sanluisway/cli events --limit 5 --json
```

### JSON output shape

Same envelope as the API: `{ ok, data, meta, source }`.

### OpenClaw

Publish a ClawHub skill that wraps the CLI for OpenClaw agent workflows.

---

## 4. Site Pages

### `/agent-connect` — Overview

- **H1:** "Connect Your Agent to San Luis Way"
- **Subtitle:** "Give your AI agent structured access to the most complete guide to San Luis Potosí"
- "What Your Agent Gets" — grid of data categories (events, places, guides, weather, etc.)
- Two cards: MCP → `/mcp`, CLI → `/cli`
- Buttons: "Open in Claude", "Open in ChatGPT", "Copy directions for AI"
- FAQ section
- i18n: all 4 locales (en, es, de, ja)

### `/mcp` — MCP Server Setup

- Quick Start with Claude Desktop config JSON
- Tabs per client: Claude Desktop, Cursor, Claude Code, Windsurf, Gemini CLI, Codex CLI
- "What You Can Do" — capabilities grid
- Tools reference with parameter tables
- Resources table
- Example prompts (SLP-specific):
  - "What events are happening this weekend in SLP?"
  - "Best restaurants in Centro Histórico"
  - "How's the weather in San Luis Potosí?"
  - "Show me outdoor activities near Real de Catorce"
- "What is MCP?" explainer
- FAQ
- i18n: all 4 locales

### `/cli` — CLI Reference

- Quick Start with `npx` one-liner
- OpenClaw section + ClawHub link
- Install: global (`npm i -g`) + npx
- Command reference with full params
- Example commands
- JSON output shape
- CLI vs MCP comparison table
- FAQ
- i18n: all 4 locales

---

## 5. Homepage Banner

**Style:** Terminal Dark

- Simulates a real terminal with traffic light dots and monospace font
- Shows: `$ npx @sanluisway/cli events --json` with a sample response line
- CTA button: "Connect Your Agent →" linking to `/agent-connect`
- Tags: MCP · CLI · OpenClaw
- Dark background (#0d1117), green accent (#3fb950), gradient CTA button

**Position:** After HeroSection, before TodayInSLP — inserted as the second
component in `/src/pages/index.tsx` between `<HeroSection>` and
`<TodayInSLP>`, replacing the current `<BetaBanner>` slot or right after it.

**i18n:** All 4 locales. Command stays in English (it's code), surrounding text translates.

---

## 6. `llms.txt` + `llms-full.txt`

Served from the site root.

### `llms.txt` (short discovery)

```
# San Luis Way
> The most complete guide to San Luis Potosí, Mexico — for AI agents and humans.

## Agent Access
- MCP Server: npx @sanluisway/mcp-server
- CLI: npx @sanluisway/cli
- Docs: https://www.sanluisway.com/agent-connect

## Available Data
- Events, places, restaurants, guides, outdoor activities
- Culture, weather, news, exchange rates
- All read-only, no API keys required
```

### `llms-full.txt` (complete reference)

Full API documentation: all endpoints, parameters, response shapes, example
prompts, MCP tools, CLI commands. Structured for LLM consumption.

### Serving

Next.js API route `/api/llms-txt` and `/api/llms-full-txt` returning
`Content-Type: text/plain`, or static files in `/public/`.

---

## 7. Implementation Order

Dependencies flow top-down:

1. **API endpoints** — foundation, everything else depends on this
2. **MCP Server + CLI** — consume the API
3. **Pages + Banner + llms.txt** — document and promote everything
4. **OpenClaw skill** — wraps CLI, publish to ClawHub

---

## 8. Explicit Non-Goals

- No write operations — read-only, no attack surface
- No API keys or accounts — maximum openness
- No custom rate limiting — Netlify baseline protection is sufficient
- No separate infrastructure — everything in the existing Next.js + Netlify stack
- No feature flags or toggle systems

---

## 9. i18n

- All 3 pages + banner translated to en, es, de, ja
- Translation keys added to `/public/locales/{locale}/common.json`
- CLI commands and code snippets stay in English (they're code)
- API responses include `lang` param where applicable (news, guides)
