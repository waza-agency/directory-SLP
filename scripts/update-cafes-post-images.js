const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const updatedContent = `
<p>As temperatures drop in San Luis Potosí, there's nothing quite like wrapping your hands around a steaming cup of coffee or rich Mexican hot chocolate. Whether you're a remote worker seeking a productive space, a book lover looking for a quiet corner, or simply someone who appreciates a cozy atmosphere, the city's café scene has something special for you.</p>

<p>We've explored the city's best spots and narrowed it down to five cafés that perfectly combine warmth, excellent drinks, and that irreplaceable cozy feeling that makes winter bearable—even enjoyable.</p>

<h2>1. Capital Coffee - Modern Comfort Meets Quality</h2>

<figure class="my-8">
  <img src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/cafes/capital-coffee.jpg" alt="Interior of Capital Coffee in San Luis Potosí showing modern minimalist decor and cozy seating areas" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-center text-sm text-gray-500 mt-2">Capital Coffee's modern interior with spacious seating - Photo: @capitalcoffeesanluis</figcaption>
</figure>

<p><strong>Address:</strong> Avenida Cuauhtémoc 1327, Jardín, San Luis Potosí</p>

<p>Capital Coffee has quickly become one of the most beloved specialty coffee spots in the city. With its minimalist décor and thoughtful interior design, this café offers a spacious environment perfect for introspection, focused work, or catching up with friends.</p>

<p>What makes it special for winter:</p>
<ul>
  <li><strong>Spacious layout</strong> with an upper floor and outdoor terrace</li>
  <li><strong>Vegetarian and vegan options</strong> to warm you up</li>
  <li><strong>European-style breakfasts</strong> with freshly baked bread</li>
  <li><strong>Excellent WiFi</strong> for remote workers</li>
</ul>

<p>Regulars describe Capital Coffee as "not just a cafeteria" but an experience—the attention to detail in both the coffee and the atmosphere shows in every cup.</p>

<p><em>Best for: Remote workers, coffee enthusiasts, quiet morning sessions</em></p>

<h2>2. Café Sideral - "The Prettiest Café in San Luis"</h2>

<figure class="my-8">
  <img src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/cafes/cafe-sideral.jpg" alt="Beautiful murals and artistic interior of Café Sideral in San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-center text-sm text-gray-500 mt-2">Café Sideral's stunning murals create an artistic atmosphere - Photo: Café Sideral</figcaption>
</figure>

<p><strong>Address:</strong> Two locations in San Luis Potosí (check their <a href="https://www.cafesideral.com/" target="_blank" rel="noopener">website</a>)</p>

<p>Self-described as "El café más bonito de San Luis," Café Sideral lives up to its bold claim. The café features stunning murals that create an artistic backdrop for your winter coffee ritual.</p>

<p>What makes it special for winter:</p>
<ul>
  <li><strong>Beautiful murals</strong> that make every visit Instagram-worthy</li>
  <li><strong>Quality ingredients</strong> in every drink and dish</li>
  <li><strong>Unique atmosphere</strong> that feels like a warm artistic retreat</li>
  <li><strong>Two locations</strong> so you're never too far from one</li>
</ul>

<p>The café focuses on quality coffee and authentic gastronomy, offering a range of drinks including options without caffeine and fresh juices alongside their specialty coffee.</p>

<p><em>Best for: Creative professionals, first dates, Instagram lovers</em></p>

<h2>3. 500 Noches - Trova Music & Chiapas Coffee</h2>

<figure class="my-8">
  <img src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/cafes/500-noches.jpg" alt="Cozy evening atmosphere at 500 Noches with live trova music in San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-center text-sm text-gray-500 mt-2">500 Noches brings Chiapas warmth and live trova music to SLP - Photo: @500nochesslp</figcaption>
</figure>

<p><strong>Address:</strong> Calle Huasteca #300, Residencial Bellas Lomas</p>

<p>Originally from Tuxtla Gutiérrez, Chiapas, 500 Noches brings southern Mexican warmth to San Luis Potosí. What sets this café apart is its live trova music—troubadour performances that fill the space with soulful melodies, especially on Wednesday nights.</p>

<p>What makes it special for winter:</p>
<ul>
  <li><strong>Live music nightly</strong> from trovadores and cantautores</li>
  <li><strong>Authentic Chiapas coffee</strong>—some of Mexico's finest</li>
  <li><strong>Cozy evening atmosphere</strong> perfect for winter nights</li>
  <li><strong>Craft beer and wine</strong> for those who want something stronger</li>
  <li><strong>Breakfast served 9 AM to 1 PM</strong> daily</li>
</ul>

<p>Visitors recommend coming for the Wednesday tribute shows—just make sure to reserve ahead. It's the perfect place to read a book, share a moment with someone special, or simply enjoy being alone with a cup of excellent coffee.</p>

<p><em>Best for: Music lovers, evening hangouts, romantic dates</em></p>

<h2>4. Las Castañas - Historic Charm & Sweet Treats</h2>

<figure class="my-8">
  <img src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/cafes/las-castanas.jpg" alt="Delicious cupcakes and pastries displayed at Las Castañas bakery in San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-center text-sm text-gray-500 mt-2">Las Castañas' famous cupcakes and pastries - Photo: @lascastanas</figcaption>
</figure>

<p><strong>Address:</strong> Av. Venustiano Carranza 1325, Tequisquiapan (and Centro at Independencia #800)</p>

<p>With over 124,000 Instagram followers, Las Castañas has earned its reputation as one of the cutest coffee shops in San Luis Potosí. Located across from the beloved Tequis Church on Carranza Avenue, this bakery and café combines historic charm with delicious treats.</p>

<p>What makes it special for winter:</p>
<ul>
  <li><strong>Famous mango cupcakes</strong> and seasonal specialties</li>
  <li><strong>Beautiful Christmas ornaments</strong> and decorations for sale</li>
  <li><strong>Hot chocolate</strong> perfect for cold mornings</li>
  <li><strong>Clean, inviting atmosphere</strong> with friendly staff</li>
  <li><strong>Central location</strong> perfect for exploring the historic center</li>
</ul>

<p>Beyond coffee, Las Castañas offers a variety of scrumptious cookies, cakes, and desserts that pair perfectly with their hot beverages. It's a place where you can shop for gifts while enjoying your latte.</p>

<p><em>Best for: Sweet tooth lovers, shoppers, families</em></p>

<h2>5. Halva Café - Instagrammable French Pastry</h2>

<figure class="my-8">
  <img src="https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/cafes/halva-cafe.jpg" alt="Instagrammable interior and French pastries at Halva Café in San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-center text-sm text-gray-500 mt-2">Halva Café's experimental French pastries and beautiful interior - Photo: @halvacafe.mx</figcaption>
</figure>

<p><strong>Address:</strong> Av. Venustiano Carranza 1190, Tequisquiapan (corner of Jardín de Tequis)</p>

<p>Part of Casa H, Halva Café is where French pastry techniques meet Mexican creativity. Led by Chef Daniel Solis and his team, this experimental bakery has created something truly unique in San Luis Potosí's café scene.</p>

<p>What makes it special for winter:</p>
<ul>
  <li><strong>Experimental bakery</strong> with unique flavors you won't find elsewhere</li>
  <li><strong>French pastry touches</strong> in every creation</li>
  <li><strong>Super-Instagrammable interior</strong> design</li>
  <li><strong>Variety of sweet breads</strong> and specialty drinks</li>
  <li><strong>Prime Tequis location</strong> overlooking the garden</li>
</ul>

<p>The café describes its philosophy as "seeking to create the best flavors in baked goods and beverages," and visitors agree that Halva is an unforgettable destination in the city.</p>

<p><em>Best for: Pastry lovers, Instagram content creators, special occasions</em></p>

<h2>Winter Café Tips for San Luis Potosí</h2>

<figure class="my-8">
  <img src="/images/blog/cafes/hot-chocolate-slp.jpg" alt="Traditional Mexican hot chocolate served in San Luis Potosí" class="w-full rounded-lg shadow-lg" />
  <figcaption class="text-center text-sm text-gray-500 mt-2">Nothing beats a cup of Mexican hot chocolate on a cold winter morning</figcaption>
</figure>

<p>Before you head out on your café tour, here are some local tips:</p>

<ul>
  <li><strong>Peak hours:</strong> Weekends from 10 AM to 1 PM can be busy. Visit early or go mid-week for a quieter experience.</li>
  <li><strong>Try the local chocolate:</strong> Mexican hot chocolate (chocolate caliente) is a winter staple—ask for it "espeso" (thick) for the full experience.</li>
  <li><strong>WiFi:</strong> Most of these cafés have free WiFi, but Capital Coffee and Café Sideral are particularly popular with remote workers.</li>
  <li><strong>Reservations:</strong> For 500 Noches on Wednesday nights, reservations are highly recommended.</li>
  <li><strong>Parking:</strong> The Tequis area (Las Castañas and Halva) can be tricky for parking—consider walking if you're nearby or using a rideshare.</li>
</ul>

<h2>Final Thoughts</h2>

<p>San Luis Potosí's café culture continues to grow, offering locals and visitors alike a diverse range of cozy spots to escape the winter chill. Whether you prefer the modern minimalism of Capital Coffee, the artistic vibes of Café Sideral, the musical evenings at 500 Noches, the sweet traditions of Las Castañas, or the experimental pastries of Halva Café, there's a warm corner waiting for you.</p>

<p>So grab your favorite book, invite a friend, or simply enjoy some solo time—these five cafés are ready to make your winter in San Luis Potosí just a little bit warmer.</p>

<p><em>Have a favorite cozy café we missed? Let us know in the comments or tag us on social media!</em></p>
`;

async function updatePost() {
  console.log('🔄 Actualizando blog post con nuevas imágenes de Supabase...\n');

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      content: updatedContent,
      content_en: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('slug', 'top-5-cozy-cafes-winter-san-luis-potosi')
    .select();

  if (error) {
    console.error('❌ Error actualizando post:', error);
    return;
  }

  console.log('✅ Blog post actualizado exitosamente!');
  console.log('📝 Post ID:', data[0]?.id);
  console.log('🔗 URL: https://www.sanluisway.com/es/blog/top-5-cozy-cafes-winter-san-luis-potosi\n');

  console.log('📸 Imágenes actualizadas:');
  console.log('  1. Capital Coffee');
  console.log('  2. Café Sideral');
  console.log('  3. 500 Noches');
  console.log('  4. Las Castañas');
  console.log('  5. Halva Café');
}

updatePost();
