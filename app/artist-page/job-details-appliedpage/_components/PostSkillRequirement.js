'use client';
import React from 'react';

const PostSkillRequirement = () => {
  return (
    <div className='w-full max-w-full bg-[#F9F9F9] font-bold px-4 sm:px-8 py-4 lg:mt-[6px] mt-8 rounded-2xl'>
      <div className='lg:mb-4 text-[#222222]'>
        <h4 className='tracking-[0.33px]'>Skill Requirement</h4>
      </div>
      <div className='flex flex-wrap gap-[11px] mt-4 w-full max-w-[60%]'>
        <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full lg:max-w-[40%] flex-1 min-w-[120px] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
          3D Artist
        </div>
        <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full lg:max-w-[40%] flex-1 min-w-[120px] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
          Concept Artist
        </div>
        <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] max-w-full flex-1 min-w-[120px] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
          Storyboard
        </div>
      </div>
    </div>
  );
};

export default PostSkillRequirement;
