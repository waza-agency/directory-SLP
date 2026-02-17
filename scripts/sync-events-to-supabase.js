/**
 * Script para sincronizar eventos del JSON a Supabase
 * Solo agrega eventos nuevos (no duplica) y actualiza fechas corregidas
 * Ejecutar: node scripts/sync-events-to-supabase.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CUTOFF = '2026-02-16T00:00:00.000Z';

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function main() {
  console.log('=== Sincronizando eventos a Supabase ===\n');

  const jsonPath = path.join(__dirname, '..', 'EVENTS_TO_IMPORT.json');
  const { events_to_add: allImportEvents } = JSON.parse(
    fs.readFileSync(jsonPath, 'utf8')
  );

  // Filter: only events from Feb 16 onwards
  const importEvents = allImportEvents.filter(e => {
    const endDate = e.end_date ? new Date(e.end_date) : new Date(e.start_date);
    return endDate >= new Date(CUTOFF);
  });

  console.log(`Eventos en JSON (futuros): ${importEvents.length}`);

  // Get existing events from DB
  const { data: dbEvents, error } = await supabase
    .from('events')
    .select('id, title, start_date, end_date, category');

  if (error) {
    console.error('Error obteniendo eventos de DB:', error);
    process.exit(1);
  }

  console.log(`Eventos actuales en DB: ${dbEvents.length}\n`);

  const dbTitleMap = {};
  for (const e of dbEvents) {
    dbTitleMap[normalizeTitle(e.title)] = e;
  }

  const toAdd = [];
  const toUpdate = [];
  const skipped = [];

  for (const event of importEvents) {
    const key = normalizeTitle(event.title);
    const existing = dbTitleMap[key];

    if (!existing) {
      toAdd.push(event);
    } else {
      // Check if dates changed
      const dbStart = existing.start_date?.slice(0, 10);
      const newStart = event.start_date?.slice(0, 10);
      if (dbStart !== newStart) {
        toUpdate.push({ id: existing.id, ...event });
      } else {
        skipped.push(event.title);
      }
    }
  }

  console.log(`Nuevos a agregar: ${toAdd.length}`);
  console.log(`A actualizar (fechas): ${toUpdate.length}`);
  console.log(`Ya existen (sin cambios): ${skipped.length}\n`);

  // Add new events
  if (toAdd.length > 0) {
    console.log('--- AGREGANDO NUEVOS ---');
    let added = 0;
    for (const event of toAdd) {
      const { error: insertErr } = await supabase.from('events').insert({
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,
        category: event.category,
        image_url: event.image_url || null,
        featured: event.featured || false,
        add_to_cultural_calendar: event.show_in_cultural_calendar || false,
      });

      if (insertErr) {
        console.log(`  X ${event.title}: ${insertErr.message}`);
      } else {
        console.log(`  + ${event.title}`);
        added++;
      }
    }
    console.log(`\nAgregados: ${added}/${toAdd.length}\n`);
  }

  // Update events with corrected dates
  if (toUpdate.length > 0) {
    console.log('--- ACTUALIZANDO FECHAS ---');
    let updated = 0;
    for (const event of toUpdate) {
      const { error: updateErr } = await supabase
        .from('events')
        .update({
          start_date: event.start_date,
          end_date: event.end_date,
          description: event.description,
        })
        .eq('id', event.id);

      if (updateErr) {
        console.log(`  X ${event.title}: ${updateErr.message}`);
      } else {
        console.log(`  ~ ${event.title}`);
        updated++;
      }
    }
    console.log(`\nActualizados: ${updated}/${toUpdate.length}\n`);
  }

  // Final count
  const { count } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });

  console.log('='.repeat(50));
  console.log(`TOTAL eventos en DB: ${count}`);
  console.log('='.repeat(50));
}

main();
