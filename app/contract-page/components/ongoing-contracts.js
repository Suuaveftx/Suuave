"use client";

import React from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button } from "@heroui/react";

const OngoingContracts = ({
  contracts = [],
  search = "",
  onSearchChange = () => {},
  onContractClick = () => {},
  onApproveWork = () => {},
  onMessageArtist = () => {},
  onMoreOptions = () => {},
  sortBy = "date",
  onSortChange = () => {},
}) => {
  // Filter contracts based on search
  const filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between gap-4">
          {/* Search Input - Always left-aligned */}
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by job title"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="flex-1 md:max-w-md md:flex-none"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500",
              }}
            />
          </div>

          {/* Sort & Filter Section */}
          <div className="relative flex items-center gap-2">
            {/* Filter Icon - Only for mobile view */}
            <Button
              isIconOnly
              variant="ghost"
              className="md:hidden p-2 border-0"
              aria-label="Filter"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Desktop Dropdown with Filter Icon inside */}
            <div className="relative hidden md:flex items-center">
              {/* Left-aligned Filter Icon */}
              <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Chevron on the right */}
              <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Select input */}
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="text-sm text-gray-700 border border-gray-300 rounded-full pl-10 pr-10 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className="space-y-4">
        {filteredContracts.map((contract, index) => (
          <Card
            key={contract.id || index}
            className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
            shadow="none"
          >
            <CardBody className="md:px-4 px-2 py-4 relative">
              {/* Desktop & Mobile Grid Layout */}
              <div className="md:grid md:grid-cols-3 md:gap-6 md:items-start">
                {/* Column 1: Title and Status */}
                <div className="flex flex-col items-start">
                  <h3
                    className="font-proximanova text-md w-full truncate cursor-pointer mb-1"
                    onClick={() => onContractClick(contract.id)}
                  >
                    {contract.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    {contract.status && (
                      <span className="bg-[#E0F2FE] text-[#2563EB] px-2 py-1 rounded text-xs">
                        {contract.status}
                      </span>
                    )}
                    {contract.isLate && (
                      <span className="text-red-500 text-xs">
                        ({contract.daysLate}d late)
                      </span>
                    )}
                  </div>
                </div>

                {/* Column 2: Start and End Dates */}
                <div className="block mt-2 md:mt-0 md:flex flex-col items-start text-sm font-proximanova text-gray-600">
                  <div className="mb-1">
                    <span className="text-xs font-satoshi">Start Date:</span>{" "}
                    {contract.startDate}
                  </div>
                  <div>
                    <span className="text-xs font-satoshi">End Date:</span>{" "}
                    {contract.endDate}
                  </div>
                </div>

                {/* Column 3: Action Buttons */}
                <div className="flex flex-col-reverse md:flex-row justify-end items-start gap-2 -ml-4">
                  <div className=" hidden md:flex items-center gap-2">
                    <Button
                      className="mt-4 md:-mt-1 border px-4 py-4 shadow-lg bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-proximanova rounded-full shrink-0 hidden md:flex"
                      size="sm"
                      radius="full"
                      onPress={() => onApproveWork(contract)}
                    >
                      Approve Work
                    </Button>
                    <Button
                      className="mt-4 md:-mt-1 border px-4 py-4 shadow-lg bg-radial from-white to-white text-[#222222] font-proximanova rounded-full shrink-0 hidden md:flex"
                      size="sm"
                      radius="full"
                      variant="bordered"
                      onPress={() => onMessageArtist(contract)}
                    >
                      Message Artist
                    </Button>
                  </div>

                  {/* Three-dot button that is top-right on mobile, inline on desktop */}
                  <div className="absolute top-5 right-2 md:static md:top-auto md:right-auto flex items-center lg:pl-6 -mt-2">
                    <span className="text-sm font-proximanova hidden md:flex">
                      More
                    </span>
                    <Button
                      isIconOnly
                      variant="faded"
                      size="md"
                      className="bg-transparent border-0 rounded-lg transition-colors hover:bg-transparent"
                      onPress={() => onMoreOptions(contract)}
                    >
                      <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {search ? "No contracts match your search" : "No ongoing contracts"}
          </p>
        </div>
      )}
    </div>
  );
};

export default OngoingContracts;
