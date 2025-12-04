import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsSource {
  name: string;
  url: string;
  selector: string; // Main content selector to avoid navigation noise
}

const SOURCES: NewsSource[] = [
  {
    name: 'El Sol de San Luis',
    url: 'https://www.elsoldesanluis.com.mx/local/',
    selector: 'h2, h3, .title'
  },
  {
    name: 'Pulso SLP',
    url: 'https://pulsoslp.com.mx/slp/',
    selector: '.entry-title, h2, h3'
  },
  {
    name: 'QueTal',
    url: 'https://quetal.com.mx/seccion/noticias/san-luis-potosi/',
    selector: 'h2.entry-title'
  },
  {
    name: 'Secretaría de Cultura SLP',
    url: 'https://cultura.slp.gob.mx/agenda-cultural/',
    selector: '.tribe-events-calendar-list__event-title, h3'
  },
  {
    name: 'El Universal SLP',
    url: 'https://www.eluniversal.com.mx/estados/',
    selector: 'h2, h3'
  }
];

export async function scrapeNewsSources(): Promise<string> {
  console.log('🕵️ starting Deep Research on local sources...');

  let context = "HERE IS THE RAW NEWS DATA GATHERED FROM LOCAL SOURCES:\n\n";

  const promises = SOURCES.map(async (source) => {
    try {
      console.log(`Reading ${source.name}...`);

      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        timeout: 10000 // 10s timeout
      });

      const $ = cheerio.load(response.data);
      let sourceContent = `SOURCE: ${source.name} (${source.url})\n`;

      // Extract headlines and brief summaries if available
      let count = 0;
      $(source.selector).each((i, el) => {
        if (count >= 15) return; // Limit to 15 items per source to keep context clean
        const title = $(el).text().trim();
        const link = $(el).find('a').attr('href') || $(el).closest('a').attr('href');

        if (title && title.length > 20) {
          sourceContent += `- HEADLINE: ${title}\n`;
          if (link) sourceContent += `  LINK: ${link.startsWith('http') ? link : new URL(link, source.url).toString()}\n`;
          count++;
        }
      });

      return sourceContent + "\n-----------------------------------\n";
    } catch (error) {
      console.error(`Failed to scrape ${source.name}:`, error instanceof Error ? error.message : 'Unknown error');
      return `SOURCE: ${source.name} (FAILED TO CONNECT)\n\n`;
    }
  });

  const results = await Promise.all(promises);
  return context + results.join('\n');
}

