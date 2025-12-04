const Parser = require('rss-parser');
const parser = new Parser();

const sources = [
  { name: 'El Sol de San Luis', url: 'https://www.elsoldesanluis.com.mx/rss.xml' },
  { name: 'Pulso SLP', url: 'https://pulsoslp.com.mx/rss' },
  { name: 'QueTal', url: 'https://quetal.com.mx/feed/' },
  { name: 'El Universal SLP', url: 'https://www.eluniversal.com.mx/rss/estados.xml' } // General states, we filter for SLP
];

async function checkFeeds() {
  console.log('Checking feeds...');

  for (const source of sources) {
    try {
      console.log(`\nTesting ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      console.log(`✅ Success! Found ${feed.items.length} items.`);
      console.log(`   First item: ${feed.items[0].title}`);
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }
}

checkFeeds();

