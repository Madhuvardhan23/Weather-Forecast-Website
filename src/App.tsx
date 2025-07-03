import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import LocationSearch from './components/LocationSearch';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import TemperatureToggle from './components/TemperatureToggle';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData } from './services/weatherApi';
import { WeatherData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const handleLocationSelect = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (weatherData) {
      handleLocationSelect(weatherData.location.name);
    }
  };

  useEffect(() => {
    // Load default weather data for New York on initial load
    handleLocationSelect('New York');
  }, []);

  const getBackgroundGradient = () => {
    if (!weatherData) return 'from-blue-400 via-blue-500 to-purple-600';
    
    const condition = weatherData.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 20;
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isNight 
        ? 'from-indigo-900 via-purple-900 to-pink-900'
        : 'from-yellow-400 via-orange-400 to-red-400';
    } else if (condition.includes('cloud')) {
      return isNight
        ? 'from-gray-800 via-gray-700 to-gray-600'
        : 'from-gray-400 via-gray-500 to-gray-600';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return isNight
        ? 'from-blue-900 via-blue-800 to-gray-800'
        : 'from-blue-400 via-blue-500 to-blue-600';
    } else if (condition.includes('snow')) {
      return isNight
        ? 'from-blue-900 via-blue-800 to-gray-700'
        : 'from-blue-200 via-blue-300 to-blue-400';
    } else {
      return 'from-blue-400 via-purple-500 to-pink-500';
    }
  };

  const getFloatingIcons = () => {
    if (!weatherData) return [];
    
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear')) {
      return [Sun, Sun, Sun];
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return [CloudRain, CloudRain, Cloud];
    } else {
      return [Cloud, Cloud, Cloud];
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}>
      {/* Floating Weather Icons */}
      {getFloatingIcons().map((Icon, index) => (
        <Icon
          key={index}
          className={`absolute text-white/10 animate-pulse pointer-events-none
            ${index === 0 ? 'w-20 h-20 top-20 left-10 animate-bounce' : ''}
            ${index === 1 ? 'w-16 h-16 top-40 right-20 animate-pulse' : ''}
            ${index === 2 ? 'w-12 h-12 bottom-40 left-20 animate-bounce' : ''}
          `}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${3 + index}s`
          }}
        />
      ))}
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Weather Forecast
          </h1>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">
            Get accurate weather forecasts for your location
          </p>
          
          {/* Search and Temperature Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <LocationSearch onLocationSelect={handleLocationSelect} isLoading={loading} />
            <TemperatureToggle unit={unit} onToggle={setUnit} />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {loading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}
          
          {weatherData && !loading && !error && (
            <>
              <WeatherCard weatherData={weatherData} unit={unit} />
              <ForecastCard forecast={weatherData.forecast.forecastday} unit={unit} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;