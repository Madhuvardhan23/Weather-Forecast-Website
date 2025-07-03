import React from 'react';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: (unit: 'celsius' | 'fahrenheit') => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
      <button
        onClick={() => onToggle('celsius')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          unit === 'celsius'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-600 hover:text-blue-500'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle('fahrenheit')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          unit === 'fahrenheit'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-600 hover:text-blue-500'
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;