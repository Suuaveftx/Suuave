'use client'
import React from 'react'
import { HiOutlineCash } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
const Budgets = () => {
  return (
  <>
  <div className='lg:w-scren lg:max-w-[100%] bg-[#F9F9F9] px-8 py-4 lg:mx-16 mx-4 lg:mt-[7.84px] mt-8 rounded-2xl lg:mb-[92.82px]'>
  <div className='font-bold text-2xl lg:mb-[24px] lg:flex hidden'>
    <h4>Payment And Project Duration</h4>
  </div>
  <div className='flex items-center gap-2 lg:mb-4'>
  
    <div>
      <HiOutlineCash width={24} height={24} color='#767676' />
    
    </div>
    <div className='flex items-center gap-2 text-[#767676]'>
      <h4>Budget -</h4>
      <span className='font-bold text-[#3A98BB]'>N200:000</span>
    </div>
  </div>
  <div className='flex items-center gap-2'>
  
    <div>
      <FaRegClock width={24} height={24} color='#767676' />
    
    </div>
    <div className='flex items-center gap-2 text-[#767676]'>
      <h4>Duration -</h4>
      <span className='font-bold text-[#222222]'>2 Days</span>
    </div>
  </div>
  </div>
  </>
  )
}

export default Budgets