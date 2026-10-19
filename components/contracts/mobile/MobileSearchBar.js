'use client';
import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function MobileSearchBar({ value, onChange }) {
    return (
        <div className="flex items-center gap-3 px-4 pt-5 pb-5 w-full bg-[#FAFAFA]">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-[#9CA3AF]" strokeWidth={2} />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search project"
                    className="block w-full pl-10 pr-3 py-[10px] bg-transparent border border-[#D1D5DB] rounded-full text-[14px] placeholder-[#9CA3AF] text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#3DA8D8] focus:border-[#3DA8D8] transition-colors"
                />
            </div>
            <button className="flex-shrink-0 p-1">
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-[#6B7280]" strokeWidth={1.5} />
            </button>
        </div>
    );
}
