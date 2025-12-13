require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Image paths - local images
const IMAGES = {
  principal: '/images/blog/leonora carrington/leonora_principal.jpg',
  surrealism: '/images/blog/leonora carrington/leonora_surrealism.webp',
  slpLandscapes: '/images/blog/leonora carrington/San Luis Potosí\'s dramatic landscapes and rich history attracted many Surrealist artists.webp',
  museo: '/images/blog/leonora carrington/museo-Leonora-Carrinton.webp',
  centroArtes: '/images/blog/leonora carrington/centro de las artes.jpeg',
  xilitla: '/images/blog/leonora carrington/Xilitla-de-los-mejores-destinos-en-Mexico.jpg',
  lasPozas: '/images/blog/leonora carrington/las pozas pools-xilitla.webp'
};

const slug = 'leonora-carrington-san-luis-potosi-museo-centro-artes-surrealism';

// English content with local images
const content_en = `<div class="prose prose-lg lg:prose-xl max-w-none">

<!-- TABLE OF CONTENTS -->
<div class="not-prose mb-12 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-md border border-purple-100">
  <h3 class="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
    <span>📑</span> In This Article
  </h3>
  <nav class="space-y-2">
    <a href="#introduction" class="block text-purple-600 hover:text-purple-800 hover:underline">→ Introduction</a>
    <a href="#who-was-leonora" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 1. Who Was Leonora Carrington?</a>
    <a href="#connection-slp" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 2. Her Connection to San Luis Potosí</a>
    <a href="#museo-leonora" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 3. The Museo Leonora Carrington</a>
    <a href="#centro-artes" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 4. Centro de las Artes: From Prison to Paradise</a>
    <a href="#xilitla-las-pozas" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 5. Xilitla and Las Pozas: The Surrealist Garden</a>
    <a href="#visiting" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 6. Planning Your Visit</a>
    <a href="#conclusion" class="block text-purple-600 hover:text-purple-800 hover:underline">→ Conclusion</a>
  </nav>
  <p class="mt-4 text-sm text-gray-600 italic">Estimated reading time: 12 minutes</p>
</div>

<!-- INTRODUCTION -->
<section id="introduction" class="mb-16 scroll-mt-8">
  <p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
    <strong>In the heart of Mexico, where colonial architecture meets avant-garde art, lies a remarkable tribute to one of the 20th century's most enigmatic artists.</strong> The Museo Leonora Carrington in San Luis Potosí stands as the world's first museum dedicated entirely to the British-Mexican surrealist painter—a testament to the profound connection between this visionary artist and the magical landscapes of central Mexico.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Leonora Carrington (1917-2011) was no ordinary artist. A rebellious English debutante who fled her aristocratic upbringing to join the Surrealist movement in Paris, she eventually found her true home in Mexico, where she lived for nearly seven decades. Her connection to San Luis Potosí—through mystical mining towns, surrealist gardens, and now a world-class museum—creates an unmissable cultural experience for art lovers visiting this region.
  </p>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 1: WHO WAS LEONORA -->
<section id="who-was-leonora" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-4 inline-block">
      1. Who Was Leonora Carrington?
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      From English aristocrat to Mexican surrealist legend
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.surrealism}"
        alt="Leonora Carrington and surrealist art"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Surrealist art often explores dreamlike imagery, mythology, and the unconscious—themes central to Carrington's work
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Mary Leonora Carrington was born on April 6, 1917, in Clayton-le-Woods, Lancashire, England, into a wealthy textile manufacturing family. From an early age, she rebelled against the expectations of her aristocratic upbringing—she was expelled from at least two convent schools before being sent to boarding school in Florence.
  </p>

  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">📚</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Early Influences</h4>
        <p class="text-gray-700 mb-3">
          Carrington's Irish mother and nanny introduced her to Celtic mythology and Irish folklore—imagery that would later appear throughout her art. These early stories of magic and transformation planted the seeds of her surrealist vision.
        </p>
        <p class="text-sm text-gray-600">
          — Source: Tate Gallery Biography
        </p>
      </div>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Finding Home in Mexico</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Through a marriage of convenience to Mexican diplomat Renato Leduc, Carrington secured passage to New York in 1941. By 1942, she had divorced Leduc and settled permanently in Mexico City, where she would live for the rest of her life—nearly seven decades.
  </p>

  <!-- STATISTICAL HIGHLIGHT -->
  <div class="not-prose my-8 bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg text-center">
    <p class="text-6xl font-bold text-purple-700 mb-3">94</p>
    <p class="text-xl font-semibold text-gray-800 mb-2">years of an extraordinary life</p>
    <p class="text-sm text-gray-600">Leonora Carrington lived from 1917 to 2011, creating art until the very end</p>
  </div>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "I didn't have time to be anyone's muse... I was too busy rebelling against my family and learning to be an artist."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Leonora Carrington</cite>
        <p class="text-sm text-gray-600">Surrealist Artist and Writer</p>
      </div>
    </footer>
  </blockquote>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 2: CONNECTION TO SLP -->
<section id="connection-slp" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-4 inline-block">
      2. Her Connection to San Luis Potosí
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Mystical landscapes that inspired surrealist masterpieces
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-800 mb-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
    <strong>Why San Luis Potosí?</strong> Although Carrington lived primarily in Mexico City, she developed a special connection with San Luis Potosí through her visits to its magical towns—Real de Catorce and Cerro de San Pedro—places that became sources of inspiration for several of her works.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.slpLandscapes}"
        alt="San Luis Potosí's dramatic landscapes that attracted surrealist artists"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      San Luis Potosí's dramatic landscapes and rich history attracted many Surrealist artists
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Real de Catorce: The Ghost Town That Inspired</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Real de Catorce, the former silver mining town perched in the mountains of San Luis Potosí, held particular fascination for Carrington. This "ghost town," accessible only through a 2.3-kilometer tunnel carved through the mountain, offered the perfect surreal landscape—abandoned haciendas, desert plateaus, and an otherworldly atmosphere that aligned perfectly with her artistic vision.
  </p>

  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h5 class="text-lg font-semibold text-gray-900 mb-3">Real de Catorce</h5>
      <ul class="list-disc pl-6 text-gray-700 space-y-2">
        <li>Former silver mining town at 2,750m elevation</li>
        <li>Accessible through historic tunnel</li>
        <li>Sacred Huichol pilgrimage site</li>
        <li>Surreal desert landscapes</li>
      </ul>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h5 class="text-lg font-semibold text-gray-900 mb-3">Cerro de San Pedro</h5>
      <ul class="list-disc pl-6 text-gray-700 space-y-2">
        <li>Site of original 1592 gold discovery</li>
        <li>Historic colonial architecture</li>
        <li>Abandoned mining infrastructure</li>
        <li>20km from SLP capital</li>
      </ul>
    </div>
  </div>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 3: MUSEO LEONORA CARRINGTON -->
<section id="museo-leonora" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-pink-500 pb-4 inline-block">
      3. The Museo Leonora Carrington
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      The world's first museum dedicated to the surrealist master
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.museo}"
        alt="Museo Leonora Carrington in San Luis Potosí"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      The museum features intimate gallery spaces showcasing Carrington's sculptures and personal objects
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    On March 22, 2018, the Museo Leonora Carrington opened its doors in San Luis Potosí, becoming the first museum in the world dedicated entirely to this groundbreaking artist. The museum was made possible through generous donations from Pablo Weisz Carrington, the artist's son, who fulfilled a promise he made to his mother to create a lasting tribute to her work.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">The Collection</h3>

  <div class="not-prose my-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">🗿</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Sculptures</h5>
        <p class="text-gray-700">Seven large-scale bronze sculptures displayed in the museum's patios</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">💎</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Jewelry</h5>
        <p class="text-gray-700">Personal jewelry pieces designed by the artist</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">🖼️</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Engravings & Drawings</h5>
        <p class="text-gray-700">Etchings, lithographs, and drawings that reveal her creative process</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">📦</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Personal Objects</h5>
        <p class="text-gray-700">Intimate belongings that offer insight into her daily life</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">🎭</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Temporary Exhibitions</h5>
        <p class="text-gray-700">Rotating exhibits about Surrealism and Carrington's legacy</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">📚</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Research Center</h5>
        <p class="text-gray-700">International Center for the Study and Dissemination of Surrealism</p>
      </div>
    </div>
  </div>

  <!-- CASE STUDY BLOCK -->
  <div class="not-prose my-12 bg-purple-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg">
    <div class="bg-purple-500 px-8 py-4">
      <h3 class="text-2xl font-bold text-white flex items-center gap-3">
        <span>🏆</span> Recognition
      </h3>
    </div>
    <div class="p-8">
      <p class="text-gray-700 mb-4">
        The Museo Leonora Carrington is today considered one of the "10 museums you must visit" in the Mexican Republic.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-700">2018</p>
          <p class="text-sm text-gray-600 mt-1">Year opened</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-700">2</p>
          <p class="text-sm text-gray-600 mt-1">Venues (SLP + Xilitla)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-700">7</p>
          <p class="text-sm text-gray-600 mt-1">Monumental sculptures</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 4: CENTRO DE LAS ARTES -->
<section id="centro-artes" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-green-500 pb-4 inline-block">
      4. Centro de las Artes: From Prison to Paradise
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      A remarkable architectural transformation that houses Carrington's legacy
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The Museo Leonora Carrington is housed within one of Mexico's most remarkable architectural conversions: the Centro de las Artes de San Luis Potosí Centenario. This stunning cultural complex was once a functioning penitentiary—a transformation that seems fitting for an artist who spent her life exploring themes of confinement, liberation, and metamorphosis.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.centroArtes}"
        alt="Centro de las Artes de San Luis Potosí"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      The Centro de las Artes combines historic architecture with contemporary art spaces
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">The Panopticon Prison</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The building was designed by architect Carlos Suárez Fiallo in the late 19th century following the Panopticon model developed by English philosopher Jeremy Bentham. This revolutionary (and controversial) prison design placed a central observation tower at the heart of the structure, with eight corridors radiating outward like spokes of a wheel.
  </p>

  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">🏛️</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Architectural History</h4>
        <p class="text-gray-700 mb-3">
          The panopticon-type prison first opened in 1890 and functioned as the State's jail from 1904 until 1999, when inmates were transferred to a new facility.
        </p>
      </div>
    </div>
  </div>

  <div class="not-prose my-12 bg-green-50 border-2 border-green-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🎨</span> What You'll Find at Centro de las Artes
    </h4>
    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">8 Thematic Courtyards</p>
        <p class="text-gray-700">Former prison yards transformed into open-air galleries</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">Art Education Schools</p>
        <p class="text-gray-700">Training the next generation of Mexican artists</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">Exhibition Halls</p>
        <p class="text-gray-700">Multiple galleries including the Museo Leonora Carrington</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">Polyvalent Theater</p>
        <p class="text-gray-700">A multipurpose performance space for concerts and events</p>
      </div>
    </div>
  </div>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 5: XILITLA AND LAS POZAS -->
<section id="xilitla-las-pozas" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-teal-500 pb-4 inline-block">
      5. Xilitla and Las Pozas: The Surrealist Garden
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Where Carrington left her mark in Edward James's jungle wonderland
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.xilitla}"
        alt="Xilitla, one of the best destinations in Mexico"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      The Huasteca Potosina's lush landscapes provide the setting for Las Pozas
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    No exploration of Carrington's connection to San Luis Potosí would be complete without mentioning Las Pozas—the surrealist sculpture garden created by her friend and patron Edward James in Xilitla, in the Huasteca region of San Luis Potosí.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Carrington painted a mural on the wall of James's home in Xilitla (now the hotel El Castillo)—a personal touch that connects her directly to this magical place.
  </p>

  <!-- IMAGE WITH CALLOUT BOX -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.lasPozas}"
        alt="Natural pools at Las Pozas in Xilitla"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <div class="bg-teal-50 p-8 rounded-xl border-l-4 border-teal-500">
      <h4 class="text-2xl font-semibold mb-4 text-teal-900">Las Pozas</h4>
      <p class="text-lg text-teal-800 mb-4">
        Declared an Artistic Monument of the Nation in 2012, Las Pozas is considered the most important surrealist space in Mexico.
      </p>
      <ul class="list-disc pl-6 text-teal-800 space-y-2">
        <li>36 surrealist concrete structures</li>
        <li>20+ acres of tropical jungle</li>
        <li>Natural pools and waterfalls</li>
        <li>UNESCO Tentative List site</li>
      </ul>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">The Second Museo Leonora Carrington</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    On October 19, 2018, a second venue of the Museo Leonora Carrington opened in Xilitla itself, featuring sculptures, lithographs, and other works by the artist. This creates a natural artistic pilgrimage for visitors: from the Centro de las Artes in San Luis Potosí's capital to the surrealist wonderland of Las Pozas, with Carrington's work as the connecting thread.
  </p>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 6: PLANNING YOUR VISIT -->
<section id="visiting" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-yellow-500 pb-4 inline-block">
      6. Planning Your Visit
    </h2>
  </div>

  <div class="not-prose my-12 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">📍</span> Museo Leonora Carrington - San Luis Potosí
    </h4>
    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Location</p>
        <p class="text-gray-700">Centro de las Artes de San Luis Potosí Centenario, Calzada de Guadalupe 705, Centro Histórico</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Website</p>
        <p class="text-gray-700"><a href="https://www.leonoracarringtonmuseo.org" target="_blank" class="text-blue-600 hover:underline">www.leonoracarringtonmuseo.org</a></p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Getting There</p>
        <p class="text-gray-700">The Centro de las Artes is located on the Calzada de Guadalupe, an easy walk or short taxi ride from the historic center</p>
      </div>
    </div>
  </div>
</section>

<!-- KEY TAKEAWAYS -->
<div class="not-prose my-12 bg-purple-600 text-white p-8 rounded-2xl shadow-2xl">
  <h4 class="text-2xl font-bold mb-6 flex items-center gap-3">
    <span class="text-3xl">🎯</span> Key Takeaways
  </h4>
  <ul class="space-y-4">
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">The Museo Leonora Carrington in San Luis Potosí is the world's first museum dedicated to the British-Mexican surrealist artist.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">The museum is housed in the Centro de las Artes, a stunning 19th-century panopticon prison transformed into a cultural center.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Carrington had a special connection to San Luis Potosí through Real de Catorce, Cerro de San Pedro, and Xilitla.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">A second museum venue in Xilitla and her mural at Las Pozas complete the surrealist pilgrimage route.</p>
    </li>
  </ul>
</div>

<!-- CONCLUSION -->
<section id="conclusion" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-gray-500 pb-4 inline-block">
      Conclusion
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Leonora Carrington's connection to San Luis Potosí reveals how this region's magical landscapes—from ghost mining towns to jungle gardens—have long attracted visionary artists seeking inspiration beyond the ordinary.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The transformation of a 19th-century panopticon prison into a center for the arts, now home to Carrington's legacy, is perhaps the most fitting tribute possible to an artist who spent her life exploring themes of confinement, liberation, and transformation. In San Luis Potosí, her work has found not just a home, but a perfect metaphor.
  </p>
</section>

<!-- CTA -->
<div class="not-prose mt-16 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Explore San Luis Potosí's Art Scene?</h3>
  <p class="text-lg text-gray-700 mb-6">
    Discover more cultural attractions, plan your visit to the Huasteca, and find the best places to stay near the Centro de las Artes.
  </p>
  <a href="/cultural-attractions" class="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
    Explore Cultural Attractions →
  </a>
</div>

</div>`;

