require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const SLUG = 'san-luis-potosi-mining-history-baroque-architecture-cultural-legacy';

// Expanded Huasteca Potosina content in Spanish
const expandedHuastecaES = `
<h2 id="huasteca-potosina" class="text-2xl font-bold text-gray-900 mt-12 mb-4">La Huasteca Potosina: Paraíso Natural de México</h2>

<p class="mb-4">La Huasteca Potosina es, sin duda, uno de los tesoros naturales más impresionantes de México y un destino que está ganando reconocimiento internacional. Esta región, ubicada en la parte oriental del estado de San Luis Potosí, abarca aproximadamente 11,000 km² de selva tropical, montañas de la Sierra Madre Oriental, ríos de aguas cristalinas color turquesa y una biodiversidad extraordinaria.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Geografía y Clima</h3>

<p class="mb-4">La región se caracteriza por su clima cálido húmedo, con temperaturas que oscilan entre los 20°C y 35°C durante todo el año. La temporada de lluvias (junio a octubre) transforma el paisaje, llenando cascadas y ríos con un caudal espectacular. La mejor época para visitar es de noviembre a mayo, cuando el clima es más seco y las aguas mantienen su característico color turquesa debido a la alta concentración de minerales.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Cascadas Impresionantes</h3>

<p class="mb-4"><strong>Cascada de Tamul:</strong> Con una caída de 105 metros, es la cascada más alta de San Luis Potosí y una de las más espectaculares de México. Se accede únicamente por el Río Tampaón en un recorrido de aproximadamente 2.5 horas en lancha o kayak, atravesando un cañón de paredes rocosas cubiertas de vegetación exuberante. El punto donde el Río Gallinas se une al Tampaón crea este salto majestuoso.</p>

<p class="mb-4"><strong>Cascada de Tamasopo:</strong> Un conjunto de tres cascadas escalonadas que forman pozas naturales de agua cristalina, perfectas para nadar. El lugar cuenta con instalaciones para visitantes y es ideal para familias.</p>

<p class="mb-4"><strong>Cascada de Minas Viejas:</strong> Una cascada de 50 metros rodeada de vegetación selvática, con una poza profunda de aguas color esmeralda. Es posible practicar clavados desde diferentes alturas.</p>

<p class="mb-4"><strong>Cascada de El Meco:</strong> Con 35 metros de altura, esta cascada forma una cortina de agua perfecta y una amplia poza para nadar. Es menos concurrida que otras, ofreciendo una experiencia más tranquila.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">El Sótano de las Golondrinas</h3>

<p class="mb-4">Este abismo natural es uno de los más profundos del mundo, con una caída libre de 376 metros desde el borde hasta el fondo. Su nombre proviene de los miles de vencejos (no golondrinas) que habitan en sus paredes y que cada amanecer salen en espiral hacia el cielo, creando un espectáculo único. Los practicantes de rappel extremo pueden descender hasta el fondo, una experiencia que toma aproximadamente 45 minutos.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Río Tampaón y Aventura</h3>

<p class="mb-4">El Río Tampaón es el corazón de la aventura en la Huasteca. Sus aguas turquesa ofrecen oportunidades para:</p>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Rafting:</strong> Rápidos clase II y III perfectos para principiantes y experimentados</li>
  <li><strong>Kayak:</strong> Rutas de diferentes niveles de dificultad</li>
  <li><strong>Natación:</strong> Pozas naturales con aguas templadas todo el año</li>
  <li><strong>Saltos de cliff diving:</strong> Desde 3 hasta 15 metros en puntos seguros</li>
</ul>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Cuevas y Formaciones Geológicas</h3>

<p class="mb-4"><strong>Cueva del Agua:</strong> Una caverna donde fluye un río subterráneo de aguas cristalinas. Se puede nadar dentro de la cueva, iluminada por tragaluces naturales.</p>

<p class="mb-4"><strong>Cueva de los Sabinos:</strong> Conocida por sus formaciones de estalactitas y estalagmitas, ofrece recorridos guiados que revelan millones de años de historia geológica.</p>

<p class="mb-4"><strong>Puente de Dios:</strong> Una formación rocosa natural donde el río pasa por debajo de un arco de piedra, creando pozas de agua turquesa rodeadas de vegetación tropical.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Cultura Teenek y Náhuatl</h3>

<p class="mb-4">La Huasteca es hogar de dos pueblos originarios: los Teenek (huastecos) y los Náhuatl de la Sierra. Estas comunidades mantienen vivas tradiciones ancestrales:</p>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Danza de los Voladores:</strong> Ritual prehispánico donde danzantes descienden desde un poste de 30 metros, girando en espiral</li>
  <li><strong>Artesanía:</strong> Bordados multicolores, cestería y trabajos en palma que reflejan la cosmovisión indígena</li>
  <li><strong>Lenguas vivas:</strong> Tanto el teenek como el náhuatl se siguen hablando en la región</li>
  <li><strong>Ceremonias tradicionales:</strong> Rituales de agradecimiento a la tierra y celebraciones del ciclo agrícola</li>
</ul>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Gastronomía de la Huasteca</h3>

<p class="mb-4">La cocina huasteca es una explosión de sabores tropicales y técnicas ancestrales:</p>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Zacahuil:</strong> El "rey de los tamales", un tamal gigante de hasta 5 metros que se cocina en horno de leña y alimenta a decenas de personas</li>
  <li><strong>Bocoles:</strong> Gorditas de maíz rellenas de frijoles, chicharrón o queso, típicas del desayuno huasteco</li>
  <li><strong>Enchiladas huastecas:</strong> Bañadas en salsa de chile seco con queso fresco</li>
  <li><strong>Pemoles:</strong> Galletas tradicionales de piloncillo y manteca</li>
  <li><strong>Café de la Sierra:</strong> Cultivado en las montañas, con sabor único por la altitud y el clima</li>
</ul>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Pueblos Mágicos y Destinos</h3>

<p class="mb-4"><strong>Xilitla:</strong> Famoso por el Jardín Surrealista de Edward James, una obra arquitectónica única en el mundo con estructuras de concreto que emergen de la selva como un sueño hecho realidad. El excéntrico poeta y artista británico construyó este "Edén" durante más de 20 años.</p>

<p class="mb-4"><strong>Aquismón:</strong> Puerta de entrada a muchas de las atracciones naturales, incluyendo el Sótano de las Golondrinas y el Puente de Dios. Conserva su arquitectura tradicional y mercados indígenas.</p>

<p class="mb-4"><strong>Ciudad Valles:</strong> La ciudad más grande de la región y centro logístico para explorar la Huasteca. Ofrece hoteles, restaurantes y servicios turísticos.</p>

<p class="mb-4"><strong>Tamasopo:</strong> Pueblo tranquilo conocido por sus cascadas y la producción de piloncillo (azúcar de caña).</p>

<figure class="my-8">
  <img src="https://gvjvbvjubmjxqwpcinib.supabase.co/storage/v1/object/public/blog-images/historia-slp/tamul-waterfall.jpg" alt="Cascada de Tamul, la más alta de San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-sm text-gray-600 mt-2 text-center">La Cascada de Tamul, con 105 metros de altura, es el tesoro natural más impresionante de la Huasteca Potosina. Foto: Corazón de Xoconostle</figcaption>
</figure>

<figure class="my-8">
  <img src="https://gvjvbvjubmjxqwpcinib.supabase.co/storage/v1/object/public/blog-images/historia-slp/rio-huasteca-turquesa.jpg" alt="Río turquesa de la Huasteca Potosina" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-sm text-gray-600 mt-2 text-center">Los ríos de aguas turquesa son característicos de la Huasteca Potosina, resultado de la alta concentración de minerales</figcaption>
</figure>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Consejos para Visitantes</h3>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Mejor época:</strong> Noviembre a mayo para aguas claras; junio a octubre para cascadas en su máximo esplendor</li>
  <li><strong>Duración recomendada:</strong> Mínimo 3-4 días para ver los principales atractivos</li>
  <li><strong>Transporte:</strong> Se recomienda vehículo propio o contratar tours desde Ciudad Valles</li>
  <li><strong>Alojamiento:</strong> Desde hoteles boutique hasta cabañas ecológicas y campamentos</li>
  <li><strong>Qué llevar:</strong> Ropa ligera, traje de baño, zapatos para agua, protector solar biodegradable, repelente</li>
  <li><strong>Guías locales:</strong> Siempre es recomendable contratar guías certificados para actividades de aventura</li>
</ul>

<p class="mb-4">La Huasteca Potosina representa la otra cara de San Luis Potosí: si el centro histórico es el legado de la riqueza minera y colonial, la Huasteca es el recordatorio de que la verdadera riqueza del estado siempre ha sido su naturaleza extraordinaria y sus pueblos originarios.</p>
`;

