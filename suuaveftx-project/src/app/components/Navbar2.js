'use client'
import { useState } from "react";
const Navbar2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#000B0F] text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Logo</h1>
        </div>

        {/* Right Section for Mobile */}
        <div className="flex items-center md:hidden space-x-4">
          {/* Login Button */}
          <button className="text-sm text-[#CECECE]">Login</button>
          {/* Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white"></div>
          </button>
        </div>

        {/* Desktop Menu Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <a href="#blogs">Blogs</a>
          </li>
          <li>
            <a href="#how-it-works">How it works</a>
          </li>
          <li>
            <a href="#faqs">FAQs</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
        </ul>

        {/* Right Section for Desktop */}
        <div className="hidden md:flex items-center space-x-16">
          <button>Login</button>
          <button
            className="text-[#035A7A] px-6 py-3 rounded-full transition hover:opacity-90"
            style={{
              background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#000B0F] p-4">
          <ul className="flex flex-col items-start space-y-4 text-lg">
            <li>
              <a href="#blogs">Blogs</a>
            </li>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
            <li>
              <a href="#faqs">FAQs</a>
            </li>
            <li>
              <a href="#about-us">About Us</a>
            </li>
          </ul>
          <div className="flex flex-col items-start mt-4">
            <button
              className="text-[#035A7A] px-6 py-3 rounded-full transition hover:opacity-90"
              style={{
                background: "radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
