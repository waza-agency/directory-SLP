const fs = require('fs');
const path = require('path');
const http = require('http');

function makeRequest(postData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(postData);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/blog/create-post',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          reject(new Error('Error parsing response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function publishPost() {
  try {
    const contentPath = path.join(__dirname, '..', 'blog-post-costo-de-vida-slp-2025.html');
    const content = fs.readFileSync(contentPath, 'utf-8');

    const postData = {
      title: 'Análisis 2025 del Costo de Vida Real en San Luis Potosí: ¿Cuánto necesitas para vivir cómodamente?',
      slug: 'costo-de-vida-san-luis-potosi-2025',
      excerpt: 'Descubre cuánto dinero necesitas realmente para vivir bien en San Luis Potosí en 2025. Análisis profundo con datos verificables sobre vivienda, alimentación, transporte, salud y más. Incluye 3 presupuestos mensuales completos y comparación con otras ciudades del Bajío.',
      content: content,
      category: 'Expat Guide',
      tags: ['costo de vida', 'expatriados', 'repatriados', 'presupuesto', 'mudanza', 'San Luis Potosí', 'vivienda', 'gastos mensuales'],
      image_url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&h=900&fit=crop&q=80',
      title_en: 'Real Cost of Living Analysis 2025 in San Luis Potosí: How Much Do You Need to Live Comfortably?',
      excerpt_en: 'Discover how much money you really need to live well in San Luis Potosí in 2025. In-depth analysis with verifiable data on housing, food, transportation, healthcare and more. Includes 3 complete monthly budgets and comparison with other cities in the Bajío region.',
      content_en: content
    };

    console.log('Publicando post vía API...');
    console.log('Servidor: http://localhost:3000\n');

    const response = await makeRequest(postData);

    if (response.status !== 201 && response.status !== 200) {
      if (response.status === 409) {
        console.log('⚠️  El post ya existe en el blog.');
        console.log(`Slug: ${response.data.slug}`);
        console.log('\nSi deseas actualizarlo, debes eliminarlo primero desde la base de datos.');
        return;
      }
      throw new Error(response.data.error || 'Error al crear el post');
    }

    console.log('\n✅ ¡Post publicado exitosamente!');
    console.log('\nDetalles del post:');
    console.log('─'.repeat(60));
    console.log(`ID: ${response.data.post.id}`);
    console.log(`Título: ${response.data.post.title}`);
    console.log(`Slug: ${response.data.post.slug}`);
    console.log('─'.repeat(60));
    console.log(`\n🔗 URL del post: ${response.data.post.url}`);
    console.log(`\nPuedes ver el post en: http://localhost:3000${response.data.post.url}`);

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('\n❌ Error: No se pudo conectar al servidor.');
      console.error('Por favor asegúrate de que el servidor de desarrollo esté corriendo:');
      console.error('  npm run dev');
    } else {
      console.error('\n❌ Error al publicar el post:', error.message);
    }
    process.exit(1);
  }
}

publishPost();
