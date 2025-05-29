const testContact = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+1234567890',
        subject: 'Test Inquiry',
        message: 'This is a test message from the contact form',
        service: 'general',
        to: 'business@example.com', // Your business email here
        businessName: 'Test Business',
        businessTitle: 'Test Service'
      })
    });

    const result = await response.json();
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ SUCCESS: Contact form test passed!');
      console.log('📧 Check your terminal for email output');
    } else {
      console.log('❌ ERROR:', result.message);
    }
  } catch (error) {
    console.log('❌ NETWORK ERROR:', error.message);
  }
};

testContact();