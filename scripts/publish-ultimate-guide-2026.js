require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const IMG = JSON.parse(fs.readFileSync(path.join(__dirname, 'ultimate-guide-2026-image-urls.json'), 'utf-8'));
const SLUG = 'ultimate-guide-living-san-luis-potosi-2026';
const PUBLISHED = '2026-03-17';

// Deep-dive content following BLOG_DEEP_DIVE_STYLE_GUIDE.md
// FAQPage + Breadcrumb + Speakable JSON-LD injected inline so the blog
// slug page picks it up automatically — mirrors the 8 FAQs below and
// the canonical breadcrumb trail.
const inlineJsonLd = `<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': 'https://www.sanluisway.com/blog/ultimate-guide-living-san-luis-potosi-2026#faq',
      mainEntity: [
        { '@type': 'Question', name: 'How much does it cost to live in San Luis Potosí in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'A comfortable middle-class lifestyle costs $1,200–$2,000 USD per month for a single person, $1,800–$2,500 for a couple, and $2,400–$3,500 for a family of four. A digital nomad with a dedicated coworking membership typically budgets $1,800 USD/month. Numbers verified against Numbeo (January 2026 update) and local listings.' } },
        { '@type': 'Question', name: 'Is San Luis Potosí safe for tourists and nomads?', acceptedAnswer: { '@type': 'Answer', text: 'The US State Department rates San Luis Potosí at Level 2 — Exercise Increased Caution, the same level as France. The city itself is among the safer mid-size Mexican cities. Petty crime is the main concern; violent crime is rare in neighborhoods where foreign residents concentrate.' } },
        { '@type': 'Question', name: 'Can I live in San Luis Potosí without speaking Spanish?', acceptedAnswer: { '@type': 'Answer', text: 'Only with significant friction. Unlike San Miguel de Allende, SLP has limited English-speaking infrastructure. Most doctors, landlords, and government services operate in Spanish. Basic Spanish (A2 level) is realistic after six months of immersion.' } },
        { '@type': 'Question', name: 'What is the best visa for a digital nomad in San Luis Potosí?', acceptedAnswer: { '@type': 'Answer', text: 'For stays under 180 days, the Tourist FMM is free and automatic. For longer stays, the Temporary Resident visa (1–4 years) is the standard route. As of 2026, you need ~$4,185 USD/month income for 6–12 months, or ~$69,750 USD in savings. Government fees roughly doubled in November 2025.' } },
        { '@type': 'Question', name: 'How reliable is the internet in San Luis Potosí?', acceptedAnswer: { '@type': 'Answer', text: 'Very reliable. Fiber internet at 100–500 Mbps is available across Centro, Lomas, Tangamanga, and most middle-class neighborhoods through Izzi, Totalplay, and Megacable. Monthly costs run $32–$50 USD for 200+ Mbps.' } },
        { '@type': 'Question', name: 'How do I get to San Luis Potosí?', acceptedAnswer: { '@type': 'Answer', text: 'Ponciano Arriaga International Airport (SLP) has direct flights from Houston (United), Dallas (American, Volaris), and Mexico City. Querétaro (QRO) and León (BJX) are each 2.5–3 hours by car or first-class bus.' } },
        { '@type': 'Question', name: 'What is the best time of year to visit San Luis Potosí?', acceptedAnswer: { '@type': 'Answer', text: 'October to March for dry, mild weather. Late March for the Procesión del Silencio. Late June for the BMW Maratón Tangamanga. Avoid mid-July through August for crowds at FENAPO and school holidays.' } },
        { '@type': 'Question', name: 'Can I drink tap water in San Luis Potosí?', acceptedAnswer: { '@type': 'Answer', text: 'No. Use garrafones (20-liter purified water jugs) delivered to your home for roughly 35–50 MXN. Mid-range restaurants use purified ice and water.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.sanluisway.com/blog/ultimate-guide-living-san-luis-potosi-2026#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanluisway.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sanluisway.com/blog' },
        { '@type': 'ListItem', position: 3, name: 'Ultimate Guide to San Luis Potosí 2026', item: 'https://www.sanluisway.com/blog/ultimate-guide-living-san-luis-potosi-2026' },
      ],
    },
    {
      '@type': 'Article',
      '@id': 'https://www.sanluisway.com/blog/ultimate-guide-living-san-luis-potosi-2026#article',
      headline: 'The Ultimate Guide to San Luis Potosí 2026: For Expats, Digital Nomads & Travelers',
      datePublished: '2026-03-17',
      dateModified: '2026-03-17',
      author: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
      publisher: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
      inLanguage: 'en',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable', '#quick-summary', '#faq-heading'],
      },
      citation: [
        { '@type': 'CreativeWork', name: 'Numbeo — San Luis Potosí Cost of Living', url: 'https://www.numbeo.com/cost-of-living/in/San-Luis-Potosi' },
        { '@type': 'CreativeWork', name: 'Mexperience — Mexico Residency 2026', url: 'https://www.mexperience.com/mexico-residency-in-2026-tighter-criteria-higher-fees/' },
        { '@type': 'CreativeWork', name: 'Mexico Relocation Guide — 2026 Income Requirements', url: 'https://mexicorelocationguide.com/mexican-residency-income-requirements-updates-in-2026/' },
        { '@type': 'CreativeWork', name: 'nomads.com — SLP Coworking Directory', url: 'https://nomads.com/coworking/san-luis-potosi' },
      ],
    },
  ],
}, null, 0)}
</script>
`;

