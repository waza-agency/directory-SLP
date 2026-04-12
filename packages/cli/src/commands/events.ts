import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerEventsCommands(program: Command) {
  program
    .command('events')
    .description('List upcoming events in San Luis Potosí')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--category <cat>', 'Filter by event category')
    .option('--from <date>', 'Start date filter (ISO)')
    .option('--to <date>', 'End date filter (ISO)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getEvents({
        limit: opts.limit ? Number(opts.limit) : undefined,
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
    .action(async (slug: string, opts) => {
      const result = await client.getEvent(slug);
      output(result, opts.json);
    });
}
