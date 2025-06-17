-- Migration: Update Corazón de Xoconostle blog post with enhanced styling
-- Created: 2025-01-15

UPDATE public.blog_posts
SET content = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">En Esta Guía de Aventuras</h2>
  <ul class="list-disc pl-6">
    <li><a href="#acerca-corazon" class="text-blue-600 hover:text-blue-800">Acerca de Corazón de Xoconostle</a></li>
    <li><a href="#destinos-destacados" class="text-blue-600 hover:text-blue-800">Destinos Destacados</a></li>
    <li><a href="#experiencias-proximas" class="text-blue-600 hover:text-blue-800">Experiencias Próximas</a></li>
    <li><a href="#nuestra-experiencia" class="text-blue-600 hover:text-blue-800">Nuestra Experiencia</a></li>
    <li><a href="#como-reservar" class="text-blue-600 hover:text-blue-800">Cómo Reservar</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8"><strong>Descubre la empresa de turismo de aventura líder en San Luis Potosí, ofreciendo tours guiados, experiencias al aire libre y viajes inolvidables a través de los paisajes más impresionantes de México.</strong></p>

  <div class="bg-blue-50 p-6 rounded-lg mb-8">
    <h3 class="text-lg font-semibold mb-4 text-blue-900">Puntos Clave de Corazón de Xoconostle</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Década de Experiencia</strong>: Fundado en 2014, 10+ años especializados en turismo de aventura</li>
      <li><strong>Guías Certificados</strong>: Expertos locales con certificaciones oficiales</li>
      <li><strong>Destinos Únicos</strong>: Real de Catorce, Huasteca Potosina, Sierra de San Miguelito</li>
      <li><strong>Pasión por la Naturaleza</strong>: Escalada, senderismo y experiencias culturales auténticas</li>
    </ul>
  </div>

  <section id="acerca-corazon" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🌵 Acerca de Corazón de Xoconostle</h2>
    <p class="text-gray-700 mb-6">Fundado en 2014, Corazón de Xoconostle ha crecido de ser un proyecto local de hospitalidad hasta convertirse en la empresa de turismo de aventura líder en San Luis Potosí. Con una década de experiencia, nuestros guías certificados y expertos en viajes se especializan en crear experiencias inolvidables al aire libre que combinan aventura, cultura y belleza natural.</p>

    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
      <p class="text-green-800 font-medium">✅ Nuestra pasión por la naturaleza, actividades al aire libre como escalada y senderismo, y nuestra profunda conexión con la cultura local nos impulsa a mostrar la increíble riqueza del patrimonio natural y cultural de nuestra región.</p>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
      <h4 class="font-semibold text-yellow-800 mb-2">💡 Filosofía de Aventura:</h4>
      <p class="text-yellow-800">"No solo te mostramos lugares; te ayudamos a sentir su alma", explica uno de nuestros fundadores. Cada ruta que hemos creado contiene pedazos de nuestras propias historias, transmitidas a viajeros que buscan conectar con el espíritu auténtico de San Luis Potosí.</p>
    </div>
  </section>

  <section id="destinos-destacados" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🏔️ Destinos Destacados</h2>

    <div class="space-y-6">
      <div class="bg-white border-l-4 border-blue-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-blue-900">1. Real de Catorce</h3>
        <p class="text-gray-700 mb-3">Un pueblo mágico en la Sierra del Altiplano Potosino, famoso por sus calles empedradas y rica historia minera.</p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2 text-blue-800">🚙 Actividades Populares:</h4>
          <ul class="list-disc pl-6 text-blue-700">
            <li>Tours en 4x4 Willy</li>
            <li>Caminatas Culturales</li>
            <li>Sitios Históricos</li>
            <li>Experiencias místicas y espirituales</li>
          </ul>
        </div>
      </div>

      <div class="bg-white border-l-4 border-green-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-green-900">2. Huasteca Potosina</h3>
        <p class="text-gray-700 mb-3">Un paraíso natural con impresionantes cascadas, ríos y paisajes exuberantes que te conectan con la naturaleza pura.</p>
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2 text-green-800">💧 Actividades Populares:</h4>
          <ul class="list-disc pl-6 text-green-700">
            <li>Cascada de Tamul</li>
            <li>Rappel y descenso</li>
            <li>Actividades acuáticas</li>
            <li>Exploración de cenotes</li>
          </ul>
        </div>
      </div>

      <div class="bg-white border-l-4 border-yellow-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-yellow-900">3. Sierra de San Miguelito</h3>
        <p class="text-gray-700 mb-3">Hermosa cadena montañosa perfecta para senderismo y aventuras al aire libre, ideal para conectar con la naturaleza local.</p>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2 text-yellow-800">⛰️ Actividades Populares:</h4>
          <ul class="list-disc pl-6 text-yellow-700">
            <li>Senderismo y trekking</li>
            <li>Escalada en roca</li>
            <li>Ciclismo de montaña</li>
            <li>Observación de flora y fauna</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="experiencias-proximas" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🎯 Experiencias Próximas</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-blue-900">🌅 Tours de Día</h3>
        <p class="text-blue-800 mb-3">Perfectos para quienes buscan aventura sin comprometer tiempo</p>
        <ul class="text-sm text-blue-700 space-y-1">
          <li>• Real de Catorce Express</li>
          <li>• Sierra de San Miguelito</li>
          <li>• Experiencias culturales locales</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-green-900">🏕️ Aventuras Extendidas</h3>
        <p class="text-green-800 mb-3">Inmersión completa en la naturaleza potosina</p>
        <ul class="text-sm text-green-700 space-y-1">
          <li>• Huasteca Potosina 2-3 días</li>
          <li>• Expediciones de escalada</li>
          <li>• Campamentos de aventura</li>
        </ul>
      </div>

      <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-yellow-900">👥 Tours Personalizados</h3>
        <p class="text-yellow-800 mb-3">Diseñados según tus intereses específicos</p>
        <ul class="text-sm text-yellow-700 space-y-1">
          <li>• Grupos corporativos</li>
          <li>• Familias con niños</li>
          <li>• Aventureros extremos</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="nuestra-experiencia" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🏆 Nuestra Experiencia y Certificaciones</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">📜 Certificaciones Oficiales</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center">
            <span class="text-green-600 mr-2">✓</span>
            <span>Guías certificados NOM-09-TUR-2002</span>
          </li>
          <li class="flex items-center">
            <span class="text-green-600 mr-2">✓</span>
            <span>Certificación NOM-011-TUR-2017</span>
          </li>
          <li class="flex items-center">
            <span class="text-green-600 mr-2">✓</span>
            <span>Registro ante Secretaría de Turismo</span>
          </li>
          <li class="flex items-center">
            <span class="text-green-600 mr-2">✓</span>
            <span>Seguros de responsabilidad civil</span>
          </li>
        </ul>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🎯 Especialidades</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">🧗</span>
            <span>Escalada en roca y rappel</span>
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">🥾</span>
            <span>Senderismo y trekking</span>
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">🌊</span>
            <span>Actividades acuáticas</span>
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">🏛️</span>
            <span>Turismo cultural e histórico</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
      <blockquote class="border-l-4 border-blue-300 pl-4 italic text-gray-700">
        <p class="mb-2">"Corazón de Xoconostle no solo organiza tours; crea conexiones auténticas entre los viajeros y el alma de San Luis Potosí. Su pasión por la aventura y el respeto por la naturaleza se refleja en cada experiencia."</p>
        <cite class="text-sm text-blue-600">— Testimonio de aventurero frecuente</cite>
      </blockquote>
    </div>
  </section>

  <section id="como-reservar" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">📞 Comienza Tu Aventura</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">📍 Información de Contacto</h3>
        <p class="text-gray-700 mb-4">Visítanos en nuestra oficina en el centro histórico de San Luis Potosí o contáctanos a través de nuestros diversos canales:</p>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Dirección:</strong> Independencia 1585, Barrio de San Miguelito</li>
          <li><strong>WhatsApp:</strong> <a href="https://wa.me/524446571872" target="_blank" class="text-blue-600 hover:text-blue-800">+52 1 444 657 1872</a></li>
          <li><strong>Email:</strong> <a href="mailto:info@corazondexoconostle.com" class="text-blue-600 hover:text-blue-800">info@corazondexoconostle.com</a></li>
        </ul>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🎒 Reserva Tu Experiencia</h3>
        <p class="text-gray-700 mb-4">¿Listo para explorar? Visita nuestro sitio web o contáctanos directamente para reservar tu próxima aventura.</p>
        <div class="space-y-3">
          <p class="text-sm text-gray-600"><strong>Tours de Día:</strong> Reserva con 24 horas de anticipación</p>
          <p class="text-sm text-gray-600"><strong>Expediciones:</strong> Reserva con 1 semana de anticipación</p>
          <p class="text-sm text-gray-600"><strong>Grupos:</strong> Consulta disponibilidad para fechas específicas</p>
        </div>
      </div>
    </div>

    <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
      <h3 class="text-lg font-semibold mb-3 text-green-900">🌟 ¿Necesitas Ayuda Planificando Tu Aventura?</h3>
      <p class="text-green-800 mb-3"><strong>Nuestros expertos en turismo de aventura pueden diseñar la experiencia perfecta según tus intereses y nivel de experiencia.</strong></p>
      <p class="text-green-800"><a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Contactar Experto en Aventuras →</a></p>
    </div>
  </section>

  <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
    <h3 class="text-lg font-semibold mb-3 text-blue-900">🔗 Recursos Adicionales</h3>
    <ul class="list-disc pl-6 text-blue-800 space-y-2">
      <li><a href="/places/corazon-de-xoconostle" class="text-blue-600 hover:text-blue-800 underline">Página completa de Corazón de Xoconostle</a></li>
      <li><a href="/category/outdoors" class="text-blue-600 hover:text-blue-800 underline">Más actividades al aire libre</a></li>
      <li><a href="/weekend-getaways" class="text-blue-600 hover:text-blue-800 underline">Escapadas de fin de semana</a></li>
      <li><a href="/guides" class="text-blue-600 hover:text-blue-800 underline">Guías de turismo de aventura</a></li>
    </ul>
  </div>
</div>
$BODY$
WHERE slug = 'corazon-de-xoconostle';