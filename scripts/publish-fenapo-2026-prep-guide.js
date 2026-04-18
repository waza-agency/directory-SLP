require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const IMG = JSON.parse(fs.readFileSync(path.join(__dirname, 'fenapo-2026-blog-image-urls.json'), 'utf-8'));
const OLD_SLUG = 'fenapo-2026-cartel-guia-completa';
const NEW_SLUG = 'fenapo-2026-guia-preparacion';
const PUBLISHED = '2026-04-18';

const jsonLd = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Event',
      '@id': `https://www.sanluisway.com/blog/${NEW_SLUG}#event`,
      name: 'FENAPO 2026 — Feria Nacional Potosina',
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      location: { '@type': 'Place', name: 'Recinto Ferial FENAPO', address: { '@type': 'PostalAddress', streetAddress: 'Av. Fco. Martínez de la Vega No. 255', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } },
      organizer: { '@type': 'Organization', name: 'Gobierno de San Luis Potosí' },
      isAccessibleForFree: true,
      eventStatus: 'https://schema.org/EventScheduled',
      url: 'https://www.sanluisway.com/events/fenapo-2026',
    },
    {
      '@type': 'HowTo',
      '@id': `https://www.sanluisway.com/blog/${NEW_SLUG}#howto`,
      name: 'How to prepare for FENAPO 2026',
      description: 'Step-by-step guide to plan your FENAPO 2026 visit: hotels, budget, transportation, pre-FENAPO events.',
      totalTime: 'P4M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Book accommodation (April–May)', text: 'Reserve your hotel 3–4 months before August. FENAPO pushes local hotel occupancy above 90%. Best zones: Zona Industrial (closest), Centro Histórico (nightlife), Lomas (chain hotels).' },
        { '@type': 'HowToStep', position: 2, name: 'Attend a pre-FENAPO event (April–May)', text: 'Visit the Recinto Ferial during a pre-FENAPO event to learn the layout, parking, and transport before the big crowds.' },
        { '@type': 'HowToStep', position: 3, name: 'Set your Palenque ticket alerts (June)', text: 'Add fenapo.mx and eticket.mx to your bookmarks. Palenque tickets for Grupo Firme, Gloria Trevi and Edén Muñoz tend to sell out in pre-sale.' },
        { '@type': 'HowToStep', position: 4, name: 'Plan your daily budget (July)', text: 'Estimate $500–$1,500 MXN per day per person depending on whether you pay for Palenque tickets. Teatro del Pueblo concerts, parking and rides are free this year.' },
        { '@type': 'HowToStep', position: 5, name: 'Pack and confirm transport (late July)', text: 'Light layers for hot afternoons and cool nights (altitude 1,864m). Comfortable shoes. Sunscreen. Confirm Uber/DiDi works on your phone if coming from abroad.' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `https://www.sanluisway.com/blog/${NEW_SLUG}#faq`,
      mainEntity: [
        { '@type': 'Question', name: '¿Cuándo debo reservar hotel para la FENAPO 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Entre abril y mayo de 2026. La ocupación hotelera supera el 90% durante agosto. Esperar a julio significa pagar tarifas dinámicas hasta 2x lo normal o quedarse sin disponibilidad cerca del recinto.' } },
        { '@type': 'Question', name: '¿Cuál es el presupuesto diario recomendado?', acceptedAnswer: { '@type': 'Answer', text: 'Entre $500 y $1,500 MXN por persona por día (25–75 USD), dependiendo de si asistes al Palenque (boleto aparte). La entrada a la feria, juegos mecánicos, estacionamiento y Teatro del Pueblo son gratis en 2026.' } },
        { '@type': 'Question', name: '¿Qué debo empacar?', acceptedAnswer: { '@type': 'Answer', text: 'Capas ligeras (tarde caliente, noche fría por la altitud de 1,864m), zapatos cómodos para caminar mucho, protector solar, gorra, botella de agua reutilizable. Efectivo para vendedores pequeños — muchos no aceptan tarjeta.' } },
        { '@type': 'Question', name: '¿Cómo sé cuándo salen las fechas exactas de cada concierto?', acceptedAnswer: { '@type': 'Answer', text: 'El Gobierno anuncia por oleadas desde abril hasta julio. Sigue fenapo.slp.gob.mx, las redes oficiales de @ferianacionalpotosina, y actualizamos esta guía cada vez que confirman un artista nuevo o una fecha.' } },
        { '@type': 'Question', name: '¿Qué pasa si viajo con niños?', acceptedAnswer: { '@type': 'Answer', text: 'La FENAPO es muy familiar. Hay zona infantil, juegos mecánicos gratuitos y shows culturales. Lleva audífonos para niños si irás a Teatro del Pueblo — el volumen es alto. Evita fines de semana después de 8 PM si los niños son pequeños: la multitud se duplica.' } },
        { '@type': 'Question', name: '¿Puedo ir solo/a?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, es seguro. El recinto está muy vigilado. Si viajas solo, prefiere horarios diurnos para juegos mecánicos y Teatro del Pueblo, y usa Uber/DiDi para regresar de noche. Los palenques son un gran ambiente para ir con un grupo.' } },
        { '@type': 'Question', name: '¿Cuándo publicarán el cartel 100% confirmado?', acceptedAnswer: { '@type': 'Answer', text: 'Los últimos artistas (2 internacionales para Teatro del Pueblo) se anuncian típicamente entre mayo y julio. Cuando el cartel esté 100% confirmado publicaremos un segundo deep-dive enfocado exclusivamente en los artistas y sus fechas.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanluisway.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sanluisway.com/blog' },
        { '@type': 'ListItem', position: 3, name: 'FENAPO 2026 Guía de Preparación', item: `https://www.sanluisway.com/blog/${NEW_SLUG}` },
      ],
    },
    {
      '@type': 'Article',
      '@id': `https://www.sanluisway.com/blog/${NEW_SLUG}#article`,
      headline: 'FENAPO 2026: Guía de Preparación — Cómo Planear Tu Visita Antes de Agosto',
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      author: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
      publisher: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable', '#quick-summary', '#faq-heading'] },
      citation: [
        { '@type': 'CreativeWork', name: 'Gobierno SLP — FENAPO oficial', url: 'https://fenapo.slp.gob.mx/' },
        { '@type': 'CreativeWork', name: 'Feria FENAPO', url: 'https://www.feriafenapo.com/' },
        { '@type': 'CreativeWork', name: 'Noticieros SLP', url: 'https://noticierosslp.com/2026/03/05/fenapo-perfila-cartelera-completa-palenque-listo-y-teatro-del-pueblo-casi-definido/' },
      ],
    },
  ],
}, null, 0)}</script>
`;

const contentES = jsonLd + `<div class="not-prose mb-8">
  <div class="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
    <img src="${IMG.hero}" alt="Multitud en el Teatro del Pueblo de la FENAPO durante un concierto nocturno" class="w-full h-full object-cover" loading="eager" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
      <div class="p-6 md:p-10">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-3">FENAPO 2026: Guía de Preparación</h1>
        <p class="text-lg md:text-xl text-white/90">Falta menos de 4 meses. Esto es lo que tienes que hacer ahora para llegar sin estrés y con los mejores lugares.</p>
      </div>
    </div>
  </div>
