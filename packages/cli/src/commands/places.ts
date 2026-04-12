import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerPlacesCommands(program: Command) {
  program
    .command('places')
    .description('List places in San Luis Potosí')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--category <cat>', 'Filter by category')
    .option('--sort <field>', 'Sort by field (e.g. rating)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getPlaces({
        limit: opts.limit ? Number(opts.limit) : undefined,
        category: opts.category,
        sort: opts.sort,
      });
      output(result, opts.json);
    });

  program
    .command('place <slug>')
    .description('Get full detail of a specific place')
    .option('--json', 'Output as JSON')
    .action(async (slug: string, opts) => {
      const result = await client.getPlace(slug);
      output(result, opts.json);
    });
}
