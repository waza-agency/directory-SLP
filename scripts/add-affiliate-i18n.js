#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    disclosure: 'Affiliate link',
    disclosureLong: 'Affiliate link — we may earn a commission at no extra cost to you.',
    cta: 'View on Mercado Libre',
    sectionTitle: 'Essentials for San Luis Potosí',
    sectionSubtitle: 'Gear and home items our community recommends for life and adventure in SLP.',
    products: {
      brita: {
        title: 'Brita Metro water filter pitcher',
        description: 'Clean drinking water at home — a must-have setup item for expats arriving in Mexico.',
      },
      termo: {
        title: 'Stanley Quencher H2.0 40oz insulated tumbler',
        description: 'Viral for a reason — keeps water icy for 11+ hours. Perfect for hikes, coworking, and long drives.',
      },
      columbia: {
        title: 'Columbia men\'s hiking trail shoes',
        description: 'Trail-ready grip for Real de Catorce, Huasteca Potosina, and Sierra de San Miguelito.',
      },
      mochila: {
        title: 'Tactical hydration backpack 3L',
        description: 'Hands-free hydration for long days at Cascadas de Tamul, Sierra trails, or biking.',
      },
      dubery: {
        title: 'Dubery D620 polarized sunglasses UV400',
        description: 'SLP sits at 1,860m — full UV protection matters. Polarized lenses cut desert glare.',
      },
      sandalias: {
        title: 'All-terrain water sandals',
        description: 'Grip wet stone at Media Luna, Puente de Dios, and Huasteca waterfalls without slipping.',
      },
      levoit: {
        title: 'Levoit HEPA air purifier',
        description: 'SLP is dry and dusty. A HEPA purifier helps expats avoid respiratory issues in the first months.',
      },
      blackdiamond: {
        title: 'Black Diamond Storm 500-R headlamp',
        description: 'Rechargeable, 500 lumens, water-resistant. Essential for camping Real de Catorce or night treks.',
      },
    },
  },
  es: {
    disclosure: 'Enlace de afiliado',
    disclosureLong: 'Enlace de afiliado — podemos ganar una comisión sin costo extra para ti.',
    cta: 'Ver en Mercado Libre',
    sectionTitle: 'Esenciales para San Luis Potosí',
    sectionSubtitle: 'Equipo y artículos para el hogar que nuestra comunidad recomienda para vivir y aventurarse en SLP.',
    products: {
      brita: {
        title: 'Jarra con filtro Brita Metro',
        description: 'Agua potable limpia en casa — un básico para expats recién llegados a México.',
      },
      termo: {
        title: 'Termo Stanley Quencher H2.0 40oz',
        description: 'Viral por una razón — mantiene el agua helada 11+ horas. Ideal para caminatas, coworking y viajes largos.',
      },
      columbia: {
        title: 'Tenis Columbia de senderismo para hombre',
        description: 'Agarre confiable para Real de Catorce, Huasteca Potosina y Sierra de San Miguelito.',
      },
      mochila: {
        title: 'Mochila de hidratación táctica 3L',
        description: 'Hidratación manos libres para días largos en Cascadas de Tamul, senderos o ciclismo.',
      },
      dubery: {
        title: 'Lentes polarizados Dubery D620 UV400',
        description: 'SLP está a 1,860m — la protección UV importa. Los cristales polarizados cortan el reflejo del desierto.',
      },
      sandalias: {
        title: 'Sandalias acuáticas todo terreno',
        description: 'Agarre en piedra mojada en Media Luna, Puente de Dios y cascadas de la Huasteca.',
      },
      levoit: {
        title: 'Purificador de aire Levoit HEPA',
        description: 'SLP es seco y polvoriento. Un purificador HEPA ayuda a los expats a evitar problemas respiratorios los primeros meses.',
      },
      blackdiamond: {
        title: 'Lámpara frontal Black Diamond Storm 500-R',
        description: 'Recargable, 500 lúmenes, resistente al agua. Esencial para camping en Real de Catorce o caminatas nocturnas.',
      },
    },
  },
  de: {
    disclosure: 'Affiliate-Link',
    disclosureLong: 'Affiliate-Link — wir erhalten eventuell eine Provision ohne Mehrkosten für dich.',
    cta: 'Auf Mercado Libre ansehen',
    sectionTitle: 'Essentials für San Luis Potosí',
    sectionSubtitle: 'Ausrüstung und Haushaltsartikel, die unsere Community für das Leben und Abenteuer in SLP empfiehlt.',
    products: {
      brita: {
        title: 'Brita Metro Wasserfilter-Kanne',
        description: 'Sauberes Trinkwasser zu Hause — ein Muss für Expats, die neu in Mexiko ankommen.',
      },
      termo: {
        title: 'Stanley Quencher H2.0 40oz Isolierbecher',
        description: 'Viral aus gutem Grund — hält Wasser 11+ Stunden eiskalt. Perfekt für Wanderungen, Coworking und lange Fahrten.',
      },
      columbia: {
        title: 'Columbia Herren-Wanderschuhe',
        description: 'Zuverlässiger Grip für Real de Catorce, Huasteca Potosina und Sierra de San Miguelito.',
      },
      mochila: {
        title: 'Taktischer Trinkrucksack 3L',
        description: 'Freihändige Hydration für lange Tage an den Wasserfällen von Tamul, auf Bergwegen oder beim Biken.',
      },
      dubery: {
        title: 'Dubery D620 polarisierte Sonnenbrille UV400',
        description: 'SLP liegt auf 1.860m — UV-Schutz ist entscheidend. Polarisierte Gläser reduzieren die Wüstenblendung.',
      },
      sandalias: {
        title: 'Allround-Wassersandalen',
        description: 'Griffig auf nassem Stein an Media Luna, Puente de Dios und Huasteca-Wasserfällen.',
      },
      levoit: {
        title: 'Levoit HEPA-Luftreiniger',
        description: 'SLP ist trocken und staubig. Ein HEPA-Luftreiniger hilft Expats, in den ersten Monaten Atemprobleme zu vermeiden.',
      },
      blackdiamond: {
        title: 'Black Diamond Storm 500-R Stirnlampe',
        description: 'Aufladbar, 500 Lumen, wasserabweisend. Unverzichtbar für Camping in Real de Catorce oder Nachtwanderungen.',
      },
    },
  },
  ja: {
    disclosure: 'アフィリエイトリンク',
    disclosureLong: 'アフィリエイトリンク — 追加費用なしで手数料を受け取る場合があります。',
    cta: 'Mercado Libreで見る',
    sectionTitle: 'サンルイスポトシ必需品',
    sectionSubtitle: 'SLPでの生活とアドベンチャーのために、コミュニティが推薦するギアと家庭用品。',
    products: {
      brita: {
        title: 'Brita Metro 浄水ピッチャー',
        description: 'メキシコに到着した駐在員にとって必須の、家庭での清潔な飲料水。',
      },
      termo: {
        title: 'Stanley Quencher H2.0 40oz 断熱タンブラー',
        description: 'バイラル人気商品 — 水を11時間以上冷たく保ちます。ハイキング、コワーキング、長距離ドライブに最適。',
      },
      columbia: {
        title: 'コロンビア メンズ ハイキングシューズ',
        description: 'レアル・デ・カトルセ、ワステカ・ポトシナ、シエラ・デ・サンミゲリートでの信頼できるグリップ。',
      },
      mochila: {
        title: 'タクティカル ハイドレーションバックパック 3L',
        description: 'トゥムル滝、シエラトレイル、サイクリングでの長い一日のためのハンズフリー水分補給。',
      },
      dubery: {
        title: 'Dubery D620 偏光サングラス UV400',
        description: 'SLPは標高1,860m — UV対策は重要です。偏光レンズが砂漠のまぶしさをカットします。',
      },
      sandalias: {
        title: 'オールテレーン ウォーターサンダル',
        description: 'メディアルナ、プエンテ・デ・ディオス、ワステカの滝の濡れた岩でしっかりグリップ。',
      },
      levoit: {
        title: 'Levoit HEPA 空気清浄機',
        description: 'SLPは乾燥しホコリが多い環境。HEPA空気清浄機は駐在員が最初の数ヶ月の呼吸器系の問題を避けるのに役立ちます。',
      },
      blackdiamond: {
        title: 'Black Diamond Storm 500-R ヘッドランプ',
        description: '充電式、500ルーメン、防水。レアル・デ・カトルセでのキャンプや夜間のトレッキングに必須。',
      },
    },
  },
};

const repoRoot = path.resolve(__dirname, '..');

for (const [locale, strings] of Object.entries(translations)) {
  const filePath = path.join(repoRoot, 'public', 'locales', locale, 'common.json');
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  json.affiliate = strings;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`Updated ${locale}/common.json`);
}
