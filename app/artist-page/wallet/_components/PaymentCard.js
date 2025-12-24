'use client'
import { Card, CardBody } from "@heroui/react";
import CustomButton from "../../../../components/CustomButton";

export default function PaymentCard() {
  return (
    <div className="w-full bg-[#EFF8FB] p-6 rounded-xl shadow-sm border border-[#E1F0F7] mb-6">
      <div className="text-center">
        <h1 className="font-bold text-[#3A98BB] text-3xl">
          $1000
        </h1>
        <span className="text-[#555555] block mt-2 text-sm font-medium">
          Wallet Balance
        </span>
        <div className="mt-4">
          <CustomButton text="Payout" className="w-full py-2 bg-[#A3D8EA] text-[#0F4C64] font-semibold rounded-full hover:bg-[#8ecbdb] transition-colors shadow-none" />
        </div>
      </div>
    </div>
  );
}
