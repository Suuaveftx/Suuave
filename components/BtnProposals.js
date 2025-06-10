"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import CustomButton from "./CustomButton";
import Image from "next/image";

const BtnProposals = () => {
  return (
    <Card className="py-4 w-64">
      <CardBody className="overflow-visible py-2">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div>
            <CustomButton
              text="Send Proposal"
              className="w-48 bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#035A7A]"
              href="/artist-page/send-proposal"
            />
          </div>
       <div>
  <CustomButton
    className="w-48 !bg-transparent border border-[#3A98BB] text-[#767676] flex items-center justify-center gap-2"
  >
    <Image
      src="/dev-images/Bookmark.png"
      alt="Bookmark icon"
      className="w-5 h-5"
      width={20}
      height={20}
    />
    <span>Save Job</span>
  </CustomButton>
</div>

        </div>
      </CardBody>
    </Card>
  );
};

export default BtnProposals;
