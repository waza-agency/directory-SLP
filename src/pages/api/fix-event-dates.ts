import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get all events
    const { data: events, error: fetchError } = await supabase
      .from('events')
      .select;

    if (fetchError) throw fetchError;
    
    const fixedEvents = [];
    const eventsToUpdate = [];
    
    // Identify events with date issues
    for (const event of events) {
      let needsUpdate = false;
      let startDate: Date | null = null;
      let endDate: Date | null = null;
      let updates: any = {};
      
      // Check if start_date is valid
      try {
        startDate = new Date(event.start_date);
        if (isNaN(startDate.getTime())) {
          // Invalid date format, needs fixing
          needsUpdate = true;
          
          // Try to parse a date from a string like "2023-05-15" without time
          if (typeof event.start_date === 'string' && event.start_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            startDate = new Date(event.start_date + 'T12:00:00Z');
            if (!isNaN(startDate.getTime())) {
              updates.start_date = startDate.toISOString();
            }
          }
        }
      } catch (e) {
        needsUpdate = true;
      }
      
      // Check if end_date is valid or missing
      if (!event.end_date) {
        needsUpdate = true;
        
        // Set end date to 2 hours after start date
        if (startDate && !isNaN(startDate.getTime())) {
          endDate = new Date(startDate);
          endDate.setHours(endDate.getHours() + 2);
          updates.end_date = endDate.toISOString();
        }
      } else {
        try {
          endDate = new Date(event.end_date);
          if (isNaN(endDate.getTime())) {
            needsUpdate = true;
            
            // Try to parse a date from a string like "2023-05-15" without time
            if (typeof event.end_date === 'string' && event.end_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
              endDate = new Date(event.end_date + 'T12:00:00Z');
              if (!isNaN(endDate.getTime())) {
                updates.end_date = endDate.toISOString();
              }
            } else if (startDate && !isNaN(startDate.getTime())) {
              // Set end date to 2 hours after start date
              endDate = new Date(startDate);
              endDate.setHours(endDate.getHours() + 2);
              updates.end_date = endDate.toISOString();
            }
          }
        } catch (e) {
          needsUpdate = true;
        }
      }
      
      // If this event needs updates and we have valid updates to make
      if (needsUpdate && Object.keys(updates).length > 0) {
        eventsToUpdate.push({
          id: event.id,
          updates
        });
      }
    }
    
    // Update events that need fixing
    for (const eventToUpdate of eventsToUpdate) {
      const { error: updateError } = await supabase
        .from('events')
        .update(eventToUpdate.updates)
        .eq('id', eventToUpdate.id);
      
      if (updateError) {
        console.error(`Error updating event ${eventToUpdate.id}:`, updateError);
        continue;
      }
      
      fixedEvents.push(eventToUpdate.id);
    }
    
    // Trigger a site rebuild if any events were fixed
    if (fixedEvents.length > 0) {
      // This would typically be done through a webhook or other mechanism
      // For simplicity, we'll just note that a rebuild is needed
      console.log('Events were fixed, site rebuild recommended');
    }
    
    return res.status(200).json({
      success: true,
      message: `Fixed ${fixedEvents.length} events with date issues`,
      fixedEvents
    });
  } catch (error) {
    console.error('Error fixing event dates:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fixing event dates',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 