"use client";
import Link from "next/link";
import SearchBar from "../../../../components/Searchbar";
import FilterDropdown from "../../../../components/FilterDropdown";
import { useState } from "react";


const data = [
  {
    date: "12th May, 2024",
    project: "Modern Fashion Attire Illustration",
    client: "SHOALA ADIN",
    earnings: "$700",
    status: "Completed",
  },
  {
    date: "25th April, 2024",
    project: "Eco-Friendly Fabric Pattern",
    client: "LUX WEAR",
    earnings: "$1,200",
    status: "Completed",
  },
  {
    date: "10th March, 2024",
    project: "Winter Season Lookbook",
    client: "GLAMOUR CO",
    earnings: "$2,500",
    status: "Completed",
  },

];

export default function CompletedContracts() {
  const [dateFilter, setDateFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('Select Currency');

  const dateOptions = [
    'Today',
    'This week',
    'This month',
    'Last 3 month',
    'Last 6 month',
    'This year',
    'Calendar'
  ];
  const currencyOptions = ['USD ($)', 'EUR (€)', 'GBP (£)', 'NGN (₦)', 'CAD ($)'];

  // Date Filter Logic
  const parseContractDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    // Handle YYYY-MM-DD from calendar
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return new Date(dateStr);
    // Handle ordinal dates like "18th June, 2024"
    const normalized = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(normalized);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isWithinLastDays = (date, days) => {
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  };

  let filteredProjects = data;

  // Filter by Date
  if (dateFilter) {
    const now = new Date();
    filteredProjects = filteredProjects.filter((item) => {
      const cDate = parseContractDate(item.date);

      if (dateFilter === 'Today') return isToday(cDate);
      if (dateFilter === 'This week') return isWithinLastDays(cDate, 7);
      if (dateFilter === 'This month') {
        return cDate.getMonth() === now.getMonth() && cDate.getFullYear() === now.getFullYear();
      }
      if (dateFilter === 'Last 3 month') return isWithinLastDays(cDate, 90);
      if (dateFilter === 'Last 6 month') {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return cDate >= sixMonthsAgo;
      }
      if (dateFilter === 'This year') return cDate.getFullYear() === now.getFullYear();
      if (dateFilter.includes('-')) {
        // Date from calendar (YYYY-MM-DD)
        const filterDate = new Date(dateFilter);
        return cDate.toDateString() === filterDate.toDateString();
      }
      return true;
    });
  }

  return (
    <>
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="w-full md:max-w-[500px]">
          <SearchBar
            placeholder="Search by job title"
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            label="Select Date"
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
            defaultLabel="Currency"
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
              {filteredProjects.map((item, index) => (
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
