import { Skeleton } from '@heroui/react';

export default function FashionCardSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-lg p-4'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='rounded-xl overflow-hidden shadow-sm bg-white relative w-full'
        >
          <Skeleton className='!bg-[#e1e2e2] before:!via-white/70 w-96 h-32 rounded-lg' />
        </div>
      ))}
    </div>
  );
}
