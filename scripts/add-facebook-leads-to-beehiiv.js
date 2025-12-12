/**
 * Script para agregar leads de Facebook a Beehiiv
 * Ejecutar: node scripts/add-facebook-leads-to-beehiiv.js
 */

require('dotenv').config();

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

const newSubscribers = [
  { email: 'smedina@altersa.com.mx', name: 'Salvador MedinaAlmazan' },
  { email: 'francisco-emilio.ramirez@valeo.com', name: 'Francisco Ramirez' },
  { email: 'dannyelgto@hotmail.com', name: 'Daniel Salazar' },
  { email: 'ngasga@izzi.mx', name: 'Nee-yuu Nel' },
  { email: 'audiologiaslp@gmail.com', name: 'Javier Pedraza' },
  { email: 'promocionesacmk@gmail.com', name: 'Alesander Kamatxo' },
  { email: 'juliojuliom@yahoo.es', name: 'Julio César Mondragón Prieto' },
  { email: 'igarcia74de@gmail.com', name: 'Vivi Garcia' },
  { email: 'maya78220@gmail.com', name: 'maetha sanchez' },
  { email: 'tere_p@yahoo.com', name: 'Tere Pedroza Tobias' },
  { email: 'juanyyake8@gmail.com', name: 'Juan Carlos Estrada Rodriguez' },
  { email: 'ys313931@gmail.com', name: 'Pau Bravo' },
  { email: 'jozztb87@gmail.com', name: 'José Torres Bueno' },
  { email: 'balieiro.aisatours@gmail.com', name: 'Claudia Balieiro' },
  { email: 'm.fersa70@gmail.com', name: 'Miguel Ferrer Sanchez Gaspar' },
  { email: 'marcmarin71@gmail.com', name: 'Marco Marin' },
];

async function addSubscriber(email) {
  const response = await fetch(
    `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'facebook_ads',
        utm_medium: 'lead_ad',
        referring_site: 'https://www.sanluisway.com',
      }),
    }
  );

  const result = await response.json();
  return { success: response.ok, data: result };
}

async function main() {
  console.log('=== Agregando leads de Facebook a Beehiiv ===\n');

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    console.error('Error: Faltan BEEHIIV_API_KEY o BEEHIIV_PUBLICATION_ID en .env');
    process.exit(1);
  }

  let success = 0;
  let failed = 0;

  for (const sub of newSubscribers) {
    try {
      const result = await addSubscriber(sub.email);
      if (result.success) {
        console.log(`✅ ${sub.email} - ${sub.name}`);
        success++;
      } else {
        console.log(`❌ ${sub.email} - Error: ${result.data?.message || JSON.stringify(result.data)}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${sub.email} - Exception: ${error.message}`);
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n=== Resumen ===`);
  console.log(`✅ Agregados: ${success}`);
  console.log(`❌ Fallidos: ${failed}`);
}

main();
