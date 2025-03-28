'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black flex items-center">
          <Image
            src="/logo.png"  // Ensure your logo image is placed in the 'public' folder
            alt="CarRental Logo"
            width={100}  // Adjust the width to fit your design
            height={100} // Adjust the height to fit your design
            className="mr-2"
          />
          Private Car Rentals
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <Link href="/" className="text-black hover:text-primary font-medium">
            Home
          </Link>
          <Link href="#cars" className="text-black hover:text-primary font-medium">
            Cars
          </Link>
          <Link href="/about" className="text-black hover:text-primary font-medium">
            About
          </Link>
          <Link href="/contact" className="text-black hover:text-primary font-medium">
            Contact
          </Link>
        </div>

        {/* Sign In Button */}
        <Link
          href="/login"
          className="hidden md:inline-block bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Sign In
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button className="text-gray-700 text-2xl">&#9776;</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