</div>

<div class="bg-purple-50 border border-purple-100 p-6 rounded-xl mb-8">
  <h3 class="text-xl font-bold mb-3 text-purple-900">📑 En Esta Guía de Preparación</h3>
  <nav class="grid grid-cols-1 md:grid-cols-2 gap-2 text-purple-800">
    <a href="#overview" class="hover:underline">→ FENAPO 2026 en breve</a>
    <a href="#timeline" class="hover:underline">→ Cronograma: qué hacer cada mes</a>
    <a href="#hospedaje" class="hover:underline">→ Hospedaje: reserva ahora</a>
    <a href="#boletos" class="hover:underline">→ Estrategia de boletos</a>
    <a href="#presupuesto" class="hover:underline">→ Presupuesto diario</a>
    <a href="#transporte" class="hover:underline">→ Transporte al recinto</a>
    <a href="#empacar" class="hover:underline">→ Qué empacar</a>
    <a href="#pre-fenapo" class="hover:underline">→ Pre-FENAPO: ensaya el recinto</a>
    <a href="#cartel-actual" class="hover:underline">→ Estado del cartel (abril)</a>
    <a href="#tips-foraneos" class="hover:underline">→ Si vienes de fuera</a>
    <a href="#faq" class="hover:underline">→ FAQ</a>
    <a href="#fuentes" class="hover:underline">→ Fuentes</a>
  </nav>
  <p class="mt-4 text-sm text-purple-700 italic">Lectura: 14 minutos · Última actualización: 18 de abril, 2026</p>
</div>

<p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
  <strong>La FENAPO 2026 es en agosto. Hoy es 18 de abril.</strong> Esa ventana de cuatro meses es exactamente el tiempo óptimo para planear sin estrés: reservar hospedaje antes de que los precios suban, vigilar anuncios del cartel conforme salen, y conocer el recinto asistiendo a un evento pre-FENAPO. Esta guía está diseñada para quien ya decidió que va a ir — solo necesita un plan claro. Cuando la cartelera esté 100% confirmada (típicamente junio/julio) publicaremos una segunda guía dedicada exclusivamente a los artistas y sus fechas.
</p>

<section id="overview" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 id="quick-summary" class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">FENAPO 2026 en breve</h2>
</div>

