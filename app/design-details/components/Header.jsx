'use client';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export default function Header() {
    return (
        <header className="flex items-center px-4 py-[14px] bg-white w-full">
            <button className="flex items-center justify-center -ml-1.5 p-1.5 text-[#222222] active:opacity-70 transition-opacity">
                <FiChevronLeft size={22} className="stroke-[2.5]" />
            </button>
            <h1 className="text-[17px] font-bold text-[#222222] ml-2">Design Details</h1>
        </header>
    );
}
