"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import Navbar3 from "../../../../components/Navbar3";
import ContractHeader from "./contract-header";

import { useRouter } from "next/navigation";
import PendingContracts from "./pending-contracts";
import OngoingContracts from "./ongoing-contracts";

import CompletedContracts from "./completed-contracts";

export default function ContractPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const pendingContracts = [
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64754",
      pendingSince: "18, June, 2024",
      expiresIn: "2d left",
    },
    {
      title: "Modern Fashion Attire Illustration",
      id: "24t64755",
      pendingSince: "18, June, 2024",
      expiresIn: "10d left",
    },
    {
      title: "Logo Design for Tech Startup",
      id: "24t64756",
      pendingSince: "20, June, 2024",
      expiresIn: "1d left",
    },
  ];

  const tabs = [
    { id: "pending", label: "Pending Contracts", count: 2 },
    { id: "ongoing", label: "Ongoing Contracts", count: 3 },
    { id: "completed", label: "Completed Contracts", count: 5 },
  ];

  //handle pending contract click
  const handlePendingClick = (contractId) => {
    router.push(`/artist-page/my-contracts/pending/${contractId}`);
  };

  //handle ongoing contract click
  const handleOngoingClick = (contractId) => {
    router.push(`/artist-page/my-contracts/ongoing/${contractId}`);
  };

  /*  const handleContractClick = (contractId) => {
    router.push(`/contract-page/${contractId}`);
  }; */

  const handleCancelContract = (contractId) => {
    console.log("Cancel contract:", contractId);
    // Add your cancel logic here
  };

  const handleBack = () => {
    router.back();
  };

  // Sample data structure for ongoing contracts:
  const ongoingContracts = [
    {
      id: "24t64754",
      title: "Modern Fashion Attire Illustration",
      status: "Waiting Approval", // optional
      startDate: "18th June, 2024",
      endDate: "25th June, 2024",
      isLate: false,
      isExpiringSoon: true,
      remainingDays: 2,
      artist: {
        name: "Aliu",
        username: "aliu",
        role: "Fashion Brand",
        location: "Lagos, Nigeria",
        rating: 0.0,
        reviews: 0,
        avatar: "/contract/designer.jpg",
      },
    },
    {
      id: "24t64755",
      title: "Modern Fashion Attire Illustration",
      startDate: "18th June, 2024",
      endDate: "25th June, 2024",
      isLate: false,
      isExpiringSoon: true,
      remainingDays: 10,
      artist: {
        name: "Adeniji",
        username: "adeniji",
        role: "Fashion Brand",
        location: "Lagos, Nigeria",
        rating: 0.0,
        reviews: 0,
        avatar: "/contract/designer.jpg",
      },
    },
    {
      id: "24t64756",
      title: "Summer Collection 3D Mockup",
      startDate: "20th June, 2024",
      endDate: "30th June, 2024",
      isLate: false,
      isExpiringSoon: true,
      remainingDays: 1,
      artist: {
        name: "John",
        username: "john",
        role: "Fashion Designer",
        location: "Abuja, Nigeria",
        rating: 4.5,
        reviews: 10,
        avatar: "/contract/designer.jpg",
      },
    },
    // ... more contracts
  ];

  // Handler functions:
  const handleApproveWork = (contract) => {
    console.log("Approve work for:", contract.title);
    // Add your approval logic here
  };

  const handleMessageArtist = (contract) => {
    console.log("Message artist for:", contract.title);
    // Add your messaging logic here
  };

  const handleMoreOptions = (contract) => {
    console.log("More options for:", contract.title);
    // Add your more options logic here
  };
  return (
    <div className="bg-[#EAEAEA] min-h-screen">
      <Navbar3 />
      <ContractHeader title="Contracts" />
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

          {/* Tab Content for pending contracts */}
          {activeTab === "pending" && (
            <PendingContracts
              contracts={pendingContracts}
              search={search}
              onSearchChange={setSearch}
              onContractClick={handlePendingClick}
              onCancelContract={handleCancelContract}
            />
          )}

          {/* Tab Content for ongoing contracts */}
          {activeTab === "ongoing" && (
            <OngoingContracts
              contracts={ongoingContracts}
              search={search}
              onSearchChange={setSearch}
              onContractClick={handleOngoingClick}
              onApproveWork={handleApproveWork}
              onMessageArtist={handleMessageArtist}
              onMoreOptions={handleMoreOptions}
            />
          )}

          {/* Tab Content for completed contracts */}
          {activeTab === "completed" && <CompletedContracts />}
        </div>
      </div>
    </div>
  );
}