<div class="speakable bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6 md:p-8 mb-6">
  <p class="text-base md:text-lg text-gray-800 leading-relaxed mb-5">
    <strong>La FENAPO 2026 — edición 77 de la Feria Nacional Potosina de México</strong> — se celebrará en agosto de 2026 en el Recinto Ferial sobre Av. Fco. Martínez de la Vega. Es el evento anual que más atrae visitantes a San Luis Potosí, con más de 3 millones de asistentes en ediciones recientes. Para 2026 el Gobernador anunció que la entrada a la feria, los juegos mecánicos, el estacionamiento y los conciertos del Teatro del Pueblo serán gratuitos — solo el Palenque mantiene boletaje separado. A abril, 9 artistas están confirmados y 2 más internacionales están pendientes para el Teatro del Pueblo.
  </p>
  <h3 class="text-lg font-bold text-purple-900 mb-3">Lo que necesitas saber hoy (18 abril 2026)</h3>
  <ul class="space-y-2 mb-3">
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Fechas:</strong> Agosto 2026 (inauguración y clausura oficial por confirmar)</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Entrada:</strong> Gratis (feria, juegos mecánicos, estacionamiento, Teatro del Pueblo)</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Palenque:</strong> Boleto independiente — fenapo.mx y eticket.mx</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Presupuesto diario:</strong> $500–$1,500 MXN por persona (con o sin Palenque)</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Reserva hotel:</strong> <u>ahora</u> — ocupación supera 90% en agosto</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Cartel:</strong> 9 confirmados (3 Teatro + 6 Palenque), más anuncios esperados mayo–julio</span></li>
  </ul>
  <p class="text-xs text-gray-600 italic pt-3 border-t border-purple-200">Actualizaremos esta guía cada vez que el Gobierno anuncie un nuevo artista, precio de boleto, o cambio de fechas.</p>
</div>
</section>

<section id="timeline" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Cronograma: Qué Hacer Cada Mes</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  La forma más fácil de prepararte para la FENAPO sin sentir que estás corriendo contra el reloj en agosto es distribuir las tareas mes a mes. Esto es lo que nosotros recomendamos:
</p>

<div class="not-prose my-10">
  <div class="relative">
    <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-200"></div>
    <div class="space-y-6">
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">1</div>
        <div class="flex-1 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h4 class="font-bold text-purple-900 mb-1">Abril 2026 (hoy) — Reserva hotel + asiste a pre-FENAPO</h4>
          <p class="text-sm text-gray-700">Reserva tu hospedaje ahora mismo. Si estás cerca, aprovecha los eventos pre-FENAPO (18 y 24 abril) para familiarizarte con el recinto. Si vienes de fuera, bloquea fechas en tu calendario.</p>
        </div>
      </div>
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">2</div>
        <div class="flex-1 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h4 class="font-bold text-indigo-900 mb-1">Mayo 2026 — Sigue anuncios + agenda San Luis Metal Fest</h4>
          <p class="text-sm text-gray-700">Activa alertas en redes de @ferianacionalpotosina. El San Luis Metal Fest (16 mayo) es otro pre-FENAPO en el mismo recinto — excelente ensayo logístico. Sigue saliendo el cartel semana a semana.</p>
        </div>
      </div>
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">3</div>
        <div class="flex-1 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h4 class="font-bold text-blue-900 mb-1">Junio 2026 — Configura alertas de boletos del Palenque</h4>
          <p class="text-sm text-gray-700">Las preventas del Palenque abren aquí. Grupo Firme, Gloria Trevi y Edén Muñoz se agotan en preventa. Bookmarkea fenapo.mx y eticket.mx, y crea alertas de Google para cada artista que te interesa.</p>
        </div>
      </div>
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">4</div>
        <div class="flex-1 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h4 class="font-bold text-teal-900 mb-1">Julio 2026 — Planea logística diaria</h4>
          <p class="text-sm text-gray-700">Cartel 100% confirmado. Publicaremos nuestra guía dedicada de artistas. Planea qué noches vas, cuáles serán de Palenque, cuáles de Teatro del Pueblo. Reconfirma hotel y transporte.</p>
        </div>
      </div>
      <div class="relative flex items-start gap-6">
        <div class="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">5</div>
        <div class="flex-1 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h4 class="font-bold text-green-900 mb-1">Agosto 2026 — Vive la FENAPO</h4>
          <p class="text-sm text-gray-700">Llega un día antes si vienes de fuera. Usa Uber/DiDi de noche. Lleva efectivo. Disfruta.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<section id="hospedaje" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Hospedaje: Reserva Ahora, No Después</h2>
</div>

