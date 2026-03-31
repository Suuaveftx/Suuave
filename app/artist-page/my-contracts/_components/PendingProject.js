import { useState } from 'react';
import { AlertTriangle, MoreVertical } from 'lucide-react';
import CustomButton from '../../../../components/CustomButton';
import SearchBar from '../../../../components/Searchbar';
import Link from 'next/link';
import AcceptModal from '../../../../components/AcceptModal';
import DeclineModal from '../../../../components/DeclineModal';


const PendingProjects = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const pendingProjects = [
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-A',
      pendingSince: '18th June, 2024',
      expiresIn: '20th May, 2025',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-B',
      pendingSince: '18th June, 2024',
      expiresIn: '20th May, 2025',
    },
  ];

  return (
    <div>

      {/* Desktop Warning */}
      <div className='lg:flex items-start space-x-3 p-3 rounded-lg hidden bg-[#FFF8EB] w-[40%] mt-8 border border-[#FFF8EB] lg:ml-8'>
        <AlertTriangle className='text-[#FF8024] w-5 h-5 mt-0.5' />
        <p className='text-xs text-[#E68A1D] font-medium'>
          These contracts are yet to be accepted. <br />
          You have 5 days to accept each offer to avoid automatic cancellation.
        </p>
      </div>

      {/* Mobile Warning */}
      <div className='bg-[#FFF8EB] w-[92%] mx-auto lg:hidden items-start space-x-3 p-3 rounded-lg flex mt-4 mb-2 border border-[#FFF8EB]'>
        <AlertTriangle className='text-[#FF8024] min-w-5 w-5 h-5 mt-0.5' />
        <p className='text-xs text-[#E68A1D] font-medium leading-[1.4]'>
          These contracts are yet to be accepted. <br />
          You have 5 days to accept each offer to avoid automatic cancellation.
        </p>
      </div>

      {/* Search Bar */}
      <div className='flex lg:flex-row lg:justify-between lg:items-center items-center w-[92%] mx-auto mb-4 lg:w-full lg:max-w-full lg:mt-6'>
        <div className='w-full lg:max-w-[500px]'>
          <SearchBar placeholder='Search Project' />
        </div>
      </div>

      <div>
        {pendingProjects.map((project) => (
          <div
            key={project.id}
            className='bg-white lg:bg-transparent border-b last:border-b-0 border-[#EAEAEA] p-4 group active:bg-gray-50 active:opacity-[0.98] transition-all'
            onClick={() => setDropdownOpen(null)}
          >
            <div className="flex md:justify-between items-start w-full">
              <div className="flex-1 md:flex md:justify-between md:items-center">
                {/* Project Info & Dates */}
                <Link
                  href={'/artist-page/pending-contract-information'}
                  className='flex-1 grid md:grid-cols-[1.5fr_1fr_1fr] md:gap-x-8 md:items-center'
                >
                  <div className='flex flex-col mb-1 md:mb-0 md:pl-8'>
                    <h3 className='text-[#222222] font-bold text-base group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors line-clamp-1'>
                      {project.title} ({project.id})
                    </h3>
                  </div>

                  <p className="text-sm font-satoshi flex items-center gap-2">
                    <span className="font-light whitespace-nowrap text-gray-500 md:min-w-fit min-w-[105px] transition-colors group-hover:text-[#3A98BBCC] group-active:text-[#3A98BBCC]">Pending Since -</span>
                    <span className="font-semibold whitespace-nowrap text-[#222222] transition-colors group-hover:text-[#3A98BB] group-active:text-[#3A98BB]">
                      {project.pendingSince}
                    </span>
                  </p>

                  <p className="text-sm font-satoshi flex items-center gap-2">
                    <span className="max-[840px]:hidden text-gray-300">|</span>
                    <span className="font-light whitespace-nowrap text-gray-500 md:min-w-fit min-w-[105px] transition-colors group-hover:text-[#3A98BBCC] group-active:text-[#3A98BBCC]">Expires date -</span>
                    <span className="font-semibold whitespace-nowrap text-[#222222] transition-colors group-hover:text-[#3A98BB] group-active:text-[#3A98BB]">
                      {project.expiresIn}
                    </span>
                  </p>
                </Link>

                {/* Accept Button (Desktop Only) */}
                <div className='hidden lg:flex items-center gap-4 shrink-0 md:pl-8'>
                  <AcceptModal
                    trigger={
                      <CustomButton
                        variant='outline'
                        size='sm'
                        className='items-center font-bold px-8'
                        text='Accept Offer'
                        style={{
                          color: '#035A7A',
                          background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
                          border: 'none',
                          borderRadius: '20px'
                        }}
                      />
                    }
                  />
                  <DeclineModal
                    trigger={
                      <CustomButton
                        variant='outline'
                        size='sm'
                        className='items-center font-bold px-8'
                        text='Decline'
                        style={{
                          color: '#035A7A',
                          background: 'transparent',
                          border: '1px solid #035A7A',
                          borderRadius: '20px'
                        }}
                      />
                    }
                  />
                </div>
              </div>

              {/* Mobile 3 Dots Menu */}
              <div
                className="md:hidden relative shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="p-1 border-0 flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(dropdownOpen === project.id ? null : project.id);
                  }}
                >
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>

                <div
                  className={`${dropdownOpen === project.id ? 'block' : 'hidden'} absolute right-0 mt-2 w-40 bg-[#FAFAFA] rounded-xl z-50 border-0`}
                  style={{
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AcceptModal
                    trigger={
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-[#035A7A] hover:bg-gray-50 active:bg-gray-100 font-semibold rounded-t-xl"
                        onClick={() => setDropdownOpen(null)}
                      >
                        Accept Offer
                      </button>
                    }
                  />
                  <DeclineModal
                    trigger={
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-gray-50 active:bg-gray-100 font-semibold border-t border-[#EAEAEA] rounded-b-xl"
                        onClick={() => setDropdownOpen(null)}
                      >
                        Decline
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

  );
};

export default PendingProjects;
