import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Autosuggest from 'react-autosuggest';

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data

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
        setCities(prevCities => [...prevCities, ...newData]);
        setOffset(newOffset);
        setTotalCount(newTotalCount);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    }

    setLoading(false); // Set loading to false after fetching data
  };

  const loadMoreData = () => {
    fetchData();
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
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM14.3 11a6 6 0 111.414 1.414l3.343 3.342a1 1 0 11-1.414 1.414l-3.342-3.343A6 6 0 1114.3 11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <InfiniteScroll
        dataLength={filteredCities.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center mt-4">
            {loading && (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            )}
          </div>
        }
        scrollThreshold={0.9}
        className="overflow-x-auto mt-4"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                City Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timezone
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
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CityTable;
