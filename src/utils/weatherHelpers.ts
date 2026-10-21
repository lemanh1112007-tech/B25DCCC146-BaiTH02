import type { City, DailyForecastItem } from '../types';

export const CITIES: City[] = [
  { id: 'hn', name: 'Hà Nội', latitude: 21.0285, longitude: 105.8542 },
  { id: 'hp', name: 'Hải Phòng', latitude: 20.8449, longitude: 106.6881 },
  { id: 'hue', name: 'Huế', latitude: 16.4637, longitude: 107.5909 },
  { id: 'dn', name: 'Đà Nẵng', latitude: 16.0544, longitude: 108.2022 },
  { id: 'nt', name: 'Nha Trang', latitude: 12.2388, longitude: 109.1967 },
  { id: 'dl', name: 'Đà Lạt', latitude: 11.9404, longitude: 108.4583 },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', latitude: 10.8231, longitude: 106.6297 },
  { id: 'ct', name: 'Cần Thơ', latitude: 10.0452, longitude: 105.7469 },
];

export const getWeatherInfo = (code: number) => {
  // Bộ icon 2D vector tĩnh (phẳng, mộc mạc, nét căng giống ảnh 1)
  const getIcon = (id: string) => `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${id}.svg`;
  
  if (code === 0) return { description: 'Trời quang', icon: getIcon('2600'), theme: 'sunny' };
  if (code === 1 || code === 2) return { description: 'Ít mây', icon: getIcon('26c5'), theme: 'cloudy' };
  if (code === 3) return { description: 'Nhiều mây', icon: getIcon('2601'), theme: 'cloudy' };
  if (code === 45 || code === 48) return { description: 'Sương mù', icon: getIcon('1f32b'), theme: 'fog' };
  if (code >= 51 && code <= 57) return { description: 'Mưa nhỏ', icon: getIcon('1f327'), theme: 'rainy' };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { description: 'Mưa rào', icon: getIcon('1f326'), theme: 'rainy' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { description: 'Tuyết rơi', icon: getIcon('2744'), theme: 'snow' };
  if (code >= 95 && code <= 99) return { description: 'Dông sét', icon: getIcon('26c8'), theme: 'thunderstorm' };
  
  return { description: 'Không rõ', icon: getIcon('2600'), theme: 'default' };
};

export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export const formatTemperature = (temp: number, unit: 'C' | 'F') => {
  if (unit === 'F') return `${Math.round(temp * 1.8 + 32)}°F`;
  return `${Math.round(temp)}°C`;
};

export const formatDateTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const formatDateShort = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

export const parseDailyForecast = (dailyData: any): DailyForecastItem[] => {
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const result: DailyForecastItem[] = [];
  
  for (let i = 0; i < 7; i++) {
    const codeInfo = getWeatherInfo(dailyData.weather_code[i]);
    const dateObj = new Date(dailyData.time[i]);
    result.push({
      date: dailyData.time[i],
      dayOfWeek: i === 0 ? 'Hôm nay' : days[dateObj.getDay()],
      minTemp: dailyData.temperature_2m_min[i],
      maxTemp: dailyData.temperature_2m_max[i],
      weatherCode: dailyData.weather_code[i],
      description: codeInfo.description,
      icon: codeInfo.icon,
    });
  }
  return result;
};