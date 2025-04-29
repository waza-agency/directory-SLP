#!/usr/bin/env node

/**
 * This script activates a business subscription by user ID or search term
 * 
 * Usage:
 *   node scripts/activate_subscription.js --search=drunken
 *   OR
 *   node scripts/activate_subscription.js --userId=50f9cb91-9061-4737-beb5-41c584c8dd08
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
let searchTerm = null;
let userId = null;

for (const arg of args) {
  if (arg.startsWith('--search=')) {
    searchTerm = arg.substring('--search='.length);
  } else if (arg.startsWith('--userId=')) {
    userId = arg.substring('--userId='.length);
  }
}

// Check if we have enough info to proceed
if (!searchTerm && !userId) {
  console.error('Error: You must provide either --search=TERM or --userId=ID');
  process.exit(1);
}

async function searchUsers() {
  try {
    console.log('Starting user search...');
    console.log(`Looking for user or business with term: ${searchTerm}`);
    
    // Step 1: Try to find the user first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, email')
      .or(`email.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`)
      .limit(5);
    
    if (userError) {
      console.error('Error searching for users:', userError);
    }
    
    // Step 2: Try to find the business profile
    const { data: businessData, error: businessError } = await supabase
      .from('business_profiles')
      .select('id, user_id, business_name')
      .or(`business_name.ilike.%${searchTerm}%`)
      .limit(5);
    
    if (businessError) {
      console.error('Error searching for business profiles:', businessError);
    }
    
    // Combine results for review
    console.log("\n=== SEARCH RESULTS ===");
    
    if (userData && userData.length > 0) {
      console.log("\nUsers found:");
      userData.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name || 'N/A'}, Email: ${user.email || 'N/A'}, ID: ${user.id}`);
      });
    } else {
      console.log("No users found matching your search term.");
    }
    
    if (businessData && businessData.length > 0) {
      console.log("\nBusiness profiles found:");
      businessData.forEach((business, index) => {
        console.log(`${index + 1}. Business Name: ${business.business_name}, Business ID: ${business.id}, User ID: ${business.user_id}`);
      });
    } else {
      console.log("No business profiles found matching your search term.");
    }
    
    // Get all users for testing
    console.log("\nGetting all users (up to 10):");
    const { data: allUsers, error: allUsersError } = await supabase
      .from('users')
      .select('id, name, email')
      .limit(10);
    
    if (allUsersError) {
      console.error('Error fetching all users:', allUsersError);
    } else if (allUsers && allUsers.length > 0) {
      console.log("\nAll Users (up to 10):");
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name || 'N/A'}, Email: ${user.email || 'N/A'}, ID: ${user.id}`);
      });
    } else {
      console.log("No users found in database.");
    }
    
    // Get all business profiles for testing
    console.log("\nGetting all business profiles (up to 10):");
    const { data: allBusinesses, error: allBusinessesError } = await supabase
      .from('business_profiles')
      .select('id, user_id, business_name')
      .limit(10);
    
    if (allBusinessesError) {
      console.error('Error fetching all business profiles:', allBusinessesError);
    } else if (allBusinesses && allBusinesses.length > 0) {
      console.log("\nAll Business Profiles (up to 10):");
      allBusinesses.forEach((business, index) => {
        console.log(`${index + 1}. Business Name: ${business.business_name}, Business ID: ${business.id}, User ID: ${business.user_id}`);
      });
    } else {
      console.log("No business profiles found in database.");
    }
    
    console.log("\n=== END OF SEARCH RESULTS ===\n");
    
    // Prompt for User ID to update
    console.log("Please provide the User ID to activate subscription for when running the script again.");
    console.log("Example: node scripts/activate_subscription.js --userId=USERID");
  } catch (error) {
    console.error('Error in searchUsers:', error);
  }
}

async function activateSubscription() {
  try {
    console.log('Starting subscription activation...');
    console.log(`Activating subscription for user ID: ${userId}`);
    
    // Step 1: Get user details
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, email, has_active_subscription, account_type')
      .eq('id', userId)
      .single();
    
    if (userError) {
      console.error('Error fetching user:', userError);
      return;
    }
    
    if (!userData) {
      console.error(`No user found with ID: ${userId}`);
      return;
    }
    
    console.log(`User found: ${userData.email || userData.name || userId}`);
    console.log(`Current status: has_active_subscription = ${userData.has_active_subscription}, account_type = ${userData.account_type}`);
    
    // Step 2: Update the user's subscription status directly
    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        has_active_subscription: true,
        account_type: 'business'
      })
      .eq('id', userId);
    
    if (updateUserError) {
      console.error('Error updating user:', updateUserError);
      return;
    }
    
    console.log(`Successfully updated user ${userId} with has_active_subscription = true and account_type = business`);
    
    // Attempt to update business profile dates if it exists - this is secondary
    const { data: businessProfile } = await supabase
      .from('business_profiles')
      .select('id, business_name')
      .eq('user_id', userId)
      .single();
    
    if (businessProfile) {
      console.log(`Found business profile: ${businessProfile.business_name}`);
      
      // Simple update of dates only, no status field
      const now = new Date();
      const endDate = new Date();
      endDate.setDate(now.getDate() + 30); // 30 days from now
      
      try {
        const { error: updateError } = await supabase
          .from('business_profiles')
          .update({
            subscription_start_date: now.toISOString(),
            subscription_end_date: endDate.toISOString()
          })
          .eq('id', businessProfile.id);
        
        if (updateError) {
          console.log('Note: Could not update business profile dates, but this is not critical.');
        } else {
          console.log('Successfully updated business profile subscription dates.');
        }
      } catch (err) {
        console.log('Note: Error updating business profile, but user subscription was activated successfully.');
      }
    }
    
    console.log('\n=== SUBSCRIPTION ACTIVATION SUMMARY ===');
    console.log(`User: ${userData.email}`);
    console.log(`User ID: ${userId}`);
    console.log(`has_active_subscription: TRUE`);
    console.log(`account_type: business`);
    if (businessProfile) {
      console.log(`Business Profile: ${businessProfile.business_name}`);
    }
    console.log('=== ACTIVATION COMPLETE ===');
    console.log('The user should now be able to create listings in the business dashboard.');
    
  } catch (error) {
    console.error('Error in activateSubscription:', error);
  }
}

// Run the appropriate function based on args
if (userId) {
  activateSubscription()
    .then(() => {
      console.log('Script completed.');
    })
    .catch(err => {
      console.error('Unhandled error:', err);
    });
} else {
  searchUsers()
    .then(() => {
      console.log('Script completed.');
    })
    .catch(err => {
      console.error('Unhandled error:', err);
    });
}
