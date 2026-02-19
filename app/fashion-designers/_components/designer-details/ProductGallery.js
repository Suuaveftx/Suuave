"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ProductGallery Component
 *
 * Displays a main product image with a thumbnail selector and navigation controls.
 *
 * @param {Object} props
 * @param {string[]} props.images - An array of image URLs for the product gallery.
 * @param {string} props.title - Title of the product used for alt text in images.
 */

const ProductGallery = ({ images, title, onOpenDetails }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePrevious = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-white rounded-3xl overflow-hidden p-3 lg:p-4 h-auto lg:h-[680px]">
      {/* Thumbnail Navigation - Left side on desktop */}
      <div className="hidden lg:flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > selectedIndex ? 1 : -1);
              setSelectedIndex(index);
            }}
            className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ${selectedIndex === index
              ? "ring-2 ring-customDarkBlue scale-100 shadow-lg"
              : "opacity-60 hover:opacity-100"
              }`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              className="object-cover object-top"
              fill
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {/* Main Display Area */}
      <div
        className="flex-1 relative bg-neutral-100 rounded-[32px] overflow-hidden aspect-[3/4] lg:aspect-auto cursor-pointer group"
        onClick={handleNext}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Swipe up for details - Only on mobile/tablet */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(selectedIndex);
          }}
          className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-xl flex items-center gap-2 text-white text-sm shadow-lg border border-white/20 active:scale-95 transition-transform"
        >
          <span className="font-medium">Swipe up for details</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>

        {/* Dot Pagination - Mobile Only */}
        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-white w-3" : "bg-white/40"
                }`}
            />
          ))}
        </div>

        {/* Floating Icons (Mobile Indicator) */}
        <div className="lg:hidden absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 text-white text-[10px] font-medium border border-white/10">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>
            <span>12</span>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden absolute bottom-12 right-4 z-30 flex flex-col gap-3">
          <button
            onClick={handleBookmark}
            className="w-11 h-11 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center p-0 border border-white/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={isBookmarked ? "#3A98BB" : "none"} stroke={isBookmarked ? "none" : "white"} strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
          </button>
          <button
            onClick={handleShare}
            className="w-11 h-11 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center p-0 border border-white/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          </button>
        </div>

        {/* Main Image */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={selectedIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrevious();
              }
            }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} - Image ${selectedIndex + 1}`}
              className="object-cover object-top"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
