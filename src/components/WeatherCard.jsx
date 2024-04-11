import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { main, description } = weatherData.weather[0];
  const { temp, feels_like, temp_min, temp_max, humidity } = weatherData.main;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <p>
        <strong>Weather:</strong> {description}
      </p>
      <p>
        <strong>Temperature:</strong> {temp}°C
      </p>
      <p>
        <strong>Feels Like:</strong> {feels_like}°C
      </p>
      <p>
        <strong>Min Temperature:</strong> {temp_min}°C
      </p>
      <p>
        <strong>Max Temperature:</strong> {temp_max}°C
      </p>
      <p>
        <strong>Humidity:</strong> {humidity}%
      </p>
    </div>
  );
};

export default WeatherCard;
