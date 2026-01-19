/**
 * Script para agregar nuevos leads a Beehiiv (solo los que no existen)
 * Ejecutar: node scripts/add-new-leads-to-beehiiv.js path/to/leads.csv
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

async function addSubscriber(email, name) {
  const response = await fetch(
    `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
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

function parseCSV(content) {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^\ufeff/, ''));

  const emailIndex = headers.findIndex(h => h.toLowerCase() === 'email');
  const nameIndex = headers.findIndex(h => h.toLowerCase() === 'name');

  if (emailIndex === -1) {
    throw new Error('No se encontró columna "Email" en el CSV');
  }

  const leads = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV with quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const email = values[emailIndex]?.toLowerCase().trim();
    const name = values[nameIndex]?.trim() || '';

    if (email && email.includes('@')) {
      leads.push({ email, name });
    }
  }

  return leads;
}

async function main() {
  const csvPath = process.argv[2];

  if (!csvPath) {
    console.error('Uso: node scripts/add-new-leads-to-beehiiv.js <path-to-csv>');
    console.error('Ejemplo: node scripts/add-new-leads-to-beehiiv.js "C:\\Users\\sango\\Downloads\\leads (14).csv"');
    process.exit(1);
  }

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    console.error('Error: Faltan BEEHIIV_API_KEY o BEEHIIV_PUBLICATION_ID en .env');
    process.exit(1);
  }

  console.log('=== Agregando nuevos leads a Beehiiv ===\n');

  // Leer emails existentes
  const existingEmailsPath = path.join(__dirname, '..', 'beehiiv_all_emails.txt');
  let existingEmails = new Set();

  if (fs.existsSync(existingEmailsPath)) {
    const existingContent = fs.readFileSync(existingEmailsPath, 'utf8');
    existingEmails = new Set(
      existingContent.split('\n')
        .map(e => e.toLowerCase().trim().replace(/^\ufeff/, ''))
        .filter(e => e)
    );
    console.log(`Emails existentes en Beehiiv: ${existingEmails.size}`);
  } else {
    console.log('Advertencia: No se encontró beehiiv_all_emails.txt');
  }

  // Leer CSV
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const allLeads = parseCSV(csvContent);
  console.log(`Total de leads en CSV: ${allLeads.length}`);

  // Filtrar solo los nuevos
  const newLeads = allLeads.filter(lead => !existingEmails.has(lead.email.toLowerCase()));
  console.log(`Leads nuevos a agregar: ${newLeads.length}\n`);

  if (newLeads.length === 0) {
    console.log('No hay leads nuevos para agregar.');
    return;
  }

  let success = 0;
  let failed = 0;
  const addedEmails = [];

  for (const lead of newLeads) {
    try {
      const result = await addSubscriber(lead.email, lead.name);
      if (result.success) {
        console.log(`✅ ${lead.email} - ${lead.name}`);
        success++;
        addedEmails.push(lead.email);
      } else {
        console.log(`❌ ${lead.email} - Error: ${result.data?.message || JSON.stringify(result.data)}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${lead.email} - Exception: ${error.message}`);
      failed++;
    }

    // Delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  // Actualizar archivo de emails existentes
  if (addedEmails.length > 0) {
    const newEmailsContent = addedEmails.join('\n') + '\n';
    fs.appendFileSync(existingEmailsPath, newEmailsContent);
    console.log(`\nActualizado beehiiv_all_emails.txt con ${addedEmails.length} nuevos emails`);
  }

  console.log(`\n=== Resumen ===`);
  console.log(`✅ Agregados: ${success}`);
  console.log(`❌ Fallidos: ${failed}`);
  console.log(`⏭️  Ya existían: ${allLeads.length - newLeads.length}`);
}

main();
