'use client'
import { Card, CardBody } from "@heroui/react";
import CustomButton from "../../../components/CustomButton";

export default function PaymentCard() {
  return (
    <div className="w-full  flex justify-center items-center">
      <Card className="w-64 p-6 text-center shadow-lg rounded-lg overflow-hidden bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)]">
        <CardBody className="text-center">
          <h1 className="text-3xl font-bold text-[#3A98BB]">$1000</h1>
          <span className="text-gray-600 block mt-2">Wallet Balance</span>
          <div className="mt-4">
          <CustomButton text="Payout" className="w-full" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
