import type { FC } from 'react';
import type { TemperatureUnit } from '../types';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export const UnitToggle: FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle" role="group" aria-label="Chọn đơn vị nhiệt độ">
      <button
        type="button"
        className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
        onClick={() => onToggle('C')}
        aria-pressed={unit === 'C'}
      >
        °C
      </button>
      <button
        type="button"
        className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
        onClick={() => onToggle('F')}
        aria-pressed={unit === 'F'}
      >
        °F
      </button>
    </div>
  );
};

