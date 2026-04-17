require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const IMG = require('./slp-vs-sma-image-urls.json');
const SLUG = 'san-luis-potosi-vs-san-miguel-allende-expats-2026';

const contentEN = `<div class="prose prose-lg max-w-none">

<div class="mb-8">
<img src="${IMG.hero}" alt="San Luis Potosí vs San Miguel de Allende comparison" class="w-full rounded-xl shadow-2xl" />
</div>

<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h3 class="text-xl font-bold mb-4 text-gray-900">Table of Contents</h3>
  <ul class="list-disc pl-6">
    <li><a href="#introduction" class="text-blue-600 hover:text-blue-800">Introduction</a></li>
    <li><a href="#quick-comparison" class="text-blue-600 hover:text-blue-800">Quick Comparison Table</a></li>
    <li><a href="#cost-of-living" class="text-blue-600 hover:text-blue-800">Cost of Living</a></li>
    <li><a href="#lifestyle" class="text-blue-600 hover:text-blue-800">Lifestyle &amp; Culture</a></li>
    <li><a href="#food" class="text-blue-600 hover:text-blue-800">Food &amp; Dining</a></li>
    <li><a href="#expat-community" class="text-blue-600 hover:text-blue-800">Expat Community</a></li>
    <li><a href="#safety" class="text-blue-600 hover:text-blue-800">Safety &amp; Healthcare</a></li>
    <li><a href="#pros-cons" class="text-blue-600 hover:text-blue-800">Pros &amp; Cons</a></li>
    <li><a href="#verdict" class="text-blue-600 hover:text-blue-800">Final Verdict</a></li>
    <li><a href="#faq" class="text-blue-600 hover:text-blue-800">FAQ</a></li>
  </ul>
</div>

<div class="bg-blue-50 p-6 rounded-lg mb-8">
  <h3 class="text-xl font-bold mb-4 text-blue-900">Key Takeaways</h3>
  <ul class="list-disc pl-6 space-y-2 text-blue-900">
    <li><strong>Best Value:</strong> San Luis Potosí wins with cost of living 40-50% lower than San Miguel de Allende</li>
    <li><strong>Best for Established Expats:</strong> San Miguel has the largest English-speaking community in Mexico</li>
    <li><strong>Best for Career/Business:</strong> San Luis Potosí offers jobs in BMW, GM, and 300+ international companies</li>
    <li><strong>Best for Retirement:</strong> San Miguel has more English services; SLP has better healthcare infrastructure</li>
    <li><strong>Most Authentic:</strong> San Luis Potosí — less touristy, real Mexican urban life</li>
  </ul>
</div>

<section id="introduction" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Introduction: Two Very Different Mexican Dreams</h2>

<p class="text-gray-700 mb-6"><strong>If you're considering relocating to Mexico's Central Highlands (Bajío), you've probably narrowed your search to San Luis Potosí and San Miguel de Allende.</strong> Both are UNESCO-connected colonial gems, both sit at the perfect altitude for year-round spring weather, and both have transformed dramatically in the past decade.</p>

<p class="text-gray-700 mb-6">But here's the truth most expat forums won't tell you: <strong>these are two completely different cities serving two completely different types of expats.</strong> San Miguel de Allende is a curated, international art colony where you can live for a decade and never learn Spanish. San Luis Potosí is a vibrant, working Mexican capital city of nearly one million people with a growing international business community.</p>

<p class="text-gray-700 mb-6">In this comprehensive 2026 comparison, based on cost-of-living data from Numbeo, expat surveys from International Living, and reporting from local sources, we break down which city is right for your specific situation — whether you're a digital nomad, remote worker, retiree, or career professional.</p>
</section>

<section id="quick-comparison" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Quick Comparison at a Glance</h2>

<div class="overflow-x-auto mb-12">
  <table class="min-w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg">
    <thead style="background: linear-gradient(to right, #9333ea, #db2777);">
      <tr>
        <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Feature</th>
        <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">San Luis Potosí</th>
        <th class="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">San Miguel de Allende</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">Population</td><td class="px-6 py-4 text-center">~1,000,000 (metro)</td><td class="px-6 py-4 text-center">~175,000</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">Altitude</td><td class="px-6 py-4 text-center">1,863 m (6,112 ft)</td><td class="px-6 py-4 text-center">1,911 m (6,270 ft)</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">Monthly rent (1BR center)</td><td class="px-6 py-4 text-center text-green-600 font-bold">$380-550 USD</td><td class="px-6 py-4 text-center">$900-1,500 USD</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">Expat community</td><td class="px-6 py-4 text-center">Growing, diverse</td><td class="px-6 py-4 text-center text-green-600 font-bold">Large, established</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">English prevalence</td><td class="px-6 py-4 text-center">Moderate</td><td class="px-6 py-4 text-center text-green-600 font-bold">Very high</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">International airport</td><td class="px-6 py-4 text-center text-green-600 font-bold">SLP (direct to USA)</td><td class="px-6 py-4 text-center">BJX 1.5 hrs away</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">Authentic Mexican feel</td><td class="px-6 py-4 text-center text-green-600 font-bold">High</td><td class="px-6 py-4 text-center">Tourist-centric</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">Job opportunities</td><td class="px-6 py-4 text-center text-green-600 font-bold">Excellent (BMW, GM, Valeo)</td><td class="px-6 py-4 text-center">Limited (tourism/art)</td></tr>
      <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-semibold">UNESCO status</td><td class="px-6 py-4 text-center">Camino Real (2010)</td><td class="px-6 py-4 text-center">Full site (2008)</td></tr>
      <tr class="bg-green-50 font-medium"><td class="px-6 py-4 font-bold">Best For</td><td class="px-6 py-4 text-center"><span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">💰 Value &amp; Careers</span></td><td class="px-6 py-4 text-center"><span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-500 text-white">🎨 Art &amp; Retirement</span></td></tr>
    </tbody>
  </table>
</div>
</section>

<section id="cost-of-living" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Cost of Living: The Biggest Difference</h2>

<div class="mb-8">
<img src="${IMG['cost-comparison']}" alt="Cost of living comparison SLP vs SMA" class="w-full rounded-xl shadow-lg" />
</div>

<p class="text-gray-700 mb-6">According to Numbeo and Expatistan data from early 2026, <strong>San Miguel de Allende is 40-55% more expensive than San Luis Potosí</strong> for a similar quality of life. The reason is simple: San Miguel has been "discovered" by American and Canadian retirees for over 50 years, driving property values to levels comparable to mid-sized US cities.</p>

<div class="overflow-x-auto mb-8">
<table class="min-w-full bg-white border border-gray-200 rounded-lg">
<thead class="bg-gray-50"><tr>
<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expense (USD/month)</th>
<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">San Luis Potosí</th>
<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">San Miguel de Allende</th>
<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Difference</th>
</tr></thead>
<tbody class="divide-y divide-gray-200">
<tr><td class="px-6 py-4">1-bed apartment (center)</td><td class="px-6 py-4 text-center">$450</td><td class="px-6 py-4 text-center">$1,200</td><td class="px-6 py-4 text-center text-green-600 font-bold">-63%</td></tr>
<tr class="bg-gray-50"><td class="px-6 py-4">3-bed house (nice area)</td><td class="px-6 py-4 text-center">$900</td><td class="px-6 py-4 text-center">$2,400</td><td class="px-6 py-4 text-center text-green-600 font-bold">-63%</td></tr>
<tr><td class="px-6 py-4">Meal at mid-range restaurant</td><td class="px-6 py-4 text-center">$15</td><td class="px-6 py-4 text-center">$28</td><td class="px-6 py-4 text-center text-green-600 font-bold">-46%</td></tr>
<tr class="bg-gray-50"><td class="px-6 py-4">Coffee at a cafe</td><td class="px-6 py-4 text-center">$2.50</td><td class="px-6 py-4 text-center">$4.50</td><td class="px-6 py-4 text-center text-green-600 font-bold">-44%</td></tr>
<tr><td class="px-6 py-4">Groceries (couple, monthly)</td><td class="px-6 py-4 text-center">$280</td><td class="px-6 py-4 text-center">$420</td><td class="px-6 py-4 text-center text-green-600 font-bold">-33%</td></tr>
<tr class="bg-gray-50"><td class="px-6 py-4">Gym membership</td><td class="px-6 py-4 text-center">$25</td><td class="px-6 py-4 text-center">$55</td><td class="px-6 py-4 text-center text-green-600 font-bold">-55%</td></tr>
<tr><td class="px-6 py-4">Uber (10 km ride)</td><td class="px-6 py-4 text-center">$3.50</td><td class="px-6 py-4 text-center">$6.00</td><td class="px-6 py-4 text-center text-green-600 font-bold">-42%</td></tr>
<tr class="bg-green-50 font-bold"><td class="px-6 py-4">Total couple comfortable lifestyle</td><td class="px-6 py-4 text-center text-green-700">~$1,800</td><td class="px-6 py-4 text-center">~$3,500</td><td class="px-6 py-4 text-center text-green-600">-49%</td></tr>
</tbody>
</table>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
<p class="text-yellow-800"><strong>💡 Expert tip:</strong> In San Luis Potosí, a couple can live a genuinely comfortable middle-class Mexican lifestyle on $1,800 USD/month. In San Miguel, you'll need closer to $3,500 USD/month for equivalent quality — and much more to live in the charming Centro neighborhood.</p>
</div>
</section>

<section id="lifestyle" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Lifestyle &amp; Culture</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
<figure>
<div class="rounded-xl overflow-hidden shadow-lg border-4 border-blue-200">
<img src="${IMG['slp-lifestyle']}" alt="San Luis Potosí daily life" class="w-full h-80 object-cover" loading="lazy" />
</div>
<figcaption class="mt-4">
<h4 class="text-xl font-semibold text-blue-900 mb-2">San Luis Potosí</h4>
<p class="text-sm text-gray-600">Living Mexican urban life. Crowded markets, family-run taquerías, modern malls, universities, industrial zones. Feels like a real, working Mexican capital.</p>
</figcaption>
</figure>
<figure>
<div class="rounded-xl overflow-hidden shadow-lg border-4 border-pink-200">
<img src="${IMG['sma-lifestyle']}" alt="San Miguel de Allende daily life" class="w-full h-80 object-cover" loading="lazy" />
</div>
<figcaption class="mt-4">
<h4 class="text-xl font-semibold text-pink-900 mb-2">San Miguel de Allende</h4>
<p class="text-sm text-gray-600">Living a curated experience. Art galleries, yoga studios, farm-to-table restaurants, international film festivals. Feels like a Mediterranean town with Mexican accents.</p>
</figcaption>
</figure>
</div>

<h3 class="text-2xl font-bold mb-4 text-gray-900">San Luis Potosí: Authentic Bajío City Life</h3>
<p class="text-gray-700 mb-6">SLP is the capital of the state of San Luis Potosí, a city with nearly one million inhabitants where you'll experience real Mexican metropolitan life. The historic center — built in pink cantera stone and recognized as part of the UNESCO Camino Real de Tierra Adentro route — sits alongside modern neighborhoods like Lomas and Villa Magna, bustling industrial zones, and top-tier universities (UASLP, Tec de Monterrey, UPSLP).</p>

<p class="text-gray-700 mb-6">Cultural calendar includes the Festival Internacional de San Luis, the Procesión del Silencio during Holy Week (one of Mexico's most important religious processions), and year-round concerts at Teatro de la Paz. The city also has the Centro de las Artes in a reformed penitentiary, multiple international concerts at the Domo San Luis, and an increasingly sophisticated restaurant scene.</p>

<h3 class="text-2xl font-bold mb-4 text-gray-900">San Miguel de Allende: The Art Colony Experience</h3>
<p class="text-gray-700 mb-6">SMA is much smaller — roughly 175,000 inhabitants — and its reputation is built around art, crafts, and a lifestyle designed for international visitors. Travel + Leisure has repeatedly named it "Best City in the World," and that's both its greatest draw and biggest downside: it's almost impossibly charming, but it knows it.</p>

<p class="text-gray-700 mb-6">You'll find world-class art schools (Instituto Allende, Bellas Artes), a jazz and classical music festival, an internationally renowned writers' conference, and hundreds of galleries. The downside: prices reflect the demand, crowds in high season are significant, and many locals have been priced out of the center.</p>
</section>

<section id="food" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Food &amp; Dining Scene</h2>

<div class="mb-8">
<img src="${IMG['food-culture']}" alt="Food comparison SLP vs SMA" class="w-full rounded-xl shadow-lg" />
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
<div class="bg-green-50 border-2 border-green-200 rounded-xl p-6">
<h3 class="text-xl font-bold text-green-900 mb-4">🌮 San Luis Potosí — Authentic Potosino Cuisine</h3>
<ul class="space-y-2 text-green-800">
<li>• <strong>Enchiladas potosinas</strong> (the city's signature dish)</li>
<li>• <strong>Gorditas</strong> stuffed with guisos at Mercado República</li>
<li>• <strong>Asado de boda</strong> (traditional wedding stew)</li>
<li>• <strong>Tacos de cecina</strong> and <strong>tamales</strong> from local markets</li>
<li>• <strong>Craft mezcal</strong> from the Altiplano Potosino region</li>
<li>• Price range: $3-15 USD per meal</li>
</ul>
</div>
<div class="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
<h3 class="text-xl font-bold text-purple-900 mb-4">🍷 San Miguel de Allende — International Fusion</h3>
<ul class="space-y-2 text-purple-800">
<li>• <strong>Farm-to-table concepts</strong> like Zumo, Áperi, La Parada</li>
<li>• <strong>Wine country cuisine</strong> from nearby Dolores Hidalgo and Guanajuato wineries</li>
<li>• <strong>Michelin-level tasting menus</strong> at Áperi</li>
<li>• Artisan coffee roasters on every block</li>
<li>• Strong vegetarian/vegan scene</li>
<li>• Price range: $10-80 USD per meal</li>
</ul>
</div>
</div>
</section>

<section id="expat-community" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Expat Community &amp; Services</h2>

<div class="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
<h3 class="text-2xl font-bold text-gray-900 mb-4">Community Profile Comparison</h3>
<div class="space-y-6">
<div>
<div class="flex justify-between items-center mb-2">
<span class="font-semibold">San Miguel de Allende</span>
<span class="text-2xl font-bold text-purple-600">~10,000-15,000 expats</span>
</div>
<div class="space-y-2">
<div><div class="flex justify-between text-sm mb-1"><span>English-speaking services</span><span>10/10</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-purple-600 h-3 rounded-full" style="width: 100%"></div></div></div>
<div><div class="flex justify-between text-sm mb-1"><span>Community events</span><span>10/10</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-purple-600 h-3 rounded-full" style="width: 100%"></div></div></div>
<div><div class="flex justify-between text-sm mb-1"><span>Spanish immersion</span><span>4/10</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-purple-600 h-3 rounded-full" style="width: 40%"></div></div></div>
</div>
</div>
<div>
<div class="flex justify-between items-center mb-2">
<span class="font-semibold">San Luis Potosí</span>
<span class="text-2xl font-bold text-blue-600">~2,000-3,000 expats</span>
</div>
<div class="space-y-2">
<div><div class="flex justify-between text-sm mb-1"><span>English-speaking services</span><span>6/10</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-blue-600 h-3 rounded-full" style="width: 60%"></div></div></div>
<div><div class="flex justify-between text-sm mb-1"><span>Community events</span><span>7/10</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-blue-600 h-3 rounded-full" style="width: 70%"></div></div></div>
<div><div class="flex justify-between text-sm mb-1"><span>Spanish immersion</span><span>9/10</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-blue-600 h-3 rounded-full" style="width: 90%"></div></div></div>
</div>
</div>
</div>
</div>

<p class="text-gray-700 mb-6">San Miguel's expat population is concentrated in retirees from the USA and Canada, with a significant subset of artists, writers, and wealthy remote workers. The city has English-language newspapers (Atención), English church services, English book clubs, and many professionals (doctors, lawyers, real estate) who work primarily in English.</p>

<p class="text-gray-700 mb-6">San Luis Potosí's expat community is smaller but more diverse: it includes European engineers working at BMW Group, German executives at automotive suppliers, Japanese professionals connected to Toyota's operations, and a growing digital-nomad presence attracted by the low cost and excellent connectivity. Spanish fluency is essentially required for daily life — which is great for immersion, challenging for pure retirement.</p>
</section>

<section id="safety" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Safety &amp; Healthcare</h2>

<div class="overflow-x-auto mb-8">
<table class="min-w-full bg-white border border-gray-200 rounded-lg">
<thead class="bg-gray-50"><tr>
<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">San Luis Potosí</th>
<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">San Miguel de Allende</th>
</tr></thead>
<tbody class="divide-y divide-gray-200">
<tr><td class="px-6 py-4">US State Department advisory (2026)</td><td class="px-6 py-4 text-center">Level 2 — Exercise increased caution</td><td class="px-6 py-4 text-center">Level 2 — Exercise increased caution</td></tr>
<tr class="bg-gray-50"><td class="px-6 py-4">Homicide rate (state)</td><td class="px-6 py-4 text-center">Below national average</td><td class="px-6 py-4 text-center">Below national average</td></tr>
<tr><td class="px-6 py-4">Top private hospital</td><td class="px-6 py-4 text-center">Hospital Ángeles, Star Médica</td><td class="px-6 py-4 text-center">MAC Hospital, H+</td></tr>
<tr class="bg-gray-50"><td class="px-6 py-4">Specialist availability</td><td class="px-6 py-4 text-center text-green-600 font-bold">Excellent</td><td class="px-6 py-4 text-center">Good (major cases go to Querétaro)</td></tr>
<tr><td class="px-6 py-4">English-speaking doctors</td><td class="px-6 py-4 text-center">Moderate</td><td class="px-6 py-4 text-center text-green-600 font-bold">Many</td></tr>
<tr class="bg-gray-50"><td class="px-6 py-4">Private insurance cost (couple 55+)</td><td class="px-6 py-4 text-center">$2,400/yr</td><td class="px-6 py-4 text-center">$3,200/yr</td></tr>
</tbody>
</table>
</div>

<p class="text-gray-700 mb-6">Both cities are considered among the safer destinations in central Mexico. According to data reported by the Mexican National Institute of Statistics (INEGI), both San Luis Potosí's capital and the municipality of San Miguel de Allende have homicide rates well below the national average. Petty crime exists in both (mostly pickpocketing in tourist areas of SMA, occasional car break-ins in SLP neighborhoods).</p>

<p class="text-gray-700 mb-6">Healthcare infrastructure favors San Luis Potosí for serious medical needs — the capital has full-service hospitals like Hospital Ángeles, Star Médica, and Hospital Central with specialists across every discipline. San Miguel has quality primary care but patients with complex conditions often travel to Querétaro (1.5 hrs) or León (1.5 hrs).</p>
</section>

<section id="pros-cons" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Pros &amp; Cons: Head-to-Head</h2>

<h3 class="text-2xl font-bold mb-4 text-blue-900">San Luis Potosí</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
<div class="bg-green-50 border-2 border-green-200 rounded-xl p-6">
<h4 class="text-xl font-bold text-green-900 mb-4">✅ Pros</h4>
<ul class="space-y-3">
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>40-50% cheaper</strong> than SMA for equivalent lifestyle</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Real city amenities:</strong> malls, hospitals, universities, international airport</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Job opportunities</strong> with BMW, GM, Valeo, Continental — 300+ international companies</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Direct flights</strong> to Houston, Dallas, Mexico City from SLP airport</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Less touristy</strong> — authentic Mexican experience</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Huasteca Potosina</strong> — spectacular natural paradise 4 hrs away</p></li>
</ul>
</div>
<div class="bg-red-50 border-2 border-red-200 rounded-xl p-6">
<h4 class="text-xl font-bold text-red-900 mb-4">❌ Cons</h4>
<ul class="space-y-3">
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Spanish required</strong> — limited English services</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Smaller expat community</strong> — less of a ready-made social network</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Industrial pollution</strong> in zones far from the center</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Fewer gourmet/international restaurants</strong> (though scene is growing)</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Traffic congestion</strong> in growing metro area</p></li>
</ul>
</div>
</div>

<h3 class="text-2xl font-bold mb-4 text-purple-900">San Miguel de Allende</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
<div class="bg-green-50 border-2 border-green-200 rounded-xl p-6">
<h4 class="text-xl font-bold text-green-900 mb-4">✅ Pros</h4>
<ul class="space-y-3">
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Largest expat community</strong> in Mexico — instant social network</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>English works</strong> for restaurants, doctors, lawyers, real estate</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>World-class art scene</strong> — galleries, festivals, workshops</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Walkable historic center</strong> — car not needed</p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Superb international cuisine</strong></p></li>
<li class="flex items-start gap-3"><span class="text-green-600 text-xl">•</span><p class="text-green-800"><strong>Ideal for retirees</strong> with established support systems</p></li>
</ul>
</div>
<div class="bg-red-50 border-2 border-red-200 rounded-xl p-6">
<h4 class="text-xl font-bold text-red-900 mb-4">❌ Cons</h4>
<ul class="space-y-3">
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Very expensive</strong> — prices approach US mid-size cities</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Gentrification</strong> — locals priced out of center</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Tourist crowds</strong> during high season and weekends</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Limited job market</strong> outside tourism, art, remote work</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>No airport</strong> — nearest is BJX (1.5 hr drive)</p></li>
<li class="flex items-start gap-3"><span class="text-red-600 text-xl">•</span><p class="text-red-800"><strong>Expat bubble</strong> — easy to never learn Spanish</p></li>
</ul>
</div>
</div>
</section>

<section id="verdict" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">The Final Verdict</h2>

<div class="rounded-2xl p-10 mb-12 shadow-2xl" style="background: linear-gradient(to bottom right, #f3e8ff, #fce7f3, #f3e8ff); border: 4px solid #a855f7;">
<div class="text-center mb-8">
<div class="text-6xl mb-4">🏆</div>
<h3 class="text-2xl font-bold text-gray-900 mb-2">Our Recommendation</h3>
<p class="text-gray-700">Based on lifestyle, budget, and goals</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<div class="bg-white p-6 rounded-xl shadow-lg">
<div class="inline-flex items-center px-4 py-2 text-white font-bold rounded-full text-sm mb-4" style="background: linear-gradient(to right, #60a5fa, #2563eb);">💼 CHOOSE SAN LUIS POTOSÍ IF</div>
<ul class="space-y-2 text-gray-700">
<li>• You want to <strong>work or start a business</strong> in Mexico</li>
<li>• Your budget is <strong>under $2,500 USD/month</strong></li>
<li>• You're a <strong>digital nomad</strong> wanting real Mexican immersion</li>
<li>• You value <strong>healthcare infrastructure</strong> and urban amenities</li>
<li>• You want to <strong>learn Spanish</strong> by necessity</li>
<li>• You need <strong>direct flights</strong> to the USA</li>
</ul>
</div>
<div class="bg-white p-6 rounded-xl shadow-lg">
<div class="inline-flex items-center px-4 py-2 text-white font-bold rounded-full text-sm mb-4" style="background: linear-gradient(to right, #c084fc, #ec4899);">🎨 CHOOSE SAN MIGUEL DE ALLENDE IF</div>
<ul class="space-y-2 text-gray-700">
<li>• You're <strong>retiring</strong> and want English-speaking services</li>
<li>• Your budget is <strong>$3,500+ USD/month</strong></li>
<li>• You're an <strong>artist or creative</strong> seeking community</li>
<li>• You prefer a <strong>small-town, walkable</strong> experience</li>
<li>• You want <strong>instant social network</strong> of fellow expats</li>
<li>• You value <strong>upscale dining</strong> and boutique culture</li>
</ul>
</div>
</div>

<div class="bg-white rounded-xl p-6 text-center">
<p class="text-gray-700 text-lg">
<strong>Our take:</strong> For <strong>working-age professionals and digital nomads</strong>, San Luis Potosí offers significantly better value and real career opportunities while still being a beautiful colonial city. For <strong>retirees with comfortable pensions</strong>, San Miguel de Allende delivers an unmatched English-friendly lifestyle at a premium price.
</p>
</div>
</div>
</section>

<section id="faq" class="mb-12">
<h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Frequently Asked Questions</h2>
<div class="space-y-6">
<div class="bg-white border border-gray-200 rounded-lg p-6">
<h3 class="text-xl font-bold mb-3 text-gray-900">Which city has better weather?</h3>
<p class="text-gray-700">Essentially identical. Both sit at ~1,900m altitude and enjoy spring-like weather year-round with daytime temperatures typically 68-80°F (20-27°C). SMA has slightly cooler nights; SLP slightly warmer days.</p>
</div>
<div class="bg-white border border-gray-200 rounded-lg p-6">
<h3 class="text-xl font-bold mb-3 text-gray-900">Can I live in San Miguel de Allende without speaking Spanish?</h3>
<p class="text-gray-700">Yes. Many expats have lived there for years with minimal Spanish. Services, restaurants, doctors and lawyers often operate in English. Not recommended for long-term fulfillment, but practical if needed.</p>
</div>
<div class="bg-white border border-gray-200 rounded-lg p-6">
<h3 class="text-xl font-bold mb-3 text-gray-900">Is San Luis Potosí good for digital nomads?</h3>
<p class="text-gray-700">Increasingly yes. Fiber internet is widely available (100-500 Mbps), co-working spaces exist in Lomas and Centro, cost of living is excellent, and the airport has direct US flights. The main challenge is the smaller English-speaking community.</p>
</div>
<div class="bg-white border border-gray-200 rounded-lg p-6">
<h3 class="text-xl font-bold mb-3 text-gray-900">Which city is safer?</h3>
<p class="text-gray-700">Both are considered safer than Mexico's national average according to INEGI data. Standard precautions apply. San Miguel's tourist status means more visible security but also more opportunistic crime; SLP is a larger city where choosing the right neighborhood matters.</p>
</div>
<div class="bg-white border border-gray-200 rounded-lg p-6">
<h3 class="text-xl font-bold mb-3 text-gray-900">How easy is it to buy property?</h3>
<p class="text-gray-700">Both cities allow foreign property ownership through a fideicomiso (bank trust). SMA has an established market with English-speaking real estate agents but premium prices. SLP has lower prices but requires Spanish-fluent representation.</p>
</div>
</div>
</section>

<div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
<h3 class="text-xl font-bold mb-3 text-blue-900">🏡 Planning a Move to San Luis Potosí?</h3>
<p class="text-blue-800 mb-3">Explore our full resources for expats relocating to SLP:</p>
<ul class="space-y-2 text-blue-800">
<li>→ <a href="/blog/guia-completa-rentar-casa-san-luis-potosi-2025" class="underline font-medium">Complete Rental Guide for San Luis Potosí 2025</a></li>
<li>→ <a href="/guides/digital-nomad" class="underline font-medium">Digital Nomad Guide to San Luis Potosí</a></li>
<li>→ <a href="/guides/relocation" class="underline font-medium">Relocation Services in SLP</a></li>
<li>→ <a href="/directory" class="underline font-medium">Expat-Friendly Business Directory</a></li>
</ul>
</div>

<div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
<h3 class="text-xl font-bold mb-3 text-green-900">Ready to Explore San Luis Potosí?</h3>
<p class="text-green-800 mb-3"><strong>San Luis Way is your complete local guide to living, working, and thriving in SLP.</strong></p>
<p class="text-green-800"><a href="/blog" class="text-blue-600 hover:text-blue-800 underline font-semibold">Browse more SLP guides →</a></p>
</div>

</div>`;

