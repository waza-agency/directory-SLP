// Script para actualizar los listings existentes para que sean comprables
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Inicializar el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or key is missing. Please check your environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateListings() {
  try {
    console.log('Actualizando listings para que sean comprables...');
    
    // Actualizar todos los listings para que sean comprables
    const { data: places, error: placesError } = await supabase
      .from('places')
      .select('id, name, price, inventory, is_purchasable, category');

    if (placesError) {
      throw placesError;
    }

    console.log(`Se encontraron ${places.length} listings.`);

    // Actualizamos cada listing
    let updatedCount = 0;
    for (const place of places) {
      let newPrice = place.price;
      
      // Si no tiene precio o es 0, asignamos uno según la categoría
      if (!newPrice || newPrice <= 0) {
        if (place.category === 'Technology') {
          newPrice = 650;
        } else if (place.category === 'Food') {
          newPrice = 80;
        } else if (place.category === 'Services') {
          newPrice = 150;
        } else {
          newPrice = 100;
        }
      }

      const { error } = await supabase
        .from('places')
        .update({
          is_purchasable: true,
          inventory: 10,
          price: newPrice
        })
        .eq('id', place.id);

      if (error) {
        console.error(`Error al actualizar ${place.name}:`, error);
      } else {
        updatedCount++;
      }
    }

    console.log(`Se actualizaron exitosamente ${updatedCount} de ${places.length} listings.`);

    // Verificar los cambios
    const { data: updatedPlaces, error: verifyError } = await supabase
      .from('places')
      .select('id, name, price, inventory, is_purchasable, category');
    
    if (verifyError) {
      throw verifyError;
    }

    console.log('Listings actualizados:');
    updatedPlaces.forEach(place => {
      console.log(`- ${place.name}: $${place.price}, Inventory: ${place.inventory}, Purchasable: ${place.is_purchasable}, Category: ${place.category}`);
    });

  } catch (error) {
    console.error('Error al actualizar los listings:', error);
  }
}

updateListings()
  .then(() => console.log('Proceso completado.'))
  .catch(err => console.error('Error en el proceso:', err)); 