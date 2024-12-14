'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaChevronDown, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-[#CCE7F2] shadow-md">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <Image
          src="/dev-images/dolphins.png" // Replace with your logo icon path
          alt="Logo Icon"
          width={140} // Set the actual width of the image in pixels
          height={40} // Set the actual height of the image in pixels
          className="mr-2" // Tailwind class for margin
        />
      </div>

      {/* Desktop Menu - visible only on larger screens */}
      <div className="hidden lg:flex space-x-6">
        <a href="#" className="text-gray-600">Jobs</a>
        <a href="#" className="text-gray-600">Proposals</a>
        <a href="#" className="text-gray-600">My Contracts</a>
      </div>

      {/* Right Section: Profile Image, Hamburger Menu for Mobile */}
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <Image
          src="/dev-images/Avatar.png" // Replace with your profile icon path
          alt="Profile Icon"
          width={48}
          height={48}
          className="mr-2" // Tailwind class for margin
        />
        
        {/* Hamburger Menu Button for Mobile */}
        <div className="block lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-gray-600 w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu - only visible when hamburger is clicked */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4 lg:hidden">
          <a href="#" className="text-gray-600">Jobs</a>
          <a href="#" className="text-gray-600">Proposals</a>
          <a href="#" className="text-gray-600">My Contracts</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
