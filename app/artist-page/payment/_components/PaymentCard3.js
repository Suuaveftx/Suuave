'use client'
import { Card, CardBody } from "@heroui/react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function PaymentCard3() {
  return (
    <div className="flex  justify-center items-center mt-8">
      <Card className="w-64 p-6 text-center shadow-lg rounded-lg border overflow-hidden">
        <CardBody className="overflow-hidden">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payout Details</h1>
          <div className="flex flex-col items-center border p-4 rounded-lg w-full max-w-full">
            <Image 
              src="/dev-images/paypal.png" 
              alt="PayPal" 
              width={50} 
              height={50} 
              className="w-auto h-auto"
            />
            <span className="text-gray-600 mt-2 w-full text-center">czuleyrt@gmail.com</span>
          </div>
          <hr className="my-4 w-full" />
          <div className="flex items-center justify-center gap-2 text-[#222222] cursor-pointer">
            <Plus size={20} />
            <span className="font-medium text-[#222222]">Add Another</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
