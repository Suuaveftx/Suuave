'use client';

import React from 'react';
import Image from 'next/image';
import { Input } from '@heroui/react';
import { ShieldCheck } from 'lucide-react';

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6 md:p-12">
     
      <h1 className="text-2xl font-semibold text-[#666] mb-6">Payment</h1>

      
      <div className="bg-white text-[#333] px-6 py-3 rounded-md shadow-sm mb-10 text-sm font-medium">
        Related Contract - Modern Fashion Attire Illustration (85375758858)
      </div>

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Credit Card Details */}
        <div className="bg-white p-6 rounded-md shadow-md w-full md:w-[40%]">
          <h2 className="text-lg font-semibold text-center mb-4 border-b pb-2">Credit Card Details</h2>

          <div className="space-y-4 text-sm">
            
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm">Card Number</label>
                <div className="flex gap-2">
                  <Image src="/dev-images/visa.png" alt="Visa" width={32} height={24} />
                  <Image src="/dev-images/verve.png" alt="Verve" width={32} height={24} />
                </div>
              </div>
              <Input placeholder="0000 0000 0000 0000 0000" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
            </div>

           
            <div>
              <label className="block mb-1">Name On Card</label>
              <Input placeholder="John Doe" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
            </div>

           
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-1">Expiry Date</label>
                <Input placeholder="MM/YY" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-1">CVV</label>
                <Input placeholder="XXX" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>

           
            <div>
              <label className="block mb-1">Country</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm">
                <option>Country</option>
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Cameroon</option>
              </select>
            </div>

           
            <div>
              <label className="block mb-1">Postal Code</label>
              <Input placeholder="Postal Code" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
            </div>

           
            <button className="w-full mt-4 py-3 rounded-full text-[#009FE3] font-medium bg-gradient-to-b from-[#D2EEFA] to-[#BEE5F5] shadow-md">
              Pay $350
            </button>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-6 rounded-md shadow-md w-full md:w-[40%] text-sm text-[#333]">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b text-center ">Payment Summary</h2>

          <div className="space-y-3 border-b pb-4 mb-4 mt-10">
            <div className="flex justify-between flex-wrap gap-2">
              <span>Total Amount :</span>
              <span className="font-medium">$350</span>
            </div>
            <div className="flex justify-between flex-wrap gap-2">
              <span>Details :</span>
              <span className="font-semibold text-[#111] text-right">
                Suuave Job Contract (85375758858)
              </span>
            </div>
          </div>

          {/* Secure Payment Info */}
          <div className="flex gap-2 text-xs text-gray-600 mt-12">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
            <p>
              Your payment will be secured in our{' '}
              <a href="#" className="text-blue-500 underline">Escrow</a> until your project is
              completed. Read our{' '}
              <a href="#" className="text-blue-600 underline">Collaboration Policy</a> for full
              details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
