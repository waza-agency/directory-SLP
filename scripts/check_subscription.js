// Script to test the subscription status API directly
const axios = require('axios');

// User ID we're troubleshooting
const userId = 'd6e52249-d9a5-40c1-a0db-555f861345f6';

async function checkSubscriptionStatus() {
  try {
    console.log('Checking subscription status for user:', userId);
    
    // Make a direct call to the API endpoint
    // Note: You'll need to run this on localhost with the dev server running
    const response = await axios.post('http://localhost:3000/api/subscriptions/stripe-status', {
      userId
    });
    
    console.log('API Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Execute the check
checkSubscriptionStatus(); 