import React, { useState, useEffect } from 'react';
import CityTable from '../components/CityTable';
import WeatherCard from '../components/WeatherCard';
import axios from 'axios';

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch weather data based on user's current location
    const fetchWeatherByLocation = async (latitude, longitude) => {
      try {
        const apiKey = '304c0149dd3eb14f58222e1f0ef78214'; // Replace with your OpenWeatherMap API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setCurrentWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
      }
    };

    // Function to handle successful retrieval of user's location
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByLocation(latitude, longitude);
    };

    // Function to handle errors in retrieving user's location
    const handleError = (error) => {
      console.error('Error getting user location:', error);
      setError('Failed to get user location');
    };

    // Get user's current location using browser's geolocation API
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Weather Forecast App</h1>
      {error && <p className="text-red-500">{error}</p>}
      {currentWeather && <WeatherCard weatherData={currentWeather} />}
      <CityTable />
    </div>
  );
};

export default Home;
