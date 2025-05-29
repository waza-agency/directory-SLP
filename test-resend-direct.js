const testResendDirect = async () => {
  const RESEND_API_KEY = 're_GZqYCpA6_7pQsuo7fsgnvmiqy2SyN5vDv';

  try {
    console.log('Testing Resend API directly...');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'San Luis Way <onboarding@resend.dev>',
        to: 'santiago@waza.baby',
        reply_to: 'customer@example.com',
        subject: '🔥 Test Customer Lead from San Luis Way - Test Customer',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #e74c3c; padding-bottom: 20px;">
                <h1 style="color: #e74c3c; margin: 0; font-size: 32px; font-weight: bold;">San Luis Way</h1>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 16px; font-style: italic;">Your Gateway to San Luis Potosí</p>
              </div>

              <div style="background-color: #e8f5e8; border-left: 5px solid #27ae60; padding: 15px; margin-bottom: 25px; border-radius: 5px;">
                <h2 style="color: #27ae60; margin: 0 0 10px 0; font-size: 20px;">🎉 New Customer Lead!</h2>
                <p style="margin: 0; color: #333; font-size: 16px;">You have received a new inquiry through the San Luis Way platform.</p>
              </div>

              <h3 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Customer Contact Information</h3>
              <table style="width: 100%; margin-bottom: 25px;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td><td style="padding: 8px 0; color: #333;">Test Customer</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:customer@example.com" style="color: #e74c3c; text-decoration: none;">customer@example.com</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #333;">5591994364</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px 0; color: #333;">Test Inquiry from Resend</td></tr>
              </table>

              <h3 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Customer Message</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-left: 5px solid #e74c3c; border-radius: 5px; margin-bottom: 25px;">
                <p style="margin: 0; color: #333; line-height: 1.6; font-size: 16px;">This is a test message to verify that the Resend email service is working correctly with San Luis Way. The contact form is now successfully sending emails!</p>
              </div>

              <div style="background-color: #f1f2f6; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <h3 style="color: #333; margin-top: 0;">Next Steps:</h3>
                <ul style="color: #555; line-height: 1.6;">
                  <li>Reply directly to this email to contact the customer</li>
                  <li>The customer's email is set as the reply-to address</li>
                  <li>Respond promptly to provide excellent service</li>
                </ul>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #666; margin: 0; font-size: 14px;">
                  This lead was generated through <strong style="color: #e74c3c;">San Luis Way</strong> -
                  <a href="https://sanluisway.com" style="color: #e74c3c; text-decoration: none;">www.sanluisway.com</a>
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resend API Error:', response.status, errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ SUCCESS: Email sent via Resend!');
    console.log('Email ID:', result.id);
    console.log('📧 Check your email at santiago@waza.baby');
    console.log('');
    console.log('🎉 Your Resend integration is working perfectly!');
    console.log('💡 To send to business emails, you need to:');
    console.log('   1. Verify a domain at https://resend.com/domains');
    console.log('   2. Use your verified domain in the "from" field');
    console.log('   3. Or upgrade to a paid plan for more flexibility');

  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
};

testResendDirect();