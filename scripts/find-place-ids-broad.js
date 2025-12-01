
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const searchTerms = [
  'Rincon', 'Huasteco', // For El Rincón Huasteco
  'Portal', // For La Casa del Portal
  'Corazon', 'Xoconostle', // For Corazón de Xoconostle
  'Wirikuta', 'Real de Catorce', // Wirikuta might be associated with Real
  'Sótano', 'Golondrinas', // For Cave of Swallows
  'Tamtoc', 'Tam', // For Tamtoc
];

async function broadSearch() {
  console.log('Broad searching for missing places...\n');

  for (const term of searchTerms) {
    const { data, error } = await supabase
      .from('places')
      .select('id, name')
      .ilike('name', `%${term}%`)
      .limit(3);

    if (data && data.length > 0) {
      console.log(`Matches for "${term}":`);
      data.forEach(p => console.log(`  - "${p.name}" | ID: ${p.id}`));
    }
  }
}

broadSearch();

