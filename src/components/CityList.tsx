import { useState } from 'react';
import type { FC } from 'react';
import type { City } from '../types';
import { removeAccents } from '../utils/weatherHelpers';

interface CityListProps {
  cities: City[];
  selectedCityId: string | null;
  onSelectCity: (city: City) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CityList: FC<CityListProps> = ({ cities, selectedCityId, onSelectCity, favorites, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFav, setFilterFav] = useState(false);

  const filteredCities = cities.filter((city) => {
    const matchSearch = removeAccents(city.name).includes(removeAccents(searchTerm));
    const matchFav = filterFav ? favorites.includes(city.id) : true;
    return matchSearch && matchFav;
  });

  return (
    <aside className="city-list-container">
      <div className="city-list-header">
        <h2>Thành Phố</h2>
        <div className="filter-tabs">
          <button className={`tab-btn ${!filterFav ? 'active' : ''}`} onClick={() => setFilterFav(false)}>Tất cả</button>
          <button className={`tab-btn ${filterFav ? 'active' : ''}`} onClick={() => setFilterFav(true)}>⭐ Yêu thích</button>
        </div>
      </div>

      <div className="search-box">
        <span className="search-icon"></span>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm thành phố (Ha Noi, Đa Nang ...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="cities-wrapper">
        <ul className="city-list">
          {filteredCities.map((city) => (
            <li 
              key={city.id} 
              className={`city-item ${selectedCityId === city.id ? 'active' : ''}`}
              onClick={() => onSelectCity(city)}
            >
              <div className="city-info">
                <span className="city-name">{city.name}</span>
                <span className="city-coords">{city.latitude}°N, {city.longitude}°E</span>
              </div>
              <button 
                className={`fav-btn ${favorites.includes(city.id) ? 'favorited' : ''}`}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(city.id); }}
              >
                {favorites.includes(city.id) ? '⭐' : '☆'}
              </button>
            </li>
          ))}
          {filteredCities.length === 0 && <li className="empty-search">Không tìm thấy thành phố</li>}
        </ul>
      </div>
    </aside>
  );
};