import { Skeleton } from '@heroui/react';

export default function ProfileSkeleton() {
  return (
    <div
      className='w-full h-full lg:h-fit lg:w-[320px] lg:bg-white rounded-lg lg:space-y-2 
      flex flex-col items-center lg:items-start lg:text-left shadow-sm lg:shadow-none'
    >
      <div className='bg-white lg:bg-[#ffffff] w-full lg:px-6 lg:py-6 px-4 py-8 rounded-lg shadow-sm relative'>
        <div className='space-y-4 pb-3 w-full flex flex-col items-center'>
          {/* Profile Initials */}
          <div className='flex justify-center w-full'>
            <div className='relative w-[100px] h-[100px]'>
              <Skeleton className='w-full h-full !bg-[#AFC8D0] before:!via-white/70 rounded-full' />
            </div>
          </div>

          {/* Name */}
          <div className='w-full flex flex-col items-center'>
            <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-6 w-48 rounded-lg' />
          </div>

          {/* Occupation */}
          <div className='flex flex-col items-center gap-2 w-full'>
            <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 w-32 h-4 rounded-lg' />

            {/* Location */}
            <div className='w-full flex justify-center items-center mt-1'>
              <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 w-28 h-4 rounded-lg' />
            </div>

            {/* Rating */}

            <div className='w-full flex justify-center items-center mt-1'>
              <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 w-24 h-4 rounded-lg' />
            </div>
          </div>
        </div>
      </div>

      {/* Brand specific divider if needed */}
      <div className='w-full h-2 bg-[#F1F1F1] lg:hidden'></div>

      {/* Stats */}
      <div className='bg-white w-full py-6 lg:py-6 lg:px-6 px-4 border-y border-[#f1f1f1] lg:border-none'>
        <div className='flex flex-row lg:flex-col justify-center gap-6 lg:gap-4 w-full'>
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 w-1/2 h-6 rounded-lg' />

          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 w-1/2 h-6 rounded-lg' />
        </div>
      </div>

      <div className='w-full h-2 bg-[#F1F1F1] lg:hidden'></div>

      {/* About Us Section */}
      <div className='bg-white lg:bg-[#ffffff] w-full flex flex-col items-start lg:px-6 px-4 py-8 text-left lg:mt-0 rounded-lg shadow-sm mb-10'>
        {/* Heading */}
        <div className='flex items-center w-full justify-between mb-4'>
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-6 w-32 rounded-lg' />
        </div>

        {/* Text Area */}
        <div className='w-full'>
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-full rounded-lg' />
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-full rounded-lg mt-2' />
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-full rounded-lg mt-2' />
        </div>
      </div>
    </div>
  );
}
