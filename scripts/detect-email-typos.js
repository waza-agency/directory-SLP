/**
 * Script para detectar typos en emails y sugerir correcciones
 * Ejecutar: node scripts/detect-email-typos.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Typos comunes en dominios
const COMMON_TYPOS = {
  'gmqil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gotmail.com': 'gmail.com',
  'hotmeil.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hmail.com': 'gmail.com', // Asumiendo gmail
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'icloud.com.com': 'icloud.com',
  'gmail.comy': 'gmail.com',
  'gmail.com.mx': 'gmail.com',
  'hotmail.con': 'hotmail.com',
  'gmail.con': 'gmail.com',
  'yahoo.com.mx': 'yahoo.com',
  'outlook.con': 'outlook.com',
};

function detectTypo(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return null;

  const [localPart, domain] = parts;

  if (COMMON_TYPOS[domain]) {
    return {
      original: email,
      localPart,
      wrongDomain: domain,
      correctDomain: COMMON_TYPOS[domain],
      suggested: `${localPart}@${COMMON_TYPOS[domain]}`
    };
  }

  return null;
}

function main() {
  console.log('=== Analizando Typos en Emails ===\n');

  // Leer emails existentes
  const emailsPath = path.join(__dirname, '..', 'beehiiv_all_emails.txt');

  if (!fs.existsSync(emailsPath)) {
    console.error('❌ No se encontró beehiiv_all_emails.txt');
    process.exit(1);
  }

  const content = fs.readFileSync(emailsPath, 'utf8');
  const emails = content.split('\n')
    .map(e => e.toLowerCase().trim())
    .filter(e => e);

  console.log(`📧 Total de emails en base: ${emails.length}\n`);

  const emailSet = new Set(emails);
  const typosFound = [];
  const corrections = [];

  // Buscar typos
  for (const email of emails) {
    const typo = detectTypo(email);
    if (typo) {
      typosFound.push(typo);

      // Verificar si la versión correcta existe
      const correctExists = emailSet.has(typo.suggested);

      corrections.push({
        ...typo,
        correctExists,
        action: correctExists ? 'DUPLICATE - Eliminar typo' : 'CORREGIR - Actualizar email'
      });
    }
  }

  console.log(`🔍 Typos encontrados: ${typosFound.length}\n`);

  if (corrections.length === 0) {
    console.log('✅ No se encontraron typos en los emails!');
    return;
  }

  // Mostrar resultados
  console.log('📋 REPORTE DE TYPOS DETECTADOS:\n');
  console.log('='.repeat(80));

  const duplicates = corrections.filter(c => c.correctExists);
  const toCorrect = corrections.filter(c => !c.correctExists);

  if (duplicates.length > 0) {
    console.log('\n🔴 DUPLICADOS (Versión correcta existe - Eliminar typo):');
    console.log('-'.repeat(80));
    duplicates.forEach((item, i) => {
      console.log(`${i + 1}. ❌ ${item.original}`);
      console.log(`   ✅ ${item.suggested} (ya existe)`);
      console.log('');
    });
  }

  if (toCorrect.length > 0) {
    console.log('\n🟡 CORRECCIONES (Actualizar email):');
    console.log('-'.repeat(80));
    toCorrect.forEach((item, i) => {
      console.log(`${i + 1}. ❌ ${item.original}`);
      console.log(`   ✅ ${item.suggested} (sugerido)`);
      console.log('');
    });
  }

  // Guardar reporte
  const reportPath = path.join(__dirname, 'email-typos-report.json');
  const report = {
    generatedAt: new Date().toISOString(),
    totalEmails: emails.length,
    typosFound: corrections.length,
    duplicates: duplicates.length,
    toCorrect: toCorrect.length,
    details: corrections
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('📊 RESUMEN:');
  console.log('='.repeat(80));
  console.log(`Total de emails: ${emails.length}`);
  console.log(`Typos encontrados: ${corrections.length}`);
  console.log(`  - Duplicados (eliminar): ${duplicates.length}`);
  console.log(`  - Para corregir: ${toCorrect.length}`);
  console.log('='.repeat(80));
  console.log(`\n📄 Reporte JSON guardado: ${reportPath}`);

  // Crear lista de acciones
  const actionsPath = path.join(__dirname, 'email-corrections-actions.txt');
  const actions = [
    'ACCIONES SUGERIDAS PARA BEEHIIV',
    '='.repeat(80),
    '',
    'DUPLICADOS - Eliminar estos emails (versión correcta ya existe):',
    ...duplicates.map(d => `- ${d.original}`),
    '',
    'CORRECCIONES - Actualizar estos emails manualmente en Beehiiv:',
    ...toCorrect.map(d => `- ${d.original} → ${d.suggested}`),
    '',
    'NOTA: Beehiiv no permite actualizar emails vía API.',
    'Debes hacer estas correcciones manualmente en el dashboard de Beehiiv.',
  ].join('\n');

  fs.writeFileSync(actionsPath, actions);
  console.log(`📝 Lista de acciones guardada: ${actionsPath}\n`);
}

main();
