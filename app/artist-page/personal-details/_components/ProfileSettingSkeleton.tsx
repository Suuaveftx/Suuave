import { Skeleton } from '@heroui/react';

export default function ProfileSettingsSkeleton() {
  return (
    <div
      className='min-h-screen bg-[#DBDBDB]/30'
      aria-label='Loading profile'
      role='status'
    >
      <div className='flex flex-col md:flex-row px-5 md:px-10 mt-5 md:mt-14 md:gap-32'>
        <aside className='hidden md:flex flex-col items-start gap-6 w-full md:w-[40%] lg:w-[25%]'>
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-10 w-48 rounded-lg' />
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-36 w-36 rounded-full' />
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-6 w-40 rounded-lg' />
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-32 rounded-lg' />
          <div className='flex flex-col gap-4 w-full mt-4'>
            {Array.from({ length: 7 }, (_, index) => (
              <Skeleton
                key={index}
                className='!bg-[#AFC8D0] before:!via-white/70 h-5 w-4/5 rounded-lg'
              />
            ))}
          </div>
        </aside>
        <main className='flex-1 mt-5 md:mt-6 bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-4 md:p-6'>
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-8 w-56 rounded-lg' />
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-72 max-w-full rounded-lg mt-3 mb-8' />
          <div className='grid md:grid-cols-2 gap-6 md:gap-10'>
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-28 rounded-lg' />
                <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-11 w-full rounded-lg' />
              </div>
            ))}
            <div className='md:col-span-2 flex flex-col gap-2'>
              <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-4 w-32 rounded-lg' />
              <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-24 w-full rounded-lg' />
            </div>
          </div>
          <Skeleton className='!bg-[#AFC8D0] before:!via-white/70 h-12 w-36 rounded-full mt-10 ml-auto' />
        </main>
      </div>
    </div>
  );
}
