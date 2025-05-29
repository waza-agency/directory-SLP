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

// Function to send email using Resend
async function sendEmailViaResend(emailData: any) {
  try {
    console.log('Sending email via Resend');

    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailData.from,
        to: emailData.to,
        reply_to: emailData.replyTo,
        subject: emailData.subject,
        html: emailData.html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Email sent successfully via Resend:', result);
    return { success: true, method: 'resend', id: result.id };

  } catch (error) {
    console.error('Resend email error:', error);
    throw error;
  }
}

// Function to send email using Gmail/SMTP fallback
async function sendEmailViaSMTP(emailData: any) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Gmail credentials not configured');
    }

    // Dynamic import of nodemailer
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.default.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"San Luis Way" <${process.env.GMAIL_USER}>`,
      to: emailData.to,
      replyTo: emailData.replyTo,
      subject: emailData.subject,
      html: emailData.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully via Gmail:', info.messageId);
    return { success: true, method: 'gmail', id: info.messageId };

  } catch (error) {
    console.error('Gmail email error:', error);
    throw error;
  }
}

// Function to send email with multiple fallbacks
async function sendEmail(emailData: any) {
  const errors: string[] = [];

  // Try Resend first (recommended)
  if (process.env.RESEND_API_KEY) {
    try {
      return await sendEmailViaResend(emailData);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown Resend error';
      errors.push(`Resend: ${errorMsg}`);
      console.log('Resend failed, trying Gmail fallback...');
    }
  }

  // Try Gmail as fallback
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      return await sendEmailViaSMTP(emailData);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown Gmail error';
      errors.push(`Gmail: ${errorMsg}`);
      console.log('Gmail failed, using console logging...');
    }
  }

  // Final fallback: Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('\n' + '='.repeat(80));
    console.log('📧 EMAIL THAT WOULD BE SENT:');
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

  // All methods failed
  throw new Error(`All email methods failed: ${errors.join('; ')}`);
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
    name,
    email,
    phone,
    subject,
    message,
    service,
    to, // This might be provided by frontend, but we'll override with database value
    businessId,
    businessName,
    businessTitle,
    listingCategory,
    // Experience-specific fields
    experienceType,
    groupSize,
    preferredDates,
    languagePreference,
    specialRequirements,
    // Relocation-specific fields
    nationality,
    currentLocation,
    familySize,
    plannedMoveDate,
    visaStatus,
    housingPreference,
    schoolingNeeds,
    additionalServices,
    // Service-specific fields
    serviceCategory,
    specificService,
    urgencyLevel,
    // reCAPTCHA token
    recaptchaToken
  } = req.body;

  // Initialize Supabase client with service role key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch the actual business email from the database if businessId is provided
  let businessEmail = to || 'info@sanluisway.com'; // Default fallback

  if (businessId) {
    try {
      console.log('Fetching business email for businessId:', businessId);

      // First try to get email from business_listings table
      const { data: businessListing, error: listingError } = await supabase
        .from('business_listings')
        .select(`
          email,
          business_profiles!inner (
            email,
            business_name
          )
        `)
        .eq('id', businessId)
        .single();

      if (!listingError && businessListing) {
        // Prefer listing email, then business profile email
        businessEmail = businessListing.email ||
                      businessListing.business_profiles?.email ||
                      'info@sanluisway.com';
        console.log('Found business email from listing:', businessEmail);
      } else {
        // If not found in business_listings, try business_profiles directly
        const { data: businessProfile, error: profileError } = await supabase
          .from('business_profiles')
          .select('email, business_name')
          .eq('id', businessId)
          .single();

        if (!profileError && businessProfile?.email) {
          businessEmail = businessProfile.email;
          console.log('Found business email from profile:', businessEmail);
        } else {
          console.log('No business email found, using fallback');
        }
      }
    } catch (error) {
      console.error('Error fetching business email:', error);
      // Continue with fallback email
    }
  }

  console.log('Final business email to use:', businessEmail);

  // TEMPORARY: Override email for testing with Resend free plan
  // This sends all emails to your verified email but keeps the business email in the content
  const actualEmailTo = process.env.NODE_ENV === 'development' ? 'santiago@waza.baby' : businessEmail;

  if (actualEmailTo !== businessEmail) {
    console.log(`🔄 TESTING MODE: Redirecting email from ${businessEmail} to ${actualEmailTo}`);
  }

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
      business_email: businessEmail,
      service_type: service || experienceType || serviceCategory || 'general',

      // Additional data as JSON
      additional_data: {
        businessId,
        businessName,
        businessTitle,
        listingCategory,
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
            ${actualEmailTo !== businessEmail ?
              `<div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin-top: 10px; border-radius: 4px;">
                <strong>⚠️ TESTING MODE:</strong> This email was originally intended for <strong>${businessEmail}</strong>
              </div>` : ''
            }
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
    if (businessName || businessTitle) {
      htmlContent += `
        <h3 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Inquiry About Your Business</h3>
        <table style="width: 100%; margin-bottom: 25px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Business:</td><td style="padding: 8px 0; color: #333;">${businessName || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Listing:</td><td style="padding: 8px 0; color: #333;">${businessTitle || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Category:</td><td style="padding: 8px 0; color: #333;">${listingCategory || 'Not specified'}</td></tr>
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

    // Try to send email
    try {
      const emailSubject = `🔥 New Customer Lead from San Luis Way - ${name}`;

      const emailData = {
        to: actualEmailTo,
        from: 'San Luis Way <onboarding@resend.dev>', // Will be updated when you configure your domain
        replyTo: email,
        subject: emailSubject,
        html: htmlContent
      };

      const emailResult = await sendEmail(emailData);

      return res.status(200).json({
        message: 'Contact inquiry received and email sent successfully',
        data: {
          contact_id: contactResult.id,
          customer_name: name,
          customer_email: email,
          business_email: businessEmail,
          created_at: contactResult.created_at,
          email_sent: true,
          email_method: emailResult.method,
          email_id: emailResult.id
        }
      });

    } catch (emailError) {
      console.error('Error sending email:', emailError);

      // Still return success since contact was saved
      return res.status(200).json({
        message: 'Contact inquiry saved successfully, but email notification failed',
        data: {
          contact_id: contactResult.id,
          customer_name: name,
          customer_email: email,
          business_email: businessEmail,
          created_at: contactResult.created_at,
          email_sent: false,
          email_error: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        note: 'Please configure RESEND_API_KEY or GMAIL credentials in environment variables'
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