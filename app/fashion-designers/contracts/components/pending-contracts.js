"use client";

import React from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button, Alert } from "@heroui/react";

const PendingContracts = ({
  contracts = [],
  search = "",
  onSearchChange = () => { },
  onContractClick = () => { },
  onCancelContract = () => { },
  onMessageArtist = () => { },
  showAlert = true,
  alertContent = {
    title: "These contracts are yet to be accepted by Artists.",
    description:
      "Artists have 5 days to accept offers, else, the contract will be canceled automatically.",
  },
}) => {
  // Filter contracts based on search
  const filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination state & calculations
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Alert */}
      {showAlert && (
        <div className="my-6">
          <Alert
            hideIcon
            color="primary"
            variant="flat"
            startContent={
              <ExclamationTriangleIcon className="h-5 w-5 text-[#3A98BB] flex-shrink-0" />
            }
            className="bg-transparent border-none text-[#3A98BB] my-2 px-0"
          >
            <div className="text-sm">
              <p className="font-semibold">{alertContent.title}</p>
              <p>{alertContent.description}</p>
            </div>
          </Alert>
        </div>
      )}

      {/* Search */}
      <div className="mb-6 w-full">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search project"
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
        </div>
      </div>

      {/* Contract Cards */}
      <div className="space-y-2">
        {currentItems.map((contract, index) => (
          <Card
            key={contract.id || index}
            className="bg-white border border-gray-200 hover:shadow-md transition-shadow w-full"
            shadow="none"
          >
            <div
              className="cursor-pointer"
              onClick={() => onContractClick(contract.id)}
            >
              <CardBody className="md:px-6 px-3 py-4 ">
                <div className="flex md:justify-between items-start w-full">
                  <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr_0.8fr_auto] md:gap-x-8 md:items-center">
                    <div className="flex flex-col mb-1 md:mb-0">
                      <h3 className="md:text-md text-sm font-proximanova line-clamp-1">
                        {contract.title} ({contract.id})
                      </h3>
                    </div>

                    <p className="text-sm font-satoshi flex items-center gap-2">
                      <span className="font-light whitespace-nowrap text-gray-500">Pending Since -</span>
                      <span className="font-semibold whitespace-nowrap">
                        {contract.pendingSince}
                      </span>
                    </p>

                    <p className="text-sm font-satoshi flex items-center gap-2">
                      <span className="max-[840px]:hidden text-gray-300">|</span>
                      <span className="font-light whitespace-nowrap text-gray-500">Expires in -</span>
                      <span className="font-semibold whitespace-nowrap">
                        {contract.expiresIn}
                      </span>
                    </p>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex gap-3 shrink-0">
                      <Button
                        className=" border px-8 py-4 shadow-md bg-white border-[#CCE7F2] text-[#222222] font-semibold rounded-full"
                        size="sm"
                        radius="full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMessageArtist(contract);
                        }}
                      >
                        Message Artist
                      </Button>
                      <Button
                        className=" border px-8 py-4 shadow-md bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full"
                        size="sm"
                        radius="full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCancelContract(contract.id);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  {/* Mobile 3 Dots Menu */}
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="md:hidden p-2 shrink-0 border-0 flex"
                    aria-label="More options"
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600 -mt-4" />
                  </Button>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {
        totalPages > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              {/* Results info */}
              <span className="text-sm text-gray-600 mr-4">
                {startIndex + 1} - {Math.min(endIndex, filteredContracts.length)}{" "}
                of {filteredContracts.length}
              </span>

              {/* Previous button */}
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                radius="none"
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage(currentPage - 1)}
                className="min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer"
              >
                &lt;
              </Button>

              {/* Next button */}
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                radius="none"
                isDisabled={currentPage === totalPages}
                onPress={() => setCurrentPage(currentPage + 1)}
                className="min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer -ml-2"
              >
                &gt;
              </Button>
            </div>
          </div>
        )
      }

      {/* Empty State */}
      {
        filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {search ? "No contracts match your search" : "No pending contracts"}
            </p>
          </div>
        )
      }
    </div >
  );
};

export default PendingContracts;
