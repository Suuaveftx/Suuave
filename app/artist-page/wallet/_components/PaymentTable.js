'use client';
import React, { useState } from "react";
import PaginationTab from "../../../../components/Pagination";

const PaymentTable = () => {
  const payments = [
    { id: 1, contract: "Modern Fashion Attire Illustration(85375758858)", amount: "$321", date: "21/04/2023" },
    { id: 2, contract: "Native Bridal Design(95847384930)", amount: "$400", date: "05/05/2023" },
    { id: 3, contract: "Cultural Art Piece Illustration(9393939393)", amount: "$250", date: "12/06/2023" },
    { id: 4, contract: "Modern Fashion Attire Illustration(85375758858)", amount: "$321", date: "21/04/2023" },
    { id: 5, contract: "Streetwear Fashion Concept(849302394)", amount: "$500", date: "10/07/2023" },
    { id: 6, contract: "Luxury Brand Art Project(384758383)", amount: "$750", date: "15/08/2023" },
    { id: 7, contract: "African Heritage Illustration(485939302)", amount: "$290", date: "20/09/2023" },
    { id: 8, contract: "Modern Portrait Sketch(5959494949)", amount: "$410", date: "25/10/2023" },
    { id: 9, contract: "Wedding Invitation Artwork(9394949494)", amount: "$600", date: "30/11/2023" },
    { id: 10, contract: "Cultural Attire Illustration(3920392039)", amount: "$275", date: "05/12/2023" },
    { id: 11, contract: "Classic Bridal Illustration(55555555)", amount: "$315", date: "12/01/2024" },
    { id: 12, contract: "Abstract Design Piece(77777777)", amount: "$430", date: "20/02/2024" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = payments.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="overflow-x-auto mt-4 border bg-[#FAFAFA] border-[#DDDDDD] rounded-2xl p-4">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-semibold">Contract</th>
            <th className="px-4 py-2 text-left font-semibold">Amount</th>
            <th className="px-4 py-2 text-left font-semibold">Date</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="border-b text-[#767676]">
              <td className="px-4 py-2">{item.contract}</td>
              <td className="px-4 py-2">{item.amount}</td>
              <td className="px-4 py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      {/* <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#CCE7F2] text-white hover:bg-[#024b67]"
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
      <div className="w-full flex justify-center items-center mt-4">
  <PaginationTab />
</div>

    </div>
  );
};

export default PaymentTable;
