import type { FC } from 'react';
import type { CurrentWeatherData, TemperatureUnit } from '../types';
import { formatDateTime, formatTemperature } from '../utils/weatherHelpers';

interface WeatherCurrentProps {
  cityName: string;
  current: CurrentWeatherData;
  unit: TemperatureUnit;
}

export const WeatherCurrent: FC<WeatherCurrentProps> = ({ cityName, current, unit }) => {
  return (
    <section className="weather-current-card">
      <div className="current-header">
        <div>
          <span className="location-badge">📍 Việt Nam</span>
          <h2 className="current-city-name">{cityName}</h2>
          <p className="current-update-time">🕒 Cập nhật: {formatDateTime(current.time)}</p>
        </div>
        <img 
          src={current.icon} 
          alt={current.description} 
          className="current-main-icon" 
        />
      </div>

      <div className="current-body">
        <div className="temp-display">
          <span className="current-temp">{formatTemperature(current.temperature, unit)}</span>
          <span className="current-condition-badge">{current.description}</span>
        </div>
        <div className="current-metrics-grid">
          <div className="metric-box">
            <span className="metric-icon">💧</span>
            <div className="metric-info">
              <span className="metric-label">Độ ẩm</span>
              <span className="metric-value">{current.humidity}%</span>
            </div>
          </div>
          <div className="metric-box">
            <span className="metric-icon">💨</span>
            <div className="metric-info">
              <span className="metric-label">Tốc độ gió</span>
              <span className="metric-value">{current.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};