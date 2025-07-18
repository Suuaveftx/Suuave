"use client";

import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Tabs, Tab, Input, Card, CardBody, Button, Alert } from "@heroui/react";
import Navbar3 from "../../../components/Navbar3";

export default function ContractPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");

  const allContracts = [
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754",
      pendingSince: "18, June, 2024",
      expiresIn: "2days",
    },
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754",
      pendingSince: "18, June, 2024",
      expiresIn: "2days",
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

  return (
    <div className="bg-[#EAEAEA]  min-h-screen ">
      <Navbar3 />
      <div className="max-w-6xl mx-auto my-8">
        <h1 className="text-3xl font-semibold text-[#444444]">My Contracts</h1>
      </div>
      <div className="max-w-6xl mx-auto bg-white px-2 md:px-8 my-6 ">
        <div className=" py-8 font-satoshi  ">
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
            <div className="my-6 ">
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
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title"
                startContent={
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                }
                className="max-w-md"
                classNames={{
                  input: "text-sm",
                  inputWrapper:
                    "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500",
                }}
              />
            </div>
          )}

          {/* Contract Cards */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              {filtered.map((contract, index) => (
                <Card
                  key={index}
                  className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
                  shadow="none"
                >
                  <CardBody className="px-6 py-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex-1 flex justify-between">
                        <h3 className="text-md font-semibold text-gray-900 mb-1">
                          {contract.title} ({contract.id})
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pending Since -{" "}
                          <span className="font-semibold">
                            {contract.pendingSince}{" "}
                          </span>
                          / Expires in -{" "}
                          <span className="font-semibold">
                            {contract.expiresIn}
                          </span>
                        </p>
                        <Button
                          className="-mt-1 border px-12 py-4 shadow-lg bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full"
                          size="sm"
                          radius="full"
                        >
                          Cancel
                        </Button>
                      </div>
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
