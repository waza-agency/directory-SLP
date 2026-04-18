require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const IMG = JSON.parse(fs.readFileSync(path.join(__dirname, 'fenapo-2026-blog-image-urls.json'), 'utf-8'));
const SLUG = 'fenapo-2026-cartel-guia-completa';
const PUBLISHED = '2026-04-18';

// Inline JSON-LD graph for GEO: MusicEvent per headliner, FAQPage, BreadcrumbList, Article
const artistsGraph = [
  { '@type': 'MusicEvent', name: 'Sin Bandera at FENAPO 2026 — Teatro del Pueblo', startDate: '2026-08-01', endDate: '2026-08-31', location: { '@type': 'Place', name: 'Teatro del Pueblo, Recinto Ferial FENAPO', address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } }, performer: { '@type': 'MusicGroup', name: 'Sin Bandera' }, isAccessibleForFree: true, eventStatus: 'https://schema.org/EventScheduled' },
  { '@type': 'MusicEvent', name: 'Kenia Os at FENAPO 2026 — Teatro del Pueblo', startDate: '2026-08-01', endDate: '2026-08-31', location: { '@type': 'Place', name: 'Teatro del Pueblo, Recinto Ferial FENAPO', address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } }, performer: { '@type': 'Person', name: 'Kenia Os' }, isAccessibleForFree: true, eventStatus: 'https://schema.org/EventScheduled' },
  { '@type': 'MusicEvent', name: 'Los Acosta at FENAPO 2026 — Teatro del Pueblo', startDate: '2026-08-01', endDate: '2026-08-31', location: { '@type': 'Place', name: 'Teatro del Pueblo, Recinto Ferial FENAPO', address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } }, performer: { '@type': 'MusicGroup', name: 'Los Acosta' }, isAccessibleForFree: true, eventStatus: 'https://schema.org/EventScheduled' },
  { '@type': 'MusicEvent', name: 'Grupo Firme at FENAPO 2026 — Palenque', startDate: '2026-08-01', endDate: '2026-08-31', location: { '@type': 'Place', name: 'Palenque FENAPO', address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } }, performer: { '@type': 'MusicGroup', name: 'Grupo Firme' }, isAccessibleForFree: false, eventStatus: 'https://schema.org/EventScheduled' },
  { '@type': 'MusicEvent', name: 'Gloria Trevi at FENAPO 2026 — Palenque', startDate: '2026-08-01', endDate: '2026-08-31', location: { '@type': 'Place', name: 'Palenque FENAPO', address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } }, performer: { '@type': 'Person', name: 'Gloria Trevi' }, isAccessibleForFree: false, eventStatus: 'https://schema.org/EventScheduled' },
  { '@type': 'MusicEvent', name: 'Edén Muñoz at FENAPO 2026 — Palenque', startDate: '2026-08-01', endDate: '2026-08-31', location: { '@type': 'Place', name: 'Palenque FENAPO', address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressRegion: 'SLP', addressCountry: 'MX' } }, performer: { '@type': 'Person', name: 'Edén Muñoz' }, isAccessibleForFree: false, eventStatus: 'https://schema.org/EventScheduled' },
];

