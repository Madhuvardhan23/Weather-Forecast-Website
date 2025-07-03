import React from 'react';
import { Calendar, ArrowUp, ArrowDown, Cloud, Droplets, Wind } from 'lucide-react';
import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: 'celsius' | 'fahrenheit';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const getConditionGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200';
    } else if (conditionLower.includes('cloud')) {
      return 'from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300';
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200';
    } else {
      return 'from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-900">5-Day Forecast</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => {
            const maxTemp = unit === 'celsius' ? day.day.maxtemp_c : day.day.maxtemp_f;
            const minTemp = unit === 'celsius' ? day.day.mintemp_c : day.day.mintemp_f;
            
            return (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${getConditionGradient(day.day.condition.text)} rounded-lg p-4 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
              >
                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-2">
                    {formatDate(day.date)}
                  </div>
                  
                  <div className="flex justify-center mb-3">
                    <img 
                      src={day.day.condition.icon} 
                      alt={day.day.condition.text}
                      className="w-12 h-12"
                    />
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-3 min-h-[2.5rem] flex items-center justify-center">
                    {day.day.condition.text}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-gray-900">{Math.round(maxTemp)}{unitSymbol}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ArrowDown className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-600">{Math.round(minTemp)}{unitSymbol}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span>{day.day.avghumidity}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="w-3 h-3 text-gray-500" />
                          <span>{Math.round(day.day.maxwind_kph)} km/h</span>
                        </div>
                      </div>
                      {day.day.totalprecip_mm > 0 && (
                        <div className="flex items-center justify-center space-x-1 text-xs text-blue-600">
                          <Cloud className="w-3 h-3" />
                          <span>{day.day.totalprecip_mm}mm</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;