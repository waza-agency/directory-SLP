#!/usr/bin/env node

/**
 * This script activates a business subscription by business_id or user email
 * 
 * Usage:
 *   node scripts/activate-business-subscription.js --email=user@example.com
 *   or
 *   node scripts/activate-business-subscription.js --business-id=123456
 * 
 * Environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL - Supabase URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (requires admin privileges)
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL', 
  'SUPABASE_SERVICE_ROLE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Initialize Supabase with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Parse command line arguments
const args = process.argv.slice(2);
let email = null;
let businessId = null;

for (const arg of args) {
  if (arg.startsWith('--email=')) {
    email = arg.substring('--email='.length);
  } else if (arg.startsWith('--business-id=')) {
    businessId = arg.substring('--business-id='.length);
  }
}

if (!email && !businessId) {
  console.error('Error: You must provide either --email=user@example.com or --business-id=123456');
  process.exit(1);
}

async function activateSubscription() {
  try {
    console.log('Starting subscription activation...');
    
    // First, find the business ID if email was provided
    if (email && !businessId) {
      console.log(`Finding business profile for user with email: ${email}`);
      
      // Get user ID from email
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      
      if (userError) {
        console.error(`Error finding user with email ${email}:`, userError);
        return;
      }
      
      if (!userData) {
        console.error(`No user found with email: ${email}`);
        return;
      }
      
      console.log(`Found user with ID: ${userData.id}`);
      
      // Get business profile from user ID
      const { data: businessData, error: businessError } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', userData.id)
        .single();
      
      if (businessError) {
        console.error(`Error finding business profile for user ${userData.id}:`, businessError);
        return;
      }
      
      if (!businessData) {
        console.error(`No business profile found for user with ID: ${userData.id}`);
        return;
      }
      
      businessId = businessData.id;
      console.log(`Found business profile with ID: ${businessId}`);
    }
    
    // Now we should have a business ID
    console.log(`Activating subscription for business ID: ${businessId}`);
    
    // Set subscription dates
    const today = new Date();
    const subscriptionEnd = new Date();
    subscriptionEnd.setDate(today.getDate() + 30); // 30 days from now
    
    // Update business_profile subscription status
    const { error: updateError } = await supabase
      .from('business_profiles')
      .update({ 
        subscription_status: 'active',
        subscription_start_date: today.toISOString(),
        subscription_end_date: subscriptionEnd.toISOString()
      })
      .eq('id', businessId);
      
    if (updateError) {
      console.error(`Error updating business profile subscription status:`, updateError);
      return;
    }
    
    // Get user_id from business_profile
    const { data: businessData, error: businessError } = await supabase
      .from('business_profiles')
      .select('user_id')
      .eq('id', businessId)
      .single();
    
    if (businessError) {
      console.error(`Error getting user_id from business profile:`, businessError);
      return;
    }
    
    // Update user account type and subscription status
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ 
        account_type: 'business',
        has_active_subscription: true
      })
      .eq('id', businessData.user_id);
      
    if (userUpdateError) {
      console.error(`Error updating user subscription status:`, userUpdateError);
      return;
    }
    
    console.log(`Successfully activated subscription for business ID: ${businessId}`);
    console.log(`User can now access business features until: ${subscriptionEnd.toLocaleString()}`);
    
  } catch (error) {
    console.error('Error in activateSubscription:', error);
  }
}

// Run the activation
activateSubscription()
  .then(() => {
    console.log('Script completed.');
  })
  .catch(err => {
    console.error('Unhandled error:', err);
  }); 