import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom';

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const newOffset = offset + 100;

      if (newOffset > 10000) {
        setHasMore(false);
        return;
      }

      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?limit=100&offset=${offset}`
      );
      const newData = response.data.results;
      const newTotalCount = response.data.total_count;

      if (cities.length < newTotalCount) {
        const updatedCities = [...newData];
        setCities(prevCities => [...prevCities, ...updatedCities]);
        setOffset(newOffset);
        setTotalCount(newTotalCount);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    }

    setLoading(false);
  };

  const handleSearchChange = (event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredCities);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name} - {suggestion.country}
    </div>
  );

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <div className="relative">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={renderSuggestion}
          inputProps={{
            value: searchTerm,
            onChange: handleSearchChange,
            placeholder: 'Search for a city...',
            className:
              'w-full py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
          }}
        />
      </div>
      <InfiniteScroll
        dataLength={filteredCities.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center my-8">
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120 12h-4a7.96 7.96 0 00-2.367-5.657l-1.414 1.414A5.96 5.96 0 0116 12H8.585l5.707 5.707c.39.39.39 1.023 0 1.414s-1.024.39-1.415 0l-7.5-7.5a1 1 0 010-1.414l7.5-7.5c.391-.39 1.024-.39 1.415 0s.39 1.024 0 1.414L8.586 11H16a7.963 7.963 0 00-.472 2.84l2.717 2.717A7.992 7.992 0 0110 20.292V17H4v5.291z"
                ></path>
              </svg>
            )}
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        }
        scrollThreshold={0.9}
        className="overflow-x-auto mt-4"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timezone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weather
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCities.map(city => (
              <tr key={city.geoname_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {city.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {city.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {city.timezone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    to={{
                      pathname: `/city-weather/${encodeURIComponent(city.name)}`,
                      state: { city },
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    View Weather
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CityTable;
