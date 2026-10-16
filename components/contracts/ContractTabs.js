'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ContractList from './ContractList';

const tabs = [
    { id: 'pending', label: 'Pending Contracts' },
    { id: 'ongoing', label: 'Ongoing Contracts' },
    { id: 'completed', label: 'Completed Contracts' },
];

export default function DesktopContractTabs() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabParam || 'pending');

    return (
        <div className="w-full">
            {/* Tab Nav */}
            <div className="flex items-center gap-0 border-b border-[#EAEAEA] mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={[
                            'relative px-6 py-3.5 text-[14px] font-medium transition-all duration-200 whitespace-nowrap',
                            activeTab === tab.id
                                ? 'text-[#222222] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#3A98BB] after:rounded-t-full'
                                : 'text-[#878787] hover:text-[#444444]',
                        ].join(' ')}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <ContractList tab={activeTab} />
        </div>
    );
}
