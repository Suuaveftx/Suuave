'use client'
import { Card, CardBody } from "@heroui/react";
import CustomButton from "../../../../components/CustomButton";

export default function PaymentCard() {
  return (
    <div className="w-full flex justify-center items-center">
      <div
      className="
        mx-auto text-center shadow-lg rounded-lg overflow-hidden 
        bg-[#EFF8FB] 
        sm:w-64 sm:p-6
        max-sm:w-48 max-sm:p-3
      "
    >
      <div className="text-center">
        <h1
          className="
            font-bold text-[#3A98BB] 
            sm:text-3xl max-sm:text-xl
          "
        >
          $1000
        </h1>
        <span
          className="
            text-gray-600 block mt-2 
            sm:text-base max-sm:text-xs
          "
        >
          Wallet Balance
        </span>
        <div className="mt-3">
          <CustomButton text="Payout" className="w-full max-sm:py-1" />
        </div>
      </div>
    </div>
    </div>
  );
}
