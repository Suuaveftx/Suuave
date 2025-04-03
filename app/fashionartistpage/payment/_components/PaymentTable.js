import React from "react";

const PaymentTable = () => {
  return (
    <div className="overflow-x-auto mt-4 border-1 bg-[#FAFAFA] border-[#DDDDDD] rounded-2xl p-4">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Contract</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
          <tr className="border-b text-[#767676]">
            <td className="px-4 py-2">Modern Fashion Attire <br />Illustration(85375758858)</td>
            <td className="px-4 py-2">$321</td>
            <td className="px-4 py-2">21/04/2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