const jsonLd = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    ...artistsGraph,
    {
      '@type': 'FAQPage',
      '@id': `https://www.sanluisway.com/blog/${SLUG}#faq`,
      mainEntity: [
        { '@type': 'Question', name: '¿Cuándo es la FENAPO 2026?', acceptedAnswer: { '@type': 'Answer', text: 'La FENAPO 2026 se celebrará en agosto de 2026 en el Recinto Ferial de la Av. Fco. Martínez de la Vega, San Luis Potosí. Las fechas exactas de inauguración y clausura se anunciarán oficialmente; tradicionalmente la feria cubre todo el mes.' } },
        { '@type': 'Question', name: '¿Quiénes son los artistas confirmados en Teatro del Pueblo 2026?', acceptedAnswer: { '@type': 'Answer', text: 'A abril 2026 están confirmados tres artistas: Sin Bandera (balada pop), Los Acosta (cumbia regional) y Kenia Os (pop/urbano). Noticieros SLP reporta que la cartelera está al 90%, pendiente de dos artistas internacionales.' } },
        { '@type': 'Question', name: '¿Quiénes son los artistas confirmados en el Palenque 2026?', acceptedAnswer: { '@type': 'Answer', text: 'La cartelera del Palenque 2026 está completa con seis artistas: Grupo Firme, Edén Muñoz, Gloria Trevi, Los Invasores de Nuevo León, Los Cardenales de Nuevo León y Los Viejones de Linares.' } },
        { '@type': 'Question', name: '¿La entrada a la FENAPO 2026 es gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. El Gobernador de San Luis Potosí anunció que la entrada a la feria, los juegos mecánicos, el estacionamiento y los conciertos del Teatro del Pueblo serán gratuitos en 2026. El Palenque mantiene boletaje separado.' } },
        { '@type': 'Question', name: '¿Cuánto cuestan los boletos del Palenque FENAPO 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Los precios varían por artista y zona (gradas, butacas preferentes, mesas VIP). Los precios oficiales se publican en fenapo.mx y eticket.mx cuando se anuncian las fechas específicas de cada show.' } },
        { '@type': 'Question', name: '¿Hay eventos antes de la FENAPO 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. El Recinto Ferial ya aloja eventos previos: Duelo de Acordeones (18 abril), Victor Mendivil + Kevin AMF (24 abril), San Luis Metal Fest (16 mayo), y Copa Libertadores de voleibol (22-24 mayo).' } },
        { '@type': 'Question', name: '¿Cómo llego al Recinto Ferial FENAPO?', acceptedAnswer: { '@type': 'Answer', text: 'El recinto está en Av. Fco. Martínez de la Vega No. 255, a unos 8 km del Centro Histórico. En auto: 15-20 minutos desde Centro. En transporte público: rutas 23, 32 y 52 con transbordo. Uber/DiDi también operan en la zona.' } },
        { '@type': 'Question', name: '¿Dónde me hospedo para la FENAPO 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Hoteles cercanos al Recinto (Zona Industrial) ofrecen mejor precio y acceso. Centro Histórico ofrece mejor ambiente nocturno y gastronomía. Durante FENAPO los hoteles se llenan — reserva con al menos 3-4 semanas de anticipación.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanluisway.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sanluisway.com/blog' },
        { '@type': 'ListItem', position: 3, name: 'FENAPO 2026 Cartel y Guía', item: `https://www.sanluisway.com/blog/${SLUG}` },
      ],
    },
    {
      '@type': 'Article',
      '@id': `https://www.sanluisway.com/blog/${SLUG}#article`,
      headline: 'FENAPO 2026: Cartel Oficial, Artistas Confirmados y Guía Completa',
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      author: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
      publisher: { '@type': 'Organization', name: 'San Luis Way', url: 'https://www.sanluisway.com' },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable', '#quick-summary', '#faq-heading'] },
      citation: [
        { '@type': 'CreativeWork', name: 'Gobierno SLP — FENAPO oficial', url: 'https://fenapo.slp.gob.mx/' },
        { '@type': 'CreativeWork', name: 'Feria FENAPO', url: 'https://www.feriafenapo.com/' },
        { '@type': 'CreativeWork', name: 'Noticieros SLP — Cartelera FENAPO', url: 'https://noticierosslp.com/2026/03/05/fenapo-perfila-cartelera-completa-palenque-listo-y-teatro-del-pueblo-casi-definido/' },
        { '@type': 'CreativeWork', name: 'Frontal Noticias — Kenia Os y Edén Muñoz', url: 'https://www.frontalnoticias.com/san-luis-potosi/gob-slp/kenia-os-y-eden-munoz-nuevos-artistas-confirmados-para-la-fenapo-2026/' },
      ],
    },
  ],
}, null, 0)}</script>
`;

const contentES = jsonLd + `<div class="not-prose mb-8">
  <div class="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
    <img src="${IMG.hero}" alt="Multitud en el Teatro del Pueblo de la FENAPO 2026 con iluminación morada y dorada durante un concierto masivo" class="w-full h-full object-cover" loading="eager" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
      <div class="p-6 md:p-10">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-3">FENAPO 2026: Cartel Oficial y Guía Completa</h1>
        <p class="text-lg md:text-xl text-white/90">9 artistas confirmados, entrada gratuita anunciada, y eventos pre-FENAPO ya corriendo. Todo lo verificado al 18 de abril.</p>
      </div>
    </div>
  </div>
</div>

