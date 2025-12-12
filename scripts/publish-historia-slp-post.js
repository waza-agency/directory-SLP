const https = require('https');
const http = require('http');

const postData = {
  title: "San Luis Potosí: Historia Minera, Arquitectura Barroca y el Legado Cultural que Define la Ciudad",
  title_en: "San Luis Potosí: Mining History, Baroque Architecture and the Cultural Legacy that Defines the City",
  slug: "san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural",
  excerpt: "Descubre la fascinante historia de San Luis Potosí: desde el descubrimiento de oro y plata en 1592, hasta sus majestuosos templos barrocos y las tradiciones culturales que perduran en la Huasteca Potosina.",
  excerpt_en: "Discover the fascinating history of San Luis Potosí: from the discovery of gold and silver in 1592, to its majestic baroque temples and the cultural traditions that endure in the Huasteca Potosina.",
  category: "Historia y Cultura",
  tags: ["historia", "arquitectura", "barroco", "minería", "cultura", "centro histórico", "patrimonio", "UNESCO"],
  image_url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=1600&h=900&fit=crop&q=80",
  content: `<div class="prose prose-lg lg:prose-xl max-w-none">

<!-- TABLE OF CONTENTS -->
<div class="not-prose sticky top-4 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-blue-100 z-10">
  <h3 class="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
    <span>📑</span> En Este Artículo
  </h3>
  <nav class="space-y-2">
    <a href="#introduccion" class="block text-blue-600 hover:text-blue-800 hover:underline">→ Introducción</a>
    <a href="#historia-minera" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 1. El Origen: La Fiebre del Oro y la Plata (1592)</a>
    <a href="#cerro-san-pedro" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 2. Cerro de San Pedro: Donde Todo Comenzó</a>
    <a href="#arquitectura-barroca" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 3. Arquitectura Barroca: Templos que Cuentan Historias</a>
    <a href="#centro-historico" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 4. Centro Histórico: Patrimonio de la Humanidad</a>
    <a href="#legado-cultural" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 5. El Legado Cultural Vivo</a>
    <a href="#huasteca" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 6. La Huasteca Potosina: Herencia Prehispánica</a>
    <a href="#conclusion" class="block text-blue-600 hover:text-blue-800 hover:underline">→ Conclusión</a>
  </nav>
  <p class="mt-4 text-sm text-gray-600 italic">Tiempo de lectura estimado: 18 minutos</p>
</div>

<!-- INTRODUCTION -->
<section id="introduccion" class="mb-16 scroll-mt-8">
  <p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
    <strong>En el corazón del altiplano mexicano se alza una ciudad cuya historia está escrita en plata y cantera rosa.</strong> San Luis Potosí, fundada hace más de cuatro siglos gracias al descubrimiento de riquezas minerales, se ha convertido en un testimonio viviente de la época colonial y un ejemplo excepcional de cómo la prosperidad minera puede transformarse en patrimonio arquitectónico y cultural de relevancia mundial.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Según registros históricos documentados por el Instituto Nacional de Antropología e Historia (INAH), la ciudad alberga más de 213 edificios construidos entre los siglos XVI y XX en su centro histórico, abarcando un área de 1.93 kilómetros cuadrados. Esta concentración de patrimonio arquitectónico, reconocida como parte del "Camino Real de Tierra Adentro" por la UNESCO en 2010, representa uno de los legados coloniales más importantes de México.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Este artículo explora la fascinante historia de San Luis Potosí: desde el momento en que un indígena cubierto de polvo dorado reveló el secreto del Cerro de San Pedro, hasta las majestuosas iglesias barrocas que hoy adornan sus calles, y las tradiciones culturales que continúan vivas en la Huasteca Potosina.
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

<!-- SECTION 1: HISTORIA MINERA -->
<section id="historia-minera" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-4 inline-block">
      1. El Origen: La Fiebre del Oro y la Plata (1592)
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      El descubrimiento que dio vida a una de las ciudades más importantes del virreinato
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80"
        alt="Vista panorámica de San Luis Potosí al atardecer"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Vista de la ciudad de San Luis Potosí, cuyo origen está ligado a la riqueza mineral de la región
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La historia cuenta que en marzo de 1592, Fray Diego de Magdalena descubrió a un indígena cubierto con polvo dorado proveniente de los yacimientos cercanos. Este hallazgo llamó la atención de los españoles y marcó el inicio de una era que transformaría para siempre la región. Según documentos históricos conservados en archivos coloniales, el Capitán Miguel Caldera envió a Gregorio de León, Juan de la Torre y Pedro de Anda a explorar el lugar.
  </p>

  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">📚</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Dato Histórico</h4>
        <p class="text-gray-700 mb-3">
          El nombre "Potosí" se deriva de la palabra quechua "poc-to-si", que significa "riqueza inmensa", en referencia a las famosas minas del Potosí en el Alto Perú (actual Bolivia). Pedro de Anda bautizó el lugar como "San Pedro del Potosí" en honor al santo de su nombre.
        </p>
        <p class="text-sm text-gray-600">
          — Fuente: Archivo Histórico del Estado de San Luis Potosí
        </p>
      </div>
    </div>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El primer registro de minas fue el del Capitán Caldera, quien tomó la mina y cateó llamándola "La Descubridora". Antes del descubrimiento español, la zona ya era conocida por los guachichiles, pueblo indígena que veneraba el cerro como sagrado.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Una vez oficializado el descubrimiento minero, el lugar se convirtió en un centro de confluencia de personas interesadas en la explotación de oro y plata en la parte septentrional de la Nueva España. Los minerales extraídos de esta región eran enviados a la Ciudad de México y posteriormente exportados a Europa, consolidando a San Luis Potosí como un punto estratégico en el virreinato.
  </p>

  <!-- STATISTICAL HIGHLIGHT -->
  <div class="not-prose my-8 bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg text-center">
    <p class="text-6xl font-bold text-purple-700 mb-3">15%</p>
    <p class="text-xl font-semibold text-gray-800 mb-2">de la plata de la Nueva España</p>
    <p class="text-sm text-gray-600">Producción aproximada de San Luis Potosí hacia 1700, según registros históricos coloniales</p>
  </div>
</section>

<!-- SECTION 2: CERRO DE SAN PEDRO -->
<section id="cerro-san-pedro" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-green-500 pb-4 inline-block">
      2. Cerro de San Pedro: Donde Todo Comenzó
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      El pueblo minero que dio origen a la capital potosina
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-800 mb-8 bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
    <strong>Nota importante:</strong> El Cerro de San Pedro, ubicado a solo 20 kilómetros de la actual capital, fue el epicentro del boom minero que dio vida a San Luis Potosí. Según investigaciones publicadas por instituciones académicas como El Colegio de San Luis, este municipio remonta sus orígenes a una fecha anterior a la fundación de la ciudad capital.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=675&fit=crop&q=80"
        alt="Callejón con arquitectura colonial en San Luis Potosí"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      La arquitectura de cantera característica de la región potosina
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">El Problema del Agua</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Según documentos históricos, en el cerro y sus alrededores se encontró abundante mineral de oro y plata, pero no había agua suficiente para realizar el beneficio de los minerales. La ubicación más cercana de agua estaba hacia el poniente, en una región dominada aún por varias tribus chichimecas.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Esta carencia de agua tuvo una consecuencia fundamental: las haciendas de beneficio, los edificios administrativos y las viviendas de la mayoría de los mineros fueron ubicados en el valle, al poniente del cerro, en el lugar donde posteriormente se asentaría la ciudad de San Luis Potosí. Así nació la capital: no como sede de las minas, sino como centro de procesamiento y administración de la riqueza extraída.
  </p>

  <!-- CASE STUDY BLOCK -->
  <div class="not-prose my-12 bg-green-50 border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
    <div class="bg-green-500 px-8 py-4">
      <h3 class="text-2xl font-bold text-white flex items-center gap-3">
        <span>📖</span> Auge y Declive de Cerro de San Pedro
      </h3>
    </div>
    <div class="p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">1592</p>
          <p class="text-sm text-gray-600 mt-1">Descubrimiento de las minas</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">1621</p>
          <p class="text-sm text-gray-600 mt-1">SLP: 3ra ciudad del virreinato</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">1630</p>
          <p class="text-sm text-gray-600 mt-1">Primer abandono masivo</p>
        </div>
      </div>
      <div class="prose prose-green">
        <p class="text-gray-700 mb-4">
          <strong>Auge:</strong> Según registros del Archivo General de la Nación, la actividad minera de San Pedro motivó un aumento tal de la población que San Luis llegó a ser considerada la tercera ciudad del virreinato por su importancia y riqueza en 1621.
        </p>
        <p class="text-gray-700 mb-4">
          <strong>Crisis:</strong> Investigadores del Colegio de San Luis documentan que en 1620, y nuevamente en 1630, hubo descensos graves en la producción. La explotación sin control debilitó el subsuelo, provocando hundimientos y derrumbes.
        </p>
        <p class="text-gray-700">
          <strong>Legado:</strong> El escudo de armas del estado, que incluye lingotes de oro y plata sobre la figura de San Luis Rey de Francia y un cerro, recuerda permanentemente este origen minero.
        </p>
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

<!-- SECTION 3: ARQUITECTURA BARROCA -->
<section id="arquitectura-barroca" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-yellow-500 pb-4 inline-block">
      3. Arquitectura Barroca: Templos que Cuentan Historias
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      La riqueza minera transformada en piedra y arte sacro
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La prosperidad generada por la minería se tradujo en una extraordinaria producción arquitectónica. Según el catálogo del INAH, alrededor del siglo XVI los grupos misioneros católicos iniciaron la edificación de templos que hoy constituyen joyas del patrimonio arquitectónico mexicano. Las fachadas de cantera rosa y gris que caracterizan a San Luis Potosí son testimonio de una época de esplendor sin precedentes.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=1200&h=675&fit=crop&q=80"
        alt="Fachada de templo colonial con arquitectura barroca"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Los templos de San Luis Potosí exhiben la maestría del barroco novohispano
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Catedral Metropolitana</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La Catedral Metropolitana de San Luis Potosí es considerada el edificio más emblemático de la capital potosina. De acuerdo con registros arquitectónicos del INAH, es una de las primeras construcciones de estilo barroco en la ciudad, con una construcción realizada entre 1670 y 1730.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Según la información proporcionada por fuentes especializadas en arquitectura colonial, entre 1701 y 1728 la iglesia fue demolida y reconstruida con una fachada barroco-salomónica en forma de biombo. Las esculturas de los 12 apóstoles que adornan su fachada, esculpidas en mármol de Carrara, son similares a las de San Giovanni in Laterano en Roma.
  </p>

  <!-- IMAGE WITH CALLOUT BOX -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?w=700&h=500&fit=crop&q=80"
        alt="Torre de templo barroco"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <div class="bg-yellow-50 p-8 rounded-xl border-l-4 border-yellow-500">
      <h4 class="text-2xl font-semibold mb-4 text-yellow-900">Templo del Carmen</h4>
      <p class="text-lg text-yellow-800 mb-4">
        Según especialistas en arquitectura colonial citados por el INAH, el Templo del Carmen es calificado como la obra más importante del barroco de la ciudad.
      </p>
      <ul class="list-disc pl-6 text-yellow-800 space-y-2">
        <li>Estilo barroco churrigueresco</li>
        <li>Construido a mediados del siglo XVIII</li>
        <li>Ubicado en la emblemática Plaza del Carmen</li>
      </ul>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Otros Templos Destacados</h3>

  <!-- DATA COMPARISON TABLE -->
  <div class="not-prose overflow-x-auto my-12">
    <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
      <thead class="bg-gradient-to-r from-blue-600 to-blue-700">
        <tr>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Templo</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Estilo</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Época</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Característica Principal</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Santo Domingo</td>
          <td class="px-6 py-4 text-gray-700">Barroco churrigueresco</td>
          <td class="px-6 py-4 text-gray-700">Siglo XVII-XVIII</td>
          <td class="px-6 py-4 text-gray-700">El más elaborado de la ciudad</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">San Francisco</td>
          <td class="px-6 py-4 text-gray-700">Barroco</td>
          <td class="px-6 py-4 text-gray-700">Siglo XVI</td>
          <td class="px-6 py-4 text-gray-700">Antiguo convento franciscano</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Capilla de Loreto</td>
          <td class="px-6 py-4 text-gray-700">Barroco salomónico</td>
          <td class="px-6 py-4 text-gray-700">1700</td>
          <td class="px-6 py-4 text-gray-700">Junto a la UASLP</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Santuario de Guadalupe</td>
          <td class="px-6 py-4 text-gray-700">Barroco neoclásico</td>
          <td class="px-6 py-4 text-gray-700">Siglo XVIII</td>
          <td class="px-6 py-4 text-gray-700">Monumento histórico INAH</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- SECTION 4: CENTRO HISTORICO -->
<section id="centro-historico" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-red-500 pb-4 inline-block">
      4. Centro Histórico: Patrimonio de la Humanidad
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      218 manzanas de historia viva reconocidas por la UNESCO
    </p>
  </div>

  <!-- SIDE BY SIDE IMAGES -->
  <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
    <figure>
      <div class="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=600&h=400&fit=crop&q=80"
          alt="Edificio colonial con balcones"
          class="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>
      <figcaption class="mt-3 text-sm text-gray-600 font-medium text-center">
        Arquitectura civil: Balcones de cantera típicos
      </figcaption>
    </figure>
    <figure>
      <div class="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=600&h=400&fit=crop&q=80"
          alt="Detalles arquitectónicos coloniales"
          class="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>
      <figcaption class="mt-3 text-sm text-gray-600 font-medium text-center">
        Detalles: Herrería forjada y cantera rosa
      </figcaption>
    </figure>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El centro histórico de San Luis Potosí fue incluido como parte del "Camino Real de Tierra Adentro" en la lista de Patrimonio Cultural de la UNESCO en 2010. Según datos oficiales del INAH, esta zona de monumentos históricos abarca un área de 1.93 kilómetros cuadrados formada por 218 manzanas.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    De acuerdo con el catálogo del Instituto, el centro histórico comprende alrededor de 213 edificios construidos entre los siglos XVI y XX, ofreciendo una vasta muestra de diversas corrientes arquitectónicas europeas: barrocas, neoclásicas, platerescas, góticas, churriguerescas y románicas.
  </p>

  <!-- PRO TIPS SECTION -->
  <div class="not-prose my-12 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">💡</span> Lugares Imperdibles del Centro Histórico
    </h4>
    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Plaza de Armas</p>
        <p class="text-gray-700">El corazón de la ciudad, flanqueada por la Catedral y el Palacio de Gobierno. Centro de la vida social potosina desde la época colonial.</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Plaza del Carmen</p>
        <p class="text-gray-700">Rodeada por el templo del Carmen y el Teatro de la Paz. Considerada por muchos como la plaza más bella de la ciudad.</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Calzada de Guadalupe</p>
        <p class="text-gray-700">Un paseo arbolado que conecta el centro con el Santuario de Guadalupe, ideal para caminar y apreciar la arquitectura.</p>
      </div>
    </div>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80"
        alt="Edificio colonial con torre de reloj"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      La cantera rosa y los detalles arquitectónicos caracterizan muchos edificios del centro histórico
    </figcaption>
  </figure>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 5: LEGADO CULTURAL -->
<section id="legado-cultural" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-4 inline-block">
      5. El Legado Cultural Vivo
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Tradiciones, artesanías y festividades que definen la identidad potosina
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    San Luis Potosí no es solo piedra y arquitectura; es también una rica tradición cultural que ha sobrevivido siglos. Según el Instituto Nacional de los Pueblos Indígenas (INPI), la región huasteca del estado representa una identidad vinculada al pasado prehispánico, con manifestaciones de gran riqueza en música, danzas, artesanías, tradición oral y gastronomía.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">El Huapango: Música del Alma Potosina</h3>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "El huapango es una tradición compartida por los habitantes de la Huasteca, no importa su origen étnico."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Irene Vázquez</cite>
        <p class="text-sm text-gray-600">Etnomusicóloga especializada en música tradicional mexicana</p>
      </div>
    </footer>
  </blockquote>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    De acuerdo con estudios etnomusicológicos, el proceso de mestizaje produjo en esta región el género musical conocido como son huasteco o huapango, en el que se conjuntan el violín, la guitarra quinta o huapanguera y la jarana. San Luis Potosí cuenta con las famosas "Huapangueadas", fiestas populares donde se toca y baila este género que se ha convertido en la música representativa del estado.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Artesanías Emblemáticas</h3>

  <!-- GALLERY -->
  <div class="not-prose my-12">
    <h4 class="text-xl font-semibold mb-6 text-gray-900">Expresiones Artesanales de San Luis Potosí</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Rebozos de Santa María del Río</h5>
        <p class="text-gray-700 mb-4">
          Según el INPI, los rebozos son prendas emblemáticas elaboradas en seda natural de vivos colores con la técnica indígena del ikat. Santa María del Río es reconocida nacionalmente como la "Cuna del Rebozo".
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Cestería Teenek</h5>
        <p class="text-gray-700 mb-4">
          De acuerdo con registros del INPI, la cestería representa la artesanía más importante del pueblo teenek (huasteco), quienes elaboran canastas de hojas de palma trenzadas con lianas.
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Textiles de Tancanhuitz</h5>
        <p class="text-gray-700 mb-4">
          Los quechquémeles son capas de algodón bordadas con hilos de colores en punto cruz, parte del traje tradicional huasteco. Se elaboran en telar de cintura con técnicas ancestrales.
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Arte Huichol</h5>
        <p class="text-gray-700 mb-4">
          En Real de Catorce, los huicholes elaboran cuadros de madera e hilo con motivos alusivos a paisajes oníricos en colores llamativos que transmiten su cosmovisión espiritual.
        </p>
      </div>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Festividades Tradicionales</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    <strong>Xantolo (Día de Muertos):</strong> La celebración del Día de Muertos en San Luis Potosí se conoce como Xantolo, una tradición que, según antropólogos del INAH, honra a los seres queridos fallecidos con ofrendas, música y danzas tradicionales de profundo significado cultural.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    <strong>FENAPO (Feria Nacional Potosina):</strong> De acuerdo con información del gobierno estatal, es una de las celebraciones más importantes del año, realizada en agosto durante diecisiete días con actividades culturales, deportivas y musicales.
  </p>
</section>

<!-- SECTION 6: HUASTECA -->
<section id="huasteca" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-teal-500 pb-4 inline-block">
      6. La Huasteca Potosina: Herencia Prehispánica
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Un universo natural y cultural que complementa la historia colonial
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&h=675&fit=crop&q=80"
        alt="Cascada en la Huasteca Potosina"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Las cascadas de la Huasteca Potosina son parte del patrimonio natural del estado
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Según información del INPI, la Huasteca Potosina es una región ubicada al noreste del estado, conformada por 20 municipios. En la época precolonial, la zona fue habitada principalmente por el pueblo huasteco (teenek), cuya cultura perdura hasta nuestros días.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    De acuerdo con la Secretaría de Cultura federal, la Huasteca potosina representa una identidad vinculada al pasado prehispánico, con manifestaciones que se perciben en su música, sus danzas, sus artesanías, su tradición oral y su universo gastronómico.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Gastronomía Tradicional</h3>

  <div class="not-prose my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
    <p class="text-amber-900">
      <strong>El Zacahuil:</strong> Según registros gastronómicos del INPI, este platillo se acostumbra en toda la región Huasteca. Consiste en un gran tamal que puede medir hasta dos metros, elaborado con masa de maíz quebrado, enchilado y relleno de diferentes tipos de carne, cocido en horno de leña envuelto en hoja de plátano.
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Otros platillos representativos incluyen las enchiladas potosinas (creación local que ha trascendido fronteras), el asado de boda y el queso de bola, según compilaciones de gastronomía tradicional mexicana.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1552537376-3abf35237215?w=1200&h=675&fit=crop&q=80"
        alt="Paisaje natural de la Huasteca Potosina con río y vegetación"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Los ríos de aguas turquesas son característicos de la Huasteca Potosina
    </figcaption>
  </figure>
</section>

<!-- KEY TAKEAWAYS -->
<div class="not-prose my-12 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl">
  <h4 class="text-2xl font-bold mb-6 flex items-center gap-3">
    <span class="text-3xl">🎯</span> Puntos Clave
  </h4>
  <ul class="space-y-4">
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">San Luis Potosí nació del descubrimiento minero de 1592 en Cerro de San Pedro, convirtiéndose en la tercera ciudad del virreinato hacia 1621.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Su centro histórico alberga más de 213 edificios coloniales y es Patrimonio de la Humanidad desde 2010 como parte del Camino Real de Tierra Adentro.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Los templos barrocos como la Catedral, el Carmen y Santo Domingo representan lo mejor de la arquitectura virreinal mexicana.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">El legado cultural vivo incluye el huapango, los rebozos de Santa María del Río, la cestería teenek y tradiciones como el Xantolo.</p>
    </li>
  </ul>
</div>

<!-- CONCLUSION -->
<section id="conclusion" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-gray-500 pb-4 inline-block">
      Conclusión
    </h2>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    San Luis Potosí es mucho más que una ciudad colonial: es un libro abierto de la historia mexicana. Desde el momento en que Pedro de Anda bautizó el Cerro de San Pedro evocando las riquezas del Potosí boliviano, hasta las majestuosas fachadas de cantera que hoy reciben visitantes de todo el mundo, cada piedra cuenta una historia de ambición, fe, arte y tradición.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La riqueza minera que atrajo a miles de colonos se transformó en templos barrocos de extraordinaria belleza. Las tradiciones de los pueblos originarios, lejos de desaparecer, se fundieron con las influencias españolas para crear expresiones culturales únicas como el huapango y las artesanías que hoy enorgullecen al estado.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Visitar San Luis Potosí es caminar por la historia de México: desde las calles empedradas del centro histórico hasta las cascadas de la Huasteca, cada rincón ofrece una ventana al pasado y una celebración del presente.
  </p>
</section>

<!-- CTA -->
<div class="not-prose mt-16 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-4">¿Listo para Explorar San Luis Potosí?</h3>
  <p class="text-lg text-gray-700 mb-6">
    Descubre más sobre esta fascinante ciudad, sus mejores restaurantes, eventos culturales y consejos para visitantes en San Luis Way.
  </p>
  <a href="/cultural-attractions" class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
    Explorar Atracciones Culturales →
  </a>
</div>

</div>`,

  content_en: `<div class="prose prose-lg lg:prose-xl max-w-none">

<!-- TABLE OF CONTENTS -->
<div class="not-prose sticky top-4 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-blue-100 z-10">
  <h3 class="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
    <span>📑</span> In This Article
  </h3>
  <nav class="space-y-2">
    <a href="#introduction" class="block text-blue-600 hover:text-blue-800 hover:underline">→ Introduction</a>
    <a href="#mining-history" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 1. The Origin: The Gold and Silver Rush (1592)</a>
    <a href="#cerro-san-pedro" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 2. Cerro de San Pedro: Where It All Began</a>
    <a href="#baroque-architecture" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 3. Baroque Architecture: Temples That Tell Stories</a>
    <a href="#historic-center" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 4. Historic Center: World Heritage Site</a>
    <a href="#cultural-legacy" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 5. The Living Cultural Legacy</a>
    <a href="#huasteca" class="block text-blue-600 hover:text-blue-800 hover:underline">→ 6. The Huasteca Potosina: Pre-Hispanic Heritage</a>
    <a href="#conclusion" class="block text-blue-600 hover:text-blue-800 hover:underline">→ Conclusion</a>
  </nav>
  <p class="mt-4 text-sm text-gray-600 italic">Estimated reading time: 18 minutes</p>
</div>

<!-- INTRODUCTION -->
<section id="introduction" class="mb-16 scroll-mt-8">
  <p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
    <strong>In the heart of the Mexican highlands rises a city whose history is written in silver and pink quarry stone.</strong> San Luis Potosí, founded over four centuries ago thanks to the discovery of mineral wealth, has become a living testimony of the colonial era and an exceptional example of how mining prosperity can transform into architectural and cultural heritage of global significance.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to historical records documented by the National Institute of Anthropology and History (INAH), the city houses more than 213 buildings constructed between the 16th and 20th centuries in its historic center, spanning an area of 1.93 square kilometers. This concentration of architectural heritage, recognized as part of the "Camino Real de Tierra Adentro" by UNESCO in 2010, represents one of Mexico's most important colonial legacies.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    This article explores the fascinating history of San Luis Potosí: from the moment an indigenous man covered in golden dust revealed the secret of Cerro de San Pedro, to the majestic baroque churches that adorn its streets today, and the cultural traditions that remain alive in the Huasteca Potosina.
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

<!-- SECTION 1: MINING HISTORY -->
<section id="mining-history" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-blue-500 pb-4 inline-block">
      1. The Origin: The Gold and Silver Rush (1592)
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      The discovery that gave life to one of the viceroyalty's most important cities
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80"
        alt="Panoramic view of San Luis Potosí at sunset"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      View of the city of San Luis Potosí, whose origin is linked to the region's mineral wealth
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    History tells that in March 1592, Friar Diego de Magdalena discovered an indigenous man covered with golden dust from nearby deposits. This finding caught the attention of the Spaniards and marked the beginning of an era that would forever transform the region. According to historical documents preserved in colonial archives, Captain Miguel Caldera sent Gregorio de León, Juan de la Torre, and Pedro de Anda to explore the area.
  </p>

  <div class="not-prose my-8 bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">📚</span>
      <div>
        <h4 class="font-semibold text-gray-900 mb-2">Historical Fact</h4>
        <p class="text-gray-700 mb-3">
          The name "Potosí" derives from the Quechua word "poc-to-si," meaning "immense wealth," referring to the famous Potosí mines in Upper Peru (present-day Bolivia). Pedro de Anda christened the place as "San Pedro del Potosí" in honor of his patron saint.
        </p>
        <p class="text-sm text-gray-600">
          — Source: Historical Archive of the State of San Luis Potosí
        </p>
      </div>
    </div>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The first mine registry belonged to Captain Caldera, who took the mine and prospected it, naming it "La Descubridora" (The Discoverer). Before the Spanish discovery, the area was already known to the Guachichiles, an indigenous people who revered the hill as sacred.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Once the mining discovery was officialized, the place became a confluence point for people interested in gold and silver exploitation in the northern part of New Spain. The minerals extracted from this region were sent to Mexico City and subsequently exported to Europe, consolidating San Luis Potosí as a strategic point in the viceroyalty.
  </p>

  <!-- STATISTICAL HIGHLIGHT -->
  <div class="not-prose my-8 bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg text-center">
    <p class="text-6xl font-bold text-purple-700 mb-3">15%</p>
    <p class="text-xl font-semibold text-gray-800 mb-2">of New Spain's silver</p>
    <p class="text-sm text-gray-600">Approximate production from San Luis Potosí around 1700, according to colonial historical records</p>
  </div>
</section>

<!-- SECTION 2: CERRO DE SAN PEDRO -->
<section id="cerro-san-pedro" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-green-500 pb-4 inline-block">
      2. Cerro de San Pedro: Where It All Began
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      The mining town that gave birth to the Potosino capital
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-800 mb-8 bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
    <strong>Important note:</strong> Cerro de San Pedro, located just 20 kilometers from the current capital, was the epicenter of the mining boom that gave life to San Luis Potosí. According to research published by academic institutions such as El Colegio de San Luis, this municipality traces its origins to a date prior to the founding of the capital city.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=675&fit=crop&q=80"
        alt="Colonial architecture alley in San Luis Potosí"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      The characteristic quarry architecture of the Potosino region
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">The Water Problem</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to historical documents, abundant gold and silver minerals were found in the hill and its surroundings, but there wasn't enough water to process the minerals. The nearest water source was to the west, in a region still dominated by various Chichimec tribes.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    This water shortage had a fundamental consequence: the processing haciendas, administrative buildings, and homes of most miners were located in the valley, west of the hill, where the city of San Luis Potosí would later be established. Thus the capital was born: not as the mining site itself, but as the processing and administrative center for the extracted wealth.
  </p>

  <!-- CASE STUDY BLOCK -->
  <div class="not-prose my-12 bg-green-50 border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
    <div class="bg-green-500 px-8 py-4">
      <h3 class="text-2xl font-bold text-white flex items-center gap-3">
        <span>📖</span> Rise and Decline of Cerro de San Pedro
      </h3>
    </div>
    <div class="p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">1592</p>
          <p class="text-sm text-gray-600 mt-1">Discovery of the mines</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">1621</p>
          <p class="text-sm text-gray-600 mt-1">SLP: 3rd city of the viceroyalty</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-700">1630</p>
          <p class="text-sm text-gray-600 mt-1">First mass abandonment</p>
        </div>
      </div>
      <div class="prose prose-green">
        <p class="text-gray-700 mb-4">
          <strong>Rise:</strong> According to records from the General Archive of the Nation, mining activity in San Pedro drove such population growth that San Luis came to be considered the third city of the viceroyalty by importance and wealth in 1621.
        </p>
        <p class="text-gray-700 mb-4">
          <strong>Crisis:</strong> Researchers from El Colegio de San Luis document that in 1620, and again in 1630, there were severe production declines. Uncontrolled exploitation weakened the subsoil, causing collapses and cave-ins.
        </p>
        <p class="text-gray-700">
          <strong>Legacy:</strong> The state's coat of arms, featuring gold and silver ingots above the figure of Saint Louis, King of France, and a hill, permanently commemorates this mining origin.
        </p>
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

<!-- SECTION 3: BAROQUE ARCHITECTURE -->
<section id="baroque-architecture" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-yellow-500 pb-4 inline-block">
      3. Baroque Architecture: Temples That Tell Stories
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Mining wealth transformed into stone and sacred art
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The prosperity generated by mining translated into extraordinary architectural production. According to INAH's catalog, around the 16th century, Catholic missionary groups began building temples that today constitute jewels of Mexican architectural heritage. The pink and gray quarry facades that characterize San Luis Potosí bear witness to an unprecedented era of splendor.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=1200&h=675&fit=crop&q=80"
        alt="Colonial temple facade with baroque architecture"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      The temples of San Luis Potosí display the mastery of New Spanish baroque
    </figcaption>
  </figure>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Metropolitan Cathedral</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The Metropolitan Cathedral of San Luis Potosí is considered the most emblematic building of the Potosino capital. According to INAH's architectural records, it is one of the first baroque-style constructions in the city, built between 1670 and 1730.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to information provided by colonial architecture specialists, between 1701 and 1728 the church was demolished and rebuilt with a baroque-Solomonic screen-like facade. The sculptures of the 12 apostles adorning its facade, carved in Carrara marble, are similar to those of San Giovanni in Laterano in Rome.
  </p>

  <!-- IMAGE WITH CALLOUT BOX -->
  <div class="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?w=700&h=500&fit=crop&q=80"
        alt="Baroque temple tower"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <div class="bg-yellow-50 p-8 rounded-xl border-l-4 border-yellow-500">
      <h4 class="text-2xl font-semibold mb-4 text-yellow-900">Temple of Carmen</h4>
      <p class="text-lg text-yellow-800 mb-4">
        According to colonial architecture specialists cited by INAH, the Temple of Carmen is qualified as the most important baroque work in the city.
      </p>
      <ul class="list-disc pl-6 text-yellow-800 space-y-2">
        <li>Churrigueresque baroque style</li>
        <li>Built in the mid-18th century</li>
        <li>Located in the emblematic Plaza del Carmen</li>
      </ul>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Other Notable Temples</h3>

  <!-- DATA COMPARISON TABLE -->
  <div class="not-prose overflow-x-auto my-12">
    <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
      <thead class="bg-gradient-to-r from-blue-600 to-blue-700">
        <tr>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Temple</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Style</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Era</th>
          <th class="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Main Feature</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Santo Domingo</td>
          <td class="px-6 py-4 text-gray-700">Churrigueresque baroque</td>
          <td class="px-6 py-4 text-gray-700">17th-18th century</td>
          <td class="px-6 py-4 text-gray-700">The most elaborate in the city</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">San Francisco</td>
          <td class="px-6 py-4 text-gray-700">Baroque</td>
          <td class="px-6 py-4 text-gray-700">16th century</td>
          <td class="px-6 py-4 text-gray-700">Former Franciscan convent</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Loreto Chapel</td>
          <td class="px-6 py-4 text-gray-700">Solomonic baroque</td>
          <td class="px-6 py-4 text-gray-700">1700</td>
          <td class="px-6 py-4 text-gray-700">Next to UASLP</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 font-medium text-gray-900">Guadalupe Sanctuary</td>
          <td class="px-6 py-4 text-gray-700">Neoclassical baroque</td>
          <td class="px-6 py-4 text-gray-700">18th century</td>
          <td class="px-6 py-4 text-gray-700">INAH historical monument</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- SECTION 4: HISTORIC CENTER -->
<section id="historic-center" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-red-500 pb-4 inline-block">
      4. Historic Center: World Heritage Site
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      218 city blocks of living history recognized by UNESCO
    </p>
  </div>

  <!-- SIDE BY SIDE IMAGES -->
  <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
    <figure>
      <div class="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=600&h=400&fit=crop&q=80"
          alt="Colonial building with balconies"
          class="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>
      <figcaption class="mt-3 text-sm text-gray-600 font-medium text-center">
        Civil architecture: Typical quarry balconies
      </figcaption>
    </figure>
    <figure>
      <div class="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=600&h=400&fit=crop&q=80"
          alt="Colonial architectural details"
          class="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>
      <figcaption class="mt-3 text-sm text-gray-600 font-medium text-center">
        Details: Wrought iron and pink quarry
      </figcaption>
    </figure>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The historic center of San Luis Potosí was included as part of the "Camino Real de Tierra Adentro" on UNESCO's World Heritage List in 2010. According to official INAH data, this historical monument zone spans an area of 1.93 square kilometers comprising 218 city blocks.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to the Institute's catalog, the historic center comprises around 213 buildings constructed between the 16th and 20th centuries, offering a vast sample of various European architectural styles: baroque, neoclassical, plateresque, gothic, churrigueresque, and Romanesque.
  </p>

  <!-- PRO TIPS SECTION -->
  <div class="not-prose my-12 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8">
    <h4 class="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">💡</span> Must-Visit Places in the Historic Center
    </h4>
    <div class="space-y-4">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Plaza de Armas</p>
        <p class="text-gray-700">The heart of the city, flanked by the Cathedral and Government Palace. The center of Potosino social life since colonial times.</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Plaza del Carmen</p>
        <p class="text-gray-700">Surrounded by the Carmen temple and the Teatro de la Paz. Considered by many to be the most beautiful plaza in the city.</p>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <p class="font-semibold text-gray-900 mb-2">Calzada de Guadalupe</p>
        <p class="text-gray-700">A tree-lined promenade connecting downtown with the Guadalupe Sanctuary, ideal for walking and appreciating the architecture.</p>
      </div>
    </div>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=675&fit=crop&q=80"
        alt="Colonial building with clock tower"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Pink quarry and architectural details characterize many buildings in the historic center
    </figcaption>
  </figure>
</section>

<!-- CHAPTER DIVIDER -->
<div class="not-prose my-16">
  <div class="flex items-center justify-center">
    <div class="border-t-2 border-gray-300 flex-grow"></div>
    <span class="px-6 text-gray-400 text-4xl">✦</span>
    <div class="border-t-2 border-gray-300 flex-grow"></div>
  </div>
</div>

<!-- SECTION 5: CULTURAL LEGACY -->
<section id="cultural-legacy" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-4 inline-block">
      5. The Living Cultural Legacy
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      Traditions, crafts, and festivities that define Potosino identity
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    San Luis Potosí is not just stone and architecture; it's also a rich cultural tradition that has survived centuries. According to the National Institute of Indigenous Peoples (INPI), the Huasteca region of the state represents an identity linked to the pre-Hispanic past, with rich manifestations in music, dances, crafts, oral tradition, and gastronomy.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Huapango: Music of the Potosino Soul</h3>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "Huapango is a tradition shared by the inhabitants of the Huasteca, regardless of their ethnic origin."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Irene Vázquez</cite>
        <p class="text-sm text-gray-600">Ethnomusicologist specializing in traditional Mexican music</p>
      </div>
    </footer>
  </blockquote>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to ethnomusicological studies, the mestizo process in this region produced the musical genre known as son huasteco or huapango, combining violin, quinta huapanguera guitar, and jarana. San Luis Potosí features the famous "Huapangueadas," popular festivals where this genre, which has become the state's representative music, is played and danced.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Emblematic Crafts</h3>

  <!-- GALLERY -->
  <div class="not-prose my-12">
    <h4 class="text-xl font-semibold mb-6 text-gray-900">Artisan Expressions of San Luis Potosí</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Rebozos from Santa María del Río</h5>
        <p class="text-gray-700 mb-4">
          According to INPI, rebozos are emblematic garments made from natural silk in vivid colors using the indigenous ikat technique. Santa María del Río is nationally recognized as the "Cradle of the Rebozo."
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Teenek Basketry</h5>
        <p class="text-gray-700 mb-4">
          According to INPI records, basketry represents the most important craft of the Teenek (Huastec) people, who make baskets from palm leaves woven with vines.
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Tancanhuitz Textiles</h5>
        <p class="text-gray-700 mb-4">
          Quechquémeles are cotton capes embroidered with colored threads in cross-stitch, part of the traditional Huastec costume. They are made on backstrap looms using ancestral techniques.
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h5 class="text-lg font-semibold text-gray-900 mb-3">Huichol Art</h5>
        <p class="text-gray-700 mb-4">
          In Real de Catorce, the Huichol people create wood and yarn pictures with motifs depicting dreamlike landscapes in striking colors that convey their spiritual worldview.
        </p>
      </div>
    </div>
  </div>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Traditional Festivities</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    <strong>Xantolo (Day of the Dead):</strong> The Day of the Dead celebration in San Luis Potosí is known as Xantolo, a tradition that, according to INAH anthropologists, honors deceased loved ones with offerings, music, and traditional dances of deep cultural significance.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    <strong>FENAPO (National Potosino Fair):</strong> According to state government information, this is one of the year's most important celebrations, held in August for seventeen days with cultural, sports, and musical activities.
  </p>
</section>

<!-- SECTION 6: HUASTECA -->
<section id="huasteca" class="mb-16 scroll-mt-8">
  <div class="not-prose mb-8">
    <h2 class="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-teal-500 pb-4 inline-block">
      6. The Huasteca Potosina: Pre-Hispanic Heritage
    </h2>
    <p class="text-lg text-gray-600 mt-4 italic">
      A natural and cultural universe that complements colonial history
    </p>
  </div>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&h=675&fit=crop&q=80"
        alt="Waterfall in the Huasteca Potosina"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      The waterfalls of the Huasteca Potosina are part of the state's natural heritage
    </figcaption>
  </figure>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to INPI information, the Huasteca Potosina is a region located in the northeast of the state, comprising 20 municipalities. In pre-colonial times, the area was mainly inhabited by the Huastec people (Teenek), whose culture endures to this day.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    According to the federal Ministry of Culture, the Huasteca Potosina represents an identity linked to its pre-Hispanic past, with manifestations evident in its music, dances, crafts, oral tradition, and gastronomic universe.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4">Traditional Gastronomy</h3>

  <div class="not-prose my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
    <p class="text-amber-900">
      <strong>Zacahuil:</strong> According to INPI gastronomic records, this dish is customary throughout the Huasteca region. It consists of a large tamale that can measure up to two meters, made with cracked corn masa, seasoned with chili and filled with different types of meat, cooked in a wood-fired oven wrapped in banana leaf.
    </p>
  </div>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Other representative dishes include enchiladas potosinas (a local creation that has transcended borders), asado de boda (wedding roast), and queso de bola (ball cheese), according to traditional Mexican gastronomy compilations.
  </p>

  <figure class="not-prose my-12">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1552537376-3abf35237215?w=1200&h=675&fit=crop&q=80"
        alt="Natural landscape of the Huasteca Potosina with river and vegetation"
        class="w-full h-auto"
        loading="lazy"
      />
    </div>
    <figcaption class="mt-4 text-center text-sm text-gray-600 italic">
      Turquoise rivers are characteristic of the Huasteca Potosina
    </figcaption>
  </figure>
</section>

<!-- KEY TAKEAWAYS -->
<div class="not-prose my-12 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl">
  <h4 class="text-2xl font-bold mb-6 flex items-center gap-3">
    <span class="text-3xl">🎯</span> Key Takeaways
  </h4>
  <ul class="space-y-4">
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">San Luis Potosí was born from the 1592 mining discovery at Cerro de San Pedro, becoming the third city of the viceroyalty by 1621.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Its historic center houses more than 213 colonial buildings and has been a World Heritage Site since 2010 as part of the Camino Real de Tierra Adentro.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">Baroque temples such as the Cathedral, El Carmen, and Santo Domingo represent the best of Mexican viceregal architecture.</p>
    </li>
    <li class="flex items-start gap-3">
      <span class="text-yellow-300 text-xl flex-shrink-0">✓</span>
      <p class="text-lg">The living cultural legacy includes huapango music, Santa María del Río rebozos, Teenek basketry, and traditions like Xantolo.</p>
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
    San Luis Potosí is much more than a colonial city: it's an open book of Mexican history. From the moment Pedro de Anda christened Cerro de San Pedro evoking the riches of Bolivian Potosí, to the majestic quarry facades that welcome visitors from around the world today, every stone tells a story of ambition, faith, art, and tradition.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    The mining wealth that attracted thousands of settlers transformed into baroque temples of extraordinary beauty. The traditions of indigenous peoples, far from disappearing, merged with Spanish influences to create unique cultural expressions like huapango and the crafts that bring pride to the state today.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Visiting San Luis Potosí is walking through Mexico's history: from the cobblestone streets of the historic center to the waterfalls of the Huasteca, every corner offers a window to the past and a celebration of the present.
  </p>
</section>

<!-- CTA -->
<div class="not-prose mt-16 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Explore San Luis Potosí?</h3>
  <p class="text-lg text-gray-700 mb-6">
    Discover more about this fascinating city, its best restaurants, cultural events, and visitor tips on San Luis Way.
  </p>
  <a href="/cultural-attractions" class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
    Explore Cultural Attractions →
  </a>
</div>

</div>`
};

// Get the API URL from environment or use localhost
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function publishPost() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(postData);

    const url = new URL(`${API_BASE}/api/blog/create-post`);
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = lib.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('Blog post published successfully!');
            console.log('Post URL:', result.post?.url || `/blog/${postData.slug}`);
            resolve(result);
          } else {
            console.error('Error publishing post:', result);
            reject(new Error(result.error || 'Unknown error'));
          }
        } catch (e) {
          console.error('Error parsing response:', responseData);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e.message);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

publishPost()
  .then(() => {
    console.log('\nPost published with internationalization (ES + EN)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFailed to publish post:', err.message);
    process.exit(1);
  });
