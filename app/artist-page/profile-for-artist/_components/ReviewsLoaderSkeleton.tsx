import { cn } from '@/lib/utils';
import { Skeleton } from '@heroui/react';
import { Roles } from '@suuaveftx/prisma-shared';

type ReviewsLoaderProps = {
  role?: Roles;
};

export default function ReviewsLoaderSkeleton({
  role = Roles.artist,
}: ReviewsLoaderProps) {
  return (
    <div className={cn(role === Roles.brand && 'bg-[#fafafa] mt-6 p-4 rounded-md')}>
      <aside
        className={cn(
          'flex flex-col justify-center items-center border-2 border-[#E6E6E6] rounded-md  text-center',
          role === Roles.brand ? 'ml-6 w-44 h-28 ' : 'w-64 h-40 ml-8 lg:ml-32'
        )}
      >
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
