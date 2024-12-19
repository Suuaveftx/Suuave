'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaChevronDown, FaBars } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/jobpost'); // Default active menu

  const getLinkClass = (path) => {
    const isActive = activeMenu === path;
    return isActive
      ? 'text-[#444444] underline decoration-[#444444] font-bold'
      : 'text-gray-600';
  };

  const handleMenuClick = (path) => {
    setActiveMenu(path); // Update the active menu state
    setIsMenuOpen(false); // Close the mobile menu after clicking
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-[#CCE7F2] shadow-md">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <Image
          src="/dev-images/dolphins.png"
          alt="Logo Icon"
          width={140}
          height={40}
          className="mr-2"
        />
      </div>

      {/* Desktop Menu - visible only on larger screens */}
      <div className="hidden lg:flex space-x-6">
        <Link href="/jobpost"
          
            onClick={() => handleMenuClick('/jobpost')}
            className={getLinkClass('/jobpost')}
          >
            Jobs
          
        </Link>
        <Link href="/proposals"
          
            onClick={() => handleMenuClick('/proposals')}
            className={getLinkClass('/proposals')}
          >
            Proposals
          
        </Link>
        <Link href="/contracts"
          
            onClick={() => handleMenuClick('/contracts')}
            className={getLinkClass('/contracts')}
          >
            My Contracts
          
        </Link>
      </div>

      {/* Right Section: Profile Image, Hamburger Menu for Mobile */}
      <div className="flex items-center space-x-4">
        <Image
          src="/dev-images/Avatar.png"
          alt="Profile Icon"
          width={48}
          height={48}
          className="mr-2"
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
          <Link href="/jobpost">
            <a
              onClick={() => handleMenuClick('/jobpost')}
              className={getLinkClass('/jobpost')}
            >
              Jobs
            </a>
          </Link>
          <Link href="/proposals">
            <a
              onClick={() => handleMenuClick('/proposals')}
              className={getLinkClass('/proposals')}
            >
              Proposals
            </a>
          </Link>
          <Link href="/contracts">
            <a
              onClick={() => handleMenuClick('/contracts')}
              className={getLinkClass('/contracts')}
            >
              My Contracts
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