// Spanish content with local images
const content_es = `<div class="prose prose-lg lg:prose-xl max-w-none">

<!-- TABLA DE CONTENIDOS -->
<div class="not-prose mb-12 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-md border border-purple-100">
  <h3 class="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
    <span>📑</span> En Este Artículo
  </h3>
  <nav class="space-y-2">
    <a href="#introduccion" class="block text-purple-600 hover:text-purple-800 hover:underline">→ Introducción</a>
    <a href="#quien-fue-leonora" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 1. ¿Quién Fue Leonora Carrington?</a>
    <a href="#conexion-slp" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 2. Su Conexión con San Luis Potosí</a>
    <a href="#museo-leonora" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 3. El Museo Leonora Carrington</a>
    <a href="#centro-artes" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 4. Centro de las Artes: De Prisión a Paraíso</a>
    <a href="#xilitla-las-pozas" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 5. Xilitla y Las Pozas: El Jardín Surrealista</a>
    <a href="#visita" class="block text-purple-600 hover:text-purple-800 hover:underline">→ 6. Planifica Tu Visita</a>
    <a href="#conclusion" class="block text-purple-600 hover:text-purple-800 hover:underline">→ Conclusión</a>
  </nav>
  <p class="mt-4 text-sm text-gray-600 italic">Tiempo de lectura estimado: 12 minutos</p>
</div>

<!-- INTRODUCCIÓN -->
<section id="introduccion" class="mb-16 scroll-mt-8">
  <p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
    <strong>En el corazón de México, donde la arquitectura colonial se encuentra con el arte de vanguardia, se alza un notable tributo a una de las artistas más enigmáticas del siglo XX.</strong> El Museo Leonora Carrington en San Luis Potosí es el primer museo del mundo dedicado enteramente a la pintora surrealista británico-mexicana—un testimonio de la profunda conexión entre esta artista visionaria y los paisajes mágicos del centro de México.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Leonora Carrington (1917-2011) no fue una artista ordinaria. Una rebelde debutante inglesa que huyó de su educación aristocrática para unirse al movimiento surrealista en París, eventualmente encontró su verdadero hogar en México, donde vivió durante casi siete décadas.
  </p>
</section>

<!-- DIVISOR DE CAPÍTULO -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECCIÓN 1: QUIÉN FUE LEONORA -->
<section id="quien-fue-leonora" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-4 inline-block">
      1. ¿Quién Fue Leonora Carrington?
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      De aristócrata inglesa a leyenda surrealista mexicana
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.surrealism}"
        alt="Leonora Carrington y el arte surrealista"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      El arte surrealista explora imágenes oníricas, mitología y el inconsciente—temas centrales en la obra de Carrington
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Mary Leonora Carrington nació el 6 de abril de 1917 en Clayton-le-Woods, Lancashire, Inglaterra, en una familia adinerada de fabricantes textiles. Desde temprana edad, se rebeló contra las expectativas de su educación aristocrática—fue expulsada de al menos dos escuelas de convento antes de ser enviada a un internado en Florencia.
  </p>

  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">📚</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Influencias Tempranas</h4>
        <p class="text-gray-700 mb-3">
          La madre irlandesa de Carrington y su niñera le introdujeron a la mitología celta y el folclore irlandés—imágenes que aparecerían después en todo su arte.
        </p>
        <p class="text-sm text-gray-600">
          — Fuente: Biografía de la Galería Tate
        </p>
      </div>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Encontrando Hogar en México</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    A través de un matrimonio de conveniencia con el diplomático mexicano Renato Leduc, Carrington consiguió pasaje a Nueva York en 1941. Para 1942, se había divorciado de Leduc y establecido permanentemente en la Ciudad de México, donde viviría el resto de su vida—casi siete décadas.
  </p>

  <!-- DESTACADO ESTADÍSTICO -->
  <div class="not-prose my-8 bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg text-center">
    <p class="text-6xl font-bold text-purple-700 mb-3">94</p>
    <p class="text-xl font-semibold text-gray-800 mb-2">años de una vida extraordinaria</p>
    <p class="text-sm text-gray-600">Leonora Carrington vivió de 1917 a 2011, creando arte hasta el final</p>
  </div>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "No tenía tiempo para ser la musa de nadie... Estaba demasiado ocupada rebelándome contra mi familia y aprendiendo a ser artista."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Leonora Carrington</cite>
        <p class="text-sm text-gray-600">Artista y Escritora Surrealista</p>
      </div>
    </footer>
  </blockquote>
</section>

<!-- DIVISOR DE CAPÍTULO -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECCIÓN 2: CONEXIÓN CON SLP -->
<section id="conexion-slp" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-4 inline-block">
      2. Su Conexión con San Luis Potosí
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Paisajes místicos que inspiraron obras maestras surrealistas
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-800 mb-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
    <strong>¿Por qué San Luis Potosí?</strong> Aunque Carrington vivía principalmente en la Ciudad de México, desarrolló una conexión especial con San Luis Potosí a través de sus visitas a sus pueblos mágicos—Real de Catorce y Cerro de San Pedro.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.slpLandscapes}"
        alt="Los dramáticos paisajes de San Luis Potosí que atrajeron a artistas surrealistas"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Los dramáticos paisajes e historia rica de San Luis Potosí atrajeron a muchos artistas surrealistas
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Real de Catorce: El Pueblo Fantasma que Inspiró</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Real de Catorce, el antiguo pueblo minero de plata encaramado en las montañas de San Luis Potosí, cautivó particularmente a Carrington. Este "pueblo fantasma," accesible solo a través de un túnel de 2.3 kilómetros excavado en la montaña, ofrecía el paisaje surrealista perfecto.
  </p>

  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h5 class="text-lg font-semibold text-gray-900 mb-3">Real de Catorce</h5>
      <ul class="list-disc pl-6 text-gray-700 space-y-2">
        <li>Antiguo pueblo minero a 2,750m de elevación</li>
        <li>Accesible a través de túnel histórico</li>
        <li>Sitio sagrado de peregrinación Huichol</li>
        <li>Paisajes desérticos surrealistas</li>
      </ul>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h5 class="text-lg font-semibold text-gray-900 mb-3">Cerro de San Pedro</h5>
      <ul class="list-disc pl-6 text-gray-700 space-y-2">
        <li>Sitio del descubrimiento original de oro en 1592</li>
        <li>Arquitectura colonial histórica</li>
        <li>Infraestructura minera abandonada</li>
        <li>20km de la capital de SLP</li>
      </ul>
    </div>
  </div>
</section>

<!-- DIVISOR DE CAPÍTULO -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECCIÓN 3: MUSEO LEONORA CARRINGTON -->
<section id="museo-leonora" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-pink-500 pb-4 inline-block">
      3. El Museo Leonora Carrington
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      El primer museo del mundo dedicado a la maestra surrealista
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.museo}"
        alt="Museo Leonora Carrington en San Luis Potosí"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      El museo presenta espacios de galería íntimos que exhiben las esculturas y objetos personales de Carrington
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El 22 de marzo de 2018, el Museo Leonora Carrington abrió sus puertas en San Luis Potosí, convirtiéndose en el primer museo del mundo dedicado enteramente a esta artista revolucionaria. El museo fue posible gracias a las generosas donaciones de Pablo Weisz Carrington, hijo de la artista.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">La Colección</h3>

  <div class="not-prose my-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">🗿</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Esculturas</h5>
        <p class="text-gray-700">Siete esculturas monumentales de bronce exhibidas en los patios del museo</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">💎</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Joyería</h5>
        <p class="text-gray-700">Piezas personales de joyería diseñadas por la artista</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">🖼️</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Grabados y Dibujos</h5>
        <p class="text-gray-700">Aguafuertes, litografías y dibujos que revelan su proceso creativo</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">📦</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Objetos Personales</h5>
        <p class="text-gray-700">Pertenencias íntimas que ofrecen una visión de su vida diaria</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">🎭</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Exposiciones Temporales</h5>
        <p class="text-gray-700">Exhibiciones rotativas sobre el Surrealismo</p>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
        <div class="text-4xl mb-4">📚</div>
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Centro de Investigación</h5>
        <p class="text-gray-700">Centro Internacional para el Estudio y Difusión del Surrealismo</p>
      </div>
    </div>
  </div>

  <!-- BLOQUE DE CASO DE ESTUDIO -->
  <div class="not-prose my-12 bg-purple-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg">
    <div class="bg-purple-500 px-8 py-4">
      <h3 class="text-2xl font-bold text-white flex items-center gap-3">
        <span>🏆</span> Reconocimiento
      </h3>
    </div>
    <div class="p-8">
      <p class="text-gray-700 mb-4">
        El Museo Leonora Carrington es hoy considerado uno de los "10 museos que debes visitar" en la República Mexicana.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-700">2018</p>
          <p class="text-sm text-gray-600 mt-1">Año de apertura</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-700">2</p>
          <p class="text-sm text-gray-600 mt-1">Sedes (SLP + Xilitla)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-700">7</p>
          <p class="text-sm text-gray-600 mt-1">Esculturas monumentales</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DIVISOR DE CAPÍTULO -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECCIÓN 4: CENTRO DE LAS ARTES -->
<section id="centro-artes" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-green-500 pb-4 inline-block">
      4. Centro de las Artes: De Prisión a Paraíso
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Una notable transformación arquitectónica que alberga el legado de Carrington
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El Museo Leonora Carrington está alojado dentro de una de las conversiones arquitectónicas más notables de México: el Centro de las Artes de San Luis Potosí Centenario.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.centroArtes}"
        alt="Centro de las Artes de San Luis Potosí"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      El Centro de las Artes combina arquitectura histórica con espacios de arte contemporáneo
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">La Prisión Panóptica</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El edificio fue diseñado por el arquitecto Carlos Suárez Fiallo a finales del siglo XIX siguiendo el modelo Panóptico desarrollado por el filósofo inglés Jeremy Bentham.
  </p>

  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">🏛️</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Historia Arquitectónica</h4>
        <p class="text-gray-700 mb-3">
          La prisión tipo panóptico abrió por primera vez en 1890 y funcionó como la cárcel del Estado desde 1904 hasta 1999.
        </p>
      </div>
    </div>
  </div>

  <div class="not-prose my-12 bg-green-50 border-2 border-green-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">🎨</span> Qué Encontrarás en el Centro de las Artes
    </h4>
    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">8 Patios Temáticos</p>
        <p class="text-gray-700">Antiguos patios de la prisión transformados en galerías al aire libre</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">Escuelas de Educación Artística</p>
        <p class="text-gray-700">Formando la próxima generación de artistas mexicanos</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">Salas de Exhibición</p>
        <p class="text-gray-700">Múltiples galerías incluyendo el Museo Leonora Carrington</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
        <p class="font-semibold text-gray-900 mb-2">Teatro Polivalente</p>
        <p class="text-gray-700">Un espacio multipropósito para conciertos y eventos</p>
      </div>
    </div>
  </div>
</section>

<!-- DIVISOR DE CAPÍTULO -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECCIÓN 5: XILITLA Y LAS POZAS -->
<section id="xilitla-las-pozas" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-teal-500 pb-4 inline-block">
      5. Xilitla y Las Pozas: El Jardín Surrealista
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Donde Carrington dejó su huella en el país de las maravillas selvático de Edward James
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.xilitla}"
        alt="Xilitla, uno de los mejores destinos en México"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Los exuberantes paisajes de la Huasteca Potosina proporcionan el escenario para Las Pozas
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Ninguna exploración de la conexión de Carrington con San Luis Potosí estaría completa sin mencionar Las Pozas—el jardín de esculturas surrealistas creado por su amigo y mecenas Edward James en Xilitla.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Carrington pintó un mural en la pared de la casa de James en Xilitla (ahora el hotel El Castillo)—un toque personal que la conecta directamente con este lugar mágico.
  </p>

  <!-- IMAGEN CON CAJA DE INFORMACIÓN -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="${IMAGES.lasPozas}"
        alt="Las pozas naturales en Xilitla"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <div class="bg-teal-50 p-8 rounded-xl border-l-4 border-teal-500">
      <h4 class="text-2xl font-semibold mb-4 text-teal-900">Las Pozas</h4>
      <p class="text-lg text-teal-800 mb-4">
        Declarado Monumento Artístico de la Nación en 2012, Las Pozas es considerado el espacio surrealista más importante de México.
      </p>
      <ul class="list-disc pl-6 text-teal-800 space-y-2">
        <li>36 estructuras surrealistas de concreto</li>
        <li>Más de 20 acres de selva tropical</li>
        <li>Pozas naturales y cascadas</li>
        <li>En la Lista Tentativa de UNESCO</li>
      </ul>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">El Segundo Museo Leonora Carrington</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El 19 de octubre de 2018, una segunda sede del Museo Leonora Carrington abrió en Xilitla, con esculturas, litografías y otras obras de la artista.
  </p>
</section>

<!-- DIVISOR DE CAPÍTULO -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECCIÓN 6: PLANIFICA TU VISITA -->
<section id="visita" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-yellow-500 pb-4 inline-block">
      6. Planifica Tu Visita
    </h2>
  </div>

  <div class="not-prose my-12 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">📍</span> Museo Leonora Carrington - San Luis Potosí
    </h4>
    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Ubicación</p>
        <p class="text-gray-700">Centro de las Artes de San Luis Potosí Centenario, Calzada de Guadalupe 705, Centro Histórico</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Sitio Web</p>
        <p class="text-gray-700"><a href="https://www.leonoracarringtonmuseo.org" target="_blank" class="text-blue-600 hover:underline">www.leonoracarringtonmuseo.org</a></p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Cómo Llegar</p>
        <p class="text-gray-700">El Centro de las Artes está ubicado en la Calzada de Guadalupe, a un paseo fácil o corto viaje en taxi desde el centro histórico</p>
      </div>
    </div>
  </div>
</section>

<!-- PUNTOS CLAVE -->
<div class="not-prose my-12 bg-purple-600 text-white p-8 rounded-2xl shadow-2xl">
  <h4 class="text-2xl font-bold mb-6 flex items-center gap-3">
    <span class="text-3xl">🎯</span> Puntos Clave
  </h4>
  <ul class="space-y-4">
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">El Museo Leonora Carrington en San Luis Potosí es el primer museo del mundo dedicado a la artista surrealista británico-mexicana.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">El museo está alojado en el Centro de las Artes, una impresionante prisión panóptica del siglo XIX transformada en centro cultural.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Carrington tenía una conexión especial con San Luis Potosí a través de Real de Catorce, Cerro de San Pedro y Xilitla.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Una segunda sede del museo en Xilitla y su mural en Las Pozas completan la ruta de peregrinación surrealista.</p>
    </li>
  </ul>
</div>

<!-- CONCLUSIÓN -->
<section id="conclusion" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-gray-500 pb-4 inline-block">
      Conclusión
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La conexión de Leonora Carrington con San Luis Potosí revela cómo los paisajes mágicos de esta región—desde pueblos mineros fantasma hasta jardines selváticos—han atraído durante mucho tiempo a artistas visionarios que buscan inspiración más allá de lo ordinario.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La transformación de una prisión panóptica del siglo XIX en un centro para las artes, ahora hogar del legado de Carrington, es quizás el tributo más apropiado posible para una artista que pasó su vida explorando temas de confinamiento, liberación y transformación.
  </p>
</section>

<!-- CTA -->
<div class="not-prose mt-16 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-4">¿Listo para Explorar la Escena Artística de San Luis Potosí?</h3>
  <p class="text-lg text-gray-700 mb-6">
    Descubre más atracciones culturales, planifica tu visita a la Huasteca, y encuentra los mejores lugares para hospedarte cerca del Centro de las Artes.
  </p>
  <a href="/cultural-attractions" class="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
    Explorar Atracciones Culturales →
  </a>
</div>

</div>`;

async function updatePost() {
  console.log('Connecting to Supabase...');
  console.log('Updating Leonora Carrington post with local images...\n');

  const updateData = {
    image_url: IMAGES.principal,
    content_en: content_en,
    content: content_es
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    process.exit(1);
  }

  console.log('✅ Post updated successfully!');
  console.log('\nImages updated:');
  console.log('- Principal image:', IMAGES.principal);
  console.log('- Surrealism section:', IMAGES.surrealism);
  console.log('- SLP Landscapes:', IMAGES.slpLandscapes);
  console.log('- Museo section:', IMAGES.museo);
  console.log('- Centro de las Artes:', IMAGES.centroArtes);
  console.log('- Xilitla:', IMAGES.xilitla);
  console.log('- Las Pozas:', IMAGES.lasPozas);
  console.log('\nPost URL:', `/blog/${data.slug}`);
  return data;
}

updatePost()
  .then(() => {
    console.log('\n✨ All images updated to local files!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Failed to update post:', err.message);
    process.exit(1);
  });
