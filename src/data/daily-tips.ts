export interface DailyTip {
  es: string;
  en: string;
  de: string;
  ja: string;
}

const tips: DailyTip[] = [
  // Culture & History
  {
    es: 'El Centro Historico de SLP es Patrimonio de la Humanidad por la UNESCO. Recorrelo caminando para descubrir su arquitectura barroca.',
    en: "SLP's Historic Center is a UNESCO World Heritage Site. Walk through it to discover its baroque architecture.",
    de: 'Das historische Zentrum von SLP ist UNESCO-Weltkulturerbe. Erkunden Sie die barocke Architektur zu Fuss.',
    ja: 'SLPの歴史地区はユネスコ世界遺産です。バロック建築を徒歩で探索しましょう。'
  },
  {
    es: 'La Catedral Metropolitana fue construida entre 1670 y 1730. Sus dos torres son de estilos diferentes: una barroca y otra neoclasica.',
    en: 'The Metropolitan Cathedral was built between 1670 and 1730. Its two towers are different styles: one baroque, one neoclassical.',
    de: 'Die Metropolitankathedrale wurde zwischen 1670 und 1730 erbaut. Ihre zwei Tuerme haben verschiedene Stile: barock und neoklassisch.',
    ja: '大聖堂は1670年から1730年にかけて建設されました。2つの塔はバロックと新古典主義の異なるスタイルです。'
  },
  {
    es: 'El Museo Nacional de la Mascara alberga mas de 1,300 mascaras de toda la Republica. Entrada accesible para todos.',
    en: 'The National Mask Museum houses over 1,300 masks from across Mexico. Affordable entry for everyone.',
    de: 'Das Nationale Maskenmuseum beherbergt ueber 1.300 Masken aus ganz Mexiko. Erschwinglicher Eintritt.',
    ja: '国立仮面博物館にはメキシコ全土から1,300以上の仮面が展示されています。手頃な入場料です。'
  },
  {
    es: 'El Teatro de la Paz, inaugurado en 1894, es uno de los teatros mas hermosos de Mexico. Consulta su cartelera mensual.',
    en: 'Teatro de la Paz, opened in 1894, is one of the most beautiful theaters in Mexico. Check their monthly program.',
    de: 'Das Teatro de la Paz, eroeffnet 1894, ist eines der schoensten Theater Mexikos. Pruefen Sie das Monatsprogramm.',
    ja: '1894年開館のテアトロ・デ・ラ・パスはメキシコで最も美しい劇場の一つです。月間プログラムをチェック。'
  },
  // Gastronomy
  {
    es: 'Las enchiladas potosinas son el platillo emblematico de SLP. Prueba las originales en el Mercado Hidalgo.',
    en: 'Enchiladas potosinas are the iconic dish of SLP. Try the originals at Mercado Hidalgo.',
    de: 'Enchiladas Potosinas sind das Wahrzeichen-Gericht von SLP. Probieren Sie die Originale im Mercado Hidalgo.',
    ja: 'エンチラーダス・ポトシーナスはSLPの名物料理です。メルカド・イダルゴで本場の味を。'
  },
  {
    es: 'El queso de tuna es un dulce unico de SLP hecho con el fruto del nopal. Se encuentra en mercados y dulcerias del centro.',
    en: 'Queso de tuna is a unique SLP candy made from prickly pear fruit. Find it in downtown markets and candy shops.',
    de: 'Queso de Tuna ist eine einzigartige SLP-Suessigkeit aus Kaktusfeigen. Erhaeltlich in Maerkten und Suesswarenlaeden.',
    ja: 'ケソ・デ・トゥナはウチワサボテンの実から作るSLP独自のお菓子。中心部の市場で見つかります。'
  },
  {
    es: 'Prueba un cafe de olla en alguna cafeteria del centro. Es cafe con piloncillo y canela, tradicion potosina.',
    en: 'Try a cafe de olla at a downtown coffee shop. Coffee with piloncillo and cinnamon, a local tradition.',
    de: 'Probieren Sie einen Cafe de Olla in einem Cafe in der Innenstadt. Kaffee mit Piloncillo und Zimt, eine lokale Tradition.',
    ja: 'セントロのカフェでカフェ・デ・オジャを試して。ピロンシージョとシナモン入りの伝統コーヒーです。'
  },
  {
    es: 'Los tacos rojos del Mercado Republica son famosos entre los potosinos. Abierto desde temprano para desayunar.',
    en: 'Red tacos at Mercado Republica are famous among locals. Open early for breakfast.',
    de: 'Rote Tacos im Mercado Republica sind bei Einheimischen beruehmt. Frueh geoeffnet zum Fruehstueck.',
    ja: 'メルカド・レプブリカの赤タコスは地元で有名。朝食に早朝からオープンしています。'
  },
  // Nature & Parks
  {
    es: 'El Parque Tangamanga I es uno de los parques urbanos mas grandes de Latinoamerica. Ideal para correr, andar en bici o hacer picnic.',
    en: 'Tangamanga I Park is one of the largest urban parks in Latin America. Great for running, biking, or picnics.',
    de: 'Der Tangamanga I Park ist einer der groessten Stadtparks Lateinamerikas. Ideal zum Laufen, Radfahren oder Picknicken.',
    ja: 'タンガマンガI公園はラテンアメリカ最大級の都市公園。ランニング、サイクリング、ピクニックに最適。'
  },
  {
    es: 'La Huasteca Potosina esta a solo 5 horas de la capital. Cascadas, rios turquesa y selva te esperan.',
    en: 'The Huasteca Potosina is just 5 hours from the capital. Waterfalls, turquoise rivers, and jungle await you.',
    de: 'Die Huasteca Potosina ist nur 5 Stunden von der Hauptstadt entfernt. Wasserfaelle, tuerkise Fluesse und Dschungel erwarten Sie.',
    ja: 'ウアステカ・ポトシーナは州都からわずか5時間。滝、ターコイズの川、ジャングルが待っています。'
  },
  {
    es: 'Real de Catorce es un pueblo magico a 3 horas de SLP. Se llega por un tunel de 2.3 km excavado en la montana.',
    en: 'Real de Catorce is a magical town 3 hours from SLP. You enter through a 2.3 km tunnel carved into the mountain.',
    de: 'Real de Catorce ist ein magisches Dorf 3 Stunden von SLP entfernt. Man gelangt durch einen 2,3 km langen Bergtunnel hinein.',
    ja: 'レアル・デ・カトルセはSLPから3時間の魔法の町。山に掘られた2.3kmのトンネルを通って入ります。'
  },
  {
    es: 'El Sotano de las Golondrinas, a 6 horas de SLP, es un abismo de 512 metros. Al amanecer miles de vencejos salen volando.',
    en: "Sotano de las Golondrinas, 6 hours from SLP, is a 512-meter abyss. At dawn thousands of swifts fly out.",
    de: 'Der Sotano de las Golondrinas, 6 Stunden von SLP, ist ein 512 Meter tiefer Abgrund. Im Morgengrauen fliegen Tausende Mauersegler heraus.',
    ja: 'ソタノ・デ・ラス・ゴロンドリナスはSLPから6時間、深さ512mの縦穴。夜明けに数千羽のアマツバメが飛び立ちます。'
  },
  // Practical tips
  {
    es: 'SLP tiene clima semiarido: lleva bloqueador solar y agua siempre, especialmente de marzo a mayo cuando el calor es intenso.',
    en: 'SLP has a semi-arid climate: always carry sunscreen and water, especially March to May when heat is intense.',
    de: 'SLP hat ein semiarides Klima: Tragen Sie immer Sonnenschutz und Wasser, besonders von Maerz bis Mai bei intensiver Hitze.',
    ja: 'SLPは半乾燥気候。特に3月〜5月の猛暑期は、日焼け止めと水を必ず携帯しましょう。'
  },
  {
    es: 'La temporada de lluvias en SLP va de junio a septiembre. Las tardes pueden ser frescas y con chubascos.',
    en: 'Rainy season in SLP runs from June to September. Afternoons can be cool with showers.',
    de: 'Die Regenzeit in SLP dauert von Juni bis September. Nachmittags kann es kuehl sein mit Schauern.',
    ja: 'SLPの雨季は6月〜9月。午後は涼しくなり、にわか雨があることも。'
  },
  {
    es: 'El transporte publico en SLP es economico. Las rutas de camion cubren toda la zona metropolitana por menos de $12 MXN.',
    en: 'Public transport in SLP is affordable. Bus routes cover the entire metro area for under $12 MXN.',
    de: 'Oeffentliche Verkehrsmittel in SLP sind guenstig. Buslinien decken das gesamte Stadtgebiet fuer unter 12 MXN ab.',
    ja: 'SLPの公共交通機関は手頃。バス路線は都市圏全体を12ペソ以下でカバーしています。'
  },
  {
    es: 'Visita la Calzada de Guadalupe al atardecer. El paseo arbolado conecta el centro con la Basilica y es perfecto para caminar.',
    en: 'Visit Calzada de Guadalupe at sunset. The tree-lined promenade connects downtown to the Basilica and is perfect for walking.',
    de: 'Besuchen Sie die Calzada de Guadalupe bei Sonnenuntergang. Die Baumallee verbindet die Innenstadt mit der Basilika.',
    ja: 'カルサダ・デ・グアダルーペは夕暮れ時に訪れて。並木道がセントロとバシリカを結びます。'
  },
  {
    es: 'Los domingos hay mercado organico en el Jardin de San Francisco. Productos locales frescos y artesanias.',
    en: "There's an organic market on Sundays at Jardin de San Francisco. Fresh local produce and crafts.",
    de: 'Sonntags gibt es einen Bio-Markt am Jardin de San Francisco. Frische lokale Produkte und Kunsthandwerk.',
    ja: '日曜日はサン・フランシスコ庭園でオーガニックマーケット。新鮮な地元の食材と工芸品。'
  },
  // Events & Festivals
  {
    es: 'La Fenapo (Feria Nacional Potosina) se celebra cada agosto. Es la feria mas grande de la region con conciertos y gastronomia.',
    en: 'Fenapo (National Potosino Fair) is celebrated every August. The biggest regional fair with concerts and gastronomy.',
    de: 'Die Fenapo (Nationale Potosino-Messe) findet jeden August statt. Die groesste regionale Messe mit Konzerten und Gastronomie.',
    ja: 'フェナポ（国立ポトシーノフェア）は毎年8月開催。コンサートとグルメが楽しめる地域最大のフェア。'
  },
  {
    es: 'El Festival de las Luces ilumina el centro historico cada diciembre. Mapping, musica y arte en edificios coloniales.',
    en: 'The Festival of Lights illuminates the historic center every December. Projection mapping, music and art on colonial buildings.',
    de: 'Das Lichterfestival erleuchtet jeden Dezember das historische Zentrum. Projektionen, Musik und Kunst an Kolonialgebaeuden.',
    ja: '毎年12月のフェスティバル・デ・ラス・ルセスは歴史地区をライトアップ。植民地時代の建物にプロジェクションマッピング。'
  },
  {
    es: 'La Procesion del Silencio en Semana Santa es unica en Mexico. Miles de participantes recorren el centro en absoluto silencio.',
    en: 'The Procession of Silence during Holy Week is unique in Mexico. Thousands walk the center in absolute silence.',
    de: 'Die Prozession der Stille in der Karwoche ist einzigartig in Mexiko. Tausende gehen in absoluter Stille durch das Zentrum.',
    ja: '聖週間の沈黙の行列はメキシコ独自の伝統。数千人が完全な静寂の中、中心部を歩きます。'
  },
  {
    es: 'Dia de Muertos en SLP se celebra con altares en la Plaza de Armas y el Jardin de San Juan de Dios. Visitalo el 1-2 de noviembre.',
    en: 'Day of the Dead in SLP features altars at Plaza de Armas and Jardin de San Juan de Dios. Visit November 1-2.',
    de: 'Der Tag der Toten in SLP wird mit Altaeren auf der Plaza de Armas gefeiert. Besuchen Sie es am 1.-2. November.',
    ja: '死者の日にはアルマス広場にオフレンダ（祭壇）が並びます。11月1〜2日に訪れましょう。'
  },
  // Neighborhoods & Shopping
  {
    es: 'La zona de Lomas tiene los mejores restaurantes y cafes de la ciudad. Explora la Av. Himno Nacional y alrededores.',
    en: 'The Lomas area has the best restaurants and cafes in the city. Explore Av. Himno Nacional and surroundings.',
    de: 'Das Lomas-Viertel hat die besten Restaurants und Cafes der Stadt. Erkunden Sie die Av. Himno Nacional.',
    ja: 'ロマス地区には市内最高のレストランとカフェがあります。イムノ・ナシオナル通り周辺を探索。'
  },
  {
    es: 'El Mercado Hidalgo es el mercado tradicional mas grande de SLP. Frutas, comida, artesanias y remedios naturales.',
    en: 'Mercado Hidalgo is the largest traditional market in SLP. Fruits, food, crafts, and natural remedies.',
    de: 'Der Mercado Hidalgo ist der groesste traditionelle Markt in SLP. Fruechte, Essen, Kunsthandwerk und Naturheilmittel.',
    ja: 'メルカド・イダルゴはSLP最大の伝統市場。フルーツ、食事、工芸品、天然薬品が揃います。'
  },
  {
    es: 'El Barrio de San Miguelito es el barrio mas antiguo y colorido de SLP. Sus calles empedradas tienen murales y talleres de arte.',
    en: 'Barrio de San Miguelito is the oldest and most colorful neighborhood in SLP. Its cobblestone streets have murals and art workshops.',
    de: 'Das Barrio de San Miguelito ist das aelteste und farbenfrohste Viertel von SLP. Kopfsteinpflasterstrassen mit Wandmalereien.',
    ja: 'バリオ・デ・サン・ミゲリートはSLP最古のカラフルな地区。石畳の通りに壁画やアートワークショップ。'
  },
  // Expat & practical
  {
    es: 'SLP es una de las ciudades mas seguras del Bajio mexicano. Ideal para familias y trabajo remoto.',
    en: 'SLP is one of the safest cities in the Mexican Bajio region. Great for families and remote work.',
    de: 'SLP ist eine der sichersten Staedte in der mexikanischen Bajio-Region. Ideal fuer Familien und Fernarbeit.',
    ja: 'SLPはメキシコのバヒオ地域で最も安全な都市の一つ。家族やリモートワークに最適。'
  },
  {
    es: 'El costo de vida en SLP es 40-50% menor que en CDMX. Departamentos modernos en buenas zonas desde $8,000 MXN/mes.',
    en: 'Cost of living in SLP is 40-50% lower than Mexico City. Modern apartments in good areas from $8,000 MXN/month.',
    de: 'Die Lebenshaltungskosten in SLP sind 40-50% niedriger als in Mexiko-Stadt. Moderne Wohnungen ab 8.000 MXN/Monat.',
    ja: 'SLPの生活費はメキシコシティより40〜50%安い。好立地の近代的なアパートが月8,000ペソから。'
  },
  {
    es: 'El aeropuerto de SLP tiene vuelos directos a CDMX, Monterrey y ciudades de EE.UU. Esta a 20 minutos del centro.',
    en: 'SLP airport has direct flights to Mexico City, Monterrey, and US cities. Just 20 minutes from downtown.',
    de: 'Der Flughafen SLP hat Direktfluege nach Mexiko-Stadt, Monterrey und US-Staedte. Nur 20 Minuten vom Zentrum.',
    ja: 'SLP空港からメキシコシティ、モンテレイ、米国都市への直行便あり。ダウンタウンから20分。'
  },
  {
    es: 'Los coworkings en SLP estan creciendo. Hay opciones en Lomas, Centro y Carranza desde $2,000 MXN/mes.',
    en: 'Coworking spaces in SLP are growing. Options in Lomas, Centro, and Carranza from $2,000 MXN/month.',
    de: 'Coworking-Raeume in SLP wachsen. Optionen in Lomas, Centro und Carranza ab 2.000 MXN/Monat.',
    ja: 'SLPのコワーキングスペースが増加中。ロマス、セントロ、カランサで月2,000ペソから。'
  },
  {
    es: 'La UASLP ofrece cursos de espanol para extranjeros. Ideal si quieres aprender o mejorar tu espanol en SLP.',
    en: 'UASLP offers Spanish courses for foreigners. Great if you want to learn or improve your Spanish in SLP.',
    de: 'Die UASLP bietet Spanischkurse fuer Auslaender an. Ideal, um Ihr Spanisch in SLP zu lernen oder zu verbessern.',
    ja: 'UASLPでは外国人向けスペイン語コースを開催。SLPでスペイン語を学びたい方に最適。'
  },
  {
    es: 'SLP tiene excelente conectividad de internet. La mayoria de cafes y restaurantes ofrecen WiFi gratuito.',
    en: 'SLP has excellent internet connectivity. Most cafes and restaurants offer free WiFi.',
    de: 'SLP hat ausgezeichnete Internetverbindung. Die meisten Cafes und Restaurants bieten kostenloses WLAN.',
    ja: 'SLPのインターネット環境は優秀。ほとんどのカフェやレストランで無料WiFiが利用可能。'
  },
];

/**
 * Get the tip for today based on day of year.
 * Rotates through all tips, one per day.
 */
export function getTipOfTheDay(): DailyTip {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return tips[dayOfYear % tips.length];
}

export default tips;
