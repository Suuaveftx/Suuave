"use client";
import Link from "next/link";
import SearchBar from "../../../../components/Searchbar";
import FilterDropdown from "../../../../components/FilterDropdown";
import { useState } from "react";


const data = [
  {
    date: "12 May, 2024",
    project: "Modern Fashion Attire Illustration",
    client: "SHOALA ADIN",
    earnings: "$700",
    status: "Completed",
  },
  {
    date: "25 April, 2024",
    project: "Eco-Friendly Fabric Pattern",
    client: "LUX WEAR",
    earnings: "$1,200",
    status: "Completed",
  },
  {
    date: "10 March, 2024",
    project: "Winter Season Lookbook",
    client: "GLAMOUR CO",
    earnings: "$2,500",
    status: "Completed",
  },

];

export default function CompletedContracts() {
  const [dateFilter, setDateFilter] = useState('Select Date');
  const [currencyFilter, setCurrencyFilter] = useState('Select Currency');

  const dateOptions = ['Today', 'This Week', 'This Month', 'Last 3 Months', 'Last 6 Months', 'This Year', 'Calendar'];
  const currencyOptions = ['USD ($)', 'EUR (€)', 'GBP (£)', 'NGN (₦)', 'CAD ($)'];

  return (
    <>
      {/* Search & Sort */}
      <div className="flex items-center justify-between mb-8">
        <SearchBar
          placeholder="Search by job title"
          className="w-full lg:max-w-[50%] flex-1"
        />
        <div className="flex items-center gap-3">
          <FilterDropdown
            label="Date"
            options={dateOptions}
            selectedOption={dateFilter}
            setSelectedOption={setDateFilter}
            defaultLabel="Select Date"
          />
          <FilterDropdown
            label="Currency"
            options={currencyOptions}
            selectedOption={currencyFilter}
            setSelectedOption={setCurrencyFilter}
            defaultLabel="Select Currency"
          />
        </div>
      </div>


      <div className="w-full bg-white border border-[#EAEAEA] rounded-lg p-6 min-h-[500px] flex flex-col justify-between">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[640px] w-full border-collapse">
            <thead className="border-b border-[#EAEAEA]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#222222] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#222222] uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#222222] uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#222222] uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#222222] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((item, index) => (
                <tr key={index} className="border-b border-[#EAEAEA] last:border-none hover:bg-gray-50">
                  <td className="px-6 py-6 text-sm text-[#222222]">{item.date}</td>
                  <td className="px-6 py-6 text-sm text-[#3A98BB] hover:underline cursor-pointer">
                    <Link href="/artist-page/completed-contract-information">
                      {item.project}
                    </Link>
                  </td>
                  <td className="px-6 py-6 text-sm text-[#767676] uppercase">{item.client}</td>
                  <td className="px-6 py-6 text-sm text-[#222222]">{item.earnings}</td>
                  <td className="px-6 py-6 text-sm text-[#222222] text-right">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Centered at the bottom */}

      </div>

    </>
  );
}
