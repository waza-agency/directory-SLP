const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const blogPost = {
  slug: 'foreign-direct-investment-slp-job-market-foreign-professionals',
  title: 'Inversión Extranjera Directa en SLP: Un Detalle Profundo sobre el Panorama Laboral para Profesionistas Extranjeros',
  title_en: 'Foreign Direct Investment in San Luis Potosí: A Deep Dive into the Job Market for Foreign Professionals',
  excerpt: 'San Luis Potosí se ha consolidado como uno de los principales destinos de inversión extranjera en México, con más de $3,000 millones de dólares proyectados para 2025. Descubre las oportunidades, requisitos de visa e información práctica para profesionistas extranjeros.',
  excerpt_en: 'San Luis Potosí has emerged as one of Mexico\'s top destinations for foreign investment, with over $3 billion projected for 2025. Discover the opportunities, visa requirements, and practical insights for foreign professionals seeking careers in this booming industrial hub.',
  category: 'expat-life',
  image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&q=80',
  meta_title: 'Foreign Direct Investment in San Luis Potosí | Jobs for Foreign Professionals',
  meta_description: 'Complete guide to FDI in San Luis Potosí: job opportunities, visa requirements, salaries, and cost of living for foreign professionals. $3B+ investment projected for 2025.',
  tags: ['expat-life', 'careers', 'investment', 'nearshoring', 'jobs'],
  content: `
<div class="prose prose-lg lg:prose-xl max-w-none">

<!-- HERO SECTION -->
<div class="not-prose mb-12">
  <div class="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
    <img
      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&q=80"
      alt="Modern industrial buildings representing foreign investment in San Luis Potosí"
      class="w-full h-full object-cover"
      loading="eager"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
      <div class="p-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Foreign Direct Investment in San Luis Potosí</h1>
        <p class="text-xl text-white/90">A Deep Dive into Job Opportunities for Foreign Professionals</p>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between text-sm text-gray-600 mb-8">
    <div class="flex items-center gap-4">
      <span>By <strong class="text-gray-900">San Luis Way</strong></span>
      <span>•</span>
      <span>December 3, 2025</span>
      <span>•</span>
      <span>18 min read</span>
    </div>
    <div class="flex gap-2">
      <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Expat Life</span>
      <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Career</span>
    </div>
  </div>
</div>

<!-- TABLE OF CONTENTS -->
<div class="not-prose mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-blue-100">
  <h3 class="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
    <span>📑</span> In This Deep Dive
  </h3>
  <nav class="space-y-2">
    <a href="#fdi-overview" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 1. FDI Overview: Why SLP is Booming</a>
    <a href="#key-industries" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 2. Key Industries & Major Employers</a>
    <a href="#nearshoring" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 3. The Nearshoring Effect</a>
    <a href="#job-opportunities" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 4. Job Opportunities for Foreign Professionals</a>
    <a href="#visa-requirements" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 5. Work Visa Requirements & Process</a>
    <a href="#salaries" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 6. Salary Expectations</a>
    <a href="#cost-of-living" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 7. Cost of Living Comparison</a>
    <a href="#practical-tips" class="block text-blue-600 hover:text-blue-800 hover:underline transition-colors">→ 8. Practical Tips for Job Seekers</a>
  </nav>
  <p class="mt-4 text-sm text-gray-600 italic">Estimated reading time: 18 minutes</p>
</div>

<!-- OPENING HOOK -->
<p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
  <strong>San Luis Potosí is experiencing an unprecedented industrial boom.</strong> With foreign direct investment projected to exceed $3 billion USD in 2025 and companies from Germany, Japan, China, and the United States establishing operations, the state has become a magnet for international talent. For foreign professionals considering a career move to Mexico, SLP offers a unique combination of multinational employers, competitive salaries, and a lower cost of living than major cities—all while maintaining the charm of a mid-sized Mexican city with rich cultural heritage.
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  This comprehensive guide explores the current investment landscape, identifies the industries and companies actively hiring, breaks down the visa requirements step by step, and provides practical insights for foreign professionals looking to build their careers in one of Mexico's most dynamic industrial hubs.
</p>

<!-- SECTION 1: FDI OVERVIEW -->
<section id="fdi-overview" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-4 inline-block">
      1. FDI Overview: Why San Luis Potosí is Booming
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to data from Mexico's Secretaría de Desarrollo Económico (SEDECO), San Luis Potosí has positioned itself as a national leader in attracting foreign investment. The state captured <strong>$3,649.4 million USD</strong> in Foreign Direct Investment during 2024, placing it among the top 10 states nationwide for FDI attraction.
  </p>

  <!-- STATISTICAL HIGHLIGHT -->
  <div class="not-prose my-8 bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg text-center">
    <p class="text-6xl font-bold text-purple-700 mb-3">$3B+</p>
    <p class="text-xl font-semibold text-gray-800 mb-2">Projected FDI for 2025</p>
    <p class="text-sm text-gray-600">Source: Gobierno del Estado de SLP, September 2025</p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The investment landscape shows impressive momentum. In the period covering Q4 2024 and Q1 2025, the state added $894.5 million USD in new investments. Governor Ricardo Gallardo Cardona announced that with major investments like Volex's $2 billion commitment, San Luis Potosí has already accumulated $2,642 million USD—surpassing the total recorded in 2024.
  </p>

  <!-- KEY INVESTMENT SOURCES -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 text-center">
      <p class="text-4xl mb-2">🇩🇪</p>
      <p class="text-3xl font-bold text-gray-900">$572M</p>
      <p class="text-gray-600 mt-2">Germany</p>
      <p class="text-sm text-gray-500">Leading investor (Jan-Jun 2024)</p>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 text-center">
      <p class="text-4xl mb-2">🇨🇦</p>
      <p class="text-3xl font-bold text-gray-900">$136M</p>
      <p class="text-gray-600 mt-2">Canada</p>
      <p class="text-sm text-gray-500">Second largest source</p>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-800 text-center">
      <p class="text-4xl mb-2">🇺🇸</p>
      <p class="text-3xl font-bold text-gray-900">$113M</p>
      <p class="text-gray-600 mt-2">United States</p>
      <p class="text-sm text-gray-500">Third largest source</p>
    </div>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Recent announcements highlight the diversity of incoming investment. Five new international companies—<strong>KBY México, Lubricantes Fuchs, Unitekno, Kingfa Sci & Tech, and San Luis Dasung</strong>—have established operations, creating 2,003 direct jobs with positive ripple effects across construction, commerce, and services sectors.
  </p>

  <!-- RESEARCH CITATION -->
  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">📚</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Investment Outlook</h4>
        <p class="text-gray-700 mb-3">
          "At least 10 companies have expressed interest in establishing operations in San Luis Potosí during 2025, and in recent months, investments of approximately 200 million dollars have been finalized."
        </p>
        <p class="text-sm text-gray-600">
          — Secretaría de Desarrollo Económico, <em>Estado de San Luis Potosí</em> (2025)
        </p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 2: KEY INDUSTRIES -->
<section id="key-industries" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-green-500 pb-4 inline-block">
      2. Key Industries & Major Employers
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The state's industrial infrastructure is supported by <strong>19 industrial parks</strong>, mostly located in the capital area, offering strategic locations, efficient logistics services, and standards that meet international investor expectations. According to the Unión de Usuarios de la Zona Industrial (UUZI), approximately 520 companies operate across 3,800 hectares, including the Villa de Reyes conurbation, generating around 120,000 direct jobs.
  </p>

  <!-- INDUSTRY BREAKDOWN -->
  <div class="not-prose my-12">
    <h4 class="text-2xl font-semibold mb-6 text-gray-900">Major Industries in San Luis Potosí</h4>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h5 class="text-xl font-semibold text-blue-900 mb-3">🚗 Automotive & Autoparts</h5>
        <p class="text-gray-700 mb-4">The dominant sector, featuring major OEMs and over 230 supplier companies.</p>
        <p class="text-sm text-gray-600"><strong>Key Players:</strong> BMW, General Motors, Bosch, Continental, Lear Corporation, Magna</p>
      </div>

      <div class="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
        <h5 class="text-xl font-semibold text-green-900 mb-3">🏭 Manufacturing</h5>
        <p class="text-gray-700 mb-4">Advanced manufacturing including appliances, electronics, and industrial equipment.</p>
        <p class="text-sm text-gray-600"><strong>Key Players:</strong> Mabe, Nestlé, Goodyear, ABB</p>
      </div>

      <div class="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
        <h5 class="text-xl font-semibold text-purple-900 mb-3">⚡ Energy & Heavy Industry</h5>
        <p class="text-gray-700 mb-4">Growing sector with investments in sustainable energy and heavy manufacturing.</p>
        <p class="text-sm text-gray-600"><strong>Key Players:</strong> Grupo Alfa, Franke (Swiss)</p>
      </div>

      <div class="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
        <h5 class="text-xl font-semibold text-orange-900 mb-3">📦 Logistics & Distribution</h5>
        <p class="text-gray-700 mb-4">Strategic hub for distribution thanks to central location and infrastructure.</p>
        <p class="text-sm text-gray-600"><strong>Recent Investment:</strong> Automann USA ($50M distribution center)</p>
      </div>
    </div>
  </div>

  <!-- BMW FEATURE -->
  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&h=600&fit=crop&q=80"
        alt="Modern automotive manufacturing facility representing BMW and other automakers in SLP"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      BMW Group's San Luis Potosí plant employs over 2,500 workers and features cutting-edge digitalization technologies
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    <strong>BMW Group</strong> deserves special mention as one of the largest employers of international talent. The San Luis Potosí plant, which opened in 2019, features innovative digitalization technologies and a robust infrastructure. According to Hermann Bohrer, President and CEO of the SLP plant, the company has received overwhelming interest from candidates, including people from other states and even the United States.
  </p>

  <!-- CASE STUDY: BMW -->
  <div class="not-prose my-12 bg-green-50 border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
    <div class="bg-green-500 px-8 py-4">
      <h3 class="text-2xl font-bold text-white flex items-center gap-3">
        <span>📖</span> Company Spotlight: BMW Group San Luis Potosí
      </h3>
    </div>

    <div class="p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">2,500+</p>
          <p class="text-sm text-gray-600 mt-1">Direct Employees</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">4,500</p>
          <p class="text-sm text-gray-600 mt-1">Applicants (Last Call)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">3+</p>
          <p class="text-sm text-gray-600 mt-1">Years Experience Required</p>
        </div>
      </div>

      <div class="prose prose-green">
        <p class="text-gray-700 mb-4">
          <strong>Hiring Focus:</strong> Mechanical engineers, software engineers, electrical engineers, quality engineers, IT specialists, and logistics coordinators.
        </p>
        <p class="text-gray-700 mb-4">
          <strong>Requirements:</strong> Bachelor's degree in engineering (Industrial, Mechatronics, or related), 3+ years experience, fluent business English (spoken and written).
        </p>
        <p class="text-gray-700">
          <strong>Recent Expansion:</strong> BMW is expanding EV production capacity, creating additional opportunities for professionals with electric vehicle expertise.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 3: NEARSHORING -->
<section id="nearshoring" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-4 inline-block">
      3. The Nearshoring Effect
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The global shift toward nearshoring—relocating production closer to end markets—has positioned San Luis Potosí as a prime destination for companies restructuring their supply chains. The state offers a favorable environment thanks to its geographic, cultural, and economic advantages, along with streamlined administrative processes.
  </p>

  <div class="not-prose my-8 bg-gradient-to-br from-orange-100 to-yellow-100 p-8 rounded-2xl shadow-lg text-center">
    <p class="text-5xl font-bold text-orange-700 mb-3">39%</p>
    <p class="text-xl font-semibold text-gray-800 mb-2">of nearshoring demand comes from automotive</p>
    <p class="text-sm text-gray-600">The automotive industry remains the primary driver of nearshoring in Mexico (2024)</p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The numbers tell a compelling story. Coahuila and San Luis Potosí together represent 8% ($2.474 billion) of total investment announcements in H1 2024, emerging as leaders in expected job creation with 15,124 new positions—24% of the 62,940 projected nationally.
  </p>

  <!-- EXPERT QUOTE -->
  <blockquote class="not-prose my-12 bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-blue-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "San Luis Potosí possesses a privileged condition in the country that must be leveraged. Its logistics connection with Nuevo León, Jalisco, and the Bajío region makes it an ideal platform for nearshoring operations."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Industry Analysts</cite>
        <p class="text-sm text-gray-600">Mexico Industry Report, 2024</p>
      </div>
    </footer>
  </blockquote>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Notable nearshoring investments include Shanghai Unison's $400 million commitment generating 3,000 jobs, and Chinese investments from Himile ($800 million pesos) and Asiaway Automotive Components ($750 million pesos) creating specialized manufacturing facilities for the automotive sector.
  </p>

  <!-- INDUSTRIAL SPACE STATS -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=500&fit=crop&q=80"
        alt="Modern industrial park representing nearshoring opportunities in SLP"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>

    <div class="bg-blue-50 p-8 rounded-xl border-l-4 border-blue-500">
      <h4 class="text-2xl font-semibold mb-4 text-blue-900">Industrial Space Absorption</h4>
      <ul class="list-disc pl-6 text-blue-800 space-y-2">
        <li>SLP accounts for <strong>8%</strong> of industrial space absorption</li>
        <li><strong>61%</strong> from new companies entering the market</li>
        <li><strong>39%</strong> from existing company expansions</li>
        <li>2+ million m² absorbed nationwide in 2024</li>
        <li>5% annual growth in industrial real estate</li>
      </ul>
    </div>
  </div>
</section>

<!-- SECTION 4: JOB OPPORTUNITIES -->
<section id="job-opportunities" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-4 inline-block">
      4. Job Opportunities for Foreign Professionals
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The influx of foreign investment has created significant demand for skilled professionals, particularly those with international experience and language capabilities. While Mexican labor law generally prioritizes local hiring, multinational companies actively seek foreign talent for specialized roles, leadership positions, and technical expertise.
  </p>

  <!-- MOST DEMANDED PROFILES -->
  <div class="not-prose my-12 bg-purple-50 border-2 border-purple-200 rounded-2xl p-8">
    <h4 class="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🎯</span> Most Demanded Professional Profiles
    </h4>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-5 rounded-lg shadow-sm">
        <h5 class="font-semibold text-gray-900 mb-2">🔧 Engineering</h5>
        <ul class="text-gray-700 text-sm space-y-1">
          <li>• Industrial Engineers</li>
          <li>• Mechanical Engineers</li>
          <li>• Electrical Engineers</li>
          <li>• Software Engineers</li>
          <li>• Quality Engineers</li>
        </ul>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm">
        <h5 class="font-semibold text-gray-900 mb-2">💼 Management</h5>
        <ul class="text-gray-700 text-sm space-y-1">
          <li>• Plant Managers</li>
          <li>• Operations Directors</li>
          <li>• Supply Chain Managers</li>
          <li>• HR Directors (Multinational exp.)</li>
          <li>• Finance Controllers</li>
        </ul>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm">
        <h5 class="font-semibold text-gray-900 mb-2">💻 Technology</h5>
        <ul class="text-gray-700 text-sm space-y-1">
          <li>• SAP Specialists</li>
          <li>• DevOps Engineers</li>
          <li>• Java/Cloud Developers</li>
          <li>• IT Infrastructure</li>
          <li>• Automation Engineers</li>
        </ul>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm">
        <h5 class="font-semibold text-gray-900 mb-2">🔬 Specialized</h5>
        <ul class="text-gray-700 text-sm space-y-1">
          <li>• EV/Battery Specialists</li>
          <li>• GD&T/SPC Experts</li>
          <li>• CNC Machinists</li>
          <li>• Lean/Six Sigma Consultants</li>
          <li>• Environmental Engineers</li>
        </ul>
      </div>
    </div>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to job market data, the most in-demand fields in San Luis Potosí include Industrial Engineering (13,600 professionals), Business Administration (7,990), and Law (7,050). For foreign professionals, the sweet spot lies in positions requiring a combination of technical expertise, international experience, and bilingual capabilities.
  </p>

  <!-- COMPANIES ACTIVELY HIRING -->
  <div class="not-prose my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
    <p class="text-amber-900">
      <strong>📌 Companies Actively Hiring International Talent:</strong> JTEKT Automotive México, Valeo Sistemas Eléctricos, SMR Automotive Vision, and various Japanese electronics companies specifically mention seeking candidates with automotive industry experience and advanced English skills.
    </p>
  </div>
</section>

<!-- SECTION 5: VISA REQUIREMENTS -->
<section id="visa-requirements" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-red-500 pb-4 inline-block">
      5. Work Visa Requirements & Process
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Working legally in Mexico requires a specific visa, and it's crucial to understand that <strong>you cannot initiate the process independently</strong>—the visa for work purposes can only be obtained through a formal job offer from a Mexican employer.
  </p>

  <!-- VISA TYPES -->
  <div class="not-prose my-12">
    <h4 class="text-2xl font-semibold mb-8 text-gray-900 text-center">Work Visa Options</h4>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
        <h5 class="text-xl font-semibold text-gray-900 mb-3">Visitor with Work Permit</h5>
        <p class="text-gray-700 mb-4">For assignments up to 180 days (6 months).</p>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>✓ Short-term projects</li>
          <li>✓ Training assignments</li>
          <li>✓ Temporary transfers</li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
        <h5 class="text-xl font-semibold text-gray-900 mb-3">Temporary Resident</h5>
        <p class="text-gray-700 mb-4">For stays of 1-4 years with work authorization.</p>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>✓ Most common for professionals</li>
          <li>✓ Renewable annually</li>
          <li>✓ Family members eligible</li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
        <h5 class="text-xl font-semibold text-gray-900 mb-3">Permanent Resident</h5>
        <p class="text-gray-700 mb-4">For stays exceeding 4 years.</p>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>✓ No renewal required</li>
          <li>✓ Full work rights</li>
          <li>✓ Path to citizenship</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- STEP BY STEP PROCESS -->
  <div class="not-prose my-12">
    <h4 class="text-2xl font-semibold mb-8 text-gray-900 text-center">Step-by-Step Visa Process</h4>

    <div class="relative">
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

      <div class="space-y-8">
        <div class="relative flex items-start gap-6">
          <div class="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
            1
          </div>
          <div class="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h5 class="text-xl font-semibold text-gray-900 mb-3">Employer Registration with INM</h5>
            <p class="text-gray-700">The company must be registered with Mexico's Instituto Nacional de Migración (INM) as an authorized employer of foreign nationals. They obtain a "constancia de inscripción de empleador."</p>
          </div>
        </div>

        <div class="relative flex items-start gap-6">
          <div class="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
            2
          </div>
          <div class="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h5 class="text-xl font-semibold text-gray-900 mb-3">INM Application & Authorization</h5>
            <p class="text-gray-700">The employer submits a formal request to INM. If approved, INM issues a visa authorization number (NUT - Número Único de Trámite).</p>
          </div>
        </div>

        <div class="relative flex items-start gap-6">
          <div class="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
            3
          </div>
          <div class="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h5 class="text-xl font-semibold text-gray-900 mb-3">Consulate Appointment</h5>
            <p class="text-gray-700">With the NUT, you visit the nearest Mexican consulate in your country of residence with required documents. The visa is stamped in your passport.</p>
          </div>
        </div>

        <div class="relative flex items-start gap-6">
          <div class="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
            4
          </div>
          <div class="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h5 class="text-xl font-semibold text-gray-900 mb-3">Resident Card Exchange</h5>
            <p class="text-gray-700">Within 30 calendar days of entering Mexico, you must visit INM to exchange your visa for a Tarjeta de Residente Temporal (Temporary Resident Card) with work authorization.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- REQUIRED DOCUMENTS -->
  <div class="not-prose my-12 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl">
    <h4 class="text-2xl font-bold mb-6 flex items-center gap-3">
      <span class="text-3xl">📋</span> Required Documents
    </h4>
    <ul class="space-y-4">
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg"><strong>Job Offer Letter:</strong> On company letterhead specifying position, salary, work location, and duration (per SINCO classification)</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg"><strong>Valid Passport:</strong> With at least 6 months validity remaining</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg"><strong>Recent Photo:</strong> Color, passport-size, face visible, no glasses</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg"><strong>NUT Number:</strong> Authorization number issued by INM</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg"><strong>Visa Application Form:</strong> Completed and signed</p>
      </li>
    </ul>
  </div>

  <!-- IMPORTANT WARNING -->
  <div class="not-prose my-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
    <p class="text-red-900">
      <strong>⚠️ Important:</strong> You cannot enter Mexico as a tourist and then convert to a work visa. The work visa must be obtained <em>before</em> entering the country. Working without proper authorization is illegal and can result in deportation and future entry bans.
    </p>
  </div>
</section>

<!-- SECTION 6: SALARIES -->
<section id="salaries" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-green-500 pb-4 inline-block">
      6. Salary Expectations
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Salary levels in San Luis Potosí are competitive within Mexico's industrial landscape, though generally lower than Mexico City. However, when combined with the significantly lower cost of living, professionals often find their purchasing power is actually higher.
  </p>

  <!-- SALARY TABLE -->
  <div class="not-prose overflow-x-auto my-12">
    <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
      <thead class="bg-gradient-to-r from-blue-600 to-blue-700">
        <tr>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Position</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Entry Level</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Mid-Level</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Senior</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Industrial Engineer</td>
          <td class="px-6 py-4 text-gray-700">$15,000 - $18,000</td>
          <td class="px-6 py-4 text-gray-700">$22,000 - $30,000</td>
          <td class="px-6 py-4 text-gray-700">$35,000 - $45,000</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Quality Engineer</td>
          <td class="px-6 py-4 text-gray-700">$18,000 - $22,000</td>
          <td class="px-6 py-4 text-gray-700">$25,000 - $35,000</td>
          <td class="px-6 py-4 text-gray-700">$40,000 - $55,000</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Software Engineer</td>
          <td class="px-6 py-4 text-gray-700">$20,000 - $28,000</td>
          <td class="px-6 py-4 text-gray-700">$35,000 - $50,000</td>
          <td class="px-6 py-4 text-gray-700">$55,000 - $80,000</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Plant Manager</td>
          <td class="px-6 py-4 text-gray-700">—</td>
          <td class="px-6 py-4 text-gray-700">$80,000 - $120,000</td>
          <td class="px-6 py-4 text-gray-700">$150,000+</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">SAP Specialist</td>
          <td class="px-6 py-4 text-gray-700">$25,000 - $35,000</td>
          <td class="px-6 py-4 text-gray-700">$45,000 - $60,000</td>
          <td class="px-6 py-4 text-gray-700">$70,000 - $90,000</td>
        </tr>
      </tbody>
    </table>
    <p class="mt-4 text-sm text-gray-600 italic text-center">All figures in Mexican Pesos (MXN) per month. Sources: Glassdoor, Indeed México, 2024</p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to Glassdoor, the estimated total pay for an Industrial Engineer in San Luis Potosí is $22,042 MXN per month, with a base salary averaging $17,000 MXN. Top performers can earn up to $39,167 MXN monthly. Nationally, engineering ranks as the fifth highest-paying career field, with an average monthly salary of $16,000 MXN.
  </p>

  <!-- PRO TIPS -->
  <div class="not-prose my-12 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">💡</span> Salary Negotiation Tips
    </h4>

    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Negotiate Beyond Base Salary</p>
        <p class="text-gray-700">Many companies offer attractive benefits packages including housing allowances, car allowances, private health insurance, and relocation assistance. These can add 20-40% to your total compensation.</p>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Leverage Bilingual Skills</p>
        <p class="text-gray-700">Positions requiring fluent English (and especially German or Japanese) command premiums of 15-30% over Spanish-only roles.</p>
      </div>

      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Consider Total Package</p>
        <p class="text-gray-700">Factor in aguinaldo (13th month bonus), vacation premium, profit sharing (PTU), and savings fund contributions when evaluating offers.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION 7: COST OF LIVING -->
<section id="cost-of-living" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-teal-500 pb-4 inline-block">
      7. Cost of Living Comparison
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    One of the most compelling reasons to consider San Luis Potosí is its favorable cost of living. According to Expatistan, living in Mexico City costs <strong>26% more</strong> than in San Luis Potosí. To maintain the same lifestyle that costs $38,000 MXN monthly in SLP, you would need approximately $47,777 MXN in Mexico City.
  </p>

  <!-- COST COMPARISON -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl shadow-lg">
      <h4 class="text-2xl font-semibold text-teal-900 mb-6">Monthly Expenses (Individual)</h4>
      <ul class="space-y-4">
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Rent (1BR, City Center)</span>
          <span class="font-semibold text-gray-900">$8,000 - $12,000</span>
        </li>
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Rent (1BR, Outside Center)</span>
          <span class="font-semibold text-gray-900">$5,000 - $8,000</span>
        </li>
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Utilities</span>
          <span class="font-semibold text-gray-900">$1,500 - $2,500</span>
        </li>
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Groceries</span>
          <span class="font-semibold text-gray-900">$3,000 - $5,000</span>
        </li>
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Dining Out</span>
          <span class="font-semibold text-gray-900">$2,000 - $4,000</span>
        </li>
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Transportation</span>
          <span class="font-semibold text-gray-900">$1,500 - $3,000</span>
        </li>
        <li class="flex justify-between items-center border-b border-teal-200 pb-2">
          <span class="text-gray-700">Gym Membership</span>
          <span class="font-semibold text-gray-900">$500 - $800</span>
        </li>
        <li class="flex justify-between items-center pt-2">
          <span class="text-lg font-bold text-teal-900">Total Range</span>
          <span class="text-lg font-bold text-teal-900">$21,500 - $35,300</span>
        </li>
      </ul>
    </div>

    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg">
      <h4 class="text-2xl font-semibold text-blue-900 mb-6">Housing Market 2024</h4>
      <p class="text-gray-700 mb-4">
        The average home price in the San Luis Potosí metropolitan area increased by over 10% in 2024:
      </p>
      <ul class="space-y-3">
        <li class="flex justify-between items-center border-b border-blue-200 pb-2">
          <span class="text-gray-700">Capital City (avg)</span>
          <span class="font-semibold text-gray-900">$1,740,328</span>
        </li>
        <li class="flex justify-between items-center border-b border-blue-200 pb-2">
          <span class="text-gray-700">Soledad de G.S. (avg)</span>
          <span class="font-semibold text-gray-900">$1,746,628</span>
        </li>
        <li class="flex justify-between items-center border-b border-blue-200 pb-2">
          <span class="text-gray-700">National Average</span>
          <span class="font-semibold text-gray-900">$1,736,495</span>
        </li>
      </ul>
      <p class="text-sm text-gray-600 mt-4 italic">
        To purchase a home, estimated required income: $12,000-$15,000 MXN monthly per million pesos of property value.
      </p>
    </div>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    For a more budget-conscious lifestyle, nearby municipalities like <strong>Cerritos</strong>, <strong>Rioverde</strong>, and <strong>Xilitla</strong> offer significantly lower costs while still providing access to SLP's job market. These areas feature lower housing costs, rural charm, and a more relaxed pace of life—perfect for those who don't mind a commute.
  </p>
</section>

<!-- SECTION 8: PRACTICAL TIPS -->
<section id="practical-tips" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-indigo-500 pb-4 inline-block">
      8. Practical Tips for Foreign Job Seekers
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Breaking into the SLP job market requires a strategic approach. Here are actionable recommendations based on current market conditions and employer feedback.
  </p>

  <!-- TIPS GRID -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
      <h5 class="text-xl font-semibold text-indigo-900 mb-3">🔍 Research Target Companies</h5>
      <p class="text-gray-700">Focus on multinational companies from your home country. German professionals should target BMW and Bosch; Americans should look at GM and Lear; Japanese professionals at Toyota suppliers and electronics firms.</p>
    </div>

    <div class="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
      <h5 class="text-xl font-semibold text-green-900 mb-3">🌐 Leverage LinkedIn Mexico</h5>
      <p class="text-gray-700">Mexican recruiters and HR professionals actively use LinkedIn. Optimize your profile in both English and Spanish. Join groups like "Industria Automotriz México" and "Expats in San Luis Potosí."</p>
    </div>

    <div class="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
      <h5 class="text-xl font-semibold text-orange-900 mb-3">📚 Invest in Spanish</h5>
      <p class="text-gray-700">While many multinationals operate in English, Spanish proficiency significantly expands your options and improves quality of life. Even intermediate Spanish opens doors at more companies.</p>
    </div>

    <div class="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
      <h5 class="text-xl font-semibold text-purple-900 mb-3">🎯 Target the Right Roles</h5>
      <p class="text-gray-700">Focus on positions that leverage your international experience: global project coordination, international supplier management, cross-cultural team leadership, or specialized technical expertise not readily available locally.</p>
    </div>
  </div>

  <!-- JOB SEARCH RESOURCES -->
  <div class="not-prose my-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
    <h4 class="text-lg font-semibold mb-4 text-gray-900">📚 Job Search Resources</h4>
    <ul class="space-y-3">
      <li>
        <a href="https://www.bmwgroup.jobs/mx/es.html" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">
          → BMW Group Careers Mexico
        </a>
        <p class="text-sm text-gray-600 mt-1">Official job portal for all BMW positions in San Luis Potosí</p>
      </li>
      <li>
        <a href="https://www.occ.com.mx/empleos/en-san-luis-potosi/" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">
          → OCC Mundial - San Luis Potosí
        </a>
        <p class="text-sm text-gray-600 mt-1">Mexico's largest job board with extensive SLP listings</p>
      </li>
      <li>
        <a href="https://mx.indeed.com" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">
          → Indeed México
        </a>
        <p class="text-sm text-gray-600 mt-1">International job platform with strong Mexico presence</p>
      </li>
      <li>
        <a href="https://www.glassdoor.com.mx" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">
          → Glassdoor México
        </a>
        <p class="text-sm text-gray-600 mt-1">Salary insights and company reviews</p>
      </li>
    </ul>
  </div>

  <!-- KEY TAKEAWAYS -->
  <div class="not-prose my-12 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl">
    <h4 class="text-2xl font-bold mb-6 flex items-center gap-3">
      <span class="text-3xl">🎯</span> Key Takeaways
    </h4>
    <ul class="space-y-4">
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg">SLP is one of Mexico's hottest investment destinations, with $3B+ projected for 2025 and major players like BMW, GM, Bosch, and Continental actively expanding.</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg">Work visas require a formal job offer—you cannot come as a tourist and find work. Start your job search while still abroad.</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg">Engineering, IT, and management roles with international experience and bilingual skills are in highest demand.</p>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
        <p class="text-lg">Cost of living is 26% lower than Mexico City, making your salary go further while enjoying a high quality of life.</p>
      </li>
    </ul>
  </div>

  <!-- CONCLUSION CTA -->
  <div class="not-prose mt-16 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-8 rounded-2xl">
    <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Explore Opportunities in San Luis Potosí?</h3>
    <p class="text-lg text-gray-700 mb-6">
      San Luis Potosí's industrial boom is creating unprecedented opportunities for foreign professionals. Whether you're an engineer looking to work with cutting-edge automotive technology, an IT specialist seeking SAP or cloud development roles, or a manager with international experience, the city offers a compelling combination of career growth and quality of life.
    </p>
    <p class="text-lg text-gray-700 mb-6">
      Start by researching target companies, connecting with recruiters on LinkedIn, and reaching out to expat communities already established in the area. The investment wave is only accelerating—and so are the opportunities.
    </p>
    <a href="/expat-guide" class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
      Explore Our Expat Guide →
    </a>
  </div>

</div>
`
};

async function publishPost() {
  console.log('Publishing blog post: Foreign Direct Investment Deep Dive...\n');

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      ...blogPost,
      content_en: blogPost.content,
      status: 'published',
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select();

  if (error) {
    console.error('Error publishing post:', error);
    return;
  }

  console.log('✅ Blog post published successfully!');
  console.log('Title:', blogPost.title);
  console.log('Slug:', blogPost.slug);
  console.log('URL: /blog/' + blogPost.slug);
}

publishPost();
