import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerCultureCommand(program: Command) {
  program
    .command('culture')
    .description('List cultural attractions in San Luis Potosí')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--lang <locale>', 'Language (en, es, de, ja)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getCulture({
        limit: opts.limit ? Number(opts.limit) : undefined,
        lang: opts.lang,
      });
      output(result, opts.json);
    });
}
