-- Migration: Add English translations for key blog posts
-- Created: 2025-12-04

-- Rental guide: Guía Completa: Rentar Casa en San Luis Potosí 2025
UPDATE public.blog_posts
SET
  title_en = 'Complete Guide: Renting a House in San Luis Potosí 2025',
  excerpt_en = 'Discover everything you need to know to rent the perfect house in San Luis Potosí in 2025: prices by area, requirements, a step-by-step process, and negotiation tips.',
  content_en = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">In this Guide</h2>
  <ul class="list-disc pl-6">
    <li><a href="#market-overview" class="text-blue-600 hover:text-blue-800">2025 Rental Market Overview</a></li>
    <li><a href="#requirements" class="text-blue-600 hover:text-blue-800">Documents and Financial Requirements</a></li>
    <li><a href="#process" class="text-blue-600 hover:text-blue-800">Step-by-Step Rental Process</a></li>
    <li><a href="#inspection" class="text-blue-600 hover:text-blue-800">Property Inspection Checklist</a></li>
    <li><a href="#legal" class="text-blue-600 hover:text-blue-800">Key Legal Points in the Contract</a></li>
    <li><a href="#negotiation" class="text-blue-600 hover:text-blue-800">Negotiation Strategies</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8">
    Renting a house in San Luis Potosí can be simple if you understand the market, prepare your documents,
    and follow a clear process. This guide walks you through everything you need to know for 2025.
  </p>

  <section id="market-overview" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">2025 Rental Market Overview</h2>
    <p class="text-gray-700 mb-6">
      San Luis Potosí has become one of the most attractive cities in Mexico for both locals and expats thanks
      to its growing job market and high quality of life at relatively accessible prices.
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Area</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Average Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Villa Campestre</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$463 MXN</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Developing, budget-friendly area</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Valle Dorado</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$669 MXN</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emerging residential neighborhood</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alto Lago</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,440 MXN</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mid-high income area with full services</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Club de Golf La Loma</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2,829 MXN</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Premium area with luxury amenities</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
      <p class="text-blue-800">
        <strong>Expert Tip:</strong> Prices can vary depending on the season. The best time to find deals is
        usually between September and November.
      </p>
    </div>
  </section>

  <section id="requirements" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Documents and Financial Requirements</h2>

    <h3 class="text-2xl font-semibold mb-4 text-blue-900">Basic Documents</h3>
    <ul class="list-disc pl-6 mb-6">
      <li>Valid official ID</li>
      <li>Proof of income (last 3 months)</li>
      <li>Work references</li>
      <li>Proof of address</li>
    </ul>

    <h3 class="text-2xl font-semibold mb-4 text-blue-900">Financial Requirements</h3>
    <ul class="list-disc pl-6 mb-6">
      <li>Security deposit (1–2 months of rent)</li>
      <li>First month of rent in advance</li>
      <li>Co-signer or guarantor in some cases</li>
      <li>Monthly income typically 3x the rent</li>
    </ul>
  </section>

  <section id="process" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Step-by-Step Rental Process</h2>
    <ol class="list-decimal pl-6 space-y-3 text-gray-700">
      <li><strong>Research and Search:</strong> Define your budget, preferred area, and must-have features.</li>
      <li><strong>Contact Owners or Agents:</strong> Use local platforms or trusted agents.</li>
      <li><strong>Visit the Property:</strong> Inspect the home carefully (see checklist below).</li>
      <li><strong>Negotiate:</strong> Talk about price, contract length, and included services.</li>
      <li><strong>Sign the Contract:</strong> Read all terms thoroughly before signing.</li>
    </ol>
  </section>

  <section id="inspection" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Property Inspection Checklist</h2>

    <h3 class="text-2xl font-semibold mb-4 text-blue-900">Installations</h3>
    <ul class="list-disc pl-6 mb-4">
      <li>Check all faucets and water pressure</li>
      <li>Verify electrical outlets and lighting</li>
      <li>Inspect gas installations (if applicable)</li>
      <li>Test drains and pipes</li>
      <li>Confirm that doors and windows open and close properly</li>
    </ul>

    <h3 class="text-2xl font-semibold mb-4 text-blue-900">Structure and Common Areas</h3>
    <ul class="list-disc pl-6 mb-4">
      <li>Look for cracks or humidity on walls and ceilings</li>
      <li>Check the condition of floors</li>
      <li>Evaluate building security and access</li>
      <li>Review parking availability</li>
    </ul>
  </section>

  <section id="legal" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Key Legal Points in the Contract</h2>
    <ul class="list-disc pl-6 text-gray-700 space-y-2">
      <li>Contract length (typically at least 1 year)</li>
      <li>Rules on annual rent increases</li>
      <li>Early termination conditions</li>
      <li>Responsibility for maintenance and repairs</li>
      <li>Pet policies and restrictions</li>
    </ul>
  </section>

  <section id="negotiation" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Negotiation Strategies</h2>
    <ul class="list-disc pl-6 text-gray-700 space-y-2">
      <li><strong>Do your research:</strong> Compare prices in the same area before you negotiate.</li>
      <li><strong>Offer stability:</strong> Longer contracts can sometimes secure a better monthly rate.</li>
      <li><strong>Timing matters:</strong> Low season can be the best moment to ask for discounts.</li>
    </ul>
  </section>
