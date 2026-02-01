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
      expiresIn: '2d left',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-B',
      pendingSince: '18 June, 2024',
      expiresIn: '10d left',
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
      <div className='bg-[#EAEAEA] w-full lg:hidden items-start space-x-3 p-4 rounded-lg flex lg:mx-auto mt-4 mb-2'>
        <AlertTriangle className='text-[#878787] min-w-6 w-6 h-6 mt-0.5' />
        <p className='text-sm text-[#444444] font-normal leading-[1.4]'>
          These contracts are yet to be accepted. Artists have 5 days to accept each offers to avoid automatic cancellation.
        </p>
      </div>

      {/* Search Bar (Desktop Only) */}
      <div className='lg:flex hidden mt-6 items-center w-full max-w-[500px]'>
        <SearchBar placeholder='Search by job title' />
      </div>

      <div>
        {pendingProjects.map((project) => (
          <div
            key={project.id}
            className='bg-white lg:bg-transparent border-b last:border-b-0 border-[#EAEAEA] p-4'
          >
            <div className="flex md:justify-between items-start w-full">
              <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr_0.8fr_auto] md:gap-x-8 md:items-center">
                {/* Project Info */}
                <Link href={'/artist-page/pending-contract-information'} className='w-full'>
                  <div className='flex flex-col mb-1 md:mb-0 md:pl-8'>
                    <h3 className='text-[#222222] font-bold text-base hover:text-[#3A98BB] transition-colors line-clamp-1'>
                      {project.title} ({project.id})
                    </h3>
                  </div>
                </Link>

                <p className="text-sm font-satoshi flex items-center gap-2">
                  <span className="font-light whitespace-nowrap text-gray-500">Pending Since -</span>
                  <span className="font-semibold whitespace-nowrap text-[#222222]">
                    {project.pendingSince}
                  </span>
                </p>

                <p className="text-sm font-satoshi flex items-center gap-2">
                  <span className="max-[840px]:hidden text-gray-300">|</span>
                  <span className="font-light whitespace-nowrap text-gray-500">Expires in -</span>
                  <span className="font-semibold whitespace-nowrap text-[#222222]">
                    {project.expiresIn}
                  </span>
                </p>

                {/* Accept Button (Desktop Only) */}
                <div className='hidden lg:flex items-center gap-4 shrink-0'>
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
              </div>

              {/* Mobile 3 Dots Menu */}
              <button
                className="md:hidden p-2 shrink-0 border-0 flex"
                onClick={() => setDropdownOpen(dropdownOpen === project.id ? null : project.id)}
              >
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>

  );
};

export default PendingProjects;
