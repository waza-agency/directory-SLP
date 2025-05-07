// This script fixes the issue with subscriptions appearing inactive
// while they're active in Stripe and Supabase.
// It also ensures business listings are properly linked to business profiles.

const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stats = {
  total: 0,
  updated: 0,
  alreadyCorrect: 0,
  stripeUpdated: 0,
  errors: 0
};

// Helper function to safely convert Unix timestamp to ISO string
function safeTimestampToISOString(timestamp) {
  if (!timestamp) return new Date().toISOString();
  
  try {
    // Ensure timestamp is a number and within valid range
    const numTimestamp = Number(timestamp);
    if (isNaN(numTimestamp) || numTimestamp <= 0) {
      return new Date().toISOString();
    }
    
    // Convert seconds to milliseconds if needed
    const milliseconds = numTimestamp < 10000000000 ? numTimestamp * 1000 : numTimestamp;
    
    // Create a valid date object (add 1 day to avoid timezone issues)
    const date = new Date(milliseconds);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    
    return date.toISOString();
  } catch (error) {
    console.error('Error converting timestamp to ISO string:', error);
    return new Date().toISOString();
  }
}

async function syncSubscriptionsToProfiles() {
  try {
    console.log('Starting subscription synchronization...');
    
    // Get all business profiles first, including those with no active subscription
    console.log('Fetching all business profiles...');
    const { data: businessProfiles, error: profilesError } = await supabase
      .from('business_profiles')
      .select('id, user_id, subscription_status, stripe_customer_id, subscription_id');
    
    if (profilesError) {
      console.error('Error fetching business profiles:', profilesError);
      return;
    }
    
    console.log(`Found ${businessProfiles.length} business profiles to process`);
    stats.total = businessProfiles.length;

    // Process each business profile
    for (const profile of businessProfiles) {
      try {
        console.log(`Processing business profile ${profile.id} for user ${profile.user_id}`);
        
        // Step 1: Check if there's an active subscription in the subscriptions table
        const { data: subscriptionData, error: subError } = await supabase
          .from('subscriptions')
          .select('id, user_id, status, stripe_subscription_id, stripe_customer_id, current_period_start, current_period_end')
          .eq('user_id', profile.user_id)
          .eq('status', 'active')
          .maybeSingle();
        
        if (subError && subError.code !== 'PGRST116') {
          console.error(`Error fetching subscription for user ${profile.user_id}:`, subError);
          stats.errors++;
          continue;
        }
        
        let hasActiveSubscription = false;
        let stripeCustomerId = profile.stripe_customer_id;
        let subscriptionDetails = null;
        
        // If we found an active subscription in the database
        if (subscriptionData) {
          console.log(`- Found active subscription in database: ${subscriptionData.id}`);
          hasActiveSubscription = true;
          stripeCustomerId = subscriptionData.stripe_customer_id;
          subscriptionDetails = subscriptionData;
        } 
        
        // Step 2: If no subscription was found in the database or we want to verify,
        // check directly with Stripe
        if (!hasActiveSubscription || !subscriptionDetails) {
          // If we don't have a Stripe customer ID yet, try to get it from the users table
          if (!stripeCustomerId) {
            const { data: userData } = await supabase
              .from('users')
              .select('stripe_customer_id')
              .eq('id', profile.user_id)
              .single();
              
            if (userData?.stripe_customer_id) {
              stripeCustomerId = userData.stripe_customer_id;
              console.log(`- Found Stripe customer ID from users table: ${stripeCustomerId}`);
            }
          }
          
          // Check with Stripe if we have a customer ID
          if (stripeCustomerId) {
            try {
              const subscriptions = await stripe.subscriptions.list({
                customer: stripeCustomerId,
                status: 'active',
                limit: 1
              });
              
              if (subscriptions.data.length > 0) {
                const stripeSubscription = subscriptions.data[0];
                console.log(`- Found active subscription in Stripe: ${stripeSubscription.id}`);
                
                // We found an active subscription in Stripe
                hasActiveSubscription = true;
                
                // Get the plan ID from our database
                const { data: subData } = await supabase
                  .from('subscriptions')
                  .select('plan_id')
                  .eq('stripe_subscription_id', stripeSubscription.id)
                  .maybeSingle();
                
                const planId = subData?.plan_id;
                
                // If we don't have a plan ID, try to find a default
                if (!planId) {
                  const { data: defaultPlan } = await supabase
                    .from('subscription_plans')
                    .select('id')
                    .limit(1)
                    .single();
                    
                  if (defaultPlan) {
                    console.log(`- Using default plan ID: ${defaultPlan.id}`);
                    subscriptionDetails = {
                      id: stripeSubscription.id,
                      stripe_subscription_id: stripeSubscription.id,
                      status: 'active',
                      current_period_start: safeTimestampToISOString(stripeSubscription.current_period_start),
                      current_period_end: safeTimestampToISOString(stripeSubscription.current_period_end),
                      plan_id: defaultPlan.id
                    };
                  }
                } else {
                  console.log(`- Using plan ID from database: ${planId}`);
                  subscriptionDetails = {
                    id: stripeSubscription.id,
                    stripe_subscription_id: stripeSubscription.id,
                    status: 'active',
                    current_period_start: safeTimestampToISOString(stripeSubscription.current_period_start),
                    current_period_end: safeTimestampToISOString(stripeSubscription.current_period_end),
                    plan_id: planId
                  };
                }
                
                stats.stripeUpdated++;
              }
            } catch (stripeError) {
              console.error(`- Error checking Stripe for user ${profile.user_id}:`, stripeError);
              stats.errors++;
            }
          }
        }
        
        // Step 3: Update the business profile with the subscription status
        if (hasActiveSubscription && subscriptionDetails) {
          if (profile.subscription_status !== 'active') {
            console.log(`- Updating business profile subscription status to 'active'`);
            
            const { error: updateError } = await supabase
              .from('business_profiles')
              .update({
                subscription_status: 'active',
                subscription_id: subscriptionDetails.stripe_subscription_id || subscriptionDetails.id,
                subscription_start_date: subscriptionDetails.current_period_start,
                subscription_end_date: subscriptionDetails.current_period_end,
                stripe_customer_id: stripeCustomerId,
                plan_id: subscriptionDetails.plan_id
              })
              .eq('id', profile.id);
            
            if (updateError) {
              console.error(`- Error updating business profile ${profile.id}:`, updateError);
              stats.errors++;
              continue;
            }
            
            // Also update the users table
            const { error: userUpdateError } = await supabase
              .from('users')
              .update({
                has_active_subscription: true,
                subscription_id: subscriptionDetails.id,
                is_business: true
              })
              .eq('id', profile.user_id);
            
            if (userUpdateError) {
              console.error(`- Error updating user ${profile.user_id}:`, userUpdateError);
              stats.errors++;
              continue;
            }
            
            console.log(`- Successfully updated profile and user subscription status to active`);
            stats.updated++;
          } else {
            console.log(`- Status already correct, no update needed`);
            stats.alreadyCorrect++;
          }
        } else if (profile.subscription_status === 'active') {
          // If the profile is marked as having an active subscription, but we couldn't verify it,
          // leave it as is, but note it for debugging
          console.log(`- Profile has active status but no active subscription was found - NOT changing`);
        }
        
        // Step 4: Check for business listings that should be linked to this profile
        await syncBusinessListings(profile.id, profile.user_id);
      } catch (error) {
        console.error(`Error processing business profile ${profile.id}:`, error);
        stats.errors++;
      }
    }
    
    // Print summary
    console.log('\nSync completed!');
    console.log('Summary:');
    console.log(`  Total business profiles: ${stats.total}`);
    console.log(`  Updated from database: ${stats.updated}`);
    console.log(`  Updated from Stripe: ${stats.stripeUpdated}`);
    console.log(`  Already correct: ${stats.alreadyCorrect}`);
    console.log(`  Errors: ${stats.errors}`);
  } catch (error) {
    console.error('Error in syncSubscriptionsToProfiles:', error);
  }
}

