/**
 * DEPRECATED: This file contains hardcoded brands which have been migrated to the Supabase brands table.
 * Please use the functions in src/lib/brands.ts instead for brand-related operations.
 * 
 * This file is maintained for backward compatibility but should not be used for new code.
 */

export const sampleBrands = [
  {
    id: 'brand-provi',
    name: 'Botanas Provi',
    category: 'shop',
    address: 'Centro Histórico, San Luis Potosí',
    description: 'Traditional Mexican snacks and treats made with authentic recipes passed down through generations.',
    tags: ['local', 'potosino', 'food', 'snacks'],
    featured: true,
    imageUrl: '/images/brands/botanas-provi.jpg'
  },
  {
    id: 'brand-superior',
    name: 'Panaderías La Superior',
    category: 'shop',
    address: 'Av. Carranza 150, Centro',
    description: 'Artisanal bakery offering fresh bread, pastries, and traditional Mexican baked goods since 1950.',
    tags: ['local', 'potosino', 'food', 'bakery'],
    featured: true,
    imageUrl: '/images/brands/panaderia-la-superior.jpg'
  },
  {
    id: 'brand-lourdes',
    name: 'Aguas de Lourdes',
    category: 'shop',
    address: 'Calle Universidad 205',
    description: 'Refreshing traditional Mexican aguas frescas and beverages made with natural ingredients.',
    tags: ['local', 'potosino', 'beverages', 'drinks'],
    featured: true,
    imageUrl: '/images/brands/aguas-de-lourdes.jpg'
  },
  {
    id: 'chocolates-costanzo',
    name: 'Chocolates Costanzo',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Artisanal chocolate factory producing fine Mexican chocolates and traditional sweets with authentic Potosino recipes.',
    tags: ['local', 'potosino', 'food', 'sweets'],
    featured: true,
    imageUrl: '/images/brands/chocolates-costanzo.jpg'
  },
  {
    id: 'quesos-carranco',
    name: 'Quesos Carranco',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Premium cheese producer creating artisanal and aged cheeses using traditional methods and local milk.',
    tags: ['local', 'potosino', 'food', 'dairy'],
    featured: true,
    imageUrl: '/images/brands/quesos-carranco.jpg'
  },
  {
    id: 'cajeta-coronado',
    name: 'Cajeta Coronado',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Makers of the famous Potosino caramel spread made from goat\'s milk, following century-old recipes.',
    tags: ['local', 'potosino', 'food', 'sweets'],
    featured: true,
    imageUrl: '/images/brands/cajeta-coronado.jpg'
  },
  {
    id: 'bicicletas-mercurio',
    name: 'Bicicletas Mercurio',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Historic bicycle manufacturer producing quality bicycles for Mexican families since 1949.',
    tags: ['local', 'potosino', 'sports', 'transportation'],
    featured: true,
    imageUrl: '/images/brands/bicicletas-mercurio.jpg'
  },
  {
    id: 'canels',
    name: 'Canel\'s',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Famous candy and chewing gum brand known for their colorful packaging and traditional Mexican flavors.',
    tags: ['local', 'potosino', 'food', 'candy'],
    featured: true,
    imageUrl: '/images/brands/canels.jpg'
  },
  {
    id: 'ron-potosi',
    name: 'Ron Potosí',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Distillery producing fine rum with a distinctive Potosino character and smooth finish.',
    tags: ['local', 'potosino', 'beverages', 'spirits'],
    featured: true,
    imageUrl: '/images/brands/ron-potosino.jpg'
  },
  {
    id: 'las-sevillanas',
    name: 'Las Sevillanas',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Traditional bakery specializing in regional pastries and cookies that reflect Potosino culinary heritage.',
    tags: ['local', 'potosino', 'food', 'bakery'],
    featured: true,
    imageUrl: '/images/brands/las-sevillanas.jpg'
  },
  {
    id: 'productos-don-tacho',
    name: 'Productos Don Tacho',
    category: 'shop',
    address: 'San Luis Potosí',
    description: 'Producer of authentic regional foods including traditional mole, salsas, and dried chiles.',
    tags: ['local', 'potosino', 'food', 'spices'],
    featured: true,
    imageUrl: '/images/brands/productos-don-tacho.jpg'
  }
];

/**
 * Helper function to map Supabase place data to our internal format
 * @deprecated Use functions from src/lib/brands.ts instead
 */
export const mapSupabasePlace = (place: any) => ({
  ...place,
  imageUrl: place.image_url, // Map image_url to imageUrl
  tags: place.tags || [], // Ensure tags is an array
}); 