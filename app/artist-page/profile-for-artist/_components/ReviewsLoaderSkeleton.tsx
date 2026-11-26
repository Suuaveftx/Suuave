import { Skeleton } from '@heroui/react';

export default function ReviewsLoaderSkeleton() {
  return (
    <div>
      <aside className='flex flex-col justify-center items-center bg-[#fafafa] border-2 border-[#E6E6E6] rounded-md w-64 h-40 lg:ml-32 ml-8  text-center'>
        <Skeleton className='h-4 w-24 !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
        <Skeleton className='h-4 my-2 w-36 !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
        <Skeleton className='h-4 w-28 !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
      </aside>
      <aside className='mt-6 lg:w-full lg:max-w-[70%] w-full border rounded-lg shadow p-4'>
        <div className='divide-y'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='py-4 flex items-start'>
              <Skeleton className='size-16 !bg-[#AFC8D0] before:!via-white/70 rounded-full' />
              <div className='w-full ml-4'>
                <Skeleton className='h-4 w-32 !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
                <Skeleton className='h-3 mt-4 w-[80%] !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
                <Skeleton className='h-3 mt-1 w-[60%] !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
                <Skeleton className='h-3 mt-1 w-[40%] !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
                <Skeleton className='h-4 mt-4 w-32 !bg-[#AFC8D0] before:!via-white/70 rounded-lg' />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
