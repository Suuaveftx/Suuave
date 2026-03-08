'use client';

import React, { useState, useRef, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@heroui/react";
import { Search, ChevronDown, Calendar, Info } from "lucide-react";

const TransactionTable = () => {
    const [filterValue, setFilterValue] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

    // Filter state: { type: 'range' | 'custom', value: any, label: string }
    const [dateFilter, setDateFilter] = useState({ type: 'none', value: null, label: 'Select Date' });
    const [customRange, setCustomRange] = useState({ start: '', end: '' });

    const typeDropdownRef = useRef(null);
    const dateDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
                setIsTypeDropdownOpen(false);
            }
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setIsDateDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setIsTypeDropdownOpen(false);
    };

    const handleRangeSelect = (days) => {
        setDateFilter({ type: 'range', value: days, label: `Last ${days} days` });
        setIsDateDropdownOpen(false);
    };

    const handleCustomDateChange = (field, value) => {
        const newRange = { ...customRange, [field]: value };
        setCustomRange(newRange);
        if (newRange.start && newRange.end) {
            setDateFilter({
                type: 'custom',
                value: newRange,
                label: `${newRange.start} - ${newRange.end}`
            });
            // We don't close the dropdown immediately so user can see what they selected
        }
    };

    const handleResetDate = () => {
        setDateFilter({ type: 'none', value: null, label: 'Select Date' });
        setCustomRange({ start: '', end: '' });
        setIsDateDropdownOpen(false);
    };

    const transactions = [
        {
            id: 1,
            date: "2024-11-01T12:32:34",
            dateTime: "01-11-2024 / 12:32.34",
            transaction: "Project",
            description: "Project ID 231 (Wedding gown design)",
            amount: "N150,000",
            status: "Successful",
        },
        {
            id: 2,
            date: "2024-11-01T12:32:34",
            dateTime: "01-11-2024 / 12:32.34",
            transaction: "Refund",
            description: "Project ID 231 (Wedding gown design)",
            amount: "N150,000",
            status: "Successful",
        },
        {
            id: 3,
            date: "2024-11-02T12:32:34",
            dateTime: "02-11-2024 / 12:32.34",
            transaction: "Licensing",
            description: "Project ID 231 (Wedding gown design)",
            amount: "N150,000",
            status: "Successful",
        },
        {
            id: 4,
            date: "2024-11-03T12:32:34",
            dateTime: "03-11-2024 / 12:32.34",
            transaction: "Project",
            description: "Project ID 231 (Wedding gown design)",
            amount: "N150,000",
            status: "Successful",
        },
        {
            id: 5,
            date: "2024-11-04T12:32:34",
            dateTime: "04-11-2024 / 12:32.34",
            transaction: "Refund",
            description: "Project ID 231 (Wedding gown design)",
            amount: "N150,000",
            status: "Successful",
        },
    ];

    const filteredTransactions = transactions.filter((item) => {
        // Search filter
        const matchesSearch =
            item.description.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.transaction.toLowerCase().includes(filterValue.toLowerCase());

        // Type filter
        const matchesType = selectedType === "All Types" || item.transaction === selectedType;

        // Date filter
        let matchesDate = true;
        const itemDate = new Date(item.date);

        if (dateFilter.type === 'range') {
            const days = parseInt(dateFilter.value, 10);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            matchesDate = itemDate >= cutoffDate;
        } else if (dateFilter.type === 'custom') {
            const { start, end } = dateFilter.value;
            if (start && end) {
                const startDate = new Date(start);
                const endDate = new Date(end);
                endDate.setHours(23, 59, 59, 999);
                matchesDate = itemDate >= startDate && itemDate <= endDate;
            }
        } else if (dateFilter.type === 'none') {
            matchesDate = true;
        }

        return matchesSearch && matchesType && matchesDate;
    });

    const columns = [
        { name: "Date/Time", uid: "dateTime" },
        { name: "Transaction", uid: "transaction" },
        { name: "Description", uid: "description" },
        { name: "Amount", uid: "amount" },
        { name: "Status", uid: "status" },
    ];

    const renderCell = (transaction, columnKey) => {
        const cellValue = transaction[columnKey];

        switch (columnKey) {
            case "dateTime":
                return (
                    <div className="flex flex-col">
                        <span className="text-sm text-[#555555]">{cellValue}</span>
                    </div>
                );
            case "transaction":
                return <div className="text-sm text-[#555555]">{cellValue}</div>;
            case "description":
                return <div className="text-sm text-[#555555] md:line-clamp-1">{cellValue}</div>;
            case "amount":
                return <div className="text-sm text-[#222222] font-semibold">{cellValue}</div>;
            case "status":
                return (
                    <div className="flex items-center">
                        <span className="text-sm text-[#555555]">{cellValue}</span>
                    </div>
                );
            default:
                return cellValue;
        }
    };


    return (
        <div className="w-full flex flex-col gap-6">
            {/* Filter Row */}
            <div className='mt-2 flex flex-col xl:flex-row gap-4 justify-between items-center'>
                {/* Search Bar with Integrated Filters */}
                <div className='flex flex-grow xl:flex-row flex-col gap-4 items-center max-w-2xl w-full'>
                    <div className='relative flex-grow w-full'>
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <Search className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type='text'
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder='Search'
                            className='block w-full pl-11 pr-24 py-3 bg-white border border-[#E5E5E5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#3A98BB] placeholder-gray-400 h-12 shadow-sm'
                        />

                        {/* Integrated Icons (Type and Date) */}
                        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                            {/* Type Icon */}
                            <div className="relative" ref={typeDropdownRef}>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    radius="full"
                                    onPress={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                    className="text-gray-400 hover:text-[#3A98BB]"
                                >
                                    <ChevronDown className={`h-5 w-5 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                                </Button>
                                {isTypeDropdownOpen && (
                                    <div className='absolute top-full right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-2 z-[100] overflow-hidden'>
                                        <div onClick={() => handleTypeSelect('All Types')} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB] font-medium border-b border-gray-100'>Reset Filter</div>
                                        <div onClick={() => handleTypeSelect('Project')} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Project</div>
                                        <div onClick={() => handleTypeSelect('Refund')} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Refund</div>
                                        <div onClick={() => handleTypeSelect('Licensing')} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Licensing</div>
                                    </div>
                                )}
                            </div>

                            {/* Date Icon */}
                            <div className="relative" ref={dateDropdownRef}>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    radius="full"
                                    onPress={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                                    className="text-gray-400 hover:text-[#3A98BB]"
                                >
                                    <Calendar className="h-5 w-5" />
                                </Button>
                                {isDateDropdownOpen && (
                                    <div className='absolute top-full right-0 mt-2 w-72 bg-white border border-[#E5E5E5] rounded-xl shadow-lg z-[100] overflow-hidden'>
                                        <div className='py-2 border-b border-gray-100'>
                                            <div onClick={handleResetDate} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB] font-medium'>Reset Filter</div>
                                            <div onClick={() => handleRangeSelect(7)} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Last 7 days</div>
                                            <div onClick={() => handleRangeSelect(14)} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Last 14 days</div>
                                            <div onClick={() => handleRangeSelect(30)} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Last 30 days</div>
                                        </div>
                                        <div className='p-4 bg-gray-50 space-y-3'>
                                            <p className="text-xs font-bold text-[#767676] uppercase tracking-wider">Custom Range</p>
                                            <input type="date" value={customRange.start} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="w-full border border-[#E5E5E5] rounded-lg p-2 text-sm text-[#555555] mb-2" />
                                            <input type="date" value={customRange.end} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="w-full border border-[#E5E5E5] rounded-lg p-2 text-sm text-[#555555]" />
                                            <Button size="sm" fullWidth className="bg-[#3A98BB] text-white font-bold h-10 rounded-lg mt-2" onClick={() => setIsDateDropdownOpen(false)}>Apply Range</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report Button Restored at Far Right */}
                <button className='flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#FFF5F5] border border-[#FFE0E0] rounded-full text-[#FF4D4D] text-sm font-medium hover:bg-[#ffe6e6] whitespace-nowrap h-11 self-start xl:self-center'>
                    <Info className='h-4 w-4' />
                    Report any issue
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl overflow-x-auto shadow-sm border border-[#F0F0F0]">
                <Table
                    aria-label="Transaction history table"
                    classNames={{
                        wrapper: "p-0 shadow-none bg-transparent rounded-none md:min-w-full",
                        th: "bg-white text-[#222222] font-bold text-sm border-b border-[#F0F0F0] py-6 px-6 whitespace-nowrap",
                        td: "py-6 px-6 border-b border-[#F9F9F9] md:whitespace-normal",
                    }}
                    removeWrapper
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align="left"
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={filteredTransactions}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-4">
                {filteredTransactions.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0F0F0] space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-xs text-[#888888]">{item.dateTime}</p>
                                <p className="font-bold text-[#222222]">{item.transaction}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-[#222222]">{item.amount}</p>
                                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full font-medium">
                                    {item.status}
                                </span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-gray-50">
                            <p className="text-sm text-[#555555] leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
                {filteredTransactions.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No transactions found</p>
                    </div>
                )}
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
                <span className="text-sm text-[#555555]">1 - 5 of 12</span>
                <div className="flex gap-2">
                    <Button isIconOnly variant="bordered" size="sm" className="min-w-10 h-10 rounded-md border-[#E5E5E5] bg-[#F5F5F5]/50">
                        <ChevronDown className="rotate-90 size-4 text-[#555555]" />
                    </Button>
                    <Button isIconOnly variant="bordered" size="sm" className="min-w-10 h-10 rounded-md border-[#E5E5E5] bg-[#F5F5F5]/50">
                        <ChevronDown className="-rotate-90 size-4 text-[#555555]" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionTable;