<div class="not-prose my-6 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
  <p class="text-red-900"><strong>⚠️ Ventana crítica:</strong> Si vienes de fuera y aún no tienes hotel, reserva esta semana. La ocupación hotelera durante FENAPO supera el 90%, y los precios dinámicos suben 50–100% a partir de junio. Cancelar gratis a último momento es mejor que quedarse sin nada.</p>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Hay tres zonas viables. Cada una sirve un perfil distinto:
</p>

<div class="not-prose overflow-x-auto my-8">
  <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
    <thead class="bg-gradient-to-r from-purple-600 to-indigo-700">
      <tr>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Zona</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Tiempo al recinto</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Ideal para</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Rango precios/noche</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr><td class="px-5 py-3 font-semibold">Cerca del Recinto (Zona Industrial/Morales)</td><td class="px-5 py-3 text-gray-700">5–10 min</td><td class="px-5 py-3 text-gray-700">Quien no quiere perder tiempo en traslados</td><td class="px-5 py-3 text-gray-700">$700–$1,500 MXN</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-semibold">Centro Histórico</td><td class="px-5 py-3 text-gray-700">15–20 min</td><td class="px-5 py-3 text-gray-700">Quien quiere disfrutar SLP además de la feria</td><td class="px-5 py-3 text-gray-700">$1,200–$3,000 MXN</td></tr>
      <tr><td class="px-5 py-3 font-semibold">Lomas</td><td class="px-5 py-3 text-gray-700">20–25 min</td><td class="px-5 py-3 text-gray-700">Familias, viajeros en cadenas (Fiesta Americana, Hilton)</td><td class="px-5 py-3 text-gray-700">$1,500–$4,000 MXN</td></tr>
    </tbody>
  </table>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Nuestra recomendación: si vas 2–3 días nada más, elige Zona Industrial cerca del recinto. Si vas 4+ días y quieres conocer SLP, Centro Histórico te da mejor ambiente nocturno, restaurantes y base para visitar la Huasteca Potosina al final del viaje.
</p>
</section>

<section id="boletos" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Estrategia de Boletos</h2>
</div>

<div class="not-prose bg-green-50 border-2 border-green-300 rounded-xl p-6 my-6">
  <h3 class="text-xl font-bold text-green-900 mb-3">🎉 Lo que es gratis en 2026</h3>
  <ul class="text-green-900 space-y-1">
    <li>✓ Entrada a la feria</li>
    <li>✓ Conciertos del Teatro del Pueblo (todos los artistas de ese escenario)</li>
    <li>✓ Juegos mecánicos</li>
    <li>✓ Estacionamiento</li>
  </ul>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El único costo directo de la FENAPO 2026 es el Palenque. Las preventas abren típicamente en junio-julio, con acceso anticipado para clientes BBVA y Banorte. Los shows de mayor demanda (Grupo Firme, Gloria Trevi, Edén Muñoz) se agotan entre preventa y las primeras 48 horas de venta abierta.
</p>

<div class="not-prose my-8 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
  <h4 class="font-bold text-yellow-900 mb-3">💡 Tácticas para conseguir boletos</h4>
  <ul class="space-y-2 text-yellow-900">
    <li><strong>1. Crea alertas desde mayo:</strong> Google Alerts con el nombre del artista + "palenque FENAPO".</li>
    <li><strong>2. Prepara tu cuenta eticket.mx:</strong> Registra tarjeta y datos antes de la preventa para comprar en segundos.</li>
    <li><strong>3. Varios dispositivos el día de preventa:</strong> computadora + teléfono + tablet. Servidores saturados.</li>
    <li><strong>4. Considera mesa VIP si viajas en grupo:</strong> suelen liberar después de que las butacas se acaban, y por persona salen similar.</li>
    <li><strong>5. Desconfía de reventa en redes sociales:</strong> eticket.mx es el canal oficial. Para boletos no oficiales, verifica códigos antes de pagar.</li>
  </ul>
</div>
</section>

<section id="presupuesto" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Presupuesto Diario</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  La gracia de que la FENAPO sea gratis este año es que puedes calibrar tu gasto según lo que quieras hacer. Tres escenarios típicos:
</p>

