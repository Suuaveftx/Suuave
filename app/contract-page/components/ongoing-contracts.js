"use client";

import React from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
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
          {/* Search Input */}
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
            {/* for mobile view */}
            <Button
              isIconOnly
              variant="ghost"
              className="md:hidden p-2 border-0 -ml-4"
              aria-label="Filter"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Sort Dropdown - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              {/* Icon inside the select box */}
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-500" />
              </div>

              {/* Select with left padding to avoid overlapping the icon */}
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="text-sm text-gray-700 border border-gray-300 rounded-full pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
            <CardBody className="md:px-6 px-3 py-4">
              <div className="flex items-center justify-between">
                {/* Contract Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="text-gray-900 font-medium text-base cursor-pointer hover:text-blue-600"
                      onClick={() => onContractClick(contract.id)}
                    >
                      {contract.title}
                    </h3>
                    {contract.status && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {contract.status}
                      </span>
                    )}
                    {contract.isLate && (
                      <span className="text-red-500 text-xs font-medium">
                        ({contract.daysLate}d late)
                      </span>
                    )}
                  </div>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Start Date:</span>{" "}
                      {contract.startDate}
                    </div>
                    <div>
                      <span className="font-medium">End Date:</span>{" "}
                      {contract.endDate}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 ml-4">
                  {/* Desktop Buttons */}
                  <div className="hidden md:flex items-center gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      onPress={() => onApproveWork(contract)}
                    >
                      Approve Work
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border-gray-300"
                      onPress={() => onMessageArtist(contract)}
                    >
                      Message Artist
                    </Button>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onPress={() => onMoreOptions(contract)}
                    >
                      <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
                    </Button>
                  </div>

                  {/* Mobile More Button */}
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="md:hidden p-2 shrink-0 border-0"
                    aria-label="More options"
                    onPress={() => onMoreOptions(contract)}
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="md:hidden mt-4 flex gap-2">
                <Button
                  size="sm"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1"
                  onPress={() => onApproveWork(contract)}
                >
                  Approve Work
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border-gray-300 flex-1"
                  onPress={() => onMessageArtist(contract)}
                >
                  Message Artist
                </Button>
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
