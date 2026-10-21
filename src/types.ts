// Interface đại diện cho một thành phố
export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  region?: string;
}

export type TemperatureUnit = 'C' | 'F';


export type WeatherTheme =
  | 'sunny'
  | 'cloudy'
  | 'fog'
  | 'rainy'
  | 'snow'
  | 'thunderstorm'
  | 'default';

export type UIStatus = 'initial' | 'loading' | 'success' | 'error';

// Thông tin chi tiết giải mã từ weather_code
export interface WeatherCodeInfo {
  code: number;
  description: string;
  icon: string;
  theme: WeatherTheme;
}

// dữ liệu trả về từ Open-Meteo API
export interface OpenMeteoApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// Dữ liệu thời tiết hiện tại 
export interface CurrentWeatherData {
  time: string;
  temperature: number; 
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  icon: string;
  theme: WeatherTheme;
}

//dự báo thời tiết trong 7 ngày 
export interface DailyForecastItem {
  date: string;
  dayOfWeek: string;
  weatherCode: number;
  maxTemp: number; // 
  minTemp: number; 
  description: string;
  icon: string;
}

//dữ liệu thời tiết của một thành phố
export interface CityWeatherData {
  city: City;
  current: CurrentWeatherData;
  daily: DailyForecastItem[];
}