<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-2">Día económico</h4>
    <p class="text-3xl font-bold text-green-700 mb-2">~$500 MXN</p>
    <p class="text-sm text-gray-700 mb-3">(~$29 USD)</p>
    <ul class="text-xs text-gray-600 space-y-1">
      <li>• Transporte: $100</li>
      <li>• Antojos: $200</li>
      <li>• Juegos: gratis</li>
      <li>• Teatro del Pueblo: gratis</li>
      <li>• Extras: $200</li>
    </ul>
  </div>
  <div class="bg-white border-2 border-purple-200 rounded-xl p-5 shadow-md">
    <h4 class="font-bold text-gray-900 mb-2">Día completo</h4>
    <p class="text-3xl font-bold text-purple-700 mb-2">~$1,000 MXN</p>
    <p class="text-sm text-gray-700 mb-3">(~$57 USD)</p>
    <ul class="text-xs text-gray-600 space-y-1">
      <li>• Transporte: $150</li>
      <li>• Comidas x2: $400</li>
      <li>• Cervezas/bebidas: $250</li>
      <li>• Artesanías: $200</li>
    </ul>
  </div>
  <div class="bg-white border-2 border-amber-200 rounded-xl p-5">
    <h4 class="font-bold text-gray-900 mb-2">Día Palenque</h4>
    <p class="text-3xl font-bold text-amber-700 mb-2">~$1,500 MXN</p>
    <p class="text-sm text-gray-700 mb-3">(~$86 USD)</p>
    <ul class="text-xs text-gray-600 space-y-1">
      <li>• Palenque (gradas): $600–$1,200</li>
      <li>• Cena: $300</li>
      <li>• Bebidas: $300</li>
      <li>• Transporte: $200</li>
    </ul>
  </div>
</div>

<p class="text-sm text-gray-600 italic">Cálculos basados en tarifas típicas FENAPO 2024–2025 ajustadas por inflación 2026.</p>
</section>

<section id="transporte" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Transporte al Recinto</h2>
</div>

<figure class="not-prose my-8">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG.fairgrounds}" alt="Vista aérea al atardecer del Recinto Ferial FENAPO con juegos mecánicos, luces y multitud" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">Vista aérea del Recinto Ferial. Planea llegar antes de 7 PM los fines de semana o después de 10 PM para evitar el pico.</figcaption>
</figure>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El Recinto Ferial está en <strong>Av. Fco. Martínez de la Vega No. 255</strong>, 8 km del Centro Histórico. Durante FENAPO las opciones son:
</p>

<ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
  <li><strong>Uber / DiDi:</strong> La opción más recomendada para no preocuparte por estacionamiento, alcohol, ni tráfico de salida. Precio desde Centro: $80–$150 MXN. Pico de multa de Uber los viernes/sábados después de 10 PM.</li>
  <li><strong>Auto propio:</strong> Estacionamiento gratis, pero se llena antes de las 7 PM los fines de semana. Salida lenta al final del concierto (30-45 min de fila).</li>
  <li><strong>Transporte público:</strong> Rutas 23, 32 y 52 con transbordo. Funciona hasta las 10 PM aprox. $12 MXN por viaje.</li>
  <li><strong>Desde aeropuerto SLP:</strong> 20 min en taxi/rideshare. Plan A: llega al hotel primero, Plan B directo al recinto si vienes el día del concierto.</li>
</ul>
</section>

<section id="empacar" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Qué Empacar</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  San Luis Potosí está a 1,864m de altitud. En agosto, las tardes son calientes (28–32°C) y las noches significativamente frescas (12–16°C). El recinto es mayormente al aire libre. Esto es lo esencial:
</p>

<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
  <div class="bg-blue-50 border border-blue-200 rounded-xl p-5">
    <h4 class="font-bold text-blue-900 mb-3">👕 Ropa</h4>
    <ul class="text-sm text-blue-900 space-y-1">
      <li>• Capas ligeras: playera + camisa + chamarra ligera</li>
      <li>• Pantalón cómodo (vas a caminar 5–8 km)</li>
      <li>• Zapatos cerrados cómodos (el recinto tiene terracería)</li>
      <li>• Gorra o sombrero para tarde</li>
    </ul>
  </div>
  <div class="bg-amber-50 border border-amber-200 rounded-xl p-5">
    <h4 class="font-bold text-amber-900 mb-3">🎒 En la mochila</h4>
    <ul class="text-sm text-amber-900 space-y-1">
      <li>• Protector solar SPF 50+</li>
      <li>• Botella reutilizable (hay bebederos)</li>
      <li>• Efectivo ($500–1000 MXN — muchos vendedores no aceptan tarjeta)</li>
      <li>• Power bank para el teléfono</li>
      <li>• Audífonos si vas con niños (Teatro del Pueblo suena fuerte)</li>
    </ul>
  </div>
</div>
</section>

<section id="pre-fenapo" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Pre-FENAPO: Ensaya el Recinto</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Una táctica subestimada: ir a un evento pre-FENAPO. El recinto está activo con cuatro eventos entre abril y mayo. Vas sin la presión de la feria grande, aprendes el estacionamiento, el tiempo real de traslado, dónde está cada entrada. Después cuando vuelvas en agosto, te mueves como local:
</p>

