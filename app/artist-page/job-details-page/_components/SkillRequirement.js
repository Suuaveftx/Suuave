'use client'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'

const SkillRequirement = () => {
  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden bg-transparent'>
        <h4 className='font-bold text-lg text-[#222222] mb-3'>Skills Requirement</h4>
        <div className='flex flex-wrap gap-2'>
          <div className='bg-[#F0F0F0] px-4 py-2 rounded-full text-[#222222] text-sm'>
            3D Artist
          </div>
          <div className='bg-[#F0F0F0] px-4 py-2 rounded-full text-[#222222] text-sm'>
            Concept Artist
          </div>
          <div className='bg-[#F0F0F0] px-4 py-2 rounded-full text-[#222222] text-sm'>
            Storyboard
          </div>
        </div>
      </div>

      {/* Desktop View (Preserved) */}
      <div className='hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] font-bold px-8 py-6 mt-4 lg:text-[22px] rounded-2xl'>
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
    </>
  )
}

export default SkillRequirement;
