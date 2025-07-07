"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import CustomButton from "./CustomButton";
import { MdOutlineBookmarkBorder } from "react-icons/md";

const BtnProposals = () => {
  return (
    
        <div className="flex lg:flex-col lg:gap-6 gap-4 justify-center items-center lg:bg-[#FAFAFA] bg-[#FFFFFF] px-4 py-4 lg:px-6 lg:py-8 lg:w-screen lg:max-w-[80%] w-screen max-w-[100%] border-1 border-[#EAEAEA] lg:border-1 lg:border-[#EAEAEA] lg:rounded-2xl">
          <div >
            <CustomButton
              text="Send Proposal"
              className="w-48 bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#035A7A]"
              href="/artist-page/send-proposal"
            />
          </div>

       <div>
  <CustomButton
    className="w-48 !bg-transparent border border-[#3A98BB] text-[#767676] flex items-center justify-center gap-2"
    icon={<MdOutlineBookmarkBorder className="w-5 h-5" color="#3A98BB" />}
    text="Save Job"
  >
    
    
  </CustomButton>
</div>


        </div>
  
  );
};

export default BtnProposals;
