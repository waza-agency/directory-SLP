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
    
    // Cultural event
    const culturalEvent = {
      title: 'Cultural Festival of San Luis Potosí',
      description: 'Annual cultural festival celebrating the rich heritage of San Luis Potosí with music, dance, and art.',
      start_date: tomorrow.toISOString().substring(0, 19),
      end_date: nextWeek.toISOString().substring(0, 19),
      location: 'Centro Histórico, San Luis Potosí',
      category: 'cultural',
      image_url: '/images/cultural/cultural-default.jpg',
      featured: true
    };
    
    // Insert event
    const { data, error } = await supabase
      .from('events')
      .insert([culturalEvent])
      .select();
    
    if (error) {
      throw error;
    }
    
    return res.status(200).json({ 
      message: 'Test cultural event created successfully', 
      event: data 
    });
  } catch (error) {
    console.error('Error creating test cultural event:', error);
    return res.status(500).json({ 
      message: 'Failed to create test cultural event', 
      error 
    });
  }
} 