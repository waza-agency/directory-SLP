import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { id, subject, html_content, status } = req.body;

    if (!html_content) {
      return res.status(400).json({ message: 'html_content is required' });
    }

    let result;

    if (id) {
      // Update existing newsletter
      const { data, error } = await supabase
        .from('newsletters')
        .update({
          html_content,
          subject: subject || undefined,
          status: status || 'draft',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new newsletter
      const { data, error } = await supabase
        .from('newsletters')
        .insert({
          subject: subject || 'San Luis Way Weekly',
          html_content,
          status: status || 'draft',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return res.status(200).json({
      success: true,
      message: id ? 'Newsletter updated' : 'Newsletter saved',
      newsletter: result
    });

  } catch (error) {
    console.error('Save newsletter error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save newsletter',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
