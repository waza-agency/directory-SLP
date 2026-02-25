/**
 * Fix broken Google Maps images by downloading from web sources
 * and uploading to Supabase Storage
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Place ID -> image source mapping
const PLACE_IMAGES = [
  {
    id: '131dab30-b412-4abf-bf0e-f64bbb930b93',
    name: 'Presa de San José',
    source: 'https://www.liderempresarial.com/wp-content/uploads/2021/09/2016-04-09-18.38.25-1.jpg',
  },
  {
    id: '70d9ec39-226b-41ec-9f9b-047918fa585f',
    name: 'Absenta Speakeasy',
    source: 'https://casa-h.com/assets/images/absenta/principal.jpg',
  },
  {
    id: '33e4b341-ab6b-47bf-a7e7-b33884acf852',
    name: 'Parque Tangamanga II',
    unsplash: 'park+nature+lake',
  },
  {
    id: 'e5e6df48-36e8-460b-8e24-628b2f7717e5',
    name: 'Sierra de Álvarez',
    unsplash: 'sierra+mountain+forest+mexico',
  },
  {
    id: '0ffd3ea6-57e9-49c7-9c24-bb57ed8ecf6b',
    name: 'Café Pacífico',
    unsplash: 'coffee+shop+cafe+interior',
  },
  {
    id: '943a9573-0c83-409f-af3a-e2233a7fba9d',
    name: 'Bowling & Games Centro',
    unsplash: 'bowling+alley+neon',
  },
  {
    id: 'd1ece791-1cb6-454c-bf9d-687ac643e764',
    name: 'Costco San Luis Potosí',
    unsplash: 'warehouse+store+retail',
  },
  {
    id: '81b8c1f8-f7c8-40ef-98df-3fb9f1cc8521',
    name: 'Yoga Studio Om',
    unsplash: 'yoga+studio+meditation',
  },
  {
    id: '26513808-4ccf-4ad1-88d9-35ea765c99d0',
    name: 'City Market',
    unsplash: 'grocery+store+supermarket',
  },
  {
    id: 'a93cb2d6-7301-4424-98b6-24e596acf1b5',
    name: 'Mercado Orgánico San Luis',
    unsplash: 'organic+farmers+market+vegetables',
  },
  {
    id: 'd571d5f2-8323-464a-9e4a-69095c50a40b',
    name: 'Cinépolis VIP',
    unsplash: 'cinema+theater+movie',
  },
  {
    id: '0c102359-55ae-4d53-b799-648571a4fb56',
    name: 'La Comer Gourmet',
    unsplash: 'gourmet+food+market',
  },
  {
    id: '99e2a395-4f8f-404d-afd0-e58baf589b18',
    name: 'CrossFit SLP',
    unsplash: 'crossfit+gym+workout',
  },
  {
    id: '753afdb9-3943-49be-87fa-d5700bc1da56',
    name: 'Hospital Lomas',
    unsplash: 'modern+hospital+building',
  },
  {
    id: '0d524167-f2c5-4958-b985-382021b01df6',
    name: 'SmartFit Tangamanga',
    unsplash: 'gym+fitness+equipment',
  },
];

async function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) throw new Error(`Unsplash search failed: ${res.status}`);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular;
  }
  throw new Error('No Unsplash results found');
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`Download failed: ${res.status} from ${url}`);
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, contentType };
}

async function uploadToSupabase(placeId, buffer, contentType) {
  const ext = contentType.includes('png') ? 'png'
    : contentType.includes('webp') ? 'webp' : 'jpg';
  const fileName = `${placeId}.${ext}`;
  const filePath = `places/${fileName}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, buffer, {
      contentType,
      upsert: true,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  return `${SUPABASE_URL}/storage/v1/object/public/images/${filePath}`;
}

async function updateDatabase(placeId, imageUrl) {
  const { error } = await supabase
    .from('places')
    .update({ image_url: imageUrl })
    .eq('id', placeId);

  if (error) throw new Error(`DB update failed: ${error.message}`);
}

async function main() {
  console.log('=== Fixing Broken Place Images ===\n');
  console.log(`Places to fix: ${PLACE_IMAGES.length}\n`);

  let fixed = 0;
  let failed = 0;

  for (const place of PLACE_IMAGES) {
    console.log(`\n--- ${place.name} ---`);
    try {
      let imageUrl;

      // Get image URL
      if (place.source) {
        imageUrl = place.source;
        console.log(`  Source: Direct URL`);
      } else if (place.unsplash) {
        console.log(`  Source: Unsplash search "${place.unsplash}"`);
        imageUrl = await searchUnsplash(place.unsplash);
      }

      // Download image
      console.log(`  Downloading...`);
      const { buffer, contentType } = await downloadImage(imageUrl);
      console.log(`  Downloaded: ${(buffer.length / 1024).toFixed(0)}KB`);

      // Upload to Supabase Storage
      console.log(`  Uploading to Supabase Storage...`);
      const storageUrl = await uploadToSupabase(place.id, buffer, contentType);
      console.log(`  Uploaded: ${storageUrl.substring(storageUrl.lastIndexOf('/') + 1)}`);

      // Update database
      console.log(`  Updating database...`);
      await updateDatabase(place.id, storageUrl);
      console.log(`  OK ${place.name}`);
      fixed++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      failed++;
    }

    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`RESUMEN`);
  console.log('='.repeat(50));
  console.log(`Fixed: ${fixed}`);
  console.log(`Failed: ${failed}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
