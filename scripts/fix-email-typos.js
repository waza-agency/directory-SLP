/**
 * Script para corregir typos en emails de suscriptores de Beehiiv
 * Elimina el suscriptor con email incorrecto y lo recrea con el correcto
 * Ejecutar: node scripts/fix-email-typos.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

const CORRECTIONS = [
  { wrong: 'yo@hotmsil.com', correct: 'yo@hotmail.com' },
  { wrong: 'racielrodriguez1977@gmqil.com', correct: 'racielrodriguez1977@gmail.com' },
  { wrong: 'jaibolucas@hotmeil.com', correct: 'jaibolucas@hotmail.com' },
  { wrong: 'alfredodavidesparzamendoza@gotmail.com', correct: 'alfredodavidesparzamendoza@hotmail.com' },
  { wrong: 'hybridreactor@gnail.com', correct: 'hybridreactor@gmail.com' },
  { wrong: 'abogadoeliasslp@hmail.com', correct: 'abogadoeliasslp@hotmail.com' },
  { wrong: 'alesitafigueroa.22@icloud.com.com', correct: 'alesitafigueroa.22@icloud.com' },
  { wrong: 'yiyis1505@gmail.comy', correct: 'yiyis1505@gmail.com' },
  { wrong: 'pichardo38@hotmail.con', correct: 'pichardo38@hotmail.com' },
  { wrong: 'soteloisaac76@gmail.com8', correct: 'soteloisaac76@gmail.com' },
  { wrong: 'albertoyubaile@gmail.com.mx', correct: 'albertoyubaile@gmail.com' },
  { wrong: 'serranopablo@hotmal.com', correct: 'serranopablo@hotmail.com' },
  { wrong: 'mariacossio11@gmail.con', correct: 'mariacossio11@gmail.com' },
  { wrong: 'muro.md@hotmail.con', correct: 'muro.md@hotmail.com' },
];

const headers = {
  'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
  'Content-Type': 'application/json',
};

async function findSubscriber(email) {
  const params = new URLSearchParams({ email: email.toLowerCase() });
  const url = `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions?${params}`;
  const res = await fetch(url, { method: 'GET', headers });
  const data = await res.json();
  return data.data?.[0] || null;
}

async function deleteSubscriber(subscriptionId) {
  const url = `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions/${subscriptionId}`;
  const res = await fetch(url, { method: 'DELETE', headers });
  return res.ok;
}

async function createSubscriber(email) {
  const url = `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: email.toLowerCase().trim(),
      reactivate_existing: true,
      send_welcome_email: false,
      utm_source: 'typo_correction',
      referring_site: 'https://www.sanluisway.com',
    }),
  });
  const data = await res.json();
  return { success: res.ok, data };
}

async function main() {
  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    console.error('Error: Faltan BEEHIIV_API_KEY o BEEHIIV_PUBLICATION_ID en .env');
    process.exit(1);
  }

  console.log('=== Corrigiendo typos en emails de Beehiiv ===\n');
  console.log(`Correcciones a procesar: ${CORRECTIONS.length}\n`);

  let fixed = 0;
  let skipped = 0;
  let errors = 0;
  const results = [];

  for (const { wrong, correct } of CORRECTIONS) {
    console.log(`\n--- ${wrong} -> ${correct}`);

    try {
      const subscriber = await findSubscriber(wrong);

      if (!subscriber) {
        console.log('   SKIP: No encontrado en Beehiiv');
        skipped++;
        results.push({ wrong, correct, status: 'skipped', reason: 'not found' });
        continue;
      }

      const deleted = await deleteSubscriber(subscriber.id);
      if (!deleted) {
        console.log('   ERROR: No se pudo eliminar');
        errors++;
        results.push({ wrong, correct, status: 'error', reason: 'delete failed' });
        continue;
      }
      console.log(`   Eliminado: ${wrong}`);

      await new Promise(r => setTimeout(r, 300));

      const created = await createSubscriber(correct);
      if (!created.success) {
        console.log(`   ERROR creando: ${JSON.stringify(created.data)}`);
        errors++;
        results.push({ wrong, correct, status: 'error', reason: 'create failed' });
        continue;
      }

      console.log(`   Creado: ${correct}`);
      fixed++;
      results.push({ wrong, correct, status: 'fixed' });
    } catch (err) {
      console.log(`   EXCEPTION: ${err.message}`);
      errors++;
      results.push({ wrong, correct, status: 'error', reason: err.message });
    }

    await new Promise(r => setTimeout(r, 300));
  }

  // Actualizar beehiiv_all_emails.txt
  const emailsPath = path.join(__dirname, '..', 'beehiiv_all_emails.txt');
  if (fs.existsSync(emailsPath)) {
    let content = fs.readFileSync(emailsPath, 'utf8');
    for (const r of results.filter(r => r.status === 'fixed')) {
      content = content.replace(r.wrong, r.correct);
    }
    fs.writeFileSync(emailsPath, content);
    console.log(`\nActualizado beehiiv_all_emails.txt`);
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log('RESUMEN');
  console.log('='.repeat(50));
  console.log(`Corregidos: ${fixed}`);
  console.log(`Saltados: ${skipped}`);
  console.log(`Errores: ${errors}`);
  console.log('='.repeat(50));
}

main();
