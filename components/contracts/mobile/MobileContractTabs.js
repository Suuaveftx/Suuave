'use client';
import React, { useRef } from 'react';

const tabs = [
    { id: 'pending', label: 'Pending Contracts' },
    { id: 'ongoing', label: 'Ongoing Contracts' },
    { id: 'completed', label: 'Completed Contracts' },
];

export default function MobileContractTabs({ activeTab, onTabChange }) {
    const containerRef = useRef(null);

    return (
        <div className="w-full bg-[#FAFAFA] border-b border-[#E5E7EB]">
            <div
                ref={containerRef}
                className="flex items-center overflow-x-auto no-scrollbar px-4 w-full"
            >
                <div className="flex items-center gap-6 pb-[1px]">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                  relative py-3 text-[14px] whitespace-nowrap transition-colors outline-none
                  ${isActive ? 'text-[#111827] font-bold' : 'text-[#6B7280] font-normal'}
                `}
                            >
                                {tab.label}
                                {isActive && (
                                    <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#3DA8D8]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