</div>
$BODY$
WHERE slug = 'guia-completa-rentar-casa-san-luis-potosi-2025';


-- Checklist Mudanza: 15 Pasos para Relocación a SLP
UPDATE public.blog_posts
SET
  title_en = 'Moving Checklist: 15 Steps for Relocating to San Luis Potosí',
  excerpt_en = 'A practical 15-step checklist to organize your move to San Luis Potosí from start to finish: documents, housing, services, and cultural adaptation.',
  content_en = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Guide Overview</h2>
  <ul class="list-disc pl-6">
    <li><a href="#before-you-move" class="text-blue-600 hover:text-blue-800">Before You Move: Planning Steps</a></li>
    <li><a href="#legal-docs" class="text-blue-600 hover:text-blue-800">Legal Documents and Government Requirements</a></li>
    <li><a href="#housing-services" class="text-blue-600 hover:text-blue-800">Housing and Moving Services</a></li>
    <li><a href="#adaptation" class="text-blue-600 hover:text-blue-800">Adapting to Life in San Luis Potosí</a></li>
    <li><a href="#final-steps" class="text-blue-600 hover:text-blue-800">Final Steps</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8">
    Moving to San Luis Potosí can be much easier if you follow an organized plan.
    This checklist gives you the key steps to manage your relocation from beginning to end.
  </p>

  <div class="bg-blue-50 p-6 rounded-lg mb-8">
    <h3 class="text-lg font-semibold mb-4 text-blue-900">Summary of Main Steps</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>Research San Luis Potosí:</strong> Learn about neighborhoods, climate, and housing options.</li>
      <li><strong>Set a budget and timeline:</strong> Estimate how much you''ll spend on moving, rent, and setup.</li>
      <li><strong>Pack smart:</strong> Donate what you don''t need, label boxes clearly, and prepare an essentials box.</li>
      <li><strong>Handle legal documents:</strong> Apply for your visa and residence at the National Migration Institute (INM).</li>
      <li><strong>Open a bank account:</strong> Choose a bank that matches your needs and prepare the required documents.</li>
      <li><strong>Health insurance:</strong> Decide between public options like IMSS and private insurance.</li>
      <li><strong>Find housing:</strong> Explore areas that fit your lifestyle and budget.</li>
      <li><strong>Set up basic services:</strong> Connect electricity, water, gas, and internet.</li>
      <li><strong>Adapt to the language and culture:</strong> Learn Spanish and local customs.</li>
      <li><strong>Schools for children:</strong> Prepare translated and apostilled documents.</li>
      <li><strong>Build your community:</strong> Join local groups and activities to make new connections.</li>
    </ol>
  </div>

  <section id="before-you-move" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Before You Move: Planning Steps</h2>
    <p class="text-gray-700 mb-6">
      Good preparation before leaving your current home is essential to avoid complications.
      These first steps will help you lay the foundation for a smooth move to San Luis Potosí.
    </p>

    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-4 text-blue-900">Get to Know San Luis Potosí</h3>
      <p class="mb-4">
        Learn about the city''s climate, cost of living, and transport options. Research different areas to understand
        which neighborhoods are best for families, professionals, or retirees.
      </p>
      <p class="mb-4">
        Housing costs can vary widely depending on the area, from more affordable zones near the industrial corridor
        to premium neighborhoods like La Loma Golf.
      </p>
      <p>
        If you don''t speak Spanish yet, make language learning part of your relocation plan. It will make daily life,
        paperwork, and local integration much easier.
      </p>
    </div>
  </section>

  <section id="legal-docs" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Legal Documents and Government Requirements</h2>
    <p class="text-gray-700 mb-6">
      Fulfilling legal and immigration requirements is essential for living and working in San Luis Potosí.
      Skipping any of these steps can create delays or legal issues.
    </p>
    <ul class="list-disc pl-6 space-y-2 text-gray-700">
      <li>Confirm which visa or residency type fits your situation.</li>
      <li>Start the visa process early at a Mexican consulate in your country.</li>
      <li>Gather and translate birth certificates, marriage certificates, and other official documents if needed.</li>
      <li>Keep digital and physical copies of all your documents.</li>
    </ul>
  </section>

  <section id="housing-services" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Housing and Moving Services</h2>
    <p class="text-gray-700 mb-6">
      Decide whether you will hire a full-service moving company or manage a more budget-friendly, do-it-yourself move.
      Compare quotes, check reviews, and confirm what is included in each service.
    </p>
    <ul class="list-disc pl-6 space-y-2 text-gray-700">
      <li>Schedule moving dates and coordinate with your landlord in both locations.</li>
      <li>Confirm delivery dates and insurance coverage with the moving company.</li>
      <li>Prepare an inventory of your belongings for customs and insurance purposes.</li>
    </ul>
  </section>

  <section id="adaptation" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Adapting to Life in San Luis Potosí</h2>
    <p class="text-gray-700 mb-6">
      Once you arrive, give yourself time to adjust. Explore the city, discover local markets, try regional food,
      and start building routines that make you feel at home.
    </p>
    <ul class="list-disc pl-6 space-y-2 text-gray-700">
      <li>Register with a local doctor and learn where hospitals and clinics are located.</li>
      <li>Learn basic local expressions and customs to connect more easily with neighbors.</li>
      <li>Identify safe routes for walking, driving, or using public transport.</li>
    </ul>
  </section>

  <section id="final-steps" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Final Steps</h2>
    <p class="text-gray-700 mb-4">
      When most of the move is complete, focus on the details: update your address with banks, subscriptions, and
      official entities, and make sure all contracts and services are in your name.
    </p>
    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
      <p class="text-green-800 font-medium">
        ✅ Follow these steps to keep your relocation organized and stress-free. San Luis Potosí is ready to welcome you.
      </p>
    </div>
  </section>
