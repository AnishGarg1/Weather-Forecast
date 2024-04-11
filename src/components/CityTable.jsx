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
        loader={<div className="text-center my-4">Loading...</div>}
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
