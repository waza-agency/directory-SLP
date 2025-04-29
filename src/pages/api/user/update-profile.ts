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
    const { name, phone, address, city, country, zipCode, account_type } = req.body;

    // Update user profile in the users table
    const { error } = await supabase
      .from('users')
      .update({
        name,
        phone,
        address,
        city,
        country,
        zip_code: zipCode,
        account_type,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating profile:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error in update profile API:', error);
    return res.status(500).json({ error: error.message });
  }
} 