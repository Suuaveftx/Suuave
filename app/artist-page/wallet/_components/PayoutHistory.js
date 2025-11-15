'use client';
import React, { useState } from "react";
import PaginationTab from "../../../../components/Pagination";

export default function PayoutHistory() {
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
  const itemsPerPage = 8;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "text-[#056D16]";
      case "Failed":
        return "text-[#EE2D2D]";
      case "Pending":
        return "text-[#E28C4F]";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-[#fafafa] w-full max-w-[800px] rounded-2xl px-8 pb-[40px]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-[#222222] text-base">
            <tr>
              <th className="border-b px-4 py-2">Transaction ID</th>
              <th className="border-b px-4 py-2">Amount</th>
              <th className="border-b px-4 py-2">Date</th>
              <th className="border-b px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr
                key={idx}
                className="text-[#767676] text-base font-normal hover:bg-gray-50"
              >
                <td className="border-b px-4 py-2">{item.transactionId}</td>
                <td className="border-b px-4 py-2">{item.amount}</td>
                <td className="border-b px-4 py-2">{item.date}</td>
                <td
                  className={`border-b px-4 py-2 font-normal ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#035A7A] text-white hover:bg-[#024b67]"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#CCE7F2] text-white hover:bg-[#024b67]"
          }`}
        >
          Next
        </button>
      </div> */}
      <div className=" w-full flex justify-center items-center mt-6">
        <PaginationTab />
      </div>
    </div>
  );
}
