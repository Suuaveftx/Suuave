"use client";

import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Tabs, Tab, Input, Card, CardBody, Button, Alert } from "@heroui/react";
// ✅ ADD THIS IMPORT: Import Next.js router for navigation
import { useRouter } from "next/navigation";

export default function ContractPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  // ✅ ADD THIS: Initialize router for navigation
  const router = useRouter();

  const allContracts = [
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754",
      pendingSince: "18, June, 2024",
      expiresIn: "2days",
    },
    {
      // ✅ ADD MORE CONTRACT DATA: Added second contract for testing
      title: "Logo Design for Tech Startup",
      id: "24t64755",
      pendingSince: "20, June, 2024",
      expiresIn: "1day",
    },
  ];

  const filtered = allContracts.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: "pending", label: "Pending Contracts", count: 2 },
    { id: "ongoing", label: "Ongoing Contracts", count: 3 },
    { id: "completed", label: "Completed Contracts", count: 5 },
  ];

  // ✅ ADD THIS FUNCTION: Handle navigation to contract details
  const handleContractClick = (contractId) => {
    router.push(`/contract-page/${contractId}`);
  };

  return (
    <div className="bg-[#EAEAEA] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white px-2 md:px-8 my-6">
        <div className="py-8 font-satoshi">
          {/* Tab Navigation */}
          <div className="flex w-full flex-col">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
              variant="underlined"
              classNames={{
                tabList:
                  "gap-12 w-full relative rounded-none p-0 border-b border-gray-200",
                cursor: "w-full bg-[#3A98BB] h-0.5",
                tab: "px-0 py-2 h-auto max-w-fit",
                tabContent:
                  "text-sm font-light group-data-[selected=true]:font-bold text-primary",
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  fullwidth
                  key={tab.id}
                  title={`${tab.label} (${tab.count})`}
                />
              ))}
            </Tabs>
          </div>

          {/* Alert */}
          {activeTab === "pending" && (
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
                  <p className="font-semibold">
                    These contracts are yet to be accepted by Artists.
                  </p>
                  <p>
                    Artists have 2 days to accept offers, else, the contract
                    will be canceled automatically.
                  </p>
                </div>
              </Alert>
            </div>
          )}

          {/* Search */}
          {activeTab === "pending" && (
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
          )}

          {/* Contract Cards */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              {filtered.map((contract, index) => (
                <Card
                  key={index}
                  // ✅ UPDATE THIS LINE: Add cursor-pointer and isPressable for clickable cards
                  className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  shadow="none"
                  // ✅ ADD THIS PROP: Make card pressable
                  isPressable
                  // ✅ ADD THIS PROP: Handle card click to navigate to details
                  onPress={() => handleContractClick(contract.id)}
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
                            <span className="max-[860px]:hidden">/</span>{" "}
                            Expires in -{" "}
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
                          // ✅ UPDATE THIS: Add onPress handler and prevent event bubbling
                          onPress={(e) => {
                            e.stopPropagation(); // Prevent card click when button is clicked
                            // Handle cancel logic here
                            console.log("Cancel contract:", contract.id);
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
                        // ✅ UPDATE THIS: Add onPress handler and prevent event bubbling
                        onPress={(e) => {
                          e.stopPropagation(); // Prevent card click when menu is clicked
                          // Handle mobile menu logic here
                          console.log("Mobile menu for:", contract.id);
                        }}
                      >
                        <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600 -mt-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Empty states for other tabs */}
          {activeTab === "ongoing" && (
            <div className="text-center py-12">
              <p className="text-gray-500">No ongoing contracts</p>
            </div>
          )}

          {activeTab === "completed" && (
            <div className="text-center py-12">
              <p className="text-gray-500">No completed contracts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