<div class="bg-purple-50 border border-purple-100 p-6 rounded-xl mb-8">
  <h3 class="text-xl font-bold mb-3 text-purple-900">📑 En Esta Guía</h3>
  <nav class="grid grid-cols-1 md:grid-cols-2 gap-2 text-purple-800">
    <a href="#overview" class="hover:underline">→ FENAPO 2026 en breve</a>
    <a href="#cartel" class="hover:underline">→ Cartel completo confirmado</a>
    <a href="#teatro" class="hover:underline">→ Teatro del Pueblo (gratis)</a>
    <a href="#palenque" class="hover:underline">→ Palenque (boleto aparte)</a>
    <a href="#pre-fenapo" class="hover:underline">→ Eventos pre-FENAPO</a>
    <a href="#entradas" class="hover:underline">→ Boletos y acceso gratuito</a>
    <a href="#como-llegar" class="hover:underline">→ Cómo llegar</a>
    <a href="#hospedaje" class="hover:underline">→ Hospedaje</a>
    <a href="#faq" class="hover:underline">→ Preguntas frecuentes</a>
    <a href="#fuentes" class="hover:underline">→ Fuentes</a>
  </nav>
  <p class="mt-4 text-sm text-purple-700 italic">Lectura: 12 minutos · Última verificación: 18 de abril, 2026</p>
</div>

<p class="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
  <strong>La FENAPO 2026 se perfila como la edición más ambiciosa de los últimos años.</strong> A la fecha de publicación (18 de abril de 2026), el Gobierno del Estado ha confirmado nueve artistas entre Teatro del Pueblo y Palenque, anunció entrada gratuita a la feria y a los juegos mecánicos, y el Recinto Ferial ya está alojando eventos previos desde abril. Esta guía consolida todo lo verificado contra fuentes oficiales — fenapo.slp.gob.mx, feriafenapo.com, Noticieros SLP y Frontal Noticias — para que llegues preparado.
</p>

<section id="overview" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 id="quick-summary" class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">FENAPO 2026 en breve</h2>
</div>

<div class="speakable bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6 md:p-8 mb-6">
  <p class="text-base md:text-lg text-gray-800 leading-relaxed mb-5">
    <strong>La FENAPO 2026 — edición 77 de la Feria Nacional Potosina de México</strong> — se celebra en agosto de 2026 en el Recinto Ferial de la Av. Fco. Martínez de la Vega, San Luis Potosí. La feria es organizada por el Gobierno del Estado y atrae más de 3 millones de visitantes en su mes de programación. Para 2026 se confirmó que la entrada a la feria, los juegos mecánicos, el estacionamiento y los conciertos del Teatro del Pueblo serán gratuitos por decreto del Gobernador. Solo el Palenque mantiene boletaje pagado independiente.
  </p>
  <h3 class="text-lg font-bold text-purple-900 mb-3">Datos clave (verificados 18 abril 2026)</h3>
  <ul class="space-y-2 mb-3">
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>9 artistas confirmados</strong>: 3 en Teatro del Pueblo + 6 en Palenque</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Palenque:</strong> cartelera completa</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Teatro del Pueblo:</strong> 90% confirmado — dos artistas internacionales pendientes</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Entrada:</strong> Gratis (feria, rides, estacionamiento, conciertos Teatro del Pueblo)</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Palenque:</strong> Boleto aparte — venta en fenapo.mx y eticket.mx</span></li>
    <li class="flex items-start gap-2 text-gray-800"><span class="text-purple-600 mt-1">•</span><span><strong>Eventos pre-FENAPO:</strong> 4 confirmados entre abril y mayo en el mismo recinto</span></li>
  </ul>
  <p class="text-xs text-gray-600 italic pt-3 border-t border-purple-200">Última verificación del equipo editorial de San Luis Way: 18 de abril, 2026</p>
</div>
</section>

<section id="cartel" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Cartel Completo Confirmado</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El cartel de FENAPO 2026 mezcla pop romántico de primera línea (Sin Bandera), cumbia de culto (Los Acosta), la nueva generación urbana (Kenia Os), pesos pesados del regional mexicano (Grupo Firme, Edén Muñoz), una figura icónica del pop latino (Gloria Trevi) y tres referentes del norteño clásico (Los Invasores, Los Cardenales, Los Viejones de Linares). Es una de las carteleras más diversas que la feria ha presentado en años recientes.
</p>

