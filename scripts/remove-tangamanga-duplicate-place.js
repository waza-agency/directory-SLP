/**
 * Script para eliminar entrada duplicada de "Parque Tangamanga I" de la tabla places
 * Ya que tenemos una página estática optimizada en /parque-tangamanga
 *
 * Ejecutar: node scripts/remove-tangamanga-duplicate-place.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log('=== Buscando y eliminando entrada duplicada de Parque Tangamanga ===\n');

  try {
    // Buscar todas las entradas que contengan "Tangamanga" en el nombre
    const { data: places, error: searchError } = await supabase
      .from('places')
      .select('id, name, category, description')
      .ilike('name', '%tangamanga%');

    if (searchError) {
      console.error('❌ Error al buscar:', searchError.message);
      return;
    }

    if (!places || places.length === 0) {
      console.log('✅ No se encontraron entradas de Tangamanga en la base de datos');
      return;
    }

    console.log(`📍 Encontradas ${places.length} entrada(s) de Tangamanga:\n`);
    places.forEach((place, index) => {
      console.log(`${index + 1}. ID: ${place.id}`);
      console.log(`   Nombre: ${place.name}`);
      console.log(`   Categoría: ${place.category || 'N/A'}`);
      console.log(`   Descripción: ${place.description?.substring(0, 100)}...`);
      console.log('');
    });

    // Confirmar eliminación
    console.log('⚠️  Se procederá a eliminar estas entradas de la base de datos...');
    console.log('⚠️  La página estática /parque-tangamanga seguirá funcionando.\n');

    let deletedCount = 0;
    let failedCount = 0;

    for (const place of places) {
      const { error: deleteError } = await supabase
        .from('places')
        .delete()
        .eq('id', place.id);

      if (deleteError) {
        console.log(`❌ Error al eliminar "${place.name}" (ID: ${place.id}): ${deleteError.message}`);
        failedCount++;
      } else {
        console.log(`✅ Eliminado: "${place.name}" (ID: ${place.id})`);
        deletedCount++;
      }
    }

    console.log(`\n=== Resumen ===`);
    console.log(`✅ Eliminados: ${deletedCount}`);
    console.log(`❌ Fallidos: ${failedCount}`);
    console.log(`\n📄 La página estática optimizada sigue disponible en: /parque-tangamanga`);

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

main();