async function syncBusinessListings(businessProfileId, userId) {
  try {
    console.log(`Checking business listings for profile ${businessProfileId}`);
    
    // Get all listings for this business profile
    const { data: listings, error: listingsError } = await supabase
      .from('business_listings')
      .select('id, status, business_id')
      .eq('business_id', businessProfileId);
    
    if (listingsError) {
      console.error(`Error fetching listings for business profile ${businessProfileId}:`, listingsError);
      return;
    }
    
    console.log(`- Found ${listings ? listings.length : 0} listings`);
    
    // Update active_listings_count in business_profiles table
    const activeListingsCount = listings ? listings.filter(l => l.status === 'active').length : 0;
    
    const { error: updateError } = await supabase
      .from('business_profiles')
      .update({ active_listings_count: activeListingsCount })
      .eq('id', businessProfileId);
    
    if (updateError) {
      console.error(`- Error updating active_listings_count for profile ${businessProfileId}:`, updateError);
    } else {
      console.log(`- Updated active_listings_count to ${activeListingsCount}`);
    }
    
    // If there are listings but the subscription status is not active, consider setting it active
    if (activeListingsCount > 0) {
      const { data: profile } = await supabase
        .from('business_profiles')
        .select('subscription_status')
        .eq('id', businessProfileId)
        .single();
        
      if (profile && profile.subscription_status !== 'active') {
        console.log(`- Business has ${activeListingsCount} active listings but subscription is not active. Setting as active.`);
        
        // Get a default plan ID
        const { data: defaultPlan } = await supabase
          .from('subscription_plans')
          .select('id')
          .limit(1)
          .single();
          
        if (defaultPlan) {
          const { error: statusUpdateError } = await supabase
            .from('business_profiles')
            .update({
              subscription_status: 'active',
              plan_id: defaultPlan.id
            })
            .eq('id', businessProfileId);
            
          if (statusUpdateError) {
            console.error(`- Error setting profile subscription status to active:`, statusUpdateError);
          } else {
            console.log(`- Successfully set profile subscription status to active`);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error in syncBusinessListings for profile ${businessProfileId}:`, error);
  }
}

// Execute the sync function
syncSubscriptionsToProfiles()
  .then(() => {
    console.log('Script completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  }); 