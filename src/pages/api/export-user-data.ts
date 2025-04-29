import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create Supabase client
    const supabase = createServerSupabaseClient({ req, res });
    
    // Check user_id
    const userId = 'd6e52249-d9a5-40c1-a0db-555f861345f6';
    
    // Get the business profile data
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching business profile:', profileError);
    }

    // Get subscription data
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', userId)
      .maybeSingle();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subscriptionError);
    }

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
    }

    // Get business listings 
    let listings = [];
    let listingsError = null;
    
    if (businessProfile) {
      const result = await supabase
        .from('business_listings')
        .select('*')
        .eq('business_id', businessProfile.id)
        .order('created_at', { ascending: false });
        
      listings = result.data || [];
      listingsError = result.error;
      
      if (listingsError) {
        console.error('Error fetching business listings:', listingsError);
      }
    }

    // Compile the data
    const exportData = {
      timestamp: new Date().toISOString(),
      businessProfile,
      subscription,
      userData,
      listings,
      errors: {
        profileError: profileError?.message || null,
        subscriptionError: subscriptionError?.message || null,
        userError: userError?.message || null,
        listingsError: listingsError?.message || null
      }
    };

    // Write to a JSON file
    const filePath = path.join(process.cwd(), 'user-data-export.json');
    fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2));

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Data exported successfully',
      filePath
    });
  } catch (error: any) {
    console.error('Error exporting user data:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An error occurred while exporting user data',
      },
    });
  }
} 