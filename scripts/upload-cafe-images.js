const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const imagesFolder = 'C:\\Users\\sango\\Downloads\\post cafes';

// Mapeo de archivos locales a nombres en Supabase
const imageMapping = {
  'capital-coffee.jpeg': 'capital-coffee.jpg',
  'cafe-sideral.jpg': 'cafe-sideral.jpg',
  '500-noches-cafe.jpg': '500-noches.jpg',
  'las-castañas.webp': 'las-castanas.jpg', // Convertimos a jpg para consistencia
  'halva-cafe.jpeg': 'halva-cafe.jpg'
};

async function uploadImages() {
  console.log('🚀 Iniciando subida de imágenes de cafés a Supabase...\n');

  for (const [localFile, supabaseFile] of Object.entries(imageMapping)) {
    try {
      const localPath = path.join(imagesFolder, localFile);

      // Verificar que el archivo existe
      if (!fs.existsSync(localPath)) {
        console.log(`⚠️  Archivo no encontrado: ${localFile}`);
        continue;
      }

      console.log(`📤 Subiendo ${localFile} como ${supabaseFile}...`);

      // Leer el archivo
      const fileBuffer = fs.readFileSync(localPath);

      // Determinar content type
      const ext = path.extname(localFile).toLowerCase();
      let contentType = 'image/jpeg';
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.webp') contentType = 'image/webp';

      // Subir a Supabase Storage en el bucket blog-images
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(`cafes/${supabaseFile}`, fileBuffer, {
          contentType: contentType,
          upsert: true // Sobrescribir si ya existe
        });

      if (error) {
        console.error(`❌ Error subiendo ${localFile}:`, error.message);
        continue;
      }

      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(`cafes/${supabaseFile}`);

      console.log(`✅ ${supabaseFile} subido exitosamente`);
      console.log(`   URL: ${publicUrlData.publicUrl}\n`);

    } catch (error) {
      console.error(`❌ Error procesando ${localFile}:`, error.message);
    }
  }

  console.log('🎉 Proceso de subida completado!');
}

uploadImages();
