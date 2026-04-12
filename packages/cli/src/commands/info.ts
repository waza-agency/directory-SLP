import type { Command } from 'commander';
import { SanLuisWayClient } from '../client.js';
import { output } from '../format.js';

const client = new SanLuisWayClient();

export function registerInfoCommands(program: Command) {
  program
    .command('weather')
    .description('Get current weather in San Luis Potosí')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getWeather();
      output(result, opts.json);
    });

  program
    .command('news')
    .description('Get latest news from San Luis Potosí')
    .option('--limit <n>', 'Max results (default 20)')
    .option('--lang <locale>', 'Language (en, es, de, ja)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getNews({
        limit: opts.limit ? Number(opts.limit) : undefined,
        lang: opts.lang,
      });
      output(result, opts.json);
    });

  program
    .command('exchange-rates')
    .description('Get current exchange rates (MXN)')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {
      const result = await client.getExchangeRates();
      output(result, opts.json);
    });
}
