'use client';
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-center gap-3 mt-8 pb-6">
            <span className="text-[13px] text-[#6B7280] font-medium">
                {start} - {end} of {totalItems}
            </span>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded-md text-[#374151] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded-md text-[#374151] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
