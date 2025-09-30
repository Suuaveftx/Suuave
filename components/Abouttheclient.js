'use client'
import React from 'react'
import { MdLocationPin } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { LuCreditCard } from "react-icons/lu";
import Link from 'next/link';
const Abouttheclient = () => {
  return (
  <div className='bg-[#FAFAFA] lg:w-screen lg:max-w-[80%] lg:px-6 px-4 pt-0 pb-[56px] w-screen max-w-96 lg:mx-0 mx-4 rounded-2xl'>
    <div className='lg:mb-8 mb-6 px-0 py-4'>
       <h4 className='border-b lg:text-[22px] text-[18px] lg:whitespace-normal whitespace-nowrap'>About the Client</h4> 
    </div>
    <div className='mb-8'>
        
    <div className='flex flex-col gap-2 mb-6'>
    <div>
        <h5 className='font-medium text-sm'>Fashion Brand</h5>
    </div>
    <div className='flex items-center gap-2'>
<MdLocationPin color='#878787' />
<span className='tracking-[0.33px] text-[#767676]'>Lagos, Nigeria</span>
    </div>
     <div className='flex items-center gap-2'>
        <span className='tracking-[0.33px] text-[#767676]'>Ratings:</span>
<div className="flex">
      {Array(1).fill(null).map((_, index) => (
        <FaStar key={index} color="#F8B73B" />
      ))}
    </div>
    <Link href="/artist-page/review">
    <span className='text-sm text-[#3A98BB] tracking-[0.33px] leading-[18px]'><span className='text-[#767676]'>5.0</span>(5 Reviews)</span>
    </Link>
    </div>
      <div>
        <span className='text-[#767676] tracking-[0.33px] leading-[18px]'>Member since 12 June, 2024</span>
    </div>
    </div>
    <div className='flex flex-col gap-2 '>
        <div className='flex items-center gap-2 text-[#76767676] '>
            <span className='font-bold text-[#222222]'>14</span>
             <span>Jobs Posted</span>
        </div>
        <div className='flex items-center gap-2 text-[#76767676] '>
            <span className='font-bold text-[#222222]'>14</span>
             <span>Artists Hired</span>
        </div>
    </div>
    </div>
    <div>
       <div className='text-lg mb-[22px]'>
        <h5 className='leading-[160%] tracking-[0.33px] text-[18px] text-[#222222] font-bold'>Client Verifications</h5>
    </div>
    <div className='flex flex-col gap-4'>
    <div className='flex items-center gap-2'>
     <FaRegUser color='#3A98BB' />
     <span className='#text-[#767676'>Identity Verified</span>
    </div>
    <div className='flex items-center gap-2'>
     <MdOutlineMailOutline color='#3A98BB' />
     <span className='text-[#767676'>Email Address Verified</span>
    </div>
     <div className='flex items-center gap-2'>
     <MdOutlinePhone color='#3A98BB' />
     <span className='text-[#767676]'>Phone Number Verified</span>
    </div>
    <div className='flex items-center gap-2'>
     <LuCreditCard color='#3A98BB' />
     <span className='text-[#767676'>Payment Method Verified</span>
    </div>
    </div>
    </div>
  </div>
  )
}

export default Abouttheclient