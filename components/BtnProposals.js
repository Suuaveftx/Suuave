'use client'
import React from 'react'
import {Card,  CardBody, } from "@heroui/react";
import CustomButton from './CustomButton';
const BtnProposals = () => {
  return (
    <Card className="py-4 w-64">
      <CardBody className="overflow-visible py-2">
        <div className='flex flex-col gap-4 justify-center items-center'>
      <div>
        <CustomButton text='Send Proposal' className="w-48" href='/sendproposal' />
      </div>
      <div>
        <CustomButton text='Save Post' className="w-48 bg-transparent border-1 border-[#3A98BB]" />
      </div>
      </div>
      </CardBody>
    </Card>
  )
}

export default BtnProposals