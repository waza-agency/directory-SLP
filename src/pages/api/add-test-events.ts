import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create dates for our events
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    
    // Cultural event
    const culturalEvent = {
      title: 'Cultural Festival of San Luis Potosí',
      description: 'Annual cultural festival celebrating the rich heritage of San Luis Potosí with music, dance, and art.',
      start_date: tomorrow.toISOString(),
      end_date: nextWeek.toISOString(),
      location: 'Centro Histórico, San Luis Potosí',
      category: 'cultural',
      image_url: '/images/cultural/cultural-default.jpg',
      featured: true
    };
    
    // Arts Culture event
    const artsCultureEvent = {
      title: 'Art Exhibition: Modern Mexican Artists',
      description: 'A special exhibition showcasing the works of contemporary Mexican artists from San Luis Potosí.',
      start_date: nextWeek.toISOString(),
      end_date: twoWeeksLater.toISOString(),
      location: 'Museo Federico Silva, San Luis Potosí',
      category: 'arts culture',
      image_url: '/images/cultural/museo-federico-silva.jpg',
      featured: false
    };
    
    // Insert events
    const { data, error } = await supabase
      .from('events')
      .insert([culturalEvent, artsCultureEvent])
      .select();
    
    if (error) {
      throw error;
    }
    
    return res.status(200).json({ 
      message: 'Test events created successfully', 
      events: data 
    });
  } catch (error) {
    console.error('Error creating test events:', error);
    return res.status(500).json({ 
      message: 'Failed to create test events', 
      error 
    });
  }
} 