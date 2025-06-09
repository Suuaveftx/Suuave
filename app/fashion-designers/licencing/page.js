'use client';

import React from 'react';
import { Card, Input, Button, Textarea } from '@heroui/react';
import { Info, CreditCard, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] py-10 px-4 md:px-12">
      <h1 className="text-3xl font-semibold mb-6 text-[#767676]">Checkout</h1>

      {/* Info Banner with gradient */}
      <div className="bg-gradient-to-r from-[#A5D5E9] to-[#28A5D8] text-[#222222] flex items-start p-4 rounded-md mb-10">
        <div className="w-6 h-6 bg-[#222222] rounded-full flex items-center justify-center text-teal-50 mr-3">
          <Info className="w-4 h-4" />
        </div>
        <p className="text-sm leading-relaxed">
          <strong className="font-semibold">Get Licensing right to the design and use as you desire. All files and specification will be transferred to you.</strong>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 ">
        {/* Left: Billing Info + Payment Method */}
        <div className="w-full lg:w-[40%] space-y-6">
          <Card className="p-6">
            <h2 className="text-base font-semibold mb-4 text-[#222]">Billing Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm mb-1 block text-[#555] ">Full Name</label>
                <Input placeholder="Name on card" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 " />
              </div>
              <div>
                <label className="text-sm mb-1 block text-[#555]">Country</label>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm ">
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Cameroon</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-base font-semibold mb-4 text-[#222]">Payment Method</h2>
            <div className="space-y-4 text-sm">
              <div className="space-y-2 ">
                <div className="flex items-center gap-2 w-full bg-white border border-gray-300 rounded-md px-3 py-2">
                  <input type="radio" name="payment" defaultChecked />
                  <label>Credit/Debit Card</label>
                  <div className="flex gap-2 items-center ml-18 ">
                    <Image src="/dev-images/visa.png" alt="Visa" width={25} height={20} />
                    <Image src="/dev-images/verve.png" alt="Verve" width={25} height={20} />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full bg-white border border-gray-300 rounded-md px-3 py-2">
                  <input type="radio" name="payment" />
                  <label>Bank Transfer</label>
                </div>
              </div>
              <div>
                <label className="block mb-1">Card Number</label>
                <div className="relative">
                  <Input placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-10" />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div>
                <label className="block mb-1">Name On Card</label>
                <Textarea placeholder="Name on card" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1">Expiry Date</label>
                  <Input placeholder="MM/YY" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1">CVV</label>
                  <Input placeholder="XXX" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Payment Summary */}
        <div className="w-full lg:w-[50%] space-y-6">
          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-[#222] text-center">Payment Summary</h2>
            <div className="space-y-4 text-sm text-[#444]">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <Image src="/dev-images/pay.png" alt="Fashion" width={48} height={48} className="rounded-md" />
                  <div>
                    <p className="font-semibold text-sm">Modern Fashion Attire (853758858)</p>
                    <p className="text-xs text-gray-500 mt-1">Modern Fashion Attire made with authentic<br /> African...</p>
                  </div>
                </div>
                <span className="text-sm font-medium">$350</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Subtotal</span>
                <span>$350</span>
              </div>
              <div className="flex justify-between pt-2 font-semibold text-base text-[#111]">
                <span>Total Amount To Pay :</span>
                <span>$350</span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-[#CCE7F2]  to-[#EAF9FF] text-[#035A7A] font-medium py-2 rounded-full shadow-md">
                Make Payment
              </Button>
            </div>

            <div className="mt-5 text-xs text-[#333] bg-[#F2F9FC] border border-[#E0F2FA] p-4 rounded-md">
              <p className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>
                  Your payment is secure in our <a href="#" className="underline text-blue-600">Escrow</a> until your project is completed. Read our <a href="#" className="underline text-blue-600">Collaboration Policy</a> for full details.
                </span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
