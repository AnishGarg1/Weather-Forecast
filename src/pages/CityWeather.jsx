import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';

const CityWeather = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=304c0149dd3eb14f58222e1f0ef78214&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error);
        if (error.response && error.response.status === 404) {
          // City not found
          setError(true);
        }
      }
    };

    fetchWeather();
  }, [cityName]);

  return (
    <div className="container mx-auto mt-8 w-11/12 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-6">{cityName} Weather</h2>
      {error ? (
        <p className="text-red-500 text-lg font-bold">City not found</p>
      ) : weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 text-lg">Fetching weather data...</p>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
