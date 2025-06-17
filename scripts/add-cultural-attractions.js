const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const culturalAttractions = [
  {
    name: 'Teatro de la Paz',
    category: 'other',
    address: 'Villerías 705, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 812 2698',
    website: 'https://teatrodelapaz.gob.mx',
    latitude: 22.1564,
    longitude: -100.9854,
    description: 'This majestic neoclassical theater, built in 1894, is one of the most beautiful in Mexico. It continues to host world-class performances and cultural events including opera, ballet, classical music concerts, and theatrical productions. The theater features stunning architecture with baroque and neoclassical elements, historic murals, and guided tours available for visitors.',
    image_url: '/images/cultural/teatro-de-la-paz.jpg',
    hours: 'Tuesday to Sunday, 10:00 AM - 6:00 PM',
    featured: true,
    tags: ['theater', 'culture', 'music', 'performance', 'historic', 'architecture', 'neoclassical']
  },
  {
    name: 'Museo Federico Silva',
    category: 'other',
    address: 'Álvaro Obregón 80, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 813 5154',
    website: 'https://museofedericosilva.gob.mx',
    latitude: 22.1542,
    longitude: -100.9789,
    description: 'Housed in a former prison, this contemporary art museum showcases the monumental sculptures and artistic works of renowned Mexican sculptor Federico Silva. The museum features rotating exhibitions, educational workshops, contemporary sculptures, and the historic prison architecture has been beautifully preserved and transformed into art exhibition spaces.',
    image_url: '/images/cultural/museo-federico-silva.jpg',
    hours: 'Tuesday to Sunday, 10:00 AM - 6:00 PM',
    featured: true,
    tags: ['museum', 'art', 'sculpture', 'contemporary', 'culture', 'education', 'exhibitions']
  },
  {
    name: 'Catedral de San Luis Potosí',
    category: 'other',
    address: 'Plaza de Armas, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    latitude: 22.1563,
    longitude: -100.9844,
    description: 'The baroque cathedral dominates the main plaza and represents one of the finest examples of colonial religious architecture in the region. Built between 1670 and 1730, it features baroque architecture, colonial altars, religious art, and overlooks the historic Plaza de Armas. Free admission allows visitors to appreciate the stunning interior and learn about the citys religious heritage.',
    image_url: '/images/cultural/catedral-san-luis-potosi.jpg',
    hours: 'Daily, 6:00 AM - 8:00 PM',
    featured: true,
    tags: ['cathedral', 'religious', 'baroque', 'colonial', 'historic', 'architecture', 'plaza']
  },
  {
    name: 'Centro de las Artes de San Luis Potosí',
    category: 'other',
    address: 'Callejón de los Cedros 1735, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 813 2024',
    website: 'https://centrodelasartesslp.gob.mx',
    latitude: 22.1489,
    longitude: -100.9823,
    description: 'A dynamic cultural center that promotes contemporary arts through exhibitions, workshops, performances, and community programs. Located in a beautifully restored historic building, it features contemporary art exhibitions, art workshops, performance spaces, community programs, and serves as a hub for local artists and cultural activities.',
    image_url: '/images/cultural/centro-artes.jpg',
    hours: 'Tuesday to Sunday, 10:00 AM - 8:00 PM',
    featured: false,
    tags: ['cultural-center', 'art', 'workshops', 'contemporary', 'exhibitions', 'performance', 'community']
  },
  {
    name: 'Museo Nacional de la Máscara',
    category: 'other',
    address: 'Villerías 2, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 812 3025',
    latitude: 22.1567,
    longitude: -100.9847,
    description: 'A unique museum dedicated to the art and tradition of Mexican masks, featuring an extensive collection of ceremonial, religious, and theatrical masks from different regions of Mexico. The museum showcases the cultural significance of masks in Mexican traditions, indigenous ceremonies, and popular celebrations.',
    image_url: '/images/cultural/museo-mascara.jpg',
    hours: 'Tuesday to Sunday, 10:00 AM - 6:00 PM',
    featured: false,
    tags: ['museum', 'masks', 'traditions', 'indigenous', 'culture', 'ceremonial', 'art']
  },
  {
    name: 'Museo Regional Potosino',
    category: 'other',
    address: 'Galeana 450, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 813 4405',
    latitude: 22.1534,
    longitude: -100.9798,
    description: 'Housed in a former Franciscan convent, this regional museum showcases the history, archaeology, and culture of San Luis Potosí state. Collections include pre-Hispanic artifacts, colonial art, historical documents, and exhibits on local mining heritage and indigenous cultures.',
    image_url: '/images/cultural/museo-regional.jpg',
    hours: 'Tuesday to Sunday, 9:00 AM - 5:00 PM',
    featured: false,
    tags: ['museum', 'history', 'archaeology', 'colonial', 'franciscan', 'heritage', 'indigenous']
  },
  {
    name: 'Capilla de Aranzazú',
    category: 'other',
    address: 'Universidad 1305, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    latitude: 22.1523,
    longitude: -100.9876,
    description: 'This baroque chapel, built in the 18th century, is considered one of the finest examples of churrigueresque architecture in Mexico. The ornate facade and interior decorations showcase the artistic mastery of colonial craftsmen and represent an important religious and architectural heritage site.',
    image_url: '/images/cultural/capilla-aranzazu.jpg',
    hours: 'Daily, 7:00 AM - 7:00 PM',
    featured: false,
    tags: ['chapel', 'baroque', 'churrigueresque', 'religious', 'colonial', 'architecture', 'heritage']
  },
  {
    name: 'Museo del Virreinato',
    category: 'other',
    address: 'Plaza de San Francisco, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 812 3121',
    latitude: 22.1551,
    longitude: -100.9834,
    description: 'Located in the former convent of San Francisco, this museum displays colonial art, religious artifacts, and historical objects from the viceregal period. The building itself is a magnificent example of franciscan architecture and houses important collections of paintings, sculptures, and decorative arts.',
    image_url: '/images/cultural/museo-virreinato.jpg',
    hours: 'Tuesday to Sunday, 10:00 AM - 5:00 PM',
    featured: false,
    tags: ['museum', 'colonial', 'viceregal', 'religious', 'franciscan', 'art', 'history']
  },
  {
    name: 'Casa de la Cultura',
    category: 'other',
    address: 'Carranza 1815, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    phone: '+52 444 813 2796',
    latitude: 22.1487,
    longitude: -100.9801,
    description: 'A cultural center offering art classes, exhibitions, workshops, and cultural events. The venue promotes local arts and crafts, hosts temporary exhibitions by regional artists, and provides educational programs for all ages including music, painting, sculpture, and traditional crafts.',
    image_url: '/images/cultural/casa-cultura.jpg',
    hours: 'Monday to Friday, 9:00 AM - 9:00 PM; Saturday, 9:00 AM - 6:00 PM',
    featured: false,
    tags: ['cultural-center', 'workshops', 'art', 'education', 'exhibitions', 'music', 'crafts']
  },
  {
    name: 'Templo de San Francisco',
    category: 'other',
    address: 'Plaza de San Francisco, Centro Histórico, San Luis Potosí',
    city: 'San Luis Potosí',
    latitude: 22.1549,
    longitude: -100.9832,
    description: 'This 17th-century Franciscan temple features stunning baroque architecture and houses important religious art. The church is famous for its ornate altar, colonial paintings, and its historic significance as one of the oldest religious buildings in the city.',
    image_url: '/images/cultural/templo-san-francisco.jpg',
    hours: 'Daily, 6:00 AM - 8:00 PM',
    featured: false,
    tags: ['temple', 'franciscan', 'baroque', 'religious', 'colonial', 'historic', 'art']
  }
];

async function addCulturalAttractions() {
  try {
    console.log('Adding cultural attractions to the database...');

    for (const attraction of culturalAttractions) {
      // Check if the attraction already exists
      const { data: existing, error: checkError } = await supabase
        .from('places')
        .select('id')
        .eq('name', attraction.name)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error(`Error checking for existing attraction ${attraction.name}:`, checkError);
        continue;
      }

      if (existing) {
        console.log(`Attraction "${attraction.name}" already exists, skipping...`);
        continue;
      }

      // Insert the new attraction
      const { data, error } = await supabase
        .from('places')
        .insert([attraction])
        .select();

      if (error) {
        console.error(`Error inserting ${attraction.name}:`, error);
      } else {
        console.log(`✅ Successfully added: ${attraction.name}`);
      }
    }

    console.log('\n🎉 Cultural attractions have been added successfully!');
    console.log('You can now visit http://localhost:3000/cultural-attractions to see them.');

  } catch (error) {
    console.error('Error adding cultural attractions:', error);
  } finally {
    process.exit(0);
  }
}

addCulturalAttractions();