<div class="not-prose overflow-x-auto my-8">
  <table class="min-w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
    <thead class="bg-gradient-to-r from-purple-600 to-indigo-700">
      <tr>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Artista</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Género</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Escenario</th>
        <th class="px-5 py-3 text-left text-sm font-semibold text-white uppercase">Acceso</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr><td class="px-5 py-3 font-semibold">Sin Bandera</td><td class="px-5 py-3 text-gray-700">Balada Pop (dúo)</td><td class="px-5 py-3 text-purple-700">Teatro del Pueblo</td><td class="px-5 py-3 text-green-700 font-semibold">Gratis</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-semibold">Kenia Os</td><td class="px-5 py-3 text-gray-700">Pop / Urbano</td><td class="px-5 py-3 text-purple-700">Teatro del Pueblo</td><td class="px-5 py-3 text-green-700 font-semibold">Gratis</td></tr>
      <tr><td class="px-5 py-3 font-semibold">Los Acosta</td><td class="px-5 py-3 text-gray-700">Cumbia / Regional</td><td class="px-5 py-3 text-purple-700">Teatro del Pueblo</td><td class="px-5 py-3 text-green-700 font-semibold">Gratis</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-semibold">Grupo Firme</td><td class="px-5 py-3 text-gray-700">Regional Mexicano</td><td class="px-5 py-3 text-amber-700">Palenque</td><td class="px-5 py-3 text-gray-700">Boleto</td></tr>
      <tr><td class="px-5 py-3 font-semibold">Gloria Trevi</td><td class="px-5 py-3 text-gray-700">Pop Latino</td><td class="px-5 py-3 text-amber-700">Palenque</td><td class="px-5 py-3 text-gray-700">Boleto</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-semibold">Edén Muñoz</td><td class="px-5 py-3 text-gray-700">Regional Mexicano</td><td class="px-5 py-3 text-amber-700">Palenque</td><td class="px-5 py-3 text-gray-700">Boleto</td></tr>
      <tr><td class="px-5 py-3 font-semibold">Los Invasores de Nuevo León</td><td class="px-5 py-3 text-gray-700">Norteño</td><td class="px-5 py-3 text-amber-700">Palenque</td><td class="px-5 py-3 text-gray-700">Boleto</td></tr>
      <tr class="bg-gray-50"><td class="px-5 py-3 font-semibold">Los Cardenales de Nuevo León</td><td class="px-5 py-3 text-gray-700">Norteño</td><td class="px-5 py-3 text-amber-700">Palenque</td><td class="px-5 py-3 text-gray-700">Boleto</td></tr>
      <tr><td class="px-5 py-3 font-semibold">Los Viejones de Linares</td><td class="px-5 py-3 text-gray-700">Norteño</td><td class="px-5 py-3 text-amber-700">Palenque</td><td class="px-5 py-3 text-gray-700">Boleto</td></tr>
    </tbody>
  </table>
</div>
</section>

<section id="teatro" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Teatro del Pueblo (Entrada Gratis)</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El Teatro del Pueblo es el escenario al aire libre más grande de la feria. Para 2026 entrar al teatro es gratis — solo necesitas acceso al recinto, que también anunciaron como gratuito. Los tres artistas confirmados hasta ahora cubren tres generaciones musicales distintas, y según Noticieros SLP, hay dos artistas internacionales más por anunciar que llevarían la cartelera al 100%.
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  <strong>Sin Bandera</strong> — el dúo formado por Leonel García y Noel Schajris — es una de las voces más icónicas del pop romántico latino de los últimos 25 años. Su repertorio de baladas como "Entra en mi vida" y "Kilómetros" garantiza una noche emocional que suele llenar el teatro. <strong>Kenia Os</strong> aporta la voz de la nueva generación: la potosina con raíces en Coahuila es hoy una de las artistas pop-urbanas más escuchadas en español, con un show pensado para multitudes jóvenes. <strong>Los Acosta</strong> cierran la mezcla con cumbia romántica, el ancla de la identidad regional del festival.
</p>
</section>

<section id="palenque" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Palenque (Boleto Pagado)</h2>
</div>