const contentEN = inlineJsonLd + `<div class="not-prose mb-8">
  <div class="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
    <img src="${IMG.hero}" alt="San Luis Potosí Centro Histórico at golden hour — guide for expats, digital nomads, and tourists 2026" class="w-full h-full object-cover" loading="eager" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
      <div class="p-6 md:p-10">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-3">The Ultimate Guide to San Luis Potosí 2026</h1>
        <p class="text-lg md:text-xl text-white/90">For expats, digital nomads, and slow travelers moving to Mexico's best-kept secret in the Bajío</p>
      </div>
    </div>
  </div>
</div>

<div class="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-8">
  <h3 class="text-xl font-bold mb-3 text-blue-900">📑 In This Deep Dive</h3>
  <nav class="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-800">
    <a href="#overview" class="hover:underline">→ At a Glance: SLP in 2026</a>
    <a href="#audience" class="hover:underline">→ Who This Guide Is For</a>
    <a href="#cost" class="hover:underline">→ Cost of Living 2026</a>
    <a href="#visas" class="hover:underline">→ Visa &amp; Residency Changes</a>
    <a href="#neighborhoods" class="hover:underline">→ Neighborhoods</a>
    <a href="#nomads" class="hover:underline">→ Digital Nomad Scene</a>
    <a href="#tourists" class="hover:underline">→ Tourist Essentials</a>
    <a href="#healthcare" class="hover:underline">→ Healthcare &amp; Banking</a>
    <a href="#food-culture" class="hover:underline">→ Food &amp; Culture</a>
    <a href="#community" class="hover:underline">→ Community &amp; Social Life</a>
    <a href="#faq" class="hover:underline">→ FAQ</a>
    <a href="#sources" class="hover:underline">→ Sources</a>
  </nav>
  <p class="mt-4 text-sm text-blue-700 italic">Estimated reading time: 18 minutes · Last verified: March 17, 2026</p>
</div>

<p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
  <strong>San Luis Potosí is no longer a secret.</strong> Over the past three years, the city that locals call "SLP" has quietly become one of Mexico's most interesting destinations for people moving from abroad — whether for a year, a decade, or a long weekend. This is the 2026 update of our comprehensive living guide, rebuilt from scratch with current prices (verified in January–March 2026), the new visa rules that took effect after Mexico's 2025 UMA reform, and a new angle: this year, the guide also speaks directly to digital nomads and tourists who have started flooding into the Bajío.
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  If you read our 2025 version, you'll notice the numbers have shifted. Rents in the Centro Histórico rose about 15% year over year. The peso has strengthened against the US dollar (~17.5 MXN/USD in March 2026, down from ~20 in late 2024). The visa income thresholds changed in ways that matter. And SLP's coworking scene has more than doubled since we last counted — from around 25 spaces in 2024 to 51 as of early 2026, according to nomads.com's tracker.
</p>

<section id="overview" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 id="quick-summary" class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">At a Glance: San Luis Potosí in 2026</h2>
</div>

<div class="speakable bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 md:p-8 mb-8">
  <p class="text-base md:text-lg text-gray-800 leading-relaxed mb-4">
    <strong>San Luis Potosí is the capital of the state of San Luis Potosí, Mexico.</strong> Located in the central Bajío region at 1,864 meters elevation, it is a UNESCO World Heritage city (as part of the Camino Real de Tierra Adentro, 2010), home to roughly 1.31 million people in the metropolitan area. The city combines pink-cantera colonial architecture with a powerful modern industrial base — BMW, General Motors, Valeo, Continental, and over 350 international automotive-sector companies operate in the state. For foreigners arriving in 2026, SLP offers roughly 35–50% lower living costs than Mexico City for a similar quality of life, no tourist saturation, direct flights to Houston and Dallas, and a genuine Mexican urban experience.
  </p>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
    <div class="bg-white rounded-lg p-3 border border-green-100"><p class="text-xs text-gray-500 uppercase tracking-wide">Metro population</p><p class="font-bold text-gray-900">~1.31 million</p></div>
    <div class="bg-white rounded-lg p-3 border border-green-100"><p class="text-xs text-gray-500 uppercase tracking-wide">Altitude</p><p class="font-bold text-gray-900">1,864 m / 6,115 ft</p></div>
    <div class="bg-white rounded-lg p-3 border border-green-100"><p class="text-xs text-gray-500 uppercase tracking-wide">Climate</p><p class="font-bold text-gray-900">Semi-arid, ~20°C avg</p></div>
    <div class="bg-white rounded-lg p-3 border border-green-100"><p class="text-xs text-gray-500 uppercase tracking-wide">MXN/USD (Mar 2026)</p><p class="font-bold text-gray-900">~17.5</p></div>
    <div class="bg-white rounded-lg p-3 border border-green-100"><p class="text-xs text-gray-500 uppercase tracking-wide">Comfortable budget</p><p class="font-bold text-gray-900">$1,200–$2,000 USD/mo</p></div>
    <div class="bg-white rounded-lg p-3 border border-green-100"><p class="text-xs text-gray-500 uppercase tracking-wide">Airport code</p><p class="font-bold text-gray-900">SLP (direct to USA)</p></div>
  </div>
</div>
</section>

<section id="audience" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Who This Guide Is For</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Historically, content about SLP treated "expats" as a single category: Americans and Canadians retiring to Mexico. That framing is now out of date. Three distinct profiles are arriving in 2026, each with different needs, budgets, and timelines. This guide addresses all three.
</p>

<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
  <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
    <div class="text-4xl mb-3">🏠</div>
    <h3 class="text-xl font-bold text-blue-900 mb-2">Expat Residents</h3>
    <p class="text-sm text-blue-900 mb-3">Staying 1–10+ years. Priorities: residency visa, healthcare, schools, long-term rent.</p>
    <p class="text-xs text-blue-700 font-semibold">Typical budget: $1,500–$3,000/mo</p>
  </div>
  <div class="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
    <div class="text-4xl mb-3">💻</div>
    <h3 class="text-xl font-bold text-purple-900 mb-2">Digital Nomads</h3>
    <p class="text-sm text-purple-900 mb-3">Staying 1–6 months. Priorities: fiber internet, coworking, cafés with Wi-Fi, monthly rentals, community.</p>
    <p class="text-xs text-purple-700 font-semibold">Typical budget: $1,800–$2,500/mo</p>
  </div>
  <div class="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
    <div class="text-4xl mb-3">🎒</div>
    <h3 class="text-xl font-bold text-amber-900 mb-2">Tourists &amp; Slow Travelers</h3>
    <p class="text-sm text-amber-900 mb-3">Staying 3 days to 3 weeks. Priorities: what to see, where to eat, day trips to Huasteca Potosina.</p>
    <p class="text-xs text-amber-700 font-semibold">Typical budget: $60–$120/day</p>
  </div>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  If you are reading this guide because you stumbled across it while researching Mexico more broadly, know this: SLP sits at the center of a triangle formed by Mexico City, Guadalajara, and Monterrey. It is the logical next step for anyone who has already visited San Miguel de Allende or Guanajuato and wants to experience colonial Mexico without the tourist surcharge. It is also the fastest-growing automotive industrial hub in the country — which matters if you are here for work rather than leisure.
</p>
</section>

<div class="not-prose my-16">
  <div class="flex items-center justify-center"><div class="border-t-2 border-gray-300 flex-grow"></div><span class="px-6 text-gray-400 text-4xl">✦</span><div class="border-t-2 border-gray-300 flex-grow"></div></div>
</div>

<section id="cost" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Cost of Living: 2026 Numbers, Verified</h2>
</div>

<figure class="not-prose my-10">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG['cost-dashboard']}" alt="San Luis Potosí 2026 monthly cost of living comparison — solo expat, digital nomad, family of four" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">
    Figure 1: Monthly cost-of-living ranges by audience profile. All figures verified against Numbeo (January 2026 update, n=20 contributors) and cross-referenced with Expatistan and local listings.
  </figcaption>
</figure>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The honest answer to "how much does it cost to live in SLP" depends heavily on three factors: which neighborhood you choose, whether you want air conditioning and private parking, and how often you eat Mexican food versus international cuisine. The numbers below reflect January–March 2026 market conditions at an exchange rate of 17.5 MXN per USD.
</p>

<div class="not-prose overflow-x-auto my-8">
  <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
    <thead class="bg-gradient-to-r from-blue-600 to-blue-700">
      <tr>
        <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Expense</th>
        <th class="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">MXN</th>
        <th class="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">USD</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr><td class="px-6 py-3 font-medium text-gray-900">1BR apartment in city center</td><td class="px-6 py-3 text-right text-gray-700">$11,800</td><td class="px-6 py-3 text-right text-gray-700">$674</td></tr>
      <tr class="bg-gray-50"><td class="px-6 py-3 font-medium text-gray-900">1BR apartment outside center</td><td class="px-6 py-3 text-right text-gray-700">$8,440</td><td class="px-6 py-3 text-right text-gray-700">$482</td></tr>
      <tr><td class="px-6 py-3 font-medium text-gray-900">3BR apartment in center</td><td class="px-6 py-3 text-right text-gray-700">$21,333</td><td class="px-6 py-3 text-right text-gray-700">$1,219</td></tr>
      <tr class="bg-gray-50"><td class="px-6 py-3 font-medium text-gray-900">Basic utilities (85 m²)</td><td class="px-6 py-3 text-right text-gray-700">$797</td><td class="px-6 py-3 text-right text-gray-700">$46</td></tr>
      <tr><td class="px-6 py-3 font-medium text-gray-900">Internet (60+ Mbps fiber)</td><td class="px-6 py-3 text-right text-gray-700">$567</td><td class="px-6 py-3 text-right text-gray-700">$32</td></tr>
      <tr class="bg-gray-50"><td class="px-6 py-3 font-medium text-gray-900">Monthly transit pass</td><td class="px-6 py-3 text-right text-gray-700">$1,304</td><td class="px-6 py-3 text-right text-gray-700">$75</td></tr>
      <tr><td class="px-6 py-3 font-medium text-gray-900">Meal at inexpensive restaurant</td><td class="px-6 py-3 text-right text-gray-700">$220</td><td class="px-6 py-3 text-right text-gray-700">$13</td></tr>
      <tr class="bg-gray-50"><td class="px-6 py-3 font-medium text-gray-900">Mid-range meal for two</td><td class="px-6 py-3 text-right text-gray-700">$725</td><td class="px-6 py-3 text-right text-gray-700">$41</td></tr>
      <tr><td class="px-6 py-3 font-medium text-gray-900">Gasoline (1 liter)</td><td class="px-6 py-3 text-right text-gray-700">$24.92</td><td class="px-6 py-3 text-right text-gray-700">$1.42</td></tr>
      <tr class="bg-green-50 font-semibold"><td class="px-6 py-3">Average net monthly salary (local)</td><td class="px-6 py-3 text-right text-gray-900">$15,825</td><td class="px-6 py-3 text-right text-green-700">$904</td></tr>
    </tbody>
  </table>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The average local salary figure is important context. Unlike Mexico City, where expat incomes are common among professionals, in SLP most residents earn in Mexican pesos from Mexican employers. This creates significant leverage for anyone earning in USD, EUR, or CAD: a $2,000 USD monthly budget puts you well above the local median.
</p>

<div class="not-prose my-10 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8">
  <h4 class="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-3"><span class="text-2xl">💡</span> Pro Tips for 2026</h4>
  <div class="space-y-3">
    <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
      <p class="font-semibold text-gray-900 mb-1">Pay rent in pesos, not dollars</p>
      <p class="text-gray-700 text-sm">Landlords who price in USD mark up 10–15%. Negotiate pesos-only contracts. If you are a nomad paying monthly, ask for a 10% "estancia" discount for a 3-month prepayment.</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
      <p class="font-semibold text-gray-900 mb-1">Avoid Airbnb beyond 30 days</p>
      <p class="text-gray-700 text-sm">Airbnb averages 60–80% more per month than direct rentals in SLP. For stays over 4 weeks, use Inmuebles24.com or Facebook Marketplace.</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
      <p class="font-semibold text-gray-900 mb-1">CFE and water aren't negotiable — but you can shop internet</p>
      <p class="text-gray-700 text-sm">Izzi, Totalplay, and Megacable all offer 200+ Mbps fiber in Centro, Lomas, and Tangamanga for roughly $32–$50 USD/month. Telmex is legacy; skip it unless fiber isn't available on your street.</p>
    </div>
  </div>
</div>
</section>

<div class="not-prose my-16">
  <div class="flex items-center justify-center"><div class="border-t-2 border-gray-300 flex-grow"></div><span class="px-6 text-gray-400 text-4xl">✦</span><div class="border-t-2 border-gray-300 flex-grow"></div></div>
</div>

<section id="visas" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Visa &amp; Residency: What Changed in 2025–2026</h2>
</div>

<div class="not-prose my-6 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
  <p class="text-red-900"><strong>⚠️ Big change:</strong> In autumn 2025, Mexico's Congress passed a law doubling the government processing fees for residency visas and cards. The new schedule took effect November 7, 2025. Factor this into your 2026 budget.</p>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Mexico's residency system underwent two material changes between our 2025 and 2026 guides. The first is procedural: as of July 2025, Mexican consulates were directed to calculate economic solvency using the <strong>UMA</strong> (Unidad de Medida y Actualización) rather than the daily minimum wage. This shift matters because the minimum wage has jumped 12%+ per year recently, while UMA climbs only 3–5% annually. For 2026, the UMA is 117.31 MXN per day — up 3.69% from 2025's 113.14 MXN.
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The second change is financial: visa and residency card government fees roughly doubled effective November 2025. A Temporary Resident card that cost approximately 5,570 MXN in late 2024 now runs closer to 11,000 MXN for a one-year card. Budget accordingly.
</p>

<h3 id="visa-pathways" class="text-2xl font-bold text-gray-900 mb-4">The Four Pathways in 2026</h3>

<div class="not-prose overflow-x-auto my-8">
  <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
    <thead class="bg-gradient-to-r from-purple-600 to-purple-700">
      <tr>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Visa type</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Duration</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Income / savings threshold</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Best for</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr><td class="px-5 py-3 font-medium">Tourist (FMM)</td><td class="px-5 py-3 text-gray-700">Up to 180 days</td><td class="px-5 py-3 text-gray-700">None</td><td class="px-5 py-3 text-gray-700">Short trips, nomads testing SLP</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-medium">Temporary Resident</td><td class="px-5 py-3 text-gray-700">1–4 years</td><td class="px-5 py-3 text-gray-700">~$4,185 USD/month income OR ~$69,750 USD savings</td><td class="px-5 py-3 text-gray-700">Remote workers, medium-term stays</td></tr>
      <tr><td class="px-5 py-3 font-medium">Permanent Resident</td><td class="px-5 py-3 text-gray-700">Indefinite</td><td class="px-5 py-3 text-gray-700">Higher thresholds; also via retirement or 4 yrs temporary</td><td class="px-5 py-3 text-gray-700">Retirees, long-term residents</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-medium">Work Visa</td><td class="px-5 py-3 text-gray-700">1–4 years</td><td class="px-5 py-3 text-gray-700">Tied to employer job offer</td><td class="px-5 py-3 text-gray-700">BMW, GM, Valeo, Continental transferees</td></tr>
    </tbody>
  </table>
  <p class="text-sm text-gray-600 italic mt-3">Thresholds sourced from Mexperience's 2026 residency briefing and Mexico Relocation Guide's post-UMA analysis (see Sources).</p>
</div>

<div class="not-prose my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
  <p class="text-amber-900"><strong>📌 Digital nomads, pay attention:</strong> Working remotely on a tourist FMM is technically a gray area under Mexican immigration law. Enforcement is minimal for foreigners earning from abroad, but if you plan to stay over 90 days, open a Mexican bank account, or sign a lease, the Temporary Resident route is much cleaner. The $4,185 USD/month threshold is achievable for most remote workers earning USD salaries.</p>
</div>
</section>

<section id="neighborhoods" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Where to Live: Neighborhoods by Profile</h2>
</div>

<figure class="not-prose my-10">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG.neighborhoods}" alt="Three San Luis Potosí neighborhoods side by side: Centro Histórico cobblestone streets, Lomas upscale gated area, Tangamanga park-adjacent district" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">Figure 2: The three flagship neighborhoods for foreign residents — Centro Histórico (left), Lomas (center), Tangamanga (right).</figcaption>
</figure>

<div class="not-prose space-y-6 my-10">
  <div class="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
    <div class="flex flex-wrap items-baseline gap-3 mb-3">
      <h3 class="text-xl font-bold text-gray-900">Centro Histórico</h3>
      <span class="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">Best for nomads &amp; culture</span>
    </div>
    <p class="text-gray-700 mb-4 leading-relaxed">The UNESCO-designated historic center. Walkable, cobblestoned, full of cafés and restaurants. Fibre internet available everywhere. Coworking spaces like <strong>Entidad Nómada</strong> sit directly in the core. Best if you want to live without a car and soak in colonial architecture daily.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
      <div><span class="text-xs text-gray-500 block">1BR rent</span><span class="font-semibold">$450–$750 USD</span></div>
      <div><span class="text-xs text-gray-500 block">Walkability</span><span class="font-semibold">9/10</span></div>
      <div><span class="text-xs text-gray-500 block">Nightlife</span><span class="font-semibold">Excellent</span></div>
      <div><span class="text-xs text-gray-500 block">Quiet at night</span><span class="font-semibold">7/10</span></div>
    </div>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
    <div class="flex flex-wrap items-baseline gap-3 mb-3">
      <h3 class="text-xl font-bold text-gray-900">Lomas (1a–4a secciones)</h3>
      <span class="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold">Best for families &amp; professionals</span>
    </div>
    <p class="text-gray-700 mb-4 leading-relaxed">Upscale residential zone northeast of Centro. Tree-lined avenues, gated communities, international schools, malls (Plaza Citadina, Metrópoli), and the top private hospitals. Car strongly recommended. Where most BMW and GM transferees end up.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
      <div><span class="text-xs text-gray-500 block">1BR rent</span><span class="font-semibold">$800–$1,500 USD</span></div>
      <div><span class="text-xs text-gray-500 block">Walkability</span><span class="font-semibold">4/10</span></div>
      <div><span class="text-xs text-gray-500 block">Schools nearby</span><span class="font-semibold">Best in city</span></div>
      <div><span class="text-xs text-gray-500 block">Family-friendly</span><span class="font-semibold">10/10</span></div>
    </div>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
    <div class="flex flex-wrap items-baseline gap-3 mb-3">
      <h3 class="text-xl font-bold text-gray-900">Tangamanga</h3>
      <span class="inline-block px-3 py-1 bg-green-100 text-green-900 rounded-full text-xs font-semibold">Best for active lifestyle</span>
    </div>
    <p class="text-gray-700 mb-4 leading-relaxed">Adjacent to Parque Tangamanga I, one of the largest urban parks in Mexico (411 ha, free entry). Mid-range prices, good restaurants, popular with runners and cyclists. Fibre internet available. Rising fast as a nomad-friendly zone thanks to proximity to both the park and Centro.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
      <div><span class="text-xs text-gray-500 block">1BR rent</span><span class="font-semibold">$550–$950 USD</span></div>
      <div><span class="text-xs text-gray-500 block">Walkability</span><span class="font-semibold">6/10</span></div>
      <div><span class="text-xs text-gray-500 block">Green space</span><span class="font-semibold">Best in city</span></div>
      <div><span class="text-xs text-gray-500 block">Nightlife</span><span class="font-semibold">Moderate</span></div>
    </div>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
    <div class="flex flex-wrap items-baseline gap-3 mb-3">
      <h3 class="text-xl font-bold text-gray-900">Villa Magna &amp; Colinas del Parque</h3>
      <span class="inline-block px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-semibold">Rising stars</span>
    </div>
    <p class="text-gray-700 mb-4 leading-relaxed">Newer developments on the city's edges, popular with young professionals and remote workers. More affordable than Lomas with much of the same modern amenities. Expect newer buildings, less character, but lower prices.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
      <div><span class="text-xs text-gray-500 block">1BR rent</span><span class="font-semibold">$400–$700 USD</span></div>
      <div><span class="text-xs text-gray-500 block">Walkability</span><span class="font-semibold">3/10</span></div>
      <div><span class="text-xs text-gray-500 block">Construction age</span><span class="font-semibold">Mostly post-2015</span></div>
      <div><span class="text-xs text-gray-500 block">Value</span><span class="font-semibold">9/10</span></div>
    </div>
  </div>
</div>
</section>

<div class="not-prose my-16">
  <div class="flex items-center justify-center"><div class="border-t-2 border-gray-300 flex-grow"></div><span class="px-6 text-gray-400 text-4xl">✦</span><div class="border-t-2 border-gray-300 flex-grow"></div></div>
</div>

<section id="nomads" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">The Digital Nomad Scene</h2>
</div>

<figure class="not-prose my-10">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG['nomad-coworking']}" alt="Modern coworking space in San Luis Potosí historic center with nomads working on laptops and exposed cantera stone walls" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">Figure 3: A coworking space in Centro Histórico. SLP's nomad infrastructure has more than doubled since 2024.</figcaption>
</figure>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  In early 2024, a digital nomad moving to SLP had about 25 coworking options. As of March 2026, <strong>nomads.com tracks 51 coworking spaces</strong> in the metro area, with day passes starting around $3 USD. The scene is younger and more informal than in Mexico City, but the basics are solid: fiber internet is everywhere, English speakers are increasingly common among staff, and the community is small enough that you'll recognize faces after a week.
</p>

<h3 class="text-2xl font-bold text-gray-900 mb-4">Notable Coworking &amp; Nomad-Friendly Spots</h3>

<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-1">Entidad Nómada</h4>
    <p class="text-sm text-gray-600 mb-2">Centro Histórico</p>
    <p class="text-sm text-gray-700">Cafetería + coworking + event space. Located in a restored colonial building. Good Wi-Fi, social programming, and parking. The default recommendation if you're new.</p>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-1">Imparable Coworking</h4>
    <p class="text-sm text-gray-600 mb-2">Multiple locations</p>
    <p class="text-sm text-gray-700">Entrepreneur-focused space with startup community. Private offices, meeting rooms, monthly membership.</p>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-1">VAEO Business Club</h4>
    <p class="text-sm text-gray-600 mb-2">Lomas area</p>
    <p class="text-sm text-gray-700">Premium workspace aimed at executives. Good for client meetings and longer-form remote work.</p>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-1">Cafés with reliable Wi-Fi</h4>
    <p class="text-sm text-gray-600 mb-2">Citywide</p>
    <p class="text-sm text-gray-700">Punto del Cielo, Café Cortao, La Parroquia (branches), and the rooftop café at Centro Comercial República. All offer 50+ Mbps Wi-Fi and power outlets.</p>
  </div>
</div>

<div class="not-prose my-10 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl">
  <h4 class="text-2xl font-bold mb-5 flex items-center gap-3"><span class="text-3xl">🎯</span> Nomad Essentials Checklist</h4>
  <ul class="space-y-3">
    <li class="flex items-start gap-3"><span class="text-yellow-300 text-xl flex-shrink-0">✓</span><p>Get a Mexican SIM (Telcel or AT&amp;T Mexico) on arrival. Unlimited data plans run about $30 USD/month. Telcel has the best coverage outside the city.</p></li>
    <li class="flex items-start gap-3"><span class="text-yellow-300 text-xl flex-shrink-0">✓</span><p>Bring a backup hotspot. Fiber is reliable, but power cuts happen during the rainy season (June–September).</p></li>
    <li class="flex items-start gap-3"><span class="text-yellow-300 text-xl flex-shrink-0">✓</span><p>Join the Facebook group "Expats en San Luis Potosí" before arriving — it is the primary informal network.</p></li>
    <li class="flex items-start gap-3"><span class="text-yellow-300 text-xl flex-shrink-0">✓</span><p>Uber and DiDi both work in the city and are the recommended transport option at night.</p></li>
    <li class="flex items-start gap-3"><span class="text-yellow-300 text-xl flex-shrink-0">✓</span><p>Plan around the rhythm: weekends many businesses close early, Monday mornings are the best time for appointments.</p></li>
  </ul>
</div>
</section>

<section id="tourists" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Tourist Essentials: What Not to Miss</h2>
</div>

<figure class="not-prose my-10">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG['tourist-huasteca']}" alt="Aerial view of Cascada de Tamul waterfall in Huasteca Potosina with boat tour on turquoise river" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">Figure 4: Cascada de Tamul, the tallest waterfall in San Luis Potosí at 105 meters. The Huasteca Potosina is the state's signature tourism experience.</figcaption>
</figure>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The state of San Luis Potosí divides into two tourism experiences: the colonial capital (this city) and the Huasteca Potosina, a subtropical region about 4–5 hours east known for waterfalls, rivers, and surrealist gardens. Most international visitors do both.
</p>

<h3 class="text-2xl font-bold text-gray-900 mb-4">In the City: 3-Day Itinerary</h3>

<div class="not-prose my-6 space-y-4">
  <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-2"><span class="text-blue-600">Day 1</span> — Centro Histórico</h4>
    <p class="text-sm text-gray-700">Morning: Plaza de Armas, Catedral de San Luis Potosí, Templo del Carmen (one of Mexico's most ornate baroque churches). Lunch: enchiladas potosinas at Mercado República. Afternoon: Museo Federico Silva (contemporary sculpture) or Caja del Agua (historic fountain). Evening: rooftop drinks on Calle Zaragoza.</p>
  </div>
  <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-2"><span class="text-green-600">Day 2</span> — Parque Tangamanga &amp; Modern SLP</h4>
    <p class="text-sm text-gray-700">Morning: Parque Tangamanga I — 411 hectares with a free zoo, planetarium, Japanese garden, and aquarium. Afternoon: Centro de las Artes (contemporary art center in a former penitentiary). Evening: dinner in the new gastronomic corridor along Carranza.</p>
  </div>
  <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-2"><span class="text-purple-600">Day 3</span> — Real de Catorce day trip</h4>
    <p class="text-sm text-gray-700">Three-hour drive north to Real de Catorce, a near-ghost town in the Sierra de Catorce at 2,800 m. Access is via a single-lane cobblestone tunnel. Bohemian atmosphere, silver mining history, striking desert landscapes.</p>
  </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 mb-4">Huasteca Potosina: The 4-Day Loop</h3>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Base yourself in Ciudad Valles, the regional hub 4.5 hours east of SLP city. From there, the classic circuit covers Cascada de Tamul (105 m waterfall, accessed by boat), Puente de Dios, Cascadas de Tamasopo, and the surrealist sculptures of Las Pozas de Xilitla — a garden built by British eccentric Edward James in the 1960s and now Mexico's most photographed artistic landmark outside Mexico City. Tours run $50–$120 USD per day per person including transport, guide, and meals.
</p>

<div class="not-prose my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
  <p class="text-amber-900"><strong>📌 Tourist tip:</strong> The Huasteca is busiest during Mexican school holidays (Semana Santa — late March/early April — and mid-July through August). If you want empty rivers and full attention from guides, visit in February, October, or early November.</p>
</div>
</section>

<section id="healthcare" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Healthcare, Banking &amp; Safety in 2026</h2>
</div>

<h3 class="text-2xl font-bold text-gray-900 mb-3">Healthcare</h3>
<p class="text-lg leading-relaxed text-gray-700 mb-6">
  SLP has the strongest healthcare infrastructure of any mid-size city in central Mexico outside Querétaro. Private hospitals like <strong>Hospital Ángeles</strong>, <strong>Star Médica</strong>, and <strong>Hospital Lomas</strong> offer US-trained specialists, modern equipment, and English-speaking staff for most services. Routine private consultations run $30–$60 USD; a specialist visit runs $50–$100 USD. A private insurance policy for a couple in their 50s averages $2,400–$3,000 USD per year.
</p>

<h3 class="text-2xl font-bold text-gray-900 mb-3">Banking</h3>
<p class="text-lg leading-relaxed text-gray-700 mb-6">
  To open a Mexican bank account you need your passport, residency card (not required for Tourist FMM holders at some banks), proof of address (a recent utility bill or lease), and in some cases an RFC (tax ID). <strong>BBVA México</strong> and <strong>Santander</strong> are the most expat-friendly. <strong>HSBC</strong> offers Premier accounts with international transfer benefits. ATMs are widely available; Santander and Citibanamex have the largest ATM networks.
</p>

<h3 class="text-2xl font-bold text-gray-900 mb-3">Safety</h3>
<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The US State Department classifies the state of San Luis Potosí at <strong>Level 2 — Exercise Increased Caution</strong>, the same level as France or the United Kingdom. The city itself is considered among the safer mid-size Mexican cities. Lomas, Centro, Tangamanga, and Villa Magna are the neighborhoods where foreign residents concentrate, and petty crime rather than violent crime is the primary concern. Standard precautions apply: don't flash valuables, use rideshare at night, avoid isolated areas of Zona Industrial after dark.
</p>
</section>

<section id="food-culture" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Food &amp; Culture</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Potosino cuisine is distinctive enough that it has its own UNESCO-recognized traditions. The dish that tourists invariably try first is <strong>enchiladas potosinas</strong> — small red-tinted corn tortillas stuffed with cheese and served with crema and queso fresco. Beyond that, seek out <strong>asado de boda</strong> (a deep red mole traditionally served at weddings), <strong>gorditas</strong> stuffed with guisos at Mercado República, <strong>tacos de cecina</strong>, and the mezcal from the Altiplano Potosino region.
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The restaurant scene in 2026 has three clear tiers: traditional family-run fondas ($3–$7 USD meals), contemporary Mexican restaurants along Calle Carranza ($15–$30), and a growing cohort of international and fusion concepts in Centro and Lomas ($25–$60). International cuisine options have expanded significantly since 2024 — there are now solid ramen, Korean BBQ, Peruvian, and Middle Eastern options, though the city still doesn't match the depth of Mexico City or Guadalajara.
</p>

<h3 class="text-2xl font-bold text-gray-900 mb-4">Cultural Calendar</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
  <li><strong>Procesión del Silencio</strong> (Holy Week, late March/April): One of Mexico's most important religious processions, silent and candlelit through Centro.</li>
  <li><strong>Festival Internacional de San Luis</strong> (August): Two weeks of free concerts, theater, and art.</li>
  <li><strong>Feria Nacional Potosina (FENAPO)</strong> (August): Three weeks of rides, live music, rodeo, and regional food.</li>
  <li><strong>BMW Maratón Internacional Tangamanga</strong> (late June): 17,000+ runners across four certified distances.</li>
  <li><strong>Xantolo</strong> (Day of the Dead, Oct 31–Nov 2): Especially vibrant in the Huasteca.</li>
</ul>
</section>

<section id="community" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Community &amp; Social Life</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  SLP's foreign community is small (estimates range from 2,000 to 5,000 full-time foreign residents, though no official number exists) and blended. Unlike San Miguel de Allende, there is no English-language newspaper, no English-speaking religious services dominant in the city, and no cluster of expat-only bars. This is both a downside (harder to land a ready-made social circle) and an upside (Spanish improves fast by necessity).
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  The three largest subgroups are: <strong>industrial professionals</strong> (German BMW engineers, Japanese Toyota suppliers, Korean Kia-adjacent staff), <strong>retirees</strong> (primarily American and Canadian), and a rapidly growing <strong>digital nomad cohort</strong> (mostly US, European, and Latin American remote workers). Social life clusters around Facebook groups, meetups at Entidad Nómada and similar coworking spaces, and language-exchange nights at specific cafés.
</p>
</section>

<div class="not-prose my-16">
  <div class="flex items-center justify-center"><div class="border-t-2 border-gray-300 flex-grow"></div><span class="px-6 text-gray-400 text-4xl">✦</span><div class="border-t-2 border-gray-300 flex-grow"></div></div>
</div>

<section id="faq" class="mb-16 scroll-mt-8 speakable">
<div class="not-prose mb-6">
  <h2 id="faq-heading" class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-3 inline-block">Frequently Asked Questions</h2>
</div>

<div class="space-y-5">
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">How much does it cost to live in San Luis Potosí in 2026?</h3>
    <p class="text-gray-700">A comfortable middle-class lifestyle costs $1,200–$2,000 USD per month for a single person, $1,800–$2,500 for a couple, and $2,400–$3,500 for a family of four. A digital nomad with a dedicated coworking membership typically budgets $1,800 USD/month. Numbers verified against Numbeo (January 2026 update) and local listings.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">Is San Luis Potosí safe for tourists and nomads?</h3>
    <p class="text-gray-700">The US State Department rates San Luis Potosí at Level 2 — Exercise Increased Caution, the same level as France. The city itself is among the safer mid-size Mexican cities. Petty crime (pickpocketing in tourist areas, occasional car break-ins in industrial neighborhoods) is the main concern. Violent crime is rare in the neighborhoods where foreign residents concentrate.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">Can I live in San Luis Potosí without speaking Spanish?</h3>
    <p class="text-gray-700">Only with significant friction. Unlike San Miguel de Allende, SLP has limited English-speaking infrastructure. Most doctors, landlords, and government services operate in Spanish. Basic Spanish (A2 level) is realistic after six months of immersion. CELE at UASLP offers structured classes; private tutors run $10–$15 USD per hour.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">What's the best visa for a digital nomad in San Luis Potosí?</h3>
    <p class="text-gray-700">For stays under 180 days, the Tourist FMM is free and automatic. For longer stays, the Temporary Resident visa (1–4 years) is the standard route. As of 2026, you need to demonstrate either ~$4,185 USD/month income for 6–12 months, or ~$69,750 USD in savings over the past 12 months. Government fees roughly doubled in November 2025.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">How reliable is the internet in San Luis Potosí?</h3>
    <p class="text-gray-700">Very reliable in the city. Fiber internet at 100–500 Mbps is available across Centro, Lomas, Tangamanga, and most middle-class neighborhoods through Izzi, Totalplay, and Megacable. Monthly costs run $32–$50 USD for 200+ Mbps. The rainy season (June–September) brings occasional power cuts; a mobile hotspot as backup is recommended.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">How do I get to San Luis Potosí?</h3>
    <p class="text-gray-700">Ponciano Arriaga International Airport (SLP) has direct flights from Houston (United), Dallas (American, Volaris), and Mexico City (Aeroméxico, Volaris). Alternatively, Querétaro (QRO) and León (BJX) are each 2.5–3 hours by car or first-class bus (ETN, Primera Plus). From Mexico City, first-class bus is 5 hours and runs about $40 USD.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">What's the best time of year to visit?</h3>
    <p class="text-gray-700">October–March for dry, mild weather (daytime 20–25°C, cool evenings). Semana Santa (Holy Week, late March/April) for the Procesión del Silencio. Late June for the BMW Maratón Tangamanga. Avoid mid-July through August if you want to escape crowds at FENAPO and school holidays.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">Can I drink tap water?</h3>
    <p class="text-gray-700">No. Use garrafones (20-liter purified water jugs) delivered to your home for roughly 35–50 MXN (~$2–$3 USD). All mid-range restaurants use purified ice and water; cheaper fondas are safe but stick to bottled beverages to be cautious.</p>
  </div>
</div>
</section>

<section id="sources" class="mb-12 scroll-mt-8">
<div class="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-gray-900 mb-3">Sources &amp; Verification</h2>
  <p class="text-sm text-gray-600 mb-4">All figures in this guide verified against primary sources as of March 17, 2026.</p>
  <ul class="space-y-2 text-sm text-gray-700">
    <li>→ <a href="https://www.numbeo.com/cost-of-living/in/San-Luis-Potosi" class="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">Numbeo — San Luis Potosí Cost of Living</a> (January 2026 update, n=20 contributors)</li>
    <li>→ <a href="https://www.mexperience.com/mexico-residency-in-2026-tighter-criteria-higher-fees/" class="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">Mexperience — Mexico Residency in 2026</a> (UMA calculation, fee increases)</li>
    <li>→ <a href="https://mexicorelocationguide.com/mexican-residency-income-requirements-updates-in-2026/" class="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">Mexico Relocation Guide — 2026 Income Requirements Update</a></li>
    <li>→ <a href="https://nomads.com/coworking/san-luis-potosi" class="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">nomads.com — SLP Coworking Directory</a> (51 spaces tracked)</li>
    <li>→ <a href="https://www.exchangerates.org.uk/USD-MXN-spot-exchange-rates-history-2026.html" class="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">Exchange-Rates.org.uk — USD/MXN March 2026</a></li>
    <li>→ INEGI — 2020 Census + 2025 metropolitan estimates</li>
    <li>→ Mexico Business News — 2025 SLP automotive FDI totals ($761.8M)</li>
    <li>→ San Luis Way Editorial — on-ground verification of neighborhoods and coworking spaces</li>
  </ul>
</div>
</section>

<div class="not-prose mt-10 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-3">Ready to plan your move or visit?</h3>
  <p class="text-gray-700 mb-5">Explore our companion guides for specific scenarios:</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <a href="/resources/living-guide" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Complete Living Guide</p>
      <p class="text-sm text-gray-600">Visas, neighborhoods, healthcare, practical essentials</p>
    </a>
    <a href="/guides/digital-nomad" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Digital Nomad Guide</p>
      <p class="text-sm text-gray-600">Coworking, cafés, housing for remote workers</p>
    </a>
    <a href="/blog/cost-of-living-san-luis-potosi-2025" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ 2025 Cost Breakdown</p>
      <p class="text-sm text-gray-600">Detailed budget analysis (prior year reference)</p>
    </a>
    <a href="/parque-tangamanga" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Parque Tangamanga Guide</p>
      <p class="text-sm text-gray-600">The 411-hectare urban park every visitor should see</p>
    </a>
  </div>
</div>`;

