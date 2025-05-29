import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// CORS middleware
function cors(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

async function verifyRecaptcha(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const data = await response.json();
  return data.success;
}

// Function to send email using Supabase's built-in email service
async function sendEmailViaSupabase(supabase: any, emailData: any) {
  try {
    console.log('Attempting to send email via Supabase Auth email service');

    // Use Supabase's auth.admin.sendEmail if available
    // This uses the same email service as user verification emails
    if (supabase.auth.admin?.sendEmail) {
      const result = await supabase.auth.admin.sendEmail({
        email: emailData.to,
        type: 'email',
        data: {
          email_action_type: 'email',
          site_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sanluisway.com',
          token: 'contact_notification',
          token_hash: 'contact_notification',
          redirect_to: process.env.NEXT_PUBLIC_SITE_URL || 'https://sanluisway.com'
        }
      });

      console.log('Supabase admin email result:', result);
      return { success: true, method: 'supabase_admin' };
    }

    // Fallback: Try to call our custom email function (if deployed)
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        from: emailData.from,
        replyTo: emailData.replyTo
      })
    });

    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('Supabase Edge Function email sent:', result);
      return { success: true, method: 'edge_function' };
    } else {
      const error = await emailResponse.text();
      console.error('Supabase Edge Function error:', error);
      throw new Error(`Edge Function failed: ${error}`);
    }

  } catch (error) {
    console.error('Supabase email error:', error);

    // Final fallback: Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('\n' + '='.repeat(80));
      console.log('📧 EMAIL THAT WOULD BE SENT VIA SUPABASE:');
      console.log('='.repeat(80));
      console.log(`From: ${emailData.from}`);
      console.log(`To: ${emailData.to}`);
      console.log(`Reply-To: ${emailData.replyTo}`);
      console.log(`Subject: ${emailData.subject}`);
      console.log('-'.repeat(80));
      console.log('CONTENT:');
      console.log(emailData.html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 500) + '...');
      console.log('='.repeat(80) + '\n');

      return { success: true, method: 'console_log' };
    }

    throw error;
  }
}

