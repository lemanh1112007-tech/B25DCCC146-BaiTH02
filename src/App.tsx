import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import type { City, CityWeatherData, TemperatureUnit, UIStatus, WeatherTheme } from './types';
import { CITIES, getWeatherInfo, parseDailyForecast } from './utils/weatherHelpers';
import { CityList } from './components/CityList';
import { WeatherCurrent } from './components/WeatherCurrent';
import { WeatherForecast } from './components/WeatherForecast';
import { UnitToggle } from './components/UnitToggle';
import { StatusView } from './components/StatusView';
import './App.css';

const FAV_LOCAL_KEY = 'my_fav_cities';

export const App: FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<CityWeatherData | null>(null);
  const [uiStatus, setUiStatus] = useState<UIStatus>('initial');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  // lấy list fav từ localstorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_LOCAL_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // lưu local khi array favorites đổi
  useEffect(() => {
    try {
      localStorage.setItem(FAV_LOCAL_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Loi luu local storage:', e);
    }
  }, [favorites]);

  // call api 
  const fetchWeather = useCallback(async (city: City) => {
    setUiStatus('loading');
    setErrorMessage('');

    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Loi goi API (Ma: ${response.status})`);
      }

      const data = await response.json();
      const currentCodeInfo = getWeatherInfo(data.current.weather_code);
      const parsedDaily = parseDailyForecast(data.daily);

      setWeatherData({
        city,
        current: {
          time: data.current.time,
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          weatherCode: data.current.weather_code,
          description: currentCodeInfo.description,
          icon: currentCodeInfo.icon,
          theme: currentCodeInfo.theme as WeatherTheme, // Đã ép kiểu để hết lỗi đỏ TypeScript
        },
        daily: parsedDaily,
      });

      setUiStatus('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Khong lay duoc data do loi mang.';
      setErrorMessage(msg);
      setUiStatus('error');
    }
  }, []);

  // click chon thành phố
  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    fetchWeather(city);
  };

  // restart khi lỗi 
  const handleRetry = () => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  };

  // thêm thành phố yêu thích yêu thích
  const handleToggleFavorite = (cityId: string) => {
    setFavorites((prev) =>
      prev.includes(cityId) ? prev.filter((id) => id !== cityId) : [...prev, cityId]
    );
  };

  // đổi C sang F không call api
  const handleUnitToggle = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
  };

  const getCityTheme = (cityName: string) => {
    const name = cityName.toLowerCase();
    if (name.includes('hà nội')) return 'city-hanoi';
    if (name.includes('hải phòng')) return 'city-haiphong';
    if (name.includes('huế')) return 'city-hue';
    if (name.includes('đà nẵng')) return 'city-danang';
    if (name.includes('nha trang')) return 'city-nhatrang';
    if (name.includes('đà lạt')) return 'city-dalat';
    if (name.includes('hồ chí minh')) return 'city-hcm';
    if (name.includes('cần thơ')) return 'city-cantho';
    return 'default';
  };

  // đổi theme theo thành phố đang chọn 
  const currentTheme = selectedCity ? getCityTheme(selectedCity.name) : 'default';

  return (
    <div className={`app-container theme-${currentTheme}`}>
      <div className="app-backdrop">
        <header className="app-header">
          <div className="header-brand">
            <span className="brand-logo">🌤️</span>
            <div>
              <h1 className="brand-title">Dự Báo Thời Tiết Việt Nam</h1>
              <p className="brand-subtitle">Dữ liệu từ Open-Meteo</p>
            </div>
          </div>

          <div className="header-actions">
            <UnitToggle unit={unit} onToggle={handleUnitToggle} />
          </div>
        </header>

        <main className="app-main-layout">
          {/* list tp bên trái */}
          <CityList
            cities={CITIES}
            selectedCityId={selectedCity?.id || null}
            onSelectCity={handleSelectCity}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* chi tiết thời tiết bên phải */}
          <section className="weather-display-container">
            {uiStatus !== 'success' ? (
              <StatusView status={uiStatus} errorMessage={errorMessage} onRetry={handleRetry} />
            ) : (
              weatherData && (
                <div className="weather-content-wrapper">
                  <WeatherCurrent
                    cityName={weatherData.city.name}
                    current={weatherData.current}
                    unit={unit}
                  />
                  <WeatherForecast daily={weatherData.daily} unit={unit} />
                </div>
              )
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;