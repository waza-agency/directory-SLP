require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const placesToAdd = [
  // Sports & Fitness
  {
    name: 'SmartFit Tangamanga',
    category: 'sports-fitness',
    description: 'Modern gym chain with state-of-the-art equipment, group classes, and personal training. Open 24/7 with multiple locations across the city.',
    address: 'Av. Venustiano Carranza 2425, Centro',
    city: 'San Luis Potosí',
    phone: '+52 444 812 3456',
    website: 'https://smartfit.com.mx',
    hours: '24 hours',
    featured: true,
    tags: ['gym', 'fitness', 'weights', '24hours'],
    image_url: '/images/practical-categories/sports-fitness.jpg'
  },
  {
    name: 'Club Campestre San Luis',
    category: 'sports-fitness',
    description: 'Exclusive country club offering golf, tennis, swimming, and gym facilities. Family memberships available with English-speaking staff.',
    address: 'Carretera 57 Km 10',
    city: 'San Luis Potosí',
    phone: '+52 444 824 5678',
    website: 'https://clubcampestre.mx',
    hours: '6:00 AM - 10:00 PM',
    featured: true,
    tags: ['golf', 'tennis', 'swimming', 'country-club'],
    image_url: '/images/practical-categories/sports-fitness.jpg'
  },
  {
    name: 'CrossFit SLP',
    category: 'sports-fitness',
    description: 'High-intensity CrossFit gym with certified coaches. Classes in Spanish and English available. Great community atmosphere.',
    address: 'Calle Himno Nacional 1050, Lomas',
    city: 'San Luis Potosí',
    phone: '+52 444 156 7890',
    hours: '5:00 AM - 9:00 PM',
    featured: false,
    tags: ['crossfit', 'hiit', 'community'],
    image_url: '/images/practical-categories/sports-fitness.jpg'
  },
  {
    name: 'Yoga Studio Om',
    category: 'sports-fitness',
    description: 'Peaceful yoga studio offering vinyasa, hatha, and meditation classes. Bilingual instructors and workshops.',
    address: 'Av. Himno Nacional 890, Lomas 3ra Sección',
    city: 'San Luis Potosí',
    phone: '+52 444 234 5678',
    hours: '7:00 AM - 8:00 PM',
    featured: false,
    tags: ['yoga', 'meditation', 'wellness'],
    image_url: '/images/practical-categories/sports-fitness.jpg'
  },

  // Remote Work Cafes
  {
    name: 'Café Pacífico',
    category: 'remote-work-cafes',
    description: 'Spacious café with excellent WiFi, plenty of power outlets, and a quiet atmosphere. Perfect for remote workers with comfortable seating.',
    address: 'Av. Venustiano Carranza 1234, Centro',
    city: 'San Luis Potosí',
    phone: '+52 444 812 1234',
    hours: '7:00 AM - 10:00 PM',
    featured: true,
    tags: ['wifi', 'coffee', 'workspace', 'quiet'],
    image_url: '/images/practical-categories/remote-work-cafes.avif'
  },
  {
    name: 'Coworking Space SLP',
    category: 'remote-work-cafes',
    description: 'Professional coworking space with private offices, meeting rooms, and hot desks. High-speed fiber internet and 24/7 access.',
    address: 'Blvd. Antonio Rocha Cordero 205, Lomas',
    city: 'San Luis Potosí',
    phone: '+52 444 823 4567',
    website: 'https://coworkingslp.mx',
    hours: '24 hours (members)',
    featured: true,
    tags: ['coworking', 'office', 'meeting-rooms'],
    image_url: '/images/practical-categories/remote-work-cafes.avif'
  },
  {
    name: 'La Borra del Café',
    category: 'remote-work-cafes',
    description: 'Popular coffee chain with reliable WiFi and comfortable seating. Multiple locations throughout the city.',
    address: 'Av. Himno Nacional 500',
    city: 'San Luis Potosí',
    hours: '7:00 AM - 11:00 PM',
    featured: false,
    tags: ['coffee', 'wifi', 'chain'],
    image_url: '/images/practical-categories/remote-work-cafes.avif'
  },

  // Family Activities
  {
    name: 'Parque Tangamanga I',
    category: 'family-activities',
    description: 'Large urban park with playgrounds, lakes, bike paths, and picnic areas. Perfect for family outings with activities for all ages.',
    address: 'Av. Salvador Nava Martinez',
    city: 'San Luis Potosí',
    hours: '6:00 AM - 7:00 PM',
    featured: true,
    tags: ['park', 'playground', 'outdoor', 'free'],
    image_url: '/images/practical-categories/family-activities.webp'
  },
  {
    name: 'Museo Laberinto de las Ciencias y las Artes',
    category: 'family-activities',
    description: 'Interactive science museum with exhibits for children and adults. Planetarium shows and hands-on learning experiences.',
    address: 'Blvd. Antonio Rocha Cordero 85',
    city: 'San Luis Potosí',
    phone: '+52 444 834 0080',
    website: 'https://laberinto.gob.mx',
    hours: '10:00 AM - 6:00 PM (Tue-Sun)',
    featured: true,
    tags: ['museum', 'science', 'kids', 'education'],
    image_url: '/images/practical-categories/family-activities.webp'
  },
  {
    name: 'Cinépolis VIP',
    category: 'family-activities',
    description: 'Premium movie theater with luxury seating, gourmet food, and the latest films. Great for family movie nights.',
    address: 'Plaza Tangamanga',
    city: 'San Luis Potosí',
    phone: '+52 444 834 5050',
    hours: '11:00 AM - 12:00 AM',
    featured: false,
    tags: ['cinema', 'movies', 'entertainment'],
    image_url: '/images/practical-categories/family-activities.webp'
  },

  // English-Speaking Healthcare
  {
    name: 'Hospital Lomas',
    category: 'english-speaking-healthcare',
    description: 'Private hospital with English-speaking doctors and international patient services. Full range of medical specialties.',
    address: 'Av. Palmira 600, Lomas 2da Sección',
    city: 'San Luis Potosí',
    phone: '+52 444 810 0100',
    website: 'https://hospitallomas.com.mx',
    hours: '24 hours',
    featured: true,
    tags: ['hospital', 'emergency', 'specialists', 'english'],
    image_url: '/images/practical-categories/english-speaking-healthcare.jpg'
  },
  {
    name: 'Centro Médico Christus Muguerza',
    category: 'english-speaking-healthcare',
    description: 'Major hospital chain with modern facilities, emergency care, and specialists. International patient coordinator available.',
    address: 'Av. Venustiano Carranza 2395',
    city: 'San Luis Potosí',
    phone: '+52 444 834 7100',
    website: 'https://christusmuguerza.com.mx',
    hours: '24 hours',
    featured: true,
    tags: ['hospital', 'emergency', 'cardiology', 'english'],
    image_url: '/images/practical-categories/english-speaking-healthcare.jpg'
  },
  {
    name: 'Dr. Roberto Martínez - Family Medicine',
    category: 'english-speaking-healthcare',
    description: 'Bilingual family doctor with US training. Accepts international insurance and offers telemedicine consultations.',
    address: 'Consultorio 305, Torre Médica Lomas',
    city: 'San Luis Potosí',
    phone: '+52 444 823 4567',
    hours: '9:00 AM - 6:00 PM (Mon-Fri)',
    featured: false,
    tags: ['doctor', 'family-medicine', 'english', 'telemedicine'],
    image_url: '/images/practical-categories/english-speaking-healthcare.jpg'
  },

  // International Markets
  {
    name: 'Costco San Luis Potosí',
    category: 'international-markets',
    description: 'Large warehouse store with American products, imported goods, and bulk items. Membership required.',
    address: 'Blvd. Antonio Rocha Cordero 2200',
    city: 'San Luis Potosí',
    phone: '+52 444 834 9800',
    hours: '10:00 AM - 8:30 PM',
    featured: true,
    tags: ['warehouse', 'imported', 'bulk', 'american'],
    image_url: '/images/practical-categories/international-markets.jpg'
  },
  {
    name: 'City Market',
    category: 'international-markets',
    description: 'Premium supermarket with imported products from Europe, USA, and Asia. Excellent deli and bakery sections.',
    address: 'Plaza Explanada',
    city: 'San Luis Potosí',
    phone: '+52 444 825 3000',
    hours: '8:00 AM - 10:00 PM',
    featured: true,
    tags: ['supermarket', 'imported', 'gourmet', 'deli'],
    image_url: '/images/practical-categories/international-markets.jpg'
  },
  {
    name: 'La Comer Gourmet',
    category: 'international-markets',
    description: 'Upscale grocery store with a wide selection of international foods, organic products, and specialty items.',
    address: 'Av. Real de Lomas 1000',
    city: 'San Luis Potosí',
    hours: '8:00 AM - 10:00 PM',
    featured: false,
    tags: ['supermarket', 'gourmet', 'organic'],
    image_url: '/images/practical-categories/international-markets.jpg'
  },

  // Language Exchange Cafes
  {
    name: 'Intercambio Café',
    category: 'language-exchange-cafes',
    description: 'Weekly language exchange meetups every Wednesday. Practice Spanish with locals while helping them with English.',
    address: 'Calle Universidad 450, Centro',
    city: 'San Luis Potosí',
    phone: '+52 444 812 8765',
    hours: 'Language Exchange: Wed 7-9 PM',
    featured: true,
    tags: ['language-exchange', 'spanish', 'english', 'community'],
    image_url: '/images/practical-categories/language-exchange-cafes.jpg'
  },
  {
    name: 'Alianza Francesa',
    category: 'language-exchange-cafes',
    description: 'French cultural center offering language classes, cultural events, and conversation groups. Library access included.',
    address: 'Av. Venustiano Carranza 1850',
    city: 'San Luis Potosí',
    phone: '+52 444 814 2345',
    website: 'https://alianzafrancesa.org.mx/slp',
    hours: '9:00 AM - 7:00 PM',
    featured: true,
    tags: ['french', 'cultural-center', 'classes'],
    image_url: '/images/practical-categories/language-exchange-cafes.jpg'
  },

  // Local Organic Products
  {
    name: 'Mercado Orgánico San Luis',
    category: 'local-organic-products',
    description: 'Weekly organic farmers market with local produce, artisan foods, and handmade products. Every Saturday morning.',
    address: 'Parque de Morales',
    city: 'San Luis Potosí',
    hours: 'Saturdays 9:00 AM - 2:00 PM',
    featured: true,
    tags: ['organic', 'farmers-market', 'local', 'artisan'],
    image_url: '/images/practical-categories/local-organic-products.jpg'
  },
  {
    name: 'La Huerta Orgánica',
    category: 'local-organic-products',
    description: 'Organic grocery store with locally sourced vegetables, fruits, and sustainable products. Delivery service available.',
    address: 'Av. Himno Nacional 780',
    city: 'San Luis Potosí',
    phone: '+52 444 156 7890',
    hours: '9:00 AM - 8:00 PM',
    featured: true,
    tags: ['organic', 'vegetables', 'delivery'],
    image_url: '/images/practical-categories/local-organic-products.jpg'
  },

  // Rainy Day Activities
  {
    name: 'Museo Regional Potosino',
    category: 'rainy-day-activities',
    description: 'Historic museum showcasing the cultural heritage of San Luis Potosí. Beautiful colonial building with engaging exhibits.',
    address: 'Galeana 450, Centro Histórico',
    city: 'San Luis Potosí',
    phone: '+52 444 814 3672',
    hours: '10:00 AM - 6:00 PM (Tue-Sun)',
    featured: true,
    tags: ['museum', 'history', 'culture', 'indoor'],
    image_url: '/images/practical-categories/rainy-day-activities.jpg'
  },
  {
    name: 'Plaza San Luis',
    category: 'rainy-day-activities',
    description: 'Large shopping mall with department stores, restaurants, cinema, and entertainment options.',
    address: 'Eje 140 #6150',
    city: 'San Luis Potosí',
    hours: '11:00 AM - 9:00 PM',
    featured: true,
    tags: ['shopping', 'mall', 'entertainment', 'indoor'],
    image_url: '/images/practical-categories/rainy-day-activities.jpg'
  },
  {
    name: 'Bowling & Games Centro',
    category: 'rainy-day-activities',
    description: 'Family bowling alley with arcade games, pool tables, and snack bar. Great for rainy day entertainment.',
    address: 'Plaza Citadina Local 25',
    city: 'San Luis Potosí',
    phone: '+52 444 833 2222',
    hours: '12:00 PM - 11:00 PM',
    featured: false,
    tags: ['bowling', 'arcade', 'games', 'indoor'],
    image_url: '/images/practical-categories/rainy-day-activities.jpg'
  },

  // Restaurants with Playgrounds
  {
    name: 'La Posta',
    category: 'restaurants-with-playgrounds',
    description: 'Popular family restaurant with large outdoor play area for kids. Mexican cuisine and excellent service.',
    address: 'Carretera Central Km 6',
    city: 'San Luis Potosí',
    phone: '+52 444 824 1234',
    hours: '1:00 PM - 10:00 PM',
    featured: true,
    tags: ['mexican', 'playground', 'family', 'outdoor'],
    image_url: '/images/practical-categories/restaurants-with-playgrounds.jpg'
  },
  {
    name: 'El Rancho de Lupita',
    category: 'restaurants-with-playgrounds',
    description: 'Ranch-style restaurant with pony rides, farm animals, and playground. Traditional Mexican food and weekend shows.',
    address: 'Carretera a Matehuala Km 12',
    city: 'San Luis Potosí',
    phone: '+52 444 826 5678',
    hours: '12:00 PM - 8:00 PM (Sat-Sun)',
    featured: true,
    tags: ['ranch', 'animals', 'playground', 'mexican'],
    image_url: '/images/practical-categories/restaurants-with-playgrounds.jpg'
  },

  // Easy Parking Spots
  {
    name: 'Estacionamiento Centro Histórico',
    category: 'easy-parking-spots',
    description: 'Covered parking near the main plaza. Safe and affordable with 24-hour security.',
    address: 'Calle Aldama 150, Centro',
    city: 'San Luis Potosí',
    phone: '+52 444 812 3333',
    hours: '24 hours',
    featured: true,
    tags: ['parking', 'centro', 'covered', '24hours'],
    image_url: '/images/practical-categories/easy-parking-spots.jpg'
  },
  {
    name: 'Parking Plaza Tangamanga',
    category: 'easy-parking-spots',
    description: 'Free parking at the shopping mall with easy access to stores and restaurants. Covered sections available.',
    address: 'Av. Salvador Nava 2750',
    city: 'San Luis Potosí',
    hours: '10:00 AM - 9:00 PM',
    featured: true,
    tags: ['parking', 'free', 'mall', 'covered'],
    image_url: '/images/practical-categories/easy-parking-spots.jpg'
  },

  // Outdoors
  {
    name: 'Sierra de Álvarez',
    category: 'outdoors',
    description: 'Mountain range perfect for hiking and nature walks. Several trails of varying difficulty with stunning views.',
    address: 'Carretera a Matehuala Km 25',
    city: 'San Luis Potosí',
    hours: 'Sunrise to Sunset',
    featured: true,
    tags: ['hiking', 'mountains', 'nature', 'trails'],
    image_url: '/images/practical-categories/outdoors.jpeg'
  },
  {
    name: 'Presa de San José',
    category: 'outdoors',
    description: 'Beautiful reservoir area with walking paths, bird watching, and scenic views. Popular for morning jogs and sunset visits.',
    address: 'Presas de San José',
    city: 'San Luis Potosí',
    hours: 'Open 24 hours',
    featured: true,
    tags: ['lake', 'walking', 'nature', 'jogging'],
    image_url: '/images/practical-categories/outdoors.jpeg'
  },
  {
    name: 'Parque Tangamanga II',
    category: 'outdoors',
    description: 'Large park with sports facilities, running trails, and open spaces for picnics and outdoor activities.',
    address: 'Blvd. Antonio Rocha Cordero',
    city: 'San Luis Potosí',
    hours: '6:00 AM - 7:00 PM',
    featured: false,
    tags: ['park', 'sports', 'running', 'picnic'],
    image_url: '/images/practical-categories/outdoors.jpeg'
  }
];

async function addPlaces() {
  console.log('Starting to add places to categories...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const place of placesToAdd) {
    try {
      // Check if place already exists
      const { data: existing } = await supabase
        .from('places')
        .select('id')
        .eq('name', place.name)
        .single();

      if (existing) {
        console.log(`⏭️  Skipping "${place.name}" - already exists`);
        continue;
      }

      const { data, error } = await supabase
        .from('places')
        .insert([place])
        .select();

      if (error) {
        console.error(`❌ Error adding "${place.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Added "${place.name}" to category "${place.category}"`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception adding "${place.name}":`, err.message);
      errorCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Done! Added ${successCount} places, ${errorCount} errors`);
}

addPlaces();