// Function to ensure contact_inquiries table exists
async function ensureContactInquiriesTable(supabase: any) {
  try {
    // Try to create the table if it doesn't exist
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_inquiries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          customer_name TEXT NOT NULL,
          customer_email TEXT NOT NULL,
          customer_phone TEXT,
          subject TEXT NOT NULL,
          message TEXT,
          business_email TEXT NOT NULL,
          service_type TEXT DEFAULT 'general',
          additional_data JSONB,
          status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_contact_inquiries_business_email ON contact_inquiries(business_email);
        CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
        CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at);

        ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Service role can manage contact inquiries" ON contact_inquiries;
        CREATE POLICY "Service role can manage contact inquiries" ON contact_inquiries
          FOR ALL USING (auth.role() = 'service_role');
      `
    });

    if (error) {
      console.log('Table creation via RPC failed, table might already exist:', error);
    } else {
      console.log('Contact inquiries table ensured via RPC');
    }
  } catch (error) {
    console.log('RPC not available, table should exist already:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Contact API called with body:', JSON.stringify(req.body, null, 2));

  const {
    // reCAPTCHA token
    recaptchaToken,
    // Common fields
    name,
    email,
    phone,
    message,
    service,
    subject,
    // Cultural experiences fields
    experienceType,
    groupSize,
    preferredDates,
    languagePreference,
    specialRequirements,
    // Relocation support fields
    nationality,
    currentLocation,
    familySize,
    plannedMoveDate,
    visaStatus,
    housingPreference,
    schoolingNeeds,
    additionalServices,
    // Local connections fields
    serviceCategory,
    specificService,
    urgencyLevel,
    to
  } = req.body;

  // Verify reCAPTCHA (skip in development for testing)
  if (process.env.NODE_ENV === 'production') {
    try {
      if (!recaptchaToken) {
        return res.status(400).json({ message: 'reCAPTCHA token is required' });
      }

      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return res.status(500).json({ message: 'Failed to verify reCAPTCHA' });
    }
  } else {
    console.log('Skipping reCAPTCHA verification in development mode');
  }

  // Initialize Supabase client with service role key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Ensure the contact_inquiries table exists
    await ensureContactInquiriesTable(supabase);

    // Store the contact inquiry in the database
    const contactData = {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      subject: subject || 'General Inquiry',
      message: message || '',
      business_email: to || 'info@sanluisway.com',
      service_type: service || experienceType || serviceCategory || 'general',

      // Additional data as JSON
      additional_data: {
        businessId: req.body.businessId,
        businessName: req.body.businessName,
        businessTitle: req.body.businessTitle,
        listingCategory: req.body.listingCategory,
        experienceType,
        groupSize,
        preferredDates,
        languagePreference,
        specialRequirements,
        nationality,
        currentLocation,
        familySize,
        plannedMoveDate,
        visaStatus,
        housingPreference,
        schoolingNeeds,
        additionalServices,
        serviceCategory,
        specificService,
        urgencyLevel
      },

      status: 'new'
    };

    // Insert contact inquiry into database
    const { data: contactResult, error: contactError } = await supabase
      .from('contact_inquiries')
      .insert([contactData])
      .select()
      .single();

    if (contactError) {
      console.error('Error storing contact inquiry:', contactError);
      return res.status(500).json({
        message: 'Failed to store contact inquiry',
        error: contactError.message
      });
    }

    console.log('Contact inquiry stored successfully:', contactResult);

    // Build the email content with San Luis Way branding
    let htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <!-- San Luis Way Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #e74c3c; padding-bottom: 20px;">
            <h1 style="color: #e74c3c; margin: 0; font-size: 32px; font-weight: bold;">San Luis Way</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 16px; font-style: italic;">Your Gateway to San Luis Potosí</p>
          </div>

          <!-- Lead Alert -->
          <div style="background-color: #e8f5e8; border-left: 5px solid #27ae60; padding: 15px; margin-bottom: 25px; border-radius: 5px;">
            <h2 style="color: #27ae60; margin: 0 0 10px 0; font-size: 20px;">🎉 New Customer Lead!</h2>
            <p style="margin: 0; color: #333; font-size: 16px;">You have received a new inquiry through the San Luis Way platform.</p>
          </div>

          <h3 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Customer Contact Information</h3>
          <table style="width: 100%; margin-bottom: 25px;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td><td style="padding: 8px 0; color: #333;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #e74c3c; text-decoration: none;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px 0; color: #333;">${subject || 'General Inquiry'}</td></tr>
          </table>
    `;

    // Add business-specific information if available
    if (req.body.businessName || req.body.businessTitle) {
      htmlContent += `
        <h3 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Inquiry About Your Business</h3>
        <table style="width: 100%; margin-bottom: 25px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Business:</td><td style="padding: 8px 0; color: #333;">${req.body.businessName || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Listing:</td><td style="padding: 8px 0; color: #333;">${req.body.businessTitle || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Category:</td><td style="padding: 8px 0; color: #333;">${req.body.listingCategory || 'Not specified'}</td></tr>
        </table>
      `;
    }

    // Add message if provided
    if (message) {
      htmlContent += `
        <h3 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Customer Message</h3>
        <div style="background-color: #f8f9fa; padding: 20px; border-left: 5px solid #e74c3c; border-radius: 5px; margin-bottom: 25px;">
          <p style="margin: 0; color: #333; line-height: 1.6; font-size: 16px;">${message}</p>
        </div>
      `;
    }

    // Add footer
    htmlContent += `
        <!-- Next Steps -->
        <div style="background-color: #f1f2f6; padding: 20px; border-radius: 8px; margin-top: 30px;">
          <h3 style="color: #333; margin-top: 0;">Next Steps:</h3>
          <ul style="color: #555; line-height: 1.6;">
            <li>Reply directly to this email to contact the customer</li>
            <li>The customer's email (${email}) is set as the reply-to address</li>
            <li>Respond promptly to provide excellent service</li>
          </ul>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            This lead was generated through <strong style="color: #e74c3c;">San Luis Way</strong> -
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #e74c3c; text-decoration: none;">www.sanluisway.com</a>
          </p>
        </div>
        </div>
      </div>
    `;

    // Try to send email using Supabase's email service
    try {
      const emailSubject = `🔥 New Customer Lead from San Luis Way - ${name}`;
      const businessEmail = to || 'info@sanluisway.com';

      const emailData = {
        to: businessEmail,
        from: 'San Luis Way <info@sanluisway.com>',
        replyTo: email,
        subject: emailSubject,
        html: htmlContent
      };

      const emailResult = await sendEmailViaSupabase(supabase, emailData);

      return res.status(200).json({
        message: 'Contact inquiry received and email sent successfully via Supabase',
        data: {
          contact_id: contactResult.id,
          customer_name: name,
          customer_email: email,
          business_email: businessEmail,
          created_at: contactResult.created_at,
          email_sent: true,
          email_method: emailResult.method
        }
      });

    } catch (emailError) {
      console.error('Error sending email via Supabase:', emailError);

      // Still return success since contact was saved
      return res.status(200).json({
        message: 'Contact inquiry saved successfully, but email notification failed',
        data: {
          contact_id: contactResult.id,
          customer_name: name,
          customer_email: email,
          business_email: to || 'info@sanluisway.com',
          created_at: contactResult.created_at,
          email_sent: false,
          email_error: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        note: 'Email will be sent when Supabase email service is properly configured'
      });
    }

  } catch (error) {
    console.error('Error processing contact inquiry:', error);
    return res.status(500).json({
      message: 'Failed to process contact inquiry',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}