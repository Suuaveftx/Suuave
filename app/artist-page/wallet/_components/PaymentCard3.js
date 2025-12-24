'use client'
import { Card, CardBody } from "@heroui/react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function PaymentCard3() {
  return (
    <div className="w-full bg-[#FCFCFC] p-6 rounded-xl border border-[#F0F0F0] shadow-sm">
      <h1 className="text-xl font-bold text-[#222222] mb-6 text-center">Payout Details</h1>

      {/* PayPal Info */}
      <div className="flex flex-col items-center justify-center p-4 w-full">
        <div className="w-12 h-12 relative mb-2">
          <Image
            src="/dev-images/paypal.png"
            alt="PayPal"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-[#555555] text-sm text-center font-medium">
          czuleyrt@gmail.com
        </span>
      </div>

      <hr className="my-4 border-gray-100 w-full" />

      {/* Add Another */}
      <div className="flex items-center justify-center gap-2 text-[#222222] cursor-pointer hover:bg-gray-50 py-2 rounded-lg transition-colors">
        <Plus size={18} />
        <span className="font-bold text-sm">Add Another</span>
      </div>
    </div>
  );
}
