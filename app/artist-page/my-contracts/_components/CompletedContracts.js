"use client";
import SearchBar from "../../../../components/Searchbar";
import SortByDropdown from "../../../../components/SortByDropdown";

const data = [
  {
    date: "12 May 2024",
    project: "Modern Fashion Attire Illustration",
    client: "SHOLA ADIN",
    earnings: "$700",
    status: "Completed",
  },
  {
    date: "12 May 2024",
    project: "Modern Fashion Attire Illustration",
    client: "SHOLA ADIN",
    earnings: "$700",
    status: "Completed",
  },
  {
    date: "12 May 2024",
    project: "Modern Fashion Attire Illustration",
    client: "SHOLA ADIN",
    earnings: "$700",
    status: "Completed",
  },
  {
    date: "12 May 2024",
    project: "Modern Fashion Attire Illustration",
    client: "SHOLA ADIN",
    earnings: "$700",
    status: "Completed",
  },
];

export default function CompletedContracts() {
  return (
    <>
      {/* Search & Sort */}
      <div className="flex flex-wrap items-center gap-2">
        <SearchBar
          placeholder="Search by job title"
          className="w-full lg:max-w-[780px] flex-1"
        />
        <SortByDropdown />
      </div>

<div className="w-full overflow-x-auto">
  <table className="min-w-[640px] w-full bg-[#FAFAFA] border-[#EAEAEA] shadow-md mt-6 border border-collapse">
    <thead className="lg:border-b lg:bg-transparent bg-[#CCE7F2]">
      <tr>
        <th className="border border-gray-300 px-6 py-4 text-center lg:border-none">Date</th>
        <th className="border border-gray-300 px-6 py-4 text-center lg:border-none">Project</th>
        <th className="border border-gray-300 px-6 py-4 text-center lg:border-none">Client</th>
        <th className="border border-gray-300 px-6 py-4 text-center lg:border-none">Earnings</th>
        <th className="border border-gray-300 px-6 py-4 text-center lg:border-none">Status</th>
      </tr>
    </thead>
    <tbody className="h-full">
      {data.map((item, index) => (
        <tr key={index} className="bg-[#fafafa] text-center border-b">
          <td className="border border-gray-300 px-6 py-5 lg:border-none text-[#222222]">{item.date}</td>
          <td className="text-[#3A98BB] border border-gray-300 px-6 py-5 lg:border-none">{item.project}</td>
          <td className="border border-gray-300 px-6 py-5 lg:border-none text-[#767676]">{item.client}</td>
          <td className="border border-gray-300 px-6 py-5 lg:border-none text-[#222222]">{item.earnings}</td>
          <td className="border border-gray-300 px-6 py-5 lg:border-none text-[#222222]">{item.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </>
  );
}
