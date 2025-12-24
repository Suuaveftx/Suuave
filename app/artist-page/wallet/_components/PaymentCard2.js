'use client'
import { Card, CardBody } from "@heroui/react";

export default function PaymentCard2() {
  return (
    <div className="w-full bg-white p-6 rounded-xl border border-[#EEEEEE] mb-6 shadow-sm">
      <div className="space-y-0 md:space-y-6">
        {/* In Escrow - Hidden on Mobile */}
        <div className="hidden md:block text-center">
          <h1 className="text-2xl font-bold text-[#222222]">$1000</h1>
          <span className="text-[#767676] block mt-1 text-sm">In Escrow</span>
        </div>

        <hr className="hidden md:block border-gray-100" />

        {/* Total Earnings */}
        <div className="text-center">
          <h1 className="text-3xl md:text-2xl font-bold text-[#222222]">$3300</h1>
          <span className="text-[#555555] md:text-[#767676] block mt-2 md:mt-1 text-sm font-medium">Total Earnings</span>
        </div>
      </div>
    </div>
  );
}
