'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import CarCard from '../components/CarCard';
import { cars } from '../data/cars';
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData
import SearchFilter from '../components/SearchFilter';
import BookingModal from '../components/BookingModal';

// Define the type for a car
type Car = {
  id: string;
  name: string;
  pricePerDay: number;
  manufacturer: string; // ✅ Add this line
  imageUrl: string | StaticImageData; // Adjusted to accept both string and StaticImageData
  seats: number;
  fuel: string;
};

const Home = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars); // Added type for filteredCars
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); // Type for selectedCar
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [filters, setFilters] = useState({ sortBy: '', manufacturer: '' });

  useEffect(() => {
    let updatedCars = [...cars];

    if (filters.manufacturer) {
      updatedCars = updatedCars.filter(car => 
        car.name.toLowerCase().includes(filters.manufacturer.toLowerCase())
      );
    }

    if (filters.sortBy === 'lowToHigh') {
      updatedCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === 'highToLow') {
      updatedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    setFilteredCars(updatedCars);
  }, [filters]);

  const handleFilter = ({ sortBy, manufacturer }: { sortBy: string; manufacturer: string }) => {
    setFilters({ sortBy, manufacturer });
  };

  const openBookingModal = (car: Car) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setSelectedCar(null);
    setIsBookingOpen(false);
  };

  const handleBookingConfirmation = () => {
    alert('Booking confirmed!');
    closeBookingModal();
  };

  return (
    <div>
      <NavBar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-6 text-gray-900">Find Your Perfect Ride</h1>
              <p className="text-lg text-gray-700 mb-8">Rent premium cars at affordable rates and drive with style.</p>
              <a href="#cars" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">Explore Cars</a>
            </div>
            <div className="flex-1 relative w-full h-80 md:h-96">
              <Image src="/hero-car.jpg" alt="Luxury Car" fill className="object-contain" priority />
            </div>
          </div>
        </section>

        <section className="py-6 px-4 max-w-6xl mx-auto flex justify-end">
          <SearchFilter onFilter={handleFilter} />
        </section>

        <section id="cars" className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-gray-700">Available Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                name={car.name}
                manufacturer={car.manufacturer}
                pricePerDay={car.pricePerDay}
                imageUrl={car.imageUrl}
                seats={car.seats}
                fuel={car.fuel}
                onBookNow={() => openBookingModal(car)} // Open booking modal
              />
            ))}
          </div>
        </section>
      </main>
      
      {selectedCar && (
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={closeBookingModal} 
          car={selectedCar} 
          onConfirm={handleBookingConfirmation}  // Pass the booking confirmation handler
        />
      )}
    </div>
  );
};

export default Home;
