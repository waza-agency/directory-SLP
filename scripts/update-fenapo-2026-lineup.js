const fs = require('fs');
const path = require('path');

// FENAPO 2026 lineup update — verified April 18, 2026 against fenapo.slp.gob.mx,
// feriafenapo.com, Noticieros SLP, Frontal Noticias, Código San Luis.

const additions = {
  en: {
    fenapo2026: {
      hero: {
        note:
          'Lineup expanded April 2026: 3 Teatro del Pueblo + 6 Palenque artists confirmed, plus 4 pre-FENAPO events running April through May. Final dates TBC — this page updates as the fair announces more.',
      },
      stats: {
        artistsValue: '9+',
      },
      artists: {
        subtitle:
          'As of April 2026, nine artists are confirmed across Teatro del Pueblo (free with fair admission) and Palenque (paid separate ticket). More names expected as August approaches.',
        teatroNote: '3 confirmed · 2 international TBC',
        palenqueNote: '6 confirmed · cartelera complete',
        freeNotice:
          'Teatro del Pueblo concerts, mechanical rides, parking, and fair entry will be free this year per the Governor of San Luis Potosí.',
        // New artists
        keniaOs: 'Kenia Os',
        keniaOsGenre: 'Pop / Urban',
        sinBanderaGenre: 'Pop Ballad Duo',
        losAcostaGenre: 'Cumbia / Regional',
        grupoFirmeGenre: 'Regional Mexicano',
        edenMunoz: 'Edén Muñoz',
        edenMunozGenre: 'Regional Mexicano',
        gloriaTrevi: 'Gloria Trevi',
        gloriaTreviGenre: 'Pop Latino',
        losInvasores: 'Los Invasores de Nuevo León',
        losInvasoresGenre: 'Norteño',
        losCardenales: 'Los Cardenales de Nuevo León',
        losCardenalesGenre: 'Norteño',
        losViejones: 'Los Viejones de Linares',
        losViejonesGenre: 'Norteño',
      },
      preFenapo: {
        title: 'Pre-FENAPO Events at the Recinto Ferial',
        subtitle:
          'The fairgrounds are already hosting events ahead of the main August celebration. A great way to experience the venue before the crowds.',
        event1Date: 'April 18, 2026',
        event1Title: 'Duelo de Acordeones',
        event1Desc: 'Regional norteño competition featuring local and touring accordion acts.',
        event2Date: 'April 24, 2026',
        event2Title: 'Victor Mendivil + Kevin AMF',
        event2Desc: 'Regional Mexicano double bill at the Recinto Ferial.',
        event3Date: 'May 16, 2026',
        event3Title: 'San Luis Metal Fest 2026',
        event3Desc: 'Mexico\'s biggest potosino metal festival. Full coverage on our event page.',
        event4Date: 'May 22–24, 2026',
        event4Title: 'Copa Libertadores 2026 (Volleyball)',
        event4Desc: 'International volleyball tournament at the fair pavilions.',
      },
      quickAnswer: {
        title: 'FENAPO 2026 at a glance',
        definition:
          'FENAPO 2026 — the 77th edition of Mexico\'s Feria Nacional Potosina — takes place in August 2026 at the Recinto Ferial on Av. Fco. Martínez de la Vega, San Luis Potosí. As of April 2026, nine headliners are confirmed (three for the free Teatro del Pueblo and six for the paid Palenque), with fair entry, rides, parking, and Teatro del Pueblo concerts free for attendees. The Palenque cartelera is complete; Teatro del Pueblo is 90% confirmed with two international artists pending announcement. Pre-FENAPO events are already running at the fairgrounds from April through May.',
        keyFactsTitle: 'Key facts (verified April 18, 2026)',
      },
      sources: {
        title: 'Sources used on this page',
      },
    },
  },
  es: {
    fenapo2026: {
      hero: {
        note:
          'Cartelera ampliada abril 2026: 3 artistas en Teatro del Pueblo + 6 en Palenque confirmados, además de 4 eventos pre-FENAPO entre abril y mayo. Fechas finales por confirmar — esta página se actualiza conforme se anuncian más artistas.',
      },
      stats: {
        artistsValue: '9+',
      },
      artists: {
        subtitle:
          'A abril de 2026 hay nueve artistas confirmados entre Teatro del Pueblo (gratis con entrada a la feria) y Palenque (boleto aparte). Más nombres se anunciarán conforme se acerca agosto.',
        teatroNote: '3 confirmados · 2 internacionales por confirmar',
        palenqueNote: '6 confirmados · cartelera completa',
        freeNotice:
          'Los conciertos del Teatro del Pueblo, juegos mecánicos, estacionamiento y entrada a la feria serán gratuitos este año por decreto del Gobernador de San Luis Potosí.',
        keniaOs: 'Kenia Os',
        keniaOsGenre: 'Pop / Urbano',
        sinBanderaGenre: 'Balada Pop (dúo)',
        losAcostaGenre: 'Cumbia / Regional',
        grupoFirmeGenre: 'Regional Mexicano',
        edenMunoz: 'Edén Muñoz',
        edenMunozGenre: 'Regional Mexicano',
        gloriaTrevi: 'Gloria Trevi',
        gloriaTreviGenre: 'Pop Latino',
        losInvasores: 'Los Invasores de Nuevo León',
        losInvasoresGenre: 'Norteño',
        losCardenales: 'Los Cardenales de Nuevo León',
        losCardenalesGenre: 'Norteño',
        losViejones: 'Los Viejones de Linares',
        losViejonesGenre: 'Norteño',
      },
      preFenapo: {
        title: 'Eventos Pre-FENAPO en el Recinto Ferial',
        subtitle:
          'El recinto ya está recibiendo eventos antes de la celebración principal de agosto. Gran oportunidad para conocer el lugar antes de que lleguen las multitudes.',
        event1Date: '18 de abril, 2026',
        event1Title: 'Duelo de Acordeones',
        event1Desc: 'Competencia regional norteña con grupos locales y en gira.',
        event2Date: '24 de abril, 2026',
        event2Title: 'Victor Mendivil + Kevin AMF',
        event2Desc: 'Doble cartel de regional mexicano en el Recinto Ferial.',
        event3Date: '16 de mayo, 2026',
        event3Title: 'San Luis Metal Fest 2026',
        event3Desc: 'El festival metalero más grande de SLP. Cobertura completa en nuestra página de evento.',
        event4Date: '22–24 de mayo, 2026',
        event4Title: 'Copa Libertadores 2026 (Voleibol)',
        event4Desc: 'Torneo internacional de voleibol en los pabellones de la feria.',
      },
      quickAnswer: {
        title: 'FENAPO 2026 en breve',
        definition:
          'La FENAPO 2026 — la edición 77 de la Feria Nacional Potosina de México — se celebra en agosto de 2026 en el Recinto Ferial de la Av. Fco. Martínez de la Vega, San Luis Potosí. A abril de 2026 hay nueve artistas confirmados (tres para el Teatro del Pueblo gratis y seis para el Palenque de boleto pagado), con entrada, juegos mecánicos, estacionamiento y conciertos del Teatro del Pueblo gratuitos para los asistentes. La cartelera del Palenque está completa; el Teatro del Pueblo está 90% confirmado con dos artistas internacionales pendientes. Eventos pre-FENAPO ya están corriendo en el recinto de abril a mayo.',
        keyFactsTitle: 'Datos clave (verificados 18 de abril, 2026)',
      },
      sources: {
        title: 'Fuentes consultadas',
      },
    },
  },
};

additions.de = JSON.parse(JSON.stringify(additions.en));
additions.ja = JSON.parse(JSON.stringify(additions.en));

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = target[key] || {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

for (const locale of ['en', 'es', 'de', 'ja']) {
  const filePath = path.join(__dirname, '..', 'public', 'locales', locale, 'common.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  deepMerge(data, additions[locale]);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${locale}/common.json`);
}
console.log('Done.');
