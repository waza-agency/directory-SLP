require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const SLUG = 'san-luis-potosi-mining-history-baroque-architecture-cultural-legacy';

async function showStructure() {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('content')
    .eq('slug', SLUG)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Show sections/headings and markers
  const content = post.content;

  console.log('=== CONTENT STRUCTURE ===\n');

  // Find all section markers, h2s, h3s, and special divs
  const patterns = [
    /<!-- [A-Z\s]+ -->/g,
    /<h2[^>]*>([^<]*)<\/h2>/g,
    /<div class="not-prose[^"]*bg-gradient[^"]*"/g,
  ];

  let markers = [];

  // Find HTML comments
  let match;
  const commentPattern = /<!-- ([A-Z\s]+) -->/g;
  while ((match = commentPattern.exec(content)) !== null) {
    markers.push({ pos: match.index, type: 'comment', text: match[1] });
  }

  // Find h2 headings
  const h2Pattern = /<h2[^>]*>([^<]*)<\/h2>/g;
  while ((match = h2Pattern.exec(content)) !== null) {
    markers.push({ pos: match.index, type: 'h2', text: match[1].trim() });
  }

  // Find special divs
  const divPattern = /<div class="not-prose[^"]*"/g;
  while ((match = divPattern.exec(content)) !== null) {
    // Get context around it
    const context = content.substring(match.index, match.index + 200);
    const titleMatch = context.match(/<h3[^>]*>([^<]*)<\/h3>/);
    markers.push({ pos: match.index, type: 'special-div', text: titleMatch ? titleMatch[1] : 'unknown' });
  }

  // Sort by position
  markers.sort((a, b) => a.pos - b.pos);

  markers.forEach(m => {
    console.log(`[${m.pos}] ${m.type}: ${m.text}`);
  });
}

showStructure();