<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
  <div class="bg-white border-2 border-purple-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">18 abril, 2026</p>
    <h4 class="font-bold text-gray-900 mb-2">Duelo de Acordeones</h4>
    <p class="text-sm text-gray-700">Competencia norteña. Entrada accesible, ambiente familiar.</p>
  </div>
  <div class="bg-white border-2 border-purple-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">24 abril, 2026</p>
    <h4 class="font-bold text-gray-900 mb-2">Victor Mendivil + Kevin AMF</h4>
    <p class="text-sm text-gray-700">Doble cartel de regional mexicano.</p>
  </div>
  <div class="bg-white border-2 border-purple-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">16 mayo, 2026</p>
    <h4 class="font-bold text-gray-900 mb-2">San Luis Metal Fest 2026</h4>
    <p class="text-sm text-gray-700"><a href="/events/san-luis-metal-fest-2026" class="text-blue-700 hover:underline">Cobertura completa →</a></p>
  </div>
  <div class="bg-white border-2 border-purple-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">22–24 mayo, 2026</p>
    <h4 class="font-bold text-gray-900 mb-2">Copa Libertadores (Voleibol)</h4>
    <p class="text-sm text-gray-700">Torneo internacional de voleibol.</p>
  </div>
</div>
</section>

<section id="cartel-actual" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Estado del Cartel (a 18 abril 2026)</h2>
</div>

<div class="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
  <p class="text-gray-700 mb-5">
    El cartel está al 90%. Esto es solo una instantánea — cada semana sale un anuncio nuevo y actualizamos. Para el cartel 100% verificado publicaremos un segundo deep-dive dedicado a los artistas cuando estén todos confirmados.
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h4 class="font-bold text-purple-900 mb-3">🎤 Teatro del Pueblo (gratis)</h4>
      <ul class="space-y-2 text-sm text-gray-700">
        <li>✓ Sin Bandera (balada pop)</li>
        <li>✓ Los Acosta (cumbia regional)</li>
        <li>✓ Kenia Os (pop / urbano)</li>
        <li class="text-gray-500 italic">⧗ 2 artistas internacionales por anunciar</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-amber-900 mb-3">🤠 Palenque (boleto)</h4>
      <ul class="space-y-2 text-sm text-gray-700">
        <li>✓ Grupo Firme</li>
        <li>✓ Edén Muñoz</li>
        <li>✓ Gloria Trevi</li>
        <li>✓ Los Invasores de Nuevo León</li>
        <li>✓ Los Cardenales de Nuevo León</li>
        <li>✓ Los Viejones de Linares</li>
        <li class="text-green-700 font-semibold">✓ Cartelera completa</li>
      </ul>
    </div>
  </div>
  <p class="text-xs text-gray-500 italic mt-5 pt-4 border-t border-gray-200">Verificado contra fenapo.slp.gob.mx, feriafenapo.com, Noticieros SLP, Frontal Noticias.</p>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  <strong>Cómo rastrear actualizaciones:</strong> Redes oficiales <a href="https://www.facebook.com/ferianacionalpotosina" target="_blank" rel="noopener" class="text-blue-700 hover:underline">@ferianacionalpotosina</a> en Facebook e Instagram son las primeras en anunciar. <a href="https://fenapo.slp.gob.mx" target="_blank" rel="noopener" class="text-blue-700 hover:underline">fenapo.slp.gob.mx</a> publica los comunicados oficiales del Gobernador. Nosotros publicaremos una nota cuando salgan los 2 pendientes internacionales del Teatro del Pueblo.
</p>
</section>

<section id="tips-foraneos" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Si Vienes de Fuera (CDMX, Guadalajara, Monterrey, USA)</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  SLP no es un destino turístico saturado, así que no hay servicios en inglés masivos ni "tour packages" estructurados como en San Miguel de Allende. Esto significa tres cosas:
</p>

<ul class="list-disc pl-6 space-y-3 text-gray-700 mb-6">
  <li><strong>Lleva efectivo:</strong> Muchos vendedores de comida y artesanía solo aceptan efectivo. Bancos y ATMs funcionan bien en Centro y Lomas.</li>
  <li><strong>Spanish helps:</strong> El personal del recinto habla poco inglés. Aprende frases básicas o usa Google Translate offline. Uber/DiDi funciona en ambos idiomas.</li>
  <li><strong>Llega un día antes:</strong> Si vuelas, aterriza el día previo. El aeropuerto SLP tiene vuelos directos desde CDMX, Houston y Dallas.</li>
  <li><strong>Combina con otras experiencias:</strong> Centro Histórico UNESCO, Parque Tangamanga, Real de Catorce (3 hrs) o la Huasteca Potosina (4 hrs). Vale la pena extender el viaje 2–3 días extra.</li>
</ul>
</section>

<section id="faq" class="mb-16 scroll-mt-8 speakable">
<div class="not-prose mb-6">
  <h2 id="faq-heading" class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Preguntas Frecuentes</h2>
