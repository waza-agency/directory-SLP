import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { generateWeeklyNewsletter } from '@/lib/newsletter-generator';
import { createPost } from '@/lib/beehiiv-service';

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
    const { customContent } = req.body || {};
    console.log('Admin triggered newsletter generation...');
    if (customContent) {
      console.log('Custom content provided:', customContent.substring(0, 100) + '...');
    }
    const { subject, html_content, date_range } = await generateWeeklyNewsletter(customContent);
    const previewText = `Your weekly guide to San Luis Potosí for ${date_range}`;

    // Create draft in Beehiiv (primary)
    console.log('Creating draft in Beehiiv...');
    const beehiivResult = await createPost(subject, html_content, {
      subtitle: previewText,
      audience: 'all',
    });

    if (!beehiivResult.success) {
      console.error('Beehiiv draft creation failed:', beehiivResult.error);
      // Continue anyway - we'll save to Supabase as fallback
    }

    // Save to Supabase as backup/historical record
    const { data: newsletter, error: dbError } = await supabase
      .from('newsletters')
      .insert({
        subject,
        html_content,
        status: 'draft',
        preview_text: previewText,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase backup save failed:', dbError.message);
    }

    // Build Beehiiv edit URL
    const beehiivPostId = beehiivResult.post?.id;
    const beehiivEditUrl = beehiivPostId
      ? `https://app.beehiiv.com/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts/${beehiivPostId}`
      : null;

    return res.status(200).json({
      success: true,
      message: beehiivResult.success
        ? 'Draft created in Beehiiv! Open the link to edit and send.'
        : 'Newsletter generated! Copy the content below to paste in Beehiiv.',
      newsletter: {
        id: newsletter?.id,
        subject,
        preview_text: previewText,
        html_content,
      },
      beehiiv: {
        success: beehiivResult.success,
        post_id: beehiivPostId,
        edit_url: beehiivEditUrl,
      }
    });

  } catch (error) {
    console.error('Generation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { message: errorMessage, stack: errorStack });

    return res.status(500).json({
      success: false,
      message: 'Failed to generate newsletter',
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? errorStack : undefined
    });
  }
}
