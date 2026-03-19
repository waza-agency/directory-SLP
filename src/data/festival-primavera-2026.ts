export interface FestivalConcert {
  date: string;
  day: string;
  artist: string;
  venue: string;
  time: string;
  genre?: string;
  highlight?: boolean;
}

export interface FestivalVenue {
  name: string;
  type: string;
}

export const headliners: FestivalConcert[] = [
  { date: '2026-03-28', day: 'Sáb 28 Mar', artist: 'Miguel Bosé', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Pop', highlight: true },
  { date: '2026-03-29', day: 'Dom 29 Mar', artist: 'Gente de Zona', venue: 'Plaza de Aranzazú', time: '19:00', genre: 'Reggaetón/Tropical' },
  { date: '2026-03-29', day: 'Dom 29 Mar', artist: 'Guelaguetza de Oaxaca (320 participantes)', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Folklor', highlight: true },
  { date: '2026-03-30', day: 'Lun 30 Mar', artist: 'Gilberto Santa Rosa', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Salsa', highlight: true },
  { date: '2026-03-31', day: 'Mar 31 Mar', artist: 'Daniela Spalla', venue: 'Plaza de Aranzazú', time: '19:00', genre: 'Pop/Jazz' },
  { date: '2026-03-31', day: 'Mar 31 Mar', artist: 'Lucero', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Pop', highlight: true },
  { date: '2026-04-01', day: 'Mié 1 Abr', artist: 'Jazz & Flow + Orquesta Nacional de Jazz', venue: 'Plaza de Aranzazú', time: '19:00', genre: 'Jazz/Freestyle' },
  { date: '2026-04-01', day: 'Mié 1 Abr', artist: 'Diego El Cigala', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Flamenco', highlight: true },
  { date: '2026-04-02', day: 'Jue 2 Abr', artist: 'Homenaje a Juan Gabriel — Banquells, María del Sol, Carlos Cuevas + Big Band Jazz', venue: 'Teatro de la Paz', time: '18:00', genre: 'Homenaje' },
  { date: '2026-04-02', day: 'Jue 2 Abr', artist: 'Humanicorp "El renacer del colibrí"', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Teatro/Show' },
  { date: '2026-04-03', day: 'Vie 3 Abr', artist: 'Procesión del Silencio (73ª edición)', venue: 'Centro Histórico', time: '20:00', genre: 'Tradición', highlight: true },
  { date: '2026-04-04', day: 'Sáb 4 Abr', artist: 'Mon Laferte', venue: 'Plaza de los Fundadores', time: '20:00', genre: 'Indie/Pop', highlight: true },
];

export const localArtists: FestivalConcert[] = [
  { date: '2026-03-29', day: 'Dom 29', artist: 'Dr. Chessani y los Huapangueros de Rioverde', venue: 'Plaza de Armas', time: '18:00', genre: 'Huapango' },
  { date: '2026-03-30', day: 'Lun 30', artist: 'David Aranda', venue: 'Plaza de Armas', time: '19:00', genre: 'Cantautor' },
  { date: '2026-03-31', day: 'Mar 31', artist: 'La Lupita', venue: 'Plaza de Aranzazú', time: '18:00', genre: 'Rock' },
  { date: '2026-04-01', day: 'Mié 1', artist: 'Coro Vuela Alto: Réquiem Huasteco', venue: 'Caja Real UASLP', time: '18:00', genre: 'Coral' },
  { date: '2026-04-01', day: 'Mié 1', artist: 'Aztlán / Lunam Anhalore / Tu Mamá', venue: 'Plaza de Armas', time: '17:00', genre: 'Metal/Rock' },
  { date: '2026-04-02', day: 'Jue 2', artist: 'Sangre de Coyote / Huazzteco / Mexican Walker', venue: 'Plaza de Aranzazú', time: '18:00', genre: 'Fusión' },
];

export const venues: FestivalVenue[] = [
  { name: 'Plaza de los Fundadores', type: 'Escenario principal' },
  { name: 'Plaza de Aranzazú', type: 'Segundo escenario' },
  { name: 'Teatro de la Paz', type: 'Teatro' },
  { name: 'Plaza de Armas', type: 'Artistas locales / CAPO' },
  { name: 'Catedral Metropolitana', type: 'Música coral' },
  { name: 'Caja Real UASLP', type: 'Eventos especiales' },
  { name: 'Teatro Alarcón', type: 'Teatro infantil' },
  { name: 'Plaza del Carmen', type: 'Eventos culturales' },
];

export const festivalInfo = {
  name: 'Festival Internacional San Luis en Primavera 2026',
  edition: '5ª Edición',
  dates: '28 de marzo — 4 de abril, 2026',
  datesEn: 'March 28 — April 4, 2026',
  location: 'Centro Histórico, San Luis Potosí',
  theme: 'El corazón de México late con Arte',
  themeEn: 'The Heart of Mexico Beats with Art',
  guestCountry: 'España',
  guestState: 'Oaxaca',
  activities: '110+',
  artists: '800+',
  countries: 9,
  venues: 14,
  admission: 'Entrada libre (mayoría de eventos)',
  admissionEn: 'Free admission (most events)',
  website: 'https://sitio.sanluis.gob.mx/FestivalSanLuisEnPrimavera/',
  schedule: 'https://sitio.sanluis.gob.mx/FestivalSanLuisEnPrimavera/Cartelera',
  instagram: '@festivalsanluisenprimavera',
};