</div>
$BODY$
WHERE id = '91465890-a86f-4f79-9768-81d4ed2eba99';


-- La Gran Vía blog post
UPDATE public.blog_posts
SET
  title_en = 'La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí',
  excerpt_en = 'Discover the history and flavors of La Gran Vía, an iconic Spanish restaurant in the heart of San Luis Potosí.',
  content_en = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Discover La Gran Vía</h2>
  <ul class="list-disc pl-6">
    <li><a href="#history" class="text-blue-600 hover:text-blue-800">Our Story</a></li>
    <li><a href="#culinary-excellence" class="text-blue-600 hover:text-blue-800">Culinary Excellence</a></li>
    <li><a href="#specialties" class="text-blue-600 hover:text-blue-800">House Specialties</a></li>
    <li><a href="#recognition" class="text-blue-600 hover:text-blue-800">Awards and Recognition</a></li>
    <li><a href="#visit-us" class="text-blue-600 hover:text-blue-800">Visit Us</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8">
    Experience more than 36 years of Spanish culinary tradition at La Gran Vía, one of the most emblematic
    restaurants in San Luis Potosí. Enjoy authentic Spanish cuisine with a local touch in a warm, elegant setting.
  </p>

  <section id="history" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Our Story</h2>
    <p class="text-gray-700 mb-6">
      Founded in 1979, La Gran Vía has been a cornerstone of Spanish cuisine in San Luis Potosí for decades.
      What began as a passion for authentic Spanish food has grown into a culinary institution that balances
      tradition with innovation.
    </p>
  </section>

  <section id="culinary-excellence" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Culinary Excellence</h2>
    <p class="text-gray-700 mb-6">
      At La Gran Vía we are committed to quality and authenticity. Our kitchen combines original Spanish recipes
      with carefully selected local ingredients, creating a unique fusion of Mediterranean flavors and the rich
      culinary heritage of the Potosino highlands.
    </p>
  </section>

  <section id="specialties" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Our Specialties</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-blue-900">Spanish Classics</h3>
        <p class="text-blue-800 mb-3">Authentic dishes that showcase the best of Spanish cuisine:</p>
        <ul class="list-disc pl-6 space-y-2 text-blue-700">
          <li>Traditional paellas</li>
          <li>Regional Spanish specialties</li>
          <li>Mediterranean-inspired dishes</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-green-900">Local Fusion</h3>
        <p class="text-green-800 mb-3">
          Creative combinations that blend Spanish recipes with flavors from San Luis Potosí.
        </p>
        <ul class="list-disc pl-6 space-y-2 text-green-700">
          <li>Regional adaptations</li>
          <li>Dishes with local ingredients</li>
          <li>Unique fusion creations</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="recognition" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Awards and Recognition</h2>
    <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg mb-6">
      <div class="text-center">
        <h3 class="text-2xl font-bold mb-4 text-orange-900">100 Must-Visit Places in Mexico</h3>
        <p class="text-lg text-orange-800 mb-4">
          In 2017, La Gran Vía received the prestigious recognition of being named one of Mexico''s
          100 must-visit places in the gastronomy category.
        </p>
      </div>
    </div>
  </section>

  <section id="visit-us" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Visit Us</h2>
    <p class="text-gray-700 mb-4">
      We invite you to experience the best Spanish cuisine in San Luis Potosí. Whether it''s a business lunch,
      a romantic dinner, or a family celebration, La Gran Vía offers a memorable culinary experience.
    </p>
  </section>
