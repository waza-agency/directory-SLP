import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerGuidesCommands(program: Command) {
  program
    .command('guides')
    .description('List travel guides for San Luis Potosí')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--tag <tag>', 'Filter by tag')
    .option('--lang <locale>', 'Language (en, es, de, ja)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getGuides({
        limit: opts.limit ? Number(opts.limit) : undefined,
        tag: opts.tag,
        lang: opts.lang,
      });
      output(result, opts.json);
    });

  program
    .command('guide <slug>')
    .description('Get full detail of a specific guide')
    .option('--lang <locale>', 'Language (en, es, de, ja)')
    .option('--json', 'Output as JSON')
    .action(async (slug: string, opts) => {
      const result = await client.getGuide(slug, opts.lang);
      output(result, opts.json);
    });
}
