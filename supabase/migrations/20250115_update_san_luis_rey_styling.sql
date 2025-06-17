-- Migration: Update San Luis Rey Tranvía blog post with enhanced styling
-- Created: 2025-01-15

UPDATE public.blog_posts
SET content = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Información del Tour</h2>
  <ul class="list-disc pl-6">
    <li><a href="#acerca-san-luis-rey" class="text-blue-600 hover:text-blue-800">Acerca de San Luis Rey</a></li>
    <li><a href="#experiencia-tour" class="text-blue-600 hover:text-blue-800">Experiencia del Tour</a></li>
    <li><a href="#horarios-precios" class="text-blue-600 hover:text-blue-800">Horarios y Precios</a></li>
    <li><a href="#ruta-tour" class="text-blue-600 hover:text-blue-800">Ruta del Tour</a></li>
    <li><a href="#como-reservar" class="text-blue-600 hover:text-blue-800">Cómo Reservar</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8"><strong>Descubre el centro histórico de San Luis Potosí a bordo de los tours tradicionales en tranvía de San Luis Rey. Salidas diarias, guías expertos y experiencias inolvidables a través de nuestra ciudad Patrimonio de la Humanidad de la UNESCO.</strong></p>

  <div class="bg-blue-50 p-6 rounded-lg mb-8">
    <h3 class="text-lg font-semibold mb-4 text-blue-900">Puntos Clave del Tour San Luis Rey</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Tranvía Tradicional</strong>: Experimenta la ciudad en un auténtico tranvía turístico</li>
      <li><strong>Centro Histórico UNESCO</strong>: Recorre sitios de Patrimonio de la Humanidad</li>
      <li><strong>Guías Expertos</strong>: Aprende la historia con guías especializados</li>
      <li><strong>Salidas Diarias</strong>: Tours disponibles todos los días del año</li>
    </ul>
  </div>

  <section id="acerca-san-luis-rey" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🚋 Acerca de San Luis Rey</h2>
    <p class="text-gray-700 mb-6">San Luis Rey es la forma perfecta de descubrir nuestro centro histórico. Nuestros tours en tranvía tradicional te llevan a través de los sitios más emblemáticos de San Luis Potosí, combinando comodidad, historia y diversión en una experiencia única que conecta el pasado con el presente.</p>

    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
      <p class="text-green-800 font-medium">✅ Con años de experiencia llevando visitantes por nuestra hermosa ciudad, San Luis Rey se ha establecido como la opción preferida para conocer la rica historia y arquitectura colonial de San Luis Potosí.</p>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
      <h4 class="font-semibold text-yellow-800 mb-2">🏛️ Patrimonio UNESCO:</h4>
      <p class="text-yellow-800">El centro histórico de San Luis Potosí es reconocido como Patrimonio de la Humanidad por la UNESCO, y nuestros tours te permiten experimentar esta herencia cultural de manera cómoda y educativa.</p>
    </div>
  </section>

  <section id="experiencia-tour" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🎯 Experiencia del Tour</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-blue-900">🗺️ Recorrido Histórico</h3>
        <p class="text-blue-800 mb-3">Descubre los sitios más importantes del centro histórico con narración experta</p>
        <ul class="list-disc pl-6 space-y-2 text-blue-700">
          <li>Plaza de Armas</li>
          <li>Catedral Metropolitana</li>
          <li>Palacio de Gobierno</li>
          <li>Teatro de la Paz</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-green-900">👥 Experiencia Familiar</h3>
        <p class="text-green-800 mb-3">Perfecto para toda la familia, cómodo y educativo</p>
        <ul class="list-disc pl-6 space-y-2 text-green-700">
          <li>Accesible para todas las edades</li>
          <li>Asientos cómodos</li>
          <li>Protección del clima</li>
          <li>Duración ideal para niños</li>
        </ul>
      </div>
    </div>

    <div class="space-y-6">
      <div class="bg-white border-l-4 border-blue-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-blue-900">1. Salida desde Jardín de San Juan de Dios</h3>
        <p class="text-gray-700 mb-3">Tu aventura histórica comienza en el pintoresco Jardín de San Juan de Dios, punto de partida ideal para explorar el corazón de la ciudad.</p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2 text-blue-800">📍 Punto de Encuentro:</h4>
          <ul class="list-disc pl-6 text-blue-700">
            <li>Ubicación central y accesible</li>
            <li>Estacionamiento disponible cerca</li>
            <li>Fácil llegada en transporte público</li>
          </ul>
        </div>
      </div>

      <div class="bg-white border-l-4 border-green-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-green-900">2. Recorrido por Sitios Emblemáticos</h3>
        <p class="text-gray-700 mb-3">Durante el tour, visitarás los monumentos y edificios más representativos de nuestra rica herencia colonial.</p>
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2 text-green-800">🏛️ Paradas Principales:</h4>
          <ul class="list-disc pl-6 text-green-700">
            <li>Catedral Metropolitana</li>
            <li>Palacio de Gobierno</li>
            <li>Teatro de la Paz</li>
            <li>Mercado República</li>
          </ul>
        </div>
      </div>

      <div class="bg-white border-l-4 border-yellow-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-yellow-900">3. Narración Histórica Experta</h3>
        <p class="text-gray-700 mb-3">Nuestros guías especializados compartirán las fascinantes historias y leyendas de cada sitio que visites.</p>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2 text-yellow-800">📚 Aprenderás Sobre:</h4>
          <ul class="list-disc pl-6 text-yellow-700">
            <li>Historia colonial de San Luis Potosí</li>
            <li>Arquitectura y arte histórico</li>
            <li>Personajes importantes</li>
            <li>Tradiciones y cultura local</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="horarios-precios" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">⏰ Horarios y Precios</h2>

    <div class="overflow-x-auto mb-8">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Horario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Días</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duración</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Precio</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">10:00 AM</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lunes a Domingo</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 minutos</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$80 MXN</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">12:00 PM</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lunes a Domingo</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 minutos</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$80 MXN</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4:00 PM</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lunes a Domingo</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 minutos</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$80 MXN</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6:00 PM</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Viernes a Domingo</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 minutos</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$80 MXN</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-blue-900">💰 Precios Especiales</h3>
        <ul class="text-sm text-blue-700 space-y-1">
          <li>• Niños menores de 3 años: Gratis</li>
          <li>• Estudiantes con credencial: $60 MXN</li>
          <li>• Grupos de 10+: Descuento del 15%</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-green-900">🎟️ Incluye</h3>
        <ul class="text-sm text-green-700 space-y-1">
          <li>• Tour guiado de 45 minutos</li>
          <li>• Narración histórica profesional</li>
          <li>• Recorrido por sitios principales</li>
        </ul>
      </div>

      <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-yellow-900">📅 Disponibilidad</h3>
        <ul class="text-sm text-yellow-700 space-y-1">
          <li>• Todos los días del año</li>
          <li>• Sin necesidad de reservación</li>
          <li>• Sujeto a condiciones climáticas</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="ruta-tour" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🗺️ Ruta del Tour</h2>

    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h4 class="font-semibold mb-3 text-blue-900">📍 Recorrido Completo por el Centro Histórico</h4>
      <p class="text-blue-800 mb-4">Nuestro tranvía te llevará por un circuito cuidadosamente diseñado que incluye los principales atractivos históricos y culturales de San Luis Potosí.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-medium text-blue-800 mb-2">Paradas Principales:</h5>
          <ul class="list-disc pl-6 text-blue-700 space-y-1">
            <li>Jardín de San Juan de Dios (Salida)</li>
            <li>Plaza de Armas</li>
            <li>Catedral Metropolitana</li>
            <li>Palacio de Gobierno</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-blue-800 mb-2">Sitios de Interés:</h5>
          <ul class="list-disc pl-6 text-blue-700 space-y-1">
            <li>Teatro de la Paz</li>
            <li>Mercado República</li>
            <li>Templo del Carmen</li>
            <li>Zona de museos</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="certificaciones" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🏆 Calidad y Reconocimiento</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🏛️ Secretaría de Turismo</h3>
        <p class="text-gray-700">Reconocimiento oficial del Ministerio de Turismo de México por nuestros servicios de calidad.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🌟 Distintivo M</h3>
        <p class="text-gray-700">Certificación de calidad y excelencia en el servicio turístico reconocida nacionalmente.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🏛️ Ciudad Patrimonio</h3>
        <p class="text-gray-700">Proveedor de servicios aprobado por el sitio Patrimonio de la Humanidad UNESCO.</p>
      </div>
    </div>
  </section>

  <section id="como-reservar" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🎫 Comienza Tu Viaje</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🚋 Cómo Reservar</h3>
        <p class="text-gray-700 mb-4">¡No se requiere reservación previa! Simplemente visita nuestra estación principal en el Jardín de San Juan de Dios y compra tus boletos directamente en el tranvía.</p>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-green-800 text-sm">Nuestro amable personal estará encantado de asistirte y responder cualquier pregunta que tengas.</p>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">📞 Información de Contacto</h3>
        <p class="text-gray-700 mb-4">Para más información sobre nuestros tours o tarifas especiales para grupos, contáctanos a través de nuestro sitio web o visítanos en el Jardín de San Juan de Dios.</p>
        <div class="space-y-2 text-gray-700">
          <p><strong>Ubicación:</strong> Jardín de San Juan de Dios</p>
          <p><strong>Horario de Atención:</strong> 9:30 AM - 6:30 PM</p>
        </div>
      </div>
    </div>

    <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
      <h3 class="text-lg font-semibold mb-3 text-green-900">🏛️ ¿Planeas Visitar Más Sitios Históricos?</h3>
      <p class="text-green-800 mb-3"><strong>Nuestros tours son el punto de partida perfecto para explorar todo lo que el centro histórico de San Luis Potosí tiene para ofrecer.</strong></p>
      <p class="text-green-800"><a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Obtener Información de Tours →</a></p>
    </div>
  </section>

  <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
    <h3 class="text-lg font-semibold mb-3 text-blue-900">🔗 Recursos Adicionales</h3>
    <ul class="list-disc pl-6 text-blue-800 space-y-2">
      <li><a href="/category/tours" class="text-blue-600 hover:text-blue-800 underline">Más tours en San Luis Potosí</a></li>
      <li><a href="/cultural" class="text-blue-600 hover:text-blue-800 underline">Experiencias culturales</a></li>
      <li><a href="/guides" class="text-blue-600 hover:text-blue-800 underline">Guías turísticas de la ciudad</a></li>
      <li><a href="/cultural/history" class="text-blue-600 hover:text-blue-800 underline">Historia de San Luis Potosí</a></li>
    </ul>
  </div>
</div>
$BODY$
WHERE slug = 'san-luis-rey-tranvia';