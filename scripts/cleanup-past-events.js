/**
 * Script para eliminar eventos con fecha anterior a hoy de Supabase
 * Ejecutar: node scripts/cleanup-past-events.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CUTOFF_DATE = '2026-02-16T00:00:00.000Z';

async function main() {
  console.log('=== Limpieza de eventos pasados ===\n');
  console.log(`Fecha de corte: ${CUTOFF_DATE}\n`);

  const { data: allEvents, error } = await supabase
    .from('events')
    .select('id, title, start_date, end_date, category')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error obteniendo eventos:', error);
    process.exit(1);
  }

  console.log(`Total de eventos en DB: ${allEvents.length}\n`);

  const cutoff = new Date(CUTOFF_DATE);
  const pastEvents = allEvents.filter(e => {
    const endDate = e.end_date ? new Date(e.end_date) : null;
    const startDate = new Date(e.start_date);
    if (endDate) return endDate < cutoff;
    return startDate < cutoff;
  });

  const futureEvents = allEvents.filter(e => !pastEvents.find(p => p.id === e.id));

  console.log(`Eventos pasados a eliminar: ${pastEvents.length}`);
  console.log(`Eventos futuros a mantener: ${futureEvents.length}\n`);

  if (pastEvents.length === 0) {
    console.log('No hay eventos pasados para eliminar.');
    return;
  }

  console.log('Eventos a eliminar:');
  pastEvents.forEach((e, i) => {
    console.log(`  ${i + 1}. ${e.title} | ${e.start_date} | ${e.category}`);
  });

  const ids = pastEvents.map(e => e.id);
  const { error: delError } = await supabase
    .from('events')
    .delete()
    .in('id', ids);

  if (delError) {
    console.error('\nError eliminando:', delError);
    process.exit(1);
  }

  console.log(`\nEliminados: ${pastEvents.length} eventos pasados`);

  console.log('\nEventos que permanecen:');
  futureEvents.forEach((e, i) => {
    console.log(`  ${i + 1}. ${e.title} | ${e.start_date} | ${e.category}`);
  });
}

main();
