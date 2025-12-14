import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newEvents = [
  {
    title: 'Los Horóscopos de Durango - Antes Muertas que Sencillas',
    description: 'Celebración del 50 aniversario de Los Horóscopos de Durango con su espectacular show "La Gira de Oro".',
    start_date: '2025-12-12T21:00:00+00:00',
    end_date: '2025-12-13T01:00:00+00:00',
    location: 'Palenque de la Feria, San Luis Potosí',
    category: 'music',
    featured: false
  },
  {
    title: 'Pastorela Navideña - Compañía de Teatro Galindo',
    description: 'Tradicional pastorela navideña presentada por la Compañía de Teatro Galindo como parte de las festividades de Navidad Verde.',
    start_date: '2025-12-14T20:00:00+00:00',
    end_date: '2025-12-22T22:00:00+00:00',
    location: 'Teatro de la Paz, San Luis Potosí',
    category: 'arts-culture',
    featured: false
  },
  {
    title: 'Retiro de Yoga Año Nuevo - Huasteca Potosina',
    description: 'Retiro de 6 días de yoga, meditación y conexión espiritual en la mística Huasteca Potosina con Satyarupa Yoga.',
    start_date: '2025-12-28T10:00:00+00:00',
    end_date: '2026-01-02T16:00:00+00:00',
    location: 'Huasteca Potosina, San Luis Potosí',
    category: 'wellness',
    featured: true
  },
  {
    title: 'Feria del Cristo de Matehuala',
    description: 'Tradicional feria patronal en honor al Cristo de Matehuala con eventos religiosos, culturales y comerciales.',
    start_date: '2026-01-06T10:00:00+00:00',
    end_date: '2026-01-15T22:00:00+00:00',
    location: 'Matehuala, San Luis Potosí',
    category: 'arts-culture',
    featured: false
  },
  {
    title: 'Fiestas de San Sebastián',
    description: 'Fiestas patronales en honor a San Sebastián en Venado y el barrio de San Sebastián en la capital.',
    start_date: '2026-01-20T10:00:00+00:00',
    end_date: '2026-01-20T23:00:00+00:00',
    location: 'Venado y Barrio San Sebastián, San Luis Potosí',
    category: 'arts-culture',
    featured: false
  },
  {
    title: 'Carlos Rivera en Concierto',
    description: 'El cantante y actor mexicano Carlos Rivera se presenta en la Arena Potosí.',
    start_date: '2026-02-07T21:00:00+00:00',
    end_date: '2026-02-08T00:00:00+00:00',
    location: 'Arena Potosí, San Luis Potosí',
    category: 'music',
    featured: true
  },
  {
    title: '5K Carrera del Día de la Mujer 2026',
    description: 'Carrera atlética de 5 kilómetros celebrando el Día Internacional de la Mujer.',
    start_date: '2026-03-08T07:00:00+00:00',
    end_date: '2026-03-08T10:00:00+00:00',
    location: 'San Luis Potosí',
    category: 'sports',
    featured: false
  },
  {
    title: 'Fiesta de Nuestro Padre Jesús - Salinas',
    description: 'Celebración tradicional del primer viernes de marzo en honor a Nuestro Padre Jesús.',
    start_date: '2026-03-06T08:00:00+00:00',
    end_date: '2026-03-06T22:00:00+00:00',
    location: 'Salinas de Hidalgo, San Luis Potosí',
    category: 'arts-culture',
    featured: false
  },
  {
    title: 'ExpoTecnomedic 2026 - Congreso Internacional de Tecnología Médica',
    description: 'Congreso internacional de tecnología médica con exhibiciones, conferencias y networking para profesionales de la salud.',
    start_date: '2026-03-10T09:00:00+00:00',
    end_date: '2026-03-13T18:00:00+00:00',
    location: 'Centro de Negocios Potosí, San Luis Potosí',
    category: 'community-social',
    featured: false
  },
  {
    title: 'Fiesta de San José',
    description: 'Fiestas patronales dedicadas a San José celebradas en múltiples poblaciones del estado.',
    start_date: '2026-03-19T08:00:00+00:00',
    end_date: '2026-03-19T23:00:00+00:00',
    location: 'Diversos municipios, San Luis Potosí',
    category: 'arts-culture',
    featured: false
  },
  {
    title: '31 Minutos - Radio Guaripolo Tour',
    description: 'El noticiero más famoso de Chile presenta su show "Radio Guaripolo" con Tulio, Guaripolo y todos los personajes favoritos.',
    start_date: '2026-03-30T20:00:00+00:00',
    end_date: '2026-03-30T22:30:00+00:00',
    location: 'Teatro de la Paz, San Luis Potosí',
    category: 'arts-culture',
    featured: true
  },
  {
    title: 'Ricardo Montaner - El Último Regreso Tour',
    description: 'El reconocido cantante celebra más de 4 décadas de trayectoria con éxitos como "Déjame llorar" y "Tan enamorados".',
    start_date: '2026-05-08T21:00:00+00:00',
    end_date: '2026-05-09T00:00:00+00:00',
    location: 'Arena Potosí, San Luis Potosí',
    category: 'music',
    featured: true
  },
  {
    title: 'Fiesta de San Antonio de Padua',
    description: 'Celebración tradicional en honor a San Antonio de Padua con procesiones, música y comida típica.',
    start_date: '2026-06-13T08:00:00+00:00',
    end_date: '2026-06-13T23:00:00+00:00',
    location: 'San Luis Potosí',
    category: 'arts-culture',
    featured: false
  },
  {
    title: 'Morat - Galería Inesperada Tour',
    description: 'La banda colombiana Morat presenta su gira con éxitos como "Cuando nadie ve" y "Cómo te atreves".',
    start_date: '2025-06-19T21:00:00+00:00',
    end_date: '2025-06-20T00:00:00+00:00',
    location: 'Arena Potosí, San Luis Potosí',
    category: 'music',
    featured: true
  },
  {
    title: 'Fiesta de San Juan Bautista - Coxcatlán',
    description: 'Colorida celebración huasteca y nahua en honor a San Juan Bautista con danzas tradicionales.',
    start_date: '2026-06-24T08:00:00+00:00',
    end_date: '2026-06-24T23:00:00+00:00',
    location: 'Coxcatlán, San Luis Potosí',
    category: 'arts-culture',
    featured: false
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Events ready to be added',
      count: newEvents.length,
      events: newEvents
    });
  }

  if (req.method === 'POST') {
    try {
      const { data: existingEvents, error: fetchError } = await supabase
        .from('events')
        .select('title');

      if (fetchError) throw fetchError;

      const existingTitles = new Set(existingEvents?.map(e => e.title.toLowerCase()) || []);

      const eventsToAdd = newEvents.filter(
        event => !existingTitles.has(event.title.toLowerCase())
      );

      if (eventsToAdd.length === 0) {
        return res.status(200).json({
          message: 'All events already exist in the database',
          addedCount: 0
        });
      }

      const { data, error } = await supabase
        .from('events')
        .insert(eventsToAdd)
        .select();

      if (error) throw error;

      return res.status(200).json({
        message: 'Events added successfully',
        addedCount: data?.length || 0,
        addedEvents: data,
        skippedCount: newEvents.length - eventsToAdd.length
      });
    } catch (error) {
      console.error('Error adding events:', error);
      return res.status(500).json({ error: 'Failed to add events' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
