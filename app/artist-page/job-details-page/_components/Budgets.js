'use client'
import React from 'react'
import { HiOutlineCash } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa6";

const Budgets = () => {
  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden bg-white p-5 rounded-[18px] border border-[#ECECEC] shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4'>
        <h4 className='font-bold text-[15px] text-[#2E2E2E] mb-3'>Budget And Timeframe</h4>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <HiOutlineCash className='w-[18px] h-[18px] text-[#757575]' />
            <span className='text-[14px] text-[#757575]'>Budget -</span>
            <span className='font-bold text-[#3A98BB] text-[15px]'>N200,000</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaRegClock className='w-[18px] h-[18px] text-[#757575]' />
            <span className='text-[14px] text-[#757575]'>Timeframe -</span>
            <span className='font-medium text-[#2E2E2E] text-[15px]'>2 Days</span>
          </div>
        </div>
      </div>

      {/* Desktop View (Preserved) */}
      <div className='hidden lg:flex flex-col gap-4 w-full bg-[#FAFAFA] border border-[#EAEAEA] lg:px-8 px-4 py-8 lg:mt-4 mt-[22px] rounded-2xl lg:mb-[92.82px] mb-[3px]'>
        <h4 className='font-bold text-[22px] text-[#222222] lg:flex hidden'>Budget And Timeframe</h4>
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
