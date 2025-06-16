-- Migration: Update rental guide blog post with enhanced styling
-- Created: 2025-01-15

UPDATE public.blog_posts
SET content = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Guía de Contenido</h2>
  <ul class="list-disc pl-6">
    <li><a href="#panorama-mercado" class="text-blue-600 hover:text-blue-800">Panorama del Mercado de Rentas 2025</a></li>
    <li><a href="#requisitos-rentar" class="text-blue-600 hover:text-blue-800">Requisitos para Rentar</a></li>
    <li><a href="#proceso-paso-paso" class="text-blue-600 hover:text-blue-800">Proceso Paso a Paso</a></li>
    <li><a href="#inspeccion-propiedad" class="text-blue-600 hover:text-blue-800">Lista de Verificación para Inspección</a></li>
    <li><a href="#aspectos-legales" class="text-blue-600 hover:text-blue-800">Aspectos Legales del Contrato</a></li>
    <li><a href="#estrategias-negociacion" class="text-blue-600 hover:text-blue-800">Estrategias de Negociación</a></li>
    <li><a href="#preguntas-frecuentes" class="text-blue-600 hover:text-blue-800">Preguntas Frecuentes</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8"><strong>Descubre todo lo que necesitas saber para encontrar y rentar la casa perfecta en San Luis Potosí en 2025</strong></p>

  <div class="bg-blue-50 p-6 rounded-lg mb-8">
    <h3 class="text-lg font-semibold mb-4 text-blue-900">Puntos Clave de esta Guía</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Precios actualizados 2025</strong>: Desde $463 MXN en Villa Campestre hasta $2,829 MXN en Club de Golf La Loma</li>
      <li><strong>Requisitos completos</strong>: Documentos, garantías y requisitos financieros necesarios</li>
      <li><strong>Proceso detallado</strong>: Pasos específicos desde la búsqueda hasta la firma del contrato</li>
      <li><strong>Lista de verificación</strong>: Qué revisar durante la inspección de la propiedad</li>
      <li><strong>Consejos de negociación</strong>: Estrategias para obtener mejores condiciones</li>
      <li><strong>Aspectos legales</strong>: Derechos y obligaciones en el contrato de arrendamiento</li>
    </ul>
  </div>

  <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
    <p class="text-green-800 font-medium">✅ <strong>Actualizado:</strong> 13 de enero de 2025 - San Luis Potosí se ha consolidado como una de las ciudades más atractivas para vivir en México, especialmente para expatriados y profesionales.</p>
  </div>

  <section id="panorama-mercado" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Panorama del Mercado de Rentas 2025</h2>
    <p class="text-gray-700 mb-6">San Luis Potosí se ha consolidado como una de las ciudades más atractivas para vivir en México, especialmente para expatriados y profesionales que buscan calidad de vida a precios competitivos.</p>

    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-4 text-blue-900">Precios Promedio por Zona</h3>

      <div class="overflow-x-auto mb-8">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Zona</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Precio Promedio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Características</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Villa Campestre</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$463 MXN</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Zona económica, en desarrollo</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Valle Dorado</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$669 MXN</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Residencial emergente</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alto Lago</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,440 MXN</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Zona media-alta, servicios completos</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Club de Golf La Loma</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2,829 MXN</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Zona premium, máximo lujo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p class="text-yellow-800"><strong>💡 Consejo de Experto:</strong> Los precios pueden variar significativamente según la temporada. La mejor época para encontrar ofertas es entre septiembre y noviembre.</p>
      </div>
    </div>
  </section>

  <section id="requisitos-rentar" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Requisitos para Rentar</h2>
    <p class="text-gray-700 mb-6">Conocer los requisitos con anticipación te ayudará a preparar todos los documentos necesarios y agilizar el proceso de renta.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-blue-900">📋 Documentos Básicos</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>✓ Identificación oficial vigente</li>
          <li>✓ Comprobante de ingresos (3 meses)</li>
          <li>✓ Referencias laborales</li>
          <li>✓ Comprobante de domicilio</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-green-900">💰 Requisitos Financieros</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>💵 Depósito de garantía (1-2 meses)</li>
          <li>💵 Primer mes por adelantado</li>
          <li>💵 Fiador o aval solidario</li>
          <li>💵 Ingresos mínimos 3x la renta</li>
        </ul>
      </div>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Importante para extranjeros:</h4>
      <p class="text-yellow-800">Necesitarás visa legal, comprobante de ingresos en México o carta de tu empleador, y posiblemente un fiador mexicano.</p>
    </div>
  </section>

  <section id="proceso-paso-paso" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Proceso Paso a Paso</h2>
    <p class="text-gray-700 mb-6">Sigue estos pasos ordenados para una experiencia de renta exitosa y sin complicaciones.</p>

    <div class="space-y-6">
      <div class="bg-white border-l-4 border-blue-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-blue-900">1. Investigación y Búsqueda</h3>
        <p class="text-gray-700 mb-3">Define tu presupuesto, ubicación preferida y características deseadas.</p>
        <ul class="list-disc pl-6 text-gray-600">
          <li>Establece un presupuesto máximo (no más del 30% de tus ingresos)</li>
          <li>Identifica zonas que te convengan por ubicación y servicios</li>
          <li>Lista las características indispensables vs. deseables</li>
        </ul>
      </div>

      <div class="bg-white border-l-4 border-green-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-green-900">2. Contacto con Propietarios</h3>
        <p class="text-gray-700 mb-3">Utiliza múltiples canales para encontrar opciones.</p>
        <ul class="list-disc pl-6 text-gray-600">
          <li>Plataformas como <a href="https://www.inmuebles24.com" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Inmuebles24</a>, Vivastreet</li>
          <li>Contacto directo con propietarios</li>
          <li>Recomendaciones de conocidos</li>
        </ul>
      </div>

      <div class="bg-white border-l-4 border-yellow-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-yellow-900">3. Inspección de la Propiedad</h3>
        <p class="text-gray-700 mb-3">Revisa cuidadosamente la propiedad antes de comprometerte.</p>
        <ul class="list-disc pl-6 text-gray-600">
          <li>Visita en diferentes horarios del día</li>
          <li>Verifica instalaciones y servicios</li>
          <li>Evalúa el estado general y la seguridad</li>
        </ul>
      </div>

      <div class="bg-white border-l-4 border-purple-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-purple-900">4. Negociación</h3>
        <p class="text-gray-700 mb-3">Discute precio, condiciones y términos del contrato.</p>
        <ul class="list-disc pl-6 text-gray-600">
          <li>Investiga precios de mercado en la zona</li>
          <li>Negocia condiciones de mantenimiento</li>
          <li>Clarifica qué servicios están incluidos</li>
        </ul>
      </div>

      <div class="bg-white border-l-4 border-red-500 shadow-sm rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-3 text-red-900">5. Firma de Contrato</h3>
        <p class="text-gray-700 mb-3">Revisa cuidadosamente todos los términos antes de firmar.</p>
        <ul class="list-disc pl-6 text-gray-600">
          <li>Lee cada cláusula del contrato</li>
          <li>Verifica datos de identificación de ambas partes</li>
          <li>Conserva copias de todos los documentos</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="inspeccion-propiedad" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Lista de Verificación para Inspección</h2>
    <p class="text-gray-700 mb-6">Utiliza esta lista para asegurarte de revisar todos los aspectos importantes durante tu visita a la propiedad.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-blue-900">🔧 Instalaciones</h3>
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="mr-3 text-blue-600">☐</span>
            <span>Funcionalidad de llaves y grifos</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-blue-600">☐</span>
            <span>Sistema eléctrico completo</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-blue-600">☐</span>
            <span>Instalaciones de gas</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-blue-600">☐</span>
            <span>Drenaje y tuberías</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-blue-600">☐</span>
            <span>Puertas y ventanas</span>
          </li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-green-900">🏠 Estructura</h3>
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="mr-3 text-green-600">☐</span>
            <span>Estado de paredes y techos</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-green-600">☐</span>
            <span>Pisos en buen estado</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-green-600">☐</span>
            <span>Seguridad del inmueble</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-green-600">☐</span>
            <span>Áreas comunes</span>
          </li>
          <li class="flex items-center">
            <span class="mr-3 text-green-600">☐</span>
            <span>Estacionamiento disponible</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section id="aspectos-legales" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Aspectos Legales del Contrato</h2>
    <p class="text-gray-700 mb-6">Conoce tus derechos y obligaciones para protegerte durante el proceso de arrendamiento.</p>

    <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
      <h3 class="text-lg font-semibold mb-3 text-red-900">⚖️ Puntos Importantes del Contrato</h3>
      <ul class="list-disc pl-6 text-red-800 space-y-2">
        <li><strong>Duración del contrato:</strong> Mínimo legal 1 año</li>
        <li><strong>Incremento anual:</strong> Máximo según inflación oficial</li>
        <li><strong>Condiciones de rescisión:</strong> Avisos con 30 días de anticipación</li>
        <li><strong>Responsabilidades de mantenimiento:</strong> Claras entre propietario e inquilino</li>
        <li><strong>Políticas sobre mascotas:</strong> Especificadas claramente</li>
        <li><strong>Servicios incluidos:</strong> Agua, luz, gas, internet, mantenimiento</li>
      </ul>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h4 class="font-semibold text-blue-900 mb-3">📋 Documentos que debe incluir el contrato:</h4>
      <ul class="list-disc pl-6 text-blue-800 space-y-1">
        <li>Datos completos de propietario e inquilino</li>
        <li>Descripción detallada de la propiedad</li>
        <li>Monto de renta y forma de pago</li>
        <li>Depósitos y garantías</li>
        <li>Inventario de bienes incluidos</li>
        <li>Condiciones de uso y mantenimiento</li>
      </ul>
    </div>
  </section>

  <section id="estrategias-negociacion" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Estrategias de Negociación</h2>
    <p class="text-gray-700 mb-6">Aplica estas técnicas para obtener mejores condiciones en tu contrato de arrendamiento.</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-yellow-900">💡 Investigación</h3>
        <p class="text-yellow-800">Conoce precios de mercado en la zona antes de negociar. Utiliza portales inmobiliarios para comparar propiedades similares.</p>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-green-900">🤝 Flexibilidad</h3>
        <p class="text-green-800">Ofrece contratos más largos a cambio de mejor precio. Los propietarios valoran la estabilidad de inquilinos confiables.</p>
      </div>

      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-blue-900">⏰ Timing</h3>
        <p class="text-blue-800">Aprovecha temporadas bajas para mejores ofertas. Evita inicio de año escolar y diciembre cuando la demanda es alta.</p>
      </div>
    </div>
  </section>

  <section id="preguntas-frecuentes" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">Preguntas Frecuentes</h2>

    <div class="space-y-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">¿Cuánto debo ganar para rentar una casa de $10,000 MXN?</h3>
        <p class="text-gray-700">Deberías ganar mínimo <strong>$30,000 MXN mensuales</strong>, ya que generalmente se requiere que tus ingresos sean 3 veces el monto de la renta.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">¿Puedo rentar siendo extranjero?</h3>
        <p class="text-gray-700">Sí, pero necesitarás <strong>visa legal</strong>, comprobante de ingresos en México o carta de tu empleador, y posiblemente un <strong>fiador mexicano</strong>.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-900">¿Qué incluyen normalmente las rentas?</h3>
        <p class="text-gray-700">Depende del propietario, pero típicamente <strong>no incluyen servicios</strong>. Pregunta específicamente sobre agua, luz, gas, internet y mantenimiento.</p>
      </div>
    </div>
  </section>

  <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
    <h3 class="text-lg font-semibold mb-3 text-blue-900">🔗 Recursos Adicionales</h3>
    <ul class="list-disc pl-6 text-blue-800 space-y-2">
      <li><a href="https://www.profeco.gob.mx" target="_blank" class="text-blue-600 hover:text-blue-800 underline">PROFECO - Derechos del Consumidor</a></li>
      <li><a href="https://www.inmuebles24.com" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Inmuebles24 - Portal de Búsqueda</a></li>
      <li><a href="https://www.sanluispotosi.gob.mx" target="_blank" class="text-blue-600 hover:text-blue-800 underline">Gobierno de San Luis Potosí</a></li>
    </ul>
  </div>

  <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
    <h3 class="text-lg font-semibold mb-3 text-green-900">¿Necesitas Ayuda Personalizada?</h3>
    <p class="text-green-800 mb-3"><strong>Nuestros expertos en bienes raíces pueden ayudarte a encontrar la casa perfecta en San Luis Potosí.</strong></p>
    <p class="text-green-800"><a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Contactar Experto →</a></p>
  </div>

</div>
$BODY$
WHERE slug = 'guia-completa-rentar-casa-san-luis-potosi-2025';