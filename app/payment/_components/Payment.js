'use client'
import React from 'react'
import PaymentCard from './PaymentCard'
import PaymentCard2 from './PaymentCard2'
import PaymentCard3 from './PaymentCard3'

const Payment = () => {
  return (
    <div className="w-80 bg-[#FAFAFA] border-1 border-[#E2E2E2] p-2 rounded-md shadow-lg flex flex-col flex-wrap">
      <PaymentCard />
      <PaymentCard2 />
      <PaymentCard3 />
    </div>
  )
}

export default Payment
