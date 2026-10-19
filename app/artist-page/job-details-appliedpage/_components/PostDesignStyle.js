'use client';
import React from 'react';

const PostDesignStyle = () => {
  return (
    <div className='w-full max-w-full bg-[#F9F9F9] font-bold px-4 sm:px-8 py-4 mt-[7.84px] rounded-2xl'>
      <div className='lg:mb-4 text-[#222222]'>
        <h4 className='tracking-[0.33px]'>Design Style</h4>
      </div>
      <div className='flex flex-wrap gap-[11px] mt-4 w-full max-w-[50%]'>
        <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full lg:max-w-[30%] flex-1 min-w-[100px] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
          Casual
        </div>
        <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full lg:max-w-[30%] flex-1 min-w-[100px] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
          Ethnic
        </div>
        <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full lg:max-w-[30%] flex-1 min-w-[100px] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
          Streetwear
        </div>
      </div>
    </div>
  );
};

export default PostDesignStyle;
