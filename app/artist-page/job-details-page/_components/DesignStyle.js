'use client'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'

const DesignStyle = () => {
  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden bg-transparent'>
        <h4 className='font-bold text-lg text-[#222222] mb-3'>Design Style</h4>
        <div className='flex flex-wrap gap-2'>
          <div className='bg-[#F0F0F0] px-4 py-2 rounded-full text-[#222222] text-sm'>
            Casual
          </div>
          <div className='bg-[#F0F0F0] px-4 py-2 rounded-full text-[#222222] text-sm'>
            Ethnic
          </div>
          <div className='bg-[#F0F0F0] px-4 py-2 rounded-full text-[#222222] text-sm'>
            Street Wear
          </div>
        </div>
      </div>

      {/* Desktop View (Preserved) */}
      <div className='hidden lg:block lg:w-screen lg:max-w-[85%] bg-[#F9F9F9] font-bold px-8 py-4 mt-[7.84px] lg:mx-16 mx-4 lg:text-[22px] rounded-2xl'>
        <div className='lg:mb-4 text-[#222222]'>
          <h4 className='tracking-[0.33px]'>Design Style</h4>
        </div>
        <div className='flex gap-[11px] mt-4 lg:w-screen lg:max-w-[50%] w-full'>
          <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] w-screen max-w-[30%] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
            Casual
          </div>
          <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] w-screen max-w-[30%] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
            Ethnic
          </div>
          <div className='bg-[#F0F0F0] px-[10px] py-2 rounded-[32px] w-screen max-w-[30%] flex justify-center items-center text-[#222222] text-sm font-normal opacity-50 pointer-events-none cursor-not-allowed'>
            Streetwear
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignStyle