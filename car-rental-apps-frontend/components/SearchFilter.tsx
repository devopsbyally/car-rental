'use client';

import React, { useState } from 'react';

// ✅ Add this type definition at the top
type SearchFilterProps = {
  onFilter: (filters: { sortBy: string; manufacturer: string }) => void;
};

const SearchFilter = ({ onFilter }: SearchFilterProps) => {
  const [sortBy, setSortBy] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const handleSearch = () => {
    console.log('Filtering with:', { sortBy, manufacturer });
    onFilter({ sortBy, manufacturer });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl rounded-2xl border border-gray-300">
      <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
        Find Your Perfect Car 🚗
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="relative w-full md:w-52">
          <select
            className="px-4 py-3 text-gray-900 font-semibold w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 hover:border-yellow-500 transition-all duration-300"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        <div className="relative w-full md:w-52">
          <select
            className="px-4 py-3 text-gray-900 font-semibold w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 hover:border-green-500 transition-all duration-300"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          >
            <option value="">Manufacturer</option>
            <option value="BMW">BMW</option>
            <option value="Kia">Kia</option>
            <option value="Tesla">Tesla</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
            <option value="Genesis">Genesis</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Nissan">Nissan</option>
            <option value="Lexus">Lexus</option>
          </select>
        </div>

        <button
          className="px-6 py-3 font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md hover:from-blue-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105"
          onClick={handleSearch}
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
