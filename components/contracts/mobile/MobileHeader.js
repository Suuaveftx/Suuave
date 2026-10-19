'use client';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function MobileHeader() {
    const router = useRouter();

    return (
        <div className="w-full bg-white border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3 px-4 pt-2 pb-5 w-full">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-[#374151]"
                >
                    <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <h1 className="text-[20px] font-bold text-[#111827] leading-none">
                    My Contracts
                </h1>
            </div>
        </div>
    );
}
