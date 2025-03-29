'use client'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";

export default function ProposalTables() {
  return (
    <>
    <h1 className="font-bold text-2xl ml-4 mt-16 border-b border-gray-300">Proposals</h1>
    <div className="flex items-center min-h-screen mt-[-42] ml-4">
    <Table removeWrapper aria-label="Example static collection table" className="bg-[#FAFAFA] text-black
     w-4/5 flex flex-col justify-center items-center rounded-2xl">
      <TableHeader className="!bg-transparent border-b border-gray-300">
        <TableColumn className="font-bold">Job Post</TableColumn>
        <TableColumn className="font-bold">Date</TableColumn>
        <TableColumn className="font-bold">Status</TableColumn>
      </TableHeader>
      
      <TableBody>
        <TableRow key="1" className="border-b border-gray-300">
          <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
          <TableCell className="text-[#222222]">June,12,2024</TableCell>
          <TableCell className="text-[#056d16]">Active</TableCell>
          
        </TableRow>
        <TableRow key="2" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="3" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="4" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="5" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="6" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="7" className="border-b border-gray-300"> 
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="8" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="9" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
        <TableRow key="10" className="border-b border-gray-300">
        <TableCell className="font-bold text-[#3a98bb]">Fashion Native Bridal illustration</TableCell>
        <TableCell className="text-[#222222]">June,12,2024</TableCell>
        <TableCell className="text-[#056d16]">Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    </>
  );
}
