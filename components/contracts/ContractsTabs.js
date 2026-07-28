'use client';
import React from 'react';

const tabs = [
    { id: 'pending', label: 'Pending Contracts', count: 2 },
    { id: 'ongoing', label: 'Ongoing Contracts', count: 3 },
    { id: 'completed', label: 'Completed Contracts', count: 5 },
];

export default function ContractsTabs({ activeTab, onTabChange }) {
    return (
        <div className="flex items-center gap-0 border-b border-[#F3F4F6] w-full mb-6">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={[
                            'relative py-4 text-[15px] font-medium transition-all duration-200 whitespace-nowrap min-w-[200px] text-center',
                            isActive
                                ? 'text-[#111827] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#3A98BB]'
                                : 'text-[#9CA3AF] hover:text-[#6B7280]',
                        ].join(' ')}
                    >
                        {tab.label} ({tab.count})
                    </button>
                );
            })}
        </div>
    );
}
