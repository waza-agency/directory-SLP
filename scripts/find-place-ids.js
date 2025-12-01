
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const placesToFind = [
  'Teatro de la Paz',
  'Museo Federico Silva',
  'La Oruga y la Cebada',
  'La Parroquia Potosina',
  'El Rincón Huasteco',
  'La Casa del Portal',
  'Corazón de Xoconostle',
  'La Gran Vía',
  'Wirikuta', // might be partial match
  'Cave of Swallows', // might be Sótano de las Golondrinas
  'Tamtoc', // might be partial match
];

async function findPlaceIds() {
  console.log('Searching for place IDs...\n');

  for (const name of placesToFind) {
    const { data, error } = await supabase
      .from('places')
      .select('id, name')
      .ilike('name', `%${name}%`)
      .limit(1);

    if (error) {
      console.error(`Error searching for ${name}:`, error.message);
      continue;
    }

    if (data && data.length > 0) {
      console.log(`FOUND: "${name}" -> Name: "${data[0].name}" | ID: ${data[0].id}`);
    } else {
      console.log(`NOT FOUND: "${name}"`);
    }
  }
}

findPlaceIds();

