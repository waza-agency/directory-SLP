require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SLUG = 'san-luis-potosi-historia-minera-arquitectura-barroca-legado-cultural';

// New expanded huapango section in Spanish
const oldHuapangoEs = `<h3 class="text-2xl font-semibold text-gray-900 mb-4">El Huapango: Música del Alma Potosina</h3>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "El huapango es una tradición compartida por los habitantes de la Huasteca, no importa su origen étnico."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Irene Vázquez</cite>
        <p class="text-sm text-gray-600">Etnomusicóloga</p>
      </div>
    </footer>
  </blockquote>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Artesanías Emblemáticas</h3>`;

const newHuapangoEs = `<h3 class="text-2xl font-semibold text-gray-900 mb-4">El Huapango: Música del Alma Potosina</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    El huapango es el género musical emblemático de la Huasteca Potosina, una expresión artística que combina música, poesía y danza en una celebración de la identidad regional. Esta tradición, declarada Patrimonio Cultural Inmaterial por la UNESCO, tiene sus raíces en la fusión de influencias indígenas, españolas y africanas durante la época colonial.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    La música del huapango se interpreta con un trío tradicional compuesto por <strong>jarana huasteca</strong> (guitarra pequeña de cinco cuerdas), <strong>guitarra quinta o huapanguera</strong> (de mayor tamaño y sonido grave) y <strong>violín</strong>. Los versos, llamados "coplas", son improvisados por los trovadores y hablan de amor, naturaleza, humor y la vida cotidiana de la región.
  </p>

  <div class="not-prose my-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
    <h4 class="font-semibold text-purple-900 mb-3">El Zapateado Huasteco</h4>
    <p class="text-purple-800">
      El baile del huapango se caracteriza por el zapateado sobre tarimas de madera, donde los bailadores marcan el ritmo con sus pies mientras mantienen el torso erguido y los brazos detrás de la espalda. La tarima amplifica el sonido, convirtiéndose en un instrumento más del conjunto.
    </p>
  </div>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "El huapango es una tradición compartida por los habitantes de la Huasteca, no importa su origen étnico."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Irene Vázquez</cite>
        <p class="text-sm text-gray-600">Etnomusicóloga</p>
      </div>
    </footer>
  </blockquote>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Cada año, el <strong>Festival del Huapango</strong> en Xilitla reúne a los mejores tríos huastecos de la región, atrayendo a miles de visitantes que celebran esta tradición viva. Otros eventos importantes incluyen el Concurso Nacional de Huapango en Pánuco y las fiestas patronales de los pueblos huastecos, donde el huapango es protagonista.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Artesanías Emblemáticas</h3>`;

// New expanded huapango section in English
const oldHuapangoEn = `<h3 class="text-2xl font-semibold text-gray-900 mb-4">Huapango: Music of the Potosino Soul</h3>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "Huapango is a tradition shared by the inhabitants of the Huasteca, regardless of their ethnic origin."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Irene Vázquez</cite>
        <p class="text-sm text-gray-600">Ethnomusicologist</p>
      </div>
    </footer>
  </blockquote>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Emblematic Crafts</h3>`;

const newHuapangoEn = `<h3 class="text-2xl font-semibold text-gray-900 mb-4">Huapango: Music of the Potosino Soul</h3>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Huapango is the emblematic musical genre of the Huasteca Potosina, an artistic expression that combines music, poetry, and dance in a celebration of regional identity. This tradition, declared Intangible Cultural Heritage by UNESCO, has its roots in the fusion of indigenous, Spanish, and African influences during the colonial era.
  </p>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Huapango music is performed by a traditional trio consisting of the <strong>jarana huasteca</strong> (a small five-string guitar), <strong>guitarra quinta or huapanguera</strong> (larger with a deep sound), and <strong>violin</strong>. The verses, called "coplas," are improvised by troubadours and speak of love, nature, humor, and daily life in the region.
  </p>

  <div class="not-prose my-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
    <h4 class="font-semibold text-purple-900 mb-3">The Huasteco Zapateado</h4>
    <p class="text-purple-800">
      The huapango dance is characterized by footwork on wooden platforms, where dancers mark the rhythm with their feet while keeping their torso upright and arms behind their back. The platform amplifies the sound, becoming another instrument in the ensemble.
    </p>
  </div>

  <blockquote class="not-prose my-12 bg-gradient-to-r from-purple-50 to-transparent border-l-4 border-purple-500 p-8 rounded-r-xl">
    <p class="text-2xl font-serif italic text-gray-800 mb-4">
      "Huapango is a tradition shared by the inhabitants of the Huasteca, regardless of their ethnic origin."
    </p>
    <footer class="flex items-center gap-4">
      <div>
        <cite class="not-italic font-semibold text-gray-900">Irene Vázquez</cite>
        <p class="text-sm text-gray-600">Ethnomusicologist</p>
      </div>
    </footer>
  </blockquote>

  <p class="text-lg leading-relaxed text-gray-700 mb-6">
    Every year, the <strong>Huapango Festival</strong> in Xilitla brings together the best huasteco trios from the region, attracting thousands of visitors who celebrate this living tradition. Other important events include the National Huapango Contest in Pánuco and the patron saint festivals of Huasteco towns, where huapango takes center stage.
  </p>

  <h3 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">Emblematic Crafts</h3>`;

async function updateHuapangoSection() {
  console.log('Fetching current post content...');
  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('content, content_en')
    .eq('slug', SLUG)
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    process.exit(1);
  }

  const updatedContent = post.content.replace(oldHuapangoEs, newHuapangoEs);
  const updatedContentEn = post.content_en.replace(oldHuapangoEn, newHuapangoEn);

  if (updatedContent === post.content) {
    console.log('Spanish section not found or already updated');
  } else {
    console.log('Spanish huapango section updated');
  }

  if (updatedContentEn === post.content_en) {
    console.log('English section not found or already updated');
  } else {
    console.log('English huapango section updated');
  }

  console.log('\nUpdating post...');
  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContentEn
    })
    .eq('slug', SLUG);

  if (updateError) {
    console.error('Error updating post:', updateError);
    process.exit(1);
  }

  console.log('\nHuapango section expanded successfully!');
  console.log('Added:');
  console.log('- Introduction explaining what huapango is');
  console.log('- Description of traditional instruments (jarana, huapanguera, violin)');
  console.log('- Info box about zapateado dance');
  console.log('- Information about Festival del Huapango in Xilitla');
}

updateHuapangoSection()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
