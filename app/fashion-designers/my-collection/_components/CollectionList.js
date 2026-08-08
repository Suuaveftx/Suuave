"use client";

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody, Pagination } from "@heroui/react";
import Image from "next/image";
import { collectionData } from "../data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const ITEMS_PER_PAGE = 10;

const CollectionList = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortBy, setSortBy] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return Number(priceStr.replace(/[^0-9.-]+/g, ""));
    };

    const filteredAndSortedData = React.useMemo(() => {
        let data = [...collectionData];

        if (searchTerm) {
            data = data.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortBy === "high-low") {
            data.sort((a, b) => parsePrice(b.details?.price) - parsePrice(a.details?.price));
        } else if (sortBy === "low-high") {
            data.sort((a, b) => parsePrice(a.details?.price) - parsePrice(b.details?.price));
        }

        return data;
    }, [searchTerm, sortBy]);

    // Reset to page 1 whenever filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE));
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const sortOptions = [
        { label: "Amount: Highest to Lowest", key: "high-low" },
        { label: "Amount: Lowest to Highest", key: "low-high" },
        { label: "Reset Filter", key: "reset", className: "text-danger" },
    ];

    const handleSortChange = (key) => {
        if (key === "reset") {
            setSortBy("");
            setSearchTerm("");
        } else {
            setSortBy(key);
        }
    };

    const FilterDropdown = () => (
        <Dropdown placement="bottom-end" shouldBlockScroll={false}>
            <DropdownTrigger>
                <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="min-w-8 w-8 h-8 rounded-full hover:bg-gray-100"
                >
                    <Image
                        src="/collectionImage/icons/filter.svg"
                        alt="filter"
                        width={18}
                        height={18}
                    />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Sort options"
                onAction={(key) => handleSortChange(key)}
                selectedKeys={sortBy ? [sortBy] : []}
                selectionMode="single"
            >
                {sortOptions.map((option) => (
                    <DropdownItem key={option.key} className={option.className}>
                        {option.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <div className="w-full flex-col pt-4 lg:pt-8">
            {/* --- Unified Header Container --- */}
            <div className="w-full flex flex-col gap-4 border-b-2 border-divider py-4 items-start">
                <div className="flex items-center gap-2 lg:gap-0">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => router.back()}
                        className="lg:hidden flex items-center justify-center rounded-full w-[44px] h-[44px] bg-transparent -ml-2"
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-[#222222]" />
                    </Button>
                    <h1 className="text-[#222222] font-satoshi font-bold text-[24px] lg:text-[28px]">
                        My Collections
                    </h1>
                </div>

                {/* Search Bar with Integrated Filter */}
                <div className="w-full lg:w-[400px]">
                    <div className="relative flex items-center bg-white border border-divider rounded-full px-4 w-full shadow-sm hover:border-gray-300 focus-within:border-gray-400 transition-all">
                        <Image
                            src="/collectionImage/icons/search.svg"
                            alt="search"
                            width={18}
                            height={18}
                            className="mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Search collections"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="outline-none bg-transparent w-full text-sm font-satoshi py-2.5"
                        />
                        <div className="ml-2 border-l border-divider pl-1">
                            <FilterDropdown />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:py-6">
                {/* Desktop Products Grid */}
                <div className="mt-8 hidden lg:grid grid-cols-4 lg:grid-cols-5 gap-4">
                    {paginatedData.map((items) => (
                        <Link
                            key={items.id}
                            href={`/fashion-designers/my-collection/${items.id}`}
                            className="bg-[#FAFAFA] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                        >
                            <div className="relative aspect-[3/4] sm:aspect-square w-full">
                                <Image
                                    src={items.url}
                                    alt={items.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-3">
                                <p className="text-[#222222] font-satoshi font-semibold text-sm line-clamp-1">
                                    {items.title}
                                </p>
                                <p className="text-[#3A98BB] font-bold text-sm mt-1">
                                    {items.details?.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {paginatedData.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-500 font-satoshi">
                            No collections match your criteria.
                        </div>
                    )}
                </div>

                {/* Mobile Products Grid */}
                <div className="lg:hidden grid grid-cols-2 gap-3 -mx-4 px-4 mt-3">
                    {paginatedData.map((items) => (
                        <Link key={items.id} href={`/fashion-designers/my-collection/${items.id}`}>
                            <Card className="w-full h-full border border-[#EAEAEA] shadow-sm rounded-xl overflow-hidden">
                                <div className="relative aspect-[3/4] w-full bg-[#f4f2ef]">
                                    <Image
                                        src={items.url}
                                        alt={items.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardBody className="p-3">
                                    <p className="text-[#222222] font-satoshi font-semibold text-[13px] leading-[1.35] line-clamp-2">
                                        {items.title}
                                    </p>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                    {paginatedData.length === 0 && (
                        <div className="col-span-2 py-20 text-center text-gray-500 font-satoshi">
                            No collections match your criteria.
                        </div>
                    )}
                </div>

                {/* Shared Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 mb-6 pb-6">
                        <Pagination
                            showControls
                            total={totalPages}
                            page={currentPage}
                            onChange={setCurrentPage}
                            classNames={{
                                cursor: "bg-[#3A98BB] text-white",
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionList;
