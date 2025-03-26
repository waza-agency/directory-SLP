import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get query parameters
    const { table = 'places' } = req.query;
    
    // Check if table name is valid
    const validTables = ['places', 'events', 'featured_photos'];
    if (!validTables.includes(table as string)) {
      return res.status(400).json({
        success: false,
        error: `Invalid table. Valid options: ${validTables.join(', ')}`,
      });
    }
    
    // Fetch data from Supabase
    const { data, error } = await supabase
      .from(table as string)
      .select('*')
      .limit(10);
    
    if (error) {
      console.error(`Error fetching data from ${table}:`, error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Log the place data
    console.log(`Fetched ${data.length} items from ${table}`);
    
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
} 