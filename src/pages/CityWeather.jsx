import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import ForecastWeather from '../components/ForecastWeather';

const CityWeather = () => {
  const { cityName, latitude, longitude } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch current weather data
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=304c0149dd3eb14f58222e1f0ef78214&units=metric`
        );
        setWeatherData(currentWeatherResponse.data);

        // Fetch forecast weather data (5-day forecast with data every 3 hours)
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=304c0149dd3eb14f58222e1f0ef78214&units=metric`
        );
        setForecastData(forecastResponse.data);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error);
        if (error.response && error.response.status === 404) {
          // City not found
          setError(true);
          setLoading(false); // Set loading to false on error
        }
      }
    };

    fetchWeather();
  }, [cityName, latitude, longitude]);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center">{cityName} Weather</h2>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600 text-lg">Fetching weather data...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-lg font-bold text-center">City not found</p>
      ) : (
        <div className="flex flex-col items-center">
          <WeatherCard weatherData={weatherData} />
          {forecastData && <ForecastWeather forecastData={forecastData} />}
        </div>
      )}
    </div>
  );
};

export default CityWeather;
