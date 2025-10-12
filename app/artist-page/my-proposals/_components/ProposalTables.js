'use client';
import { TrashIcon } from '@heroicons/react/24/outline';

const ProposalTables = () => {
  const proposals = [
    { id: 1, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 2, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 3, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Inactive' },
    { id: 4, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 5, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 6, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Inactive' },
    { id: 7, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 8, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
    { id: 9, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Inactive' },
    { id: 10, title: 'Fashion Native Bridal illustration', date: 'June 12, 2024', status: 'Active' },
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
    <div >
      <h1 className="text-xl font-bold lg:ml-16 ml-4 mt-8 mb-[30px] border-b border-gray-300 pb-1">
        My Proposals
      </h1>
 <section className='w-screen  max-w-[1149px]'>
   <div className='bg-[#FAFAFA] w-full max-w-[1149px] lg:ml-16 lg:mr-[299px] rounded-2xl mb-[239px] lg:px-8 lg:py-8 px-0'>
    <div className='flex  justify-between font-bold px-8 py-4 border-b-1'>
      <h4>Job Posts</h4> 
      <h4 className='ml-8'>Date</h4>
      <h4>Status</h4>
    </div>
    <div>
      {proposals.map((proposal) => (
        <div
        key={proposal.id}
         className="flex items-center justify-between text-base text-gray-900 px-8 py-4 border-b-1">
        <div
  className={`font-bold text-base break-words tracking-[0.33px] w-full max-w-[110px] lg:w-full lg:max-w-[250px] ${
    proposal.status === 'inactive' ? 'text-gray-400' : 'text-gray-900 '
  }`}
>
  {proposal.title}
</div>
  {/* Date */}
              <div className="text-gray-600 lg:mr-32">
                {proposal.date}
              </div>
              {/* Status and Actions */}
              <div className="flex items-center gap-2">
                <span className={statusColors[proposal.status]}>
                  {proposal.status}
                </span>
                <button 
                  onClick={() => handleDelete(proposal.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Delete proposal"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
        </div>
      ))}
    </div>
   </div>
 </section>


    </div>
  );
};

export default ProposalTables;