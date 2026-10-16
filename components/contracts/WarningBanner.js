'use client';
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function WarningBanner() {
    return (
        <div className="flex items-start gap-2.5 bg-[#FFF4E5] border border-[#FDDCAA] rounded-lg px-4 py-3 w-fit max-w-[520px] mb-5">
            <ExclamationTriangleIcon className="w-[18px] h-[18px] text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
                <p className="text-[12px] font-semibold text-[#D97706] leading-snug">
                    These contracts are yet to be accepted.
                </p>
                <p className="text-[12px] text-[#D97706] leading-snug">
                    Artists have 2 days to accept offers, to avoid automatic cancellation.
                </p>
            </div>
        </div>
    );
}
