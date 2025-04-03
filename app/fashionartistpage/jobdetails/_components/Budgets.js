'use client'
import React from 'react'
import {Card,  CardBody, } from "@heroui/react";
import Image from 'next/image';
const Budgets = () => {
  return (
    <Card className="py-4 w-auto ml-8">
    <CardBody className="overflow-visible py-2">
      <div className='flex flex-col gap-4'>
  
    <div className='mt-2'>
       
       
        <div className='flex gap-2 mt-2 items-center'>
        <p className='text-lg'>Budget-</p>
            <p className='text-sm text-[#3A98BB] font-bold'>N200,000</p>
        </div>
        
        <div className='flex gap-2 mt-2 items-center'>
        <p className='text-lg'>Duration-</p>
            <p className='text-sm'>Two Weeks</p>
        </div>
     
       
      
    </div>
    </div>
    </CardBody>
  </Card>
  )
}

export default Budgets