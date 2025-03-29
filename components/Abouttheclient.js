'use client'
import React from 'react'
import {Card,  CardBody, } from "@heroui/react";
import Image from 'next/image';
const Abouttheclient = () => {
  return (
    <Card className="py-4 w-64">
    <CardBody className="overflow-visible py-2">
      <div className='flex flex-col gap-4'>
    <div>
    <h4 className='font-bold'>About the Client</h4>
    <hr className='mt-2'></hr>
    </div>
    <div className='mt-2'>
        <h6 className='font-bold'>Fashion Brand</h6>
        <div className='flex gap-2 mt-2 items-center'>
            <Image src={"/dev-images/location.png"} width={20} height={20} alt='location' />
            <p className='text-sm'>Lagos, Nigeria</p>
        </div>
        <div className='flex gap-2 mt-2 items-center'>
        <p className='text-sm'>Ratings</p>
            <Image src={"/dev-images/rating.png"} width={40} height={40} alt='location' />
            <p className='text-sm text-[#3A98BB]'>(5 Reviews)</p>
        </div>
        <div className='flex gap-2 mt-2 items-center'>
        <p className='text-sm'>Members since 12, June, 2024</p>
        </div>
        <div className='flex gap-2 items-center mt-8'>
        <p className='text-base font-bold'>14</p>
            <p className='text-sm'>Jobs Posted</p>
        </div>
        <div className='flex gap-2 items-center mt-2'>
        <p className='text-base font-bold'>14</p>
            <p className='text-sm'>Artist Hired</p>
        </div>
        <div className='mt-8'>
        <h6 className='font-bold'>Client Verifications</h6>
        </div>
        <div className='flex gap-2 mt-4 items-center'>
            <Image src={"/dev-images/icon1.png"} width={20} height={20} alt='location' />
            <p className='text-sm'>Identity Verified</p>
        </div>
        <div className='flex gap-2 mt-4 items-center'>
            <Image src={"/dev-images/Email.png"} width={20} height={20} alt='location' />
            <p className='text-sm'>Email Address Verified</p>
        </div>
        <div className='flex gap-2 mt-4 items-center'>
            <Image src={"/dev-images/CreditCard.png"} width={20} height={20} alt='location' />
            <p className='text-sm'>Payment Method Verified</p>
        </div>
    </div>
    </div>
    </CardBody>
  </Card>
  )
}

export default Abouttheclient