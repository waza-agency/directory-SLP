const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const placeImages = [
  {
    id: '76e8b248-738e-4cb9-9676-ad065325d4ce',
    name: '500 Noches',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipMd-K8IOdlaa4cAle-hofTAnpqPIExcIFRsF5ew=w800-h600'
  },
  {
    id: '941d66a6-d650-4e4c-8569-efe4e76d161b',
    name: '7 Barrios Cervecería',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipMKHwOcYEpXBBNiAysDh0nmdDUm_Rm4o5JV6Q4f=w800-h600'
  },
  {
    id: '70d9ec39-226b-41ec-9f9b-047918fa585f',
    name: 'Absenta Speakeasy',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipP9DwqsnrrsZzIyDwLLm9LtrTqxaaf66pC_H4td=w800-h600'
  },
  {
    id: '289aeb43-43bd-4dd1-88a8-c23e8e6521e7',
    name: 'Arandela Barra de Café',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipM2iwSF118zwN-bYkfJNK9PTHr2OAxtLhZ_j_TY=w800-h600'
  },
  {
    id: '1fefe979-9d01-4705-9415-37486b990d17',
    name: 'Capital Coffee',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipOX4N257YTKwoiLOpH7I1U5vbbxlKbHrTsihuB_=w800-h600'
  },
  {
    id: '2a06bd02-f790-45f8-9857-db82acf0afd1',
    name: 'Casa Altero',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipPWmsrn7l4y7lYlf27rMLpRGXdYxygszilNtW01=w800-h600'
  },
  {
    id: '88e802dc-a987-4ba3-ad95-45ca743e8eaa',
    name: 'Dulce Amor Café',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipPejPaGM30BhplA55i2ApghI-a632Lb78hd_dmJ=w800-h600'
  },
  {
    id: '7b4fb5bb-ddc2-40c3-9295-07b85147628a',
    name: 'La Piquería Mezcalería',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipPZzug2afaE1KMX-IgZ0rBGogjO3A8Hygb-Hxf2=w800-h600'
  },
  {
    id: 'e7b839ad-0be6-4676-bdf2-e068422c291b',
    name: 'Natal Cocina de Origen',
    image_url: 'https://lh3.googleusercontent.com/p/AF1QipNez8uBI1BLe3BoiR4huL8bYxy2ImDOrVVBSwvI=w800-h600'
  }
];

async function updatePlaceImages() {
  console.log('Updating place images...\n');

  for (const place of placeImages) {
    console.log(`Updating ${place.name}...`);

    const { error } = await supabase
      .from('places')
      .update({ image_url: place.image_url })
      .eq('id', place.id);

    if (error) {
      console.error(`Error updating ${place.name}:`, error);
    } else {
      console.log(`✓ Updated ${place.name} with image`);
    }
  }

  console.log('\nDone!');
}

updatePlaceImages().catch(console.error);
