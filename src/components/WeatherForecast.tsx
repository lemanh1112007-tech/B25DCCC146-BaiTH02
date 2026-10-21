import type { FC } from 'react';
import type { DailyForecastItem, TemperatureUnit } from '../types';
import { formatDateShort, formatTemperature } from '../utils/weatherHelpers';

interface WeatherForecastProps {
  daily: DailyForecastItem[];
  unit: TemperatureUnit;
}

export const WeatherForecast: FC<WeatherForecastProps> = ({ daily, unit }) => {
  return (
    <section className="weather-forecast-card">
      <h3 className="forecast-title">📅 Dự báo thời tiết 7 ngày tới</h3>
      <div className="forecast-grid">
        {daily.map((item) => (
          <div key={item.date} className="forecast-day-card">
            <span className="forecast-day-name">{item.dayOfWeek}</span>
            <span className="forecast-date">{formatDateShort(item.date)}</span>
            
            <img 
              src={item.icon} 
              alt={item.description} 
              className="forecast-icon" 
              title={item.description}
            />
            
            <span className="forecast-desc">{item.description}</span>
            <div className="forecast-temps">
              <span className="temp-max">{formatTemperature(item.maxTemp, unit)}</span>
              <span className="temp-divider">/</span>
              <span className="temp-min">{formatTemperature(item.minTemp, unit)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};