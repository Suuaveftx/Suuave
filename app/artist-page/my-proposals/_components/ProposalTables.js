'use client';
import React, { useState } from 'react';
import { TrashIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PaginationTab from '../../../../components/Pagination';
import DeleteConfirmationModal from '../../../fashion-designers/my-projects/components/DeleteConfirmationModal';
import { useDisclosure } from '@heroui/react';

const ProposalTables = () => {
  const router = useRouter();
  const [proposals, setProposals] = useState([
    { id: 1, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 2, title: 'Fashion Native Bridal illustration', date: 'September 12, 2024', status: 'Active' },
    { id: 3, title: 'Fashion Native Bridal illustration', date: 'October 12, 2024', status: 'Inactive' },
    { id: 4, title: 'Fashion Native Bridal illustration', date: 'August 12, 2024', status: 'Active' },
    { id: 5, title: 'Fashion Native Bridal illustration', date: 'November 12, 2024', status: 'Active' },
    { id: 6, title: 'Fashion Native Bridal illustration', date: 'May 12, 2024', status: 'Inactive' },
    { id: 7, title: 'Fashion Native Bridal illustration', date: 'January 12, 2024', status: 'Active' },
    { id: 8, title: 'Fashion Native Bridal illustration', date: 'March 12, 2024', status: 'Active' },
    { id: 9, title: 'Fashion Native Bridal illustration', date: 'August 12, 2024', status: 'Inactive' },
    { id: 10, title: 'Fashion Native Bridal illustration', date: 'November 12, 2024', status: 'Active' },
    { id: 11, title: 'Fashion Native Bridal illustration', date: 'December 12, 2024', status: 'Active' },
    { id: 12, title: 'Fashion Native Bridal illustration', date: 'January 1, 2025', status: 'Inactive' },
  ]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [proposalToDelete, setProposalToDelete] = useState(null);

  const statusColors = {
    Active: 'text-green-800',
    Inactive: 'text-red-500',
  };

  const openDeleteModal = (id, title) => {
    setProposalToDelete({ id, title });
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (proposalToDelete) {
      setProposals(proposals.filter((p) => p.id !== proposalToDelete.id));
      setProposalToDelete(null);
    }
  };

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const proposalsPerPage = 10; // 👈 show 10 per page
  const totalPages = Math.ceil(proposals.length / proposalsPerPage);

  const indexOfLastProposal = currentPage * proposalsPerPage;
  const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
  const currentProposals = proposals.slice(indexOfFirstProposal, indexOfLastProposal);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {/* Title */}
      <div className="w-[90%] border-b-2 text-left mb-[21px] ml-5 lg:ml-16">
        <div className="flex items-center gap-2 mt-8 pb-1">
          <button onClick={() => router.back()} className="flex items-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">My Proposals</h1>
        </div>
      </div>

      {/* Table */}
      <section className="w-full">
        <div className="bg-[#FAFAFA] w-full max-w-6xl lg:ml-16 lg:px-8 lg:pt-4 lg:pb-8 rounded-2xl mb-10">
          {/* Header Row */}
          <div className="grid grid-cols-3 font-bold px-8 py-4 border-b">
            <h4 className="text-left">Job Posts</h4>
            <h4 className="text-center">Date</h4>
            <h4 className="text-right">Status</h4>
          </div>

          {/* Data Rows */}
          <div>
            {currentProposals.map((proposal) => {
              const linkHref =
                proposal.status === 'Active'
                  ? `/artist-page/proposal-active`
                  : `/artist-page/closed-project`;

              return (
                <Link
                  key={proposal.id}
                  href={linkHref}
                  className="grid grid-cols-3 items-center text-base text-gray-900 px-8 py-4 border-b hover:bg-gray-100 transition cursor-pointer"
                >
                  {/* Job Post */}
                  <div
                    className={`font-bold text-base break-words tracking-[0.33px] text-left ${proposal.status === 'Inactive'
                      ? 'text-gray-400'
                      : 'text-[#3A98BB] hover:underline'
                      }`}
                  >
                    {proposal.title}
                  </div>

                  {/* Date */}
                  <div className="text-gray-600 text-center">{proposal.date}</div>

                  {/* Status + Delete */}
                  <div className="flex items-center justify-end gap-2">
                    <span className={statusColors[proposal.status]}>
                      {proposal.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openDeleteModal(proposal.id, proposal.title);
                      }}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {/* <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border border-gray-300 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-[#3A98BB] hover:bg-[#E0F4FB]'
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border border-gray-300 ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-[#3A98BB] hover:bg-[#E0F4FB]'
              }`}
            >
              Next
            </button>
          </div> */}
          <div className='w-full flex justify-center items-center mt-6'>
            <PaginationTab />
          </div>
        </div>
      </section>

      <DeleteConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleConfirmDelete}
        projectTitle={proposalToDelete?.title}
        title="Delete Proposal?"
      />
    </div>
  );
};
export default ProposalTables;
