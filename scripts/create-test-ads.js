const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTestAd() {
  console.log('Creating test sponsor ad...');

  const testAd = {
    name: 'Test Banner Ad',
    description: 'A test ad to verify the system works',
    ad_type: 'html',
    html_content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center;"><strong>🎉 This is a Test Ad!</strong><br/><a href="https://example.com" style="color: #3b82f6;">Click here</a></div>',
    placement: 'middle',
    active: true,
    priority: 10
  };

  const { data, error } = await supabase
    .from('sponsor_ads')
    .insert([testAd])
    .select()
    .single();

  if (error) {
    console.error('Error creating test ad:', error);
    return;
  }

  console.log('Test ad created successfully:', data);

  // Create ads for all placements
  const placements = ['top', 'middle', 'bottom'];
  for (const placement of placements) {
    const ad = {
      name: `Test Ad - ${placement.toUpperCase()}`,
      description: `Test ad for ${placement} placement`,
      ad_type: 'html',
      html_content: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 8px; text-align: center; color: white;"><strong>Test Ad for ${placement.toUpperCase()} Placement</strong><br/><a href="https://example.com" style="color: #fef08a;">Visit Sponsor</a></div>`,
      placement,
      active: true,
      priority: 5
    };

    const { data: placementAd, error: placementError } = await supabase
      .from('sponsor_ads')
      .insert([ad])
      .select()
      .single();

    if (placementError) {
      console.error(`Error creating ${placement} ad:`, placementError);
    } else {
      console.log(`Created ${placement} ad:`, placementAd.id);
    }
  }

  console.log('\nTest ads created. Check the Sponsor Ads tab in admin.');
}

createTestAd();
