'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar'; // Import NavBar component
import CarCard from '../components/CarCard';  // Import CarCard component
import { cars } from '../data/cars';  // Import the cars data from the data folder
import Image from 'next/image'; // Import Image from next/image
import SearchFilter from '../components/SearchFilter';  // 🔹 Added import for SearchFilter

const Home = () => {
  const [filteredCars, setFilteredCars] = useState(cars); // 🔹 Added state for filtered cars

  // 🔹 Function to handle filtering
  const handleFilter = ({ sortBy, manufacturer }) => {
    let updatedCars = [...cars];

    if (manufacturer) {
      updatedCars = updatedCars.filter(car => car.name.includes(manufacturer));
    }

    if (sortBy === 'lowToHigh') {
      updatedCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'highToLow') {
      updatedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    setFilteredCars(updatedCars);
  };

  return (
    <div>
      <NavBar /> {/* Render NavBar at the top */}
      <main className="min-h-screen bg-gray-50">
           {/* Hero Section */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* Text Block */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Find Your Perfect Ride</h1>
            <p className="text-lg text-gray-700 mb-8">Rent premium cars at affordable rates and drive with style.</p>
            <a
              href="#cars"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
            >
              Explore Cars
            </a>
          </div>

          {/* Image Block */}
          <div className="flex-1 relative w-full h-80 md:h-96">
            <Image
              src="/hero-car.jpg"
              alt="Luxury Car"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* 🔹 Positioned Search Filter to the Right */}
      <section className="py-6 px-4 max-w-6xl mx-auto flex justify-end">
        <SearchFilter onFilter={handleFilter} /> {/* 🔹 Now has onFilter prop */}
      </section>

      {/* Cars Section */}
      <section id="cars" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-gray-700">Available Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCars.map((car) => (  // 🔹 Now uses filteredCars instead of cars
            <CarCard
              key={car.id}
              id={car.id}
              name={car.name}
              pricePerDay={car.pricePerDay}
              imageUrl={car.imageUrl}
              seats={car.seats}
              fuel={car.fuel}
            />
          ))}
        </div>
      </section>
      </main>
    </div>
  );
};

export default Home;