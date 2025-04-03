'use client'
import { Card, CardBody } from "@heroui/react";

export default function PaymentCard2() {
  return (
    <div className="flex justify-center items-center mt-8">
      <Card className="w-64 p-6 text-center shadow-lg rounded-lg border">
        <CardBody>
          <div className="border p-4 rounded-lg text-center">
            <h1 className="text-3xl font-bold text-gray-900">$1000</h1>
            <span className="text-[#767676] block mt-2">In Escrow</span>
          </div>
          <div className="p-4 rounded-lg mt-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900">$3000</h1>
            <span className="text-[#767676] block mt-2">Total Earnings</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
