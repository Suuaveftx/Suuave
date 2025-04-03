import React from 'react';
import Payment from './_components/Payment';
import PaymentAll from './_components/PaymentAll';

const Page = () => {
  return (
    <>
      <div className="w-64 pl-8 mt-4">
        <h1 className="text-2xl font-bold border-b-[0.5px]">Wallet</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3  md:gap-0 mt-4">
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
