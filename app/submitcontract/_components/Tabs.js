"use client";
import { useState } from "react";
import OngoingContracts from "./SubmitContract";
import CompletedContracts from "./SubmitContract2";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const tabs = [
  { id: "ongoing", label: "Ongoing Contracts" },
  { id: "completed", label: "Completed Contracts" },
  { id: "pending", label: "Pending Contracts" },
];

export default function UnderlinedTabs() {
  const [activeTab, setActiveTab] = useState("ongoing"); // Default tab

  return (
    <div className="w-full mx-auto">
      {/* Tabs */}
      <div className="flex border-b w-full gap-4">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={cn(
        "py-2 text-center font-medium text-gray-600 transition-colors duration-200 inline-block px-4",
        activeTab === tab.id ? "border-b border-[#3A98BB] text-blue-600 w-fit" : ""
      )}
    >
      {tab.label}
    </button>
  ))}
</div>


      {/* Display Components Based on Active Tab */}
      <div className="mt-4">
        {activeTab === "ongoing" && <OngoingContracts />}
        {activeTab === "completed" && <CompletedContracts />}
        {activeTab === "pending" && <div>Pending Contracts Component</div>}
      </div>
    </div>
  );
}
