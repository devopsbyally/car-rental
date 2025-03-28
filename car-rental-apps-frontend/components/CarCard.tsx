'use client';

import Image from 'next/image';
import Link from 'next/link';

type CarProps = {
  id: string;
  name: string;
  pricePerDay: number;
  imageUrl: string;
  seats: number;
  fuel: string;
};

const CarCard: React.FC<CarProps> = ({ id, name, pricePerDay, imageUrl, seats, fuel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1">${pricePerDay}/day</p>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>🪑 {seats} seats</span>
          <span>⛽ {fuel}</span>
        </div>
        <Link
          href={`/car/${id}`}
          className="block mt-4 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