const contentES = contentEN
  .replace(/Table of Contents/g, 'Tabla de Contenidos')
  .replace(/Introduction/g, 'Introducción')
  .replace(/Quick Comparison Table/g, 'Tabla de Comparación Rápida')
  .replace(/Cost of Living/g, 'Costo de Vida')
  .replace(/Lifestyle &amp; Culture/g, 'Estilo de Vida y Cultura')
  .replace(/Food &amp; Dining/g, 'Comida y Restaurantes')
  .replace(/Expat Community/g, 'Comunidad Expatriada')
  .replace(/Safety &amp; Healthcare/g, 'Seguridad y Salud')
  .replace(/Pros &amp; Cons/g, 'Pros y Contras')
  .replace(/Final Verdict/g, 'Veredicto Final')
  .replace(/FAQ/g, 'Preguntas Frecuentes')
  .replace(/Key Takeaways/g, 'Puntos Clave')
  .replace(/Best Value:/g, 'Mejor Relación Precio-Valor:')
  .replace(/Best for Established Expats:/g, 'Mejor para Expatriados Establecidos:')
  .replace(/Best for Career\/Business:/g, 'Mejor para Carrera/Negocios:')
  .replace(/Best for Retirement:/g, 'Mejor para Retiro:')
  .replace(/Most Authentic:/g, 'Más Auténtica:')
  .replace(/Introduction: Two Very Different Mexican Dreams/g, 'Introducción: Dos Sueños Mexicanos Muy Diferentes')
  .replace(/Quick Comparison at a Glance/g, 'Comparación Rápida de un Vistazo')
  .replace(/The Biggest Difference/g, 'La Mayor Diferencia')
  .replace(/Authentic Bajío City Life/g, 'Vida Urbana Auténtica del Bajío')
  .replace(/The Art Colony Experience/g, 'La Experiencia de Colonia de Arte')
  .replace(/Head-to-Head/g, 'Cara a Cara')
  .replace(/Our Recommendation/g, 'Nuestra Recomendación')
  .replace(/Based on lifestyle, budget, and goals/g, 'Basado en estilo de vida, presupuesto y metas')
  .replace(/Frequently Asked Questions/g, 'Preguntas Frecuentes')
  .replace(/CHOOSE SAN LUIS POTOSÍ IF/g, 'ELIGE SAN LUIS POTOSÍ SI')
  .replace(/CHOOSE SAN MIGUEL DE ALLENDE IF/g, 'ELIGE SAN MIGUEL DE ALLENDE SI')
  .replace(/Planning a Move to San Luis Potosí\?/g, '¿Planeando Mudarte a San Luis Potosí?')
  .replace(/Ready to Explore San Luis Potosí\?/g, '¿Listo para Explorar San Luis Potosí?')
  .replace(/Browse more SLP guides/g, 'Ver más guías de SLP');

