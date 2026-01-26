'use client';
import React, { useState } from "react";
import PaginationTab from "../../../../components/Pagination";

const PaymentTable = ({ filterType, filterValue }) => {
  // Normalized mock data with ISO dates for easier filtering
  const payments = [
    { id: 1, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Project", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 2, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Buy more time", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 3, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Licensing", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 4, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Licensing", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 5, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Project", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 6, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Project", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 7, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Licensing", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 8, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Project", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter logic
  const filteredPayments = payments.filter((payment) => {
    if (!filterValue) return true;

    if (filterType === 'date') {
      return payment.dateTime.startsWith(filterValue);
    }

    if (filterType === 'range') {
      const days = parseInt(filterValue, 10);
      const paymentDate = new Date(payment.dateTime);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      return paymentDate >= cutoffDate;
    }

    if (filterType === 'custom') {
      const { start, end } = filterValue;
      if (!start || !end) return true;
      const paymentDate = new Date(payment.dateTime);
      const startDate = new Date(start);
      const endDate = new Date(end);
      // Set end date to end of day
      endDate.setHours(23, 59, 59, 999);
      return paymentDate >= startDate && paymentDate <= endDate;
    }

    if (filterType === 'none') {
      return true;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="overflow-x-auto w-full bg-[#FAFAFA] rounded-2xl md:p-4">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-4 text-left font-bold text-[#222222]">Date/Time</th>
            <th className="px-4 py-4 text-left font-bold text-[#222222]">Transaction</th>
            <th className="hidden md:table-cell px-4 py-4 text-left font-bold text-[#222222]">Description</th>
            <th className="px-4 py-4 text-left font-bold text-[#222222]">Amount</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 text-[#555555] hover:bg-gray-50">
                <td className="px-4 py-4 text-sm whitespace-nowrap">{item.displayDate}</td>
                <td className="px-4 py-4 text-sm">{item.transaction}</td>
                <td className="hidden md:table-cell px-4 py-4 text-sm">{item.description}</td>
                <td className="px-4 py-4 text-sm">{item.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                No transactions found for this date.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Buttons - Only show if there are pages */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center items-center mt-4">
          <PaginationTab />
        </div>
      )}

    </div>
  );
};

export default PaymentTable;
