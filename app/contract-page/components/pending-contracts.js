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
  onSearchChange = () => {},
  onContractClick = () => {},
  onCancelContract = () => {},
  showAlert = true,
  alertContent = {
    title: "These contracts are yet to be accepted by Artists.",
    description:
      "Artists have 2 days to accept offers, else, the contract will be canceled automatically.",
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
                  <div className="flex-1 flex items-start flex-col md:flex-row md:justify-between">
                    <h3 className="md:text-md text-sm font-semibold text-gray-900 mb-1 md:truncate">
                      {contract.title} ({contract.id})
                    </h3>
                    <div className="md:flex items-center justify-center md:gap-1">
                      <p className="text-sm text-gray-600">
                        Pending Since -{" "}
                        <span className="font-semibold">
                          {contract.pendingSince}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="max-[860px]:hidden">/</span> Expires in
                        -{" "}
                        <span className="font-semibold">
                          {contract.expiresIn}
                        </span>
                      </p>
                    </div>

                    {/* Desktop Cancel Button */}
                    <Button
                      className="mt-4 md:-mt-1 border px-12 py-4 shadow-lg bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full shrink-0 hidden md:flex"
                      size="sm"
                      radius="full"
                      onPress={(e) => {
                        e.stopPropagation();
                        onCancelContract(contract.id);
                      }}
                    >
                      Cancel
                    </Button>
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

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {search ? "No contracts match your search" : "No pending contracts"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingContracts;
