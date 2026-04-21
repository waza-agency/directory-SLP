import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { generateWeeklyNewsletter, injectAdsIntoHtml, AdPlacementData } from '@/lib/newsletter-generator';
import { createPost } from '@/lib/beehiiv-service';
import { logger } from '@/lib/logger';

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
    const { customContent, selectedAds } = req.body || {};
    logger.log('Admin triggered newsletter generation...');
    if (customContent) {
      logger.log('Custom content provided:', customContent.substring(0, 100) + '...');
    }
    const { subject, html_content, date_range, link_validation, unfilled_placeholders } = await generateWeeklyNewsletter(customContent);
    const previewText = `Your weekly guide to San Luis Potosí for ${date_range}`;

    if (link_validation.broken_links_replaced.length > 0) {
      logger.log(
        `Link validator replaced ${link_validation.broken_links_replaced.length} broken link(s):`,
        link_validation.broken_links_replaced
      );
    }

    let finalHtml = html_content;

    if (selectedAds && Array.isArray(selectedAds) && selectedAds.length > 0) {
      logger.log('Injecting selected ads:', selectedAds);
      
      const adIds = selectedAds.map((a: { ad_id: string }) => a.ad_id);
      const { data: ads, error: adsError } = await supabase
        .from('sponsor_ads')
        .select('id, ad_type, html_content, image_url, image_alt, link_url, placement')
        .in('id', adIds);

      if (!adsError && ads && ads.length > 0) {
        const adsWithHtml = selectedAds.map((sa: { placement: string; ad_id: string }) => {
          const adData = ads.find((a: { id: string }) => a.id === sa.ad_id);
          if (!adData) return null;

          let adHtml = '';
          if (adData.ad_type === 'html' && adData.html_content) {
            adHtml = adData.html_content as string;
          } else if (adData.ad_type === 'image' && adData.image_url) {
            const imgTag = `<img src="${adData.image_url}" alt="${adData.image_alt || 'Advertisement'}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />`;
            adHtml = adData.link_url
              ? `<a href="${adData.link_url}" target="_blank" rel="noopener noreferrer">${imgTag}</a>`
              : imgTag;
          }

          if (!adHtml) return null;

          return {
            ad_id: sa.ad_id,
            placement: sa.placement as 'top' | 'middle' | 'bottom',
            html: adHtml
          };
        }).filter((ad): ad is AdPlacementData => ad !== null);

        if (adsWithHtml.length > 0) {
          finalHtml = injectAdsIntoHtml(html_content, adsWithHtml);
          logger.log('Ads injected, finalHtml length:', finalHtml.length);
        }
      } else {
        logger.log('No ads found in database for IDs:', adIds, 'Error:', adsError);
      }
    }

    // Create draft in Beehiiv (primary)
    logger.log('Creating draft in Beehiiv...');
    const beehiivResult = await createPost(subject, finalHtml, {
      subtitle: previewText,
      audience: 'all',
    });

    if (!beehiivResult.success) {
      logger.error('Beehiiv draft creation failed:', beehiivResult.error);
      // Continue anyway - we'll save to Supabase as fallback
    }

    // Save to Supabase as backup/historical record
    const { data: newsletter, error: dbError } = await supabase
      .from('newsletters')
      .insert({
        subject,
        html_content: finalHtml,
        status: 'draft',
        preview_text: previewText,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      logger.error('Supabase backup save failed:', dbError.message);
    }

    // Record ad placements
    if (selectedAds && Array.isArray(selectedAds) && selectedAds.length > 0 && newsletter?.id) {
      const placements = selectedAds.map((sa: { placement: string; ad_id: string }) => ({
        newsletter_id: newsletter.id,
        sponsor_ad_id: sa.ad_id,
        placement: sa.placement,
        impressions_count: 0,
        clicks_count: 0
      }));

      await supabase.from('newsletter_ad_placements').insert(placements);

      for (const sa of selectedAds) {
        try {
          await supabase.rpc('increment', {
            table_name: 'sponsor_ads',
            column_name: 'impressions_count',
            row_id: sa.ad_id
          });
        } catch (e) {
          logger.error('Failed to increment impressions:', e);
        }
      }
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
        html_content: finalHtml,
      },
      beehiiv: {
        success: beehiivResult.success,
        post_id: beehiivPostId,
        edit_url: beehiivEditUrl,
      },
      link_validation,
      unfilled_placeholders,
    });

  } catch (error) {
    logger.error('Generation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    logger.error('Error details:', { message: errorMessage, stack: errorStack });

    return res.status(500).json({
      success: false,
      message: 'Failed to generate newsletter',
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? errorStack : undefined
    });
  }
}
