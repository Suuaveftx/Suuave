"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import SearchBar from "../../../../components/Searchbar";
import SortByDropdown from "../../../../components/SortByDropdown";

export default function CompletedContracts() {
  return (
    <>
     <div className="flex items-center gap-x-2">
    <SearchBar placeholder="Search by job title" className="w-full max-w-[780px]" />
     <SortByDropdown />
</div>
    <div className="w-[100%] max-w-[900px] ml-8 mt-4 bg-[#FAFAFA] border border-gray-300 min-h-[280px] flex flex-col p-4 rounded-lg shadow-md">
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="w-full border-collapse"
      >
        <TableHeader className="border-b border-gray-300">
          <TableColumn className="text-center">DATE</TableColumn>
          <TableColumn className="text-center">PROJECT</TableColumn>
          <TableColumn className="text-center">CLIENT</TableColumn>
          <TableColumn className="text-center">EARNINGS</TableColumn>
        </TableHeader>

        <TableBody>
          {[
            { date: "12 May 2024", project: "Modern Fashion Attire Illustration", client: "SHOLA ADIN", earnings: "$700" },
            { date: "12 May 2024", project: "Modern Fashion Attire Illustration", client: "SHOLA ADIN", earnings: "$700" },
            { date: "12 May 2024", project: "Modern Fashion Attire Illustration", client: "SHOLA ADIN", earnings: "$700" },
            { date: "12 May 2024", project: "Modern Fashion Attire Illustration", client: "SHOLA ADIN", earnings: "$700" },
          ].map((user, index) => (
            <TableRow key={index} className="border-b border-gray-300">
              <TableCell className="text-center">{user.date}</TableCell>
              <TableCell className="text-blue-400 text-center">{user.project}</TableCell>
              <TableCell className="text-center">{user.client}</TableCell>
              <TableCell className="text-center">{user.earnings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>
  );
}
