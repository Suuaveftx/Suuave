'use client';
import React from 'react';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { EnvelopeIcon, BellIcon } from '@heroicons/react/24/solid';

export default function MobileNavbar() {
    return (
        <nav className="flex items-center justify-between w-full h-[72px] bg-[#DFF4FF] px-4 sticky top-0 z-[200]">
            {/* Left Area - Logo */}
            <div className="flex items-center">
                <div className="w-[110px] h-[34px] relative">
                    <Image
                        src="/dev-images/SuuaveTxt.png"
                        alt="Suuave logo"
                        fill
                        className="object-contain object-left scale-150 origin-left"
                    />
                </div>
            </div>

            {/* Right Area - Action Icons */}
            <div className="flex items-center gap-4">
                <button className="text-[#1F2937]">
                    <EnvelopeIcon className="w-[20px] h-[20px]" />
                </button>
                <button className="text-[#1F2937]">
                    <BellIcon className="w-[20px] h-[20px]" />
                </button>

                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E5E7EB]">
                    <Image
                        src="/dev-images/Avatar.png"
                        alt="Profile Avatar"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Hamburger Menu */}
                <button className="w-8 h-8 rounded-full border border-[#9CA3AF] flex items-center justify-center text-[#1F2937]">
                    <Bars3Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>
            </div>
        </nav>
    );
}
