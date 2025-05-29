const fetch = require('node-fetch');

async function testContactAPI() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    subject: 'Test Contact',
    message: 'This is a test message from the business contact form.',
    service: 'Business Contact: Test Business',
    to: 'info@sanluisway.com',
    businessId: 'test-business-id',
    businessName: 'Test Business',
    businessTitle: 'Test Business Listing',
    listingCategory: 'Test Category',
    recaptchaToken: 'test-token-for-development'
  };

  try {
    console.log('Sending test request to contact API...');
    console.log('Test data:', JSON.stringify(testData, null, 2));

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());

    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (response.ok) {
      console.log('✅ Test passed! Email API is working.');
    } else {
      console.log('❌ Test failed! Email API returned an error.');
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testContactAPI();