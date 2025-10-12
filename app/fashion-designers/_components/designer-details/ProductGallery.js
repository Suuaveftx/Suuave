"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ProductGallery Component
 *
 * Displays a main product image with a thumbnail selector and navigation controls.
 *
 * @param {Object} props
 * @param {string[]} props.images - An array of image URLs for the product gallery.
 * @param {string} props.title - Title of the product used for alt text in images.
 */

const ProductGallery = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex gap-4 bg-white rounded-2xl overflow-hidden p-5 h-[640px]">
      {/* Thumbnail Navigation */}
      <div className="flex flex-col -ml-2 gap-3 overflow-y-auto overflow-x-hidden">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300  ${
              selectedIndex === index
                ? "ring-2 ring-white ring-opacity-80 scale-105"
                : "opacity-60 hover:opacity-80"
            }`}
          >
            <img
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>

      {/* Main Display Area */}
      <div className="flex-1 relative flex items-center justify-center bg-neutral-200 rounded-[24px] overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-colors duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-colors duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Main Image */}
        <img
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full   object-cover object-top transition-opacity duration-500"
        />

        {/* Image Counter */}
        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-lg px-2 pt-0 py-0">
          <span className="text-white text-xs font-medium">
            {selectedIndex + 1} / {images.length}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default ProductGallery;