</div>

<div class="space-y-5">
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cuándo debo reservar hotel?</h3>
    <p class="text-gray-700">Entre abril y mayo de 2026. La ocupación durante agosto supera 90% y los precios dinámicos suben 50–100% a partir de junio. Esperar a julio significa pagar mucho más o quedarse sin disponibilidad cerca del recinto.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cuál es el presupuesto diario recomendado?</h3>
    <p class="text-gray-700">$500 MXN (~$29 USD) para un día económico, $1,000 MXN (~$57 USD) para un día completo con comidas y bebidas, $1,500+ MXN (~$86 USD) si incluyes Palenque. Entrada, rides y Teatro del Pueblo son gratis.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Qué debo empacar?</h3>
    <p class="text-gray-700">Capas ligeras (tarde caliente, noche fría por la altitud de 1,864m), zapatos cómodos para caminar, protector solar, gorra, botella reutilizable, efectivo. Power bank y audífonos si vas con niños.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cuándo salen las fechas exactas de cada concierto?</h3>
    <p class="text-gray-700">El Gobierno anuncia por oleadas desde abril hasta julio. Sigue fenapo.slp.gob.mx y @ferianacionalpotosina. Actualizamos esta guía cada vez que confirman un artista o fecha.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Qué pasa si viajo con niños?</h3>
    <p class="text-gray-700">La FENAPO es muy familiar. Hay zona infantil, juegos mecánicos gratuitos y shows culturales. Lleva audífonos para ellos en Teatro del Pueblo. Evita fines de semana después de 8 PM si son pequeños — la multitud se duplica.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Puedo ir solo/a?</h3>
    <p class="text-gray-700">Sí. El recinto está muy vigilado. Prefiere horarios diurnos para juegos mecánicos, y usa Uber/DiDi para regresar de noche.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cuándo publicarán el cartel 100% confirmado?</h3>
    <p class="text-gray-700">Los últimos artistas (2 internacionales del Teatro del Pueblo) se anuncian típicamente entre mayo y julio. Cuando esté 100% confirmado publicaremos un segundo deep-dive exclusivamente sobre los artistas y sus fechas.</p>
  </div>
</div>
</section>

<section id="fuentes" class="mb-12 scroll-mt-8">
<div class="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-gray-900 mb-3">Fuentes y Verificación</h2>
  <p class="text-sm text-gray-600 mb-4">Verificado contra fuentes oficiales al 18 de abril, 2026. Actualizaremos conforme salga información nueva.</p>
  <ul class="space-y-2 text-sm text-gray-700">
    <li>→ <a href="https://fenapo.slp.gob.mx/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">fenapo.slp.gob.mx — Sitio oficial del Gobierno de SLP</a></li>
    <li>→ <a href="https://www.feriafenapo.com/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">feriafenapo.com — Portal oficial de la Feria</a></li>
    <li>→ <a href="https://noticierosslp.com/2026/03/05/fenapo-perfila-cartelera-completa-palenque-listo-y-teatro-del-pueblo-casi-definido/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">Noticieros SLP — Estado de la cartelera</a></li>
    <li>→ <a href="https://www.frontalnoticias.com/san-luis-potosi/gob-slp/kenia-os-y-eden-munoz-nuevos-artistas-confirmados-para-la-fenapo-2026/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">Frontal Noticias — Anuncios recientes del Gobernador</a></li>
  </ul>
</div>
</section>

<div class="not-prose mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-3">Siguientes pasos</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <a href="/events/fenapo-2026" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Página oficial del evento</p>
      <p class="text-sm text-gray-600">Cartel actualizado, mapa del recinto, schema JSON-LD</p>
    </a>
    <a href="/events/san-luis-metal-fest-2026" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ San Luis Metal Fest (16 mayo)</p>
      <p class="text-sm text-gray-600">Tu primer ensayo del recinto antes de FENAPO</p>
    </a>
    <a href="/resources/living-guide" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Guía completa de SLP</p>
      <p class="text-sm text-gray-600">Para quienes vienen de fuera por varios días</p>
    </a>
    <a href="/blog/ultimate-guide-living-san-luis-potosi-2026" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Guía 2026 para expats y nómadas</p>
      <p class="text-sm text-gray-600">Presupuesto, colonias, internet, visa</p>
    </a>
  </div>
