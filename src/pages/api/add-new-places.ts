import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newPlaces = [
  {
    name: 'Natal Cocina de Origen',
    category: 'modern-dining',
    address: 'Hermenegildo Galeana 440, Centro Histórico',
    city: 'San Luis Potosí',
    description: 'Restaurante de alta cocina mexicana con la mejor vista del Centro Histórico. Menú dedicado a honrar la cocina mexicana con ingredientes locales de alta calidad.',
    website: 'https://natalorigen.com/',
    phone: null,
    featured: true
  },
  {
    name: 'Casa Altero',
    category: 'modern-dining',
    address: 'Eugenio Garza Sada 200, Trendy Plaza 3er piso, Lomas del Tecnológico',
    city: 'San Luis Potosí',
    description: 'Alta cocina mexicana en ambiente moderno. Destacan los tuétanos, pulpo salteado y tacos de lechón. Música en vivo y excelente mixología.',
    website: null,
    phone: null,
    featured: true
  },
  {
    name: '7 Barrios Cervecería',
    category: 'cocktail-bars',
    address: 'Av. Cuauhtémoc 1605-D, Jardín, Cuauhtémoc',
    city: 'San Luis Potosí',
    description: 'Cervecería artesanal local fundada en 2010. Cervezas de línea: Blonde, Weizen, Porter, Pale, Amber y Brown, más cervezas de temporada.',
    website: 'https://expendio7b.mx/',
    phone: '+52 444 873 4388',
    featured: false
  },
  {
    name: 'La Piquería Mezcalería',
    category: 'cocktail-bars',
    address: 'Independencia 1190, Centro Histórico, frente a Plaza Aranzazú',
    city: 'San Luis Potosí',
    description: 'Mezcalería especializada en destilados mexicanos: mezcal artesanal, güisqui mexicano, ron potosino y kombucha. Vista excepcional de la Capilla de Aranzazú.',
    website: null,
    phone: '+52 444 168 0139',
    featured: false
  },
  {
    name: 'Absenta Speakeasy',
    category: 'cocktail-bars',
    address: 'Casa H, Jardín de Tequisquiapan, Centro',
    city: 'San Luis Potosí',
    description: 'Bar secreto dentro de Casa H, reconocido en el Top 100 Bares de México por Shaker Awards. Coctelería clásica y de autor inspirada en la era de la Prohibición.',
    website: 'https://casa-h.com/services/absenta',
    phone: null,
    featured: true
  },
  {
    name: 'Capital Coffee',
    category: 'remote-work-cafes',
    address: 'Galeana 205, Centro Histórico',
    city: 'San Luis Potosí',
    description: 'Cafetería de especialidad con café de alta calidad, platillos deliciosos y ambiente relajado. Opciones vegetarianas y veganas disponibles.',
    website: null,
    phone: null,
    featured: false
  },
  {
    name: 'Arandela Barra de Café',
    category: 'remote-work-cafes',
    address: 'Himalaya (principal), Casa Maka Centro, Avancer SLP',
    city: 'San Luis Potosí',
    description: 'Barra de café y tostadores locales con múltiples sucursales. Café de especialidad tostado en San Luis Potosí.',
    website: null,
    phone: null,
    featured: false
  },
  {
    name: 'Dulce Amor Café',
    category: 'remote-work-cafes',
    address: 'Centro Histórico',
    city: 'San Luis Potosí',
    description: 'Café artesanal fundado en 2019 que combina la riqueza de la gastronomía mexicana con el arte del café. Espacio con pasión y autenticidad.',
    website: null,
    phone: null,
    featured: false
  },
  {
    name: '500 Noches',
    category: 'live-music',
    address: 'Huasteca 300, Residencial Bellas Lomas',
    city: 'San Luis Potosí',
    description: 'Bar con música en vivo de trovadores y cantautores. Amplia variedad de cervezas artesanales mexicanas y café de mezcla exclusiva de Finca San Carlos.',
    website: null,
    phone: null,
    featured: false
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Places ready to be added',
      count: newPlaces.length,
      places: newPlaces
    });
  }

  if (req.method === 'POST') {
    try {
      const { data: existingPlaces, error: fetchError } = await supabase
        .from('places')
        .select('name');

      if (fetchError) throw fetchError;

      const existingNames = new Set(
        existingPlaces?.map(p => p.name.toLowerCase()) || []
      );

      const placesToAdd = newPlaces.filter(
        place => !existingNames.has(place.name.toLowerCase())
      );

      if (placesToAdd.length === 0) {
        return res.status(200).json({
          message: 'All places already exist in the database',
          addedCount: 0
        });
      }

      const { data, error } = await supabase
        .from('places')
        .insert(placesToAdd)
        .select();

      if (error) throw error;

      return res.status(200).json({
        message: 'Places added successfully',
        addedCount: data?.length || 0,
        addedPlaces: data,
        skippedCount: newPlaces.length - placesToAdd.length
      });
    } catch (error) {
      console.error('Error adding places:', error);
      return res.status(500).json({ error: 'Failed to add places' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
