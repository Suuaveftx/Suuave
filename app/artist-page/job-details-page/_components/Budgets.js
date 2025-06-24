'use client'
import React from 'react'
import {Card,  CardBody, } from "@heroui/react";
import Image from 'next/image';
const Budgets = () => {
  return (
    <Card className="py-4 w-auto ml-8">
    <CardBody className="overflow-visible py-2">
      <div className='flex flex-col gap-4'>
  <h4 className='font-bold text-[22px] text-[#222222]'>Payment And Timeframe</h4>
    <div >
       
       
        <div className='flex gap-2 items-center'>
        <p className='text-lg text-[#767676]'>Budget-</p>
            <p className='text-sm text-[#3A98BB] font-bold'>N200,000</p>
        </div>
        
        <div className='flex gap-2 mt-2 items-center'>
        <p className='text-lg text-[#767676]'>Duration-</p>
            <p className='text-sm text-[#222222]'>2 Days</p>
        </div>
     
       
      
    </div>
    </div>
    </CardBody>
  </Card>
  )
}

export default Budgets