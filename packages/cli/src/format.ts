import type { ApiResponse } from './client.js';

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
    for (const item of result.data as Record<string, unknown>[]) {
      const title = (item.title || item.name || item.slug || 'Untitled') as string;
      const desc = item.description ? ` — ${String(item.description).slice(0, 80)}` : '';
      console.log(`  ${title}${desc}`);
    }
    if (result.meta) {
      console.log(`\n  ${result.meta.total} results`);
    }
  } else {
    console.log(JSON.stringify(result.data, null, 2));
  }
}
