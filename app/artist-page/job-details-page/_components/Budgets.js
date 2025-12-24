'use client'
import React from 'react'
import { HiOutlineCash } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa6";

const Budgets = () => {
  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden bg-[#FAFAFA] rounded-lg p-4'>
        <h4 className='font-bold text-[18px] text-[#222222] mb-4'>Payment And Timeframe</h4>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <HiOutlineCash className='w-5 h-5 text-[#767676]' />
            <span className='text-[#767676]'>Budget -</span>
            <span className='font-bold text-[#3A98BB]'>N200,000</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaRegClock className='w-5 h-5 text-[#767676]' />
            <span className='text-[#767676]'>Duration -</span>
            <span className='font-medium text-[#222222]'>2 Days</span>
          </div>
        </div>
      </div>

      {/* Desktop View (Preserved) */}
      <div className='hidden lg:flex flex-col gap-4 bg-[#F9F9F9] lg:mx-16 mx-4 lg:px-8 px-4 py-4 lg:py-6  lg:w-full lg:max-w-[85%] lg:mt-2 mt-[22px] lg:rounded-2xl rounded-[8px] lg:mb-[92.82px] mb-[3px]'>
        <h4 className='font-bold text-[22px] text-[#222222] lg:flex hidden'>Payment And Timeframe</h4>
        <div >
          <div className='flex items-center gap-2'>
            <div className='flex gap-2 items-center'>
              <HiOutlineCash color='#878787' />
              <span className='text-lg text-[#767676]'>Budget -</span>
            </div>
            <span className='font-bold text-base text-[#3A98BB] tracking-[0.33px]'>N200,000</span>
          </div>

          <div className='flex items-center gap-2 lg:mt-4'>
            <div className='flex gap-2 items-center'>
              <FaRegClock color='#878787' />
              <span className='text-lg text-[#767676]'>Timeframe -</span>
            </div>
            <span className='font-normal text-base text-[#222222]'>2 Days</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Budgets