</div>
$BODY$
WHERE slug = 'la-gran-via';


-- Corazón de Xoconostle blog post
UPDATE public.blog_posts
SET
  title_en = 'Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí',
  excerpt_en = 'Discover Corazón de Xoconostle, a leading adventure tourism company offering unforgettable outdoor experiences across San Luis Potosí.',
  content_en = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">In this Adventure Guide</h2>
  <ul class="list-disc pl-6">
    <li><a href="#about" class="text-blue-600 hover:text-blue-800">About Corazón de Xoconostle</a></li>
    <li><a href="#destinations" class="text-blue-600 hover:text-blue-800">Featured Destinations</a></li>
    <li><a href="#experiences" class="text-blue-600 hover:text-blue-800">Upcoming Experiences</a></li>
    <li><a href="#expertise" class="text-blue-600 hover:text-blue-800">Our Expertise</a></li>
    <li><a href="#booking" class="text-blue-600 hover:text-blue-800">How to Book</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8">
    Corazón de Xoconostle is the leading adventure tourism company in San Luis Potosí, offering guided tours,
    outdoor experiences, and unforgettable trips through some of the most impressive landscapes in Mexico.
  </p>

  <section id="about" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">About Corazón de Xoconostle</h2>
    <p class="text-gray-700 mb-6">
      Founded in 2014, Corazón de Xoconostle has grown from a local hospitality project into the region''s
      leading adventure tourism company. With over a decade of experience, their certified guides and travel
      experts create unforgettable outdoor experiences that combine adventure, culture, and natural beauty.
    </p>
  </section>

  <section id="destinations" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Featured Destinations</h2>
    <ul class="list-disc pl-6 space-y-2 text-gray-700">
      <li><strong>Real de Catorce:</strong> A magical town with cobblestone streets and mining history.</li>
      <li><strong>Huasteca Potosina:</strong> A natural paradise filled with waterfalls, rivers, and lush landscapes.</li>
      <li><strong>Sierra de San Miguelito:</strong> Mountain scenery perfect for hiking and outdoor exploration.</li>
    </ul>
  </section>

  <section id="experiences" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Upcoming Experiences</h2>
    <p class="text-gray-700 mb-4">
      From day trips to multi-day expeditions, Corazón de Xoconostle offers experiences tailored to different
      levels of adventure and comfort.
    </p>
    <ul class="list-disc pl-6 space-y-2 text-gray-700">
      <li>Day tours to Real de Catorce and Sierra de San Miguelito</li>
      <li>Extended adventures in the Huasteca Potosina</li>
      <li>Custom itineraries for families, corporate groups, and adventure seekers</li>
    </ul>
  </section>

  <section id="expertise" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Our Expertise and Certifications</h2>
    <p class="text-gray-700 mb-4">
      The team at Corazón de Xoconostle includes certified guides and specialists in mountain sports, climbing,
      and eco-tourism. Safety, respect for nature, and authentic cultural connection are at the heart of every tour.
    </p>
  </section>

  <section id="booking" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Start Your Adventure</h2>
    <p class="text-gray-700 mb-4">
      Visit their office in the historic center of San Luis Potosí or contact them via WhatsApp or email
      to plan your next adventure.
    </p>
  </section>
</div>
$BODY$
WHERE slug = 'corazon-de-xoconostle';