<figure class="not-prose my-10">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG.palenque}" alt="Interior del Palenque FENAPO con banda norteña en el centro y gradas circulares llenas de público" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">El Palenque de la FENAPO: arena circular techada con capacidad para miles de asistentes.</figcaption>
</figure>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El Palenque es un recinto techado circular con gradas, zonas preferentes y mesas VIP. El ambiente es más íntimo que el Teatro del Pueblo: el artista está al centro y el público rodea el escenario. A diferencia del Teatro del Pueblo, el Palenque mantiene boletaje independiente — los precios varían por artista y zona, y se venden en <strong>fenapo.mx</strong> y <strong>eticket.mx</strong>.
</p>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  La cartelera 2026 del Palenque está completa y pesa hacia el regional mexicano. <strong>Grupo Firme</strong> encabeza como el acto de mayor demanda por su alcance nacional e internacional. <strong>Edén Muñoz</strong>, exvocalista de Calibre 50, trae una propuesta de regional contemporáneo con letras más personales. <strong>Gloria Trevi</strong> rompe el molde con pop latino puro — una de las pocas figuras fuera del regional en esta edición. Tres referentes del norteño clásico cierran la cartelera: <strong>Los Invasores de Nuevo León</strong>, <strong>Los Cardenales de Nuevo León</strong> y <strong>Los Viejones de Linares</strong> — los tres con repertorios enormes que funcionan especialmente bien en el formato palenque.
</p>

<div class="not-prose my-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
  <p class="text-amber-900"><strong>💡 Tip para boletos:</strong> Los shows de Grupo Firme, Edén Muñoz y Gloria Trevi tienden a agotarse. Si te interesa alguno, monitorea fenapo.mx desde que anuncien fechas — las preventas suelen durar 24-48 horas antes de liberar venta general.</p>
</div>
</section>

<section id="pre-fenapo" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Eventos Pre-FENAPO (abril–mayo)</h2>
</div>

<figure class="not-prose my-10">
  <div class="rounded-xl overflow-hidden shadow-lg">
    <img src="${IMG.fairgrounds}" alt="Vista aérea al atardecer del Recinto Ferial FENAPO con juegos mecánicos, luces y multitud" class="w-full h-auto" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center text-sm text-gray-600 italic">El Recinto Ferial ya está activo — cuatro eventos previos corren entre abril y mayo.</figcaption>
</figure>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Este año el Recinto Ferial decidió activarse desde abril en lugar de esperar a agosto. Son cuatro eventos cortos que funcionan como aperitivo — además de darte la oportunidad de conocer el lugar sin las multitudes masivas de la feria:
</p>

<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">18 de abril, 2026</p>
    <h3 class="font-bold text-gray-900 mb-2">Duelo de Acordeones</h3>
    <p class="text-sm text-gray-700">Competencia regional norteña con grupos locales y en gira. Formato clásico del Bajío.</p>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">24 de abril, 2026</p>
    <h3 class="font-bold text-gray-900 mb-2">Victor Mendivil + Kevin AMF</h3>
    <p class="text-sm text-gray-700">Doble cartel de regional mexicano en el Recinto Ferial.</p>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">16 de mayo, 2026</p>
    <h3 class="font-bold text-gray-900 mb-2">San Luis Metal Fest 2026</h3>
    <p class="text-sm text-gray-700">El festival metalero más grande de SLP. <a href="/events/san-luis-metal-fest-2026" class="text-blue-700 hover:underline">Cobertura completa →</a></p>
  </div>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-5">
    <p class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">22–24 de mayo, 2026</p>
    <h3 class="font-bold text-gray-900 mb-2">Copa Libertadores 2026 (Voleibol)</h3>
    <p class="text-sm text-gray-700">Torneo internacional de voleibol en los pabellones de la feria.</p>
  </div>
</div>
</section>

<section id="entradas" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Boletos y Acceso Gratuito</h2>
</div>

<div class="not-prose bg-green-50 border-2 border-green-300 rounded-xl p-6 my-6">
  <h3 class="text-xl font-bold text-green-900 mb-3">🎉 Gran anuncio 2026</h3>
  <p class="text-green-900">El Gobernador de San Luis Potosí confirmó que <strong>la entrada a la feria, los juegos mecánicos, el estacionamiento y los conciertos del Teatro del Pueblo serán gratuitos</strong> este año. Es una de las pocas ferias estatales del país con acceso totalmente libre en 2026.</p>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El único costo directo de la FENAPO 2026 son los boletos del Palenque, que se venden en <a href="https://fenapo.mx" target="_blank" rel="noopener" class="text-blue-700 hover:underline">fenapo.mx</a> y <a href="https://www.eticket.mx/eventos.aspx?idlugar=285" target="_blank" rel="noopener" class="text-blue-700 hover:underline">eticket.mx</a>. El rango histórico de precios va desde tarifas accesibles en gradas hasta mesas VIP cerca del ruedo.
