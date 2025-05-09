"use client";
import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import PaymentTable from "./PaymentTable"; // Import the PaymentTable component

export default function PaymentTabs() {
  const [selectedTab, setSelectedTab] = useState("earnings");

  return (
    <div className="w-full mt-6">
      {/* Tabs and Sort Dropdown Grouped */}
      <div className="w-full flex justify-between items-center border-b border-gray-300 pb-2">
        {/* Tabs Section */}
        <Tabs
          aria-label="Payment Options"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          className="!shadow-none"
          variant="underlined"
        >
          <Tab
            key="earnings"
            title="Earning History"
            className="px-4 py-3 text-gray-500 border-b-2 border-transparent 
             data-[selected=true]:text-[#3A98BB]"
          />
          <Tab
            key="payouts"
            title="Payout History"
            className="px-4 py-3 text-gray-500 border-b-2 border-transparent 
             data-[selected=true]:text-[#3A98BB]"
          />
        </Tabs>

        {/* Sort Dropdown Section */}
        <button className="flex items-center border border-[#DDDDDD] px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100">
          <span className="text-gray-500 mr-2">Sort by |</span>
          <select className="bg-transparent outline-none">
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </button>
      </div>

      {/* Display Content Based on Selected Tab */}
      <div className="mt-4">
        {selectedTab === "earnings" && <PaymentTable />}
        {selectedTab === "payouts" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Payout History</h2>
            <p className="text-gray-600">Your payout details will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
