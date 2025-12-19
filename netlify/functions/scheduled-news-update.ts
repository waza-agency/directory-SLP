import { schedule } from '@netlify/functions';

const SITE_URL = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET;

const handler = async () => {
  console.log('Running scheduled news update...');

  try {
    const response = await fetch(`${SITE_URL}/api/cron/update-headlines`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRON_SECRET}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('News update result:', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Scheduled news update failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update news' })
    };
  }
};

// Run every 4 hours: "0 */4 * * *"
export const main = schedule('0 */4 * * *', handler);
