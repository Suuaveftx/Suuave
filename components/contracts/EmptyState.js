'use client';

import React from 'react';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function EmptyState({ tab }) {
    const labels = {
        pending: 'No pending contracts',
        ongoing: 'No ongoing contracts',
        completed: 'No completed contracts',
    };

    return (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF6FB] flex items-center justify-center">
                <DocumentMagnifyingGlassIcon className="w-8 h-8 text-[#3A98BB]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#222222]">
                {labels[tab] || 'No contracts found'}
            </h3>
            <p className="text-[14px] text-gray-400 max-w-xs">
                Try adjusting your search or filters, or check back later.
            </p>
        </div>
    );
}
