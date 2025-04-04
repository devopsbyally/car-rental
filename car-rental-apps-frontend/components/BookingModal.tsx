'use client';

import axios from 'axios';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';  // Import StaticImageData for type support
import { FaTimes } from 'react-icons/fa';

type BookingModalProps = {
  car: {
    id: string;
    name: string;
    pricePerDay: number;
    manufacturer: string; // ✅ Add this line
    imageUrl: string | StaticImageData;  // Allow both string and StaticImageData
    seats: number;
    fuel: string;
  };
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
};

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
const cityLocations: { [key: string]: string[] } = {
  'New York': ['Times Square', 'Central Park', 'Brooklyn Bridge', 'Empire State Building'],
  'Los Angeles': ['LAX Airport', 'Santa Monica Pier', 'Hollywood Blvd', 'Griffith Observatory'],
  'Chicago': ['Millennium Park', 'The Art Institute', 'Navy Pier', 'O’Hare Airport'],
  'Houston': ['Downtown Houston', 'Space Center', 'Galleria Mall', 'Museum District'],
  'Miami': ['South Beach', 'Wynwood Walls', 'Downtown Miami', 'Miami International Airport'],
};

const BookingModal = ({ car, onClose, onConfirm, isOpen }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    city: '',
    pickupLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '',
    dropoffTime: '',
    contactNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'city') {
      setFormData((prev) => ({ ...prev, city: value, pickupLocation: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.dropoffDate < formData.pickupDate) {
      alert('Drop-off date must be after pickup date.');
      return;
    }

    try {
      const payload = {
        ...formData,
        carId: car.id,
        carName: car.name,          // Add car name
        carManufacturer: car.manufacturer,  // Add manufacturer if available
      };

      // Update the API URL below based on your actual backend endpoint
      const response = await axios.post('/api/bookings', payload);

      if (response.status === 201) {
        alert('Booking Confirmed & Saved!');
        onConfirm();
        onClose();
      }
    } catch (error: any) {
      console.error('Booking failed', error);
      alert(error.response?.data?.message || 'Something went wrong while booking.');
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 bg-opacity-90 z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 relative flex flex-col md:flex-row gap-6 shadow-2xl transform scale-105 transition-all duration-300">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-700 hover:text-black">
          <FaTimes size={20} />
        </button>

        {/* Left Side - Car Info */}
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text text-center md:text-left">
            Rent a Car Now!
          </h2>
          <Image src={car.imageUrl} alt={car.name} width={400} height={300} className="rounded mx-auto md:mx-0" />
          <h3 className="text-xl font-bold text-black">{car.name}</h3>
          <p className="text-gray-700 font-semibold">Price: ${car.pricePerDay}/day</p>
          <p className="text-gray-700 font-semibold">Seats: {car.seats}</p>
          <p className="text-gray-700 font-semibold">Fuel: {car.fuel}</p>
        </div>

        {/* Right Side - Booking Form */}
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* City */}
            <div>
              <label className="font-semibold text-gray-800">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="select select-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                required
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="font-semibold text-gray-800">Pickup Location</label>
              <select
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                disabled={!formData.city}
                className="select select-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                required
              >
                <option value="">Select Pickup Location</option>
                {formData.city && cityLocations[formData.city]?.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup & Drop-off Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-800">Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="input input-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-800">Drop-off Date</label>
                <input
                  type="date"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleChange}
                  className="input input-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                  required
                />
              </div>
            </div>

            {/* Pickup & Drop-off Times */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-800">Pickup Time</label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="input input-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-gray-800">Drop-off Time</label>
                <input
                  type="time"
                  name="dropoffTime"
                  value={formData.dropoffTime}
                  onChange={handleChange}
                  className="input input-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                  required
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className="font-semibold text-gray-800">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="e.g., +1 123 456 7890"
                className="input input-bordered border-2 border-gray-400 focus:border-blue-600 w-full text-black"
                required
              />
            </div>

            {/* Confirm Booking Button */}
            <button
              type="submit"
              className="btn w-full font-bold text-white bg-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 py-3 rounded-md"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default BookingModal;
