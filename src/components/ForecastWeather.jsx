import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi'; // Import weather icons

const ForecastWeather = ({ forecastData }) => {
  if (!forecastData) {
    return null; // Handle case where forecast data is not available yet
  }

  const { list } = forecastData;

  // Group forecast data by date
  const groupedForecast = groupForecastByDate(list);

  return (
    <div className="mt-8 w-full max-w-4xl">
      <h3 className="text-2xl font-semibold mb-4">5-Day Weather Forecast</h3>
      <div className="space-y-8">
        {Object.keys(groupedForecast).map((date, index) => (
          <div key={index}>
            <p className="text-lg font-semibold mb-2">{formatDate(date)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedForecast[date].map((forecast, idx) => (
                <div key={idx} className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">{formatTime(forecast.dt_txt)}</p>
                    {renderWeatherIcon(forecast.weather[0].main)}
                  </div>
                  <p className="text-gray-600">{forecast.weather[0].description}</p>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-gray-600">Temperature:</p>
                      <p className="text-lg">{forecast.main.temp}°C</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Min Temp:</p>
                      <p className="text-lg">{forecast.main.temp_min}°C</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Max Temp:</p>
                      <p className="text-lg">{forecast.main.temp_max}°C</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-600">Humidity:</p>
                    <p className="text-lg">{forecast.main.humidity}%</p>
                  </div>
                  {forecast.rain && (
                    <div className="mt-2">
                      <p className="text-gray-600">Precipitation:</p>
                      <p className="text-lg">{forecast.rain['3h']} mm</p>
                    </div>
                  )}
                  {forecast.snow && (
                    <div className="mt-2">
                      <p className="text-gray-600">Snow:</p>
                      <p className="text-lg">{forecast.snow['3h']} mm</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to group forecast data by date
const groupForecastByDate = (forecastList) => {
  const grouped = {};
  forecastList.forEach((forecast) => {
    const date = forecast.dt_txt.split(' ')[0]; // Extract date part from dt_txt
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(forecast);
  });
  return grouped;
};

// Helper function to format date
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
};

// Helper function to format time
const formatTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper function to render weather icon based on weather condition
const renderWeatherIcon = (weatherMain) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return <WiDaySunny size={32} color="#F59E0B" />;
    case 'clouds':
      return <WiCloudy size={32} color="#6B7280" />;
    case 'rain':
      return <WiRain size={32} color="#1F2937" />;
    case 'thunderstorm':
      return <WiThunderstorm size={32} color="#4B5563" />;
    case 'snow':
      return <WiSnow size={32} color="#FFFFFF" />;
    case 'mist':
      return <WiFog size={32} color="#6B7280" />;
    default:
      return null;
  }
};

export default ForecastWeather;
