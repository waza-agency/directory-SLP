-- Insert new blog post: Arrival Checklist - Your First 30 Days in San Luis Potosí
INSERT INTO public.blog_posts (
  id,
  slug,
  title,
  content,
  excerpt,
  meta_title,
  meta_description,
  image_url,
  category,
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'arrival-checklist-first-30-days-san-luis-potosi',
  'Arrival Checklist: Your First 30 Days in San Luis Potosí',
  $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Guía de Contenido / Table of Contents</h2>
  <ul class="list-disc pl-6 space-y-1">
    <li><a href="#first-week" class="text-blue-600 hover:text-blue-800">First Week Essentials (Days 1-7)</a></li>
    <li><a href="#administrative" class="text-blue-600 hover:text-blue-800">Administrative & Bureaucratic Tasks</a></li>
    <li><a href="#home-services" class="text-blue-600 hover:text-blue-800">Setting Up Home & Services</a></li>
    <li><a href="#financial" class="text-blue-600 hover:text-blue-800">Financial Setup</a></li>
    <li><a href="#healthcare" class="text-blue-600 hover:text-blue-800">Healthcare & Medical</a></li>
    <li><a href="#social" class="text-blue-600 hover:text-blue-800">Social & Community Integration</a></li>
    <li><a href="#daily-life" class="text-blue-600 hover:text-blue-800">Practical Daily Life</a></li>
    <li><a href="#resources" class="text-blue-600 hover:text-blue-800">Resources & Contacts</a></li>
    <li><a href="#faq" class="text-blue-600 hover:text-blue-800">FAQ</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">

<p class="text-lg text-gray-700 mb-8"><strong>Congratulations on your arrival in San Luis Potosí! This comprehensive checklist will guide you through your first 30 days, from immediate essentials to long-term setup. Use the interactive checkboxes to track your progress as you settle into your new home.</strong></p>

<!-- Quick Overview -->
<div class="bg-blue-50 p-6 rounded-lg mb-8">
  <h3 class="text-lg font-semibold mb-4 text-blue-900">Quick Overview</h3>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">30</p>
      <p class="text-sm text-blue-800">Days to Settle In</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">45+</p>
      <p class="text-sm text-blue-800">Checklist Items</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">8</p>
      <p class="text-sm text-blue-800">Categories</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-bold text-blue-700">Free</p>
      <p class="text-sm text-blue-800">Most Tasks</p>
    </div>
  </div>
</div>

<!-- FIRST WEEK ESSENTIALS -->
<section id="first-week" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">First Week Essentials (Days 1-7)</h2>
  <p class="text-gray-700 mb-6">Focus on immediate needs to function comfortably in your first days. These are the absolute basics you'll need right away.</p>

  <div class="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-red-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">📱</span> Connectivity & Communication
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-red-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Get a Mexican SIM card with data plan</p>
          <p class="text-sm text-gray-600 mt-1">Best options: <strong>Telcel</strong> (best coverage), <strong>AT&T México</strong>, or <strong>Movistar</strong>. Available at OXXO, Soriana, or carrier stores. Cost: $150-300 MXN for prepaid with data.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-red-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Download essential apps</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Uber</strong> & <strong>DiDi</strong> (rides), <strong>Rappi</strong> (delivery), <strong>Google Maps</strong> (navigation), <strong>WhatsApp</strong> (primary messaging in Mexico).</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-red-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up WhatsApp with your Mexican number</p>
          <p class="text-sm text-gray-600 mt-1">WhatsApp is THE communication tool in Mexico. Businesses, doctors, and friends all use it. Transfer your WhatsApp to your new number if needed.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-green-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">💰</span> Money & Currency
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Withdraw pesos from ATM</p>
          <p class="text-sm text-gray-600 mt-1">Use ATMs inside banks (Santander, BBVA, Banorte) for safety. Withdraw in pesos, decline conversion to your home currency. Daily limit: typically $10,000-15,000 MXN.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Keep cash for small purchases</p>
          <p class="text-sm text-gray-600 mt-1">Many small shops, markets, and street vendors are cash-only. Keep $500-1,000 MXN on hand for daily needs.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-green-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Understand tipping culture</p>
          <p class="text-sm text-gray-600 mt-1">Restaurants: 10-15%. Gas station attendants: $10-20 MXN. Baggers at supermarkets: $10-20 MXN. Valet parking: $20-50 MXN.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-blue-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🗣️</span> Basic Spanish & Culture
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Learn essential Spanish phrases</p>
          <p class="text-sm text-gray-600 mt-1">"Buenos días" (good morning), "Gracias" (thank you), "¿Cuánto cuesta?" (how much?), "La cuenta, por favor" (the bill, please), "No entiendo" (I don't understand).</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Download Google Translate (offline Spanish)</p>
          <p class="text-sm text-gray-600 mt-1">Download the Spanish language pack for offline use. The camera feature is great for menus and signs.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-blue-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Understand local customs</p>
          <p class="text-sm text-gray-600 mt-1">Greet with "Buenos días/tardes/noches". Meals are later (lunch 2-4pm, dinner 8-10pm). Sundays are family days - many places close early.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
    <h4 class="font-semibold text-yellow-800 mb-2">💡 Pro Tip:</h4>
    <p class="text-yellow-800">San Luis Potosí is NOT a tourist town - English is rarely spoken. Learning Spanish will dramatically improve your experience. Even basic attempts are appreciated by locals.</p>
  </div>
</section>

<!-- ADMINISTRATIVE TASKS -->
<section id="administrative" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Administrative & Bureaucratic Tasks</h2>
  <p class="text-gray-700 mb-6">Complete these official registrations within your first month to establish your legal presence and access services.</p>

  <div class="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-purple-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🏛️</span> Immigration & Government
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Complete INM address registration (if required)</p>
          <p class="text-sm text-gray-600 mt-1">If you have temporary/permanent residency, you must register your address at INM within 90 days of arrival. Bring: passport, residency card, proof of address. <a href="https://www.gob.mx/inm" target="_blank" class="text-blue-600 hover:underline">INM Website</a></p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Get your CURP (Clave Única de Registro de Población)</p>
          <p class="text-sm text-gray-600 mt-1">Mexico's unique population ID. Required for many services. Free to obtain at any Registro Civil office with your passport and residency card. <a href="https://www.gob.mx/curp/" target="_blank" class="text-blue-600 hover:underline">CURP Portal</a></p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Obtain RFC (if working or doing business)</p>
          <p class="text-sm text-gray-600 mt-1">Tax ID required for employment, opening business accounts, or receiving payments. Apply at SAT office with CURP, passport, and proof of address. <a href="https://www.sat.gob.mx/" target="_blank" class="text-blue-600 hover:underline">SAT Website</a></p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Register at your country's consulate (recommended)</p>
          <p class="text-sm text-gray-600 mt-1">Register with your embassy/consulate for emergency assistance and voting abroad. Most can be done online. Nearest US Consulate is in Monterrey.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-purple-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Consider Mexican driver's license (optional)</p>
          <p class="text-sm text-gray-600 mt-1">Your foreign license is valid for tourists, but residents should get a local one. Apply at Secretaría de Seguridad Pública with residency card, CURP, and proof of address. Cost: ~$800-1,200 MXN.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
    <h3 class="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
      <span class="text-2xl">⚠️</span> Important Deadlines
    </h3>
    <ul class="space-y-3 text-red-900">
      <li class="flex items-start gap-3">
        <span class="text-red-600 font-bold">📅</span>
        <div>
          <p class="font-semibold">INM Address Registration: Within 90 days</p>
          <p class="text-sm text-red-800 mt-1">Failure to register can result in fines or complications renewing your residency.</p>
        </div>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-red-600 font-bold">📅</span>
        <div>
          <p class="font-semibold">FMM Expiration (if tourist): 180 days max</p>
          <p class="text-sm text-red-800 mt-1">Overstaying results in fines and potential entry bans. Plan ahead if you need residency.</p>
        </div>
      </li>
    </ul>
  </div>
</section>

<!-- HOME & SERVICES -->
<section id="home-services" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Setting Up Home & Services</h2>
  <p class="text-gray-700 mb-6">Get your home fully functional with utilities and essential services.</p>

  <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-amber-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🔌</span> Utilities Setup
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-amber-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up electricity (CFE)</p>
          <p class="text-sm text-gray-600 mt-1">Transfer the account to your name at CFE office with lease contract and ID. Pay bills at OXXO, online, or bank. <a href="https://www.cfe.mx/" target="_blank" class="text-blue-600 hover:underline">CFE Website</a></p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-amber-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up water (INTERAPAS)</p>
          <p class="text-sm text-gray-600 mt-1">Water service in SLP. Transfer at INTERAPAS office with lease and ID. Bills typically $150-400 MXN/month. <a href="https://www.interapas.gob.mx/" target="_blank" class="text-blue-600 hover:underline">INTERAPAS Website</a></p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-amber-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Arrange gas delivery (tank or stationary)</p>
          <p class="text-sm text-gray-600 mt-1">Most homes use gas for cooking/heating. Main providers: Gas Express Nieto, Zeta Gas. Stationary tanks are refilled; portable tanks are exchanged. Cost varies by usage.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-amber-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up internet</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Telmex Infinitum</strong> (most coverage), <strong>Totalplay</strong> (fiber in select areas), <strong>Izzi</strong>. Plans from $400-800 MXN/month. Installation takes 3-7 days.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-amber-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Understand garbage collection schedule</p>
          <p class="text-sm text-gray-600 mt-1">Municipal garbage trucks pass 2-3 times per week. Listen for the bell/horn. Tip collectors $10-20 MXN. Some neighborhoods have private collection.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-cyan-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🏠</span> Home Essentials
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-cyan-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Buy water garrafones (5-gallon jugs)</p>
          <p class="text-sm text-gray-600 mt-1">Tap water is NOT drinkable. Buy garrafones from Bonafont, Ciel, or Epura. Many neighborhoods have delivery trucks passing daily. Cost: ~$30-40 MXN per garrafón.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-cyan-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Get a garrafón dispenser or filter</p>
          <p class="text-sm text-gray-600 mt-1">Available at Soriana, Walmart, or Amazon Mexico. Electric dispensers provide hot/cold water. Cost: $500-2,000 MXN.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-cyan-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Purchase furniture and household items</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Coppel</strong> and <strong>Elektra</strong> (affordable, financing available), <strong>Liverpool</strong> (mid-range), <strong>Amazon Mexico</strong> (great selection), <strong>Facebook Marketplace</strong> (used items).</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-cyan-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Get a small toolkit</p>
          <p class="text-sm text-gray-600 mt-1">Basic tools for minor repairs. Available at Ferretería (hardware stores) throughout the city, or Home Depot.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
    <h4 class="font-semibold text-yellow-800 mb-2">💡 Water Tip:</h4>
    <p class="text-yellow-800">Never drink tap water. Use garrafón water for drinking, cooking, making ice, and brushing teeth. Some expats install under-sink filters for convenience.</p>
  </div>
</section>

<!-- FINANCIAL SETUP -->
<section id="financial" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Financial Setup</h2>
  <p class="text-gray-700 mb-6">Establish your financial infrastructure for long-term living in Mexico.</p>

  <div class="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-emerald-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🏦</span> Banking & Payments
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-emerald-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Open a Mexican bank account</p>
          <p class="text-sm text-gray-600 mt-1">Requires: passport, residency card, CURP, proof of address. <strong>BBVA</strong> and <strong>Santander</strong> are expat-friendly. <strong>Banorte</strong> has good coverage locally. Initial deposit varies ($2,000-20,000 MXN).</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-emerald-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up Mercado Pago</p>
          <p class="text-sm text-gray-600 mt-1">Mexico's most popular digital wallet. Works at many stores, can transfer to friends, and pay bills. Link to your Mexican bank account for easy top-up.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-emerald-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up SPEI transfers</p>
          <p class="text-sm text-gray-600 mt-1">Mexico's instant bank transfer system. Free, fast, and widely used for rent, services, and purchases. Your bank app will have this feature.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-emerald-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up international transfer method</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Wise</strong> (best rates), <strong>Remitly</strong>, or wire transfer. For regular transfers, Wise multi-currency account works well.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-emerald-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Understand bill payment options</p>
          <p class="text-sm text-gray-600 mt-1">Pay bills at: <strong>OXXO</strong> (24/7 convenience stores), bank apps, online portals, or bank branches. OXXO is the easiest for most services.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="overflow-x-auto mb-8">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Bank</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Min. Deposit</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Monthly Fee</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Notes</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BBVA</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2,000 MXN</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0-150 MXN</td>
          <td class="px-6 py-4 text-sm text-gray-500">Good app, expat-friendly</td>
        </tr>
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Santander</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,000 MXN</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0-180 MXN</td>
          <td class="px-6 py-4 text-sm text-gray-500">Some English support</td>
        </tr>
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Banorte</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,000 MXN</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0-99 MXN</td>
          <td class="px-6 py-4 text-sm text-gray-500">Mexican bank, good local coverage</td>
        </tr>
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HSBC</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$20,000 MXN</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0-250 MXN</td>
          <td class="px-6 py-4 text-sm text-gray-500">Premium accounts, intl. transfers</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- HEALTHCARE -->
<section id="healthcare" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Healthcare & Medical</h2>
  <p class="text-gray-700 mb-6">Set up your healthcare network before you need it urgently.</p>

  <div class="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-rose-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🏥</span> Medical Setup
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-rose-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find a general doctor (médico general)</p>
          <p class="text-sm text-gray-600 mt-1">Ask in expat groups for English-speaking doctors. Private consultations: $400-800 MXN. Hospitals: Hospital Lomas, Star Médica. See our <a href="/category/english-speaking-healthcare" class="text-blue-600 hover:underline">English-Speaking Healthcare Guide</a>.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-rose-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find a dentist</p>
          <p class="text-sm text-gray-600 mt-1">Dental care in Mexico is excellent and affordable. Cleaning: $400-800 MXN. Many dentists speak some English. Ask for recommendations in expat groups.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-rose-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Locate nearest pharmacies</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Farmacias Guadalajara</strong> and <strong>Farmacias del Ahorro</strong> are everywhere. Many medications available without prescription. Pharmacists can advise on minor ailments.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-rose-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up health insurance</p>
          <p class="text-sm text-gray-600 mt-1"><strong>IMSS</strong> (public, ~$6,000 MXN/year), <strong>GNP</strong>, <strong>Seguros Monterrey</strong>, or <strong>Bupa</strong> (international). Private insurance recommended for faster, better care.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-rose-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Transfer prescriptions / get new ones</p>
          <p class="text-sm text-gray-600 mt-1">Bring documentation of any medications you take. A Mexican doctor can write new prescriptions. Many medications are cheaper here.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-rose-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Save emergency numbers</p>
          <p class="text-sm text-gray-600 mt-1"><strong>911</strong> (emergency), <strong>066</strong> (police), <strong>065</strong> (ambulance/Red Cross). Add your doctor's WhatsApp to contacts.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div class="bg-blue-50 p-6 rounded-lg">
      <h4 class="font-semibold text-blue-900 mb-3">🏥 Recommended Hospitals</h4>
      <ul class="text-sm text-blue-800 space-y-2">
        <li><strong>Hospital Lomas</strong> - Private, modern facilities</li>
        <li><strong>Star Médica</strong> - Chain hospital, good specialists</li>
        <li><strong>Hospital Central</strong> - Public, emergency services</li>
        <li><strong>Beneficencia Española</strong> - Historic, quality care</li>
      </ul>
    </div>
    <div class="bg-green-50 p-6 rounded-lg">
      <h4 class="font-semibold text-green-900 mb-3">💊 Pharmacy Tips</h4>
      <ul class="text-sm text-green-800 space-y-2">
        <li>Similares pharmacies have affordable generics</li>
        <li>Farmacias del Ahorro - "miércoles de farmacia" discounts</li>
        <li>Antibiotics require prescription (sometimes)</li>
        <li>Pharmacy doctors offer cheap consultations ($35-50 MXN)</li>
      </ul>
    </div>
  </div>
</section>

<!-- SOCIAL & COMMUNITY -->
<section id="social" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Social & Community Integration</h2>
  <p class="text-gray-700 mb-6">Building a social network is crucial for a fulfilling expat experience. San Luis Potosí has a small but welcoming expat community.</p>

  <div class="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-orange-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">👥</span> Community & Social
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Join expat Facebook groups</p>
          <p class="text-sm text-gray-600 mt-1">Search "Expats in San Luis Potosí" or "Foreigners in SLP". Great for advice, recommendations, and meeting others.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find language exchange partners</p>
          <p class="text-sm text-gray-600 mt-1">Practice Spanish while helping locals with English. Check <strong>Meetup</strong>, university bulletin boards, or cafes in Centro. See our <a href="/category/language-exchange-cafes" class="text-blue-600 hover:underline">Language Exchange Cafes</a> guide.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Enroll in Spanish classes</p>
          <p class="text-sm text-gray-600 mt-1">UASLP offers courses for foreigners. Private tutors available ($150-300 MXN/hour). Apps like Duolingo help supplement learning.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Explore neighborhoods on foot</p>
          <p class="text-sm text-gray-600 mt-1">Walk around Centro Histórico, Parque Tangamanga, Lomas, and your local colonia. Best way to discover hidden gems and feel at home.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find activities and hobbies</p>
          <p class="text-sm text-gray-600 mt-1">Gyms, hiking groups, art classes, book clubs. SLP has active sports leagues, cultural events at Teatro de la Paz, and weekend markets.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Attend local events and festivals</p>
          <p class="text-sm text-gray-600 mt-1">Check our <a href="/events" class="text-blue-600 hover:underline">Events Calendar</a> for festivals, concerts, and cultural activities. FENAPO (August) is the biggest annual fair.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-orange-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Meet your neighbors</p>
          <p class="text-sm text-gray-600 mt-1">A simple "Buenos días" goes a long way. Neighbors can become valuable allies for recommendations, emergencies, and feeling connected.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
    <h3 class="text-xl font-semibold text-yellow-900 mb-4 flex items-center gap-2">
      <span class="text-2xl">💡</span> Pro Tips for Social Integration
    </h3>
    <div class="space-y-4">
      <div class="bg-white p-4 rounded-lg">
        <p class="font-semibold text-gray-900 mb-2">Be patient with relationships</p>
        <p class="text-sm text-gray-700">Mexican friendships often develop slowly but are deep and lasting. Accept invitations, even if your Spanish isn't perfect.</p>
      </div>
      <div class="bg-white p-4 rounded-lg">
        <p class="font-semibold text-gray-900 mb-2">Learn about Mexican culture</p>
        <p class="text-sm text-gray-700">Understanding traditions, holidays, and social norms will help you connect more meaningfully with locals.</p>
      </div>
      <div class="bg-white p-4 rounded-lg">
        <p class="font-semibold text-gray-900 mb-2">The expat community is small but supportive</p>
        <p class="text-sm text-gray-700">Unlike larger expat hubs, SLP's foreign community is tight-knit. One connection often leads to many more.</p>
      </div>
    </div>
  </div>
</section>

<!-- PRACTICAL DAILY LIFE -->
<section id="daily-life" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Practical Daily Life</h2>
  <p class="text-gray-700 mb-6">Master the everyday essentials for comfortable living in San Luis Potosí.</p>

  <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-indigo-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🛒</span> Shopping & Errands
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-indigo-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Locate supermarkets near you</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Soriana</strong> (local favorite), <strong>Walmart</strong>, <strong>HEB</strong> (premium), <strong>Costco</strong> (membership). For specialty items, check our <a href="/category/international-markets" class="text-blue-600 hover:underline">International Markets Guide</a>.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-indigo-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find local markets (mercados)</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Mercado Hidalgo</strong> (Centro), <strong>Mercado República</strong> for fresh produce, meat, and local foods at better prices than supermarkets.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-indigo-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Discover tienditas (corner stores)</p>
          <p class="text-sm text-gray-600 mt-1">Small neighborhood shops for essentials. Often have better bread, tortillas, and know what's happening locally. Great for quick purchases.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-indigo-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Set up Amazon Mexico account</p>
          <p class="text-sm text-gray-600 mt-1">Delivery available throughout SLP. Prime membership offers faster shipping. Great for hard-to-find items and electronics.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-violet-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🚗</span> Transportation
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-violet-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Download ride apps</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Uber</strong> and <strong>DiDi</strong> work throughout the city. Safer and easier than street taxis. Always check driver ratings.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-violet-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Learn bus routes (if needed)</p>
          <p class="text-sm text-gray-600 mt-1">Buses are cheap ($10-12 MXN) but can be confusing. Ask locals or drivers for help. Google Maps shows some routes.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-violet-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Consider buying/renting a car</p>
          <p class="text-sm text-gray-600 mt-1">Makes life easier for exploring the state. Used cars available on Facebook Marketplace and Seminuevos. Rental agencies at airport.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-violet-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find parking spots (if driving)</p>
          <p class="text-sm text-gray-600 mt-1">Centro has limited street parking - use paid lots. Malls have free parking. See our <a href="/category/easy-parking-spots" class="text-blue-600 hover:underline">Easy Parking Guide</a>.</p>
        </div>
      </label>
    </div>
  </div>

  <div class="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl shadow-lg mb-8">
    <h3 class="text-2xl font-semibold text-teal-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🏋️</span> Fitness & Recreation
    </h3>

    <div class="bg-white rounded-xl p-6 shadow-md space-y-3">
      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-teal-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find a gym</p>
          <p class="text-sm text-gray-600 mt-1"><strong>Smart Fit</strong> (chain, $400-600 MXN/month), <strong>Sport City</strong> (premium), or local gyms ($300-500 MXN/month). Day passes often available.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-teal-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Explore Parque Tangamanga</p>
          <p class="text-sm text-gray-600 mt-1">One of Mexico's largest urban parks. Great for running, cycling, picnics. Has a lake, trails, and sports facilities. Free entry.</p>
        </div>
      </label>

      <label class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
        <input type="checkbox" class="mt-1 w-5 h-5 text-teal-600 rounded" />
        <div class="flex-1">
          <p class="font-medium text-gray-900">Find outdoor activities</p>
          <p class="text-sm text-gray-600 mt-1">Hiking in Sierra de Álvarez, swimming at Media Luna, weekend trips to Huasteca Potosina. See our <a href="/outdoors" class="text-blue-600 hover:underline">Outdoor Adventures Guide</a>.</p>
        </div>
      </label>
    </div>
  </div>
</section>

<!-- RESOURCES -->
<section id="resources" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Resources & Contacts</h2>

  <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
    <h3 class="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
      <span class="text-2xl">🔗</span> Essential Resources
    </h3>

    <div class="space-y-4">
      <div>
        <h4 class="font-semibold text-blue-900 mb-2">Emergency Numbers</h4>
        <ul class="space-y-1 text-blue-800 text-sm">
          <li>📞 <strong>911</strong> - General Emergency</li>
          <li>📞 <strong>066</strong> - Police</li>
          <li>📞 <strong>065</strong> - Red Cross / Ambulance</li>
          <li>📞 <strong>068</strong> - Fire Department</li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-blue-900 mb-2">Government Offices</h4>
        <ul class="space-y-2 text-blue-800 text-sm">
          <li>
            <a href="https://www.gob.mx/inm" target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center gap-2">
              <span>🏛️</span> INM (Immigration) - <a href="https://www.google.com/maps/search/INM+San+Luis+Potosi" target="_blank" class="text-blue-600">Find nearest office</a>
            </a>
          </li>
          <li>
            <a href="https://www.sat.gob.mx/" target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center gap-2">
              <span>🏛️</span> SAT (Tax Office) - For RFC registration
            </a>
          </li>
          <li>
            <a href="https://www.gob.mx/curp/" target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center gap-2">
              <span>🏛️</span> CURP Portal - Check/obtain your CURP
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-blue-900 mb-2">Utilities</h4>
        <ul class="space-y-2 text-blue-800 text-sm">
          <li>
            <a href="https://www.cfe.mx/" target="_blank" rel="noopener noreferrer" class="hover:underline">⚡ CFE (Electricity)</a>
          </li>
          <li>
            <a href="https://www.interapas.gob.mx/" target="_blank" rel="noopener noreferrer" class="hover:underline">💧 INTERAPAS (Water)</a>
          </li>
          <li>
            <a href="https://telmex.com/" target="_blank" rel="noopener noreferrer" class="hover:underline">📶 Telmex (Internet/Phone)</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-blue-900 mb-2">San Luis Way Resources</h4>
        <ul class="space-y-2 text-blue-800 text-sm">
          <li><a href="/places" class="hover:underline">📍 Places Directory</a></li>
          <li><a href="/events" class="hover:underline">📅 Events Calendar</a></li>
          <li><a href="/category/english-speaking-healthcare" class="hover:underline">🏥 English-Speaking Healthcare</a></li>
          <li><a href="/resources/neighborhoods-san-luis-potosi" class="hover:underline">🏘️ Neighborhoods Guide</a></li>
          <li><a href="/resources/expat-guide" class="hover:underline">📖 Complete Expat Guide</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="mb-12">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Frequently Asked Questions</h2>

  <div class="space-y-6">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3 text-gray-900">How long does it take to feel settled in SLP?</h3>
      <p class="text-gray-700">Most expats report feeling comfortable with daily life after <strong>1-2 months</strong>, but truly settled after <strong>6-12 months</strong>. The first month is the steepest learning curve.</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3 text-gray-900">Do I need to speak Spanish?</h3>
      <p class="text-gray-700"><strong>Yes, for the best experience.</strong> Unlike tourist areas, English is rarely spoken in SLP. Even basic Spanish dramatically improves daily life. Most expats recommend investing in language learning from day one.</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3 text-gray-900">Is San Luis Potosí safe?</h3>
      <p class="text-gray-700">SLP is generally considered <strong>safer than many Mexican cities</strong>. Use common sense: avoid displaying wealth, use Uber at night, stay aware of surroundings. Most expats feel safe in daily life.</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3 text-gray-900">What's the cost of living?</h3>
      <p class="text-gray-700">A comfortable lifestyle costs <strong>$15,000-25,000 MXN/month</strong> ($800-1,400 USD) including rent, utilities, food, and entertainment. Rent is the biggest variable ($8,000-20,000 MXN depending on area).</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3 text-gray-900">How do I meet other expats?</h3>
      <p class="text-gray-700">Join Facebook groups ("Expats in San Luis Potosí"), attend language exchanges, take classes, or simply hang out at cafes in Centro. The community is small but welcoming - one introduction often leads to many more.</p>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<div class="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
  <h3 class="text-lg font-semibold mb-3 text-green-900">Need Personalized Help?</h3>
  <p class="text-green-800 mb-3">
    <strong>Settling into a new city can be overwhelming. Our local experts can help you navigate everything from finding housing to setting up services.</strong>
  </p>
  <p class="text-green-800">
    <a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Contact Us for Assistance →</a>
  </p>
</div>

<div class="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
  <p><strong>Disclaimer:</strong> Information in this guide is based on expat experiences and publicly available resources as of January 2025. Requirements, prices, and processes may change. Always verify current information with official sources before making decisions.</p>
</div>

</div>
$BODY$,
  'Your complete checklist for the first 30 days after arriving in San Luis Potosí. From getting a SIM card to setting up banking, healthcare, and social connections - everything you need to settle in successfully.',
  'Arrival Checklist: Your First 30 Days in San Luis Potosí | Complete Expat Guide',
  'Complete 45+ item checklist for newcomers to San Luis Potosí. Covers essentials, bureaucratic tasks, utilities, banking, healthcare, and social integration for your first month.',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200',
  'Relocation',
  true,
  now(),
  now()
);