const post = {
  slug: SLUG,
  status: 'published',
  published_at: new Date().toISOString(),
  image_url: IMG.hero,
  category: 'Expat Life',
  tags: ['expats', 'san-luis-potosi', 'san-miguel-de-allende', 'comparison', 'relocation', 'cost-of-living', 'mexico', 'bajio'],

  title: 'San Luis Potosí vs San Miguel de Allende: Which is Better for Expats in 2026?',
  excerpt: 'Complete 2026 comparison of San Luis Potosí and San Miguel de Allende for expats, digital nomads, and retirees. Cost of living, lifestyle, healthcare, and community analyzed side by side.',
  content: contentEN,
  meta_title: 'San Luis Potosí vs San Miguel de Allende 2026 | Expat Comparison',
  meta_description: 'SLP vs SMA: detailed 2026 comparison of cost of living (49% cheaper in SLP), lifestyle, expat community, jobs, and healthcare. Which Mexican city is right for you?',

  title_es: 'San Luis Potosí vs San Miguel de Allende: ¿Cuál es Mejor para Expats en 2026?',
  excerpt_es: 'Comparación completa 2026 entre San Luis Potosí y San Miguel de Allende para expatriados, nómadas digitales y jubilados. Costo de vida, estilo de vida, salud y comunidad lado a lado.',
  content_es: contentES,
  meta_title_es: 'San Luis Potosí vs San Miguel de Allende 2026 | Comparación Expats',
  meta_description_es: 'SLP vs SMA: comparación detallada 2026 de costo de vida (49% más barato en SLP), estilo de vida, comunidad expat, empleos y salud. ¿Qué ciudad mexicana conviene más?',

  title_de: 'San Luis Potosí vs San Miguel de Allende: Welche Stadt ist besser für Expats 2026?',
  excerpt_de: 'Kompletter 2026-Vergleich von San Luis Potosí und San Miguel de Allende für Expats, digitale Nomaden und Rentner. Lebenshaltungskosten, Lebensstil, Gesundheitswesen und Gemeinschaft im direkten Vergleich.',
  content_de: contentEN,
  meta_title_de: 'San Luis Potosí vs San Miguel de Allende 2026 | Expat-Vergleich',
  meta_description_de: 'SLP vs SMA: detaillierter 2026-Vergleich der Lebenshaltungskosten (49% günstiger in SLP), Lebensstil, Expat-Gemeinschaft, Arbeitsmarkt und Gesundheitswesen.',

  title_ja: 'サン・ルイス・ポトシ vs サン・ミゲル・デ・アジェンデ：2026年 駐在員にどちらが最適？',
  excerpt_ja: 'サン・ルイス・ポトシとサン・ミゲル・デ・アジェンデの2026年完全比較。駐在員、デジタルノマド、リタイアメント層向け。生活費、ライフスタイル、医療、コミュニティを徹底比較。',
  content_ja: contentEN,
  meta_title_ja: 'サン・ルイス・ポトシ vs サン・ミゲル・デ・アジェンデ 2026年比較',
  meta_description_ja: 'SLP対SMA：2026年の詳細比較。生活費（SLPが49%安い）、ライフスタイル、駐在員コミュニティ、雇用、医療を分析。あなたに最適なメキシコの都市は？',
};

async function main() {
  console.log('Checking for existing post...');
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug')
    .eq('slug', SLUG)
    .maybeSingle();

  if (existing) {
    console.log('Updating existing post:', existing.id);
    const { error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', existing.id);
    if (error) {
      console.error('Update error:', error);
      process.exit(1);
    }
    console.log('✅ Post updated');
  } else {
    console.log('Inserting new post...');
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();
    if (error) {
      console.error('Insert error:', error);
      process.exit(1);
    }
    console.log('✅ Post published! ID:', data.id);
  }

  console.log(`\n📰 View at: https://sanluisway.com/blog/${SLUG}`);
}

main();
