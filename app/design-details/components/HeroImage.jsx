'use client';
import React from 'react';
import { FiEye } from 'react-icons/fi';
import { IoBookmark } from 'react-icons/io5';
import { FiShare2 } from 'react-icons/fi';
import { Image as NextImage } from 'next/image';

export default function HeroImage() {
    return (
        <div className="relative w-full h-[540px] bg-gray-200">
            <img
                src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=390&h=540"
                alt="Dress Design"
                className="w-full h-full object-cover object-top"
            />

            {/* View count indicator */}
            <div className="absolute top-[18px] right-[18px] flex items-center gap-[6px] text-white">
                <FiEye size={18} className="stroke-2" />
                <span className="text-[13px] font-medium tracking-wide">12</span>
            </div>

            {/* Floating action container */}
            <div className="absolute right-4 bottom-14 flex flex-col items-center bg-black/60 rounded-xl backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <button className="p-3 text-[#3A98BB] hover:opacity-80 transition-opacity">
                    <IoBookmark size={20} />
                </button>
                <div className="w-[60%] h-[1px] bg-white/20"></div>
                <button className="p-3 text-white hover:opacity-80 transition-opacity">
                    <FiShare2 size={20} className="stroke-2" />
                </button>
            </div>

            {/* Image pagination indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-[6px]">
                <div className="w-[14px] h-[4px] rounded-full bg-white"></div>
                <div className="w-[4px] h-[4px] rounded-full bg-white/60"></div>
                <div className="w-[4px] h-[4px] rounded-full bg-white/60"></div>
                <div className="w-[4px] h-[4px] rounded-full bg-white/60"></div>
            </div>
        </div>
    );
}