// Spanish translation — structural swap of headings
const contentES = contentEN
  .replace(/The Ultimate Guide to San Luis Potosí 2026/g, 'Guía Definitiva de San Luis Potosí 2026')
  .replace(/For expats, digital nomads, and slow travelers moving to Mexico's best-kept secret in the Bajío/g, 'Para expatriados, nómadas digitales y viajeros lentos que descubren el mejor secreto del Bajío mexicano')
  .replace(/In This Deep Dive/g, 'En Esta Guía')
  .replace(/At a Glance: SLP in 2026/g, 'En Breve: SLP en 2026')
  .replace(/Who This Guide Is For/g, 'Para Quién Es Esta Guía')
  .replace(/Cost of Living 2026/g, 'Costo de Vida 2026')
  .replace(/Visa &amp; Residency Changes/g, 'Cambios en Visa y Residencia')
  .replace(/Neighborhoods/g, 'Colonias')
  .replace(/Digital Nomad Scene/g, 'Escena de Nómadas Digitales')
  .replace(/Tourist Essentials/g, 'Esencial Para Turistas')
  .replace(/Healthcare &amp; Banking/g, 'Salud y Banca')
  .replace(/Food &amp; Culture/g, 'Comida y Cultura')
  .replace(/Community &amp; Social Life/g, 'Comunidad y Vida Social')
  .replace(/FAQ/g, 'Preguntas Frecuentes')
  .replace(/Sources/g, 'Fuentes')
  .replace(/Estimated reading time: 18 minutes · Last verified: March 17, 2026/g, 'Tiempo de lectura: 18 minutos · Última verificación: 17 de marzo, 2026')
  .replace(/At a Glance: San Luis Potosí in 2026/g, 'San Luis Potosí en 2026: Un Vistazo')
  .replace(/Where to Live: Neighborhoods by Profile/g, 'Dónde Vivir: Colonias por Perfil')
  .replace(/Cost of Living: 2026 Numbers, Verified/g, 'Costo de Vida: Números 2026, Verificados')
  .replace(/Visa &amp; Residency: What Changed in 2025–2026/g, 'Visa y Residencia: Qué Cambió en 2025–2026')
  .replace(/The Digital Nomad Scene/g, 'La Escena de Nómadas Digitales')
  .replace(/Tourist Essentials: What Not to Miss/g, 'Esencial Para Turistas: Lo Que No Te Puedes Perder')
  .replace(/Healthcare, Banking &amp; Safety in 2026/g, 'Salud, Banca y Seguridad en 2026')
  .replace(/Frequently Asked Questions/g, 'Preguntas Frecuentes')
  .replace(/Sources &amp; Verification/g, 'Fuentes y Verificación')
  .replace(/Ready to plan your move or visit\?/g, '¿Listo para planear tu mudanza o visita?')
  .replace(/Expat Residents/g, 'Residentes Expatriados')
  .replace(/Digital Nomads/g, 'Nómadas Digitales')
  .replace(/Tourists &amp; Slow Travelers/g, 'Turistas y Viajeros Lentos')
  .replace(/Nomad Essentials Checklist/g, 'Checklist de Nómada')
  .replace(/Pro Tips for 2026/g, 'Consejos Pro para 2026');

const post = {
  slug: SLUG,
  status: 'published',
  published_at: new Date(PUBLISHED).toISOString(),
  image_url: IMG.hero,
  category: 'Expat Life',
  tags: ['ultimate-guide', 'expat', 'digital-nomad', 'tourism', 'san-luis-potosi', 'living-guide', '2026', 'cost-of-living', 'bajio', 'mexico'],

  title: 'The Ultimate Guide to San Luis Potosí 2026: For Expats, Digital Nomads & Travelers',
  excerpt: 'Complete 2026 update. Verified March prices, new 2026 visa rules (UMA calculation + doubled fees), coworking scene (now 51 spaces), neighborhoods, Huasteca Potosina tourism — everything expats, nomads, and slow travelers need to move to Mexico\'s Bajío this year.',
  content: contentEN,
  meta_title: 'San Luis Potosí 2026 Guide: Expats, Nomads & Tourists',
  meta_description: 'Ultimate 2026 guide to living in SLP: verified prices (Mar 2026), new UMA visa rules, 51 coworking spaces, neighborhoods, Huasteca Potosina. For expats, nomads and travelers.',

  title_es: 'Guía Definitiva de San Luis Potosí 2026: Para Expats, Nómadas Digitales y Viajeros',
  excerpt_es: 'Actualización completa 2026. Precios de marzo verificados, nuevas reglas de visa 2026 (cálculo UMA + duplicación de cuotas), escena coworking (ahora 51 espacios), colonias, Huasteca Potosina — todo lo que expatriados, nómadas y viajeros lentos necesitan para mudarse al Bajío este año.',
  content_es: contentES,
  meta_title_es: 'Guía SLP 2026: Expats, Nómadas y Turistas',
  meta_description_es: 'Guía definitiva 2026 para vivir en SLP: precios verificados (marzo 2026), reglas de visa UMA, 51 coworkings, colonias, Huasteca Potosina. Para expats, nómadas y viajeros.',

  title_de: 'Der ultimative Leitfaden zu San Luis Potosí 2026: Für Expats, digitale Nomaden und Reisende',
  excerpt_de: 'Vollständiges 2026-Update mit verifizierten März-Preisen, neuen UMA-Visa-Regeln, 51 Coworking-Spaces und Huasteca-Potosina-Tourismus.',
  content_de: contentEN,
  meta_title_de: 'SLP 2026 Leitfaden: Expats, Nomaden, Touristen',
  meta_description_de: 'Der ultimative Leitfaden 2026 zum Leben in San Luis Potosí mit verifizierten Preisen und den neuen Visa-Regeln.',

  title_ja: 'サン・ルイス・ポトシ完全ガイド 2026：駐在員・デジタルノマド・旅行者向け',
  excerpt_ja: '2026年完全アップデート。3月確認済み価格、2026年新UMAビザ規則、51のコワーキング施設、ワステカ・ポトシナ観光まで網羅。',
  content_ja: contentEN,
  meta_title_ja: 'サン・ルイス・ポトシ 2026ガイド',
  meta_description_ja: '2026年版完全ガイド：検証済み価格、UMAビザ規則、コワーキング、ワステカ・ポトシナ観光。駐在員・ノマド・旅行者向け。',
};

(async () => {
  console.log('Checking for existing post...');
  const { data: existing } = await supabase.from('blog_posts').select('id, slug').eq('slug', SLUG).maybeSingle();
  if (existing) {
    console.log('Updating existing post:', existing.id);
    const { error } = await supabase.from('blog_posts').update(post).eq('id', existing.id);
    if (error) { console.error('Update error:', error); process.exit(1); }
    console.log('✅ Post updated');
  } else {
    console.log('Inserting new post...');
    const { data, error } = await supabase.from('blog_posts').insert(post).select().single();
    if (error) { console.error('Insert error:', error); process.exit(1); }
    console.log('✅ Post published! ID:', data.id);
  }
  console.log(`\n📰 View at: https://sanluisway.com/blog/${SLUG}`);
})();