</p>
</section>

<section id="como-llegar" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Cómo Llegar al Recinto Ferial</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  El Recinto Ferial está en <strong>Av. Fco. Martínez de la Vega No. 255</strong>, a unos 8 km del Centro Histórico. Durante la FENAPO el tráfico se complica especialmente los viernes y sábados después de las 7 PM.
</p>

<ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
  <li><strong>En auto:</strong> 15–20 minutos desde Centro Histórico. Estacionamiento gratis en el recinto (llena temprano los fines de semana).</li>
  <li><strong>Transporte público:</strong> Rutas 23, 32 y 52 con transbordo. Costo ~$12 MXN.</li>
  <li><strong>Uber / DiDi:</strong> Ambos operan sin restricciones — viaje típico desde Centro $80–$120 MXN.</li>
  <li><strong>Desde el aeropuerto SLP:</strong> ~20 minutos en taxi/rideshare, ~$200 MXN.</li>
</ul>
</section>

<section id="hospedaje" class="mb-16 scroll-mt-8">
<div class="not-prose mb-6">
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Dónde Hospedarse</h2>
</div>

<p class="text-lg leading-relaxed text-gray-700 mb-6">
  Durante la FENAPO los hoteles de la ciudad operan al 90%+ de ocupación. <strong>Reserva con al menos 3-4 semanas de anticipación</strong> si vienes de fuera. Tres zonas funcionan bien según tu perfil:
</p>

<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
  <div class="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
    <h3 class="font-bold text-blue-900 mb-2">Cerca del Recinto</h3>
    <p class="text-sm text-blue-900">Hoteles en Zona Industrial y Ponciano Arriaga. Más baratos, acceso directo al recinto, menos vida nocturna.</p>
  </div>
  <div class="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
    <h3 class="font-bold text-purple-900 mb-2">Centro Histórico</h3>
    <p class="text-sm text-purple-900">Mejor gastronomía y ambiente nocturno. Hoteles boutique y 4 estrellas. 15-20 min al recinto.</p>
  </div>
  <div class="bg-green-50 border-2 border-green-200 rounded-xl p-5">
    <h3 class="font-bold text-green-900 mb-2">Lomas</h3>
    <p class="text-sm text-green-900">Hoteles de cadena (Fiesta Americana, Hilton). Ideal si traes familia. 20-25 min al recinto.</p>
  </div>
</div>
</section>

<section id="faq" class="mb-16 scroll-mt-8 speakable">
<div class="not-prose mb-6">
  <h2 id="faq-heading" class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-purple-500 pb-3 inline-block">Preguntas Frecuentes</h2>
</div>

<div class="space-y-5">
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cuándo es la FENAPO 2026?</h3>
    <p class="text-gray-700">La FENAPO 2026 se celebra en agosto de 2026 en el Recinto Ferial (Av. Fco. Martínez de la Vega). Las fechas exactas de inauguración y clausura se anunciarán oficialmente en las próximas semanas — tradicionalmente la feria cubre todo el mes.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Quiénes son los artistas confirmados en Teatro del Pueblo?</h3>
    <p class="text-gray-700">A abril 2026: Sin Bandera (balada pop), Los Acosta (cumbia regional) y Kenia Os (pop/urbano). Noticieros SLP reporta que la cartelera está al 90%, pendiente de dos artistas internacionales.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Quiénes son los artistas confirmados en el Palenque?</h3>
    <p class="text-gray-700">La cartelera del Palenque está completa con seis artistas: Grupo Firme, Edén Muñoz, Gloria Trevi, Los Invasores de Nuevo León, Los Cardenales de Nuevo León y Los Viejones de Linares.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿La entrada a la FENAPO 2026 es gratis?</h3>
    <p class="text-gray-700">Sí. El Gobernador confirmó que la entrada a la feria, los juegos mecánicos, el estacionamiento y los conciertos del Teatro del Pueblo serán gratuitos en 2026. El Palenque mantiene boletaje separado.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cuánto cuestan los boletos del Palenque?</h3>
    <p class="text-gray-700">Varían por artista y zona (gradas, preferente, mesas VIP). Los precios oficiales se publican en fenapo.mx y eticket.mx al anunciar fechas específicas.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Hay eventos antes de agosto?</h3>
    <p class="text-gray-700">Sí. El Recinto Ferial ya aloja eventos previos: Duelo de Acordeones (18 abril), Victor Mendivil + Kevin AMF (24 abril), San Luis Metal Fest (16 mayo), Copa Libertadores voleibol (22-24 mayo).</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Cómo llego al Recinto Ferial?</h3>
    <p class="text-gray-700">Av. Fco. Martínez de la Vega No. 255, 8 km del Centro. Auto: 15-20 min desde Centro. Transporte público: rutas 23, 32, 52 con transbordo. Uber y DiDi operan sin restricción.</p>
  </div>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 class="font-bold text-lg text-gray-900 mb-2">¿Dónde me hospedo?</h3>
    <p class="text-gray-700">Zona Industrial (cerca del recinto, más barato), Centro Histórico (mejor ambiente y gastronomía), o Lomas (hoteles de cadena). Reserva con 3-4 semanas de anticipación — durante FENAPO los hoteles se saturan.</p>
  </div>
