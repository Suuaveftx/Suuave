import React, { useState } from "react";

export default function PayoutHistory() {
  const [data] = useState([
    {
      transactionId: "ID35423664",
      amount: "$321",
      date: "21/04/2023",
      status: "Success",
    },
    {
      transactionId: "ID35423665",
     amount: "$321",
      date: "22/04/2023",
      status: "Success",
    },
    {
      transactionId: "ID35423666",
       amount: "$321",
      date: "23/04/2023",
      status: "Failed",
    },
    {
      transactionId: "ID35423667",
      amount: "$321",
      date: "24/04/2023",
      status: "Pending",
    },
     {
      transactionId: "ID35423665",
        amount: "$321",
      date: "22/04/2023",
      status: "Success",
    },
     {
      transactionId: "ID35423665",
       amount: "$321",
      date: "22/04/2023",
      status: "Success",
    },
     {
      transactionId: "ID35423665",
       amount: "$321",
      date: "22/04/2023",
      status: "Success",
    },
     {
      transactionId: "ID35423665",
       amount: "$321",
      date: "22/04/2023",
      status: "Success",
    },
  ]);

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
        {data.map((item, idx) => (
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
</div>

  );
}
