import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerSearchCommand(program: Command) {
  program
    .command('search <query>')
    .description('Search across all San Luis Potosí data')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--type <type>', 'Filter by content type (event, place, guide)')
    .option('--lang <locale>', 'Language (en, es, de, ja)')
    .option('--json', 'Output as JSON')
    .action(async (query: string, opts) => {
      const result = await client.search({
        q: query,
        limit: opts.limit ? Number(opts.limit) : undefined,
        type: opts.type,
        lang: opts.lang,
      });
      output(result, opts.json);
    });
}
