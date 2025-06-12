'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function ProposalTables() {
  const proposals = [
    { id: 1, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
    { id: 2, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
    { id: 3, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'inactive' },
    { id: 4, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
    { id: 5, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
    { id: 6, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'inactive' },
    { id: 7, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
    { id: 8, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
    { id: 9, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'inactive' },
    { id: 10, title: 'Fashion Native Bridal illustration', date: 'June,12,2024', status: 'Active' },
  ];

  return (
    <>
      <h1 className="font-bold text-2xl ml-4 mt-16 border-b border-gray-300">My Proposals</h1>
      <div className="flex items-start min-h-screen mt-12 ml-4">
        <Table
          removeWrapper
          aria-label="Proposal table"
          className="bg-[#FAFAFA] text-black w-4/5 flex flex-col  items-center rounded-2xl"
        >
        <TableHeader className="!bg-[#FAFAFA] border-b border-[#EAEAEA] w-full">
  <TableColumn className="font-bold">Job Post</TableColumn>
  <TableColumn className="font-bold pl-8">Date</TableColumn>
  <TableColumn className="font-bold flex items-center justify-end">Status</TableColumn>
</TableHeader>


          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id} className="border-b border-gray-300">
                <TableCell
                  className={`font-bold  ${
                    proposal.status === 'inactive' ? 'text-[#BABABA]' : 'text-[#222222]'
                  }`}
                >
                  {proposal.title}
                </TableCell>
                <TableCell className="text-[#565656]">{proposal.date}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`${
                        proposal.status === 'inactive' ? 'text-[#FF5757]' : 'text-[#056d16]'
                      }`}
                    >
                      {proposal.status}
                    </span>
                    <TrashIcon className="h-4 w-4  text-gray-500 cursor-pointer hover:text-red-500" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
