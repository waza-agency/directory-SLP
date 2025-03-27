import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

  // Verify reCAPTCHA
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

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });

  try {
    // Verify SMTP connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Build the email content based on available fields
    let htmlContent = `
      <h2>New Contact Form Submission</h2>
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    `;

    // Add Cultural Experience specific fields
    if (experienceType) {
      htmlContent += `
        <h3>Cultural Experience Details</h3>
        <p><strong>Experience Type:</strong> ${experienceType}</p>
        <p><strong>Group Size:</strong> ${groupSize || 'Not specified'}</p>
        <p><strong>Preferred Dates:</strong> ${preferredDates || 'Not specified'}</p>
        <p><strong>Language Preference:</strong> ${languagePreference || 'Not specified'}</p>
        <p><strong>Special Requirements:</strong> ${specialRequirements || 'None'}</p>
      `;
    }

    // Add Relocation Support specific fields
    if (nationality) {
      htmlContent += `
        <h3>Relocation Details</h3>
        <p><strong>Nationality:</strong> ${nationality}</p>
        <p><strong>Current Location:</strong> ${currentLocation}</p>
        <p><strong>Family Size:</strong> ${familySize}</p>
        <p><strong>Planned Move Date:</strong> ${plannedMoveDate}</p>
        <p><strong>Visa Status:</strong> ${visaStatus || 'Not specified'}</p>
        <p><strong>Housing Preference:</strong> ${housingPreference}</p>
        <p><strong>Schooling Needs:</strong> ${schoolingNeeds || 'Not specified'}</p>
        <p><strong>Additional Services:</strong> ${Array.isArray(additionalServices) ? additionalServices.join(', ') : (additionalServices || 'None')}</p>
      `;
    }

    // Add Local Connections specific fields
    if (serviceCategory) {
      htmlContent += `
        <h3>Service Request Details</h3>
        <p><strong>Service Category:</strong> ${serviceCategory}</p>
        <p><strong>Specific Service:</strong> ${specificService}</p>
        <p><strong>Urgency Level:</strong> ${urgencyLevel}</p>
      `;
    }

    // Add message at the end
    if (message) {
      htmlContent += `
        <h3>Additional Information</h3>
        <p>${message}</p>
      `;
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to || 'info@sanluisway.com',
      subject: subject || `New Contact Form Submission - ${service || experienceType || serviceCategory || 'General Inquiry'}`,
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 