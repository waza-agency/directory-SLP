-- Migration: Update La Gran Vía blog post with enhanced styling
-- Created: 2025-01-15

UPDATE public.blog_posts
SET content = $BODY$
<div class="bg-yellow-50 p-6 rounded-lg mb-8">
  <h2 class="text-xl font-semibold mb-4">Descubre La Gran Vía</h2>
  <ul class="list-disc pl-6">
    <li><a href="#historia" class="text-blue-600 hover:text-blue-800">Nuestra Historia</a></li>
    <li><a href="#excelencia-culinaria" class="text-blue-600 hover:text-blue-800">Excelencia Culinaria</a></li>
    <li><a href="#especialidades" class="text-blue-600 hover:text-blue-800">Nuestras Especialidades</a></li>
    <li><a href="#reconocimientos" class="text-blue-600 hover:text-blue-800">Premios y Reconocimientos</a></li>
    <li><a href="#visitanos" class="text-blue-600 hover:text-blue-800">Visítanos</a></li>
  </ul>
</div>

<div class="prose prose-lg max-w-none">
  <p class="text-lg text-gray-700 mb-8"><strong>Experiencia más de 36 años de tradición culinaria española en La Gran Vía, uno de los 100 restaurantes imperdibles de México. Descubre auténtica cocina española con un toque local en San Luis Potosí.</strong></p>

  <div class="bg-blue-50 p-6 rounded-lg mb-8">
    <h3 class="text-lg font-semibold mb-4 text-blue-900">Puntos Clave de La Gran Vía</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>36 años de experiencia</strong>: Tradición culinaria desde 1979</li>
      <li><strong>Reconocimiento Nacional</strong>: Uno de los 100 lugares imperdibles de México</li>
      <li><strong>Cocina Auténtica</strong>: Recetas españolas originales con ingredientes locales</li>
      <li><strong>Ubicación Privilegiada</strong>: En el corazón de San Luis Potosí</li>
    </ul>
  </div>

  <section id="historia" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🏛️ Nuestra Historia</h2>
    <p class="text-gray-700 mb-6">Fundado en 1979, La Gran Vía ha sido una piedra angular de la cocina española en San Luis Potosí durante más de 36 años. Nuestro viaje comenzó con una pasión por la auténtica gastronomía española y ha evolucionado hasta convertirse en una institución culinaria que equilibra perfectamente la tradición con la innovación.</p>

    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
      <p class="text-green-800 font-medium">✅ A través de décadas de dedicación a la excelencia culinaria, hemos ganado nuestro lugar en los corazones y paladares de nuestros huéspedes, convirtiéndonos en uno de los restaurantes españoles más respetados de la región.</p>
    </div>
  </section>

  <section id="excelencia-culinaria" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">👨‍🍳 Excelencia Culinaria</h2>
    <p class="text-gray-700 mb-6">En La Gran Vía, mantenemos un compromiso inquebrantable con la calidad y la autenticidad. Nuestra cocina combina recetas españolas originales con ingredientes locales cuidadosamente seleccionados, creando una fusión única de sabores mediterráneos y la rica herencia culinaria de las tierras altas de San Luis Potosí.</p>

    <div class="bg-blue-50 p-6 rounded-lg mb-6">
      <h4 class="font-semibold mb-3 text-blue-900">🍽️ Nuestro Compromiso</h4>
      <ul class="list-disc pl-6 text-blue-800 space-y-1">
        <li>Ingredientes frescos y de alta calidad en cada plato</li>
        <li>Recetas españolas auténticas con influencias locales</li>
        <li>Selección de vinos cuidadosamente curada</li>
        <li>Experiencia gastronómica excepcional</li>
      </ul>
    </div>
  </section>

  <section id="especialidades" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🍽️ Nuestras Especialidades</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-blue-900">🇪🇸 Cocina Española</h3>
        <p class="text-blue-800 mb-3">Recetas auténticas españolas que muestran lo mejor de los sabores mediterráneos</p>
        <ul class="list-disc pl-6 space-y-2 text-blue-700">
          <li>Paellas tradicionales</li>
          <li>Especialidades regionales españolas</li>
          <li>Platos inspirados en el Mediterráneo</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-green-900">🌮 Fusión Local</h3>
        <p class="text-green-800 mb-3">Combinaciones creativas de cocina española con sabores de San Luis Potosí</p>
        <ul class="list-disc pl-6 space-y-2 text-green-700">
          <li>Adaptaciones regionales</li>
          <li>Especialidades con ingredientes locales</li>
          <li>Platos de fusión únicos</li>
        </ul>
      </div>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
      <h4 class="font-semibold text-yellow-800 mb-2">🍷 Consejo del Sommelier:</h4>
      <p class="text-yellow-800">Nuestra carta de vinos cuidadosamente curada incluye selecciones españolas e internacionales perfectas para maridar con tu experiencia gastronómica.</p>
    </div>
  </section>

  <section id="reconocimientos" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">🏆 Premios y Reconocimientos</h2>

    <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg mb-6">
      <div class="text-center">
        <h3 class="text-2xl font-bold mb-4 text-orange-900">🥇 100 Lugares Imperdibles de México</h3>
        <p class="text-lg text-orange-800 mb-4">En 2017, La Gran Vía recibió el prestigioso reconocimiento de ser nombrado uno de los 100 lugares imperdibles de México en la categoría de gastronomía.</p>
        <div class="bg-white p-4 rounded-lg inline-block">
          <p class="text-orange-900 font-semibold">Un testimonio de nuestro compromiso con la excelencia culinaria y experiencias gastronómicas excepcionales.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="visitanos" class="mb-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-200 pb-2">📍 Visítanos</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">📞 Ubicación y Contacto</h3>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Dirección:</strong> Av. Venustiano Carranza #560, 78233 San Luis Potosí</li>
          <li><strong>Teléfono:</strong> <a href="tel:4448122899" class="text-blue-600 hover:text-blue-800">444 812 2899</a></li>
          <li><strong>Email:</strong> <a href="mailto:contacto@lagranviaslp.com" class="text-blue-600 hover:text-blue-800">contacto@lagranviaslp.com</a></li>
        </ul>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900">🍽️ Horarios de Servicio</h3>
        <div class="space-y-2 text-gray-700">
          <p><strong>Lunes a Domingo:</strong> 1:00 PM - 11:00 PM</p>
          <p><strong>Reservaciones:</strong> Recomendadas para fines de semana</p>
          <p><strong>Eventos Privados:</strong> Disponibles bajo solicitud</p>
        </div>
      </div>
    </div>

    <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
      <h3 class="text-lg font-semibold mb-3 text-green-900">🍴 Experimenta La Gran Vía</h3>
      <p class="text-green-800 mb-3">Te invitamos a experimentar la mejor cocina española en San Luis Potosí. Cada visita promete un viaje gastronómico único que deleitará tu paladar y creará recuerdos duraderos.</p>
      <p class="text-green-800"><a href="/contact" class="text-blue-600 hover:text-blue-800 underline font-semibold">Hacer Reservación →</a></p>
    </div>
  </section>

  <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
    <h3 class="text-lg font-semibold mb-3 text-blue-900">🔗 Recursos Adicionales</h3>
    <ul class="list-disc pl-6 text-blue-800 space-y-2">
      <li><a href="/places/la-gran-via" class="text-blue-600 hover:text-blue-800 underline">Página completa de La Gran Vía</a></li>
      <li><a href="/category/restaurants-and-bars" class="text-blue-600 hover:text-blue-800 underline">Más restaurantes en San Luis Potosí</a></li>
      <li><a href="/guides" class="text-blue-600 hover:text-blue-800 underline">Guías gastronómicas de la ciudad</a></li>
    </ul>
  </div>
</div>
$BODY$
WHERE slug = 'la-gran-via';