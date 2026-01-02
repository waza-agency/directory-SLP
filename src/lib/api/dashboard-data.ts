/**
 * Dashboard Data API utilities
 * Fetches real-time weather, exchange rate, and news headline data for TodayInSLP
 */

import { createClient } from '@supabase/supabase-js';

// San Luis Potosí coordinates
const SLP_LAT = 22.1565;
const SLP_LON = -100.9855;

// Supabase client for fetching headlines
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export interface WeatherData {
  temp: number;
  tempMin: number;
  tempMax: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  conditionEs: string;
  conditionEn: string;
  conditionJa: string;
  humidity: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface ExchangeRate {
  code: string;
  symbol: string;
  name: string;
  nameEn: string;
  rate: number;
  flag: string;
}

export interface NewsHeadline {
  id: string;
  textEs: string;
  textEn: string;
  textJa: string;
  summaryEs: string;
  summaryEn: string;
  summaryJa: string;
  source: string | null;
}

export interface CommunityNews {
  id: string;
  titleEs: string;
  titleEn: string;
  titleJa: string;
  summaryEs: string;
  summaryEn: string;
  summaryJa: string;
  category: 'social' | 'community' | 'culture' | 'local';
  imageUrl?: string;
  source?: string;
  publishedAt: string;
}

export interface DashboardData {
  weather: WeatherData | null;
  exchangeRates: ExchangeRate[];
  headlines: NewsHeadline[];
  communityNews: CommunityNews[];
  lastUpdated: string;
}

/**
 * Get seasonal fallback weather data for San Luis Potosí
 * Based on historical averages for the region
 */
function getSeasonalFallbackWeather(): WeatherData {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const hour = now.getHours();

  // Seasonal averages for SLP (semi-arid climate)
  // Winter (Dec-Feb): 8-20°C, dry
  // Spring (Mar-May): 12-28°C, dry
  // Summer (Jun-Sep): 15-25°C, rainy season
  // Fall (Oct-Nov): 10-22°C, transitional

  let temp: number, tempMin: number, tempMax: number;
  let condition: WeatherData['condition'] = 'sunny';
  let conditionEs = 'Despejado';
  let conditionEn = 'Clear';
  let conditionJa = '晴れ';

  if (month >= 11 || month <= 1) {
    // Winter
    temp = 14; tempMin = 8; tempMax = 20;
  } else if (month >= 2 && month <= 4) {
    // Spring
    temp = 20; tempMin = 12; tempMax = 28;
  } else if (month >= 5 && month <= 8) {
    // Summer (rainy season)
    temp = 20; tempMin = 15; tempMax = 25;
    condition = 'cloudy';
    conditionEs = 'Parcialmente nublado';
    conditionEn = 'Partly cloudy';
    conditionJa = '曇り';
  } else {
    // Fall
    temp = 16; tempMin = 10; tempMax = 22;
  }

  // Estimate UV index
  let uvIndex = 0;
  if (hour >= 10 && hour <= 16) {
    uvIndex = condition === 'sunny' ? 7 : 4;
  } else if (hour >= 7 && hour <= 18) {
    uvIndex = condition === 'sunny' ? 4 : 2;
  }

  return {
    temp,
    tempMin,
    tempMax,
    condition,
    conditionEs,
    conditionEn,
    conditionJa,
    humidity: month >= 5 && month <= 8 ? 65 : 45,
    uvIndex,
    sunrise: '07:15',
    sunset: '18:00',
    icon: condition === 'sunny' ? '01d' : '02d'
  };
}

/**
 * Fetch weather data from OpenWeatherMap API
 */
export async function fetchWeatherData(): Promise<WeatherData | null> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    console.warn('OpenWeatherMap API key not configured. Using seasonal fallback data.');
    return getSeasonalFallbackWeather();
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${SLP_LAT}&lon=${SLP_LON}&units=metric&appid=${apiKey}`;
    const currentRes = await fetch(url);

    if (!currentRes.ok) {
      const errorText = await currentRes.text();
      console.error('Weather API error:', currentRes.status, errorText);
      return getSeasonalFallbackWeather();
    }

    const current = await currentRes.json();

    // Map weather condition
    const weatherMain = current.weather[0]?.main?.toLowerCase() || 'clear';
    let condition: WeatherData['condition'] = 'sunny';
    let conditionEs = 'Despejado';
    let conditionEn = 'Clear';
    let conditionJa = '晴れ';

    if (weatherMain.includes('cloud')) {
      condition = 'cloudy';
      conditionEs = 'Nublado';
      conditionEn = 'Cloudy';
      conditionJa = '曇り';
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      condition = 'rainy';
      conditionEs = 'Lluvioso';
      conditionEn = 'Rainy';
      conditionJa = '雨';
    } else if (weatherMain.includes('thunder') || weatherMain.includes('storm')) {
      condition = 'stormy';
      conditionEs = 'Tormentoso';
      conditionEn = 'Stormy';
      conditionJa = '嵐';
    }

    // Format sunrise/sunset times
    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Mexico_City'
      });
    };

    // Estimate UV index based on weather and time (UV API is deprecated)
    const now = new Date();
    const hour = now.getHours();
    const isClear = condition === 'sunny';
    let uvIndex = 0;
    if (hour >= 10 && hour <= 16) {
      uvIndex = isClear ? 7 : 4; // Higher UV during midday if clear
    } else if (hour >= 7 && hour <= 18) {
      uvIndex = isClear ? 4 : 2;
    }

    return {
      temp: Math.round(current.main.temp),
      tempMin: Math.round(current.main.temp_min),
      tempMax: Math.round(current.main.temp_max),
      condition,
      conditionEs,
      conditionEn,
      conditionJa,
      humidity: current.main.humidity,
      uvIndex,
      sunrise: formatTime(current.sys.sunrise),
      sunset: formatTime(current.sys.sunset),
      icon: current.weather[0]?.icon || '01d'
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return getSeasonalFallbackWeather();
  }
}

/**
 * Fetch exchange rates from Frankfurter API (free, no key needed)
 * Returns rates for USD, EUR, GBP, JPY, CNY to MXN
 */
export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
  try {
    // Frankfurter API - free and reliable
    const res = await fetch(
      'https://api.frankfurter.app/latest?from=MXN&to=USD,EUR,GBP,JPY,CNY'
    );

    if (!res.ok) throw new Error('Exchange rate API error');

    const data = await res.json();

    // Frankfurter returns how much foreign currency you get for 1 MXN
    // We need the inverse: how much MXN for 1 foreign currency
    const rates = data.rates;

    return [
      { code: 'USD', symbol: '$', name: 'Dólar', nameEn: 'US Dollar', rate: 1 / rates.USD, flag: '🇺🇸' },
      { code: 'EUR', symbol: '€', name: 'Euro', nameEn: 'Euro', rate: 1 / rates.EUR, flag: '🇪🇺' },
      { code: 'GBP', symbol: '£', name: 'Libra', nameEn: 'Pound', rate: 1 / rates.GBP, flag: '🇬🇧' },
      { code: 'JPY', symbol: '¥', name: 'Yen', nameEn: 'Yen', rate: 1 / rates.JPY, flag: '🇯🇵' },
      { code: 'CNY', symbol: '¥', name: 'Yuan', nameEn: 'Yuan', rate: 1 / rates.CNY, flag: '🇨🇳' }
    ];
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return empty array on error - component should handle gracefully
    return [];
  }
}

/**
 * Fetch news headlines from Supabase
 */
export async function fetchHeadlines(): Promise<NewsHeadline[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured for headlines');
    return getDefaultHeadlines();
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('news_headlines')
      .select('id, text_es, text_en, text_ja, summary_es, summary_en, summary_ja, source')
      .eq('active', true)
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('priority', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching headlines:', error);
      return getDefaultHeadlines();
    }

    if (!data || data.length === 0) {
      return getDefaultHeadlines();
    }

    return data.map(h => ({
      id: h.id,
      textEs: h.text_es,
      textEn: h.text_en,
      textJa: h.text_ja || h.text_en,
      summaryEs: h.summary_es || '',
      summaryEn: h.summary_en || '',
      summaryJa: h.summary_ja || h.summary_en || '',
      source: h.source
    }));
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return getDefaultHeadlines();
  }
}

/**
 * Default headlines fallback
 */
function getDefaultHeadlines(): NewsHeadline[] {
  return [
    {
      id: '1',
      textEs: 'Bienvenido a San Luis Way - Tu guía definitiva de San Luis Potosí',
      textEn: 'Welcome to San Luis Way - Your definitive guide to San Luis Potosí',
      textJa: 'San Luis Wayへようこそ - サンルイスポトシの究極ガイド',
      summaryEs: 'Descubre lugares, eventos y experiencias únicas en la ciudad y la Huasteca.',
      summaryEn: 'Discover places, events, and unique experiences in the city and Huasteca.',
      summaryJa: '街とウアステカで場所、イベント、ユニークな体験を発見しましょう。',
      source: null
    },
    {
      id: '2',
      textEs: 'Explora la riqueza cultural y gastronómica de SLP',
      textEn: 'Explore the cultural and gastronomic richness of SLP',
      textJa: 'SLPの文化とグルメの豊かさを探索',
      summaryEs: 'Desde enchiladas potosinas hasta el Centro de las Artes, hay mucho por descubrir.',
      summaryEn: 'From enchiladas potosinas to the Arts Center, there is much to discover.',
      summaryJa: 'エンチラーダス・ポトシーナスからアートセンターまで、発見することがたくさん。',
      source: null
    }
  ];
}

/**
 * Fetch community news from Supabase
 * Social and community-focused news for the dashboard
 */
export async function fetchCommunityNews(): Promise<CommunityNews[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured for community news');
    return getDefaultCommunityNews();
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('community_news')
      .select('id, title_es, title_en, title_ja, summary_es, summary_en, summary_ja, category, image_url, source, published_at')
      .eq('active', true)
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('priority', { ascending: true })
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching community news:', error);
      return getDefaultCommunityNews();
    }

    if (!data || data.length === 0) {
      return getDefaultCommunityNews();
    }

    return data.map(n => ({
      id: n.id,
      titleEs: n.title_es,
      titleEn: n.title_en,
      titleJa: n.title_ja || n.title_en,
      summaryEs: n.summary_es,
      summaryEn: n.summary_en,
      summaryJa: n.summary_ja || n.summary_en,
      category: n.category,
      imageUrl: n.image_url,
      source: n.source,
      publishedAt: n.published_at
    }));
  } catch (error) {
    console.error('Error fetching community news:', error);
    return getDefaultCommunityNews();
  }
}

/**
 * Default community news fallback
 */
function getDefaultCommunityNews(): CommunityNews[] {
  const now = new Date().toISOString();
  return [
    {
      id: '1',
      titleEs: 'Mercado Tangamanga celebra su 5to aniversario',
      titleEn: 'Tangamanga Market celebrates 5th anniversary',
      titleJa: 'タンガマンガ市場が5周年を祝う',
      summaryEs: 'El mercado artesanal más querido de SLP festeja con actividades especiales este fin de semana.',
      summaryEn: 'SLP\'s beloved artisan market celebrates with special activities this weekend.',
      summaryJa: 'SLPで愛される職人市場が今週末特別なアクティビティでお祝い。',
      category: 'community',
      publishedAt: now
    },
    {
      id: '2',
      titleEs: 'Nueva ruta ciclista conecta Lomas con el Centro',
      titleEn: 'New bike route connects Lomas to Downtown',
      titleJa: '新しい自転車ルートがロマスとダウンタウンを接続',
      summaryEs: 'La ciclovía de 8km promete facilitar el transporte sustentable en la ciudad.',
      summaryEn: 'The 8km bike lane promises to facilitate sustainable transportation in the city.',
      summaryJa: '8kmの自転車レーンが市内の持続可能な交通を促進する見込み。',
      category: 'local',
      publishedAt: now
    },
    {
      id: '3',
      titleEs: 'Voluntarios limpian el Parque de Morales',
      titleEn: 'Volunteers clean up Morales Park',
      titleJa: 'ボランティアがモラレス公園を清掃',
      summaryEs: 'Más de 200 ciudadanos participaron en la jornada de limpieza comunitaria.',
      summaryEn: 'Over 200 citizens participated in the community cleanup day.',
      summaryJa: '200人以上の市民がコミュニティ清掃活動に参加。',
      category: 'social',
      publishedAt: now
    }
  ];
}

/**
 * Fetch all dashboard data
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  const [weather, exchangeRates, headlines, communityNews] = await Promise.all([
    fetchWeatherData(),
    fetchExchangeRates(),
    fetchHeadlines(),
    fetchCommunityNews()
  ]);

  return {
    weather,
    exchangeRates,
    headlines,
    communityNews,
    lastUpdated: new Date().toISOString()
  };
}