// Expanded Huasteca Potosina content in English
const expandedHuastecaEN = `
<h2 id="huasteca-potosina" class="text-2xl font-bold text-gray-900 mt-12 mb-4">The Huasteca Potosina: Mexico's Natural Paradise</h2>

<p class="mb-4">The Huasteca Potosina is undoubtedly one of Mexico's most impressive natural treasures and a destination gaining international recognition. This region, located in the eastern part of the state of San Luis Potosí, covers approximately 11,000 km² of tropical jungle, mountains of the Sierra Madre Oriental, crystal-clear turquoise rivers, and extraordinary biodiversity.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Geography and Climate</h3>

<p class="mb-4">The region is characterized by its warm, humid climate, with temperatures ranging between 20°C and 35°C (68°F-95°F) throughout the year. The rainy season (June to October) transforms the landscape, filling waterfalls and rivers with spectacular flow. The best time to visit is from November to May, when the weather is drier and the waters maintain their characteristic turquoise color due to the high concentration of minerals.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Impressive Waterfalls</h3>

<p class="mb-4"><strong>Tamul Waterfall:</strong> With a drop of 105 meters (344 feet), it's the highest waterfall in San Luis Potosí and one of Mexico's most spectacular. Access is only by boat or kayak along the Tampaón River, a journey of approximately 2.5 hours through a canyon with rock walls covered in lush vegetation. The point where the Gallinas River joins the Tampaón creates this majestic cascade.</p>

<p class="mb-4"><strong>Tamasopo Waterfalls:</strong> A set of three terraced waterfalls that form natural pools of crystal-clear water, perfect for swimming. The site has visitor facilities and is ideal for families.</p>

<p class="mb-4"><strong>Minas Viejas Waterfall:</strong> A 50-meter waterfall surrounded by jungle vegetation, with a deep emerald-colored pool. Cliff diving from various heights is possible here.</p>

<p class="mb-4"><strong>El Meco Waterfall:</strong> At 35 meters high, this waterfall forms a perfect curtain of water and a wide swimming pool. It's less crowded than others, offering a more tranquil experience.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">The Cave of Swallows (Sótano de las Golondrinas)</h3>

<p class="mb-4">This natural abyss is one of the deepest in the world, with a free fall of 376 meters (1,234 feet) from the edge to the bottom. Its name comes from the thousands of swifts (not swallows) that inhabit its walls and that every dawn exit in a spiral toward the sky, creating a unique spectacle. Extreme rappel practitioners can descend to the bottom, an experience that takes approximately 45 minutes.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Tampaón River and Adventure</h3>

<p class="mb-4">The Tampaón River is the heart of adventure in the Huasteca. Its turquoise waters offer opportunities for:</p>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Rafting:</strong> Class II and III rapids perfect for beginners and experienced rafters</li>
  <li><strong>Kayaking:</strong> Routes of different difficulty levels</li>
  <li><strong>Swimming:</strong> Natural pools with warm waters year-round</li>
  <li><strong>Cliff diving:</strong> From 3 to 15 meters at safe designated spots</li>
</ul>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Caves and Geological Formations</h3>

<p class="mb-4"><strong>Water Cave (Cueva del Agua):</strong> A cavern where an underground river of crystal-clear water flows. You can swim inside the cave, illuminated by natural skylights.</p>

<p class="mb-4"><strong>Sabinos Cave:</strong> Known for its stalactite and stalagmite formations, it offers guided tours that reveal millions of years of geological history.</p>

<p class="mb-4"><strong>God's Bridge (Puente de Dios):</strong> A natural rock formation where the river passes under a stone arch, creating turquoise water pools surrounded by tropical vegetation.</p>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Teenek and Náhuatl Culture</h3>

<p class="mb-4">The Huasteca is home to two indigenous peoples: the Teenek (Huastecos) and the Náhuatl of the Sierra. These communities keep ancestral traditions alive:</p>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Dance of the Flyers (Danza de los Voladores):</strong> Pre-Hispanic ritual where dancers descend from a 30-meter pole, spinning in a spiral</li>
  <li><strong>Crafts:</strong> Multicolored embroidery, basketry, and palm work reflecting indigenous worldview</li>
  <li><strong>Living languages:</strong> Both Teenek and Náhuatl are still spoken in the region</li>
  <li><strong>Traditional ceremonies:</strong> Rituals of gratitude to the earth and celebrations of the agricultural cycle</li>
</ul>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Huasteca Gastronomy</h3>

<p class="mb-4">Huasteca cuisine is an explosion of tropical flavors and ancestral techniques:</p>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Zacahuil:</strong> The "king of tamales," a giant tamal up to 5 meters long cooked in a wood-fired oven that feeds dozens of people</li>
  <li><strong>Bocoles:</strong> Corn gorditas stuffed with beans, chicharrón, or cheese, typical of Huasteca breakfast</li>
  <li><strong>Huasteca enchiladas:</strong> Bathed in dried chile sauce with fresh cheese</li>
  <li><strong>Pemoles:</strong> Traditional cookies made with piloncillo and lard</li>
  <li><strong>Sierra coffee:</strong> Grown in the mountains, with a unique flavor from the altitude and climate</li>
</ul>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Magical Towns and Destinations</h3>

<p class="mb-4"><strong>Xilitla:</strong> Famous for Edward James' Surrealist Garden, a unique architectural work with concrete structures emerging from the jungle like a dream come true. The eccentric British poet and artist built this "Eden" over more than 20 years.</p>

<p class="mb-4"><strong>Aquismón:</strong> Gateway to many natural attractions, including the Cave of Swallows and God's Bridge. It preserves its traditional architecture and indigenous markets.</p>

<p class="mb-4"><strong>Ciudad Valles:</strong> The largest city in the region and logistics hub for exploring the Huasteca. It offers hotels, restaurants, and tourist services.</p>

<p class="mb-4"><strong>Tamasopo:</strong> A quiet town known for its waterfalls and piloncillo (cane sugar) production.</p>

<figure class="my-8">
  <img src="https://gvjvbvjubmjxqwpcinib.supabase.co/storage/v1/object/public/blog-images/historia-slp/tamul-waterfall.jpg" alt="Tamul Waterfall, the highest in San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-sm text-gray-600 mt-2 text-center">Tamul Waterfall, at 105 meters high, is the most impressive natural treasure of the Huasteca Potosina. Photo: Corazón de Xoconostle</figcaption>
</figure>

<figure class="my-8">
  <img src="https://gvjvbvjubmjxqwpcinib.supabase.co/storage/v1/object/public/blog-images/historia-slp/rio-huasteca-turquesa.jpg" alt="Turquoise river of the Huasteca Potosina" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-sm text-gray-600 mt-2 text-center">The turquoise rivers are characteristic of the Huasteca Potosina, a result of high mineral concentration</figcaption>
</figure>

<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">Tips for Visitors</h3>

<ul class="list-disc pl-6 mb-4 space-y-2">
  <li><strong>Best time:</strong> November to May for clear waters; June to October for waterfalls at their peak</li>
  <li><strong>Recommended duration:</strong> Minimum 3-4 days to see the main attractions</li>
  <li><strong>Transportation:</strong> Own vehicle recommended or hire tours from Ciudad Valles</li>
  <li><strong>Accommodation:</strong> From boutique hotels to eco-cabins and campsites</li>
  <li><strong>What to bring:</strong> Light clothing, swimsuit, water shoes, biodegradable sunscreen, insect repellent</li>
  <li><strong>Local guides:</strong> Always recommended to hire certified guides for adventure activities</li>
</ul>

<p class="mb-4">The Huasteca Potosina represents the other side of San Luis Potosí: if the historic center is the legacy of mining and colonial wealth, the Huasteca is a reminder that the state's true richness has always been its extraordinary nature and indigenous peoples.</p>
`;

