import React, { useState, useEffect } from 'react';
import CityTable from '../components/CityTable';
import WeatherCard from '../components/WeatherCard';
import axios from 'axios';

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherByLocation = async (latitude, longitude) => {
      try {
        const apiKey = '304c0149dd3eb14f58222e1f0ef78214';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setCurrentWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
      }
    };

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByLocation(latitude, longitude);
    };

    const handleError = (error) => {
      console.error('Error getting user location:', error);
      setError('Failed to get user location');
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 underline text-center">Weather Forecast App</h1>
      <div className="flex justify-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
      <div className="flex justify-center mb-8">
        {currentWeather && <WeatherCard weatherData={currentWeather} />}
      </div>
      <CityTable />
    </div>
  );
};

export default Home;
