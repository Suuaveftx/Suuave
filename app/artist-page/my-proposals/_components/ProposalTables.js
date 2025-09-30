'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

const ProposalTables = () => {
  const proposals = [
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
  ];

  const statusColors = {
    Active: 'text-green-800',
    Inactive: 'text-red-500',
  };

  const handleDelete = (id) => {
    console.log(`Deleting proposal ${id}`);
    // Add your delete logic here
  };

  return (
    <div>
      <h1 className="text-xl font-bold lg:mx-16 ml-4 mt-8 mb-[30px] border-b border-[#eaeaea] pb-1">
        My Proposals
      </h1>

      <section className="w-full max-w-[1149px]">
        <div className="bg-[#FAFAFA] w-full max-w-6xl lg:ml-16 lg:px-8 lg:pt-4 lg:pb-8 rounded-2xl mb-[685px]">
          {/* Header Row */}
          <div className="grid grid-cols-3 font-bold px-8 py-4 border-b">
            <h4 className="text-left">Job Posts</h4>
            <h4 className="text-center">Date</h4>
            <h4 className="text-right">Status</h4>
          </div>

          {/* Data Rows */}
          <div>
            {proposals.map((proposal) => {
              // dynamic link based on status
              const linkHref =
                proposal.status === "Active"
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
                    className={`font-bold text-base break-words tracking-[0.33px] text-left ${
                      proposal.status === "Inactive"
                        ? "text-gray-400"
                        : "text-[#3A98BB] hover:underline"
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
                        e.preventDefault(); // prevent navigating when deleting
                        handleDelete(proposal.id);
                      }}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Delete proposal"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProposalTables;
