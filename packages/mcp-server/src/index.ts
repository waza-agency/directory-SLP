#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { SanLuisWayClient } from './client.js';

const client = new SanLuisWayClient();

const server = new McpServer({
  name: 'sanluisway',
  version: '0.1.0',
});

// --- Tools ---

server.tool(
  'get_events',
  'List upcoming events in San Luis Potosi. Filter by category or date range.',
  {
    limit: z.number().optional().describe('Max results (default 20)'),
    category: z.string().optional().describe('Event category filter'),
    from: z.string().optional().describe('Start date (YYYY-MM-DD)'),
    to: z.string().optional().describe('End date (YYYY-MM-DD)'),
  },
  async (params) => {
    const result = await client.getEvents(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_event',
  'Get details for a single event by its slug.',
  { slug: z.string().describe('Event URL slug') },
  async ({ slug }) => {
    const result = await client.getEvent(slug);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_places',
  'List places in San Luis Potosi. Filter by category, sort by rating or name.',
  {
    limit: z.number().optional().describe('Max results (default 20)'),
    category: z.string().optional().describe('Place category filter'),
    sort: z.string().optional().describe('Sort field (e.g. rating, name)'),
  },
  async (params) => {
    const result = await client.getPlaces(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_place',
  'Get details for a single place by its slug.',
  { slug: z.string().describe('Place URL slug') },
  async ({ slug }) => {
    const result = await client.getPlace(slug);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_guides',
  'List travel guides for San Luis Potosi.',
  {
    limit: z.number().optional().describe('Max results (default 20)'),
    tag: z.string().optional().describe('Guide tag filter'),
    lang: z.string().optional().describe('Language code (en, es, de, ja)'),
  },
  async (params) => {
    const result = await client.getGuides(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_guide',
  'Get a single travel guide by slug.',
  {
    slug: z.string().describe('Guide URL slug'),
    lang: z.string().optional().describe('Language code (en, es, de, ja)'),
  },
  async ({ slug, lang }) => {
    const result = await client.getGuide(slug, lang);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_outdoor',
  'List outdoor activities and adventures in San Luis Potosi.',
  {
    limit: z.number().optional().describe('Max results (default 20)'),
    lang: z.string().optional().describe('Language code (en, es, de, ja)'),
  },
  async (params) => {
    const result = await client.getOutdoor(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_culture',
  'List cultural attractions and experiences in San Luis Potosi.',
  {
    limit: z.number().optional().describe('Max results (default 20)'),
    lang: z.string().optional().describe('Language code (en, es, de, ja)'),
  },
  async (params) => {
    const result = await client.getCulture(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_weather',
  'Get current weather conditions for San Luis Potosi.',
  {},
  async () => {
    const result = await client.getWeather();
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_news',
  'Get recent news about San Luis Potosi.',
  {
    limit: z.number().optional().describe('Max results (default 10)'),
    lang: z.string().optional().describe('Language code (en, es, de, ja)'),
  },
  async (params) => {
    const result = await client.getNews(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'get_exchange_rates',
  'Get current MXN exchange rates (USD, EUR, JPY).',
  {},
  async () => {
    const result = await client.getExchangeRates();
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

server.tool(
  'search',
  'Search across all San Luis Way content (events, places, guides).',
  {
    q: z.string().describe('Search query'),
    limit: z.number().optional().describe('Max results (default 10)'),
    type: z.string().optional().describe('Filter by content type (event, place, guide)'),
    lang: z.string().optional().describe('Language code (en, es, de, ja)'),
  },
  async (params) => {
    const result = await client.search(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }] };
  },
);

// --- Resources ---

server.resource(
  'categories',
  'sanluisway://categories',
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(
          {
            placeCategories: [
              'restaurant',
              'cafe',
              'bar',
              'hotel',
              'museum',
              'park',
              'shopping',
              'nightlife',
              'historic',
              'religious',
            ],
            eventCategories: [
              'music',
              'art',
              'food',
              'festival',
              'sports',
              'theater',
              'family',
              'nightlife',
              'cultural',
              'outdoor',
            ],
          },
          null,
          2,
        ),
      },
    ],
  }),
);

server.resource(
  'about',
  'sanluisway://about',
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'text/plain',
        text: [
          'San Luis Way is the comprehensive English-language guide to San Luis Potosi, Mexico.',
          'It covers events, places, outdoor adventures, cultural experiences, restaurants,',
          'and practical travel guides for visitors and expats.',
          '',
          'The site is available in English, Spanish, German, and Japanese.',
          'API base: https://www.sanluisway.com/api/v1',
          '',
          'Content types: events, places, guides, outdoor, culture, weather, news, exchange rates.',
        ].join('\n'),
      },
    ],
  }),
);

// --- Start ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('MCP server failed to start:', err);
  process.exit(1);
});
