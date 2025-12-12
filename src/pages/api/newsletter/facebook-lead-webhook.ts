import { NextApiRequest, NextApiResponse } from 'next';
import { addSubscriber } from '@/lib/beehiiv-service';

const FACEBOOK_VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

interface FacebookLeadEntry {
  id: string;
  time: number;
  changes: Array<{
    field: string;
    value: {
      form_id: string;
      leadgen_id: string;
      created_time: number;
      page_id: string;
    };
  }>;
}

interface FacebookWebhookPayload {
  object: string;
  entry: FacebookLeadEntry[];
}

interface LeadData {
  email?: string;
  first_name?: string;
  full_name?: string;
}

async function fetchLeadData(leadgenId: string): Promise<LeadData | null> {
  if (!FACEBOOK_ACCESS_TOKEN) {
    console.error('FACEBOOK_ACCESS_TOKEN not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${leadgenId}?access_token=${FACEBOOK_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      console.error('Failed to fetch lead data:', await response.text());
      return null;
    }

    const data = await response.json();
    const fieldData = data.field_data || [];

    const leadData: LeadData = {};
    for (const field of fieldData) {
      const name = field.name?.toLowerCase();
      const value = field.values?.[0];

      if (name === 'email') leadData.email = value;
      if (name === 'first_name') leadData.first_name = value;
      if (name === 'full_name') leadData.full_name = value;
    }

    return leadData;
  } catch (error) {
    console.error('Error fetching lead data:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: Facebook webhook verification
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === FACEBOOK_VERIFY_TOKEN) {
      console.log('Facebook webhook verified');
      return res.status(200).send(challenge);
    }

    return res.status(403).json({ error: 'Verification failed' });
  }

  // POST: Receive lead notifications
  if (req.method === 'POST') {
    const payload = req.body as FacebookWebhookPayload;

    // Must respond 200 quickly to Facebook
    res.status(200).json({ received: true });

    // Process leads asynchronously
    if (payload.object === 'page') {
      for (const entry of payload.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === 'leadgen') {
            const leadgenId = change.value.leadgen_id;
            console.log(`Processing Facebook lead: ${leadgenId}`);

            const leadData = await fetchLeadData(leadgenId);

            if (leadData?.email) {
              const firstName = leadData.first_name ||
                leadData.full_name?.split(' ')[0] ||
                '';

              try {
                await addSubscriber(leadData.email.toLowerCase(), {
                  utmSource: 'facebook_ads',
                  utmMedium: 'lead_ad',
                  sendWelcomeEmail: true,
                });
                console.log(`Added Facebook lead to Beehiiv: ${leadData.email}`);
              } catch (error) {
                console.error(`Failed to add lead ${leadData.email}:`, error);
              }
            }
          }
        }
      }
    }
    return;
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
