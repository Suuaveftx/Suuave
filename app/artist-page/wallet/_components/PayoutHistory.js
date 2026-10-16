'use client';
import React, { useState, useEffect } from "react";
import { Pagination } from "@heroui/react";

export default function PayoutHistory({ search = '', filterType = 'none', filterValue = null }) {
  const [data] = useState([
    { transactionId: "ID35423664", amount: "$321", date: "21/04/2023", status: "Success" },
    { transactionId: "ID35423665", amount: "$321", date: "22/04/2023", status: "Success" },
    { transactionId: "ID35423666", amount: "$321", date: "23/04/2023", status: "Failed" },
    { transactionId: "ID35423667", amount: "$321", date: "24/04/2023", status: "Pending" },
    { transactionId: "ID35423668", amount: "$321", date: "25/04/2023", status: "Success" },
    { transactionId: "ID35423669", amount: "$321", date: "26/04/2023", status: "Success" },
    { transactionId: "ID35423670", amount: "$321", date: "27/04/2023", status: "Success" },
    { transactionId: "ID35423671", amount: "$321", date: "28/04/2023", status: "Success" },
    { transactionId: "ID35423672", amount: "$321", date: "29/04/2023", status: "Pending" },
    { transactionId: "ID35423673", amount: "$321", date: "30/04/2023", status: "Failed" },
    { transactionId: "ID35423674", amount: "$321", date: "01/05/2023", status: "Success" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset to page 1 whenever search or filter changes
  useEffect(() => { setCurrentPage(1); }, [search, filterType, filterValue]);

  // Helper to parse DD/MM/YYYY from mock data into a Date object
  const parsePayoutDate = (dateStr) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date();
  };

  const filteredData = data.filter((item) => {
    // 1. Text Search Filter
    let matchesSearch = true;
    if (search.trim()) {
      const q = search.toLowerCase();
      matchesSearch = (
        item.transactionId.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
      );
    }
    if (!matchesSearch) return false;

    // 2. Date Range Filter
    if (!filterValue || filterType === 'none') {
      return true;
    }

    const itemDate = parsePayoutDate(item.date);

    if (filterType === 'date') {
      // Unused for payouts right now, but handles specific calendar selection YYYY-MM-DD
      const filterDateStr = filterValue; // e.g. "2023-04-21"
      const formattedItemDate = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      return formattedItemDate === filterDateStr;
    }

    if (filterType === 'range') {
      const days = parseInt(filterValue, 10);
      const cutoffDate = new Date(); // Use actual current date for 'Last X days'
      cutoffDate.setDate(cutoffDate.getDate() - days);
      // For mock data from 2023, 'Last X days' will likely show 0 results unless it's a huge number of days,
      // but logic works correctly for real up-to-date data.
      return itemDate >= cutoffDate;
    }

    if (filterType === 'custom') {
      const { start, end } = filterValue;
      if (!start || !end) return true;
      const startDate = new Date(start);
      // Ensure start is beginning of day
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(end);
      // Ensure end is end of day
      endDate.setHours(23, 59, 59, 999);

      return itemDate >= startDate && itemDate <= endDate;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Success": return "text-[#056D16]";
      case "Failed": return "text-[#EE2D2D]";
      case "Pending": return "text-[#E28C4F]";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="w-full">
      {/* Card */}
      <div className="bg-[#fafafa] w-full rounded-2xl px-4 md:px-8 pb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-[#222222] text-base">
              <tr>
                <th className="border-b px-4 py-4 font-bold">Transaction ID</th>
                <th className="border-b px-4 py-4 font-bold">Amount</th>
                <th className="border-b px-4 py-4 font-bold">Date</th>
                <th className="border-b px-4 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx} className="text-[#767676] text-base font-normal hover:bg-gray-50">
                  <td className="border-b px-4 py-3">{item.transactionId}</td>
                  <td className="border-b px-4 py-3">{item.amount}</td>
                  <td className="border-b px-4 py-3">{item.date}</td>
                  <td className={`border-b px-4 py-3 font-normal ${getStatusColor(item.status)}`}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {data.length > 0 && (
        <div className="flex justify-center items-center mt-6">
          <Pagination
            showControls
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            classNames={{ cursor: "bg-[#3A98BB] text-white" }}
          />
        </div>
      )}
      {filteredData.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-6">No results found.</p>
      )}
    </div>
  );
}
