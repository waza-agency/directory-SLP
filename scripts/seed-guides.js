/**
 * Seed script to populate practical_guides and food_experiences tables
 * with content from existing static pages
 *
 * Run with: node scripts/seed-guides.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// =============================================
// LIVING GUIDE DATA
// =============================================
const livingGuideData = {
  guide: {
    slug: 'living-guide',
    title: 'Living in San Luis Potosí',
    title_en: 'Living in San Luis Potosí',
    description: 'Your guide to culture, lifestyle, and daily life in SLP',
    description_en: 'Your guide to culture, lifestyle, and daily life in SLP',
    guide_type: 'living',
    hero_image_url: '/images/cultura-1.jpg',
    meta_title: 'Living Guide - SLP Descubre',
    meta_description: 'Comprehensive guide to living in San Luis Potosí. Learn about culture, food, shopping, entertainment, and daily life in SLP.',
    meta_keywords: 'San Luis Potosí living guide, SLP culture, food, shopping, entertainment, lifestyle',
    status: 'published',
    featured: true
  },
  sections: [
    {
      section_key: 'culture',
      title: 'Culture & Lifestyle',
      title_en: 'Culture & Lifestyle',
      section_order: 1,
      items: [
        {
          item_type: 'festival',
          title: 'Feria Nacional Potosina',
          description: 'Annual fair featuring cultural events, food, and entertainment',
          metadata: { date: 'August' }
        },
        {
          item_type: 'festival',
          title: 'Festival Internacional de Danza Contemporánea',
          description: 'International contemporary dance festival',
          metadata: { date: 'October' }
        },
        {
          item_type: 'festival',
          title: 'Festival de la Luz',
          description: 'Christmas light festival and celebrations',
          metadata: { date: 'December' }
        },
        {
          item_type: 'list',
          title: 'Local Traditions',
          metadata: {
            items: [
              'Traditional Mexican celebrations (Día de los Muertos, Independence Day)',
              'Local religious festivals and processions',
              'Family-oriented social gatherings',
              'Sunday family outings to parks and plazas'
            ]
          }
        }
      ]
    },
    {
      section_key: 'food',
      title: 'Food & Dining',
      title_en: 'Food & Dining',
      section_order: 2,
      items: [
        {
          item_type: 'restaurant',
          title: 'Enchiladas Potosinas',
          description: 'Red corn tortillas filled with cheese and topped with lettuce, cream, and cheese',
          metadata: { type: 'local_dish' }
        },
        {
          item_type: 'restaurant',
          title: 'Gorditas de Nata',
          description: 'Sweet corn cakes made with cream, served as a dessert',
          metadata: { type: 'local_dish' }
        },
        {
          item_type: 'restaurant',
          title: 'Zacahuil',
          description: 'Large tamale made with pork and spices, wrapped in banana leaves',
          metadata: { type: 'local_dish' }
        },
        {
          item_type: 'restaurant',
          title: 'La Parroquia',
          description: 'Traditional Mexican cuisine',
          metadata: { cuisine: 'Traditional Mexican', location: 'Centro Histórico', priceRange: '$$' }
        },
        {
          item_type: 'restaurant',
          title: 'La Antigua',
          description: 'International cuisine',
          metadata: { cuisine: 'International', location: 'Zona Universitaria', priceRange: '$$$' }
        },
        {
          item_type: 'restaurant',
          title: 'El Patio',
          description: 'Mexican Fusion cuisine',
          metadata: { cuisine: 'Mexican Fusion', location: 'San Sebastián', priceRange: '$$' }
        }
      ]
    },
    {
      section_key: 'shopping',
      title: 'Shopping',
      title_en: 'Shopping',
      section_order: 3,
      items: [
        {
          item_type: 'location',
          title: 'Plaza San Luis',
          description: 'Department stores, restaurants, cinema',
          metadata: { location: 'Av. Salvador Nava Martínez', type: 'mall' }
        },
        {
          item_type: 'location',
          title: 'Plaza Sendero',
          description: 'Department stores, restaurants, entertainment',
          metadata: { location: 'Av. Salvador Nava Martínez', type: 'mall' }
        },
        {
          item_type: 'location',
          title: 'Mercado Hidalgo',
          description: 'Traditional market with local products and crafts',
          metadata: { location: 'Centro Histórico', type: 'market' }
        },
        {
          item_type: 'location',
          title: 'Mercado Arista',
          description: 'Fresh produce and local goods',
          metadata: { location: 'Centro Histórico', type: 'market' }
        }
      ]
    },
    {
      section_key: 'entertainment',
      title: 'Entertainment',
      title_en: 'Entertainment',
      section_order: 4,
      items: [
        {
          item_type: 'area',
          title: 'Centro Histórico',
          description: 'Bars, restaurants, and live music venues',
          metadata: { type: 'nightlife' }
        },
        {
          item_type: 'area',
          title: 'Zona Universitaria',
          description: 'Student-friendly bars and cafes',
          metadata: { type: 'nightlife' }
        },
        {
          item_type: 'area',
          title: 'San Sebastián',
          description: 'Upscale bars and restaurants',
          metadata: { type: 'nightlife' }
        },
        {
          item_type: 'location',
          title: 'Teatro de la Paz',
          description: 'Historic theater hosting performances and concerts',
          metadata: { type: 'Theater' }
        },
        {
          item_type: 'location',
          title: 'Centro de las Artes',
          description: 'Contemporary art exhibitions and workshops',
          metadata: { type: 'Arts Center' }
        },
        {
          item_type: 'location',
          title: 'Cineteca Alameda',
          description: 'Art house cinema and cultural events',
          metadata: { type: 'Cinema' }
        }
      ]
    },
    {
      section_key: 'sports',
      title: 'Sports & Recreation',
      title_en: 'Sports & Recreation',
      section_order: 5,
      items: [
        {
          item_type: 'location',
          title: 'Parque Tangamanga I',
          description: 'Running trails, Bike paths, Sports fields, Lake activities',
          metadata: { activities: ['Running trails', 'Bike paths', 'Sports fields', 'Lake activities'] }
        },
        {
          item_type: 'location',
          title: 'Parque Tangamanga II',
          description: 'Sports complex, Swimming pools, Tennis courts, Soccer fields',
          metadata: { activities: ['Sports complex', 'Swimming pools', 'Tennis courts', 'Soccer fields'] }
        },
        {
          item_type: 'location',
          title: 'Centro Deportivo Universitario',
          description: 'Gym, Swimming pool, Sports courts, Fitness classes',
          metadata: { activities: ['Gym', 'Swimming pool', 'Sports courts', 'Fitness classes'] }
        },
        {
          item_type: 'location',
          title: 'Club Campestre',
          description: 'Golf, Tennis, Swimming, Social events',
          metadata: { type: 'Country Club', activities: ['Golf', 'Tennis', 'Swimming', 'Social events'] }
        },
        {
          item_type: 'location',
          title: 'Club Deportivo Potosino',
          description: 'Soccer, Basketball, Volleyball, Fitness',
          metadata: { type: 'Sports Club', activities: ['Soccer', 'Basketball', 'Volleyball', 'Fitness'] }
        }
      ]
    },
    {
      section_key: 'weather',
      title: 'Weather & Climate',
      title_en: 'Weather & Climate',
      section_order: 6,
      items: [
        {
          item_type: 'text',
          title: 'Climate Overview',
          description: 'Semi-arid climate with warm summers and mild winters',
          metadata: {
            summer: 'March to May: Hot and dry (25-35°C)',
            rainy: 'June to October: Rainy season with moderate temperatures',
            winter: 'November to February: Cool and dry (10-25°C)'
          }
        },
        {
          item_type: 'list',
          title: 'Weather Tips',
          metadata: {
            items: [
              'Stay hydrated during hot months',
              'Carry an umbrella during rainy season',
              'Layer clothing for temperature changes',
              'Use sunscreen year-round'
            ]
          }
        }
      ]
    },
    {
      section_key: 'safety',
      title: 'Safety Tips',
      title_en: 'Safety Tips',
      section_order: 7,
      items: [
        {
          item_type: 'list',
          title: 'General Safety Tips',
          metadata: {
            items: [
              'Be aware of your surroundings',
              'Keep valuables secure',
              'Use well-lit and busy streets',
              'Keep emergency numbers handy'
            ]
          }
        },
        {
          item_type: 'area',
          title: 'Centro Histórico',
          description: 'Generally safe, busy during day. Stay in well-lit areas at night.',
          metadata: { safety: 'Generally safe, busy during day', tips: 'Stay in well-lit areas at night' }
        },
        {
          item_type: 'area',
          title: 'Residential Areas',
          description: 'Very safe with standard precautions.',
          metadata: { safety: 'Very safe', tips: 'Standard precautions' }
        },
        {
          item_type: 'area',
          title: 'Shopping Areas',
          description: 'Safe during business hours. Watch belongings in crowded areas.',
          metadata: { safety: 'Safe during business hours', tips: 'Watch belongings in crowded areas' }
        }
      ]
    },
    {
      section_key: 'language',
      title: 'Language & Communication',
      title_en: 'Language & Communication',
      section_order: 8,
      items: [
        {
          item_type: 'phrase',
          title: 'Buenos días',
          description: 'Good morning',
          metadata: { spanish: 'Buenos días', english: 'Good morning' }
        },
        {
          item_type: 'phrase',
          title: '¿Cómo estás?',
          description: 'How are you?',
          metadata: { spanish: '¿Cómo estás?', english: 'How are you?' }
        },
        {
          item_type: 'phrase',
          title: 'Gracias',
          description: 'Thank you',
          metadata: { spanish: 'Gracias', english: 'Thank you' }
        },
        {
          item_type: 'phrase',
          title: 'Por favor',
          description: 'Please',
          metadata: { spanish: 'Por favor', english: 'Please' }
        },
        {
          item_type: 'phrase',
          title: '¿Dónde está...?',
          description: 'Where is...?',
          metadata: { spanish: '¿Dónde está...?', english: 'Where is...?' }
        },
        {
          item_type: 'resource',
          title: 'Instituto Potosino de Lenguas',
          description: 'Language school offering Spanish classes',
          metadata: { contact: '444 812 3456' }
        },
        {
          item_type: 'resource',
          title: 'Conversation Groups',
          description: 'Weekly meetups for language practice',
          metadata: { contact: 'Check local Facebook groups' }
        }
      ]
    }
  ]
};

// =============================================
// EXPAT GUIDE DATA
// =============================================
const expatGuideData = {
  guide: {
    slug: 'expat-guide',
    title: 'Expat Guide to San Luis Potosí',
    title_en: 'Expat Guide to San Luis Potosí',
    description: 'Your comprehensive resource for living and thriving in SLP',
    description_en: 'Your comprehensive resource for living and thriving in SLP',
    guide_type: 'expat',
    hero_image_url: '/images/cultura-2.jpg',
    meta_title: 'Complete Expat Guide to San Luis Potosí | Essential Info 2025',
    meta_description: 'Everything you need to know about living in San Luis Potosí as an expat. Emergency contacts, healthcare, housing, banking, immigration, and transportation info all in one place.',
    meta_keywords: 'San Luis Potosí expat guide, living in SLP, healthcare San Luis Potosí, housing SLP, expat transportation Mexico, banking for expats, immigration Mexico, emergency contacts SLP',
    status: 'published',
    featured: true
  },
  sections: [
    {
      section_key: 'emergency',
      title: 'Emergency Contacts',
      title_en: 'Emergency Contacts',
      section_order: 1,
      items: [
        { item_type: 'contact', title: 'Emergency Services (General)', metadata: { number: '911' } },
        { item_type: 'contact', title: 'Police', metadata: { number: '444 826 8300' } },
        { item_type: 'contact', title: 'Fire Department', metadata: { number: '444 812 4344' } },
        { item_type: 'contact', title: 'Red Cross', metadata: { number: '444 815 0808' } },
        { item_type: 'contact', title: 'Tourist Police', metadata: { number: '444 834 1115' } },
        { item_type: 'contact', title: 'U.S. Embassy in Mexico City', metadata: { number: '55 5080 2000' } },
        { item_type: 'contact', title: 'Canadian Embassy in Mexico City', metadata: { number: '55 5724 7900' } }
      ]
    },
    {
      section_key: 'healthcare',
      title: 'Healthcare',
      title_en: 'Healthcare',
      section_order: 2,
      items: [
        {
          item_type: 'hospital',
          title: 'Hospital Central "Dr. Ignacio Morones Prieto"',
          metadata: { address: 'Av. Venustiano Carranza 2395', phone: '444 834 2700', type: 'Public' }
        },
        {
          item_type: 'hospital',
          title: 'Hospital Lomas de San Luis',
          metadata: { address: 'Av. Sierra Leona 550', phone: '444 824 2424', type: 'Private' }
        },
        {
          item_type: 'hospital',
          title: 'Hospital Angeles',
          metadata: { address: 'Av. Benito Juárez 1210', phone: '444 813 1717', type: 'Private' }
        }
      ]
    },
    {
      section_key: 'housing',
      title: 'Housing',
      title_en: 'Housing',
      section_order: 3,
      items: []
    },
    {
      section_key: 'transportation',
      title: 'Transportation',
      title_en: 'Transportation',
      section_order: 4,
      items: [
        { item_type: 'transport', title: 'Taxi Seguro', metadata: { phone: '444 817 2111', type: 'taxi' } },
        { item_type: 'transport', title: 'Radio Taxi', metadata: { phone: '444 812 0000', type: 'taxi' } },
        { item_type: 'transport', title: 'Uber', metadata: { available: true, type: 'app' } },
        { item_type: 'transport', title: 'DiDi', metadata: { available: true, type: 'app' } },
        { item_type: 'transport', title: 'Beat', metadata: { available: true, type: 'app' } },
        { item_type: 'transport', title: 'Primera Plus', metadata: { website: 'https://www.primeraplus.com.mx', type: 'bus' } },
        { item_type: 'transport', title: 'ETN', metadata: { website: 'https://etn.com.mx', type: 'bus' } }
      ]
    },
    {
      section_key: 'banking',
      title: 'Banking & Finance',
      title_en: 'Banking & Finance',
      section_order: 5,
      items: [
        {
          item_type: 'bank',
          title: 'BBVA',
          metadata: {
            requirements: ['Valid passport', 'Immigration document (FM2/FM3)', 'Proof of address', 'Minimum deposit'],
            website: 'https://www.bbva.mx'
          }
        },
        {
          item_type: 'bank',
          title: 'Santander',
          metadata: {
            requirements: ['Valid passport', 'Immigration document', 'Proof of address', 'Tax ID (RFC)'],
            website: 'https://www.santander.com.mx'
          }
        }
      ]
    },
    {
      section_key: 'immigration',
      title: 'Immigration',
      title_en: 'Immigration',
      section_order: 6,
      items: [
        {
          item_type: 'resource',
          title: 'Instituto Nacional de Migración (INM)',
          description: 'Immigration office for visa applications and residency permits',
          metadata: {
            address: 'Av. Mariano Otero 455, Tequisquiapan',
            phone: '444 813 6748',
            website: 'https://www.gob.mx/inm',
            requirements: [
              'Valid passport',
              'Visa application form',
              'Proof of economic solvency',
              'Proof of residence',
              'Employment contract (if applicable)'
            ]
          }
        }
      ]
    },
    {
      section_key: 'education',
      title: 'Education',
      title_en: 'Education',
      section_order: 7,
      items: []
    },
    {
      section_key: 'utilities',
      title: 'Utilities',
      title_en: 'Utilities',
      section_order: 8,
      items: [
        {
          item_type: 'utility',
          title: 'CFE (Comisión Federal de Electricidad)',
          description: 'Electricity provider',
          metadata: { website: 'https://www.cfe.mx', phone: '071', type: 'electricity' }
        },
        {
          item_type: 'utility',
          title: 'INTERAPAS',
          description: 'Water provider',
          metadata: { website: 'https://www.interapas.mx', phone: '444 811 6230', type: 'water' }
        },
        {
          item_type: 'utility',
          title: 'Telmex',
          description: 'Internet and phone provider',
          metadata: { website: 'https://telmex.com', phone: '800 123 2222', type: 'internet' }
        },
        {
          item_type: 'utility',
          title: 'Totalplay',
          description: 'Internet and TV provider',
          metadata: { website: 'https://totalplay.com.mx', phone: '800 510 0510', type: 'internet' }
        }
      ]
    }
  ]
};

// =============================================
// FOOD EXPERIENCES DATA
// =============================================
const foodExperiencesData = [
  {
    experience: {
      slug: 'traditional-potosino',
      title: 'Traditional Potosino Cuisine',
      title_en: 'Traditional Potosino Cuisine',
      description: 'Authentic flavors that have defined San Luis Potosí for generations, from enchiladas potosinas to asado de boda.',
      description_en: 'Authentic flavors that have defined San Luis Potosí for generations, from enchiladas potosinas to asado de boda.',
      category: 'traditional',
      hero_image_url: '/images/food/traditional-potosino-main.jpg',
      pairings: 'La Legendaria Dorada or Rubia',
      best_for: 'Cultural immersion and authentic local flavors',
      cultural_notes: 'Traditional Potosino cuisine reflects the region\'s rich history, blending indigenous ingredients with Spanish influences. Many recipes have been preserved across generations.',
      sponsor_name: 'La Legendaria Microcervecería',
      sponsor_logo_url: '/images/brands/la-legendaria-logo.png',
      sponsor_website: 'https://lalegendaria.com',
      status: 'published',
      featured: true,
      display_order: 1
    },
    locations: [
      { name: 'Restaurante La Oruga y La Cebada', location_type: 'restaurant', price_range: '$$' },
      { name: 'La Parroquia Potosina', location_type: 'restaurant', price_range: '$$' },
      { name: 'El Rincón Huasteco', location_type: 'restaurant', price_range: '$$' }
    ],
    sections: [
      {
        section_type: 'video',
        title: 'Discover Traditional Potosino Cuisine',
        media_url: 'https://www.youtube-nocookie.com/embed/cyhvB9HbmKg',
        media_type: 'youtube',
        section_order: 1
      }
    ]
  },
  {
    experience: {
      slug: 'modern-fusion',
      title: 'Modern & Fusion Gastronomy',
      title_en: 'Modern & Fusion Gastronomy',
      description: 'Innovative restaurants combining traditional ingredients with contemporary techniques and global influences.',
      description_en: 'Innovative restaurants combining traditional ingredients with contemporary techniques and global influences.',
      category: 'modern-fusion',
      hero_image_url: '/images/food/modern-fusion-main.jpg',
      pairings: 'La Legendaria IPA or La Noche',
      best_for: 'Adventurous foodies and special occasions',
      cultural_notes: 'San Luis Potosí\'s modern dining scene has exploded in recent years, with talented chefs returning from international training to reimagine local cuisine.',
      sponsor_name: 'La Legendaria Microcervecería',
      sponsor_logo_url: '/images/brands/la-legendaria-logo.png',
      sponsor_website: 'https://lalegendaria.com',
      status: 'published',
      featured: true,
      display_order: 2
    },
    locations: [
      { name: 'Hidalgo 26', location_type: 'restaurant', price_range: '$$$' },
      { name: 'Saffron', location_type: 'restaurant', price_range: '$$$' },
      { name: 'Eureka Cocina de Autor', location_type: 'restaurant', price_range: '$$$' }
    ],
    sections: [
      {
        section_type: 'video',
        title: 'Experience Modern Fusion Cuisine in SLP',
        media_url: 'https://www.youtube-nocookie.com/embed/N3hPoQ1v_Gg',
        media_type: 'youtube',
        section_order: 1
      }
    ]
  },
  {
    experience: {
      slug: 'street-food',
      title: 'Street Food & Markets',
      title_en: 'Street Food & Markets',
      description: 'The heart of Potosino cuisine beats in its vibrant street food scene. Explore bustling markets and neighborhood corners for delicious, affordable bites from iconic tacos al pastor and gorditas to legendary tortas.',
      description_en: 'The heart of Potosino cuisine beats in its vibrant street food scene. Explore bustling markets and neighborhood corners for delicious, affordable bites from iconic tacos al pastor and gorditas to legendary tortas.',
      category: 'street-food',
      hero_image_url: '/images/food/street-food-main.jpg',
      pairings: 'La Legendaria Weiss, Clara, or Session IPA',
      best_for: 'Casual dining, authentic local experiences, and late-night cravings',
      cultural_notes: 'Street food in San Luis Potosí reflects the daily life and culinary traditions of the region. Many vendors, like those in the famous \'Gorditas de Morales\' area, are family legacies using recipes passed down through generations, creating bustling community hubs.',
      sponsor_name: 'La Legendaria Microcervecería',
      sponsor_logo_url: '/images/brands/la-legendaria-logo.png',
      sponsor_website: 'https://lalegendaria.com',
      status: 'published',
      featured: true,
      display_order: 3
    },
    locations: [
      { name: 'Mercado República (Variety)', location_type: 'market', price_range: '$' },
      { name: 'Callejón San Francisco (Evening tacos)', location_type: 'street-vendor', price_range: '$' },
      { name: 'Gorditas de Morales (Famous gordita street)', location_type: 'street-vendor', price_range: '$' },
      { name: 'Tortas Oscar\'s (Multiple locations - Lomo, Choriqueso)', location_type: 'street-vendor', price_range: '$' },
      { name: 'Tacos La Esquinita (Multiple locations - Pastor)', location_type: 'street-vendor', price_range: '$' },
      { name: 'El Chiapaneco (Cochito Horneado Tacos/Tortas)', location_type: 'street-vendor', price_range: '$' },
      { name: 'Tacos El Pata (Late night)', location_type: 'street-vendor', price_range: '$' }
    ],
    sections: [
      {
        section_type: 'video',
        title: 'Street Food Tour of San Luis Potosí',
        media_url: 'https://www.youtube-nocookie.com/embed/zgz5iamCjSE',
        media_type: 'youtube',
        section_order: 1
      }
    ]
  }
];

// =============================================
// SEED FUNCTIONS
// =============================================

async function seedPracticalGuide(guideData) {
  console.log(`\nSeeding guide: ${guideData.guide.title}`);

  // Insert the main guide
  const { data: guide, error: guideError } = await supabase
    .from('practical_guides')
    .upsert(guideData.guide, { onConflict: 'slug' })
    .select()
    .single();

  if (guideError) {
    console.error('Error inserting guide:', guideError);
    return;
  }

  console.log(`  Created guide with ID: ${guide.id}`);

  // Insert sections and their items
  for (const sectionData of guideData.sections) {
    const { items, ...sectionInfo } = sectionData;

    const { data: section, error: sectionError } = await supabase
      .from('guide_sections')
      .upsert({ ...sectionInfo, guide_id: guide.id }, { onConflict: 'guide_id,section_key' })
      .select()
      .single();

    if (sectionError) {
      console.error(`Error inserting section ${sectionInfo.section_key}:`, sectionError);
      continue;
    }

    console.log(`  Created section: ${section.title}`);

    // Delete existing items for this section (to avoid duplicates on re-run)
    await supabase
      .from('guide_content_items')
      .delete()
      .eq('section_id', section.id);

    // Insert items
    if (items && items.length > 0) {
      const itemsWithSectionId = items.map((item, index) => ({
        ...item,
        section_id: section.id,
        item_order: index + 1
      }));

      const { error: itemsError } = await supabase
        .from('guide_content_items')
        .insert(itemsWithSectionId);

      if (itemsError) {
        console.error(`Error inserting items for section ${sectionInfo.section_key}:`, itemsError);
      } else {
        console.log(`    Added ${items.length} items`);
      }
    }
  }
}

async function seedFoodExperience(experienceData) {
  console.log(`\nSeeding food experience: ${experienceData.experience.title}`);

  // Insert the main experience
  const { data: experience, error: expError } = await supabase
    .from('food_experiences')
    .upsert(experienceData.experience, { onConflict: 'slug' })
    .select()
    .single();

  if (expError) {
    console.error('Error inserting food experience:', expError);
    return;
  }

  console.log(`  Created experience with ID: ${experience.id}`);

  // Delete existing locations (to avoid duplicates on re-run)
  await supabase
    .from('food_experience_locations')
    .delete()
    .eq('experience_id', experience.id);

  // Insert locations
  if (experienceData.locations && experienceData.locations.length > 0) {
    const locationsWithExpId = experienceData.locations.map((loc, index) => ({
      ...loc,
      experience_id: experience.id,
      item_order: index + 1
    }));

    const { error: locError } = await supabase
      .from('food_experience_locations')
      .insert(locationsWithExpId);

    if (locError) {
      console.error('Error inserting locations:', locError);
    } else {
      console.log(`  Added ${experienceData.locations.length} locations`);
    }
  }

  // Delete existing sections (to avoid duplicates on re-run)
  await supabase
    .from('food_experience_sections')
    .delete()
    .eq('experience_id', experience.id);

  // Insert sections
  if (experienceData.sections && experienceData.sections.length > 0) {
    const sectionsWithExpId = experienceData.sections.map(section => ({
      ...section,
      experience_id: experience.id
    }));

    const { error: secError } = await supabase
      .from('food_experience_sections')
      .insert(sectionsWithExpId);

    if (secError) {
      console.error('Error inserting sections:', secError);
    } else {
      console.log(`  Added ${experienceData.sections.length} sections`);
    }
  }
}

async function main() {
  console.log('Starting guide seeding...\n');
  console.log('================================');

  // Seed practical guides
  await seedPracticalGuide(livingGuideData);
  await seedPracticalGuide(expatGuideData);

  // Seed food experiences
  for (const exp of foodExperiencesData) {
    await seedFoodExperience(exp);
  }

  console.log('\n================================');
  console.log('Seeding completed!');
}

main().catch(console.error);
