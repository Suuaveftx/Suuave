'use client';
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function MobileWarningBanner() {
    return (
        <div className="px-4 py-4 w-full bg-[#FAFAFA]">
            <div className="flex items-start gap-3 bg-[#F3F4F6] rounded-xl px-4 py-[14px] w-full">
                <ExclamationTriangleIcon className="w-5 h-5 text-[#6B7280] shrink-0 mt-[2px]" strokeWidth={1.5} />
                <p className="text-[13px] text-[#4B5563] leading-snug">
                    You have pending contracts you are yet to accept. Pending contracts automatically cancels after 48hrs.
                </p>
            </div>
        </div>
    );
}
