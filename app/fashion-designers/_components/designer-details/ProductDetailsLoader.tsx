import { Card, CardBody, Skeleton } from '@heroui/react';
import PageContainer from '@/components/layout/PageContainer';

const skeletonClass = '!bg-[#e1e2e2] before:!via-white/70 rounded-md';

export default function ProductDetailsLoader() {
  return (
    <>
      <PageContainer className='hidden lg:block py-5 md:py-8'>
        <div className='grid grid-cols-12 gap-8 mt-4 lg:mt-6'>
          <div className='col-span-12 lg:col-span-7 flex flex-col gap-5'>
            <div className='flex h-[680px] gap-4 rounded-[32px] bg-white p-4'>
              <div className='hidden lg:flex w-24 flex-col gap-3 overflow-hidden'>
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className={`${skeletonClass} h-24 w-24 flex-none`}
                  />
                ))}
              </div>
              <Skeleton className={`${skeletonClass} h-full flex-1 rounded-[32px]`} />
            </div>

            <Card
              shadow='none'
              className='hidden lg:flex flex-col rounded-2xl border-none bg-white p-6 shadow-sm'
            >
              <CardBody className='p-0'>
                <div className='mb-5 flex items-center justify-between border-b border-gray-100 pb-4'>
                  <Skeleton className={`${skeletonClass} h-6 w-32`} />
                  <Skeleton className={`${skeletonClass} size-8 rounded-full`} />
                </div>
                <div className='space-y-3'>
                  <Skeleton className={`${skeletonClass} h-4 w-full`} />
                  <Skeleton className={`${skeletonClass} h-4 w-full`} />
                  <Skeleton className={`${skeletonClass} h-4 w-4/5`} />
                  <Skeleton className={`${skeletonClass} h-4 w-3/5`} />
                </div>
                <div className='mt-6 flex gap-3'>
                  <Skeleton className={`${skeletonClass} h-7 w-20 rounded-full`} />
                  <Skeleton className={`${skeletonClass} h-7 w-24 rounded-full`} />
                  <Skeleton className={`${skeletonClass} h-7 w-16 rounded-full`} />
                </div>
              </CardBody>
            </Card>
          </div>

          <div className='col-span-12 hidden flex-col space-y-5 lg:col-span-5 lg:flex'>
            <Card
              shadow='none'
              className='rounded-2xl border-none bg-white p-6 shadow-sm'
            >
              <CardBody className='space-y-5 p-0'>
                <Skeleton className={`${skeletonClass} h-7 w-4/5`} />
                <Skeleton className={`${skeletonClass} h-5 w-2/5`} />
                <Skeleton className={`${skeletonClass} h-5 w-3/5`} />
                <Skeleton className={`${skeletonClass} h-5 w-1/2`} />
                <div className='rounded-xl border border-gray-200 p-4'>
                  <Skeleton className={`${skeletonClass} mb-3 h-4 w-1/3`} />
                  <Skeleton className={`${skeletonClass} mb-2 h-3 w-full`} />
                  <Skeleton className={`${skeletonClass} h-3 w-4/5`} />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Skeleton className={`${skeletonClass} h-12 rounded-full`} />
                  <Skeleton className={`${skeletonClass} h-12 rounded-full`} />
                </div>
                <Skeleton className={`${skeletonClass} h-9 w-12`} />
              </CardBody>
            </Card>

            <Card
              shadow='none'
              className='rounded-2xl border-none bg-white p-6 shadow-sm'
            >
              <CardBody className='flex flex-col items-center p-0'>
                <Skeleton className={`${skeletonClass} mb-5 h-5 w-36`} />
                <Skeleton className={`${skeletonClass} mb-3 size-24 rounded-full`} />
                <Skeleton className={`${skeletonClass} mb-2 h-5 w-32`} />
                <Skeleton className={`${skeletonClass} h-4 w-24`} />
              </CardBody>
            </Card>
          </div>
        </div>
      </PageContainer>

      <div className='w-full bg-[#F9FAFB] lg:hidden'>
        <div className='mx-auto min-h-screen w-full max-w-[390px] bg-white pb-10'>
          <header className='flex items-center gap-3 px-4 py-[14px]'>
            <Skeleton className={`${skeletonClass} size-8 rounded-full`} />
            <Skeleton className={`${skeletonClass} h-5 w-32`} />
          </header>

          <Skeleton className={`${skeletonClass} h-[540px] w-full rounded-none`} />

          <div className='space-y-4 px-4 pt-[18px]'>
            <Skeleton className={`${skeletonClass} h-6 w-4/5`} />
            <Skeleton className={`${skeletonClass} h-5 w-2/5`} />
            <Skeleton className={`${skeletonClass} h-4 w-3/5`} />
            <Skeleton className={`${skeletonClass} h-4 w-1/2`} />

            <Card
              shadow='none'
              className='rounded-xl border border-[#EAEAEA] bg-[#FCFCFC]'
            >
              <CardBody className='space-y-3 p-4'>
                <Skeleton className={`${skeletonClass} h-5 w-3/5`} />
                <Skeleton className={`${skeletonClass} h-4 w-full`} />
                <Skeleton className={`${skeletonClass} h-4 w-4/5`} />
              </CardBody>
            </Card>

            <div className='flex gap-3'>
              <Skeleton className={`${skeletonClass} h-[42px] flex-1 rounded-full`} />
              <Skeleton className={`${skeletonClass} h-[42px] flex-1 rounded-full`} />
            </div>
          </div>

          <div className='mt-6 space-y-4 border-t-8 border-[#F9FAFB] px-4 pt-5'>
            <Skeleton className={`${skeletonClass} h-5 w-28`} />
            <Skeleton className={`${skeletonClass} h-4 w-full`} />
            <Skeleton className={`${skeletonClass} h-4 w-full`} />
            <Skeleton className={`${skeletonClass} h-4 w-4/5`} />
            <Skeleton className={`${skeletonClass} h-4 w-20`} />
          </div>

          <div className='mt-6 space-y-4 border-t-8 border-[#F9FAFB] px-4 pt-5'>
            <Skeleton className={`${skeletonClass} h-5 w-32`} />
            <div className='flex items-center gap-3'>
              <Skeleton className={`${skeletonClass} size-10 rounded-full`} />
              <div className='space-y-2'>
                <Skeleton className={`${skeletonClass} h-4 w-32`} />
                <Skeleton className={`${skeletonClass} h-3 w-24`} />
              </div>
            </div>
            <Skeleton className={`${skeletonClass} h-3 w-40`} />
          </div>
        </div>
      </div>
    </>
  );
}
