import React from 'react';

const ForecastWeather = ({ forecastData }) => {
  // Assuming forecastData is structured as provided by OpenWeatherMap API
  const { list } = forecastData;

  // Group forecast data by date
  const groupedForecast = groupForecastByDate(list);

  return (
    <div className="mt-8 w-full max-w-4xl">
      <h3 className="text-2xl font-semibold mb-4">5-Day Weather Forecast</h3>
      <div className="relative">
        {Object.keys(groupedForecast).map((date, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg font-semibold mb-2">{formatDate(date)}</p>
            <div className="space-y-4">
              {groupedForecast[date].map((forecast, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-200">
                    <p className="text-sm font-semibold">{formatTime(forecast.dt_txt)}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800">{forecast.weather[0].description}</p>
                    <p className="text-gray-600">Temperature: {forecast.main.temp}°C</p>
                  </div>
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
  const timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return timeString;
};

export default ForecastWeather;
