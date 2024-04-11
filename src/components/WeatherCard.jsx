import React from 'react';
import { WiThermometer, WiHumidity } from 'react-icons/wi'; // Import weather icons

const WeatherCard = ({ weatherData }) => {
  const { main, description } = weatherData.weather[0];
  const { temp, feels_like, temp_min, temp_max, humidity } = weatherData.main;

  // Function to render weather icon based on weather description
  const renderWeatherIcon = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case 'clear sky':
        return <WiThermometer size={48} color="#F59E0B" />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <WiThermometer size={48} color="#6B7280" />;
      case 'shower rain':
      case 'rain':
        return <WiThermometer size={48} color="#1F2937" />;
      case 'thunderstorm':
        return <WiThermometer size={48} color="#4B5563" />;
      case 'snow':
        return <WiThermometer size={48} color="#FFFFFF" />;
      case 'mist':
        return <WiThermometer size={48} color="#6B7280" />;
      default:
        return <WiThermometer size={48} color="#1F2937" />;
    }
  };

  return (
    <div className="bg-white w-11/12 mx-auto p-4 rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{description}</h2>
        {renderWeatherIcon(description)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">
            <strong>Temperature:</strong>
          </p>
          <p className="text-lg">{temp}°C</p>
        </div>
        <div>
          <p className="text-gray-600">
            <strong>Feels Like:</strong>
          </p>
          <p className="text-lg">{feels_like}°C</p>
        </div>
        <div>
          <p className="text-gray-600">
            <strong>Min Temperature:</strong>
          </p>
          <p className="text-lg">{temp_min}°C</p>
        </div>
        <div>
          <p className="text-gray-600">
            <strong>Max Temperature:</strong>
          </p>
          <p className="text-lg">{temp_max}°C</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">
            <strong>Humidity:</strong>
          </p>
          <div className="flex items-center">
            <WiHumidity size={24} color="#6B7280" />
            <p className="ml-2 text-lg">{humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
