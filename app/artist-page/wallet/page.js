import React from 'react';
import Payment from './_components/Payment';
import PaymentAll from './_components/PaymentAll';
import { ChevronLeft } from "lucide-react";

const Page = () => {
  return (
    <>
      <div className="w-64 pl-8 mt-4 flex items-center sm:pl-8 gap-4">
      {/* Show chevron only on mobile */}
      <ChevronLeft className="w-5 h-5 mr-2 sm:hidden" color='#878787' />
      <h1 className="lg:text-2xl text-[20px] font-bold border-b-[0.5px] leading-[100%]">Wallet</h1>
    </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-0 mt-4">
        {/* Payment Section */}
        <div className="md:col-span-1 pl-8">
          <Payment />
        </div>

        {/* PaymentAll Section (Takes up more space) */}
        <div className="md:col-span-2">
          <PaymentAll />
        </div>
      </div>
    </>
  );
};

export default Page;
