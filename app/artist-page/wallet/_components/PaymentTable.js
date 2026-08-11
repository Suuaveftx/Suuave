'use client';
import React, { useState } from "react";
import { Pagination } from "@heroui/react";

const PaymentTable = ({ filterType, filterValue }) => {
  const payments = [
    { id: 1, dateTime: "2024-11-01T12:32:34", displayDate: "01-11-2024 / 12:32.34", transaction: "Project", description: "Project ID 231 (Wedding gown design)", amount: "N150,000" },
    { id: 2, dateTime: "2024-11-02T09:15:00", displayDate: "02-11-2024 / 09:15.00", transaction: "Buy more time", description: "Project ID 232 (Evening dress)", amount: "N80,000" },
    { id: 3, dateTime: "2024-11-03T14:20:00", displayDate: "03-11-2024 / 14:20.00", transaction: "Licensing", description: "Project ID 233 (Fabric pattern A)", amount: "N200,000" },
    { id: 4, dateTime: "2024-11-04T11:00:00", displayDate: "04-11-2024 / 11:00.00", transaction: "Licensing", description: "Project ID 234 (Fabric pattern B)", amount: "N200,000" },
    { id: 5, dateTime: "2024-11-05T16:45:00", displayDate: "05-11-2024 / 16:45.00", transaction: "Project", description: "Project ID 235 (Bridal collection)", amount: "N320,000" },
    { id: 6, dateTime: "2024-11-06T08:30:00", displayDate: "06-11-2024 / 08:30.00", transaction: "Project", description: "Project ID 236 (Casual wear line)", amount: "N95,000" },
    { id: 7, dateTime: "2024-11-07T10:10:00", displayDate: "07-11-2024 / 10:10.00", transaction: "Licensing", description: "Project ID 237 (Summer collection)", amount: "N175,000" },
    { id: 8, dateTime: "2024-11-08T13:55:00", displayDate: "08-11-2024 / 13:55.00", transaction: "Project", description: "Project ID 238 (Corporate attire)", amount: "N260,000" },
    { id: 9, dateTime: "2024-11-09T15:30:00", displayDate: "09-11-2024 / 15:30.00", transaction: "Buy more time", description: "Project ID 239 (Beach wear)", amount: "N60,000" },
    { id: 10, dateTime: "2024-11-10T17:00:00", displayDate: "10-11-2024 / 17:00.00", transaction: "Project", description: "Project ID 240 (Vintage inspired)", amount: "N140,000" },
    { id: 11, dateTime: "2024-11-11T09:00:00", displayDate: "11-11-2024 / 09:00.00", transaction: "Licensing", description: "Project ID 241 (Ankara fusion)", amount: "N220,000" },
    { id: 12, dateTime: "2024-11-12T11:45:00", displayDate: "12-11-2024 / 11:45.00", transaction: "Project", description: "Project ID 242 (Kids fashion line)", amount: "N110,000" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      endDate.setHours(23, 59, 59, 999);
      return paymentDate >= startDate && paymentDate <= endDate;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      {/* Card */}
      <div className="overflow-x-auto w-full bg-[#FAFAFA] rounded-2xl md:p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-4 text-left font-bold text-[#222222]">Date/Time</th>
              <th className="px-4 py-4 text-left font-bold text-[#222222]">Transaction</th>
              <th className="hidden md:table-cell px-4 py-4 text-left font-bold text-[#222222]">Description</th>
              <th className="px-4 py-4 text-left font-bold text-[#222222]">Amount</th>
            </tr>
          </thead>
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
      </div>

      {/* Pagination — outside the card */}
      {filteredPayments.length > 0 && (
        <div className="flex justify-center items-center mt-6">
          <Pagination
            showControls
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            classNames={{
              cursor: "bg-[#3A98BB] text-white",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