async function updateHuastecaSection() {
  console.log('Fetching current post...');

  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', SLUG)
    .single();

  if (fetchError || !post) {
    console.error('Error fetching post:', fetchError);
    process.exit(1);
  }

  console.log('Current post found:', post.title);

  // Find and replace the Huasteca section in Spanish content
  let updatedContent = post.content;
  let updatedContentEn = post.content_en;

  // Pattern to match the existing Huasteca section (from h2 to next h2 or end)
  const huastecaPatternES = /<h2[^>]*id="huasteca-potosina"[^>]*>[\s\S]*?(?=<h2[^>]*id="(?!huasteca)|$)/;
  const huastecaPatternEN = /<h2[^>]*id="huasteca-potosina"[^>]*>[\s\S]*?(?=<h2[^>]*id="(?!huasteca)|$)/;

  if (huastecaPatternES.test(updatedContent)) {
    updatedContent = updatedContent.replace(huastecaPatternES, expandedHuastecaES);
    console.log('Spanish Huasteca section replaced');
  } else {
    console.log('Spanish Huasteca section not found, appending...');
  }

  if (huastecaPatternEN.test(updatedContentEn)) {
    updatedContentEn = updatedContentEn.replace(huastecaPatternEN, expandedHuastecaEN);
    console.log('English Huasteca section replaced');
  } else {
    console.log('English Huasteca section not found');
  }

  console.log('Updating post with expanded Huasteca content...');

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContentEn,
      updated_at: new Date().toISOString()
    })
    .eq('slug', SLUG)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    process.exit(1);
  }

  console.log('\nPost updated successfully!');
  console.log('Post URL: https://www.sanluisway.com/blog/' + data.slug);
  return data;
}

updateHuastecaSection()
  .then(() => {
    console.log('\nHuasteca Potosina section has been expanded with:');
    console.log('- Geography and climate details');
    console.log('- 4 major waterfalls (Tamul, Tamasopo, Minas Viejas, El Meco)');
    console.log('- Sótano de las Golondrinas');
    console.log('- Tampaón River activities');
    console.log('- Caves and geological formations');
    console.log('- Teenek and Náhuatl culture');
    console.log('- Regional gastronomy');
    console.log('- Magical towns (Xilitla, Aquismón, Ciudad Valles, Tamasopo)');
    console.log('- Visitor tips');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFailed:', err.message);
    process.exit(1);
  });
