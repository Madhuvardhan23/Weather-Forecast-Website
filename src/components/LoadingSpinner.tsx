import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="text-gray-600 text-lg">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;