'use client';

import React from 'react';
import ContractCard from './ContractCard';
import EmptyState from './EmptyState';
import SearchBar from './SearchBar';
import { useContracts } from '../../hooks/useContracts';

function SkeletonCard() {
    return (
        <div className="w-full bg-white border border-[#EAEAEA] rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
                <div className="ml-auto h-6 w-28 bg-gray-100 rounded-full" />
            </div>
            <div className="h-px bg-gray-100 mb-5" />
            <div className="grid grid-cols-5 gap-6">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-3 w-16 bg-gray-100 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ContractList({ tab, isLoading = false }) {
    const { contracts, searchQuery, sortOrder, handleSearch, handleSort, totalCount } =
        useContracts(tab);

    return (
        <div className="w-full">
            {/* Search & Filter */}
            <SearchBar
                searchQuery={searchQuery}
                onSearch={handleSearch}
                sortOrder={sortOrder}
                onSort={handleSort}
            />

            {/* Count */}
            {!isLoading && (
                <p className="text-[12px] text-gray-400 mb-4 font-medium">
                    {totalCount} contract{totalCount !== 1 ? 's' : ''} found
                </p>
            )}

            {/* List */}
            {isLoading ? (
                <div className="flex flex-col gap-4">
                    {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : contracts.length === 0 ? (
                <EmptyState tab={tab} />
            ) : (
                <div className="flex flex-col gap-4">
                    {contracts.map((contract) => (
                        <ContractCard key={contract.id} contract={contract} />
                    ))}
                </div>
            )}
        </div>
    );
}
