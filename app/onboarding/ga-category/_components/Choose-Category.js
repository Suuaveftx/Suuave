'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CustomButton from '../../../../components/CustomButton';
import { Alert, addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { getActiveCategory } from '../../../../utils/utils';
import { useAppStore } from '../../../../store';
// import { Roles } from '@suuaveftx/prisma-shared';

const ChooseCategory = () => {
  // const [activeCategory, setActiveCategory] = useState('');
  // const selectedCategory = getActiveCategory();
  const activeCategory = useAppStore((state) => state.activeCategory);
  const setActiveCategory = useAppStore((state) => state.setActiveCategory);

  console.log('THESelected Category from State:', activeCategory);
  const router = useRouter();

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const submitCategory = () => {
    if (!activeCategory) {
      addToast({
        title: 'Warning',
        description: 'Please select a category',
        color: 'Warning',
      });
      return;
    }
    router.push('/intro-to-profile-setup');
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-[#F1F1F1] px-4 md:px-10 py-6'>
      <div className='w-full flex justify-start'>
        <Image
          src='/dev-images/logo.png'
          alt='Fashion Logo'
          className='w-[40px] h-[40px] object-contain'
          width={40}
          height={40}
        />
      </div>
      <h1 className='text-center text-2xl md:text-xl font-bold mt-3'>
        Sign up as a Fashion Artist or a Fashion Brand
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-8'>
        <label htmlFor='artist'>
          <div
            className={`bg-white cursor-pointer rounded-[16px] shadow-md pl-[24px] pr-[24px] pt-[32px] pb-[32px] flex flex-col 
              justify-between items-center text-center border-2 hover:border-[#CCE7F2] transition-all ${
                activeCategory === 'artist' ? 'border-[#3A98BB]' : 'border-transparent'
              }`}
          >
            <div className='flex justify-end w-full'>
              <input
                id='artist'
                type='radio'
                className='w-8 h-8 accent-[#3A98BB]'
                name='category'
                value={'artist'}
                checked={activeCategory === 'artist'}
                onChange={() => setActiveCategory('artist')}
              />
            </div>
            <Image
              src='/dev-images/Artist.png'
              alt='Fashion Artist'
              className='object-contain mb-2'
              width={120}
              height={120}
            />
            <div>
              <h2 className='text-[22px] font-bold pt-1'>Fashion Artist</h2>
              <p className='text-gray-500 text-sm mt-2 whitespace-nowrap'>
                Including 3D Designers, Illustrators, Sketchers, etc.
              </p>
            </div>
          </div>
        </label>
        <label htmlFor='brand'>
          <div
            className={`bg-white cursor-pointer rounded-[16px] shadow-md pl-[24px] pr-[24px] pt-[32px] pb-[32px] flex flex-col 
              justify-between items-center text-center border-2 hover:border-[#CCE7F2] transition-all ${
                activeCategory === 'brand' ? 'border-[#3A98BB]' : 'border-transparent'
              }`}
          >
            <div className='flex justify-end w-full'>
              <input
                id='brand'
                type='radio'
                className='w-8 h-8 accent-[#3A98BB]'
                name='category'
                value='brand'
                checked={activeCategory === 'brand'}
                onChange={() => handleCategoryChange('brand')}
              />
            </div>
            <Image
              src='/dev-images/Designers.png'
              alt='Fashion Brand'
              className='object-contain mb-2'
              width={120}
              height={120}
            />
            <div>
              <h2 className='text-[22px] font-bold pt-1'>Fashion Brand</h2>
              <p className='text-gray-500 text-base mt-1 whitespace-nowrap'>
                Including Brands, Designers, Clients, etc.
              </p>
            </div>
          </div>
        </label>
      </div>
      <div className='mt-16'>
        <button
          onClick={submitCategory}
          // disabled={!activeCategory}
          className={`text-[#035A7A] rounded-3xl cursor-pointer px-20 py-3 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] transition-opacity ${
            !activeCategory
              ? 'opacity-50 cursor-not-allowed'
              : 'opacity-100 hover:opacity-90'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ChooseCategory;
