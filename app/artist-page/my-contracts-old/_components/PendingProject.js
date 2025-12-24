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
      pendingSince: '18 June 2024',
      expiresIn: '-2 days',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-B',
      pendingSince: '18 June, 2024',
      expiresIn: '2 Days',
    },
  ];

  return (
    <div>

      {/* Desktop Warning */}
      <div className='lg:flex items-start space-x-3 p-3 rounded-lg hidden bg-[#FFF8EB] w-[40%] mt-8 border border-[#FFF8EB]'>
        <AlertTriangle className='text-[#FF8024] w-5 h-5 mt-0.5' />
        <p className='text-xs text-[#E68A1D] font-medium'>
          These contracts are yet to be accepted. <br />
          Artists have 5 days to accept offers, to avoid automatic cancellation
        </p>
      </div>

      {/* Mobile Warning */}
      <div className='bg-[#EAEAEA] w-full lg:hidden items-start space-x-3 p-4 rounded-lg flex lg:mx-auto mt-4 mb-2'>
        <AlertTriangle className='text-[#878787] min-w-6 w-6 h-6 mt-0.5' />
        <p className='text-sm text-[#444444] font-normal leading-[1.4]'>
          You have pending contracts you are yet to accept. Pending contracts automatically cancels after 48hrs.
        </p>
      </div>

      {/* Search Bar (Desktop Only) */}
      <div className='lg:flex hidden mt-6 items-center w-full max-w-[500px]'>
        <SearchBar placeholder='Search by job title' />
      </div>

      {/* Pending Projects */}
      <div>
        {pendingProjects.map((project) => (
          <div
            key={project.id}
            className='bg-white lg:bg-transparent border-b last:border-b-0 border-[#EAEAEA] p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-4'
          >
            {/* Project Info + Mobile Dots */}
            <Link href={'/artist-page/pending-contract-information'} className='w-full'>
              <div className='lg:flex lg:flex-row lg:items-center lg:justify-between w-full'>
                {/* Desktop Title Layout */}
                <div className='hidden lg:flex flex-col'>
                  <h3 className='text-[#222222] font-bold text-base hover:text-[#3A98BB] transition-colors'>
                    {project.title} ({project.id})
                  </h3>
                </div>

                {/* Mobile Title Layout */}
                <div className="flex lg:hidden justify-between items-start w-full mb-1">
                  <h3 className='text-[16px] tracking-[0.33px] text-[#3A98BB] font-bold lg:mb-0'>
                    {project.title} ...
                    <span className='text-sm text-[#222222] font-bold inline lg:hidden'>
                      ({project.id})
                    </span>
                  </h3>

                  <div className='ml-2 flex lg:hidden relative'>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link click
                        setDropdownOpen(dropdownOpen === project.id ? null : project.id)
                      }}
                    >
                      <MoreVertical className='w-5 h-5 text-[#878787] cursor-pointer' />
                    </button>
                    {dropdownOpen === project.id && (
                      <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdownOpen(null)
                          }}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                        >
                          Cancel Contract
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Common Date Info (Desktop adjusted) */}
                <div className='flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-1'>
                  <p className='text-[14px] text-[#878787] font-normal'>
                    Pending Since - <span className='text-[#222222] font-medium lg:font-normal lg:text-[#878787]'>{project.pendingSince}</span>
                    <span className='hidden lg:inline mx-1'>/</span>
                  </p>
                  <p className='text-[14px] text-[#878787] font-normal'>
                    Expires in - <span className='text-[#222222] font-medium lg:font-normal lg:text-[#222222]'>2 Days</span>
                  </p>
                </div>
              </div>
            </Link>

            {/* Accept Button (Desktop Only) */}
            <div className='flex gap-2 lg:min-w-fit'>
              <div className='hidden lg:flex items-center gap-4'>
                <AcceptModal
                  trigger={
                    <CustomButton
                      variant='outline'
                      size='sm'
                      className='items-center font-bold px-8'
                      text='Accept Offer'
                      style={{
                        color: '#035A7A',
                        background: 'linear-gradient(180deg, #E0F2F7 0%, #D1ECF4 100%)',
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
                        color: '#222222',
                        background: 'transparent',
                        border: '1px solid #878787',
                        borderRadius: '20px'
                      }}
                    />
                  }
                />
              </div>
              {/* Desktop Three Dots */}
              <div className='lg:flex hidden relative items-center ml-2'>
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === project.id ? null : project.id)
                  }
                >
                  <MoreVertical className='w-5 h-5 text-[#878787] cursor-pointer' />
                </button>
                {dropdownOpen === project.id && (
                  <div className='absolute right-0 top-6 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
                    <button
                      onClick={() => setDropdownOpen(null)}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                    >
                      Cancel Contract
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>

  );
};

export default PendingProjects;