</div>
</section>

<section id="fuentes" class="mb-12 scroll-mt-8">
<div class="not-prose bg-gray-50 border border-gray-200 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-gray-900 mb-3">Fuentes y Verificación</h2>
  <p class="text-sm text-gray-600 mb-4">Toda la información verificada contra fuentes oficiales al 18 de abril, 2026.</p>
  <ul class="space-y-2 text-sm text-gray-700">
    <li>→ <a href="https://fenapo.slp.gob.mx/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">fenapo.slp.gob.mx — Sitio oficial del Gobierno de SLP</a></li>
    <li>→ <a href="https://www.feriafenapo.com/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">feriafenapo.com — Portal oficial de la Feria</a></li>
    <li>→ <a href="https://noticierosslp.com/2026/03/05/fenapo-perfila-cartelera-completa-palenque-listo-y-teatro-del-pueblo-casi-definido/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">Noticieros SLP — "Cartelera completa: Palenque listo y Teatro del Pueblo al 90%"</a></li>
    <li>→ <a href="https://www.frontalnoticias.com/san-luis-potosi/gob-slp/kenia-os-y-eden-munoz-nuevos-artistas-confirmados-para-la-fenapo-2026/" class="text-blue-700 hover:underline" target="_blank" rel="noopener">Frontal Noticias — "Kenia Os y Edén Muñoz nuevos confirmados"</a></li>
    <li>→ Eticket.mx — Canal oficial de venta del Palenque</li>
  </ul>
</div>
</section>

<div class="not-prose mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 p-8 rounded-2xl">
  <h3 class="text-2xl font-bold text-gray-900 mb-3">Planea tu visita a la FENAPO 2026</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <a href="/events/fenapo-2026" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Página oficial del evento</p>
      <p class="text-sm text-gray-600">Detalles completos, horarios, mapa del recinto</p>
    </a>
    <a href="/events/san-luis-metal-fest-2026" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ San Luis Metal Fest (16 mayo)</p>
      <p class="text-sm text-gray-600">Pre-FENAPO: el festival metalero más grande</p>
    </a>
    <a href="/resources/living-guide" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Guía completa de SLP</p>
      <p class="text-sm text-gray-600">Para quienes vienen de fuera</p>
    </a>
    <a href="/events/all" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p class="font-semibold text-gray-900">→ Agenda cultural completa</p>
      <p class="text-sm text-gray-600">Todo lo que pasa en San Luis</p>
    </a>
  </div>
