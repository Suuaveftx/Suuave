'use client'
import React from 'react'
import PaymentCard from './PaymentCard'
import PaymentCard2 from './PaymentCard2'
import PaymentCard3 from './PaymentCard3'

const Payment = () => {
  return (
    <div className="w-full md:max-w-[350px] md:mx-0 md:bg-white md:border md:border-[#E5E5E5] md:p-4 md:rounded-2xl md:shadow-sm flex flex-col h-fit">
      <PaymentCard />
      <PaymentCard2 />
      <PaymentCard3 />
    </div>
  )
}

export default Payment
