import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';

const CityWeather = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=304c0149dd3eb14f58222e1f0ef78214&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error);
      }
    };

    fetchWeather();
  }, [cityName]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{cityName} Weather</h2>
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CityWeather;
