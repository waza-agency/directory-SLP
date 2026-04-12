import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerOutdoorCommand(program: Command) {
  program
    .command('outdoor')
    .description('List outdoor activities in San Luis Potosí')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--lang <locale>', 'Language (en, es, de, ja)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getOutdoor({
        limit: opts.limit ? Number(opts.limit) : undefined,
        lang: opts.lang,
      });
      output(result, opts.json);
    });
}
