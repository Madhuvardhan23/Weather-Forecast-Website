import React from 'react';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge, 
  Sun, 
  Sunrise, 
  Sunset,
  Moon
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, unit }) => {
  const { location, current, forecast } = weatherData;
  const today = forecast.forecastday[0];
  
  const temperature = unit === 'celsius' ? current.temp_c : current.temp_f;
  const feelsLike = unit === 'celsius' ? current.feelslike_c : current.feelslike_f;
  const maxTemp = unit === 'celsius' ? today.day.maxtemp_c : today.day.maxtemp_f;
  const minTemp = unit === 'celsius' ? today.day.mintemp_c : today.day.mintemp_f;
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const getWeatherGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-yellow-400 via-orange-400 to-red-400';
    } else if (conditionLower.includes('cloud')) {
      return 'from-gray-400 via-gray-500 to-gray-600';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-blue-400 via-blue-500 to-blue-600';
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-200 via-blue-300 to-blue-400';
    } else {
      return 'from-blue-400 via-purple-500 to-pink-500';
    }
  };

  const weatherStats = [
    { label: 'Feels like', value: `${Math.round(feelsLike)}${unitSymbol}`, icon: Thermometer },
    { label: 'Wind', value: `${Math.round(current.wind_kph)} km/h`, icon: Wind },
    { label: 'Humidity', value: `${current.humidity}%`, icon: Droplets },
    { label: 'Visibility', value: `${Math.round(current.vis_km)} km`, icon: Eye },
    { label: 'Pressure', value: `${Math.round(current.pressure_mb)} mb`, icon: Gauge },
    { label: 'UV Index', value: `${current.uv}`, icon: Sun }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Weather Card */}
      <div className={`bg-gradient-to-br ${getWeatherGradient(current.condition.text)} rounded-3xl shadow-2xl p-8 text-white mb-6 transform hover:scale-105 transition-all duration-300`}>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold mb-2">{location.name}</h2>
            <p className="text-lg opacity-90 mb-4">{location.region}, {location.country}</p>
            <p className="text-sm opacity-80">{new Date(location.localtime).toLocaleString()}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src={current.condition.icon} 
                alt={current.condition.text}
                className="w-24 h-24 mr-4"
              />
              <div>
                <div className="text-6xl font-bold">{Math.round(temperature)}{unitSymbol}</div>
                <div className="text-xl opacity-90">{current.condition.text}</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
              <span>H: {Math.round(maxTemp)}{unitSymbol}</span>
              <span>L: {Math.round(minTemp)}{unitSymbol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {weatherStats.map((stat, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Sun & Moon Info */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sun & Moon</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Sunrise className="w-6 h-6 text-orange-500" />
            <div>
              <div className="text-sm text-gray-500">Sunrise</div>
              <div className="font-medium">{today.astro.sunrise}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Sunset className="w-6 h-6 text-red-500" />
            <div>
              <div className="text-sm text-gray-500">Sunset</div>
              <div className="font-medium">{today.astro.sunset}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Moon className="w-6 h-6 text-blue-500" />
            <div>
              <div className="text-sm text-gray-500">Moon Phase</div>
              <div className="font-medium">{today.astro.moon_phase}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
              {today.astro.moon_illumination}%
            </div>
            <div>
              <div className="text-sm text-gray-500">Illumination</div>
              <div className="font-medium">{today.astro.moon_illumination}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;