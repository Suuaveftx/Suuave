"use client";

import React from "react";
import { Select, SelectItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import Image from "next/image";
import { collectionData } from "./data";
import Link from "next/link";

const Page = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

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
    <Dropdown placement="bottom-end">
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
    <>
      {/* Header */}
      <div className="w-full px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:px-6 lg:px-14 border-b-2 border-divider py-4">
        <div className="flex items-center gap-2">
          <Image
            src="\collectionImage\icons\arrow-left.svg"
            alt="icon"
            width={24}
            height={24}
            className="cursor-pointer md:hidden"
          />
          <h1 className="text-[#222222] font-satoshi font-bold text-xl md:text-2xl">
            My Collections
          </h1>
        </div>

        {/* Desktop Search Bar with Integrated Filter */}
        <div className="hidden md:flex items-center">
          <div className="relative flex items-center bg-white border border-divider rounded-full px-4 py-1 w-[400px] shadow-sm hover:border-gray-300 focus-within:border-gray-400 transition-all">
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
              className="outline-none bg-transparent w-full text-sm font-satoshi py-1.5"
            />
            <div className="ml-2 border-l border-divider pl-1">
              <FilterDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 md:px-6 md:py-6 lg:px-14">
        {/* Mobile Search & Filter */}
        <div className="mt-4 md:hidden">
          <div className="flex items-center bg-white border border-divider rounded-full px-4 py-1 shadow-sm focus-within:ring-1 focus-within:ring-divider transition-all">
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
              className="outline-none bg-transparent w-full text-sm font-satoshi py-2"
            />
            <div className="ml-2 border-l border-divider pl-1">
              <FilterDropdown />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {filteredAndSortedData.map((items) => (
            <Link
              key={items.id}
              href={`/fashion-designers/my-collection/${items.id}`}
              className="bg-[#FAFAFA] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square w-full">
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
          {filteredAndSortedData.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 font-satoshi">
              No collections match your criteria.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
