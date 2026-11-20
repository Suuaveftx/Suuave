import { Card, CardBody, CardFooter, Skeleton } from '@heroui/react';

const FashionDesignerCardsLoader = () => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Card
          key={index}
          className='px-0 hover:shadow-xl overflow-hidden bg-white shadow-md border border-gray-100 rounded-[8px] w-full flex flex-col h-[251px] md:h-[432px]'
          shadow='none'
        >
          <CardBody className='overflow-hidden p-0 relative flex-1'>
            <div className='block relative w-full h-full overflow-hidden rounded-b-none'>
              <Skeleton className='absolute right-2.5 top-2.5 z-20 rounded-lg size-7 ' />

              <Skeleton className='block w-full h-full bg-gray-400' />
            </div>
          </CardBody>

          {/* --- DESKTOP FOOTER --- */}
          <CardFooter className='hidden md:flex flex-col items-start w-full px-4 py-4 flex-none gap-2.5 bg-white'>
            <div className='flex justify-between items-start w-full gap-2'>
              <Skeleton className='rounded-md h-4 w-24' />

              <Skeleton className='h-4 w-10 rounded-md' />
            </div>
            <div className='flex items-center gap-2 w-full'>
              <Skeleton className='w-6 h-6 min-w-[24px] min-h-[24px] rounded-full' />
              <Skeleton className='h-4 w-44 rounded-md' />
            </div>
          </CardFooter>

          {/* --- MOBILE FOOTER --- */}
          <CardFooter className='md:hidden flex flex-col items-start w-full px-3 py-3 flex-none gap-0 bg-white'>
            <div className='w-full flex'>
              <Skeleton className='h-4 w-16 rounded-md' />
            </div>
            <Skeleton className='mt-0.5 mb-1 h-4 w-10 rounded-md' />
            <div className='flex items-center w-full '>
              <Skeleton className='h-4 w-32 rounded-md' />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
export default FashionDesignerCardsLoader;
