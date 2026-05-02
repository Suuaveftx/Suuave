"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { FaShareAlt, FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';
import { useAppStore } from '../../../../store/index';

/**
 * ProductGallery Component
 *
 * Displays a main product image with a thumbnail selector and navigation controls.
 *
 * @param {Object} props
 * @param {string[]} props.images - An array of image URLs for the product gallery.
 * @param {string} props.title - Title of the product used for alt text in images.
 */

const ProductGallery = ({ images, title, onOpenDetails, isBookmarked, onToggleSave }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isMobileDetailsDrawerOpen = useAppStore((state) => state.isMobileDetailsDrawerOpen);

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
    onToggleSave();
  };

  const [copied, setCopied] = useState(false);

  const handleSocialShare = (platform) => {
    const url = window.location.href;
    const text = "Check out this fashion design!";

    let shareUrl = "";
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
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
      <motion.div
        animate={{
          scale: isMobileDetailsDrawerOpen ? 0.88 : 1,
          borderRadius: isMobileDetailsDrawerOpen ? "40px" : "32px",
          y: isMobileDetailsDrawerOpen ? -5 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="flex-1 relative bg-neutral-100 rounded-[32px] overflow-hidden aspect-[3/4] lg:aspect-auto cursor-pointer group origin-top shadow-xl transition-shadow"
      >
        {/* Dimmer overlay for when sheet opens */}
        <motion.div 
          animate={{ opacity: isMobileDetailsDrawerOpen ? 0.4 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black z-[40] pointer-events-none"
        />

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

        {/* Bottom dark gradient for UI pop on mobile */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* Swipe up for details - Only on mobile/tablet */}
        <AnimatePresence>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onTap={(e) => {
                e.stopPropagation();
                onOpenDetails(selectedIndex);
              }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden absolute bottom-12 left-0 right-0 mx-auto w-fit z-[30] bg-neutral-900/40 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 text-white text-[13px] font-normal tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-200 pointer-events-auto"
            >
              <span>Swipe up for details</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </motion.button>
        </AnimatePresence>

        {/* Dot Pagination - Mobile Only */}
        <div className="lg:hidden absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-white w-1.5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/50 w-1.5"
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
        <div className="lg:hidden absolute bottom-5 right-4 z-30 flex flex-col items-center bg-neutral-900/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
          <button
            onClick={handleBookmark}
            className="w-[3.25rem] h-[3.25rem] flex items-center justify-center transition-colors active:bg-white/10 rounded-t-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isBookmarked ? "#3A98BB" : "none"} stroke={isBookmarked ? "none" : "white"} strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
          </button>
          
          <div className="w-[60%] h-[1px] bg-white/10" />
          
          {/* Share Dropdown - Mobile */}
          <div className="relative">
            <Dropdown placement="top-end" className="z-[100]">
              <DropdownTrigger>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-[3.25rem] h-[3.25rem] flex items-center justify-center transition-colors active:bg-white/10 rounded-b-xl"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Share options"
                onAction={(key) => handleSocialShare(key)}
              >
                <DropdownItem key="whatsapp" startContent={<FaWhatsapp className="text-green-500" />}>
                  WhatsApp
                </DropdownItem>
                <DropdownItem key="twitter" startContent={<FaTwitter className="text-blue-400" />}>
                  X (Twitter)
                </DropdownItem>
                <DropdownItem key="facebook" startContent={<FaFacebook className="text-blue-700" />}>
                  Facebook
                </DropdownItem>
                <DropdownItem key="linkedin" startContent={<FaLinkedin className="text-blue-800" />}>
                  LinkedIn
                </DropdownItem>
                <DropdownItem key="copy" startContent={<FaCopy className="text-gray-500" />}>
                  Copy Link
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {copied && (
              <span className="absolute -top-10 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-30">
                Copied!
              </span>
            )}
          </div>
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
      </motion.div>
    </div>
  );
};

export default ProductGallery;
