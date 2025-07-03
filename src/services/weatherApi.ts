import { WeatherData, LocationSuggestion } from '../types/weather';

const API_KEY = 'demo_key'; // In production, use environment variables
const BASE_URL = 'https://api.weatherapi.com/v1';

// For demo purposes, we'll use mock data
const mockWeatherData: WeatherData = {
  location: {
    name: "New York",
    country: "USA",
    region: "New York",
    lat: 40.71,
    lon: -74.01,
    localtime: new Date().toLocaleString()
  },
  current: {
    temp_c: 22,
    temp_f: 72,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      code: 1003
    },
    wind_mph: 8.1,
    wind_kph: 13.0,
    wind_dir: "WSW",
    pressure_mb: 1013.0,
    pressure_in: 29.92,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 65,
    cloud: 25,
    feelslike_c: 24,
    feelslike_f: 75,
    uv: 6.0,
    vis_km: 16.0,
    vis_miles: 10.0
  },
  forecast: {
    forecastday: [
      {
        date: new Date().toISOString().split('T')[0],
        date_epoch: Math.floor(Date.now() / 1000),
        day: {
          maxtemp_c: 25,
          maxtemp_f: 77,
          mintemp_c: 18,
          mintemp_f: 64,
          avgtemp_c: 22,
          avgtemp_f: 72,
          maxwind_mph: 12.5,
          maxwind_kph: 20.2,
          totalprecip_mm: 0.0,
          totalprecip_in: 0.0,
          avgvis_km: 16.0,
          avgvis_miles: 10.0,
          avghumidity: 65,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003
          },
          uv: 6.0
        },
        astro: {
          sunrise: "06:15 AM",
          sunset: "07:45 PM",
          moonrise: "10:30 PM",
          moonset: "09:15 AM",
          moon_phase: "Waxing Crescent",
          moon_illumination: "25"
        },
        hour: []
      }
    ]
  }
};

// Generate mock forecast data for 5 days
const generateMockForecast = (): WeatherData => {
  const forecast = { ...mockWeatherData };
  const conditions = [
    { text: "Sunny", code: 1000, icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" },
    { text: "Partly cloudy", code: 1003, icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" },
    { text: "Cloudy", code: 1006, icon: "//cdn.weatherapi.com/weather/64x64/day/119.png" },
    { text: "Light rain", code: 1183, icon: "//cdn.weatherapi.com/weather/64x64/day/296.png" },
    { text: "Overcast", code: 1009, icon: "//cdn.weatherapi.com/weather/64x64/day/122.png" }
  ];

  forecast.forecast.forecastday = [];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const condition = conditions[i % conditions.length];
    
    forecast.forecast.forecastday.push({
      date: date.toISOString().split('T')[0],
      date_epoch: Math.floor(date.getTime() / 1000),
      day: {
        maxtemp_c: 20 + Math.floor(Math.random() * 15),
        maxtemp_f: 68 + Math.floor(Math.random() * 27),
        mintemp_c: 10 + Math.floor(Math.random() * 10),
        mintemp_f: 50 + Math.floor(Math.random() * 18),
        avgtemp_c: 15 + Math.floor(Math.random() * 10),
        avgtemp_f: 59 + Math.floor(Math.random() * 18),
        maxwind_mph: 5 + Math.floor(Math.random() * 15),
        maxwind_kph: 8 + Math.floor(Math.random() * 24),
        totalprecip_mm: Math.floor(Math.random() * 10),
        totalprecip_in: Math.floor(Math.random() * 0.4 * 100) / 100,
        avgvis_km: 10 + Math.floor(Math.random() * 10),
        avgvis_miles: 6 + Math.floor(Math.random() * 6),
        avghumidity: 40 + Math.floor(Math.random() * 40),
        condition,
        uv: 3 + Math.floor(Math.random() * 5)
      },
      astro: {
        sunrise: "06:15 AM",
        sunset: "07:45 PM",
        moonrise: "10:30 PM",
        moonset: "09:15 AM",
        moon_phase: "Waxing Crescent",
        moon_illumination: "25"
      },
      hour: []
    });
  }
  
  return forecast;
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  // For demo purposes, return mock data
  // In production, implement actual API call:
  // const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5`);
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = generateMockForecast();
      mockData.location.name = location;
      resolve(mockData);
    }, 1000);
  });
};

export const fetchLocationSuggestions = async (query: string): Promise<LocationSuggestion[]> => {
  // For demo purposes, return mock suggestions
  // In production, implement actual API call:
  // const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
  // return response.json();
  
  const mockSuggestions: LocationSuggestion[] = [
    { id: 1, name: "New York", region: "New York", country: "USA", lat: 40.71, lon: -74.01, url: "new-york-new-york-usa" },
    { id: 2, name: "London", region: "City of London", country: "UK", lat: 51.52, lon: -0.11, url: "london-city-of-london-uk" },
    { id: 3, name: "Tokyo", region: "Tokyo", country: "Japan", lat: 35.69, lon: 139.69, url: "tokyo-tokyo-japan" },
    { id: 4, name: "Sydney", region: "New South Wales", country: "Australia", lat: -33.87, lon: 151.21, url: "sydney-new-south-wales-australia" },
    { id: 5, name: "Paris", region: "Ile-de-France", country: "France", lat: 48.87, lon: 2.33, url: "paris-ile-de-france-france" }
  ];
  
  return mockSuggestions.filter(suggestion => 
    suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
    suggestion.country.toLowerCase().includes(query.toLowerCase())
  );
};

export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};