</div>`;

const contentEN = contentES
  .replace(/FENAPO 2026: Guía de Preparación/g, 'FENAPO 2026 Preparation Guide')
  .replace(/Falta menos de 4 meses\. Esto es lo que tienes que hacer ahora para llegar sin estrés y con los mejores lugares\./g, 'Less than 4 months out. Here is what to do now to arrive stress-free with the best seats.')
  .replace(/En Esta Guía de Preparación/g, 'In This Preparation Guide')
  .replace(/FENAPO 2026 en breve/g, 'FENAPO 2026 at a glance')
  .replace(/Cronograma: qué hacer cada mes/g, 'Month-by-month checklist')
  .replace(/Hospedaje: reserva ahora/g, 'Accommodation: book now')
  .replace(/Estrategia de boletos/g, 'Ticket strategy')
  .replace(/Presupuesto diario/g, 'Daily budget')
  .replace(/Transporte al recinto/g, 'Transportation')
  .replace(/Qué empacar/g, 'What to pack')
  .replace(/Pre-FENAPO: ensaya el recinto/g, 'Pre-FENAPO: practice run')
  .replace(/Estado del cartel \(abril\)/g, 'Lineup status (April)')
  .replace(/Si vienes de fuera/g, 'If you are coming from out of town')
  .replace(/Lectura: 14 minutos · Última actualización: 18 de abril, 2026/g, 'Reading time: 14 minutes · Last updated: April 18, 2026');

const post = {
  slug: NEW_SLUG,
  status: 'published',
  published_at: new Date(PUBLISHED).toISOString(),
  image_url: IMG.hero,
  category: 'Events',
  tags: ['fenapo', 'fenapo-2026', 'preparation', 'guide', 'planning', 'hotels', 'tickets', 'festival', 'san-luis-potosi'],

  title: 'FENAPO 2026 Preparation Guide: How to Plan Your Visit Before August',
  excerpt: '4 months to FENAPO 2026. Month-by-month checklist: book hotels in April–May, watch ticket presales in June, plan logistics in July. Budgets, transport, packing — everything you need to arrive prepared.',
  content: contentEN,
  meta_title: 'FENAPO 2026 Preparation Guide — Plan Your Visit',
  meta_description: 'Full FENAPO 2026 prep guide: when to book hotels, ticket strategy for the Palenque, daily budget ranges ($29–$86 USD), transport, what to pack, pre-FENAPO events. Updated April 2026.',

  title_es: 'FENAPO 2026: Guía de Preparación — Cómo Planear Tu Visita Antes de Agosto',
  excerpt_es: 'Faltan 4 meses para FENAPO 2026. Checklist mes a mes: reserva hotel en abril–mayo, vigila preventas en junio, planea logística en julio. Presupuestos, transporte, qué empacar — todo para llegar listo.',
  content_es: contentES,
  meta_title_es: 'FENAPO 2026 Guía de Preparación — Planea tu Visita',
  meta_description_es: 'Guía completa de preparación FENAPO 2026: cuándo reservar hotel, estrategia de boletos, presupuestos diarios, transporte, qué empacar, eventos pre-FENAPO. Actualizada abril 2026.',

  title_de: 'FENAPO 2026 Vorbereitungs-Guide: Plane deinen Besuch',
  excerpt_de: 'Kompletter Vorbereitungs-Guide für FENAPO 2026 mit Monats-Checkliste, Hotel- und Ticket-Strategie.',
  content_de: contentEN,
  meta_title_de: 'FENAPO 2026 Vorbereitungs-Guide',
  meta_description_de: 'FENAPO 2026: Monats-Checkliste, Hotels, Tickets, Budget.',

  title_ja: 'FENAPO 2026準備ガイド：8月前に計画を',
  excerpt_ja: 'FENAPO 2026完全準備ガイド。月別チェックリスト、ホテル、チケット戦略、予算、持ち物。',
  content_ja: contentEN,
  meta_title_ja: 'FENAPO 2026準備ガイド',
  meta_description_ja: 'FENAPO 2026完全準備ガイド。',
};

(async () => {
  // Find the old post (current slug) — update its slug and content in place
  const { data: oldPost } = await supabase.from('blog_posts').select('id').eq('slug', OLD_SLUG).maybeSingle();
  if (oldPost) {
    console.log('Repurposing existing post:', oldPost.id);
    const { error } = await supabase.from('blog_posts').update(post).eq('id', oldPost.id);
    if (error) { console.error('Update:', error); process.exit(1); }
    console.log('✅ Slug changed:', OLD_SLUG, '→', NEW_SLUG);
  } else {
    // Also check if new slug already exists
    const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', NEW_SLUG).maybeSingle();
    if (existing) {
      const { error } = await supabase.from('blog_posts').update(post).eq('id', existing.id);
      if (error) { console.error('Update:', error); process.exit(1); }
      console.log('✅ Updated existing new-slug post:', existing.id);
    } else {
      const { data, error } = await supabase.from('blog_posts').insert(post).select().single();
      if (error) { console.error('Insert:', error); process.exit(1); }
      console.log('✅ Inserted:', data.id);
    }
  }
  console.log(`📰 https://sanluisway.com/blog/${NEW_SLUG}`);
})();
