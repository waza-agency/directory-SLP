import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { generateWeeklyNewsletter } from '@/lib/newsletter-generator';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Security Check (same as other admin endpoints)
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log('Admin triggered newsletter generation...');
    const { subject, html_content, date_range } = await generateWeeklyNewsletter();

    // Save to Database as Draft
    const { data: newsletter, error: dbError } = await supabase
      .from('newsletters')
      .insert({
        subject,
        html_content,
        status: 'draft',
        preview_text: `Your weekly guide to San Luis Potosí for ${date_range}`,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    return res.status(200).json({
      success: true,
      message: 'Draft generated successfully',
      newsletter
    });

  } catch (error) {
    console.error('Generation Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate newsletter',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

