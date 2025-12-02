import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Newsletter ID is required' });
  }

  switch (req.method) {
    case 'GET':
      return getNewsletter(id, res);
    case 'PUT':
      return updateNewsletter(id, req, res);
    case 'DELETE':
      return deleteNewsletter(id, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getNewsletter(id: string, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Newsletter not found' });

    return res.status(200).json({ newsletter: data });
  } catch (error) {
    console.error('Get newsletter error:', error);
    return res.status(500).json({ message: 'Failed to fetch newsletter' });
  }
}

async function updateNewsletter(id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { subject, preview_text, html_content, plain_text_content, status, scheduled_for } = req.body;

    const updateData: Record<string, unknown> = {};
    if (subject !== undefined) updateData.subject = subject;
    if (preview_text !== undefined) updateData.preview_text = preview_text;
    if (html_content !== undefined) updateData.html_content = html_content;
    if (plain_text_content !== undefined) updateData.plain_text_content = plain_text_content;
    if (status !== undefined) updateData.status = status;
    if (scheduled_for !== undefined) updateData.scheduled_for = scheduled_for;

    const { data, error } = await supabase
      .from('newsletters')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ newsletter: data });
  } catch (error) {
    console.error('Update newsletter error:', error);
    return res.status(500).json({ message: 'Failed to update newsletter' });
  }
}

async function deleteNewsletter(id: string, res: NextApiResponse) {
  try {
    const { error } = await supabase
      .from('newsletters')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({ message: 'Newsletter deleted successfully' });
  } catch (error) {
    console.error('Delete newsletter error:', error);
    return res.status(500).json({ message: 'Failed to delete newsletter' });
  }
}
