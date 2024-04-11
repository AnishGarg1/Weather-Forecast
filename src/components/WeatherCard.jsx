import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { main, description } = weatherData.weather[0];
  const { temp, feels_like, temp_min, temp_max, humidity } = weatherData.main;

  return (
    <div className="bg-white w-11/12 mx-auto p-4 rounded shadow-md">
      <p className="text-xl font-semibold mb-4">{description}</p>
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
          <p className="text-lg">{humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
