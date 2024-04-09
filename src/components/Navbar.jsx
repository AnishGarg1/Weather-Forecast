import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() !== '') {
      navigate(`/city-weather/${city}`);
      setCity('');
    }
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">Weather App</span>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="px-4 py-2 rounded-l-md focus:outline-none"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded-r-md font-bold"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
