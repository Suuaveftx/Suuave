"use client";

import React from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button, Alert } from "@heroui/react";

const PendingContracts = ({
  contracts = [],
  search = "",
  onSearchChange = () => { },
  onContractClick = () => { },
  onCancelContract = () => { },
  showAlert = true,
  alertContent = {
    title: "These contracts are yet to be accepted by Artists.",
    description:
      "Artists have 5 days to accept each offers to avoid automatic cancellation.",
  },
}) => {
  // Filter contracts based on search
  const filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Alert */}
      {showAlert && (
        <div className="my-6 md:pl-8">
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
      <div className="mb-6">
        <div className="flex items-center gap-3">
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
      </div>

      {/* Contract Cards */}
      <div className="space-y-4">
        {filteredContracts.map((contract, index) => (
          <Card
            key={contract.id || index}
            className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
            shadow="none"
          >
            <div
              className="cursor-pointer"
              onClick={() => onContractClick(contract.id)}
            >
              <CardBody className="md:px-6 px-3 py-4">
                <div className="flex md:justify-between items-start w-full">
                  <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr_0.8fr_auto] md:gap-x-8 md:items-center">
                    <div className="flex flex-col mb-1 md:mb-0 md:pl-8">
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

                    {/* Desktop Cancel Button */}
                    <div className="hidden md:flex gap-3 shrink-0">
                      <Button
                        className="mt-4 md:-mt-1 border px-12 py-4 shadow-lg bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full shrink-0"
                        size="sm"
                        radius="full"
                        onPress={(e) => {
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
      </div >

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