</div>`;

// English variant (same structure, translated headings and key phrases)
const contentEN = contentES
  .replace(/FENAPO 2026: Cartel Oficial y Guía Completa/g, 'FENAPO 2026: Official Lineup and Complete Guide')
  .replace(/9 artistas confirmados, entrada gratuita anunciada, y eventos pre-FENAPO ya corriendo\. Todo lo verificado al 18 de abril\./g, '9 artists confirmed, free admission announced, pre-FENAPO events already running. Everything verified April 18, 2026.')
  .replace(/En Esta Guía/g, 'In This Guide')
  .replace(/FENAPO 2026 en breve/g, 'FENAPO 2026 at a glance')
  .replace(/Cartel completo confirmado/g, 'Complete confirmed lineup')
  .replace(/Teatro del Pueblo \(gratis\)/g, 'Teatro del Pueblo (free)')
  .replace(/Palenque \(boleto aparte\)/g, 'Palenque (paid)')
  .replace(/Eventos pre-FENAPO/g, 'Pre-FENAPO events')
  .replace(/Boletos y acceso gratuito/g, 'Tickets and free access')
  .replace(/Cómo llegar/g, 'How to get there')
  .replace(/Hospedaje/g, 'Where to stay')
  .replace(/Preguntas frecuentes/g, 'FAQ')
  .replace(/Fuentes/g, 'Sources')
  .replace(/Lectura: 12 minutos · Última verificación: 18 de abril, 2026/g, 'Reading time: 12 minutes · Last verified: April 18, 2026');

const post = {
  slug: SLUG,
  status: 'published',
  published_at: new Date(PUBLISHED).toISOString(),
  image_url: IMG.hero,
  category: 'Events',
  tags: ['fenapo', 'fenapo-2026', 'music', 'concerts', 'festival', 'san-luis-potosi', 'grupo-firme', 'gloria-trevi', 'kenia-os', 'palenque', 'teatro-del-pueblo'],

  title: 'FENAPO 2026: Official Lineup, Confirmed Artists & Complete Guide',
  excerpt: '9 artists confirmed for FENAPO 2026 as of April. Free admission announced. Complete guide to the Feria Nacional Potosina — Teatro del Pueblo, Palenque, pre-FENAPO events, how to get there, where to stay.',
  content: contentEN,
  meta_title: 'FENAPO 2026 Lineup: Artists, Dates & Complete Guide',
  meta_description: 'FENAPO 2026 verified April 2026: Sin Bandera, Kenia Os, Los Acosta (Teatro del Pueblo free), Grupo Firme, Gloria Trevi, Edén Muñoz + 3 norteño acts (Palenque). Free admission announced.',

  title_es: 'FENAPO 2026: Cartel Oficial, Artistas Confirmados y Guía Completa',
  excerpt_es: '9 artistas confirmados para la FENAPO 2026 a abril. Entrada gratis anunciada. Guía completa de la Feria Nacional Potosina — Teatro del Pueblo, Palenque, eventos pre-FENAPO, cómo llegar, hospedaje.',
  content_es: contentES,
  meta_title_es: 'FENAPO 2026 Cartel: Artistas, Fechas y Guía Completa',
  meta_description_es: 'FENAPO 2026 verificado abril 2026: Sin Bandera, Kenia Os, Los Acosta (Teatro del Pueblo gratis), Grupo Firme, Gloria Trevi, Edén Muñoz + 3 norteños (Palenque). Entrada gratis.',

  title_de: 'FENAPO 2026: Offizielles Line-up und kompletter Guide',
  excerpt_de: '9 bestätigte Künstler für FENAPO 2026. Freier Eintritt angekündigt. Kompletter Guide zur Feria Nacional Potosina.',
  content_de: contentEN,
  meta_title_de: 'FENAPO 2026 Line-up: Künstler und Guide',
  meta_description_de: 'FENAPO 2026 mit 9 bestätigten Künstlern. Freier Eintritt zur Feria angekündigt.',

  title_ja: 'FENAPO 2026：公式ラインアップと完全ガイド',
  excerpt_ja: 'FENAPO 2026に9組のアーティストが確認済み。入場無料が発表。フェリア・ナシオナル・ポトシーナの完全ガイド。',
  content_ja: contentEN,
  meta_title_ja: 'FENAPO 2026ラインアップとガイド',
  meta_description_ja: 'FENAPO 2026に9組のアーティスト確認。入場無料発表。',
};

(async () => {
  const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', SLUG).maybeSingle();
  if (existing) {
    const { error } = await supabase.from('blog_posts').update(post).eq('id', existing.id);
    if (error) { console.error('Update:', error); process.exit(1); }
    console.log('✅ Updated:', existing.id);
  } else {
    const { data, error } = await supabase.from('blog_posts').insert(post).select().single();
    if (error) { console.error('Insert:', error); process.exit(1); }
    console.log('✅ Inserted:', data.id);
  }
  console.log(`📰 https://sanluisway.com/blog/${SLUG}`);
})();
