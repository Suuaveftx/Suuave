"use client";

import React, { useState } from "react";
import OngoingContracts from "./OngoingContracts";
import CompletedContracts from "./CompletedContracts";
import PendingProjects from "./PendingProject";
import SearchBar from "../../../../components/Searchbar";
import { HiOutlineAdjustments } from "react-icons/hi";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const tabs = [
  { id: "pending", label: "Pending Contracts(2)" },
  { id: "ongoing", label: "Ongoing Contracts(3)" },
  { id: "completed", label: "Completed Contracts(4)" },
];

export default function UnderlinedTabs() {
  const [activeTab, setActiveTab] = useState("completed"); // Default tab

  return (
    <div className="bg-[#FAFAFA] lg:border-1 lg:border-[#EAEAEA] w-full lg:mx-[38px] lg:max-w-[90%] lg:px-[35px] py-[45px] lg:mt-8 mb-[178px]">
      
      {/* Mobile Scrollable Tabs */}
      <div className="w-full overflow-x-auto scrollbar-thin">
         {/* Search Bar */}
      <div className="lg:hidden flex lg:mx-0 mx-auto mt-4 mb-[25.5px]  items-center w-[80%] mr-8 ">
        <SearchBar placeholder="Search by job title"/>
        <HiOutlineAdjustments />
      </div>
        <div className="flex w-max gap-4 border-b px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-2 px-4 text-base lg:text-lg font-medium text-gray-600 transition-colors duration-200 whitespace-nowrap",
                activeTab === tab.id
                  ? "border-b border-[#3A98BB] text-blue-600"
                  : ""
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "ongoing" && <OngoingContracts />}
        {activeTab === "completed" && <CompletedContracts />}
        {activeTab === "pending" && <PendingProjects />}
      </div>
    </div>
  );
}
