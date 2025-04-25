-- Insertar el evento del Festival del Vino en la tabla events
INSERT INTO events (
  id,
  title,
  description,
  start_date,
  end_date,
  location,
  category,
  image_url,
  featured,
  created_at,
  updated_at
) VALUES (
  '97f4e7d8-c33b-4e8c-bd8c-f3ae1e8f9e85',
  'Festival Internacional del Vino de San Luis Potosí',
  'El Festival Internacional del Vino de San Luis Potosí es uno de los eventos enológicos más importantes de México. Durante dos días, el Centro de las Artes se transforma en un punto de encuentro para amantes del vino, sommeliers, productores y entusiastas de la gastronomía. Con más de 500 vinos de todo el mundo, bodegas nacionales e internacionales, catas premium, experiencias gastronómicas y eventos culturales.',
  '2025-06-06T10:00:00Z',
  '2025-06-07T22:00:00Z',
  'Centro de las Artes, San Luis Potosí',
  'cultural',
  '/images/events/festival-del-vino.jpg',
  true,
  NOW(),
  NOW()
);

-- Actualizar algún otro evento existente para que no sea featured si queremos destacar solo el Festival del Vino
UPDATE events
SET featured = false
WHERE id != '97f4e7d8-c33b-4e8c-bd8c-f3ae1e8f9e85'
AND category = 'cultural'
AND featured = true; 