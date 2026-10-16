'use client';
import { useState, useMemo, useCallback } from 'react';
import { contracts as allContracts } from '../data/contracts';

export function useContracts(tab) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    const filtered = useMemo(() => {
        let list = allContracts.filter((c) => c.tab === tab);

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (c) =>
                    c.title.toLowerCase().includes(q) ||
                    c.client.toLowerCase().includes(q) ||
                    c.status.toLowerCase().includes(q)
            );
        }

        // Sort
        if (sortOrder === 'newest') {
            list = [...list].sort((a, b) => b.id - a.id);
        } else if (sortOrder === 'oldest') {
            list = [...list].sort((a, b) => a.id - b.id);
        } else if (sortOrder === 'budget-high') {
            list = [...list].sort(
                (a, b) =>
                    parseInt(b.budget.replace(/\D/g, '')) -
                    parseInt(a.budget.replace(/\D/g, ''))
            );
        } else if (sortOrder === 'budget-low') {
            list = [...list].sort(
                (a, b) =>
                    parseInt(a.budget.replace(/\D/g, '')) -
                    parseInt(b.budget.replace(/\D/g, ''))
            );
        }

        return list;
    }, [tab, searchQuery, sortOrder]);

    const handleSearch = useCallback((val) => setSearchQuery(val), []);
    const handleSort = useCallback((key) => setSortOrder(key), []);

    return {
        contracts: filtered,
        searchQuery,
        sortOrder,
        handleSearch,
        handleSort,
        totalCount: filtered.length,
    };
}
