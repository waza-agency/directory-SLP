const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const translations = {
  "Guía Completa: Rentar Casa en San Luis Potosí 2025": {
    title_en: "Complete Guide: Renting a House in San Luis Potosí 2025",
    excerpt_en: "Everything you need to know to find and rent the perfect house in San Luis Potosí in 2025.",
    content_en: `
      <h2 class="text-2xl font-semibold mb-4">Table of Contents</h2>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>2025 Rental Market Overview</li>
        <li>Requirements to Rent</li>
        <li>Step-by-Step Process</li>
        <li>Inspection Checklist</li>
        <li>Legal Aspects of the Contract</li>
        <li>Negotiation Strategies</li>
        <li>Frequently Asked Questions</li>
      </ul>
      <p class="mb-6">Discover everything you need to know to find and rent the perfect house in San Luis Potosí in 2025.</p>
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4">Key Points of this Guide</h3>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Updated 2025 Prices:</strong> From $463 MXN in Villa Campestre to $2,829 MXN at Club de Golf La Loma.</li>
          <li><strong>Complete Requirements:</strong> Documents, guarantees, and necessary financial requirements.</li>
          <li><strong>Detailed Process:</strong> Specific steps from the search to signing the contract.</li>
        </ul>
      </div>
    `
  },
  "La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí": {
    title_en: "La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí",
    excerpt_en: "Discover the history and flavors of La Gran Vía, an icon of Spanish food in the heart of San Luis Potosí.",
    content_en: `
      <p>La Gran Vía is not just a restaurant; it's a piece of Madrid in the heart of San Luis Potosí. For decades, it has been the benchmark for Spanish cuisine in the city, offering a unique experience that combines tradition, flavor, and a cozy atmosphere. From its famous tapas to its exquisite paellas, every dish at La Gran Vía tells a story of passion for good food.</p>
      <p>Whether for a business lunch, a romantic dinner, or a family gathering, La Gran Vía offers the perfect setting. Its classic decor and exceptional service will transport you to the most traditional corners of Spain. Don't miss the opportunity to taste their acclaimed Iberian ham or enjoy a glass of Rioja from their select wine cellar.</p>
    `
  },
  "Checklist Mudanza: 15 Pasos para Relocación a SLP": {
    title_en: "Moving Checklist: 15 Steps for Relocating to SLP",
    excerpt_en: "A complete 15-step checklist to ensure your move to San Luis Potosí is organized, stress-free, and successful.",
    content_en: `
      <h2 class="text-2xl font-semibold mb-4">Your Complete Moving Checklist</h2>
      <p class="mb-6">Moving to a new city can be overwhelming. This 15-step checklist will help you manage the process efficiently, from planning to settling in.</p>
      <ol class="list-decimal list-inside space-y-3">
        <li><strong>Research and Budget:</strong> Investigate neighborhoods and establish a moving budget.</li>
        <li><strong>Declutter:</strong> Decide what to keep, sell, or donate.</li>
        <li><strong>Hire a Moving Company:</strong> Get quotes and book in advance.</li>
        <li><strong>Notify Important Parties:</strong> Update your address with banks, subscriptions, and authorities.</li>
        <li><strong>Pack Strategically:</strong> Label boxes by room and content.</li>
        <li><strong>Arrange Utilities:</strong> Schedule disconnection and connection of services.</li>
        <li><strong>Prepare an Essentials Box:</strong> Keep critical items handy for the first few days.</li>
        <li><strong>Final Cleaning:</strong> Leave your old home clean.</li>
        <li><strong>Confirm Logistics:</strong> Double-check dates and times with the moving company.</li>
        <li><strong>Moving Day:</strong> Supervise the loading and unloading process.</li>
        <li><strong>First Night:</strong> Set up beds and basic necessities.</li>
        <li><strong>Unpack and Organize:</strong> Tackle one room at a time.</li>
        <li><strong>Explore Your New Neighborhood:</strong> Locate essential services like supermarkets and pharmacies.</li>
        <li><strong>Update Documentation:</strong> Register your new address if necessary.</li>
        <li><strong>Settle In and Enjoy:</strong> Discover what your new city has to offer.</li>
      </ol>
    `
  },
  "Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí": {
    title_en: "Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí",
    excerpt_en: "Explore Corazón de Xoconostle, a unique destination offering mezcal, gastronomy, and unforgettable experiences in the Potosino highlands.",
    content_en: `
      <p>Corazón de Xoconostle is more than a tourist destination; it's an experience that awakens the senses. Located in the picturesque Potosino highlands, this place offers a perfect combination of tradition, nature, and adventure. Here, you can learn about the artisanal mezcal production process, from the agave fields to the distillery, and taste varieties you won't find anywhere else.</p>
      <p>The culinary offerings are equally impressive, with dishes that highlight local ingredients and ancestral recipes. In addition to gastronomy, Corazón de Xoconostle invites you to explore its surroundings through guided hikes, horseback riding, and stargazing nights. It is the ideal starting point for those looking to connect with the culture and nature of San Luis Potosí.</p>
    `
  },
  "San Luis Rey: The Perfect Way to Discover Our Historic City": {
    title_en: "San Luis Rey: The Perfect Way to Discover Our Historic City",
    excerpt_en: "Hop on the San Luis Rey tourist tram and explore the history, legends, and most iconic corners of the historic center of San Luis Potosí.",
    content_en: `
      <p>The San Luis Rey tourist tram is a unique experience for discovering the magic of San Luis Potosí's historic center. As you ride through its cobbled streets, you will be transported back in time while an expert guide narrates the stories and legends that have shaped the city. The tour covers the most emblematic points, from the majestic Plaza de Armas to the impressive Templo del Carmen.</p>
      <p>It's the perfect activity for all ages, offering a comfortable and entertaining perspective of the city's cultural richness. You will discover architectural details that often go unnoticed and learn secrets that only the locals know. Don't miss this opportunity to see San Luis Potosí with new eyes.</p>
    `
  }
};

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set. Please check your .env file.');
    return;
  }

  console.log('Fetching all blog posts...');
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title');

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  if (!posts) {
    console.log('No posts found.');
    return;
  }

  console.log(`Found ${posts.length} posts. Starting translation update...`);

  for (const post of posts) {
    const translation = translations[post.title];
    if (translation) {
      try {
        console.log(`Updating post: "${post.title}"...`);

        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({
            title_en: translation.title_en,
            content_en: translation.content_en,
            excerpt_en: translation.excerpt_en,
          })
          .eq('id', post.id);

        if (updateError) {
          console.error(`Error updating post ${post.id} ("${post.title}"):`, updateError.message);
        } else {
          console.log(`Successfully updated post: "${post.title}"`);
        }
      } catch (e) {
        console.error(`Failed to process post ${post.id}:`, e.message);
      }
    } else {
      console.warn(`No translation found for post: "${post.title}"`);
    }
  }

  console.log('Translation update script finished.');
}

main().catch(console.error);