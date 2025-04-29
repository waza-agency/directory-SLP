import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Create authenticated Supabase client
  const supabase = createServerSupabaseClient({ req, res });
  
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = session.user.id;
    const { listingId, price, inventory, isPurchasable } = req.body;

    if (!listingId) {
      return res.status(400).json({ error: 'Listing ID is required' });
    }

    // Check if user owns the listing
    const { data: listing, error: listingError } = await supabase
      .from('places')
      .select('*')
      .eq('id', listingId)
      .single();

    if (listingError) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Update the listing with purchase settings
    const { error: updateError } = await supabase
      .from('places')
      .update({
        price: price || null,
        inventory: inventory || 0,
        is_purchasable: isPurchasable || false,
        sku: `LST-${Date.now().toString(36).slice(-4)}${Math.random().toString(36).slice(-4).toUpperCase()}`,
        updated_at: new Date().toISOString(),
      })
      .eq('id', listingId);

    if (updateError) {
      console.error('Error updating listing:', updateError);
      return res.status(400).json({ error: updateError.message });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error in update listing API:', error);
    return res.status(500).json({ error: error.message });
  }
} 