import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CityWeather from './pages/CityWeather';
import Error from './pages/Error';

const App = () => {
  return (
    <div className="flex min-h-screen flex-col font-inter">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Update route to accept cityName, latitude, and longitude */}
          <Route path="/city-weather/:cityName/:latitude/:longitude" element={<CityWeather />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
