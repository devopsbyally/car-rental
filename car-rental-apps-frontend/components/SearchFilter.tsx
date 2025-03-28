'use client';

import React, { useState } from 'react';

const SearchFilter = ({ onFilter }) => {
  const [sortBy, setSortBy] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const handleSearch = () => {
    // Calling the onFilter function with the selected filters
    onFilter({ sortBy, manufacturer });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-white shadow-xl rounded-lg border border-gray-300">
      {/* Sort By Dropdown */}
      <div className="w-full md:w-auto">
        <select
          className="select select-bordered text-gray-900 font-semibold w-full md:w-48"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option disabled selected>Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Manufacturer Dropdown */}
      <div className="w-full md:w-auto">
        <select
          className="select select-bordered text-gray-900 font-semibold w-full md:w-48"
          onChange={(e) => setManufacturer(e.target.value)}
        >
          <option value="">Manufacturers</option>
          <option value="BMW">BMW</option>
          <option value="Kia">Kia</option>
          <option value="Tesla">Tesla</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Audi">Audi</option>
          <option value="Genesis">Genesis</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow-md transition duration-300"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
