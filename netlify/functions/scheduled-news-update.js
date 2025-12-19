const { schedule } = require('@netlify/functions');

const handler = async () => {
  const SITE_URL = process.env.URL || process.env.DEPLOY_URL || 'https://www.sanluisway.com';
  const CRON_SECRET = process.env.CRON_SECRET;

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
exports.handler = schedule('0 */4 * * *', handler);
