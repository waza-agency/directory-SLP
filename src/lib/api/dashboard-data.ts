/**
 * Dashboard Data API utilities
 * Fetches real-time weather and exchange rate data for the TodayInSLP component
 */

// San Luis Potosí coordinates
const SLP_LAT = 22.1565;
const SLP_LON = -100.9855;

export interface WeatherData {
  temp: number;
  tempMin: number;
  tempMax: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  conditionEs: string;
  conditionEn: string;
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

export interface DashboardData {
  weather: WeatherData | null;
  exchangeRates: ExchangeRate[];
  lastUpdated: string;
}

/**
 * Fetch weather data from OpenWeatherMap API
 */
export async function fetchWeatherData(): Promise<WeatherData | null> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    console.warn('OpenWeatherMap API key not configured. Add OPENWEATHERMAP_API_KEY to .env');
    return null;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${SLP_LAT}&lon=${SLP_LON}&units=metric&appid=${apiKey}`;
    const currentRes = await fetch(url);

    if (!currentRes.ok) {
      const errorText = await currentRes.text();
      console.error('Weather API error:', currentRes.status, errorText);
      throw new Error(`Weather API error: ${currentRes.status}`);
    }

    const current = await currentRes.json();

    // Map weather condition
    const weatherMain = current.weather[0]?.main?.toLowerCase() || 'clear';
    let condition: WeatherData['condition'] = 'sunny';
    let conditionEs = 'Despejado';
    let conditionEn = 'Clear';

    if (weatherMain.includes('cloud')) {
      condition = 'cloudy';
      conditionEs = 'Nublado';
      conditionEn = 'Cloudy';
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      condition = 'rainy';
      conditionEs = 'Lluvioso';
      conditionEn = 'Rainy';
    } else if (weatherMain.includes('thunder') || weatherMain.includes('storm')) {
      condition = 'stormy';
      conditionEs = 'Tormentoso';
      conditionEn = 'Stormy';
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
      humidity: current.main.humidity,
      uvIndex,
      sunrise: formatTime(current.sys.sunrise),
      sunset: formatTime(current.sys.sunset),
      icon: current.weather[0]?.icon || '01d'
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
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
 * Fetch all dashboard data
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  const [weather, exchangeRates] = await Promise.all([
    fetchWeatherData(),
    fetchExchangeRates()
  ]);

  return {
    weather,
    exchangeRates,
    lastUpdated: new Date().toISOString()
  };
}
