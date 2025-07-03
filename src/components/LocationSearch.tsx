import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { fetchLocationSuggestions, getCurrentLocation } from '../services/weatherApi';
import { LocationSuggestion } from '../types/weather';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  isLoading: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const results = await fetchLocationSuggestions(query);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleLocationSelect = (location: string) => {
    setQuery(location);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  const handleCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { lat, lon } = await getCurrentLocation();
      const locationString = `${lat},${lon}`;
      onLocationSelect(locationString);
      setQuery('Current Location');
    } catch (error) {
      console.error('Error getting current location:', error);
      alert('Unable to get current location. Please check your permissions.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-lg"
            disabled={isLoading}
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
          )}
        </div>
        
        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={isLoadingLocation || isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-blue-500 transition-colors duration-200 disabled:opacity-50"
          title="Use current location"
        >
          {isLoadingLocation ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleLocationSelect(suggestion.name)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-blue-50"
            >
              <div className="font-medium text-gray-900">{suggestion.name}</div>
              <div className="text-sm text-gray-500">{suggestion.region}, {suggestion.country}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;