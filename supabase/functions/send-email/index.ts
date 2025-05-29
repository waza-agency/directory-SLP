import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Use the standard Supabase environment variables available in Edge Functions
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'https://omxporaecrqsqhzjzvnx.supabase.co'
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    })
  }

  try {
    const { to, subject, html, from = 'San Luis Way <info@sanluisway.com>', replyTo } = await req.json()

    console.log('Sending email via Supabase:', { to, subject, from, replyTo })

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Use our custom PostgreSQL function to send emails
    // This uses the same email infrastructure as Supabase Auth
    const { data: emailResult, error: emailError } = await supabase.rpc('send_custom_email', {
      recipient_email: to,
      email_subject: subject,
      email_html: html,
      sender_name: 'San Luis Way',
      reply_to_email: replyTo || null
    })

    if (emailError) {
      console.error('Supabase email error:', emailError)
      throw new Error(`Failed to send email: ${emailError.message}`)
    }

    console.log('Email queued successfully via Supabase:', emailResult)

    return new Response(JSON.stringify({
      success: true,
      data: emailResult,
      message: 'Email queued successfully and will be sent using Supabase email service'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({
      error: error.message || 'Failed to send email'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
  }
})