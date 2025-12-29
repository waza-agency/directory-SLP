import { NextApiRequest, NextApiResponse } from 'next';
import { regenerateSection, NewsletterSection } from '@/lib/newsletter-sections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { sectionType, sectionId, currentHtml, context } = req.body;

    if (!sectionType || !currentHtml) {
      return res.status(400).json({ message: 'Missing required fields: sectionType, currentHtml' });
    }

    console.log(`Regenerating section: ${sectionId} (${sectionType})`);

    const newHtml = await regenerateSection(
      sectionType as NewsletterSection['type'],
      sectionId,
      currentHtml,
      context
    );

    return res.status(200).json({
      success: true,
      html: newHtml
    });

  } catch (error) {
    console.error('Section regeneration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to regenerate section',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
