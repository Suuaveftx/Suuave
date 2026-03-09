'use client';

import React from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';


export default function RetainArtist() {
  const searchParams = useSearchParams();
  const artist = searchParams.get('artist') || 'Ocean';
  const returnUrl = searchParams.get('returnUrl');

  const capitalizedArtist = artist.charAt(0).toUpperCase() + artist.slice(1);

  return (
    <div className='font-satoshi min-h-[calc(100vh-80px)] flex items-center justify-center py-12'>
      <div className='max-w-4xl w-full flex flex-col items-center justify-center px-4'>
        <Card className='w-full max-w-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden border-none' shadow='none'>
          <CardBody className='p-10 space-y-8'>
            <div>
              <div className='flex items-center gap-3 mb-6'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  className='md:hidden -ml-2'
                  onClick={() => window.history.back()}
                >
                  <ChevronLeftIcon className='w-6 h-6 text-[#222222]' />
                </Button>
                <h2 className='text-2xl font-bold text-[#222222]'>Retain Artist</h2>
              </div>

              <div className='space-y-8'>
                <section>
                  <h4 className='text-[16px] font-bold text-[#222222] mb-2'>
                    Continue your creative journey with <Link href="/artist-page/profile-for-artist" className="text-[#035A7A] cursor-pointer hover:underline">SHOALA ADIH</Link>
                  </h4>
                  <p className='text-sm text-gray-500 leading-relaxed font-light'>
                    We understand the value of successful collaborations. Explore opportunities
                    to continue working with them on future projects
                  </p>
                </section>

                <section className='border-t border-gray-100 pt-8'>
                  <h4 className='text-[16px] font-bold text-[#222222] mb-2'>Payment</h4>
                  <p className='text-sm text-gray-500 leading-relaxed font-light'>
                    A monthly payment of <span className='font-bold text-[#222222]'>$5</span> grants you access to directly work with
                    the artist anytime you wish.
                  </p>
                </section>

                <section className='border-t border-gray-100 pt-8'>
                  <h4 className='text-[16px] font-bold text-[#222222] mb-3'>Benefits</h4>
                  <ul className='space-y-3'>
                    <li className='flex items-center gap-3 text-sm text-gray-500 font-light'>
                      <span className='w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                      Direct access to the artist&apos;s inbox.
                    </li>
                    <li className='flex items-center gap-3 text-sm text-gray-500 font-light'>
                      <span className='w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                      Reduced hiring time, leading to increased efficiency.
                    </li>
                    <li className='flex items-center gap-3 text-sm text-gray-500 font-light'>
                      <span className='w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                      Guaranteed long-term work commitment.
                    </li>
                    <li className='flex items-center gap-3 text-sm text-gray-500 font-light'>
                      <span className='w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                      Deeper strategic partnership.
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 pt-4'>
              <Button
                variant='flat'
                className='bg-[#EEEEEE] text-[#222222] font-semibold rounded-full w-full py-6 text-sm'
                size='lg'
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>

              <Button
                as={Link}
                href={`/fashion-designers/contracts/retain/checkout${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
                className='bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold w-full rounded-full py-6 text-sm shadow-sm'
                size='lg'
              >
                Retain SHOALA ADIH
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
